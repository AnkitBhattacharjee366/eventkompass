
import React from 'react';

interface PressProps {
  t: any;
  lang: string;
}

const Press: React.FC<PressProps> = ({ t, lang }) => {
  return (
    <div className="min-h-[70vh] py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-black text-slate-900 uppercase tracking-tighter mb-8 text-center">{t.pressTitle}</h1>
        <div className="space-y-8">
          <div className="pb-8 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-400">{t.pressNews1Date}</span>
            <h3 className="text-2xl font-bold mt-2">{t.pressNews1Title}</h3>
            <p className="text-slate-500 mt-2">{t.pressNews1Desc}</p>
          </div>
          <div className="pb-8 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-400">{t.pressNews2Date}</span>
            <h3 className="text-2xl font-bold mt-2">{t.pressNews2Title}</h3>
            <p className="text-slate-500 mt-2">{t.pressNews2Desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Press;
