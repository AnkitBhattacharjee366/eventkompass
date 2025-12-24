
import React from 'react';

interface PressProps {
  t: any;
}

const Press: React.FC<PressProps> = ({ t }) => {
  return (
    <div className="min-h-[70vh] py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-black text-slate-900 uppercase tracking-tighter mb-8 text-center">{t.press}</h1>
        <div className="space-y-8">
          <div className="pb-8 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-400">12. MAI 2025</span>
            <h3 className="text-2xl font-bold mt-2">EventKompass knackt 1 Million Buchungen</h3>
            <p className="text-slate-500 mt-2">Innerhalb von nur sechs Monaten hat sich EventKompass zur am schnellsten wachsenden Event-Plattform in der DACH-Region entwickelt.</p>
          </div>
          <div className="pb-8 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-400">05. APRIL 2025</span>
            <h3 className="text-2xl font-bold mt-2">Neue KI-Features für personalisierte Event-Suche</h3>
            <p className="text-slate-500 mt-2">Durch die Integration modernster Sprachmodelle verstehen wir die Wünsche unserer Nutzer besser als je zuvor.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Press;
