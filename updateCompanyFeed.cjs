const fs = require('fs');
let code = fs.readFileSync('src/components/CompanyFeed.jsx', 'utf8');

code = code.replace(/StudentFeed/g, 'CompanyFeed');
code = code.replace(/name: 'Öğrenci'/g, "name: 'Firma'");
code = code.replace(/background=10B981/g, 'background=2563EB');

const stateVars = `
  const featureCareerFair = useAppStore(state => state.featureCareerFair);
  const careerFairEvent = useAppStore(state => state.careerFairEvent);
  const careerFairFormTemplate = useAppStore(state => state.careerFairFormTemplate);
  const careerFairApplications = useAppStore(state => state.careerFairApplications);
  const setCareerFairApplications = useAppStore(state => state.setCareerFairApplications);

  const [showFairModal, setShowFairModal] = useState(false);
  const [fairForm, setFairForm] = useState({});

  const hasApplied = React.useMemo(() => {
    return careerFairApplications?.some(app => app.companyId === currentUser?.id);
  }, [careerFairApplications, currentUser]);

  const handleFairSubmit = (e) => {
    e.preventDefault();
    const newApp = {
      id: 'CFA-' + Math.random().toString(36).substr(2, 9),
      companyId: currentUser?.id || 'CMP-Unknown',
      companyName: currentUser?.name || 'Firma Adı',
      status: 'Beklemede',
      appliedAt: new Date().toISOString(),
      answers: fairForm
    };
    setCareerFairApplications([newApp, ...(careerFairApplications || [])]);
    setShowFairModal(false);
    if(window.toast) window.toast.success('Başvurunuz başarıyla alındı! İlgili birim dönüş yapacaktır.');
  };
`;

code = code.replace(/const \[activeTab, setActiveTab\] = useState\('feed'\);/, stateVars + '\n  const [activeTab, setActiveTab] = useState(\'feed\');');

const banner = `
            {featureCareerFair && careerFairEvent?.isActive && (
              <div className="bg-gradient-to-r from-blue-900 to-[#0A2342] rounded-3xl p-6 sm:p-8 mb-6 text-white shadow-xl relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-6 group">
                <div className="absolute right-0 top-0 opacity-10 pointer-events-none transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform duration-700">
                  <Calendar size={180} />
                </div>
                <div className="relative z-10">
                  <span className="bg-orange-500 text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md mb-3 inline-block animate-pulse">Yaklaşan Etkinlik</span>
                  <h2 className="text-2xl sm:text-3xl font-black mb-2">{careerFairEvent.title}</h2>
                  <p className="text-blue-100 text-sm mb-2 opacity-90 max-w-lg">{careerFairEvent.description}</p>
                  <div className="flex items-center gap-4 text-xs font-bold text-blue-200">
                    <span className="flex items-center gap-1.5"><Calendar size={14}/> {careerFairEvent.date}</span>
                    <span className="flex items-center gap-1.5"><MapPin size={14}/> İGÜ Kampüsü</span>
                  </div>
                </div>
                <div className="relative z-10 shrink-0">
                  {hasApplied ? (
                    <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl flex items-center gap-2 border border-white/20">
                      <CheckCircle2 size={20} className="text-emerald-400" />
                      <div className="text-left">
                        <div className="text-sm font-bold text-white leading-none">Başvurunuz Alındı</div>
                        <div className="text-[10px] text-blue-200 mt-1">Yönetici onayı bekleniyor</div>
                      </div>
                    </div>
                  ) : (
                    <button onClick={() => setShowFairModal(true)} className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 px-8 rounded-2xl transition-all shadow-[0_8px_20px_rgb(249,115,22,0.3)] hover:-translate-y-1 hover:shadow-[0_10px_25px_rgb(249,115,22,0.4)] flex items-center gap-2">
                      Hemen Başvur <ChevronRight size={18} />
                    </button>
                  )}
                </div>
              </div>
            )}
`;
code = code.replace(/<StoriesBar currentUser=\{currentUser\} stories=\{stories\} setStories=\{setStories\} \/>/, banner + '\n            <StoriesBar currentUser={currentUser} stories={stories} setStories={setStories} />');

const modal = `
      {showFairModal && (
        <div className="fixed inset-0 z-[70] bg-gray-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[2rem] w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative animate-scale-up">
            <button onClick={() => setShowFairModal(false)} className="absolute top-6 right-6 z-10 w-10 h-10 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full flex items-center justify-center transition-colors">
              <X size={20} />
            </button>
            
            <div className="w-full h-48 bg-gray-200 relative overflow-hidden">
              <img src={careerFairEvent?.banner} alt="Banner" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
              <div className="absolute bottom-6 left-8 right-8">
                <h2 className="text-3xl font-black text-white">{careerFairEvent?.title}</h2>
                <p className="text-blue-100 mt-1">{careerFairEvent?.date}</p>
              </div>
            </div>

            <div className="p-8">
              <p className="text-gray-600 font-medium mb-8 bg-blue-50/50 p-4 rounded-xl border border-blue-100">{careerFairEvent?.description}</p>
              
              <form onSubmit={handleFairSubmit} className="space-y-6">
                {(careerFairFormTemplate || []).map(field => (
                  <div key={field.id}>
                    <label className="block text-[14px] font-bold text-gray-900 mb-1.5">
                      {field.label} {field.required && <span className="text-red-500">*</span>}
                    </label>
                    {field.description && <p className="text-[12px] text-gray-500 mb-2 font-medium">{field.description}</p>}
                    
                    {field.type === 'text' && (
                      <input type="text" required={field.required} value={fairForm[field.id] || ''} onChange={e => setFairForm({...fairForm, [field.id]: e.target.value})} className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm" placeholder="Yanıtınız..." />
                    )}
                    
                    {field.type === 'textarea' && (
                      <textarea rows="3" required={field.required} value={fairForm[field.id] || ''} onChange={e => setFairForm({...fairForm, [field.id]: e.target.value})} className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm resize-none" placeholder="Detaylı yanıtınız..."></textarea>
                    )}
                    
                    {field.type === 'select' && (
                      <select required={field.required} value={fairForm[field.id] || ''} onChange={e => setFairForm({...fairForm, [field.id]: e.target.value})} className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm appearance-none">
                        <option value="">Lütfen seçiniz</option>
                        {(field.options || []).map((opt, i) => (
                          <option key={i} value={opt}>{opt}</option>
                        ))}
                      </select>
                    )}
                  </div>
                ))}
                
                <div className="pt-6 border-t border-gray-100 mt-8">
                  <button type="submit" className="w-full bg-[#0A2342] hover:bg-blue-900 text-white font-black py-4 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 flex items-center justify-center gap-2">
                    <Send size={20} /> Başvuruyu Tamamla ve Gönder
                  </button>
                  <p className="text-center text-xs text-gray-400 mt-4 font-medium">Başvurunuz kariyer merkezi yöneticileri tarafından incelendikten sonra size dönüş yapılacaktır.</p>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
`;
code = code.replace(/<\/div>\s*<\/div>\s*\{showShorts/g, '</div>\n      </div>\n' + modal + '\n      {showShorts');

fs.writeFileSync('src/components/CompanyFeed.jsx', code);
console.log('CompanyFeed updated successfully!');
