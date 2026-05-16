import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  collection, 
  onSnapshot, 
  addDoc, 
  deleteDoc, 
  doc, 
  query, 
  orderBy, 
  limit,
  serverTimestamp 
} from "firebase/firestore";
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  onAuthStateChanged, 
  signOut,
  User as FirebaseUser
} from "firebase/auth";
import { db, auth, handleFirestoreError, OperationType } from "../lib/firebase";
import { setDoc } from "firebase/firestore";
import { 
  ArrowLeft, 
  Calendar as CalendarIcon, 
  MapPin, 
  Clock, 
  User,
  Search,
  Filter,
  Plus,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Ticket,
  BarChart3,
  DoorOpen,
  Headset,
  ExternalLink,
  PlusCircle,
  Camera,
  Trash2,
  X,
  LogIn,
  LogOut
} from "lucide-react";

interface ScheduleProps {
  onNavigate: (page: string) => void;
  user: FirebaseUser | null;
  onLogin: () => void;
  onLogout: () => void;
}

interface EventData {
  id?: string;
  title: string;
  requester: string;
  type: string;
  date: string;
  time: string;
  color: string;
  status?: 'pending' | 'approved' | 'rejected';
  timestamp: any;
}

export default function Schedule({ onNavigate, user, onLogin, onLogout }: ScheduleProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [refreshKey, setRefreshKey] = useState(Date.now());
  const [events, setEvents] = useState<EventData[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);
  const [newEvent, setNewEvent] = useState({
    title: '',
    requester: '',
    type: 'Event',
    date: '',
    time: ''
  });
  const [bookingRequest, setBookingRequest] = useState({
    title: '',
    name: '',
    department: '',
    date: '',
    time: '',
    details: ''
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Refresh calendar every hour
    const refreshTimer = setInterval(() => {
      setRefreshKey(Date.now());
    }, 3600000); // 1 hour

    // Real-time listener for events
    const q = query(collection(db, "events"), orderBy("timestamp", "desc"), limit(20));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const eventList: EventData[] = [];
      snapshot.forEach((doc) => {
        eventList.push({ id: doc.id, ...doc.data() } as EventData);
      });

      // If list is empty, seed some realistic AV-related samples
      if (eventList.length === 0) {
        const initialSamples = [
          {
            title: 'ถ่ายวิดีโอโครงการ TO BE NUMBER ONE',
            requester: 'งานแนะแนว',
            type: 'Event',
            date: '15 พ.ค. 69',
            time: '08:30 - 16:00',
            color: 'bg-green-100 text-green-700',
            timestamp: Date.now()
          },
          {
            title: 'จัดเครื่องเสียงห้องประชุมทวาราวดี',
            requester: 'ฝ่ายปกครอง',
            type: 'Meeting',
            date: '16 พ.ค. 69',
            time: '13:00 - 15:30',
            color: 'bg-blue-100 text-blue-700',
            timestamp: Date.now() - 1000
          },
          {
            title: 'บันทึกภาพนิ่งงานอบรมครูอาสา',
            requester: 'งานบุคลากร',
            type: 'Training',
            date: '18 พ.ค. 69',
            time: '09:00 - 12:00',
            color: 'bg-indigo-100 text-indigo-700',
            timestamp: Date.now() - 2000
          },
          {
            title: 'เตรียมไฟล์วิดีโอปฐมนิเทศนักเรียนใหม่',
            requester: 'งานประชาสัมพันธ์',
            type: 'Production',
            date: '19 พ.ค. 69',
            time: '10:00 - 16:00',
            color: 'bg-purple-100 text-purple-700',
            timestamp: Date.now() - 3000
          },
          {
            title: 'ตรวจสอบระบบโปรเจคเตอร์ อาคาร 4',
            requester: 'งานพัสดุ',
            type: 'Maintenance',
            date: '20 พ.ค. 69',
            time: '08:30 - 10:30',
            color: 'bg-orange-100 text-orange-700',
            timestamp: Date.now() - 4000
          }
        ];
        initialSamples.forEach(ev => addDoc(collection(db, "events"), { ...ev, timestamp: serverTimestamp() }));
      }
      
      setEvents(eventList);
    }, (error) => {
      console.error("Firestore Listener Error:", error);
      // Not throwing to avoid refresh loop
    });

    return () => {
      clearInterval(timer);
      clearInterval(refreshTimer);
      unsubscribe();
    };
  }, []);

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "events"), {
        title: bookingRequest.title,
        requester: `${bookingRequest.name} (${bookingRequest.department})`,
        type: 'Request',
        date: bookingRequest.date,
        time: bookingRequest.time,
        color: 'bg-slate-100 text-slate-500',
        status: 'pending',
        timestamp: serverTimestamp()
      });
      alert('ส่งคำขอจองสำเร็จ! ทีมงานจะตรวจสอบและติดต่อกลับในเร็วๆ นี้');
      setBookingRequest({ title: '', name: '', department: '', date: '', time: '', details: '' });
      setShowBookingForm(false);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, "events");
    }
  };

  const handleApproveEvent = async (id: string) => {
    try {
      const eventRef = doc(db, "events", id);
      await setDoc(eventRef, { 
        status: 'approved',
        color: 'bg-green-100 text-green-700'
      }, { merge: true });
      alert('อนุมัติคำขอเรียบร้อยแล้ว');
      setSelectedEvent(null);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `events/${id}`);
    }
  };

  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const typeColors: Record<string, string> = {
        'Office': 'bg-blue-100 text-blue-700',
        'Training': 'bg-indigo-100 text-indigo-700',
        'Meeting': 'bg-blue-100 text-blue-700',
        'Event': 'bg-green-100 text-green-700',
        'Recruit': 'bg-yellow-100 text-yellow-700'
      };

      await addDoc(collection(db, "events"), {
        ...newEvent,
        color: typeColors[newEvent.type] || 'bg-slate-100 text-slate-700',
        timestamp: serverTimestamp()
      });
      
      setNewEvent({ title: '', requester: '', type: 'Event', date: '', time: '' });
      setShowAddForm(false);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, "events");
    }
  };

  const handleDeleteEvent = async (id: string) => {
    if (!confirm('ยืนยันการลบรายการนี้?')) return;
    try {
      await deleteDoc(doc(db, "events", id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `events/${id}`);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('th-TH', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('th-TH', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const calendarDays = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col min-h-screen pt-20 bg-[#f8f9fa] font-sans"
    >
      {/* Header Sticky Container */}
      <header className="bg-white border-b border-slate-200 px-8 py-4 sticky top-20 z-40 shadow-sm">
        <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => onNavigate('home')}
              className="p-2 rounded-full hover:bg-slate-100 transition-colors active:scale-95"
            >
              <ArrowLeft size={24} className="text-primary" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-primary flex items-center gap-2">
                <CalendarIcon size={20} className="text-secondary" /> ตารางงาน - งานโสตทัศนศึกษา
              </h1>
            </div>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            {user ? (
               <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
                    <img src={user.photoURL || ''} alt="" className="w-6 h-6 rounded-full" />
                    <span className="text-[10px] font-bold text-primary truncate max-w-[100px]">{user.displayName}</span>
                  </div>
                  <button 
                    onClick={onLogout}
                    className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                    title="ออกจากระบบ"
                  >
                    <LogOut size={18} />
                  </button>
               </div>
            ) : (
              <button 
                onClick={onLogin}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all active:scale-95 shadow-sm"
              >
                <LogIn size={16} className="text-primary" />
                เข้าสู่ระบบ (Staff)
              </button>
            )}
            <div className="relative flex-grow md:flex-grow-0">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
               <input 
                type="text" 
                placeholder="ค้นหากิจกรรม..."
                className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-primary/20"
               />
            </div>
          </div>
        </div>
      </header>

      {/* Modal - Booking Form สำหรับ User */}
      <AnimatePresence>
        {showBookingForm && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
            onClick={() => setShowBookingForm(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl p-8 w-full max-w-xl shadow-2xl overflow-hidden relative"
              onClick={e => e.stopPropagation()}
            >
              <button 
                onClick={() => setShowBookingForm(false)}
                className="absolute right-4 top-4 p-2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X size={20} />
              </button>
              
              <div className="mb-6">
                <h4 className="text-2xl font-black text-primary">นัดหมายใช้บริการโสตฯ</h4>
                <p className="text-slate-500 text-sm">กรอกข้อมูลเพื่อส่งความประสงค์ขอรับบริการ ทีมงานจะติดต่อกลับภายใน 24 ชม.</p>
              </div>
              
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">ชื่อ-นามสกุล ผู้ติดต่อ</label>
                    <input 
                      required
                      type="text" 
                      value={bookingRequest.name}
                      onChange={e => setBookingRequest({...bookingRequest, name: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="ระบุชื่อจริง..."
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">กลุ่มสาระฯ / ฝ่ายงาน</label>
                    <input 
                      required
                      type="text" 
                      value={bookingRequest.department}
                      onChange={e => setBookingRequest({...bookingRequest, department: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="เช่น ฝ่ายวิชาการ..."
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">หัวข้อกิจกรรม / รายละเอียดงาน</label>
                  <input 
                    required
                    type="text" 
                    value={bookingRequest.title}
                    onChange={e => setBookingRequest({...bookingRequest, title: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="เช่น ถ่ายวิดีโอโครงการ TO BE NUMBER ONE..."
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">วันที่ต้องการ</label>
                    <input 
                      required
                      type="text" 
                      value={bookingRequest.date}
                      onChange={e => setBookingRequest({...bookingRequest, date: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="เช่น 20 พ.ค. 69"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">ช่วงเวลา</label>
                    <input 
                      required
                      type="text" 
                      value={bookingRequest.time}
                      onChange={e => setBookingRequest({...bookingRequest, time: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="เช่น 08:30 - 12:00"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">รายละเอียดเพิ่มเติม (สถานที่ / อุปกรณ์ที่ต้องการ)</label>
                  <textarea 
                    rows={3}
                    value={bookingRequest.details}
                    onChange={e => setBookingRequest({...bookingRequest, details: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                    placeholder="ระบุสถานที่ หรือความต้องการเพิ่มเติม..."
                  />
                </div>

                <div className="pt-2">
                  <button 
                    type="submit"
                    className="w-full py-4 bg-primary text-white font-black rounded-xl hover:brightness-110 active:scale-[0.98] transition-all shadow-xl flex items-center justify-center gap-2"
                  >
                    <Ticket size={20} />
                    ยืนยันการจอง / ส่งคำขอ
                  </button>
                  <p className="text-[10px] text-center text-slate-400 mt-4 font-bold uppercase tracking-widest">
                    การจองจะสมบูรณ์เมื่อทีมงานยืนยันในตารางงาน
                  </p>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="max-w-[1280px] mx-auto px-8 py-12 w-full">
        {/* Page Hero Title */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-primary font-bold text-xs uppercase tracking-widest mb-2 block">Professional AV Services</span>
            <h2 className="text-5xl font-bold text-primary mb-4 tracking-tight">ตารางงานและระบบการจอง</h2>
            <p className="text-slate-600 max-w-2xl font-medium">จัดการตารางปฏิบัติงานของทีมโปรดักชั่นและตรวจสอบคิวการจองอุปกรณ์แบบเรียลไทม์เพื่อความเป็นมืออาชีพสูงสุด</p>
          </div>
          <div className="flex gap-4">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4 min-w-[200px]">
              <div className="bg-primary/5 p-3 rounded-lg">
                <CalendarIcon size={24} className="text-primary" />
              </div>
              <div>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">วันนี้ - {formatTime(currentTime)}</p>
                <p className="font-bold text-xl text-primary">{formatDate(currentTime)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bento Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Calendar Section (8/12) */}
          <div className="lg:col-span-8">
            <section className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden h-full flex flex-col min-h-[700px]">
              <div className="bg-primary p-6 flex justify-between items-center shrink-0">
                <h3 className="text-white font-bold text-xl flex items-center gap-2">
                  <ClipboardList size={24} className="text-secondary" />
                  ตารางนัดหมายและปฏิบัติงาน
                </h3>
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setShowBookingForm(true)}
                    className="bg-secondary-container text-primary px-6 py-2 rounded-xl font-bold text-sm flex items-center gap-2 hover:scale-[1.02] active:scale-95 transition-all shadow-lg border border-primary/10"
                  >
                    นัดหมายงานโสตฯ <Plus size={18} />
                  </button>
                  <a 
                    href="https://calendar.google.com/appointments/schedules/AcZssZ2u5YdgJKPz5UC-9WHbMcpZsYBFp10JSz6RL0girj6LGZheNZpJvlii5ZPLNjJLg7PjeWp_l2Dw" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-white/80 hover:text-white p-2 transition-colors"
                    title="จองผ่าน Google Calendar (สำรอง)"
                  >
                    <ExternalLink size={18} />
                  </a>
                </div>
              </div>
              
              <div className="flex-grow w-full relative bg-white">
                <iframe 
                  src={`https://calendar.google.com/calendar/embed?src=audiovisual2024%40rittiya.ac.th&src=audiovisual2025%40rittiya.ac.th&ctz=Asia%2FBangkok&showTitle=0&showNav=1&showDate=1&showPrint=0&showTabs=0&showCalendars=0&showTz=1&mode=MONTH&t=${refreshKey}`} 
                  style={{ border: 0 }} 
                  width="100%" 
                  height="100%" 
                  frameBorder="0" 
                  className="w-full h-full min-h-[700px]"
                  title="Google Calendar"
                />
                
                {/* Real-time sync indicator */}
                <div className="absolute top-4 right-4 bg-primary/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 text-[10px] font-bold text-white pointer-events-none flex items-center gap-2 shadow-xl animate-pulse">
                  <div className="w-2 h-2 rounded-full bg-green-400"></div>
                  REAL-TIME SYNC ACTIVE
                </div>
              </div>
            </section>
          </div>

          {/* Booking Queue (4/12) */}
          <div className="lg:col-span-4 space-y-6">
            <section className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 flex flex-col h-full">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-xl text-primary flex items-center gap-2">
                    <Ticket className="text-secondary" size={24} />
                    กิจกรรมล่าสุด
                  </h3>
                  {!user && (
                    <div className="flex items-center gap-1 px-2 py-0.5 bg-slate-100 text-slate-400 rounded-full text-[9px] font-bold">
                      <Search size={10} /> VIEW ONLY
                    </div>
                  )}
                </div>
                {user && (
                  <button 
                    onClick={() => setShowAddForm(true)}
                    className="p-2 bg-primary/5 text-primary rounded-full hover:bg-primary/10 transition-colors"
                  >
                    <PlusCircle size={20} />
                  </button>
                )}
              </div>
              
              <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar flex-grow">
                <AnimatePresence mode="popLayout">
                  {events.length === 0 ? (
                    <div className="text-center py-8 text-slate-400 text-sm">ไม่มีกิจกรรมล่าสุด</div>
                  ) : (
                    events.map(item => (
                      <motion.div 
                        layout
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        key={item.id} 
                        onClick={() => setSelectedEvent(item)}
                        className="flex flex-col gap-2 p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-md hover:border-primary/20 transition-all group relative cursor-pointer"
                      >
                        {user && (
                          <button 
                            onClick={() => item.id && handleDeleteEvent(item.id)}
                            className="absolute right-2 top-2 p-1 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                        <div className="flex justify-between items-start">
                          <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider ${item.color}`}>
                            {item.type}
                          </span>
                        </div>
                        <h4 className="font-bold text-primary text-sm leading-snug pr-2">{item.title}</h4>
                        {item.status === 'pending' && (
                          <div className="flex items-center gap-1.5 mt-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse"></div>
                            <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest">Pending Review</span>
                          </div>
                        )}
                        <p className="text-[10px] text-slate-400 font-medium">{item.requester}</p>
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </div>

              {/* Event Detail Modal */}
              <AnimatePresence>
                {selectedEvent && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
                    onClick={() => setSelectedEvent(null)}
                  >
                    <motion.div 
                      initial={{ scale: 0.9, y: 20 }}
                      animate={{ scale: 1, y: 0 }}
                      exit={{ scale: 0.9, y: 20 }}
                      className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl relative"
                      onClick={e => e.stopPropagation()}
                    >
                      <button 
                        onClick={() => setSelectedEvent(null)}
                        className="absolute right-4 top-4 p-2 text-slate-400 hover:text-slate-600"
                      >
                        <X size={20} />
                      </button>
                      
                      <div className="mb-6 flex justify-between items-start">
                         <span className={`text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider ${selectedEvent.color}`}>
                            {selectedEvent.type}
                         </span>
                         {user && (
                            <button 
                              onClick={() => selectedEvent.id && handleDeleteEvent(selectedEvent.id).then(() => setSelectedEvent(null))}
                              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2 text-xs font-bold"
                            >
                              <Trash2 size={16} /> ลบรายการ
                            </button>
                         )}
                      </div>

                      <h4 className="text-2xl font-bold text-primary mb-2">{selectedEvent.title}</h4>
                      <p className="text-slate-500 text-sm mb-6 flex items-center gap-2">
                        <User size={14} className="text-slate-400" />
                        ผู้รับผิดชอบ: <span className="font-bold text-slate-700">{selectedEvent.requester}</span>
                      </p>

                      <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100 italic">
                         <div className="flex flex-col">
                            <span className="text-[10px] font-bold text-slate-400 uppercase">วันที่</span>
                            <span className="text-sm font-bold text-primary flex items-center gap-2 mt-1">
                               <CalendarIcon size={14} className="text-secondary" /> {selectedEvent.date}
                            </span>
                         </div>
                         <div className="flex flex-col">
                            <span className="text-[10px] font-bold text-slate-400 uppercase">ช่วงเวลา</span>
                            <span className="text-sm font-bold text-primary flex items-center gap-2 mt-1">
                               <Clock size={14} className="text-secondary" /> {selectedEvent.time}
                            </span>
                         </div>
                      </div>

                      {!user && (
                        <div className="mt-8 p-4 bg-secondary/5 rounded-xl border border-secondary/10 flex items-start gap-3">
                           <MapPin size={18} className="text-secondary shrink-0 mt-0.5" />
                           <p className="text-xs text-slate-600 leading-relaxed font-medium">
                             หากต้องการแก้ไขข้อมูลหรือยกเลิกกิจกรรม โปรดติดต่อเจ้าหน้าที่ฝ่ายโสตทัศนศึกษา
                           </p>
                        </div>
                      )}
                      
                      <button 
                        onClick={() => setSelectedEvent(null)}
                        className="w-full mt-8 py-4 bg-slate-100 text-primary font-bold rounded-xl hover:bg-slate-200 transition-all text-sm"
                      >
                        ปิดหน้าต่าง
                      </button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Add Event Modal Overlay */}
              <AnimatePresence>
                {showAddForm && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
                    onClick={() => setShowAddForm(false)}
                  >
                    <motion.div 
                      initial={{ scale: 0.9, y: 20 }}
                      animate={{ scale: 1, y: 0 }}
                      exit={{ scale: 0.9, y: 20 }}
                      className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl overflow-hidden relative"
                      onClick={e => e.stopPropagation()}
                    >
                      <button 
                        onClick={() => setShowAddForm(false)}
                        className="absolute right-4 top-4 p-2 text-slate-400 hover:text-slate-600 transition-colors"
                      >
                        <X size={20} />
                      </button>
                      
                      <h4 className="text-2xl font-bold text-primary mb-6">เพิ่มกิจกรรมใหม่</h4>
                      
                      <form onSubmit={handleAddEvent} className="space-y-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">หัวข้อกิจกรรม / งาน</label>
                          <input 
                            required
                            type="text" 
                            value={newEvent.title}
                            onChange={e => setNewEvent({...newEvent, title: e.target.value})}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                            placeholder="เช่น ถ่ายวิดีโองานวิชาการ..."
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">ชื่อผู้ขอใช้งาน / หน่วยงาน</label>
                          <input 
                            required
                            type="text" 
                            value={newEvent.requester}
                            onChange={e => setNewEvent({...newEvent, requester: e.target.value})}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                            placeholder="เช่น นายใจดี มีสุข (กลุ่มสาระวิทย์...)"
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">ประเภท</label>
                            <select 
                              value={newEvent.type}
                              onChange={e => setNewEvent({...newEvent, type: e.target.value})}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                            >
                              <option value="Office">Office</option>
                              <option value="Meeting">Meeting</option>
                              <option value="Event">Event</option>
                              <option value="Training">Training</option>
                              <option value="Recruit">Recruit</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">วันที่</label>
                            <input 
                              required
                              type="text" 
                              value={newEvent.date}
                              onChange={e => setNewEvent({...newEvent, date: e.target.value})}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                              placeholder="เช่น 15 พ.ค. 69"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">เวลา</label>
                          <input 
                            required
                            type="text" 
                            value={newEvent.time}
                            onChange={e => setNewEvent({...newEvent, time: e.target.value})}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                            placeholder="เช่น 09:00 - 12:00"
                          />
                        </div>

                        <button 
                          type="submit"
                          className="w-full py-4 bg-primary text-white font-bold rounded-xl hover:brightness-110 active:scale-[0.98] transition-all shadow-lg"
                        >
                          บันทึกลงตารางงาน
                        </button>
                      </form>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </section>
          </div>
        </div>
      </main>
    </motion.div>
  );
}
