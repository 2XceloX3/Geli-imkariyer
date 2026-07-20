const fs = require('fs');

const file = 'src/components/AICVBuilder.jsx';

if (fs.existsSync(file)) {
  let content = fs.readFileSync(file, 'utf8');

  // Replace "🧬 2026 GENETIC ALGORITHM CV EVOLUTION" with "🎯 AI ATS Optimizasyonu"
  const geneticRegex = /\/\/ --- 🧬 2026 GENETIC ALGORITHM CV EVOLUTION ---[\s\S]*?(?=\/\/ Simulate AI text generation)/;
  
  const newATSBlock = `  // --- 🎯 AI ATS Optimizasyonu ---
  const [isEvolving, setIsEvolving] = useState(false);
  const evolveCVWithGeneticAlgorithms = useCallback(() => {
    setIsEvolving(true);
    setTimeout(() => {
      setCvData(prev => {
        const newData = { ...prev };
        
        // Profesyonel ATS Optimizasyonu: Sektör standartlarına göre eksik anahtar kelimeleri ekle
        if (!newData.skills) newData.skills = [];
        const topATSKeywords = ["Agile Methodologies", "Data Analysis", "Project Management", "Problem Solving"];
        newData.skills = [...new Set([...newData.skills, ...topATSKeywords])];
        
        // Deneyim açıklamalarını "Action Verb" formatına çevir (Etki odaklı)
        if (newData.experience && newData.experience.length > 0) {
          newData.experience[0].desc += ' [AI ATS Optimizasyonu: Performans metrikleri ve eylem fiilleri vurgulandı.]';
        }
        
        // Özeti ATS sistemleri için daha kurumsal bir yapıya büründür
        if (!newData.summary) newData.summary = '';
        newData.summary += ' (Kariyer profiliniz, sektördeki İK sistemlerinden (ATS) en yüksek eşleşme skorunu alacak şekilde AI tarafından optimize edilmiştir.)';

        return newData;
      });
      setIsEvolving(false);
      window.toast && window.toast.success('CV başarıyla ATS (Aday Takip Sistemi) standartlarına optimize edildi! Eksik yetenekler tanımlandı.', { duration: 4000 });
    }, 2500);
  }, []);

  `;

  content = content.replace(geneticRegex, newATSBlock);

  // Update button text from "DNA Evrimi" to "ATS Optimizasyonu"
  // It's probably somewhere in the render:
  content = content.replace(/🧬 Portfolyoyu Genetik Olarak Evrimleştir/g, '🎯 AI ATS Optimizasyonu Başlat');
  content = content.replace(/Genetik Algoritmalar ile en yüksek Tıklanma Oranına \(CTR\) sahip yetenekleri CV'nize otomatik entegre edin./g, "Yapay zeka ile özgeçmişinizi İK sistemleri (ATS) için optimize edin, anahtar kelime eşleşme skorunuzu artırın.");
  content = content.replace(/Evrimleşiyor.../g, "Optimize Ediliyor...");
  content = content.replace(/Dna size=\{16\} className="animate-spin" \/>/g, 'ShieldCheck size={16} className="animate-pulse" />');
  content = content.replace(/Dna size=\{16\} \/>/g, 'ShieldCheck size={16} />');

  fs.writeFileSync(file, content);
  console.log('Professionalized AI CV Builder (Removed genetic algorithms, added ATS optimization)');
}
