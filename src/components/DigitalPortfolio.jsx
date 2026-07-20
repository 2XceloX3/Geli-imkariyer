import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FolderGit2, FileCheck2, ChevronLeft, ExternalLink, Award, Sparkles, CheckCircle2, Star, Eye } from 'lucide-react';
import Logo from './Logo';
import TopProfileMenu from './TopProfileMenu';

const MOCK_PROJECTS = [
  { id: 1, title: 'AI Tabanlı Mülakat Botu', category: 'Yapay Zeka', tech: ['React', 'Python', 'OpenAI'], views: 1240, stars: 45, image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800' },
  { id: 2, title: 'Sürdürülebilir Kampüs IoT', category: 'Nesnelerin İnterneti', tech: ['Arduino', 'C++', 'Firebase'], views: 856, stars: 22, image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800' },
  { id: 3, title: 'Kripto Cüzdan Arayüzü', category: 'Web3', tech: ['Next.js', 'Solidity', 'Tailwind'], views: 2100, stars: 128, image: 'https://images.unsplash.com/photo-1639762681485-074b7f4ec651?auto=format&fit=crop&q=80&w=800' },
];

const MOCK_CERTS = [
  { id: 1, title: 'Google Advanced Data Analytics', issuer: 'Google', date: 'Ekim 2023', verifyUrl: '#', icon: <Award size={32} className="text-blue-500" /> },
  { id: 2, title: 'AWS Solutions Architect Associate', issuer: 'Amazon Web Services', date: 'Kasım 2023', verifyUrl: '#', icon: <Award size={32} className="text-orange-500" /> },
  { id: 3, title: 'Gelişim Blockchain Eğitimi', issuer: 'İGÜ Sürekli Eğitim', date: 'Aralık 2023', verifyUrl: '#', icon: <Award size={32} className="text-indigo-500" /> },
];

export default function DigitalPortfolio({ setView, currentUser, userRole, setSelectedUserId }) {
  const [activeTab, setActiveTab] = useState('projects'); // 'projects' or 'certs'

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans">
      <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setView(userRole === 'employer' ? 'company' : userRole === 'alumni' ? 'alumni' : userRole === 'academic' ? 'academic' : 'student')} 
            className="p-2 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="flex items-center gap-2">
            <FolderGit2 className="text-indigo-600" size={24} />
            <h1 className="font-black text-slate-900 tracking-tight">Dijital Portfolyo</h1>
          </div>
        </div>
        <TopProfileMenu currentUser={currentUser} userRole={userRole} setView={setView} setSelectedUserId={setSelectedUserId} />
      </header>

      <main className="flex-1 w-full max-w-6xl mx-auto p-4 lg:p-8">
        
        {/* Profile Header */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-100 mb-8 flex flex-col md:flex-row items-center md:items-start gap-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2" />
          
          <img src={currentUser?.avatar || "https://i.pravatar.cc/150?img=11"} alt="Profile" className="w-32 h-32 rounded-xl object-cover shadow-xl" />
          
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <h2 className="text-3xl font-black text-slate-900">{currentUser?.name || 'Öğrenci Adı'}</h2>
              <CheckCircle2 size={24} className="text-blue-500" />
            </div>
            <p className="text-slate-500 font-medium mb-4">{currentUser?.department || 'Yazılım Mühendisliği'} • {currentUser?.year || '4. Sınıf'}</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-2">
              <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-bold">Full Stack</span>
              <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-bold">UI/UX</span>
              <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-bold">AI Enthusiast</span>
            </div>
          </div>

          <div className="flex flex-col gap-3 w-full md:w-auto">
            <button 
              onClick={(e) => {
                e.preventDefault();
                window.toast && window.toast.info("AI: Projeleriniz Github üzerinden analiz ediliyor...");
                setTimeout(() => {
                  window.toast && window.toast.success("✅ AI Analizi Tamamlandı: Projeleriniz %92 oranında güncel sektör trendleriyle eşleşiyor. (Detaylar mailinize gönderildi)");
                }, 2500);
              }}
              className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100 px-6 py-3 rounded-xl font-bold transition flex items-center justify-center gap-2 border border-indigo-200"
            >
              <Sparkles size={18} /> AI Portfolyo Analizi
            </button>
            <button className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-bold transition shadow-lg flex items-center justify-center gap-2">
              <ExternalLink size={18} /> Özgeçmişi İndir
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-slate-200 pb-px">
          <button 
            onClick={() => setActiveTab('projects')}
            className={`pb-4 px-2 font-black text-lg transition-colors border-b-4 ${activeTab === 'projects' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
          >
            <span className="flex items-center gap-2"><FolderGit2 size={20}/> Projeler ({MOCK_PROJECTS.length})</span>
          </button>
          <button 
            onClick={() => setActiveTab('certs')}
            className={`pb-4 px-2 font-black text-lg transition-colors border-b-4 ${activeTab === 'certs' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
          >
            <span className="flex items-center gap-2"><FileCheck2 size={20}/> Sertifikalar ({MOCK_CERTS.length})</span>
          </button>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'projects' && (
            <motion.div 
              key="projects"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {MOCK_PROJECTS.map(proj => (
                <div key={proj.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-indigo-900/5 transition-all group">
                  <div className="h-48 overflow-hidden relative">
                    <img src={proj.image} alt={proj.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-slate-800 shadow-sm">
                      {proj.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-black text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">{proj.title}</h3>
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {proj.tech.map(t => (
                        <span key={t} className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs font-bold">{t}</span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-sm text-slate-500 font-bold border-t border-slate-100 pt-4">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1.5 hover:text-blue-500 transition cursor-pointer"><Eye size={16}/> {proj.views}</span>
                        <span className="flex items-center gap-1.5 hover:text-amber-500 transition cursor-pointer"><Star size={16}/> {proj.stars}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={(e) => {
                            e.preventDefault();
                            window.toast && window.toast.info("Anka AI: Proje kodları analiz ediliyor...");
                            setTimeout(() => {
                              window.toast && window.toast.success("✅ AI Kod İncelemesi: Clean code standartlarına %89 uyumlu.");
                            }, 2500);
                          }}
                          className="text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                          title="AI Kod Analizi"
                        >
                           <Sparkles size={14} /> AI
                        </button>
                        <button className="text-indigo-600 hover:text-indigo-800 ml-2">İncele</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'certs' && (
            <motion.div 
              key="certs"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {MOCK_CERTS.map(cert => (
                <div key={cert.id} className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:border-indigo-200 transition flex items-center gap-6 group">
                  <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    {cert.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-black text-slate-900 leading-tight mb-1">{cert.title}</h3>
                    <p className="text-slate-500 font-medium text-sm mb-2">{cert.issuer}</p>
                    <p className="text-slate-400 text-xs font-bold uppercase">{cert.date}</p>
                  </div>
                  <a href={cert.verifyUrl} className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 transition shrink-0">
                    <ExternalLink size={18} />
                  </a>
                </div>
              ))}
              
              {/* Blockchain Badge */}
              <div className="col-span-1 md:col-span-2 bg-gradient-to-r from-slate-900 to-indigo-900 rounded-xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                  <Award size={150} />
                </div>
                <div>
                  <h3 className="text-2xl font-black mb-2 flex items-center gap-2"><Sparkles className="text-amber-400"/> Blockchain Doğrulaması</h3>
                  <p className="text-slate-300 max-w-xl leading-relaxed">Tüm sertifikaların Gelişim Ağı üzerinde kriptografik olarak imzalanmış ve doğrulanmıştır. İşverenler QR kod ile anında teyit edebilir.</p>
                </div>
                <button className="bg-white text-slate-900 px-6 py-3 rounded-xl font-black shrink-0 hover:bg-slate-100 transition shadow-lg">
                  Sertifika Ağını Gör
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </main>
    </div>
  );
}
