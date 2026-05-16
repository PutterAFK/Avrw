import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// API route for contact form
app.post("/api/contact", async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Please provide name, email, and message." });
  }

  // Configure transporter
  const smtpHost = (process.env.SMTP_HOST || "").trim();
  const smtpPortStr = (process.env.SMTP_PORT || "587").trim();
  const smtpUser = (process.env.SMTP_USER || "").trim();
  let smtpPass = (process.env.SMTP_PASS || "").trim();

  // If it looks like a Google App Password (16 chars with optional spaces), strip spaces
  // We do this more aggressively now
  const cleanPass = smtpPass.replace(/\s/g, "");
  if (cleanPass.length === 16 && (smtpHost.includes("gmail.com") || smtpUser.endsWith("gmail.com") || smtpUser.includes("rittiya.ac.th"))) {
    smtpPass = cleanPass;
    console.log("Sanitized App Password for account:", smtpUser);
  }

  if (!smtpHost || !smtpUser || !smtpPass) {
    console.error("Missing SMTP configuration:", { 
      host: !!smtpHost, 
      user: !!smtpUser, 
      pass: !!smtpPass 
    });
    return res.status(500).json({ error: "Email service not configured. Please check server environment variables." });
  }

  const smtpPort = parseInt(smtpPortStr);

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465, // Use SSL/TLS for port 465, STARTTLS for 587
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
    // Adding these for better compatibility with corporate networks/proxies
    tls: {
      rejectUnauthorized: false
    }
  });

  const mailOptions = {
    from: process.env.SMTP_USER || email,
    to: process.env.CONTACT_RECEIVER || process.env.CONTACT_RECEIVER_EMAIL || "audiovisual2024@rittiya.ac.th",
    subject: `New Contact Form Submission: ${subject || "No Subject"}`,
    text: `
      Name: ${name}
      Email: ${email}
      Subject: ${subject}
      
      Message:
      ${message}
    `,
    replyTo: email
  };

  try {
    // If SMTP_HOST is not set, we can't send real emails
    // But we'll log it and simulate success for the demo if user hasn't configured yet
    if (!process.env.SMTP_HOST) {
        console.warn("SMTP_HOST not set. Email not sent, but simulating success for demo.");
        console.log("Form Content:", mailOptions);
        return res.json({ success: true, message: "Demo mode: Information received (check server logs)." });
    }

    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "Your message has been sent successfully!" });
  } catch (error: any) {
    console.error("Error sending email:", error);
    
    let errorMessage = "Failed to send message. Please try again later.";
    if (error.code === 'EAUTH') {
      errorMessage = "Email authentication failed. If using Gmail, please ensure you are using an 'App Password' and that 'Less secure app access' is handled correctly. Also verify your SMTP_USER and SMTP_PASS in settings.";
    } else if (error.code === 'ECONNREFUSED' || error.code === 'ETIMEDOUT') {
      errorMessage = "Could not connect to the email server. Please check your SMTP_HOST and SMTP_PORT.";
    }

    res.status(500).json({ error: errorMessage });
  }
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
