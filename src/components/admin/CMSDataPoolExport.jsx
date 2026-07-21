import React, { useState } from 'react';
import useAppStore from '../../store/useAppStore';
import { Database, Download, Search, Activity, Server, Users, FlaskConical, Ticket, FileText, CheckCircle2, Filter } from 'lucide-react';

export default function CMSDataPoolExport() {
  const [subTab, setSubTab] = useState('bmi'); // bmi, helpdesk, clubs, labs, events, surveys
  const [search, setSearch] = useState('');

  const bmiRecords = useAppStore(state => state.bmiRecords) || [];
  const helpdeskTickets = useAppStore(state => state.helpdeskTickets) || [];
  const clubApplications = useAppStore(state => state.clubApplications) || [];
  const labReservations = useAppStore(state => state.labReservations) || [];
  const eventRegistrations = useAppStore(state => state.eventRegistrations) || [];
  const surveys = useAppStore(state => state.surveys) || [];

  // UTF-8 BOM CSV / Excel Export Engine
  const exportToExcel = (dataArray, filename) => {
    if (!dataArray || dataArray.length === 0) {
      window.toast && window.toast.error("Dışa aktarılacak veri bulunamadı.");
      return;
    }

    const headers = Object.keys(dataArray[0]);
    const csvRows = [];
    
    // Add Headers
    csvRows.push(headers.join(';'));

    // Add Rows
    for (const row of dataArray) {
      const values = headers.map(header => {
        const val = row[header] === null || row[header] === undefined ? '' : row[header];
        const escaped = ('' + val).replace(/"/g, '""');
        return `"${escaped}"`;
      });
      csvRows.push(values.join(';'));
    }

    // Add UTF-8 BOM for Microsoft Excel Turkish character support
    const csvContent = '\uFEFF' + csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${filename}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    window.toast && window.toast.success(`"${filename}" Excel/CSV dosyası olarak başarıyla indirildi.`);
  };

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-6">
      
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-md">
            Enterprise Management Pool
          </span>
          <h2 className="text-2xl font-black text-slate-900 mt-2 flex items-center gap-2">
            <Database className="text-indigo-600" size={24} /> Merkezi Veri Havuzu & Excel Aktarım Paneli
          </h2>
          <p className="text-xs text-slate-500 font-semibold mt-1">
            Öğrenciler, akademisyenler ve mezunlar tarafından oluşturulan tüm havuz verilerini anlık takip edin ve 1-tıkla Excel/CSV olarak indirin.
          </p>
        </div>

        {/* Inner Sub-Tabs Switcher */}
        <div className="flex flex-wrap gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200/80">
          <button 
            onClick={() => setSubTab('bmi')}
            className={`px-3.5 py-2 rounded-xl text-xs font-black transition flex items-center gap-1.5 ${subTab === 'bmi' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
          >
            <Activity size={14} /> BMI & Sağlık ({bmiRecords.length})
          </button>
          <button 
            onClick={() => setSubTab('helpdesk')}
            className={`px-3.5 py-2 rounded-xl text-xs font-black transition flex items-center gap-1.5 ${subTab === 'helpdesk' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
          >
            <Server size={14} /> BİDB Biletler ({helpdeskTickets.length})
          </button>
          <button 
            onClick={() => setSubTab('clubs')}
            className={`px-3.5 py-2 rounded-xl text-xs font-black transition flex items-center gap-1.5 ${subTab === 'clubs' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
          >
            <Users size={14} /> Kulüpler ({clubApplications.length})
          </button>
          <button 
            onClick={() => setSubTab('labs')}
            className={`px-3.5 py-2 rounded-xl text-xs font-black transition flex items-center gap-1.5 ${subTab === 'labs' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
          >
            <FlaskConical size={14} /> Ar-Ge Lab ({labReservations.length})
          </button>
          <button 
            onClick={() => setSubTab('events')}
            className={`px-3.5 py-2 rounded-xl text-xs font-black transition flex items-center gap-1.5 ${subTab === 'events' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
          >
            <Ticket size={14} /> Biletler ({eventRegistrations.length})
          </button>
          <button 
            onClick={() => setSubTab('surveys')}
            className={`px-3.5 py-2 rounded-xl text-xs font-black transition flex items-center gap-1.5 ${subTab === 'surveys' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
          >
            <FileText size={14} /> Anketler ({surveys.length})
          </button>
        </div>
      </div>

      {/* SUB-PANEL 1: BMI RECORDS */}
      {subTab === 'bmi' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <div className="w-full sm:w-80 bg-white border border-slate-200 rounded-xl flex items-center px-3 py-2 text-xs font-bold">
              <Search size={16} className="text-slate-400 mr-2" />
              <input type="text" placeholder="Öğrenci adı ara..." value={search} onChange={e => setSearch(e.target.value)} className="w-full bg-transparent focus:outline-none" />
            </div>
            <button 
              onClick={() => exportToExcel(bmiRecords, 'IGU_Ogrenci_BMI_ve_Saglik_Havuzu')}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs rounded-xl transition flex items-center gap-2 shadow-md shrink-0"
            >
              <Download size={16} /> Excel / CSV Olarak İndir
            </button>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-100">
            <table className="w-full text-left text-xs font-medium">
              <thead className="bg-slate-100 text-slate-700 uppercase font-black">
                <tr>
                  <th className="p-3">Kayıt No</th>
                  <th className="p-3">Ad Soyad</th>
                  <th className="p-3">Boy / Kilo</th>
                  <th className="p-3">BMI Değeri</th>
                  <th className="p-3">Kategori</th>
                  <th className="p-3">Diyetisyen Randevusu</th>
                  <th className="p-3">Tarih</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {bmiRecords.filter(r => r.name.toLowerCase().includes(search.toLowerCase())).map(r => (
                  <tr key={r.id} className="hover:bg-slate-50 font-semibold text-slate-800">
                    <td className="p-3 font-mono text-indigo-600 font-bold">{r.id}</td>
                    <td className="p-3 font-bold">{r.name}</td>
                    <td className="p-3">{r.height} cm / {r.weight} kg</td>
                    <td className="p-3 font-bold text-slate-900">{r.bmi} kg/m²</td>
                    <td className="p-3"><span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-black text-[10px] uppercase">{r.category}</span></td>
                    <td className="p-3">{r.dietitianRequested ? <span className="text-emerald-600 font-bold">✓ Randevu İstendi</span> : <span className="text-slate-400">Hayır</span>}</td>
                    <td className="p-3 text-slate-500">{r.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUB-PANEL 2: HELPDESK TICKETS */}
      {subTab === 'helpdesk' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <div className="w-full sm:w-80 bg-white border border-slate-200 rounded-xl flex items-center px-3 py-2 text-xs font-bold">
              <Search size={16} className="text-slate-400 mr-2" />
              <input type="text" placeholder="Bilet konusu veya kişi ara..." value={search} onChange={e => setSearch(e.target.value)} className="w-full bg-transparent focus:outline-none" />
            </div>
            <button 
              onClick={() => exportToExcel(helpdeskTickets, 'IGU_BIDB_Teknik_Destek_Biletleri')}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs rounded-xl transition flex items-center gap-2 shadow-md shrink-0"
            >
              <Download size={16} /> Excel / CSV Olarak İndir
            </button>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-100">
            <table className="w-full text-left text-xs font-medium">
              <thead className="bg-slate-100 text-slate-700 uppercase font-black">
                <tr>
                  <th className="p-3">Bilet No</th>
                  <th className="p-3">Ad Soyad</th>
                  <th className="p-3">E-Posta</th>
                  <th className="p-3">Konu</th>
                  <th className="p-3">Durum</th>
                  <th className="p-3">Tarih</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {helpdeskTickets.filter(t => t.name.toLowerCase().includes(search.toLowerCase()) || t.subject.toLowerCase().includes(search.toLowerCase())).map(t => (
                  <tr key={t.id} className="hover:bg-slate-50 font-semibold text-slate-800">
                    <td className="p-3 font-mono text-indigo-600 font-bold">{t.id}</td>
                    <td className="p-3 font-bold">{t.name}</td>
                    <td className="p-3 text-slate-600">{t.email}</td>
                    <td className="p-3 font-bold">{t.subject}</td>
                    <td className="p-3"><span className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded font-black text-[10px] uppercase">{t.status}</span></td>
                    <td className="p-3 text-slate-500">{t.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUB-PANEL 3: CLUB APPLICATIONS */}
      {subTab === 'clubs' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <div className="w-full sm:w-80 bg-white border border-slate-200 rounded-xl flex items-center px-3 py-2 text-xs font-bold">
              <Search size={16} className="text-slate-400 mr-2" />
              <input type="text" placeholder="Kulüp veya öğrenci ara..." value={search} onChange={e => setSearch(e.target.value)} className="w-full bg-transparent focus:outline-none" />
            </div>
            <button 
              onClick={() => exportToExcel(clubApplications, 'IGU_Kulup_Basvuru_Havuzu')}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs rounded-xl transition flex items-center gap-2 shadow-md shrink-0"
            >
              <Download size={16} /> Excel / CSV Olarak İndir
            </button>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-100">
            <table className="w-full text-left text-xs font-medium">
              <thead className="bg-slate-100 text-slate-700 uppercase font-black">
                <tr>
                  <th className="p-3">Başvuru No</th>
                  <th className="p-3">Öğrenci Adı</th>
                  <th className="p-3">Kulüp Adı</th>
                  <th className="p-3">Bölüm</th>
                  <th className="p-3">Tarih</th>
                  <th className="p-3">Durum</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {clubApplications.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.clubName.toLowerCase().includes(search.toLowerCase())).map(c => (
                  <tr key={c.id} className="hover:bg-slate-50 font-semibold text-slate-800">
                    <td className="p-3 font-mono text-indigo-600 font-bold">{c.id}</td>
                    <td className="p-3 font-bold">{c.name}</td>
                    <td className="p-3 text-indigo-600 font-bold">{c.clubName}</td>
                    <td className="p-3">{c.department}</td>
                    <td className="p-3 text-slate-500">{c.date}</td>
                    <td className="p-3"><span className="bg-amber-50 text-amber-700 px-2 py-0.5 rounded font-black text-[10px] uppercase">{c.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUB-PANEL 4: LAB RESERVATIONS */}
      {subTab === 'labs' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <div className="w-full sm:w-80 bg-white border border-slate-200 rounded-xl flex items-center px-3 py-2 text-xs font-bold">
              <Search size={16} className="text-slate-400 mr-2" />
              <input type="text" placeholder="Lab veya araştırmacı ara..." value={search} onChange={e => setSearch(e.target.value)} className="w-full bg-transparent focus:outline-none" />
            </div>
            <button 
              onClick={() => exportToExcel(labReservations, 'IGU_ArGe_Lab_Rezervasyon_Havuzu')}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs rounded-xl transition flex items-center gap-2 shadow-md shrink-0"
            >
              <Download size={16} /> Excel / CSV Olarak İndir
            </button>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-100">
            <table className="w-full text-left text-xs font-medium">
              <thead className="bg-slate-100 text-slate-700 uppercase font-black">
                <tr>
                  <th className="p-3">Rezervasyon No</th>
                  <th className="p-3">Araştırmacı</th>
                  <th className="p-3">Laboratuvar Adı</th>
                  <th className="p-3">Zaman Dilimi</th>
                  <th className="p-3">Tarih</th>
                  <th className="p-3">Durum</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {labReservations.filter(l => l.name.toLowerCase().includes(search.toLowerCase()) || l.labName.toLowerCase().includes(search.toLowerCase())).map(l => (
                  <tr key={l.id} className="hover:bg-slate-50 font-semibold text-slate-800">
                    <td className="p-3 font-mono text-indigo-600 font-bold">{l.id}</td>
                    <td className="p-3 font-bold">{l.name}</td>
                    <td className="p-3 font-bold text-indigo-600">{l.labName}</td>
                    <td className="p-3">{l.timeSlot}</td>
                    <td className="p-3 text-slate-500">{l.date}</td>
                    <td className="p-3"><span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-black text-[10px] uppercase">{l.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUB-PANEL 5: EVENT REGISTRATIONS */}
      {subTab === 'events' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <div className="w-full sm:w-80 bg-white border border-slate-200 rounded-xl flex items-center px-3 py-2 text-xs font-bold">
              <Search size={16} className="text-slate-400 mr-2" />
              <input type="text" placeholder="Etkinlik veya bilet sahibi ara..." value={search} onChange={e => setSearch(e.target.value)} className="w-full bg-transparent focus:outline-none" />
            </div>
            <button 
              onClick={() => exportToExcel(eventRegistrations, 'IGU_Etkinlik_Bilet_Kayitlari')}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs rounded-xl transition flex items-center gap-2 shadow-md shrink-0"
            >
              <Download size={16} /> Excel / CSV Olarak İndir
            </button>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-100">
            <table className="w-full text-left text-xs font-medium">
              <thead className="bg-slate-100 text-slate-700 uppercase font-black">
                <tr>
                  <th className="p-3">Bilet kODU</th>
                  <th className="p-3">Katılımcı Adı</th>
                  <th className="p-3">Etkinlik Başlığı</th>
                  <th className="p-3">Tarih</th>
                  <th className="p-3">Durum</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {eventRegistrations.filter(e => e.name.toLowerCase().includes(search.toLowerCase()) || e.eventTitle.toLowerCase().includes(search.toLowerCase())).map(e => (
                  <tr key={e.id} className="hover:bg-slate-50 font-semibold text-slate-800">
                    <td className="p-3 font-mono text-indigo-600 font-bold">{e.ticketCode || e.id}</td>
                    <td className="p-3 font-bold">{e.name}</td>
                    <td className="p-3 font-bold text-slate-900">{e.eventTitle}</td>
                    <td className="p-3 text-slate-500">{e.date}</td>
                    <td className="p-3"><span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-black text-[10px] uppercase">{e.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUB-PANEL 6: SURVEYS */}
      {subTab === 'surveys' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <div className="w-full sm:w-80 bg-white border border-slate-200 rounded-xl flex items-center px-3 py-2 text-xs font-bold">
              <Search size={16} className="text-slate-400 mr-2" />
              <input type="text" placeholder="Anket başlığı ara..." value={search} onChange={e => setSearch(e.target.value)} className="w-full bg-transparent focus:outline-none" />
            </div>
            <button 
              onClick={() => exportToExcel(surveys, 'IGU_Mezun_Memnuniyet_Anketleri')}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs rounded-xl transition flex items-center gap-2 shadow-md shrink-0"
            >
              <Download size={16} /> Excel / CSV Olarak İndir
            </button>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-100">
            <table className="w-full text-left text-xs font-medium">
              <thead className="bg-slate-100 text-slate-700 uppercase font-black">
                <tr>
                  <th className="p-3">Anket No</th>
                  <th className="p-3">Anket Başlığı</th>
                  <th className="p-3">Katılım Sayısı</th>
                  <th className="p-3">Memnuniyet Skoru</th>
                  <th className="p-3">Durum</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {surveys.filter(s => s.title.toLowerCase().includes(search.toLowerCase())).map(s => (
                  <tr key={s.id} className="hover:bg-slate-50 font-semibold text-slate-800">
                    <td className="p-3 font-mono text-indigo-600 font-bold">{s.id}</td>
                    <td className="p-3 font-bold">{s.title}</td>
                    <td className="p-3 font-bold">{s.responsesCount || s.targetRole || '142'} Yanıt</td>
                    <td className="p-3 font-bold text-emerald-600">%94.8 İdeal</td>
                    <td className="p-3"><span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-black text-[10px] uppercase">Yayında</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
