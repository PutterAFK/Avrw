import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { 
  Bell, 
  UserCircle, 
  ChevronRight,
  LayoutDashboard,
  Youtube,
  Trophy,
  ArrowLeft,
  Plus,
  Users,
  MessageCircle,
  Facebook,
  Camera,
  Music,
  Clapperboard,
  FileText,
  LogOut,
  LogIn
} from "lucide-react";
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut, User as FirebaseUser, setPersistence, browserLocalPersistence, getRedirectResult } from "firebase/auth";
import { auth } from "./lib/firebase";

// Components
import Home from "./components/Home";
import ServiceHub from "./components/ServiceHub";
import ContentPage from "./components/ContentPage";
import SoundManager from "./components/SoundManager";
import Photographer from "./components/Photographer";
import Videographer from "./components/Videographer";
import Schedule from "./components/Schedule";
import Staff from "./components/Staff";
import Contact from "./components/Contact";

// Assets
import logoHeader from "./assets/images/regenerated_image_1778906655369.png";
import logoFooter from "./assets/images/regenerated_image_1778906658086.png";

type Page = 'home' | 'service_hub' | 'content' | 'sound_manager' | 'photographer' | 'videographer' | 'schedule' | 'staff' | 'contact';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [user, setUser] = useState<FirebaseUser | null>(null);

  // Handle scroll progress and auth redirect result
  useEffect(() => {
    getRedirectResult(auth).then((result) => {
      if (result) {
        console.log("Redirect login result:", result.user.email);
        setUser(result.user);
      }
    }).catch((error) => {
      console.error("Redirect login error:", error);
    });

    const unsubAuth = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });

    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollProgress(scrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      unsubAuth();
    };
  }, []);

  const handleLogin = async () => {
    try {
      await setPersistence(auth, browserLocalPersistence);
      const provider = new GoogleAuthProvider();
      // Add custom parameter to force account selection if needed
      provider.setCustomParameters({ prompt: 'select_account' });
      const result = await signInWithPopup(auth, provider);
      console.log("Logged in user:", result.user.email);
    } catch (error: any) {
      if (error.code === 'auth/popup-closed-by-user') return;
      if (error.code === 'auth/cancelled-popup-request') return;
      
      console.error("Login failed:", error);
      alert("เข้าสู่ระบบไม่สำเร็จ: " + (error.message || "โปรดตรวจสอบการตั้งค่าเบราว์เซอร์หรือสิทธิ์การเข้าถึง"));
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const navigate = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems = [
    { id: 'home', label: 'Home', th: 'หน้าหลัก' },
    { id: 'staff', label: 'Personnel', th: 'บุคลากร' },
    { id: 'service_hub', label: 'Service Hub', th: 'ระบบบริการ' },
    { id: 'schedule', label: 'AV Schedule', th: 'ตารางงาน' },
    { id: 'contact', label: 'Contact', th: 'ช่องทางการติดต่อ' },
  ];

  return (
    <div className="min-h-screen bg-background font-sans text-on-surface">
      {/* Top Navbar */}
      <header className="fixed top-0 w-full z-50 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md shadow-sm border-b border-slate-100 dark:border-slate-800 h-20">
        <div className="max-w-[1280px] mx-auto h-full px-8 flex justify-between items-center">
          <div 
            onClick={() => navigate('home')}
            className="flex items-center gap-3 cursor-pointer group"
            id="logo-home-link"
          >
            <div className="relative w-12 h-12 flex items-center justify-center bg-primary rounded-xl overflow-hidden shadow-lg group-hover:shadow-secondary/20 group-hover:scale-105 transition-all outline outline-2 outline-offset-2 outline-transparent group-hover:outline-secondary">
              <img 
                alt="AV Dept Logo" 
                className="h-full w-full object-contain" 
                src={logoHeader} 
              />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mt-1">งานโสตทัศนศึกษา ฤทธิยะวรรณาลัย</span>
            </div>
          </div>

          <nav className="hidden lg:flex items-center h-full space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => navigate(item.id as Page)}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                  currentPage === item.id 
                    ? 'text-primary bg-secondary-container shadow-md' 
                    : 'text-slate-600 hover:text-primary hover:bg-slate-50'
                }`}
              >
                {item.id === 'home' ? 'Home' : 
                 item.id === 'staff' ? 'บุคลากร' : 
                 item.id === 'service_hub' ? 'Service Hub' : 
                 item.id === 'schedule' ? 'AV Schedule' : 'Contact'}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            {/* Service Sub-navigation for Professional Categories */}
            {['photographer', 'sound_manager', 'videographer', 'content'].includes(currentPage) && (
              <div className="hidden lg:flex items-center gap-6 mr-6">
                {[
                  { id: 'photographer', label: 'Photographer' },
                  { id: 'sound_manager', label: 'Sound Manager' },
                  { id: 'videographer', label: 'Videographer' },
                  { id: 'content', label: 'Content' }
                ].map((service) => (
                  <button
                    key={service.id}
                    onClick={() => navigate(service.id as Page)}
                    className="relative py-2 text-[13px] font-bold text-slate-800 transition-all hover:text-primary group"
                  >
                    <span>{service.label}</span>
                    {currentPage === service.id ? (
                      <motion.div 
                        layoutId="activeSubNav"
                        className="absolute bottom-0 left-0 w-full h-1 bg-secondary rounded-full" 
                      />
                    ) : (
                      <div className="absolute bottom-0 left-0 w-0 h-1 bg-secondary rounded-full transition-all group-hover:w-full opacity-30" />
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* Auth Button */}
            {user ? (
               <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-900 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 shadow-sm">
                    <img src={user.photoURL || ''} alt="" className="w-6 h-6 rounded-full border border-white" />
                    <span className="text-[11px] font-bold text-primary truncate max-w-[80px]">{user.displayName?.split(' ')[0]}</span>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="p-2 text-slate-400 hover:text-red-500 transition-all hover:bg-red-50 rounded-full"
                    title="ออกจากระบบ"
                  >
                    <LogOut size={18} />
                  </button>
               </div>
            ) : (
              <button 
                onClick={handleLogin}
                className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-full text-[13px] font-bold hover:brightness-110 active:scale-95 transition-all shadow-md"
              >
                <LogIn size={16} />
                <span>Log In</span>
              </button>
            )}
          </div>
        </div>
        
        {/* Scroll Progress Bar */}
        <div className="absolute bottom-0 left-0 h-0.5 bg-secondary-container transition-all" style={{ width: `${scrollProgress}%` }}></div>
      </header>

      {/* Screen Sections with Transitions */}
      <main className="relative">
        <AnimatePresence mode="wait">
          {currentPage === 'home' && (
            <motion.div key="home">
               <Home onNavigate={(page) => navigate(page as Page)} />
            </motion.div>
          )}
          {currentPage === 'service_hub' && (
            <motion.div key="service_hub">
               <ServiceHub onNavigate={(page) => navigate(page as Page)} />
            </motion.div>
          )}
          {currentPage === 'content' && (
            <motion.div key="content">
               <ContentPage onNavigate={(page) => navigate(page as Page)} />
            </motion.div>
          )}
          {currentPage === 'sound_manager' && (
            <motion.div key="sound_manager">
               <SoundManager onNavigate={(page) => navigate(page as Page)} />
            </motion.div>
          )}
          {currentPage === 'photographer' && (
            <motion.div key="photographer">
               <Photographer onNavigate={(page) => navigate(page as Page)} />
            </motion.div>
          )}
          {currentPage === 'videographer' && (
            <motion.div key="videographer">
               <Videographer onNavigate={(page) => navigate(page as Page)} />
            </motion.div>
          )}
          {currentPage === 'schedule' && (
            <motion.div key="schedule">
               <Schedule 
                 user={user} 
                 onNavigate={(page) => navigate(page as Page)} 
                 onLogin={handleLogin}
                 onLogout={handleLogout}
               />
            </motion.div>
          )}
          {currentPage === 'staff' && (
            <motion.div key="staff">
               <Staff onNavigate={(page) => navigate(page as Page)} />
            </motion.div>
          )}
          {currentPage === 'contact' && (
            <motion.div key="contact">
               <Contact onNavigate={(page) => navigate(page as Page)} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 w-full lg:hidden bg-white/95 backdrop-blur-md border-t border-slate-200 z-50 flex justify-around items-center py-2 px-2 shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
         <MobileNavItem 
          active={currentPage === 'home'} 
          icon={<LayoutDashboard size={20} />} 
          label="หน้าหลัก" 
          onClick={() => navigate('home')} 
         />
         <MobileNavItem 
          active={currentPage === 'service_hub'} 
          icon={<Bell size={20} />} 
          label="บริการ" 
          onClick={() => navigate('service_hub')} 
         />
         <div className="-mt-10 bg-white p-2 rounded-full shadow-xl mb-4">
            <button 
              onClick={() => navigate('schedule')}
              className="w-14 h-14 bg-primary text-secondary-container rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform"
            >
              <Plus size={24} />
            </button>
         </div>
         <MobileNavItem 
          active={currentPage === 'staff'} 
          icon={<Users size={20} />} 
          label="ทีมงาน" 
          onClick={() => navigate('staff')} 
         />
         <MobileNavItem 
          active={currentPage === 'contact'} 
          icon={<MessageCircle size={20} />} 
          label="ติดต่อ" 
          onClick={() => navigate('contact')} 
         />
      </nav>

      {/* Footer */}
      <footer className="bg-slate-50 border-t border-slate-200 py-16 px-8 mt-24">
        <div className="max-w-[1280px] mx-auto">
           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 mb-12">
              <div className="space-y-4">
                 <div className="flex items-center gap-2">
                    <img 
                       alt="Logo" 
                       className="h-10 w-auto transition-all cursor-pointer hover:scale-105" 
                       src={logoFooter} 
                       onClick={() => navigate('home')} 
                    />
                 </div>
                 <p className="text-xs uppercase tracking-[0.2em] font-bold text-slate-400">© 2024 งานโสตทัศนศึกษา ฤทธิยะวรรณาลัย. The Professional Creative.</p>
              </div>
              
              <div className="flex flex-wrap gap-8 lg:gap-12">
                 <FooterLink label="Support Desk" />
                 <FooterLink label="Equipment FAQ" />
                 <FooterLink label="Brand Guidelines" />
                 <FooterLink label="Privacy" />
              </div>
           </div>
           
            <div className="flex justify-between items-center pt-12 border-t border-slate-200">
              <div className="flex gap-4">
                 <SocialIcon 
                   icon={<Youtube size={20} />} 
                   href="https://www.youtube.com/@whatissodrwdoing"
                 />
                 <SocialIcon 
                   icon={<Facebook size={20} />} 
                   href="https://www.facebook.com/AVRittiya"
                 />
                 <SocialIcon icon={<Trophy size={20} />} />
              </div>
              <div className="text-[10px] uppercase font-black text-primary tracking-widest bg-secondary-container px-3 py-1 rounded">Thailand</div>
           </div>
        </div>
      </footer>
    </div>
  );
}

function MobileNavItem({ active, icon, label, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center gap-1 flex-1 py-1 transition-all ${active ? 'text-primary scale-110' : 'text-slate-400 opacity-60'}`}
    >
      {icon}
      <span className="text-[10px] font-bold">{label}</span>
      {active && <motion.div layoutId="mobile-nav-dot" className="w-1 h-1 bg-primary rounded-full mt-1" />}
    </button>
  );
}

function FooterLink({ label }: { label: string }) {
  return (
    <a href="#" className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-primary transition-colors underline-offset-4 decoration-secondary hover:underline">
       {label}
    </a>
  );
}

function SocialIcon({ icon, href }: { icon: any; href?: string }) {
  return (
    <button 
      onClick={() => href && window.open(href, '_blank')}
      className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-primary hover:bg-white hover:shadow-lg transition-all duration-300"
    >
       {icon}
    </button>
  );
}
