
import React from 'react';

interface CareersProps {
  t: any;
}

const Careers: React.FC<CareersProps> = ({ t }) => {
  return (
    <div className="min-h-[70vh] py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-black text-slate-900 uppercase tracking-tighter mb-8">{t.careers}</h1>
        <p className="text-xl text-slate-500 mb-12">Gestalte die Zukunft der Event-Entdeckung mit uns. Wir suchen leidenschaftliche Talente für unser Team in Berlin und Darmstadt.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 hover:border-[#E31E24] transition-colors cursor-pointer group">
            <span className="text-[10px] font-black text-[#E31E24] uppercase tracking-widest mb-2 block">Engineering</span>
            <h3 className="text-xl font-bold mb-2">Senior Frontend Developer (React)</h3>
            <p className="text-slate-500 text-sm">Arbeite an unserer KI-gestützten Suchoberfläche.</p>
          </div>
          <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 hover:border-[#E31E24] transition-colors cursor-pointer group">
            <span className="text-[10px] font-black text-[#E31E24] uppercase tracking-widest mb-2 block">Marketing</span>
            <h3 className="text-xl font-bold mb-2">Growth Marketing Manager</h3>
            <p className="text-slate-500 text-sm">Skaliere EventKompass in neuen deutschen Regionen.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Careers;
