import React from 'react';
import { ChevronLeft, Server, Utensils, Briefcase, GraduationCap, ArrowRight, ShieldCheck, HeartPulse } from 'lucide-react';
import TopProfileMenu from './TopProfileMenu';

const SERVICES_LIST = [
  {
    title: "BİDB Bilişim Hizmetleri",
    category: "Teknoloji",
    desc: "Yüksek hızlı kampüs Wi-Fi, Öğrenci E-postaları, LMS Uzaktan Eğitim ve OBİS Entegrasyonu.",
    view: "bidb_status",
    icon: <Server className="text-indigo-600" size={24} />
  },
  {
    title: "SKSDB Beslenme & Sağlık",
    category: "Sosyal Hizmetler",
    desc: "Günlük kalori dengeli yemekhane menüleri, spor tesisleri kullanımı ve psikolojik danışmanlık rehberliği.",
    view: "sksdb_lunch",
    icon: <Utensils className="text-emerald-600" size={24} />
  },
  {
    title: "Kariyer Geliştirme Danışmanlığı",
    category: "İstihdam",
    desc: "1-on-1 Sektör mentorluğu, Yapay Zeka destekli CV optimizasyonu ve staj/iş fırsatları ilan paneli.",
    view: "kariyer_board",
    icon: <Briefcase className="text-amber-600" size={24} />
  },
  {
    title: "Öğrenci Kulüpleri & Etkinlikler",
    category: "Kültür & Sanat",
    desc: "40+ Aktif öğrenci kulübüne üyelik, sosyal projeler, teknik geziler ve kulüp festival organizasyonları.",
    view: "sksdb_clubs",
    icon: <GraduationCap className="text-purple-600" size={24} />
  }
];

export default function ServicesPage({ setView, currentUser, userRole, setSelectedUserId }) {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col font-sans">
      <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setView(userRole === 'employer' ? 'company' : userRole === 'alumni' ? 'alumni' : userRole === 'academic' ? 'academic' : 'student')} 
            className="p-2 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="flex items-center gap-2">
            <Server className="text-indigo-600" size={24} />
            <h1 className="font-black text-slate-900 tracking-tight">Hizmetlerimiz</h1>
          </div>
        </div>
        <TopProfileMenu currentUser={currentUser} userRole={userRole} setView={setView} setSelectedUserId={setSelectedUserId} />
      </header>

      <main className="flex-1 w-full max-w-[1100px] mx-auto p-4 lg:p-8 flex flex-col gap-6">
        <div className="border-b border-slate-200 pb-4">
          <h2 className="text-2xl font-black text-slate-900">Üniversite Birim Hizmetleri</h2>
          <p className="text-xs text-slate-500 font-semibold mt-1">Öğrenim hayatınızı kolaylaştıran dijital ve sosyal kampus imkanları.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SERVICES_LIST.map((srv, idx) => (
            <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                    {srv.icon}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">{srv.category}</span>
                </div>
                <h3 className="text-lg font-black text-slate-900 mb-2">{srv.title}</h3>
                <p className="text-xs font-semibold text-slate-500 leading-relaxed mb-6">{srv.desc}</p>
              </div>

              <button 
                onClick={() => setView(srv.view)}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-2xl text-xs uppercase tracking-widest transition flex items-center justify-center gap-2"
              >
                Hizmete Git <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
