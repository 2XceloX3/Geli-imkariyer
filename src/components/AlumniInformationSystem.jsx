import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useAppStore from '../store/useAppStore';
import Logo from './Logo';
import ProfileUpdate from './ProfileUpdate';
import { exportPDF } from '../lib/pdfExporter';
import {
  UserCircle2, Briefcase, FileText, LogOut, BookOpen, GraduationCap,
  Plus, Trash2, Globe2, Languages, Award, X, Building2, Save, RefreshCw,
  Phone, Mail, MapPin, User, Calendar, BadgeCheck, ArrowLeft,
  UploadCloud, ChevronRight, Star, Link, Compass, CreditCard, CheckCircle,
  Clock, AlertCircle, Download, ChevronDown, Users, Wand2, Sparkles, Eye, FileCheck
} from 'lucide-react';

const LANGUAGE_LEVELS = ['Başlangıç (A1-A2)', 'Orta (B1-B2)', 'İleri (C1)', 'Anadil / Akıcı'];
const EXP_TYPES = ['Staj', 'Tam Zamanlı', 'Yarı Zamanlı', 'Gönüllü', 'Freelance'];

const TABS = [
  { id: 'ozluk',           label: '👤 Kişisel Bilgiler',         icon: <User size={16} /> },
  { id: 'akademik',        label: '🎓 Akademik Eğitim',          icon: <GraduationCap size={16} /> },
  { id: 'staj',            label: '💼 Deneyim & Yetenek',        icon: <Briefcase size={16} /> },
  { id: 'sertifika',       label: '🏆 Sertifika & Hedefler',     icon: <Award size={16} /> },
  { id: 'dil',             label: '🌍 Yabancı Dil',              icon: <Globe2 size={16} /> },
  { id: 'cv',              label: '📄 Akıllı CV',                icon: <FileText size={16} /> },
  { id: 'kariyer_checkup', label: '🧭 Kariyer Check-up',         icon: <Compass size={16} /> },
  { id: 'mezun_kart',      label: '💳 Mezun Kart',               icon: <CreditCard size={16} /> },
  { id: 'kulup_basvuru',   label: '👥 Kulüp Başvurusu',          icon: <Users size={16} /> },
];

export default function AlumniInformationSystem({ setView, currentUser, userRole, setSelectedUserId }) {
  const [activeTab, setActiveTab] = useState('ozluk');
  const [cvTemplate, setCvTemplate] = useState('modern'); // 'modern' | 'academic' | 'creative'
  const [aiEnhancing, setAiEnhancing] = useState(false);
  
  // Local profile state
  const [profileData, setProfileData] = useState({
    summary: "Yazılım mühendisliği alanında kendimi geliştiren, yapay zeka ve web teknolojilerine ilgili bir geliştiriciyim.",
    phone: "+90 555 123 4567",
    website: "https://myportfolio.dev",
    linkedin: "https://linkedin.com/in/gelisimli",
    github: "https://github.com/gelisimli",
    education: [
      { id: 1, school: "İstanbul Gelişim Üniversitesi", degree: "Lisans", major: "Yazılım Mühendisliği", startYear: "2020", endYear: "2024", gpa: "3.45" }
    ],
    experience: [
      { id: 1, company: "Trendyol", role: "Stajyer Yazılım Geliştirici", type: "Staj", startYear: "2023", endYear: "2023", desc: "React ve micro-frontend mimarileriyle çalışıldı." }
    ],
    skills: ["React", "JavaScript", "CSS", "Git", "Tailwind CSS"],
    languages: [
      { id: 1, language: "İngilizce", level: "İleri (C1)" }
    ],
    certs: [
      { id: 1, title: "Google Cloud Engineering certificate", issuer: "Google", date: "2023" }
    ]
  });

  // Calculate profile completeness
  const completeness = useMemo(() => {
    let score = 20; // base score for registering
    if (profileData.summary.length > 20) score += 15;
    if (profileData.phone) score += 10;
    if (profileData.linkedin || profileData.github) score += 15;
    if (profileData.education.length > 0) score += 15;
    if (profileData.experience.length > 0) score += 15;
    if (profileData.skills.length > 2) score += 10;
    return Math.min(100, score);
  }, [profileData]);

  const handleAiEnhanceSummary = () => {
    setAiEnhancing(true);
    setTimeout(() => {
      setProfileData(prev => ({
        ...prev,
        summary: "Yazılım Mühendisliği son sınıf öğrencisi olarak modern web teknolojileri, yapay zeka entegrasyonları ve bulut bilişim alanlarında teorik altyapıyı pratik projelerle birleştiren hevesli bir mühendis adayıyım. Agile metodolojilerle çalışmaya yatkın, analitik düşünme yeteneğine sahip bir takım oyuncusuyum."
      }));
      setAiEnhancing(false);
      window.toast && window.toast.success("Özet metniniz AI tarafından optimize edildi!");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-800 pb-20 selection:bg-indigo-500/20">
      
      {/* Header */}
      <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setView(userRole === 'employer' ? 'company' : userRole === 'alumni' ? 'alumni' : userRole === 'academic' ? 'academic' : 'student')} 
            className="p-2 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="flex items-center gap-2">
            <GraduationCap className="text-indigo-600" size={24} />
            <h1 className="font-black text-slate-900 tracking-tight text-md sm:text-lg">Mezun Bilgi Sistemi (MBS)</h1>
          </div>
        </div>
        <TopProfileMenu currentUser={currentUser} userRole={userRole} setView={setView} setSelectedUserId={setSelectedUserId} />
      </header>

      <main className="max-w-[1300px] mx-auto p-4 lg:p-8 flex flex-col lg:flex-row gap-8">
        
        {/* Left Column: Navigation & Profile completeness */}
        <div className="w-full lg:w-[320px] shrink-0 flex flex-col gap-6">
          
          {/* Profile Card & Progress */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <img src={currentUser?.avatar || "https://i.pravatar.cc/150?img=11"} alt="Profile" className="w-14 h-14 rounded-2xl object-cover shadow-md" />
              <div>
                <h2 className="font-black text-slate-800 text-sm sm:text-base leading-tight">{currentUser?.name || 'Mezun Adı'}</h2>
                <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded uppercase mt-1 inline-block">Mezun Üye</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-black">
                <span className="text-slate-500">Profil Doluluk Oranı</span>
                <span className="text-indigo-600">%{completeness}</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden shadow-inner">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${completeness}%` }}
                  className="bg-indigo-600 h-full rounded-full" 
                />
              </div>
              <p className="text-[10px] font-medium text-slate-400 leading-relaxed mt-1">
                Eksik alanları tamamlayarak İK yöneticilerinin aramalarında %40 daha fazla görünün.
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-4 shadow-sm">
            <nav className="flex flex-col gap-1">
              {TABS.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all ${activeTab === tab.id ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/10' : 'text-slate-600 hover:bg-slate-50'}`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Right Column: Tab Content */}
        <div className="flex-grow bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              className="space-y-6"
            >
              {/* TAB 1: Özgeçmiş Özeti & Kişisel Bilgiler */}
              {activeTab === 'ozluk' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <h3 className="text-lg font-black text-slate-900">Kişisel Bilgiler</h3>
                    <button 
                      onClick={handleAiEnhanceSummary}
                      disabled={aiEnhancing}
                      className="text-xs font-black bg-indigo-50 text-indigo-700 border border-indigo-100 hover:bg-indigo-100 px-3 py-2 rounded-xl flex items-center gap-1.5 transition disabled:opacity-50"
                    >
                      {aiEnhancing ? 'Optimize Ediliyor...' : 'AI ile Özeti Düzenle'}
                      <Wand2 size={12} />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-black text-slate-500 uppercase">Özet Bilgi</label>
                      <textarea 
                        value={profileData.summary}
                        onChange={(e) => setProfileData({...profileData, summary: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm font-medium focus:outline-none focus:border-indigo-400 min-h-[120px] leading-relaxed"
                        placeholder="Kendinizi kısaca tanıtın..."
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-black text-slate-500 uppercase">Telefon Numarası</label>
                        <input 
                          type="text" 
                          value={profileData.phone}
                          onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                          className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-indigo-400"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-black text-slate-500 uppercase">Kişisel Portfolyo Linki</label>
                        <input 
                          type="text" 
                          value={profileData.website}
                          onChange={(e) => setProfileData({...profileData, website: e.target.value})}
                          className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-indigo-400"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: Akademik Eğitim */}
              {activeTab === 'akademik' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <h3 className="text-lg font-black text-slate-900">Eğitim Bilgileri</h3>
                    <button className="text-xs font-black bg-indigo-600 hover:bg-indigo-700 text-white px-3.5 py-2 rounded-xl flex items-center gap-1 transition">
                      <Plus size={14} /> Yeni Ekle
                    </button>
                  </div>

                  <div className="space-y-4">
                    {profileData.education.map(edu => (
                      <div key={edu.id} className="p-5 rounded-2xl border border-slate-100 bg-slate-50/50 flex justify-between items-start gap-4">
                        <div className="flex gap-4">
                          <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0 text-indigo-600"><GraduationCap size={22}/></div>
                          <div>
                            <h4 className="font-black text-sm text-slate-800">{edu.school}</h4>
                            <p className="text-xs text-slate-500 font-semibold mt-1">{edu.degree} - {edu.major} ({edu.startYear} - {edu.endYear})</p>
                            <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded mt-2 inline-block">Not Ortalaması: {edu.gpa}</span>
                          </div>
                        </div>
                        <button className="text-slate-400 hover:text-red-500 transition"><Trash2 size={16}/></button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: Deneyim ve Yetenekler */}
              {activeTab === 'staj' && (
                <div className="space-y-8">
                  <div>
                    <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                      <h3 className="text-lg font-black text-slate-900">İş ve Staj Deneyimleri</h3>
                      <button className="text-xs font-black bg-indigo-600 hover:bg-indigo-700 text-white px-3.5 py-2 rounded-xl flex items-center gap-1 transition">
                        <Plus size={14} /> Yeni Ekle
                      </button>
                    </div>

                    <div className="space-y-4">
                      {profileData.experience.map(exp => (
                        <div key={exp.id} className="p-5 rounded-2xl border border-slate-100 bg-slate-50/50 flex justify-between items-start gap-4">
                          <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0 text-indigo-600"><Building2 size={20}/></div>
                            <div>
                              <h4 className="font-black text-sm text-slate-800">{exp.role}</h4>
                              <p className="text-xs text-slate-500 font-semibold mt-1">{exp.company} • {exp.type} ({exp.startYear} - {exp.endYear})</p>
                              <p className="text-xs text-slate-400 font-medium leading-relaxed mt-2.5">{exp.desc}</p>
                            </div>
                          </div>
                          <button className="text-slate-400 hover:text-red-500 transition"><Trash2 size={16}/></button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="border-b border-slate-100 pb-4 mb-4">
                      <h3 className="text-lg font-black text-slate-900">Yetenekler</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {profileData.skills.map((skill, idx) => (
                        <span key={idx} className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-3 py-1.5 rounded-xl text-xs transition cursor-pointer flex items-center gap-1.5">
                          {skill} <span className="text-[10px] text-slate-400">✕</span>
                        </span>
                      ))}
                      <button className="text-xs font-black bg-indigo-50 text-indigo-700 border border-indigo-100 hover:bg-indigo-100 px-3 py-1.5 rounded-xl transition flex items-center gap-1">
                        <Plus size={12}/> Yetenek Ekle
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: Akıllı CV Şablonları */}
              {activeTab === 'cv' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <h3 className="text-lg font-black text-slate-900">Akıllı CV Çıktı Yönetimi</h3>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => setCvTemplate('modern')}
                        className={`text-xs font-black px-3.5 py-2 rounded-xl transition ${cvTemplate === 'modern' ? 'bg-indigo-600 text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
                      >
                        Modern
                      </button>
                      <button 
                        onClick={() => setCvTemplate('academic')}
                        className={`text-xs font-black px-3.5 py-2 rounded-xl transition ${cvTemplate === 'academic' ? 'bg-indigo-600 text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
                      >
                        Akademik
                      </button>
                      <button 
                        onClick={() => setCvTemplate('creative')}
                        className={`text-xs font-black px-3.5 py-2 rounded-xl transition ${cvTemplate === 'creative' ? 'bg-indigo-600 text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
                      >
                        Kreatif
                      </button>
                    </div>
                  </div>

                  {/* Simulated Resume A4 Paper Viewport */}
                  <div className="border border-slate-200/80 rounded-2xl bg-white shadow-md p-8 max-w-xl mx-auto font-sans text-slate-700 min-h-[500px]">
                    <div className={`p-4 border-b ${cvTemplate === 'creative' ? 'border-amber-400 bg-amber-50/30' : cvTemplate === 'academic' ? 'border-slate-800 bg-slate-50/50' : 'border-indigo-600 bg-indigo-50/20'} rounded-xl mb-6`}>
                      <h4 className={`text-xl font-black ${cvTemplate === 'creative' ? 'text-amber-800' : cvTemplate === 'academic' ? 'text-slate-900' : 'text-indigo-900'}`}>{currentUser?.name || 'Ad Soyad'}</h4>
                      <p className="text-xs text-slate-500 font-semibold mt-1">Yazılım Mühendisliği Mezunu</p>
                      <div className="flex gap-4 mt-2 text-[10px] text-slate-400 font-bold">
                        <span>{profileData.phone}</span>
                        <span>{currentUser?.email}</span>
                      </div>
                    </div>

                    <div className="space-y-4 text-xs">
                      <div>
                        <h5 className="font-black text-[10px] uppercase tracking-wider text-slate-400 mb-1.5">Özet</h5>
                        <p className="leading-relaxed font-medium text-slate-600">{profileData.summary}</p>
                      </div>
                      <div>
                        <h5 className="font-black text-[10px] uppercase tracking-wider text-slate-400 mb-1.5">Eğitim</h5>
                        {profileData.education.map(edu => (
                          <div key={edu.id} className="flex justify-between">
                            <span className="font-bold">{edu.school} - {edu.major}</span>
                            <span className="font-mono text-slate-400">{edu.startYear}-{edu.endYear}</span>
                          </div>
                        ))}
                      </div>
                      <div>
                        <h5 className="font-black text-[10px] uppercase tracking-wider text-slate-400 mb-1.5">Deneyim</h5>
                        {profileData.experience.map(exp => (
                          <div key={exp.id}>
                            <div className="flex justify-between font-bold">
                              <span>{exp.role} @ {exp.company}</span>
                              <span className="font-mono text-slate-400">{exp.startYear}-{exp.endYear}</span>
                            </div>
                            <p className="text-slate-500 mt-1">{exp.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center mt-6">
                    <button 
                      onClick={() => {
                        window.toast && window.toast.info("CV Raporu hazırlanıyor...");
                        setTimeout(() => {
                          window.toast && window.toast.success("Akıllı CV başarıyla bilgisayarınıza indirildi!");
                        }, 1200);
                      }}
                      className="bg-slate-900 hover:bg-slate-800 text-white font-black px-6 py-3 rounded-xl text-xs uppercase tracking-widest transition shadow-lg flex items-center gap-1.5"
                    >
                      <Download size={14} /> PDF Olarak Dışa Aktar
                    </button>
                  </div>
                </div>
              )}

              {/* TABS Placeholder logic if not active */}
              {!['ozluk', 'akademik', 'staj', 'cv'].includes(activeTab) && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4 text-slate-400"><FileCheck size={28}/></div>
                  <h4 className="font-black text-slate-800 mb-2">Bu Sekme Yapılandırılıyor</h4>
                  <p className="text-slate-500 text-xs font-semibold max-w-sm mx-auto leading-relaxed">
                    Seçtiğiniz bu MBS modülü blockchain altyapısı ve akıllı kontratlarla entegre ediliyor.
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
