
import React from 'react';
import Logo from './Logo';

interface AboutUsProps {
  t: any;
  lang: string;
}

const AboutUs: React.FC<AboutUsProps> = ({ t, lang }) => {
  return (
    <div className="min-h-screen bg-white pb-20 overflow-x-hidden text-slate-900">
      {/* 1. Hero Section */}
      <section className="relative py-16 sm:py-24 px-4 sm:px-6 bg-slate-50 border-b border-slate-100 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#E31E24]/5 -skew-x-12 translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <Logo className="h-20 w-20 sm:h-28 sm:w-28 mx-auto mb-8 sm:mb-10 animate-in fade-in zoom-in duration-1000" />
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black text-slate-900 uppercase tracking-tighter mb-6 sm:mb-8 leading-[0.85] hmi-title">
            {t.aboutTitle}
          </h1>
          <div className="w-24 sm:w-32 h-2 bg-[#E31E24] mx-auto rounded-full mb-8 sm:mb-10"></div>
          <p className="text-xl sm:text-3xl text-slate-900 font-black leading-tight max-w-4xl mx-auto mb-4 sm:mb-6">
            {t.aboutSubtitle}
          </p>
          <p className="text-base sm:text-xl text-slate-500 font-medium leading-relaxed max-w-3xl mx-auto px-2">
            {t.aboutIntroText}
          </p>
        </div>
      </section>

      {/* 2. Mission Section */}
      <section className="py-20 sm:py-32 px-4 sm:px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-[10px] sm:text-xs font-black text-[#E31E24] uppercase tracking-[0.3em] mb-4 block">
            {t.aboutMissionTitle}
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 uppercase tracking-tighter mb-8 sm:mb-12 hmi-title">
            {t.aboutMissionTitle}
          </h2>
          <p className="text-xl sm:text-3xl text-slate-600 font-medium leading-relaxed">
            {t.aboutMissionText}
          </p>
        </div>
      </section>

      {/* 3. Pillars Section (What We Do) */}
      <section className="py-20 sm:py-32 px-4 sm:px-6 bg-slate-50 border-y border-slate-100 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 sm:mb-24">
            <h2 className="text-4xl sm:text-5xl font-black text-slate-900 uppercase tracking-tighter mb-6 hmi-title">
              {t.aboutWhatWeDoTitle}
            </h2>
            <p className="text-slate-500 text-lg sm:text-xl max-w-3xl mx-auto font-medium">
              {t.aboutWhatWeDoDesc}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
            {[
              { id: 'Festivent', icon: 'fa-music', color: 'bg-purple-500', key: 'festivent' },
              { id: 'Sports', icon: 'fa-trophy', color: 'bg-red-500', key: 'sports' },
              { id: 'Dining', icon: 'fa-utensils', color: 'bg-emerald-500', key: 'dining' },
              { id: 'Career', icon: 'fa-briefcase', color: 'bg-slate-600', key: 'career' }
            ].map((cat) => (
              <div key={cat.id} className="bg-white border border-slate-100 p-10 sm:p-12 rounded-[3rem] hover:shadow-2xl transition-all group">
                <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-[1.5rem] ${cat.color} flex items-center justify-center text-2xl sm:text-3xl mb-10 shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all text-white`}>
                  <i className={`fa-solid ${cat.icon}`}></i>
                </div>
                <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tighter mb-3">{t[cat.key]}</h3>
                <p className="text-slate-500 text-sm sm:text-base font-medium leading-relaxed">{t[`${cat.key}Desc`]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Founders & Behind the Scenes - LAST */}
      <section className="py-24 sm:py-40 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <span className="text-[10px] sm:text-xs font-black text-[#E31E24] uppercase tracking-[0.4em] mb-4 block">
            {t.aboutChampionsTitle}
          </span>
          <h2 className="text-4xl sm:text-6xl font-black text-slate-900 uppercase tracking-tighter mb-6 hmi-title">
            {t.aboutFoundersTitle}
          </h2>
          <p className="text-slate-400 text-sm sm:text-lg font-medium mb-20 sm:mb-28 max-w-2xl mx-auto">
            {t.aboutChampionsText}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 sm:gap-24 max-w-5xl mx-auto">
            {/* Founder 1: Ankit Bhattacharjee */}
            <div className="group flex flex-col items-center p-12 rounded-[3rem] bg-slate-50 hover:bg-white border border-slate-100 hover:border-[#E31E24] hover:shadow-2xl transition-all duration-500">
              <div className="w-20 h-20 rounded-2xl bg-slate-900 flex items-center justify-center text-white mb-8 group-hover:bg-[#E31E24] transition-colors shadow-xl group-hover:rotate-12 group-hover:scale-110 transition-all duration-500">
                <i className="fa-solid fa-user-tie text-2xl"></i>
              </div>
              <h4 className="text-3xl sm:text-5xl font-black text-slate-900 uppercase tracking-tighter mb-2 hmi-title text-center">
                Ankit Bhattacharjee
              </h4>
              <p className="text-[#E31E24] font-black uppercase tracking-[0.5em] text-[10px] sm:text-xs mb-8">
                {t.founderRole}
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-12 h-12 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-[#E31E24] hover:border-[#E31E24] transition-all shadow-sm">
                  <i className="fa-brands fa-linkedin-in"></i>
                </a>
                <a href="#" className="w-12 h-12 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-[#E31E24] hover:border-[#E31E24] transition-all shadow-sm">
                  <i className="fa-solid fa-envelope"></i>
                </a>
              </div>
            </div>

            {/* Founder 2: Shiva Sai Ram Reddy Pallolu */}
            <div className="group flex flex-col items-center p-12 rounded-[3rem] bg-slate-50 hover:bg-white border border-slate-100 hover:border-[#E31E24] hover:shadow-2xl transition-all duration-500">
              <div className="w-20 h-20 rounded-2xl bg-slate-900 flex items-center justify-center text-white mb-8 group-hover:bg-[#E31E24] transition-colors shadow-xl group-hover:-rotate-12 group-hover:scale-110 transition-all duration-500">
                <i className="fa-solid fa-user-tie text-2xl"></i>
              </div>
              <h4 className="text-3xl sm:text-5xl font-black text-slate-900 uppercase tracking-tighter mb-2 hmi-title text-center">
                Shiva Sai Ram Reddy Pallolu
              </h4>
              <p className="text-[#E31E24] font-black uppercase tracking-[0.5em] text-[10px] sm:text-xs mb-8">
                {t.founderRole}
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-12 h-12 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-[#E31E24] hover:border-[#E31E24] transition-all shadow-sm">
                  <i className="fa-brands fa-linkedin-in"></i>
                </a>
                <a href="#" className="w-12 h-12 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-[#E31E24] hover:border-[#E31E24] transition-all shadow-sm">
                  <i className="fa-solid fa-envelope"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
