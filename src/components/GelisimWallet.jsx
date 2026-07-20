import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wallet, Award, BookOpen, Zap, ShieldCheck, TrendingUp, History, ChevronLeft, CreditCard, Star, FileText, CheckCircle2, FileSignature } from 'lucide-react';
import Logo from './Logo';
import TopProfileMenu from './TopProfileMenu';

const VERIFIED_SKILLS = [
  { id: 1, type: 'course', amount: 'Tamamlandı', desc: 'İleri Seviye Veri Analizi Eğitimi', date: 'Bugün, 14:30', icon: <BookOpen size={16}/> },
  { id: 2, type: 'achievement', amount: 'Onaylandı', desc: 'İGÜ Kariyer Zirvesi 2026 Katılımı', date: 'Dün, 09:15', icon: <Award size={16}/> },
  { id: 3, type: 'mentor', amount: 'Tamamlandı', desc: 'Sektör Lideri ile Mentorluk Seansı', date: '12 Eki, 16:00', icon: <Zap size={16}/> },
  { id: 4, type: 'certificate', amount: 'Doğrulandı', desc: 'Girişimcilik ve İnovasyon Sertifikası', date: '10 Eki, 18:45', icon: <ShieldCheck size={16}/> },
];

const CERTIFICATES = [
  { id: 1, name: 'Google Proje Yönetimi', issuer: 'Google (Coursera)', icon: 'G', color: 'bg-white text-blue-600 border-blue-100' },
  { id: 2, name: 'AWS Cloud Practitioner', issuer: 'Amazon Web Services', icon: 'AWS', color: 'bg-white text-orange-500 border-orange-100' },
  { id: 3, name: 'Agile Metodolojileri', issuer: 'İGÜ SEM', icon: 'SEM', color: 'bg-[#0A2342] text-white border-blue-900' },
  { id: 4, name: 'Liderlik ve Yönetim', issuer: 'LinkedIn Learning', icon: 'in', color: 'bg-white text-[#0A66C2] border-[#0A66C2]/20' },
];

export default function GelisimWallet({ setView, currentUser, userRole, setSelectedUserId }) {
  return (
    <div className="min-h-screen bg-[#F0F2F5] text-gray-900 flex flex-col font-sans">
      <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setView(userRole === 'employer' ? 'company' : userRole === 'alumni' ? 'alumni' : userRole === 'academic' ? 'academic' : 'student')} 
            className="p-2 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#0A66C2] rounded-lg flex items-center justify-center shadow-sm">
              <Wallet className="text-white" size={16} />
            </div>
            <div className="hidden sm:block">
              <h1 className="font-black text-gray-900 leading-tight">Kariyer Portfolyosu</h1>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Yetkinlik Cüzdanı</p>
            </div>
          </div>
        </div>
        <TopProfileMenu currentUser={currentUser} userRole={userRole} setView={setView} setSelectedUserId={setSelectedUserId} />
      </header>

      <main className="flex-1 w-full max-w-[1200px] mx-auto p-4 lg:p-8 flex flex-col gap-8">
        
        {/* Wallet Balance Hero */}
        <div className="bg-[#0A2342] rounded-2xl p-8 md:p-12 shadow-xl relative overflow-hidden text-white flex flex-col md:flex-row items-center justify-between gap-8 border border-[#0A66C2]/20">
          <div className="absolute right-0 top-0 w-1/2 h-full bg-[#0A66C2]/10 skew-x-12 transform origin-bottom pointer-events-none"></div>
          
          <div className="relative z-10 text-center md:text-left max-w-xl">
            <p className="text-blue-200 font-bold uppercase tracking-widest text-xs mb-3 flex items-center justify-center md:justify-start gap-2 bg-white/10 w-fit px-3 py-1 rounded-full border border-white/10 backdrop-blur-md">
              <ShieldCheck size={14} /> Doğrulanmış Profil Analizi
            </p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4 leading-tight">
              Kariyer Yolculuğunuz <br/><span className="text-[#0A66C2]">Tek Bir Yerde.</span>
            </h2>
            <p className="text-blue-100 text-lg leading-relaxed">
              Katıldığınız etkinlikler, aldığınız eğitimler ve sertifikalar blockchain altyapısıyla doğrulanarak dijital portfolyonuza eklenir. İşe alım uzmanlarına kanıtlanmış yetkinliklerinizi sunun.
            </p>
          </div>

          <div className="relative z-10 flex flex-col gap-3 w-full md:w-auto">
            <button 
              onClick={(e) => {
                e.preventDefault();
                window.toast && window.toast.info("AI: Blockchain üzerindeki sertifikalarınız analiz ediliyor...");
                setTimeout(() => {
                  window.toast && window.toast.success("✅ Analiz Tamamlandı: Sektöre hazırlık endeksiniz %85 olarak güncellendi.");
                }, 2000);
              }}
              className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition shadow-lg w-full min-w-[220px] border border-emerald-400"
            >
              <Zap size={20} /> AI İstihdam Analizi
            </button>
            <button className="bg-[#0A66C2] hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition shadow-lg w-full min-w-[220px]">
              <FileSignature size={20} /> Özgeçmişe Aktar
            </button>
            <button className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition w-full min-w-[220px] backdrop-blur-md">
              <FileText size={20} /> Transkript İndir
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Certificates */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2">
                <Award className="text-[#0A66C2]" size={22} /> Doğrulanmış Sertifikalar
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {CERTIFICATES.map(cert => (
                  <div key={cert.id} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow group cursor-pointer">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-xl font-black shadow-sm border \${cert.color} shrink-0`}>
                      {cert.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-[15px] mb-1 group-hover:text-[#0A66C2] transition-colors">{cert.name}</h4>
                      <p className="text-xs text-gray-500 font-medium flex items-center gap-1">
                        <CheckCircle2 size={12} className="text-emerald-500" /> {cert.issuer}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Progress / Career Readiness */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200 shadow-sm">
               <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2">
                <TrendingUp className="text-[#0A66C2]" size={22}/> İstihdam Edilebilirlik Skoru
              </h3>
              <div className="flex items-center justify-between mb-2">
                <span className="font-black text-gray-700 text-sm">Sektöre Hazırlık Endeksi</span>
                <span className="font-bold text-[#0A66C2] bg-blue-50 px-2 py-0.5 rounded-lg border border-blue-100">80%</span>
              </div>
              <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden mb-4 border border-gray-200">
                <motion.div initial={{ width: 0 }} animate={{ width: '80%' }} className="h-full bg-[#0A66C2]" />
              </div>
              <p className="text-sm text-gray-500 font-medium">Bu skoru artırmak için Sürekli Eğitim Merkezi'ndeki (SEM) açık eğitimleri inceleyebilirsiniz.</p>
            </div>
          </div>

          {/* Right Column: Transaction History -> Professional Activities */}
          <div className="space-y-6">
            <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2">
              <History className="text-[#0A66C2]" size={22} /> Kayıtlı Aktiviteler
            </h3>
            
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
              <div className="flex flex-col">
                {VERIFIED_SKILLS.map((trx, idx) => (
                  <div key={trx.id} className={`p-5 flex items-center justify-between hover:bg-gray-50 transition-colors \${idx !== VERIFIED_SKILLS.length - 1 ? 'border-b border-gray-100' : ''}`}>
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border shadow-sm \${trx.type === 'certificate' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-blue-50 text-[#0A66C2] border-blue-100'}`}>
                        {trx.icon}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-gray-900 leading-tight mb-1">{trx.desc}</h4>
                        <p className="text-[11px] text-gray-500 font-bold uppercase tracking-wider">{trx.date}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full py-4 text-sm font-bold text-[#0A66C2] hover:bg-blue-50 transition-colors border-t border-gray-100 flex items-center justify-center gap-2">
                Tüm Aktiviteleri Görüntüle
              </button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
