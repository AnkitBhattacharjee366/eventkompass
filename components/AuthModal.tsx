
import React, { useState } from 'react';
import { User } from '../types';
import Logo from './Logo';

interface AuthModalProps {
  t: any;
  onClose: () => void;
  onSuccess: (user: User) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ t, onClose, onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [regSuccessData, setRegSuccessData] = useState<{ id: string; pass: string; email: string; name: string } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (isLogin) {
        // Simple mock login
        onSuccess({
          id: email.startsWith("EK-") ? email : "EK-98231",
          name: name || "Gast",
          email: email.includes("@") ? email : "user@eventkompass.de",
          location: "Darmstadt"
        });
      } else {
        // Mock Registration
        const generatedId = `EK-${Math.floor(10000 + Math.random() * 90000)}`;
        setRegSuccessData({
          id: generatedId,
          pass: password,
          email: email,
          name: name
        });
        setLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md" onClick={onClose}></div>
      <div className="relative bg-white w-full max-w-md rounded-[3rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-400 hover:text-[#E31E24] hover:bg-red-50 transition-all z-20"
          aria-label="Close"
        >
          <i className="fa-solid fa-xmark text-lg"></i>
        </button>

        <div className="bg-slate-50 border-b border-slate-100 p-10 text-center">
          <Logo className="h-16 w-16 mx-auto mb-6" />
          <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter leading-tight">
            {regSuccessData ? "Willkommen!" : t.authModalTitle}
          </h2>
          <p className="text-slate-500 text-sm mt-2 px-4">
            {regSuccessData ? "Deine Reise beginnt hier." : t.authModalDesc}
          </p>
        </div>

        <div className="p-10">
          {regSuccessData ? (
            <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
              <div className="p-8 bg-white rounded-3xl border border-slate-200 shadow-inner">
                <div className="flex items-center space-x-4 mb-6 pb-6 border-b border-slate-100">
                  <div className="w-12 h-12 rounded-full bg-[#E31E24]/10 text-[#E31E24] flex items-center justify-center">
                    <i className="fa-solid fa-envelope-open-text"></i>
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">E-Mail von EventKompass</p>
                    <p className="text-xs font-bold text-slate-700">Betreff: Herzlich Willkommen, {regSuccessData.name}!</p>
                  </div>
                </div>
                
                <div className="text-sm text-slate-600 leading-relaxed mb-6">
                  <p className="mb-4">Hallo {regSuccessData.name},</p>
                  <p className="mb-4">{t.registrationSuccess}</p>
                  <p className="mb-6">Hier sind deine Zugangsdaten für dein neues Konto:</p>
                  
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t.loginId}:</span>
                      <span className="font-mono font-black text-[#E31E24]">{regSuccessData.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t.password}:</span>
                      <span className="font-mono font-black text-slate-800">{regSuccessData.pass}</span>
                    </div>
                  </div>
                  
                  <p className="mt-6 text-xs text-slate-400 italic text-center">Wir freuen uns darauf, dich bei deinem nächsten Event zu sehen!</p>
                </div>
              </div>

              <button 
                onClick={() => {
                  setIsLogin(true);
                  setEmail(regSuccessData.id);
                  setRegSuccessData(null);
                }}
                className="w-full py-4 bg-slate-900 text-white font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-slate-800 transition-all shadow-xl text-xs"
              >
                Jetzt einloggen
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {!isLogin && (
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">{t.fullName}</label>
                  <div className="relative">
                    <i className="fa-solid fa-user absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"></i>
                    <input 
                      type="text" 
                      required 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-[#E31E24] focus:bg-white transition-all font-medium text-slate-800"
                      placeholder="Max Mustermann"
                    />
                  </div>
                </div>
              )}
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">{isLogin ? t.loginId : t.email}</label>
                <div className="relative">
                  <i className={`fa-solid ${isLogin ? 'fa-id-badge' : 'fa-envelope'} absolute left-4 top-1/2 -translate-y-1/2 text-slate-300`}></i>
                  <input 
                    type={isLogin ? "text" : "email"} 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-[#E31E24] focus:bg-white transition-all font-medium text-slate-800"
                    placeholder={isLogin ? "EK-XXXXX" : "ihre@email.de"}
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">{t.password}</label>
                <div className="relative">
                  <i className="fa-solid fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"></i>
                  <input 
                    type="password" 
                    required 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-[#E31E24] focus:bg-white transition-all font-medium text-slate-800"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-[#E31E24] text-white font-black py-5 rounded-2xl shadow-xl hover:bg-[#c41a1f] transition-all active:scale-[0.97] disabled:opacity-50 uppercase tracking-[0.2em] text-xs shadow-red-500/20"
              >
                {loading ? <i className="fa-solid fa-circle-notch animate-spin text-lg"></i> : (isLogin ? t.login : t.register)}
              </button>
            </form>
          )}

          {!regSuccessData && (
            <div className="mt-10 pt-8 border-t border-slate-100 text-center">
              <p className="text-slate-400 text-sm font-medium">
                {isLogin ? "Noch kein Konto?" : "Bereits ein Konto?"}
                <button 
                  onClick={() => setIsLogin(!isLogin)}
                  className="ml-2 text-[#E31E24] font-black hover:underline uppercase tracking-widest text-[11px]"
                >
                  {isLogin ? t.register : t.login}
                </button>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
