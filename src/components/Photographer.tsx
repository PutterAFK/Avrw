import { motion } from "motion/react";
import { 
  Camera, 
  Video, 
  Image as ImageIcon, 
  Mail, 
  Phone,
  ArrowRight,
  Archive,
  History
} from "lucide-react";

interface PhotographerProps {
  onNavigate: (page: string) => void;
}

export default function Photographer({ onNavigate }: PhotographerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.1 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="flex flex-col min-h-screen pt-20"
    >
      {/* Hero Section */}
      <section className="relative min-h-[500px] flex items-center overflow-hidden bg-primary-container">
        <div className="absolute inset-0 opacity-40">
          <img 
            className="w-full h-full object-cover" 
            alt="Photography"
            src="https://images.unsplash.com/photo-1452784444945-3f422708bc34?q=80&w=2000&auto=format&fit=crop" 
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary-container via-primary-container/80 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-8 w-full">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 py-1 px-3 rounded bg-secondary-fixed text-on-secondary-fixed text-xs font-bold mb-6 uppercase tracking-wider">
               <Camera size={14} /> Professional Services
            </span>
            <h1 className="text-5xl font-bold text-white mb-4">Photographer - งานโสตทัศนศึกษา</h1>
            <p className="text-lg text-on-primary-container max-w-xl leading-relaxed">
              สร้างภาพถ่าย โดยใช้กล้องและอุปกรณ์ต่าง ๆ เพื่อบันทึกช่วงเวลา เรื่องราว อารมณ์ ด้วยความประณีตระดับมืออาชีพ
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="bg-technical-pattern blue-pattern-bg py-24">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center justify-between mb-12 gap-8">
            <h2 className="text-3xl font-bold text-primary-container">ผลงานปี 2567</h2>
            <div className="h-px flex-grow bg-slate-200 hidden md:block"></div>
            <button className="bg-primary text-white px-6 py-2 rounded-full text-xs font-bold flex items-center gap-2 hover:bg-primary/90 transition-all">
               <Archive size={14} /> ANNUAL ARCHIVE
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-8 group relative overflow-hidden rounded-2xl bg-white shadow-xl aspect-video md:aspect-auto md:h-[500px]">
              <img 
                src="https://images.unsplash.com/photo-1541252260730-0412e8e2108e?q=80&w=1200&auto=format&fit=crop" 
                alt="Sports Event" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/80 to-transparent text-white">
                 <span className="text-secondary-container font-bold text-xs uppercase mb-2 block">Featured Project</span>
                 <h3 className="text-3xl font-bold mb-4">ถ่ายภาพงานกีฬาสี</h3>
                 <div className="flex items-center gap-2 text-xs opacity-80">
                    <History size={14} /> พฤษภาคม 2567
                 </div>
              </div>
            </div>

            <div className="md:col-span-4 flex flex-col gap-8">
              <div className="bg-yellow-50/50 p-8 rounded-2xl border border-yellow-100 flex flex-col justify-center shadow-lg">
                 <div className="w-12 h-12 bg-primary-container text-white rounded-lg flex items-center justify-center mb-6">
                    <ImageIcon size={24} />
                 </div>
                 <h3 className="text-xl font-bold text-primary-container mb-3">บันทึกภาพพิธีไหว้ครู</h3>
                 <p className="text-sm text-on-surface-variant leading-relaxed">
                   Capturing the solemnity and grace of traditional ceremonies with high-fidelity professional equipment.
                 </p>
              </div>
              
              <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-xl overflow-hidden aspect-video relative group cursor-pointer border border-transparent hover:border-primary transition-all">
                 <img 
                    src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=800&auto=format&fit=crop" 
                    alt="Gallery item"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                 />
                 <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-surface-container-lowest p-8 rounded-2xl border border-slate-100 shadow-lg flex justify-between items-center text-center">
               <div className="flex-1">
                  <div className="text-4xl font-bold text-primary mb-1">1.2k+</div>
                  <div className="text-xs uppercase tracking-widest font-bold text-on-surface-variant">Shots Taken</div>
               </div>
               <div className="w-px h-12 bg-slate-200"></div>
               <div className="flex-1">
                  <div className="text-4xl font-bold text-primary mb-1">24</div>
                  <div className="text-xs uppercase tracking-widest font-bold text-on-surface-variant">Events Served</div>
               </div>
            </div>

            <div className="bg-surface-container-lowest p-8 rounded-2xl border border-slate-100 shadow-lg group hover:border-primary transition-all cursor-pointer flex items-center gap-6">
                <div className="w-14 h-14 bg-secondary-fixed rounded-full flex items-center justify-center text-primary shadow-md">
                   <Mail size={24} />
                </div>
                <div className="flex-grow">
                   <div className="text-xs text-on-surface-variant font-bold mb-1">Official Email</div>
                   <div className="text-sm font-bold text-primary">audiovisual2024@rittiya.ac.th</div>
                </div>
                <ArrowRight size={20} className="text-slate-300 group-hover:text-primary transition-colors" />
            </div>

            <div className="bg-surface-container-lowest p-8 rounded-2xl border border-slate-100 shadow-lg group hover:border-primary transition-all cursor-pointer flex items-center gap-6">
                <div className="w-14 h-14 bg-primary-container rounded-full flex items-center justify-center text-white shadow-md">
                   <Phone size={24} />
                </div>
                <div className="flex-grow">
                   <div className="text-xs text-on-surface-variant font-bold mb-1">Direct Line</div>
                   <div className="text-sm font-bold text-primary">Ext. 8842</div>
                </div>
                <ArrowRight size={20} className="text-slate-300 group-hover:text-primary transition-colors" />
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
