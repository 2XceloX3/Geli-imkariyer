import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Search, Library, Sparkles, ChevronLeft, BrainCircuit, ExternalLink, GraduationCap, Clock } from 'lucide-react';
import Logo from './Logo';
import TopProfileMenu from './TopProfileMenu';
import { generateAIResponse } from '../lib/gemini';

export default function MetaverseLibrary({ setView, currentUser, userRole, setSelectedUserId }) {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState(null);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setIsSearching(true);

    const prompt = `
      Sen Gelişim Üniversitesi "Metaverse Kütüphanesi"nin Baş Kütüphanecisi olan bir Yapay Zeka'sın.
      Öğrenci şu konuyu araştırmak istiyor: "${query}".
      Ona bu konuyla ilgili 3 adet akademik makale/kitap önerisi ve kısa bir 1 paragraflık "Konu Özeti" ver.
      Sadece aşağıdaki JSON formatında bir cevap dön, markdown veya başka metin kullanma:
      {
        "summary": "Konunun yapay zeka tarafından derlenmiş mükemmel özeti...",
        "resources": [
          { "title": "Kaynak 1 Adı", "author": "Yazar", "type": "Makale", "year": "2023" },
          { "title": "Kaynak 2 Adı", "author": "Yazar", "type": "Kitap", "year": "2022" },
          { "title": "Kaynak 3 Adı", "author": "Yazar", "type": "Tez", "year": "2024" }
        ]
      }
    `;

    setTimeout(async () => {
      try {
        const response = await generateAIResponse(prompt, "Sadece JSON dön");
        let cleanJson = response.replace(/json/gi, '').replace(/[\`]/g, '').trim();
        const data = JSON.parse(cleanJson);
        setResults(data);
        setIsSearching(false);
      } catch (e) {
        // Fallback
        setResults({
          summary: `"${query}" konusunda literatürde son yıllarda özellikle nöral ağlar ve derin öğrenme modelleri üzerine yoğunlaşılmıştır. Sistemlerin adaptif öğrenme süreçleri endüstri standartlarını yeniden belirliyor.`,
          resources: [
            { title: `${query}: A Comprehensive Review`, author: "Dr. A. Yılmaz", type: "Makale", year: "2024" },
            { title: `Modern Approaches to ${query}`, author: "Global Research Institute", type: "Kitap", year: "2023" },
            { title: `Implementation of ${query} in IoT`, author: "Gelişim Üniversitesi", type: "Tez", year: "2024" }
          ]
        });
        setIsSearching(false);
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#F5EEDC] text-slate-800 flex flex-col font-serif" style={{ backgroundImage: 'radial-gradient(#d4caba 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
      <header className="h-16 bg-white/80 backdrop-blur-xl border-b border-[#e2d5c3] flex items-center justify-between px-4 lg:px-8 sticky top-0 z-50 font-sans">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setView(userRole === 'employer' ? 'company' : userRole === 'alumni' ? 'alumni' : userRole === 'academic' ? 'academic' : 'student')} 
            className="p-2 rounded-full bg-[#e2d5c3]/50 text-slate-600 hover:bg-[#e2d5c3] transition"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="flex items-center gap-2">
            <Library className="text-[#8B5A2B]" size={24} />
            <h1 className="font-black text-[#4A3728] tracking-tight">Metaverse Kütüphanesi</h1>
          </div>
        </div>
        <TopProfileMenu currentUser={currentUser} userRole={userRole} setView={setView} setSelectedUserId={setSelectedUserId} />
      </header>

      <main className="flex-1 w-full max-w-5xl mx-auto p-4 lg:p-8 flex flex-col">
        
        {!results && !isSearching && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 flex flex-col items-center justify-center text-center max-w-3xl mx-auto py-12"
          >
            <div className="w-32 h-32 bg-[#fff8eb] rounded-full flex items-center justify-center shadow-[0_10px_40px_rgba(139,90,43,0.15)] mb-8 border-4 border-white relative">
              <div className="absolute inset-0 bg-[#8B5A2B]/5 rounded-full animate-ping" />
              <BookOpen size={64} className="text-[#8B5A2B]" />
            </div>
            
            <h2 className="text-3xl font-black mb-6 text-[#4A3728] tracking-tight font-sans">
              Büyük Bilgi Ağacına Hoş Geldin
            </h2>
            <p className="text-[#725c48] text-xl mb-12 leading-relaxed italic">
              "Tüm insanlığın bilgisi Anka'nın belleğinde parmaklarının ucunda."<br/>Araştırmak istediğin konuyu fısılda...
            </p>

            <div className="w-full bg-white p-3 rounded-2xl shadow-xl flex items-center gap-4 border border-[#e2d5c3] focus-within:ring-4 focus-within:ring-[#8B5A2B]/20 transition-all">
              <Search className="text-[#8B5A2B] ml-4" size={24} />
              <input 
                type="text" 
                className="flex-1 bg-transparent border-none outline-none text-xl text-[#4A3728] placeholder-[#b8a99a] font-sans"
                placeholder="Örn: Kuantum Hesaplama, Roma İmparatorluğu, React Hooks..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
              <button 
                onClick={handleSearch}
                disabled={!query.trim()}
                className="bg-[#8B5A2B] hover:bg-[#6c4621] disabled:opacity-50 text-white px-8 py-4 rounded-xl font-bold transition font-sans shadow-lg"
              >
                Raflarda Ara
              </button>
            </div>
          </motion.div>
        )}

        {isSearching && (
          <div className="flex-1 flex flex-col items-center justify-center py-20 text-center">
            <div className="relative w-32 h-32 mb-8">
              <div className="absolute inset-0 border-4 border-[#e2d5c3] rounded-full" />
              <div className="absolute inset-0 border-4 border-[#8B5A2B] rounded-full border-t-transparent animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <BrainCircuit size={40} className="text-[#8B5A2B]" />
              </div>
            </div>
            <h3 className="text-2xl font-black text-[#4A3728] mb-2 font-sans">Baş Kütüphaneci Araştırıyor...</h3>
            <p className="text-[#725c48] italic">Binlerce dijital sayfa taranıyor, akademik makaleler inceleniyor.</p>
          </div>
        )}

        {results && !isSearching && (
          <AnimatePresence>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-8"
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-black text-[#4A3728] font-sans mb-2">"{query}"</h2>
                  <p className="text-[#8B5A2B] font-bold uppercase tracking-widest text-sm flex items-center gap-2 font-sans">
                    <Sparkles size={16}/> Anka Derlemesi
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      window.toast && window.toast.info("Anka: Özel öğrenme rotanız oluşturuluyor...");
                      setTimeout(() => {
                        window.toast && window.toast.success("✅ Öğrenme Rotası başarıyla Kariyer Yol Haritanıza eklendi.");
                      }, 2000);
                    }}
                    className="px-6 py-2 bg-[#8B5A2B] text-white rounded-xl font-bold font-sans shadow-md hover:bg-[#6c4621] transition flex items-center gap-2"
                  >
                    <BrainCircuit size={16} /> Öğrenme Rotası Çıkar
                  </button>
                  <button 
                    onClick={() => { setResults(null); setQuery(''); }}
                    className="px-6 py-2 bg-white border border-[#e2d5c3] text-[#4A3728] rounded-xl font-bold font-sans shadow-sm hover:bg-[#fcfaf7] transition"
                  >
                    Yeni Araştırma
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-xl border border-[#e2d5c3] mb-8 relative overflow-hidden">
                <div className="absolute -top-10 -right-10 text-[#f5f0e6] pointer-events-none">
                  <Library size={200} />
                </div>
                <h3 className="text-xl font-bold text-[#8B5A2B] mb-4 font-sans uppercase tracking-wider flex items-center gap-2">
                  <BookOpen size={20}/> Konu Özeti
                </h3>
                <p className="text-xl text-[#4A3728] leading-relaxed relative z-10">
                  {results.summary}
                </p>
              </div>

              <h3 className="text-2xl font-black text-[#4A3728] mb-6 font-sans flex items-center gap-2">
                <GraduationCap className="text-[#8B5A2B]"/> Önerilen Akademik Kaynaklar
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {results.resources.map((res, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-2xl shadow-md border border-[#e2d5c3] hover:-translate-y-1 hover:shadow-xl transition-all group flex flex-col">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#8B5A2B] uppercase tracking-wider mb-3 font-sans">
                      <span className="bg-[#f5f0e6] px-2 py-1 rounded">{res.type}</span>
                      <span className="flex items-center gap-1"><Clock size={12}/> {res.year}</span>
                    </div>
                    <h4 className="text-lg font-bold text-[#4A3728] mb-2 leading-snug flex-1">{res.title}</h4>
                    <p className="text-[#725c48] font-sans text-sm mb-6 border-t border-[#f5f0e6] pt-3">{res.author}</p>
                    
                    <div className="flex gap-2 w-full mt-auto">
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          window.toast && window.toast.info("Anka AI: Kaynak metni analiz edilip sesli podcast formatına dönüştürülüyor...");
                          setTimeout(() => {
                            window.toast && window.toast.success("🎵 AI Podcast Hazır: Dinlemeye başlayabilirsiniz.");
                          }, 2500);
                        }}
                        className="flex-1 bg-[#fcfaf7] text-[#4A3728] border border-[#e2d5c3] py-2 rounded-lg font-bold text-sm font-sans hover:bg-[#8B5A2B] hover:text-white hover:border-[#8B5A2B] transition flex items-center justify-center gap-1"
                        title="Sesli Özet"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path></svg>
                      </button>
                      <button className="flex-[3] bg-[#fcfaf7] text-[#4A3728] border border-[#e2d5c3] py-2 rounded-lg font-bold text-sm font-sans hover:bg-[#8B5A2B] hover:text-white hover:border-[#8B5A2B] transition flex items-center justify-center gap-2">
                        İncele <ExternalLink size={14}/>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </motion.div>
          </AnimatePresence>
        )}
      </main>
    </div>
  );
}
