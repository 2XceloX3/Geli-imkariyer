import React, { useState } from 'react';
import { ChevronLeft, Calendar, MapPin, Clock, Ticket, CheckCircle2 } from 'lucide-react';
import TopProfileMenu from './TopProfileMenu';
import eventsData from '../data/knowledge_base/announcements_media.json';

export default function EventsPage({ setView, currentUser, userRole, setSelectedUserId }) {
  const [tickets, setTickets] = useState([]);

  const handleRegister = (eventId, eventTitle) => {
    if (!tickets.includes(eventId)) {
      setTickets([...tickets, eventId]);
      window.toast && window.toast.success(`"${eventTitle}" etkinliği için kaydınız oluşturuldu.`);
    }
  };

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
            <Calendar className="text-indigo-600" size={24} />
            <h1 className="font-black text-slate-900 tracking-tight">Etkinliklerimiz</h1>
          </div>
        </div>
        <TopProfileMenu currentUser={currentUser} userRole={userRole} setView={setView} setSelectedUserId={setSelectedUserId} />
      </header>

      <main className="flex-1 w-full max-w-[1100px] mx-auto p-4 lg:p-8 flex flex-col gap-6">
        <div className="border-b border-slate-200 pb-4">
          <h2 className="text-2xl font-black text-slate-900">Güncel Kampüs Etkinlikleri</h2>
          <p className="text-xs text-slate-500 font-semibold mt-1">Konferanslar, hackathonlar, akademik paneller ve sosyal şenlikler.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {eventsData.events.map(evt => {
            const isRegistered = tickets.includes(evt.id);
            return (
              <div key={evt.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition">
                <div>
                  <span className="text-[10px] font-black uppercase text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md mb-3 inline-block">Kampüs Etkinliği</span>
                  <h3 className="text-base font-black text-slate-900 mb-3">{evt.title}</h3>
                  <div className="space-y-2 text-xs font-semibold text-slate-500 mb-6">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-indigo-600" /> {evt.date}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={14} className="text-indigo-600" /> Saat: {evt.time}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="text-indigo-600" /> {evt.location}
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => handleRegister(evt.id, evt.title)}
                  className={`w-full py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition flex items-center justify-center gap-2 ${isRegistered ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-indigo-600 hover:bg-indigo-700 text-white'}`}
                >
                  {isRegistered ? <CheckCircle2 size={16} /> : <Ticket size={16} />}
                  {isRegistered ? 'Biletiniz Oluşturuldu' : 'Ücretsiz Bilet Al'}
                </button>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
