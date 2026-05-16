import { motion } from "motion/react";
import { 
  ClipboardCheck, 
  Wrench, 
  Clock, 
  Headset, 
  MapPin, 
  ArrowRight,
  AlertTriangle,
  Play,
  Video
} from "lucide-react";

import imgServiceHub from "../assets/images/regenerated_image_1778907964824.jpg";

interface ServiceHubProps {
  onNavigate: (page: string) => void;
}

export default function ServiceHub({ onNavigate }: ServiceHubProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col min-h-screen"
    >
      <main className="flex-grow relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 grid-pattern pointer-events-none opacity-[0.03]"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/2 -left-24 w-64 h-64 bg-secondary-container/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-8 py-16 relative">
          <div className="mb-12">
            <h1 className="text-5xl font-bold text-primary mb-4">ศูนย์รวมบริการโสตทัศนศึกษา</h1>
            <p className="text-xl text-on-surface-variant max-w-2xl leading-relaxed">
              ยินดีต้อนรับสู่ Service Hub พื้นที่สำหรับการจัดการทุกความต้องการด้านสื่อและอุปกรณ์โสตฯ ของคุณให้เป็นเรื่องง่ายและเป็นมืออาชีพ
            </p>
          </div>

          {/* Main Service Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Request Service Card */}
            <div className="group bg-surface-container-lowest border border-outline-variant rounded-xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Video size={120} />
              </div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-primary-fixed rounded-xl flex items-center justify-center mb-6">
                  <ClipboardCheck className="text-primary" size={32} />
                </div>
                <h2 className="text-3xl font-bold text-primary mb-4">แบบฟอร์มขอใช้บริการโสตฯ</h2>
                <p className="text-on-surface-variant mb-8 leading-relaxed">
                  ต้องการบันทึกวิดีโอการสอน ถ่ายภาพกิจกรรม หรือขอรับการสนับสนุนด้านเทคนิคในห้องประชุม กรุณากรอกรายละเอียดเพื่อรับการบริการจากทีมงานมืออาชีพ
                </p>
                <div className="flex flex-wrap gap-4 mb-8 text-xs font-bold">
                  <span className="flex items-center gap-2 px-3 py-1 bg-surface-container rounded-full">
                    การบันทึกวิดีโอ
                  </span>
                  <span className="flex items-center gap-2 px-3 py-1 bg-surface-container rounded-full">
                    ถ่ายภาพกิจกรรม
                  </span>
                  <span className="flex items-center gap-2 px-3 py-1 bg-surface-container rounded-full">
                    ระบบเสียงและแสง
                  </span>
                </div>
              </div>
              <button 
                onClick={() => window.open('https://docs.google.com/forms/d/e/1FAIpQLSfIqY0uwlQPzIx_r8SGsxGx9gnNueZSnqBGsuamRIymz3fPFw/viewform', '_blank')}
                className="w-full bg-primary text-white font-bold py-4 rounded-lg hover:shadow-md active:scale-[0.98] transition-all flex items-center justify-center gap-2 group-hover:bg-primary/90"
              >
                <span>เริ่มกรอกแบบฟอร์มขอใช้บริการ</span>
                <ArrowRight size={20} />
              </button>
            </div>

            {/* Repair Service Card */}
            <div className="group bg-surface-container-lowest border border-outline-variant rounded-xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Wrench size={120} />
              </div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-secondary-fixed rounded-xl flex items-center justify-center mb-6">
                  <Wrench className="text-secondary" size={32} />
                </div>
                <h2 className="text-3xl font-bold text-primary mb-4">แบบฟอร์มแจ้งซ่อมอุปกรณ์</h2>
                <p className="text-on-surface-variant mb-8 leading-relaxed">
                  อุปกรณ์ขัดข้องหรือเสียหาย? แจ้งเรื่องให้เจ้าหน้าที่ตรวจสอบและซ่อมบำรุงทันที เพื่อให้อุปกรณ์พร้อมสำหรับการใช้งานในการเรียนการสอนครั้งถัดไป
                </p>
                <div className="flex flex-wrap gap-4 mb-8 text-xs font-bold">
                  <span className="flex items-center gap-2 px-3 py-1 bg-surface-container rounded-full text-error">
                    <AlertTriangle size={14} /> โปรเจคเตอร์ไม่ทำงาน
                  </span>
                  <span className="flex items-center gap-2 px-3 py-1 bg-surface-container rounded-full">
                    ไมโครโฟนเสีย
                  </span>
                  <span className="flex items-center gap-2 px-3 py-1 bg-surface-container rounded-full">
                    ระบบสายสัญญาณ
                  </span>
                </div>
              </div>
              <button 
                onClick={() => window.open('https://docs.google.com/forms/d/e/1FAIpQLSd5SxEtgEq1iKVt__PjBBJMhqT9kGhao9w_FppE-jrqg9W7DA/viewform', '_blank')}
                className="w-full bg-secondary-container text-primary font-bold py-4 rounded-lg hover:shadow-md active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <span>แจ้งซ่อมอุปกรณ์ด่วน</span>
                <AlertTriangle size={20} />
              </button>
            </div>
          </div>

          {/* Quick Info Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InfoCard 
              icon={<Clock />} 
              title="นัดหมายล่วงหน้า" 
              desc="จองเวลาปรึกษางาน 30 นาทีผ่านระบบ" 
              color="bg-blue-50 text-blue-900" 
              onClick={() => window.open('https://calendar.google.com/appointments/schedules/AcZssZ2u5YdgJKPz5UC-9WHbMcpZsYBFp10JSz6RL0girj6LGZheNZpJvlii5ZPLNjJLg7PjeWp_l2Dw', '_blank')}
            />
            <InfoCard 
              icon={<Headset />} 
              title="ระบบจัดการคิว" 
              desc="อัปเดตสถานะการจองแบบเรียลไทม์" 
              color="bg-yellow-50 text-yellow-700" 
              onClick={() => onNavigate('schedule')}
            />
            <InfoCard 
              icon={<MapPin />} 
              title="ฝ่ายโสตทัศนศึกษา" 
              desc="ด้านล่างหอประชุมอยู่ด้านข้างห้องสมุด" 
              color="bg-slate-100 text-slate-700" 
            />
          </div>

          {/* Featured Image Section */}
          <div className="mt-16 rounded-2xl overflow-hidden shadow-xl border border-outline-variant h-96 relative group bg-slate-900">
            <img 
              alt="โรงเรียนฤทธิยะวรรณาลัย" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80" 
              src={imgServiceHub} 
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/10 to-transparent flex items-end p-8">
            </div>
          </div>
        </div>
      </main>
    </motion.div>
  );
}

function InfoCard({ icon, title, desc, color, onClick }: any) {
  return (
    <div 
      onClick={onClick}
      className={`bg-white border border-slate-200 p-6 rounded-xl flex items-center gap-4 shadow-sm ${onClick ? 'cursor-pointer hover:border-primary transition-all' : ''}`}
    >
      <div className={`p-4 rounded-lg ${color}`}>
        {icon}
      </div>
      <div>
        <div className="font-bold text-primary">{title}</div>
        <div className="text-sm text-on-surface-variant">{desc}</div>
      </div>
    </div>
  );
}
