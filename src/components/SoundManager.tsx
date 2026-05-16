import { motion } from "motion/react";
import { 
  Settings, 
  Mic2, 
  Volume2, 
  Mail, 
  Phone,
  CheckCircle2,
  ArrowRight
} from "lucide-react";

interface SoundManagerProps {
  onNavigate: (page: string) => void;
}

export default function SoundManager({ onNavigate }: SoundManagerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col min-h-screen pt-20"
    >
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center overflow-hidden bg-primary-container">
        <div className="absolute inset-0 opacity-40">
          <img 
            className="w-full h-full object-cover" 
            alt="Audio Engineering"
            src="https://images.unsplash.com/photo-1514525253361-bee831827a93?q=80&w=2000&auto=format&fit=crop" 
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary-container via-primary-container/80 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-8 w-full">
          <div className="max-w-2xl">
            <span className="inline-block py-1 px-3 rounded bg-secondary-fixed text-on-secondary-fixed text-xs font-bold mb-6 uppercase tracking-wider">Expert Audio Engineering</span>
            <h1 className="text-5xl font-bold text-white mb-4">Sound Manager - งานโสตทัศนศึกษา</h1>
            <p className="text-lg text-on-primary-container max-w-xl leading-relaxed">
              ระบบเสียงทั้งหมด ในงานหรือโปรดักชันหนึ่ง ๆ ตั้งแต่การวางแผน ติดตั้ง ควบคุม ไปจนถึงแก้ปัญหาเสียงอย่างมืออาชีพ เพื่อความสมบูรณ์แบบของทุกโสตสัมผัส
            </p>
          </div>
        </div>
      </section>

      {/* Bento Content */}
      <section className="bg-technical-pattern blue-pattern-bg py-24">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-end justify-between mb-12 gap-8">
            <div>
              <h2 className="text-3xl font-bold text-primary-container mb-2">ผลงานปี 2567</h2>
              <p className="text-on-surface-variant text-sm">Engineering Precision in Creative Support.</p>
            </div>
            <div className="hidden md:block h-px flex-grow bg-slate-200"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-8 group relative overflow-hidden rounded-xl bg-surface-container-lowest shadow-lg border border-slate-100 hover:border-secondary-container p-8 min-h-[400px] flex flex-col justify-end transition-all">
              <div className="absolute top-0 right-0 p-8">
                <div className="w-16 h-16 rounded-full bg-secondary-fixed flex items-center justify-center text-primary-container shadow-md">
                  <Volume2 size={32} />
                </div>
              </div>
              <div className="relative z-10">
                <span className="font-bold text-sm text-secondary mb-2 block">Featured Project</span>
                <h3 className="text-3xl font-bold text-primary-container mb-4">ควบคุมเครื่องเสียงงานคอนเสิร์ตโรงเรียน</h3>
                <p className="text-on-surface-variant mb-6 max-w-lg leading-relaxed">
                  การบริหารจัดการระบบเสียงแบบ Multi-channel สำหรับวงดนตรีสดและนักร้องกว่า 20 ชีวิต บนเวทีขนาดใหญ่ พร้อมการแก้ปัญหาเฉพาะหน้าแบบ Real-time เพื่อคุณภาพเสียงที่คมชัดที่สุดสำหรับผู้ชมกว่า 2,000 คน
                </p>
                <div className="flex items-center gap-2 text-primary font-bold group-hover:gap-4 transition-all cursor-pointer">
                  <span>ดูรายละเอียดโปรเจกต์</span>
                  <ArrowRight size={16} />
                </div>
              </div>
              <div className="absolute inset-0 -z-0 opacity-5 group-hover:opacity-10 transition-opacity">
                 <img 
                    src="https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=1200&auto=format&fit=crop" 
                    alt="Stage" 
                    className="w-full h-full object-cover"
                 />
              </div>
            </div>

            <div className="md:col-span-4 bg-surface-container-lowest shadow-lg border border-slate-100 hover:border-secondary-container p-8 rounded-xl flex flex-col gap-6 transition-all">
              <div className="w-12 h-12 rounded-lg bg-primary-container flex items-center justify-center text-white">
                <Settings size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-primary-container mb-3">ติดตั้งระบบเสียงห้องประชุมใหม่</h3>
                <p className="text-on-surface-variant text-sm mb-4 leading-relaxed">
                  วางระบบ Acoustic และติดตั้งลำโพงแบบฝังฝ้าพร้อมไมโครโฟนไร้สาย เพื่อการสื่อสารที่มีประสิทธิภาพในห้องประชุมสัมมนาขนาดใหญ่
                </p>
                <div className="mt-auto text-secondary text-sm font-bold">
                  เสร็จสมบูรณ์เมื่อ มีนาคม 2567
                </div>
              </div>
            </div>

            <div className="md:col-span-4 bg-surface-container-lowest shadow-lg border border-slate-100 hover:border-secondary-container p-8 rounded-xl flex flex-col gap-6 transition-all">
              <div className="w-12 h-12 rounded-lg bg-secondary-fixed flex items-center justify-center text-primary-container">
                <Mic2 size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-primary-container mb-3">ดูแลงานกระจายเสียงยามเช้า</h3>
                <p className="text-on-surface-variant text-sm mb-4 leading-relaxed">
                  ควบคุมคุณภาพเสียงและการส่งสัญญาณกระจายเสียงทั่วพื้นที่ เพื่อกิจกรรมเคารพธงชาติและการประชาสัมพันธ์ข่าวสารรายวัน
                </p>
                <div className="mt-auto text-secondary text-sm font-bold">
                  งานประจำปีงบประมาณ 2567
                </div>
              </div>
            </div>

            <div className="md:col-span-8 bg-primary-container text-white p-8 rounded-xl flex flex-col md:flex-row gap-8 items-center shadow-xl">
              <div className="flex-grow">
                <h3 className="text-2xl font-bold mb-4 text-secondary-fixed">ต้องการที่ปรึกษาด้านระบบเสียง?</h3>
                <p className="text-blue-100/70 mb-6 text-sm">ทีมงาน Sound Manager พร้อมให้คำแนะนำด้านเทคนิคและการเลือกใช้อุปกรณ์ให้เหมาะสมกับงบประมาณและสถานที่ของคุณ</p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-3 px-4 py-2 bg-white/10 rounded-full border border-white/10 text-xs font-bold">
                    <Mail size={16} className="text-secondary-fixed" />
                    <span>audiovisual2024@rittiya.ac.th</span>
                  </div>
                  <div className="flex items-center gap-3 px-4 py-2 bg-white/10 rounded-full border border-white/10 text-xs font-bold">
                    <Phone size={16} className="text-secondary-fixed" />
                    <span>02-123-4567 ต่อ 88</span>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-56 h-56 rounded-xl overflow-hidden shadow-2xl shrink-0 border-4 border-white/10">
                <img 
                  className="w-full h-full object-cover" 
                  alt="Microphone"
                  src="https://images.unsplash.com/photo-1551712702-4b7335dd8706?q=80&w=800&auto=format&fit=crop" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="rounded-2xl shadow-2xl border border-white overflow-hidden aspect-video">
              <img 
                alt="Workspace"
                className="w-full h-full object-cover"
                src="https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?q=80&w=1200&auto=format&fit=crop" 
              />
            </div>
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-primary-container">มาตรฐานการทำงานของเรา</h2>
              <ul className="space-y-6">
                <StandardItem 
                  title="Precision Tuning" 
                  desc="ปรับจูนค่าความถี่เสียง (EQ) ให้เหมาะสมกับสภาพอะคูสติกของแต่ละสถานที่" 
                />
                <StandardItem 
                  title="Failure Prevention" 
                  desc="ระบบสำรองและการตรวจสอบอุปกรณ์ก่อนเริ่มงาน 100% เพื่อความมั่นใจ" 
                />
                <StandardItem 
                  title="Real-time Monitoring" 
                  desc="ควบคุมระดับเสียงให้สม่ำเสมอและป้องกันเสียงสะท้อน (Feedback) ตลอดงาน" 
                />
              </ul>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}

function StandardItem({ title, desc }: { title: string, desc: string }) {
  return (
    <div className="flex gap-4">
      <div className="shrink-0 w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-primary-container shadow-md">
        <CheckCircle2 size={20} />
      </div>
      <div>
        <h4 className="text-lg font-bold text-primary-container mb-1">{title}</h4>
        <p className="text-on-surface-variant text-sm leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
