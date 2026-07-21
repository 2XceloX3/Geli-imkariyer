import React, { useState } from 'react';
import { Utensils, Flame, ThumbsUp, Star, ChevronLeft, Calendar } from 'lucide-react';
import TopProfileMenu from './TopProfileMenu';
import unitsData from '../data/knowledge_base/units_services.json';

export default function SKSDBLunchWidget({ setView, currentUser, userRole, setSelectedUserId }) {
  const menu = unitsData.sksdb.lunchMenu;
  const [likes, setLikes] = useState(142);
  const [hasVoted, setHasVoted] = useState(false);

  const handleVote = () => {
    if (!hasVoted) {
      setLikes(prev => prev + 1);
      setHasVoted(true);
      window.toast && window.toast.success("Günün menüsünü beğendiniz! Teşekkürler.");
    }
  };

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
            <Utensils className="text-indigo-600" size={24} />
            <h1 className="font-black text-slate-900 tracking-tight">SKSDB Yemekhane Menüsü</h1>
          </div>
        </div>
        <TopProfileMenu currentUser={currentUser} userRole={userRole} setView={setView} setSelectedUserId={setSelectedUserId} />
      </header>

      <main className="flex-1 w-full max-w-[1000px] mx-auto p-4 lg:p-8 flex flex-col gap-6">
        <div className="bg-slate-950 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl border border-slate-800">
          <div className="flex justify-between items-start mb-6">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400 bg-indigo-950/60 px-3 py-1 rounded-full border border-indigo-900/40">Günün Menüsü</span>
              <h2 className="text-2xl sm:text-3xl font-black mt-3 flex items-center gap-2">
                <Calendar size={24} className="text-indigo-400" /> {menu.date}
              </h2>
            </div>
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-4 py-2 rounded-2xl">
              <Star size={18} className="text-amber-400 fill-amber-400" />
              <span className="font-black text-sm">{menu.rating} / 5</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-slate-800 pt-6">
            <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800/80">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Ana Yemek & Çorba</span>
              <h3 className="font-black text-base text-slate-100">{menu.mainCourse}</h3>
            </div>
            <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800/80">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Yan Yemek</span>
              <h3 className="font-black text-base text-slate-100">{menu.sideCourse}</h3>
            </div>
            <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800/80">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Tatlı & İçecek</span>
              <h3 className="font-black text-base text-slate-100">{menu.dessert}</h3>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-slate-800 pt-6">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-amber-400 font-black text-sm">
                <Flame size={20} /> {menu.calories} kcal
              </div>
              <div className="text-emerald-400 font-black text-lg">
                Fiyat: {menu.price}
              </div>
            </div>

            <button 
              onClick={handleVote}
              className={`px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition flex items-center gap-2 ${hasVoted ? 'bg-emerald-600 text-white' : 'bg-indigo-600 hover:bg-indigo-700 text-white'}`}
            >
              <ThumbsUp size={16} /> {hasVoted ? 'Beğenildi' : 'Menüyü Beğen'} ({likes})
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
