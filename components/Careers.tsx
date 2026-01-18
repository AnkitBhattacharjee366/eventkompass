
import React from 'react';

interface CareersProps {
  t: any;
  lang: string;
}

const Careers: React.FC<CareersProps> = ({ t, lang }) => {
  return (
    <div className="min-h-[70vh] py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-black text-slate-900 uppercase tracking-tighter mb-8">{t.careersTitle}</h1>
        <p className="text-xl text-slate-500 mb-12">{t.careersSub}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 hover:border-[#E31E24] transition-colors cursor-pointer group">
            <span className="text-[10px] font-black text-[#E31E24] uppercase tracking-widest mb-2 block">{t.engineering}</span>
            <h3 className="text-xl font-bold mb-2">{t.job1Title}</h3>
            <p className="text-slate-500 text-sm">{t.job1Desc}</p>
          </div>
          <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 hover:border-[#E31E24] transition-colors cursor-pointer group">
            <span className="text-[10px] font-black text-[#E31E24] uppercase tracking-widest mb-2 block">{t.marketing}</span>
            <h3 className="text-xl font-bold mb-2">{t.job2Title}</h3>
            <p className="text-slate-500 text-sm">{t.job2Desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Careers;
