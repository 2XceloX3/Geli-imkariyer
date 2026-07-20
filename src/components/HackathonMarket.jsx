import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Terminal, Users, Trophy, ChevronLeft, Rocket, Zap, ArrowRight, Star, Building2, Calendar, Target } from 'lucide-react';
import Logo from './Logo';
import TopProfileMenu from './TopProfileMenu';

const HACKATHONS = [
  { id: 1, title: 'Akıllı Kampüs İnovasyon Maratonu', company: 'Gelişim Teknopark', prize: '₺50.000 Hibe Desteği', deadline: '2 Gün Kaldı', type: 'Sürdürülebilirlik', participants: 142, status: 'active', color: 'blue' },
  { id: 2, title: 'Finansal Teknolojiler (Fintech) Hackathonu', company: 'Garanti BBVA Teknoloji', prize: 'Staj + Mac M3', deadline: '5 Gün Kaldı', type: 'Finans & Web3', participants: 85, status: 'active', color: 'emerald' },
  { id: 3, title: 'Otonom Araç Sistemleri AR-GE Kampı', company: 'Ford Otosan', prize: 'Tam Zamanlı İş Teklifi', deadline: 'Kayıtlar Açık', type: 'Yapay Zeka & IoT', participants: 56, status: 'upcoming', color: 'purple' },
];

export default function HackathonMarket({ setView, currentUser, userRole, setSelectedUserId }) {
  const [selectedHackathon, setSelectedHackathon] = useState(null);

  return (
    <div className="min-h-screen bg-[#F0F2F5] font-sans flex flex-col">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-[1200px] mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setView(userRole === 'employer' ? 'company' : userRole === 'alumni' ? 'alumni' : userRole === 'academic' ? 'academic' : 'student')} 
              className="p-2 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#0A66C2] rounded-lg flex items-center justify-center shadow-sm">
                <Rocket className="text-white" size={16} />
              </div>
              <div className="hidden sm:block">
                <h1 className="font-black text-gray-900 leading-tight">İnovasyon & Proje Pazarı</h1>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Kurumsal Hackathon Merkezi</p>
              </div>
            </div>
          </div>
          <TopProfileMenu currentUser={currentUser} userRole={userRole} setView={setView} setSelectedUserId={setSelectedUserId} />
        </div>
      </header>

      <main className="flex-1 max-w-[1200px] mx-auto w-full p-4 lg:p-8 flex flex-col">
        
        {/* Hero Section */}
        <div className="bg-[#0A2342] rounded-2xl p-8 md:p-12 shadow-xl mb-8 relative overflow-hidden flex flex-col md:flex-row items-center gap-8">
          <div className="absolute right-0 top-0 w-1/2 h-full bg-[#0A66C2]/20 skew-x-12 transform origin-bottom pointer-events-none"></div>
          
          <div className="flex-1 relative z-10 text-center md:text-left text-white">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 text-blue-200 rounded-full text-xs font-bold uppercase tracking-wider mb-6 border border-white/20 backdrop-blur-md">
              <Target size={14} /> Fikrini Projeye Dönüştür
            </div>
            <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tight leading-tight">
              Sektör Liderleriyle <br/><span className="text-blue-400">Geleceği Kodla.</span>
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-xl leading-relaxed">
              Öncü şirketlerin düzenlediği kurumsal hackathonlara katılın, gerçek dünya problemlerini çözün ve doğrudan iş/staj teklifleri kazanın.
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  window.toast && window.toast.info("AI Yetkinlik Analizi Yapılıyor...");
                  setTimeout(() => {
                    window.toast && window.toast.success("✅ Yetkinliklerinize en uygun 3 takım arkadaşı bulundu. Eşleşme yüzdeleri: %92, %88, %85");
                  }, 2000);
                }}
                className="bg-[#0A66C2] hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition shadow-lg"
              >
                <Zap size={18} /> AI ile Takım Arkadaşı Bul
              </button>
              <button className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition backdrop-blur-md">
                Açık Projeleri İncele
              </button>
            </div>
          </div>

          <div className="hidden lg:flex w-72 h-72 bg-white rounded-2xl shadow-2xl relative z-10 p-6 flex-col justify-center items-center border border-gray-100">
             <div className="absolute -top-4 -right-4 w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center border-4 border-white shadow-sm">
               <Trophy size={32} className="text-[#0A66C2]" />
             </div>
             <Code2 size={64} className="text-[#0A66C2] mb-6" />
             <div className="text-center w-full bg-gray-50 p-4 rounded-xl border border-gray-100">
               <div className="text-gray-900 font-black text-sm mb-1">Kurumsal İnovasyon</div>
               <div className="text-gray-500 text-xs font-medium">3 Aktif Yarışma</div>
             </div>
          </div>
        </div>

        {/* Hackathons List */}
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Building2 className="text-[#0A66C2]" size={20} /> Kurumsal Yarışmalar
          </h3>
          <button className="text-sm font-bold text-[#0A66C2] hover:underline">Tümünü Gör</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {HACKATHONS.map(hack => (
            <div key={hack.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all group flex flex-col p-6">
              <div className="flex justify-between items-start mb-4">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md flex items-center gap-1 \${hack.status === 'active' ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-emerald-50 text-emerald-600 border border-emerald-100'}`}>
                  <Calendar size={12} /> {hack.deadline}
                </span>
                <span className="text-[10px] text-gray-600 font-bold px-2.5 py-1 bg-gray-100 rounded-md">
                  {hack.type}
                </span>
              </div>
              
              <h4 className="text-lg font-black text-gray-900 mb-1 group-hover:text-[#0A66C2] transition-colors line-clamp-2">{hack.title}</h4>
              <p className="text-sm text-gray-500 font-medium mb-6">{hack.company}</p>
              
              <div className="flex flex-col gap-3 text-sm mb-6 flex-1 bg-gray-50 p-4 rounded-xl border border-gray-100">
                 <div className="flex items-center justify-between font-bold">
                   <span className="text-gray-500 flex items-center gap-1.5"><Users size={16}/> Başvuru:</span>
                   <span className="text-gray-900">{hack.participants} Takım</span>
                 </div>
                 <div className="w-full h-px bg-gray-200"></div>
                 <div className="flex items-center justify-between font-bold">
                   <span className="text-gray-500 flex items-center gap-1.5"><Star size={16}/> Ödül:</span>
                   <span className="text-emerald-600">{hack.prize}</span>
                 </div>
              </div>

              <div className="flex gap-2 w-full mt-auto">
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    window.toast && window.toast.info(`Anka AI: Profiliniz ve "${hack.title}" teması analiz ediliyor...`);
                    setTimeout(() => {
                      window.toast && window.toast.success("💡 AI Fikri: 'IoT tabanlı akıllı atık yönetimi sistemi'. Şansınız: Yüksek.");
                    }, 2500);
                  }}
                  className="flex-1 py-2.5 bg-[#f0f7ff] border-2 border-[#dbeafe] text-[#0A66C2] hover:bg-[#dbeafe] rounded-xl text-sm font-bold transition-colors flex items-center justify-center gap-1"
                  title="AI Proje Fikri Üret"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m12 14 4-4"></path><path d="M3.34 19a10 10 0 1 1 17.32 0"></path></svg>
                </button>
                <button className="flex-[3] py-2.5 bg-[#0A66C2] text-white hover:bg-blue-800 rounded-xl text-sm font-bold transition-colors flex items-center justify-center gap-2">
                  İncele ve Başvur <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

      </main>
    </div>
  );
}
