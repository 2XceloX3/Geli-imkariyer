import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Map, MapPin, ChevronLeft, Building, Coffee, Book, Users, Wifi } from 'lucide-react';
import Logo from './Logo';
import TopProfileMenu from './TopProfileMenu';

const LOCATIONS = [
  { id: 1, name: 'Merkez Kütüphane', type: 'study', top: '20%', left: '30%', icon: <Book size={20}/>, status: 'Yoğun (85%)' },
  { id: 2, name: 'Mühendislik Fakültesi', type: 'academic', top: '45%', left: '60%', icon: <Building size={20}/>, status: 'Açık' },
  { id: 3, name: 'Starbucks / Kafeterya', type: 'social', top: '65%', left: '25%', icon: <Coffee size={20}/>, status: 'Orta Yoğunluk (50%)' },
  { id: 4, name: 'İnovasyon Merkezi (Lab)', type: 'tech', top: '35%', left: '75%', icon: <Wifi size={20}/>, status: 'Boş (10%)' },
  { id: 5, name: 'Öğrenci Dekanlığı', type: 'admin', top: '70%', left: '55%', icon: <Users size={20}/>, status: 'Açık' },
];

export default function CampusMap({ setView, currentUser, userRole, setSelectedUserId }) {
  const [activeLocation, setActiveLocation] = useState(null);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      <header className="h-16 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setView(userRole === 'employer' ? 'company' : userRole === 'alumni' ? 'alumni' : userRole === 'academic' ? 'academic' : 'student')} 
            className="p-2 rounded-full bg-slate-800 text-slate-300 hover:bg-slate-700 transition"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="flex items-center gap-2">
            <Map className="text-teal-400" size={24} />
            <h1 className="font-black tracking-tight text-white">İGÜ Metaverse Kampüs</h1>
          </div>
        </div>
        <TopProfileMenu currentUser={currentUser} userRole={userRole} setView={setView} setSelectedUserId={setSelectedUserId} />
      </header>

      <main className="flex-1 w-full max-w-6xl mx-auto p-4 lg:p-8 flex flex-col relative">
        
        {/* Header Text */}
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h2 className="text-3xl font-black text-white mb-2">Canlı Kampüs Haritası</h2>
            <p className="text-slate-400">Kampüsün nabzını tut, çalışma alanlarının yoğunluğunu gerçek zamanlı gör.</p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={(e) => {
                e.preventDefault();
                window.toast && window.toast.info("AI: Size en uygun sessiz çalışma rotası hesaplanıyor...");
                setTimeout(() => {
                  window.toast && window.toast.success("✅ Rota Oluşturuldu: Kütüphane yoğun olduğu için sizi İnovasyon Merkezi'ndeki (Boş) sessiz alana yönlendiriyoruz.");
                }, 2000);
              }}
              className="px-4 py-1.5 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-full text-xs font-bold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
            >
              <MapPin size={14} /> Akıllı Rota Çiz
            </button>
            <span className="px-3 py-1 bg-slate-800 border border-slate-700 rounded-full text-xs font-bold flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"/> Canlı Veri</span>
          </div>
        </div>

        {/* 2.5D Map Container */}
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-4 lg:p-8 flex-1 relative overflow-hidden flex items-center justify-center min-h-[500px] shadow-2xl">
          
          {/* Conceptual Isometric Grid Background */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            transform: 'rotateX(60deg) rotateZ(-45deg) scale(2)',
            transformOrigin: 'center center'
          }} />

          {/* Map Base Surface */}
          <div className="relative w-full max-w-3xl aspect-[4/3] bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl border-4 border-slate-600 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform transition-transform duration-500 hover:scale-105"
               style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}>
            
            {LOCATIONS.map(loc => (
              <div 
                key={loc.id}
                className="absolute z-10 group cursor-pointer"
                style={{ top: loc.top, left: loc.left, transform: 'translate(-50%, -100%)' }}
                onMouseEnter={() => setActiveLocation(loc)}
                onMouseLeave={() => setActiveLocation(null)}
              >
                {/* Pin Point */}
                <div className="relative flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-xl transform transition-all duration-300 group-hover:-translate-y-2 group-hover:scale-110 
                    ${loc.type === 'study' ? 'bg-blue-500' : loc.type === 'academic' ? 'bg-indigo-500' : loc.type === 'social' ? 'bg-amber-500' : loc.type === 'tech' ? 'bg-cyan-500' : 'bg-emerald-500'}`}>
                    {loc.icon}
                  </div>
                  <div className="w-1 h-8 bg-gradient-to-b from-slate-300 to-transparent opacity-50" />
                  
                  {/* Pin Shadow */}
                  <div className="absolute -bottom-4 w-6 h-2 bg-black/40 rounded-full blur-sm group-hover:w-8 group-hover:blur-md transition-all" />
                </div>

                {/* Popup Tooltip */}
                <AnimatePresence>
                  {activeLocation?.id === loc.id && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.9 }}
                      className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 bg-white text-slate-900 p-4 rounded-xl shadow-2xl w-48 z-50 pointer-events-none"
                    >
                      <h3 className="font-black text-sm mb-1">{loc.name}</h3>
                      <p className="text-xs text-slate-500 font-bold mb-3">{loc.status}</p>
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div className={`h-full ${loc.status.includes('Yoğun') ? 'bg-red-500 w-[85%]' : loc.status.includes('Orta') ? 'bg-amber-500 w-[50%]' : 'bg-emerald-500 w-[20%]'}`} />
                      </div>
                      
                      {/* Triangle pointer */}
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

            {/* Decorative Map Elements */}
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl" />
            <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl" />
          </div>

        </div>
      </main>
    </div>
  );
}
