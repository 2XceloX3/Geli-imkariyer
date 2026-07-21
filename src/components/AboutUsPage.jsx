import React from 'react';
import { ChevronLeft, Award, Globe, Users, ShieldCheck, HeartHandshake, CheckCircle } from 'lucide-react';
import TopProfileMenu from './TopProfileMenu';
import corporateData from '../data/knowledge_base/corporate_hierarchy.json';

export default function AboutUsPage({ setView, currentUser, userRole, setSelectedUserId }) {
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
            <Award className="text-indigo-600" size={24} />
            <h1 className="font-black text-slate-900 tracking-tight">Hakkımızda</h1>
          </div>
        </div>
        <TopProfileMenu currentUser={currentUser} userRole={userRole} setView={setView} setSelectedUserId={setSelectedUserId} />
      </header>

      <main className="flex-1 w-full max-w-[1100px] mx-auto p-4 lg:p-8 flex flex-col gap-8">
        {/* Hero Section */}
        <div className="bg-slate-950 text-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-800 relative overflow-hidden">
          <div className="max-w-2xl relative z-10">
            <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400 bg-indigo-950/60 px-3.5 py-1.5 rounded-full border border-indigo-900/40">
              {corporateData.motto}
            </span>
            <h2 className="text-3xl md:text-4xl font-black mt-4 mb-4 tracking-tight leading-tight">
              {corporateData.university}
            </h2>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed font-semibold">
              Geleceğin dünyasını inşa eden, uluslararası vizyona sahip, öğrenci odaklı dinamik yükseköğretim kurumu.
            </p>
          </div>
        </div>

        {/* Vision & Mission Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-4">
                <Globe size={24} />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-3">Vizyonumuz</h3>
              <p className="text-slate-600 text-sm font-semibold leading-relaxed">
                {corporateData.vision}
              </p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-4">
                <HeartHandshake size={24} />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-3">Misyonumuz</h3>
              <p className="text-slate-600 text-sm font-semibold leading-relaxed">
                {corporateData.mission}
              </p>
            </div>
          </div>
        </div>

        {/* Administration Section */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
            <Users size={22} className="text-indigo-600" /> Üst Yönetim
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 text-center">
              <div className="w-16 h-16 bg-indigo-100 text-indigo-700 font-black rounded-full flex items-center justify-center mx-auto mb-3 text-lg">
                R
              </div>
              <h4 className="font-black text-slate-900 text-sm">{corporateData.administration.rector}</h4>
              <p className="text-xs text-indigo-600 font-bold mt-1">Rektör</p>
            </div>

            {corporateData.administration.viceRectors.map((vr, idx) => (
              <div key={idx} className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 text-center">
                <div className="w-16 h-16 bg-slate-200 text-slate-700 font-black rounded-full flex items-center justify-center mx-auto mb-3 text-lg">
                  RY
                </div>
                <h4 className="font-black text-slate-900 text-sm">{vr}</h4>
                <p className="text-xs text-slate-500 font-bold mt-1">Rektör Yardımcısı</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
