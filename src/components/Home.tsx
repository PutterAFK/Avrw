import { motion } from "motion/react";
import { 
  Camera, 
  Video, 
  Mic2, 
  Smartphone, 
  ArrowRight, 
  Grid, 
  Facebook, 
  Youtube, 
  Users, 
  LayoutDashboard,
  Bell,
  UserCircle,
  Play
} from "lucide-react";

import imgTikTok4 from "../assets/images/regenerated_image_1778907096952.jpg";

interface HomeProps {
  onNavigate: (page: string) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col"
    >
      {/* Hero Section */}
      <section className="relative min-h-[600px] flex items-center overflow-hidden bg-primary text-white">
        <div className="absolute inset-0 opacity-60 bg-primary-container">
          <img 
            alt="งานโสตทัศนศึกษา โรงเรียนฤทธิยะวรรณาลัย" 
            className="w-full h-full object-cover" 
            src="https://www.rittiya.ac.th/wp-content/uploads/2021/11/Sign-Logo-1-1024x683.jpg" 
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/70 to-transparent"></div>
        </div>
        <div className="container mx-auto px-8 relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-secondary-container/20 text-secondary-container px-4 py-1 rounded-full mb-6 border border-secondary-container/30">
              <Video size={16} fill="currentColor" />
              <span className="text-sm font-semibold tracking-wide">Professional Media Services</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              ยินดีต้อนรับสู่ <br/>
              <span className="text-secondary-fixed text-4xl md:text-5xl">งานโสตทัศนศึกษา ฤทธิยะวรรณาลัย</span>
            </h1>
            <p className="text-lg md:text-xl text-on-primary-container max-w-lg mb-8">
              สนับสนุนทุกการสร้างสรรค์ด้วยเทคโนโลยีระดับมืออาชีพ ดูแลระบบโสตทัศนศึกษาภายในห้องเรียนและกิจกรรมต่างๆภายในโรงเรียน
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => onNavigate('service_hub')}
                className="bg-secondary-container text-on-secondary-container px-8 py-4 rounded-xl text-lg font-bold flex items-center gap-2 hover:brightness-110 active:scale-95 transition-all shadow-lg"
              >
                <span>บริการงานโสต</span>
                <ArrowRight size={20} />
              </button>
              <button 
                onClick={() => onNavigate('schedule')}
                className="border border-white/30 bg-white/10 backdrop-blur-md px-8 py-4 rounded-xl text-lg font-bold hover:bg-white/20 active:scale-95 transition-all"
              >
                ดูตารางงาน
              </button>
            </div>
          </div>
          
          <div className="hidden md:block relative">
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-secondary-container/10 rounded-full blur-3xl"></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div 
                   onClick={() => onNavigate('photographer')}
                   className="cursor-pointer bg-white/5 backdrop-blur-xl p-6 rounded-3xl border border-white/10 hover:border-secondary-container/50 transition-all hover:bg-white/10"
                >
                  <Camera size={40} className="text-secondary-container mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">Photographer</h3>
                  <p className="text-on-primary-container text-xs">Professional event and studio photography services.</p>
                </div>
                <div 
                   onClick={() => onNavigate('videographer')}
                   className="cursor-pointer bg-white/5 backdrop-blur-xl p-6 rounded-3xl border border-white/10 mt-8 hover:border-secondary-container/50 transition-all hover:bg-white/10"
                >
                  <Video size={40} className="text-secondary-container mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">Videographer</h3>
                  <p className="text-on-primary-container text-xs">Video recording and production for school programs.</p>
                </div>
              </div>
              <div className="space-y-4 pt-12">
                <div 
                   onClick={() => onNavigate('sound_manager')}
                   className="cursor-pointer bg-white/5 backdrop-blur-xl p-6 rounded-3xl border border-white/10 hover:border-secondary-container/50 transition-all hover:bg-white/10"
                >
                  <Mic2 size={40} className="text-secondary-container mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">Sound Manager</h3>
                  <p className="text-on-primary-container text-xs">Stage and event audio management for school activities.</p>
                </div>
                <div 
                   onClick={() => onNavigate('content')}
                   className="cursor-pointer bg-white/5 backdrop-blur-xl p-6 rounded-3xl border border-white/10 hover:border-secondary-container/50 transition-all hover:bg-white/10"
                >
                  <Smartphone size={40} className="text-secondary-container mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">Content</h3>
                  <p className="text-on-primary-container text-xs">Social media content creation and 'โสตฤวทำอะไร' series.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-24 bg-surface border-b border-surface-variant/50">
        <div className="container mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <div className="flex items-center gap-2 text-primary font-bold mb-2 uppercase tracking-widest text-xs">
                <div className="w-12 h-1 bg-secondary"></div>
                <span>Latest Updates</span>
              </div>
              <h2 className="text-4xl font-bold text-primary">ข่าวสารงานโสตทัศนศึกษา</h2>
            </div>
            <button className="text-primary font-semibold flex items-center gap-1 hover:underline underline-offset-8">
              ดูทั้งหมด <ArrowRight size={16} />
            </button>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <NewsCard 
              tag="ประกาศ"
              tagColor="bg-primary"
              date="12 พฤษภาคม 2569"
              title="เปิดรับสมัครนักเรียนคณะกรรมการงานโสตทัศนศึกษา 1/2569"
              description="เปิดโอกาสให้นักเรียนที่สนใจในการถ่ายภาพ ถ่ายวิดีโอ ควบคุมเสียง และการจัดการอุปกรณ์เทคโนโลยีสื่อประสมมาร่วมเป็นส่วนหนึ่งของทีมงาน"
              image="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=800&auto=format&fit=crop"
              footer={
                <div className="bg-surface-container-low p-4 rounded-xl text-xs border-l-4 border-secondary">
                  <p className="font-bold mb-1">กําหนดการ:</p>
                  <p>สัมภาษณ์ ในวันที่ 20 พฤษภาคม 2569 ณ ห้องโสตฯ</p>
                </div>
              }
            />
            <NewsCard 
              tag="กิจกรรม"
              tagColor="bg-secondary"
              date="10 พฤษภาคม 2569"
              title="อบรมพื้นฐานการควบคุมระบบเสียงและแสงสว่างเวที"
              description="ติวเข้มเทคนิคการไลฟ์สดและการจัดการมิกเซอร์เสียงดิจิทัลเพื่อใช้ในงานกิจกรรมวิชาการและงานคอนเสิร์ตโรงเรียน"
              image="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=800&auto=format&fit=crop"
            />
            <NewsCard 
              tag="บริการ"
              tagColor="bg-tertiary"
              date="08 พฤษภาคม 2569"
              title="ปรับปรุงระบบ Smart Board และโปรเจกเตอร์ ประจำปี 2569"
              description="เพื่อเพิ่มประสิทธิภาพในการจัดการเรียนการสอน ทางงานโสตทัศนศึกษาได้ทำการตรวจเช็คและบำรุงรักษาอุปกรณ์ทุกอาคารเรียน"
              image="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop"
            />
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 blue-pattern-bg">
        <div className="container mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">คลังภาพกิจกรรม</h2>
            <p className="text-on-surface-variant max-w-2xl mx-auto">ภาพบรรยากาศการทำงานเบื้องหลังความสำเร็จของงานกิจกรรมต่างๆ ภายในโรงเรียน</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-auto md:h-[800px]">
             <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-3xl h-64 md:h-full">
                <img 
                  alt="school concert" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1200&auto=format&fit=crop" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex flex-col justify-end p-8">
                  <span className="text-secondary-container font-bold text-sm mb-2">คอนเสิร์ตเปิดโลกกิจกรรม</span>
                  <h4 className="text-2xl font-bold text-white">งานจัดการแสงสเปเชียลเอฟเฟกต์ 2024</h4>
                </div>
             </div>
             
             <div className="md:col-span-1 md:row-span-1 relative group overflow-hidden rounded-3xl h-64 md:h-full">
                <img 
                  alt="news broadcast" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  src="https://images.unsplash.com/photo-1541873676946-840b70b6760b?q=80&w=800&auto=format&fit=crop" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                  <h4 className="text-white font-bold text-sm">เบื้องหลังรายการข่าวโรงเรียน</h4>
                </div>
             </div>

             <div className="md:col-span-1 md:row-span-2 relative group overflow-hidden rounded-3xl h-64 md:h-full">
                <img 
                  alt="sports photographer" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  src="https://images.unsplash.com/photo-1502982722883-0e56f4d6d7ea?q=80&w=800&auto=format&fit=crop" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex flex-col justify-end p-8">
                  <span className="text-secondary-container font-bold text-sm mb-2">กีฬาสีภายใน</span>
                  <h4 className="text-2xl font-bold text-white">บันทึกภาพนิ่งและวิดีโอ</h4>
                </div>
             </div>

             <div className="md:col-span-1 md:row-span-1 relative group overflow-hidden rounded-3xl h-64 md:h-full">
                <img 
                   alt="audio mixer" 
                   className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                   src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=800&auto=format&fit=crop" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                  <h4 className="text-white font-bold text-sm">การควบคุมเสียงงานพิธีการ</h4>
                </div>
             </div>
          </div>
          
          <div className="mt-12 flex justify-center">
            <button className="bg-white text-primary border-2 border-primary/10 px-10 py-4 rounded-2xl font-bold flex items-center gap-3 hover:border-secondary transition-colors shadow-sm active:scale-95">
              <Grid size={20} />
              <span>ดูภาพกิจกรรมทั้งหมด</span>
            </button>
          </div>
        </div>
      </section>

      {/* TikTok Highlights Section */}
      <section className="py-24 bg-surface">
        <div className="container mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <div className="flex items-center gap-2 text-primary font-bold mb-2 uppercase tracking-widest text-xs">
                <div className="w-12 h-1 bg-black"></div>
                <span>Content Spotlight</span>
              </div>
              <h2 className="text-4xl font-black text-primary tracking-tight">ซีรีส์ 'โสตฤวทำอะไร'</h2>
              <p className="text-on-surface-variant mt-2 font-medium">ติดตามเบื้องหลังงานโสตฯ ฤทธิยะวรรณาลัย ในรูปแบบ Content สุดมันส์</p>
            </div>
            <button 
               onClick={() => window.open('https://www.tiktok.com/@whatissodrwdoing', '_blank')}
               className="bg-black text-white px-8 py-4 rounded-2xl font-bold hover:scale-105 active:scale-95 transition-all shadow-xl flex items-center gap-2"
            >
              <span>ดูเพิ่มใน Content</span>
              <ArrowRight size={20} />
            </button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                id: 1, 
                views: '45.8K', 
                title: 'โสตฤวทำอะไร EP.1', 
                img: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=400&auto=format&fit=crop',
                url: 'https://www.tiktok.com/@whatissodrwdoing/photo/7623799424359222548'
              },
              { id: 2, views: '25.1K', title: 'เบื้องหลังการเซ็ตระบบเสียง', img: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=400&auto=format&fit=crop' },
              { id: 3, views: '12.2K', title: 'งานกีฬาสี 67 สุดอลังการ', img: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=400&auto=format&fit=crop' },
              { id: 4, views: '32.9K', title: 'vlog วันทำงานของเด็กโสต', img: imgTikTok4 },
            ].map((video) => (
              <div 
                 key={video.id}
                 onClick={() => window.open(video.url || 'https://www.tiktok.com/@whatissodrwdoing', '_blank')}
                 className="group relative aspect-[9/16] rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                <img 
                  src={video.img} 
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <div className="text-[10px] font-black uppercase tracking-widest text-secondary-container mb-2 bg-white/10 w-fit px-2 py-0.5 rounded-full backdrop-blur-md border border-white/20">
                    {video.views} views
                  </div>
                  <p className="font-bold leading-tight group-hover:translate-x-1 transition-transform">{video.title}</p>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center scale-75 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500">
                  <Play size={32} className="text-white fill-white ml-2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary-container text-white overflow-hidden relative">
        <div className="container mx-auto px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center items-center">
            <a href="https://facebook.com" className="group flex flex-col items-center gap-2 transition-transform hover:scale-105">
              <div className="w-16 h-16 bg-[#1877F2] rounded-full flex items-center justify-center shadow-lg group-hover:shadow-[#1877F2]/40">
                <Facebook size={32} fill="white" stroke="none" />
              </div>
              <div className="text-[10px] uppercase tracking-widest text-secondary-fixed font-bold">งานโสตทัศนศึกษา ฤทธิยะวรรณาลัย</div>
            </a>
            <div>
              <div className="text-5xl font-bold text-secondary-fixed mb-2">45</div>
              <div className="text-xs font-bold uppercase tracking-widest text-on-primary-container">กิจกรรมต่อปี</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-secondary-fixed mb-2">100%</div>
              <div className="text-xs font-bold uppercase tracking-widest text-on-primary-container">ความพึงพอใจ</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-secondary-fixed mb-2">24/7</div>
              <div className="text-xs font-bold uppercase tracking-widest text-on-primary-container">ระบบสำรองข้อมูล</div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}

function NewsCard({ tag, tagColor, date, title, description, image, footer }: any) {
  return (
    <div className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col">
      <div className="h-56 relative overflow-hidden">
        <img 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
          src={image} 
        />
        <div className={`absolute top-4 left-4 ${tagColor} text-white text-xs px-3 py-1 rounded-full font-bold`}>{tag}</div>
      </div>
      <div className="p-8 flex-grow">
        <p className="text-on-surface-variant font-bold text-sm mb-3">{date}</p>
        <h3 className="text-xl font-bold text-primary mb-4 group-hover:text-secondary transition-colors line-clamp-2">{title}</h3>
        <p className="text-on-surface-variant text-sm mb-4 line-clamp-3">{description}</p>
        {footer}
      </div>
    </div>
  );
}
