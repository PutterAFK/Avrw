import { motion } from "motion/react";
import { 
  Video, 
  Clapperboard, 
  Tv, 
  Mail, 
  Phone,
  ArrowRight,
  Archive,
  History,
  Film
} from "lucide-react";

interface VideographerProps {
  onNavigate: (page: string) => void;
}

export default function Videographer({ onNavigate }: VideographerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.1 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="flex flex-col min-h-screen pt-20"
    >
      {/* Hero Section */}
      <section className="relative min-h-[500px] flex items-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 opacity-40">
          <img 
            className="w-full h-full object-cover" 
            alt="Videography"
            src="https://images.unsplash.com/photo-1574717024453-354444635811?q=80&w=2000&auto=format&fit=crop" 
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-8 w-full">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 py-1 px-3 rounded bg-primary-container text-white text-xs font-bold mb-6 uppercase tracking-wider">
               <Video size={14} /> Professional Video Services
            </span>
            <h1 className="text-5xl font-bold text-white mb-4">Videographer - งานโสตทัศนศึกษา</h1>
            <p className="text-lg text-slate-300 max-w-xl leading-relaxed">
              บันทึกภาพเคลื่อนไหวและเสียง โดยใช้กล้องคุณภาพสูงและอุปกรณ์กันสั่น เพื่อถ่ายทอดเรื่องราวผ่านงานวิดีโอระดับมืออาชีพ
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center justify-between mb-12 gap-8">
            <h2 className="text-3xl font-bold text-slate-900">ผลงานวิดีโอ 2567</h2>
            <div className="h-px flex-grow bg-slate-200 hidden md:block"></div>
            <button className="bg-primary text-white px-6 py-2 rounded-full text-xs font-bold flex items-center gap-2 hover:bg-primary/90 transition-all">
               <Archive size={14} /> VIDEO ARCHIVE
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-8 group relative overflow-hidden rounded-2xl bg-white shadow-xl aspect-video">
              <img 
                src="https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=1200&auto=format&fit=crop" 
                alt="Cinema Production" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform group-hover:bg-white/30">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-primary shadow-2xl">
                    <Video size={32} />
                  </div>
                </div>
              </div>
              <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/80 to-transparent text-white">
                 <span className="text-primary font-bold text-xs uppercase mb-2 block">Featured Reel</span>
                 <h3 className="text-3xl font-bold mb-4">วิดีโอสรุปภาพรวมปฐมนิเทศ</h3>
                 <div className="flex items-center gap-2 text-xs opacity-80">
                    <History size={14} /> มิถุนายน 2567
                 </div>
              </div>
            </div>

            <div className="md:col-span-4 flex flex-col gap-8">
              <div className="bg-primary/5 p-8 rounded-2xl border border-primary/10 flex flex-col justify-center shadow-lg">
                 <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center mb-6">
                    <Clapperboard size={24} />
                 </div>
                 <h3 className="text-xl font-bold text-slate-900 mb-3">Live Streaming Ceremony</h3>
                 <p className="text-sm text-slate-600 leading-relaxed">
                   การถ่ายทอดสดพิธีการสำคัญ ผ่านระบบสลับภาพแบบ Multi-cam เพื่อคุณภาพการรับชมที่สมบูรณ์แบบ
                 </p>
              </div>
              
              <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-xl overflow-hidden aspect-video relative group cursor-pointer hover:border-primary transition-all">
                 <img 
                    src="https://images.unsplash.com/photo-1498513191318-8625e57d4a2d?q=80&w=800&auto=format&fit=crop" 
                    alt="Editor at work"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                 />
                 <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Film className="text-white w-12 h-12" />
                 </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-lg flex justify-between items-center text-center">
               <div className="flex-1">
                  <div className="text-4xl font-bold text-primary mb-1">45h+</div>
                  <div className="text-xs uppercase tracking-widest font-bold text-slate-500">Video Produced</div>
               </div>
               <div className="w-px h-12 bg-slate-200"></div>
               <div className="flex-1">
                  <div className="text-4xl font-bold text-primary mb-1">12</div>
                  <div className="text-xs uppercase tracking-widest font-bold text-slate-500">Live Streams</div>
               </div>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-lg group hover:border-primary transition-all cursor-pointer flex items-center gap-6">
                <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center text-primary shadow-md">
                   <Mail size={24} />
                </div>
                <div className="flex-grow">
                   <div className="text-xs text-slate-500 font-bold mb-1">Production Email</div>
                   <div className="text-sm font-bold text-slate-900 font-mono">audiovisual2024@rittiya.ac.th</div>
                </div>
                <ArrowRight size={20} className="text-slate-300 group-hover:text-primary transition-colors" />
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-lg group hover:border-primary transition-all cursor-pointer flex items-center gap-6">
                <div className="w-14 h-14 bg-slate-900 rounded-full flex items-center justify-center text-white shadow-md">
                   <Tv size={24} />
                </div>
                <div className="flex-grow">
                   <div className="text-xs text-slate-500 font-bold mb-1">Studio Line</div>
                   <div className="text-sm font-bold text-slate-900 font-mono">Ext. 8845</div>
                </div>
                <ArrowRight size={20} className="text-slate-300 group-hover:text-primary transition-colors" />
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
