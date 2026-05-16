import { motion } from "motion/react";
import { 
  Users as UsersIcon, 
  Mail, 
  Phone,
  Layout,
  Briefcase,
  GraduationCap,
  Award
} from "lucide-react";

interface StaffProps {
  onNavigate: (page: string) => void;
}

export default function Staff({ onNavigate }: StaffProps) {
  const staffMembers = [
    { id: 1, name: 'ครูธนพร มาธุระ (ครูวา)', role: 'หัวหน้างานโสตทัศนศึกษา', img: '/src/assets/images/regenerated_image_1778776700156.png', pos: 'object-center', scale: 'scale-100', height: 'h-[148.59px]' },
    { id: 2, name: 'ครูศิวฤทธิ์ โอวาทกถา (ครูอิทธ์)', role: 'Sound Manager', img: '/src/assets/images/regenerated_image_1778776887146.jpg', pos: 'object-center', scale: 'scale-100', height: 'h-[170.59px]' },
    { id: 3, name: 'ครูศิวกร สุพัธนาพงศ์ (ครูกร)', role: 'Videographer', img: '/src/assets/images/regenerated_image_1778776966726.jpg', pos: 'object-center', scale: 'scale-100', height: 'h-[167.59px]' },
    { id: 4, name: 'ครูวรกิจ สุนทนหิรัญเลิศ (ครูคิว)', role: 'Content & Admin', img: '/src/assets/images/regenerated_image_1778777337588.jpg', pos: 'object-center', scale: 'scale-100', height: 'h-[169.59px]' },
    { id: 5, name: 'ครูวิไลพร ลาหงษ์ (ครูวิ)', role: 'Strategist', img: '/src/assets/images/regenerated_image_1778777581979.jpg', pos: 'object-center', scale: 'scale-100', height: 'h-[139.59px]' },
    { id: 6, name: 'ครูชนัฎพร จาริก (ครูฝน)', role: 'Coordinator', img: '/src/assets/images/regenerated_image_1778777583672.jpg', pos: 'object-center', scale: 'scale-100', height: 'h-[147.59px]' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      className="flex flex-col min-h-screen pt-20 bg-background"
    >
      <section className="py-16 px-8 max-w-7xl mx-auto w-full">
         <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div>
               <h1 className="text-4xl font-bold text-primary mb-4 flex items-center gap-3">
                  <Layout className="text-secondary" /> บุคลากรงานโสตทัศนศึกษา
               </h1>
               <p className="text-on-surface-variant max-w-2xl font-medium">
                  ทีมงานเทคนิคผู้อยู่เบื้องหลังการติดตั้ง บำรุงรักษา และอำนวยความสะดวกด้านอุปกรณ์โสตทัศนศึกษาทุกกิจกรรมในโรงเรียน
               </p>
            </div>
            <div className="bg-primary/5 p-4 rounded-2xl border border-primary/10 flex gap-12 items-center text-center">
               <div>
                  <div className="text-2xl font-bold text-primary">6</div>
                  <div className="text-[10px] uppercase tracking-widest font-bold opacity-60">Professional Members</div>
               </div>
               <div className="w-px h-8 bg-primary/20"></div>
               <div>
                  <div className="text-2xl font-bold text-primary">6</div>
                  <div className="text-[10px] uppercase tracking-widest font-bold opacity-60">Core Roles</div>
               </div>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {staffMembers.map(member => (
               <motion.div 
                  key={member.id}
                  whileHover={{ y: -10 }}
                  className="bg-white rounded-3xl p-6 border border-slate-100 shadow-lg group hover:border-secondary transition-all flex flex-col items-center"
               >
                  <div className="relative mb-6 flex justify-center">
                     <div className="absolute w-32 h-32 bg-secondary-container rounded-full translate-x-3 translate-y-3 opacity-20 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform"></div>
                     <div className="w-32 h-32 rounded-full overflow-hidden relative z-10 border-4 border-white shadow-md">
                        <img 
                           src={member.img} 
                           alt={member.name} 
                           className={`w-full ${(member as any).height || "h-full"} object-cover ${(member as any).scale || "scale-[3.5]"} ${member.pos}`}
                        />
                     </div>
                  </div>
                  <div className="text-center">
                     <h3 className="text-lg font-bold text-primary mb-1">{member.name}</h3>
                     <p className="text-xs font-bold text-secondary-container bg-primary px-3 py-1 rounded-full inline-block">{member.role}</p>
                  </div>
               </motion.div>
            ))}
         </div>

         <div className="mt-24 grid md:grid-cols-3 gap-8">
            <StatBox icon={<UsersIcon />} title="Expert Team" desc="Qualified professionals with years of field experience." />
            <StatBox icon={<GraduationCap />} title="Student Trainees" desc="Providing real-world media production training for students." />
            <StatBox icon={<Award />} title="Quality First" desc="Dedicated to providing high-fidelity visual and audio services." />
         </div>

         <div className="mt-20 pt-8 border-t border-slate-100 text-center">
            <p className="text-sm font-medium text-slate-400 uppercase tracking-widest mb-1">Created By</p>
            <p className="text-xl font-bold text-primary">นายเสฎฐวุฒิ เจนศิริวาณิชย์</p>
         </div>
      </section>
    </motion.div>
  );
}

function StatBox({ icon, title, desc }: any) {
  return (
    <div className="bg-surface-container-low p-8 rounded-3xl border border-slate-100 flex flex-col gap-4">
       <div className="w-12 h-12 bg-white rounded-xl shadow-md flex items-center justify-center text-primary-container">
          {icon}
       </div>
       <h4 className="text-lg font-bold text-primary">{title}</h4>
       <p className="text-sm text-on-surface-variant leading-relaxed font-medium">{desc}</p>
    </div>
  );
}
