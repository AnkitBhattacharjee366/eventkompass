
import React from 'react';
import Logo from './Logo';

interface AboutUsProps {
  t: any;
}

const AboutUs: React.FC<AboutUsProps> = ({ t }) => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-24 px-4 bg-slate-50 border-b border-slate-100 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#E31E24]/5 -skew-x-12 translate-x-1/2"></div>
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <Logo className="h-28 w-28 mx-auto mb-10 animate-in fade-in zoom-in duration-1000" />
          <h1 className="text-6xl font-black text-slate-900 uppercase tracking-tighter mb-8 leading-none">
            {t.aboutTitle}
          </h1>
          <div className="w-32 h-2 bg-[#E31E24] mx-auto rounded-full mb-10"></div>
          <p className="text-3xl text-slate-900 font-black leading-tight max-w-4xl mx-auto mb-6">
            {t.aboutSubtitle}
          </p>
          <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-3xl mx-auto">
            {t.aboutIntroText}
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs font-black text-[#E31E24] uppercase tracking-[0.3em] mb-4 block">Our Mission</span>
          <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter mb-8">{t.aboutMissionTitle}</h2>
          <p className="text-2xl text-slate-600 font-medium leading-relaxed">
            {t.aboutMissionText}
          </p>
        </div>
      </section>

      {/* What We Do Grid */}
      <section className="py-24 px-4 bg-slate-950 text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="grid grid-cols-6 gap-4 transform -rotate-12 scale-150">
            {Array.from({length: 24}).map((_, i) => <div key={i} className="h-32 border border-white/20 rounded-3xl"></div>)}
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black uppercase tracking-tighter mb-4">{t.aboutWhatWeDoTitle}</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">{t.aboutWhatWeDoDesc}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { id: 'Festivent', icon: 'fa-music', color: 'from-purple-500 to-indigo-600', key: 'festivent' },
              { id: 'Sports', icon: 'fa-trophy', color: 'from-red-500 to-orange-600', key: 'sports' },
              { id: 'Dining', icon: 'fa-utensils', color: 'from-emerald-500 to-teal-600', key: 'dining' },
              { id: 'Career', icon: 'fa-briefcase', color: 'from-slate-600 to-slate-800', key: 'career' }
            ].map((cat) => (
              <div key={cat.id} className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-[2.5rem] hover:bg-white/10 transition-all group">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-2xl mb-6 shadow-xl`}>
                  <i className={`fa-solid ${cat.icon}`}></i>
                </div>
                <h3 className="text-xl font-black uppercase tracking-tighter mb-2">{t[cat.key]}</h3>
                <p className="text-slate-400 text-sm font-medium leading-relaxed">{t[`${cat.key}Desc`]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Different & Promise */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter mb-10">{t.aboutDifferentTitle}</h2>
              <ul className="space-y-8">
                {[
                  { icon: 'fa-location-dot', text: t.aboutDifferentLoc },
                  { icon: 'fa-globe', text: t.aboutDifferentExplore },
                  { icon: 'fa-layer-group', text: t.aboutDifferentLifestyles },
                  { icon: 'fa-bolt', text: t.aboutDifferentQuick }
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <div className="w-10 h-10 rounded-xl bg-red-50 text-[#E31E24] flex items-center justify-center mr-6 flex-shrink-0 mt-1">
                      <i className={`fa-solid ${item.icon}`}></i>
                    </div>
                    <p className="text-lg text-slate-600 font-medium leading-snug">{item.text}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-slate-900 rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute bottom-0 right-0 w-48 h-48 bg-[#E31E24] opacity-20 blur-3xl -mr-10 -mb-10 group-hover:scale-125 transition-transform duration-1000"></div>
              <h2 className="text-3xl font-black uppercase tracking-tighter mb-6 relative z-10">{t.aboutPromiseTitle}</h2>
              <p className="text-xl text-slate-300 font-medium leading-relaxed mb-8 relative z-10">
                {t.aboutPromiseText}
              </p>
              <div className="w-16 h-1 bg-[#E31E24] rounded-full relative z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Champions / Founders Section */}
      <section className="py-24 px-4 bg-slate-50 border-y border-slate-100">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter mb-8">{t.aboutChampionsTitle}</h2>
          <p className="text-xl text-slate-500 font-medium max-w-4xl mx-auto mb-20">
            {t.aboutChampionsText}
          </p>
          
          <h3 className="text-xs font-black text-[#E31E24] uppercase tracking-[0.4em] mb-12">{t.aboutFoundersTitle}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {/* Founder 1 */}
            <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100 hover:-translate-y-2 transition-transform duration-500 group">
              <div className="w-24 h-24 rounded-full bg-slate-100 mx-auto mb-6 flex items-center justify-center text-slate-300 overflow-hidden border-4 border-white shadow-inner group-hover:border-[#E31E24] transition-all">
                <i className="fa-solid fa-user-tie text-5xl mt-4"></i>
              </div>
              <h4 className="text-2xl font-black text-slate-900 uppercase tracking-tighter mb-1">Ankit Bhattacharjee</h4>
              <p className="text-[#E31E24] font-black uppercase tracking-widest text-[10px]">{t.founderRole}</p>
            </div>
            
            {/* Founder 2 */}
            <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100 hover:-translate-y-2 transition-transform duration-500 group">
              <div className="w-24 h-24 rounded-full bg-slate-100 mx-auto mb-6 flex items-center justify-center text-slate-300 overflow-hidden border-4 border-white shadow-inner group-hover:border-[#E31E24] transition-all">
                <i className="fa-solid fa-user-tie text-5xl mt-4"></i>
              </div>
              <h4 className="text-2xl font-black text-slate-900 uppercase tracking-tighter mb-1">Shiva Sai Ram Reddy Pallolu</h4>
              <p className="text-[#E31E24] font-black uppercase tracking-widest text-[10px]">{t.founderRole}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action footer area */}
      <section className="py-20 px-4 text-center">
        <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">EventKompass GmbH © 2025</p>
        <p className="text-slate-300 font-medium text-sm mt-2">Find your next plan. Follow your interests. Let EventKompass lead the way.</p>
      </section>
    </div>
  );
};

export default AboutUs;
