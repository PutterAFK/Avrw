import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send,
  MessageCircle,
  Clock,
  ExternalLink,
  Facebook,
  Globe,
  Loader2,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

interface ContactProps {
  onNavigate: (page: string) => void;
}

export default function Contact({ onNavigate }: ContactProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [statusMsg, setStatusMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('loading');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setStatusMsg(data.message || "ส่งข้อความเรียบร้อยแล้ว!");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        throw new Error(data.error || "เกิดข้อผิดพลาดในการส่งข้อความ");
      }
    } catch (error: any) {
      setStatus('error');
      setStatusMsg(error.message || "ไม่สามารถส่งข้อความได้ในขณะนี้");
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col min-h-screen pt-20 bg-background"
    >
      <section className="py-16 px-8 max-w-7xl mx-auto w-full">
         <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-primary mb-4 font-display-lg">ช่องทางการติดต่อ</h1>
            <p className="text-on-surface-variant max-w-2xl mx-auto font-medium">
               หากคุณมีข้อสงสัยหรือต้องการข้อมูลเพิ่มเติมเกี่ยวกับบริการของเรา ทีมงานของเราพร้อมให้ความช่วยเหลือแก่คุณเสมอ
            </p>
         </div>

         <div className="grid md:grid-cols-12 gap-8 lg:gap-12">
            <div className="md:col-span-4 space-y-6">
                <ContactInfoCard 
                   icon={<Mail />} 
                   title="อีเมล" 
                   content="audiovisual2024@rittiya.ac.th" 
                />
                <ContactInfoCard 
                   icon={<MapPin />} 
                   title="สถานที่ตั้ง" 
                   content="ด้านล่างหอประชุมอยู่ด้านข้างห้องสมุด" 
                />
                
                <div className="bg-primary-container text-white p-8 rounded-3xl shadow-xl overflow-hidden relative">
                   <div className="absolute -top-12 -right-12 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
                   <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <Clock size={20} className="text-secondary-fixed" /> เวลาเข้าพบ
                   </h3>
                   <div className="space-y-3 text-sm font-medium text-blue-100/70">
                      <div className="flex justify-between">
                         <span>จันทร์ - ศุกร์:</span>
                         <span className="text-white">08:00 - 16:30</span>
                      </div>
                      <div className="flex justify-between">
                         <span>เสาร์ - อาทิตย์:</span>
                         <span className="text-white">ปิดทำการ</span>
                      </div>
                   </div>
                </div>
            </div>

            <div className="md:col-span-8">
               <div className="bg-white p-10 rounded-[32px] shadow-2xl border border-slate-100">
                  <h2 className="text-2xl font-bold text-primary mb-8 flex items-center gap-2">
                     <Send size={24} className="text-secondary-container" /> ส่งคำถามถึงเรา
                  </h2>

                  <AnimatePresence mode="wait">
                    {status === 'success' ? (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-emerald-50 border border-emerald-200 p-8 rounded-2xl flex flex-col items-center text-center gap-4"
                      >
                        <CheckCircle2 size={48} className="text-emerald-500" />
                        <div>
                          <h3 className="text-xl font-bold text-emerald-900 mb-1">ส่งข้อความสำเร็จ!</h3>
                          <p className="text-emerald-700">{statusMsg}</p>
                        </div>
                        <button 
                          onClick={() => setStatus('idle')}
                          className="text-emerald-600 font-bold hover:underline text-sm"
                        >
                          ส่งข้อความอื่นเพิ่มเติม
                        </button>
                      </motion.div>
                    ) : (
                      <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
                         <div className="space-y-2">
                            <label className="text-xs font-bold text-primary uppercase tracking-wider">ชื่อ-นามสกุล</label>
                            <input 
                              type="text" 
                              required
                              value={formData.name}
                              onChange={e => setFormData({...formData, name: e.target.value})}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/10 focus:outline-none transition-all" 
                              placeholder="ระบุชื่อของคุณ" 
                            />
                         </div>
                         <div className="space-y-2">
                            <label className="text-xs font-bold text-primary uppercase tracking-wider">อีเมล / ช่องทางติดต่อ</label>
                            <input 
                              type="email" 
                              required
                              value={formData.email}
                              onChange={e => setFormData({...formData, email: e.target.value})}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/10 focus:outline-none transition-all" 
                              placeholder="audiovisual2024@rittiya.ac.th" 
                            />
                         </div>
                         <div className="space-y-2 md:col-span-2">
                            <label className="text-xs font-bold text-primary uppercase tracking-wider">หัวข้อเรื่อง</label>
                            <input 
                              type="text" 
                              value={formData.subject}
                              onChange={e => setFormData({...formData, subject: e.target.value})}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/10 focus:outline-none transition-all" 
                              placeholder="เช่น ขอจองถังไฟ แสตูดิโอ" 
                            />
                         </div>
                         <div className="space-y-2 md:col-span-2">
                            <label className="text-xs font-bold text-primary uppercase tracking-wider">ข้อความรายละเอียด</label>
                            <textarea 
                              required
                              value={formData.message}
                              onChange={e => setFormData({...formData, message: e.target.value})}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/10 focus:outline-none min-h-[120px] transition-all" 
                              placeholder="ระบข้อมูลที่คุณต้องการทราบ..." 
                            />
                         </div>
                         
                         {status === 'error' && (
                           <div className="md:col-span-2 flex items-center gap-2 text-red-500 text-sm font-bold bg-red-50 p-4 rounded-xl border border-red-100 italic">
                             <AlertCircle size={18} />
                             {statusMsg}
                           </div>
                         )}

                         <button 
                           disabled={status === 'loading'}
                           className="md:col-span-2 bg-primary text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 hover:brightness-110 active:scale-95 disabled:opacity-50 disabled:active:scale-100 transition-all shadow-lg mt-4"
                         >
                            {status === 'loading' ? (
                              <>
                                <Loader2 size={20} className="animate-spin" />
                                กำลังส่งข้อความ...
                              </>
                            ) : (
                              <>
                                <Send size={20} />
                                ส่งข้อความ
                              </>
                            )}
                         </button>
                      </form>
                    )}
                  </AnimatePresence>
               </div>

               <div className="mt-8 flex flex-wrap gap-4">
                  <SocialButton 
                    icon={<Facebook />} 
                    label="Facebook" 
                    color="bg-blue-600" 
                    href="https://www.facebook.com/AVRittiya"
                  />
                  <SocialButton 
                    icon={<MessageCircle />} 
                    label="LINE Official" 
                    color="bg-green-500" 
                    href="https://line.me/R/ti/p/@405ckbrm?ts=03161731&oat_content=url"
                  />
                  <SocialButton 
                    icon={<Globe />} 
                    label="Website" 
                    color="bg-slate-700" 
                    href="https://linktr.ee/audiovisual.RW"
                  />
               </div>
            </div>
         </div>
      </section>
    </motion.div>
  );
}

function ContactInfoCard({ icon, title, content }: any) {
  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-lg flex items-center gap-5 group hover:border-primary transition-all">
       <div className="shrink-0 w-14 h-14 bg-secondary-container/10 text-primary rounded-2xl flex items-center justify-center shadow-sm">
          {icon}
       </div>
       <div>
          <div className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-0.5">{title}</div>
          <div className="text-sm font-bold text-primary">{content}</div>
       </div>
    </div>
  );
}

function SocialButton({ icon, label, color, href }: any) {
  return (
    <button 
      onClick={() => href && window.open(href, '_blank')}
      className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-white font-bold text-sm shadow-md hover:scale-105 active:scale-95 transition-all ${color}`}
    >
       {icon}
       <span>{label}</span>
       <ExternalLink size={14} className="opacity-50" />
    </button>
  );
}
