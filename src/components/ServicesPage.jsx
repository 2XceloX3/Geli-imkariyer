import React from 'react';
import { ChevronLeft, Server, Utensils, Briefcase, GraduationCap, ArrowRight, ShieldCheck, HeartPulse, BookOpen, Globe2, Sparkles, Building2 } from 'lucide-react';
import TopProfileMenu from './TopProfileMenu';

const SERVICES_LIST = [
  {
    title: "BİDB Bilişim & Altyapı Hizmetleri",
    category: "Teknoloji & İnternet",
    desc: "10Gbps Fiber omurga ağ, Wi-Fi 6 yüksek hızlı kablosuz bağlantı, Öğrenci E-postaları, LMS Uzaktan Eğitim ve OBİS platformu.",
    view: "bidb_status",
    badge: "7/24 Aktif",
    icon: <Server className="text-indigo-600" size={24} />
  },
  {
    title: "SKSDB Sağlık & Vücut İndeksi (BMI)",
    category: "Mediko-Sosyal",
    desc: "Öğrenci BMI (Boy-Kilo İndeksi) hesabı, metabolizma danışmanlığı, beslenme uzmanı takibi, spor kompleksleri ve mediko hizmetleri.",
    view: "sksdb_lunch",
    badge: "Öğrenci Odaklı",
    icon: <Utensils className="text-emerald-600" size={24} />
  },
  {
    title: "Kariyer Geliştirme & İGÜMER",
    category: "İstihdam & Girişim",
    desc: "1-on-1 Sektör mentorlukları, Yapay Zeka destekli CV oluşturucu, staj/iş ilan paneli ve İGÜMER Kuluçka Merkezi kuluçka desteği.",
    view: "kariyer_board",
    badge: "Global Ağ",
    icon: <Briefcase className="text-amber-600" size={24} />
  },
  {
    title: "Kütüphane & Dijital Yayın Havuzu",
    category: "Akademik Kaynak",
    desc: "150.000+ E-kitap ve uluslararası veritabanı erişimi, Turnitin intihal kontrolü, 7/24 sessiz çalışma salonları ve e-kaynak tarama.",
    view: "metaverse_library",
    badge: "7/24 Açık",
    icon: <BookOpen className="text-purple-600" size={24} />
  },
  {
    title: "Öğrenci Kulüpleri & Kültür Sanat",
    category: "Kampüs Yaşamı",
    desc: "40+ Aktif öğrenci kulübüne üyelik, sosyal projeler, teknik geziler, bahar festivalleri ve topluluk yönetim araçları.",
    view: "sksdb_clubs",
    badge: "40+ Kulüp",
    icon: <GraduationCap className="text-blue-600" size={24} />
  },
  {
    title: "Dış İlişkiler & Erasmus+ Ofisi",
    category: "Uluslararası",
    desc: "Avrupa üniversiteleriyle öğrenci değişim programları, staj hareketliliği, çift anadal ve uluslararası burs imkanları.",
    view: "global_map",
    badge: "AB Entegre",
    icon: <Globe2 className="text-rose-600" size={24} />
  }
];

export default function ServicesPage({ setView, currentUser, userRole, setSelectedUserId }) {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col font-sans">
      <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setView(currentUser ? (userRole === 'employer' ? 'company' : userRole === 'alumni' ? 'alumni' : userRole === 'academic' ? 'academic' : 'student') : 'landing')} 
            className="p-2 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="flex items-center gap-2">
            <Server className="text-indigo-600" size={24} />
            <h1 className="font-black text-slate-900 tracking-tight">Hizmetlerimiz & Birimler</h1>
          </div>
        </div>
        <TopProfileMenu currentUser={currentUser} userRole={userRole} setView={setView} setSelectedUserId={setSelectedUserId} />
      </header>

      <main className="flex-1 w-full max-w-[1150px] mx-auto p-4 lg:p-8 flex flex-col gap-8">
        
        {/* Banner */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-8 md:p-10 shadow-xl border border-slate-800">
          <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400 bg-indigo-950/70 px-3.5 py-1.5 rounded-full border border-indigo-900/60">
            Resmi Birim Ekosistemi
          </span>
          <h2 className="text-2xl md:text-3xl font-black mt-3 mb-2 tracking-tight">
            Üniversite Öğrenci & Akademik Hizmet Portalı
          </h2>
          <p className="text-slate-300 text-xs md:text-sm font-semibold max-w-2xl leading-relaxed">
            Bilişim altyapısından sağlık danışmanlığına, dijital kütüphaneden kariyer mentorluğuna kadar tüm üniversite hizmetlerine tek tıkla erişin.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_LIST.map((srv, idx) => (
            <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-lg transition flex flex-col justify-between group">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 group-hover:scale-105 transition-transform">
                    {srv.icon}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-100">
                    {srv.badge}
                  </span>
                </div>
                <h3 className="text-base font-black text-slate-900 mb-2">{srv.title}</h3>
                <p className="text-xs font-medium text-slate-500 leading-relaxed mb-6">{srv.desc}</p>
              </div>

              <button 
                onClick={() => setView(srv.view)}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-2xl text-xs uppercase tracking-widest transition flex items-center justify-center gap-2 shadow-md"
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
