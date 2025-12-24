
import React, { useState } from 'react';

interface GrievancesProps {
  t: any;
}

const Grievances: React.FC<GrievancesProps> = ({ t }) => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-[70vh] py-20 px-4 bg-slate-50">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100">
          <div className="bg-slate-900 p-12 text-center text-white">
            <div className="w-20 h-20 rounded-3xl bg-[#E31E24] flex items-center justify-center text-3xl mx-auto mb-6 shadow-xl">
              <i className="fa-solid fa-handshake-angle"></i>
            </div>
            <h1 className="text-4xl font-black uppercase tracking-tighter mb-4">{t.grievanceTitle}</h1>
            <p className="text-slate-400 font-medium max-w-lg mx-auto">{t.grievanceText}</p>
          </div>

          <div className="p-12">
            {submitted ? (
              <div className="text-center py-20 animate-in fade-in zoom-in">
                <div className="w-24 h-24 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-4xl mx-auto mb-8">
                  <i className="fa-solid fa-check"></i>
                </div>
                <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter mb-2">Vielen Dank!</h2>
                <p className="text-slate-500 font-medium">Ihre Nachricht wurde erfolgreich an unser Team übermittelt. Wir werden uns innerhalb von 24 Stunden bei Ihnen melden.</p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="mt-8 px-8 py-3 bg-slate-900 text-white rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-slate-800 transition-all"
                >
                  Neue Nachricht
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Name</label>
                    <input 
                      type="text" 
                      required 
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-[#E31E24] transition-all font-medium" 
                      placeholder="Ihr Name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">E-Mail</label>
                    <input 
                      type="email" 
                      required 
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-[#E31E24] transition-all font-medium" 
                      placeholder="ihre@email.de"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Betreff</label>
                  <select className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-[#E31E24] transition-all font-medium appearance-none">
                    <option>Buchungsproblem</option>
                    <option>Veranstalter-Feedback</option>
                    <option>Technische Störung</option>
                    <option>Sonstiges</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Nachricht</label>
                  <textarea 
                    required 
                    rows={5}
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-[#E31E24] transition-all font-medium resize-none" 
                    placeholder="Wie können wir Ihnen helfen?"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="w-full py-5 bg-[#E31E24] text-white font-black uppercase tracking-[0.2em] rounded-2xl shadow-xl hover:bg-[#c41a1f] transition-all active:scale-[0.98] shadow-red-500/20"
                >
                  {t.submit}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Grievances;
