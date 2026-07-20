import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Landmark, Check, X, Users, ChevronLeft, ArrowRight, BarChart3, Clock, Vote } from 'lucide-react';
import Logo from './Logo';
import TopProfileMenu from './TopProfileMenu';

const PROPOSALS = [
  { id: 1, title: 'Bahar Şenlikleri Sanal Gerçeklik Sahnesi Kurulumu', author: 'Oğuzhan K. (2018 Mezunu)', date: '3 Gün Kaldı', for: 1240, against: 150, status: 'active' },
  { id: 2, title: 'Yeni Nesil Web3 Seçmeli Dersinin Müfredata Eklenmesi', author: 'Doç. Dr. Ayşe M.', date: 'Oylama Kapandı', for: 890, against: 45, status: 'passed' },
  { id: 3, title: 'Silikon Vadisi Mezunlar Evi Fonlaması', author: 'Global Gelişim Derneği', date: '5 Gün Kaldı', for: 420, against: 600, status: 'active' },
];

export default function AlumniDAO({ setView, currentUser, userRole, setSelectedUserId }) {
  const [voted, setVoted] = useState({});

  const handleVote = (id, type) => {
    setVoted(prev => ({ ...prev, [id]: type }));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setView(userRole === 'employer' ? 'company' : userRole === 'alumni' ? 'alumni' : userRole === 'academic' ? 'academic' : 'student')} 
            className="p-2 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="flex items-center gap-2">
            <Landmark className="text-indigo-600" size={24} />
            <h1 className="font-black text-slate-900 tracking-tight">Mezunlar Meclisi</h1>
          </div>
        </div>
        <TopProfileMenu currentUser={currentUser} userRole={userRole} setView={setView} setSelectedUserId={setSelectedUserId} />
      </header>

      <main className="flex-1 w-full max-w-5xl mx-auto p-4 lg:p-8 flex flex-col">
        
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-indigo-900 to-blue-900 rounded-xl p-8 md:p-12 shadow-2xl mb-8 relative overflow-hidden text-white flex flex-col md:flex-row items-center gap-8">
          <div className="absolute right-0 top-0 w-64 h-full bg-white/5 skew-x-12 translate-x-16 pointer-events-none" />
          
          <div className="flex-1 text-center md:text-left relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 text-blue-200 rounded-full text-xs font-black uppercase tracking-wider mb-6 border border-white/20">
              <Vote size={14} /> Gelişim DAO Konsepti
            </div>
            <h2 className="text-2xl md:text-3xl font-black mb-4 tracking-tight leading-tight">
              Söz Hakkı Senin.<br/>Geleceği Sen Şekillendir.
            </h2>
            <p className="text-blue-200 text-lg mb-8 max-w-xl">
              Üniversitemizin stratejik kararlarında, fon dağılımlarında ve büyük projelerinde mezun/öğrenci oylamasına katıl.
            </p>
            <button 
              onClick={(e) => {
                e.preventDefault();
                window.toast && window.toast.info("AI Önerge Asistanı: Akıllı kontrat hazırlanıyor...");
                setTimeout(() => {
                  window.toast && window.toast.success("✅ Kampüs Sürdürülebilirlik Fonu önergesi taslağı blockchain ağına kaydedilmek üzere hazırlandı.");
                }, 2000);
              }}
              className="bg-white text-indigo-900 hover:bg-blue-50 px-6 py-3 rounded-xl font-black flex items-center gap-2 transition shadow-lg mx-auto md:mx-0"
            >
              AI Destekli Önerge Ver <ArrowRight size={18} />
            </button>
          </div>

          <div className="hidden lg:flex flex-col gap-4 relative z-10">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl text-center min-w-[200px]">
              <div className="text-2xl font-black mb-1">15.4K</div>
              <div className="text-blue-200 text-sm font-bold uppercase tracking-wider">Aktif Seçmen</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl text-center min-w-[200px]">
              <div className="text-2xl font-black mb-1">₺1.2M</div>
              <div className="text-blue-200 text-sm font-bold uppercase tracking-wider">Yönetilen Fon</div>
            </div>
          </div>
        </div>

        {/* Proposals List */}
        <h3 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-2">
          <BarChart3 className="text-indigo-500" /> Aktif Önergeler
        </h3>

        <div className="flex flex-col gap-6">
          {PROPOSALS.map(prop => {
            const total = prop.for + prop.against;
            const forPercent = Math.round((prop.for / total) * 100);
            const againstPercent = Math.round((prop.against / total) * 100);
            
            return (
              <div key={prop.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                {prop.status === 'passed' && (
                  <div className="absolute top-4 right-4 bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
                    Kabul Edildi
                  </div>
                )}
                {prop.status === 'active' && (
                  <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-amber-50 text-amber-600 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border border-amber-100">
                    <Clock size={14} /> {prop.date}
                  </div>
                )}
                
                <h4 className="text-xl font-black text-slate-900 mb-2 max-w-2xl">{prop.title}</h4>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-2">
                  <p className="text-slate-500 text-sm font-medium flex items-center gap-2">
                    <Users size={16} /> Yazar: {prop.author}
                  </p>
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      window.toast && window.toast.info("Anka AI: Topluluk yorumları analiz ediliyor...");
                      setTimeout(() => {
                        window.toast && window.toast.success("✅ AI Duygu Analizi: Mezunlar bu tasarının fonlama modelini 'gerçekçi' (%78) buluyor.");
                      }, 2500);
                    }}
                    className="text-xs font-bold bg-indigo-50 text-indigo-600 hover:bg-indigo-100 px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
                    title="Topluluk duygu analizi"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m12 14 4-4"></path><path d="M3.34 19a10 10 0 1 1 17.32 0"></path></svg>
                    AI Tartışma Özeti
                  </button>
                </div>
                
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  
                  {/* Progress Bar */}
                  <div className="flex-1 w-full">
                    <div className="flex justify-between text-sm font-bold mb-2">
                      <span className="text-emerald-600">{forPercent}% Kabul ({prop.for})</span>
                      <span className="text-red-600">{againstPercent}% Ret ({prop.against})</span>
                    </div>
                    <div className="h-4 bg-slate-100 rounded-full flex overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${forPercent}%` }} className="bg-emerald-500 h-full transition-all duration-1000" />
                      <motion.div initial={{ width: 0 }} animate={{ width: `${againstPercent}%` }} className="bg-red-500 h-full transition-all duration-1000" />
                    </div>
                  </div>

                  {/* Voting Actions */}
                  {prop.status === 'active' && (
                    <div className="flex gap-3 shrink-0">
                      <button 
                        onClick={() => handleVote(prop.id, 'for')}
                        disabled={voted[prop.id]}
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${voted[prop.id] === 'for' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30' : 'bg-slate-50 text-slate-400 hover:bg-emerald-50 hover:text-emerald-500 border border-slate-200'}`}
                      >
                        <Check size={28} strokeWidth={3} />
                      </button>
                      <button 
                        onClick={() => handleVote(prop.id, 'against')}
                        disabled={voted[prop.id]}
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${voted[prop.id] === 'against' ? 'bg-red-500 text-white shadow-lg shadow-red-500/30' : 'bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-500 border border-slate-200'}`}
                      >
                        <X size={28} strokeWidth={3} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </main>
    </div>
  );
}
