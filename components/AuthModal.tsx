
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
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [profileName, setProfileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate "Real-Life" Registration Process & Email Dispatch
    setTimeout(() => {
      if (isLogin) {
        onSuccess({ id: "EK-12345", name: fullName || "User", email, location: "Darmstadt" });
      } else {
        // Trigger Success UI state for Registration
        setShowSuccess(true);
        setLoading(false);
        // Automatically close after a few seconds or allow manual close
        setTimeout(() => {
           onSuccess({ id: "EK-" + Math.floor(Math.random() * 90000 + 10000), name: fullName, email, location: "Darmstadt" });
        }, 5000);
      }
    }, 2000);
  };

  if (showSuccess) {
    return (
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-6">
        <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-xl" onClick={onClose}></div>
        <div className="relative bg-white w-full max-w-lg rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in duration-500">
          <div className="p-16 text-center">
            <div className="w-24 h-24 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-4xl mx-auto mb-10 shadow-lg animate-bounce">
              <i className="fa-solid fa-paper-plane"></i>
            </div>
            <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter mb-6">{t.welcomeMailSent}</h2>
            <p className="text-slate-500 font-medium text-lg leading-relaxed mb-10">
              {t.welcomeMailDesc.replace('{email}', email)}
            </p>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-left mb-10">
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Credentials Preview</p>
               <div className="flex justify-between items-center mb-2">
                 <span className="text-xs font-bold text-slate-500 uppercase">Username:</span>
                 <span className="text-xs font-black text-slate-900">{profileName}</span>
               </div>
               <div className="flex justify-between items-center">
                 <span className="text-xs font-bold text-slate-500 uppercase">Password:</span>
                 <span className="text-xs font-black text-slate-900">••••••••</span>
               </div>
            </div>
            <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
               <div className="h-full bg-emerald-500 animate-[progress_5s_linear_forwards]"></div>
            </div>
            <style>{`
              @keyframes progress {
                from { width: 0%; }
                to { width: 100%; }
              }
            `}</style>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-md" onClick={onClose}></div>
      <div className="relative bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300">
        <div className="p-10 sm:p-14 text-center">
          <Logo className="h-12 w-12 mx-auto mb-8" />
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 uppercase tracking-tighter mb-4">{isLogin ? t.login : t.register}</h2>
          <p className="text-slate-400 text-sm font-medium mb-12">{isLogin ? t.authModalDesc : "Erstellen Sie Ihr Profil für exklusiven Zugang."}</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="text-left">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 block ml-4">{t.fullName}</label>
                  <div className="relative">
                    <i className="fa-solid fa-user absolute left-6 top-1/2 -translate-y-1/2 text-slate-300"></i>
                    <input 
                      type="text" 
                      required 
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full pl-14 pr-8 py-5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-[#E31E24] transition-all font-bold text-sm"
                      placeholder="John Doe"
                    />
                  </div>
                </div>
                <div className="text-left">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 block ml-4">{t.mobileNumber}</label>
                  <div className="relative">
                    <i className="fa-solid fa-phone absolute left-6 top-1/2 -translate-y-1/2 text-slate-300"></i>
                    <input 
                      type="tel" 
                      required 
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      className="w-full pl-14 pr-8 py-5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-[#E31E24] transition-all font-bold text-sm"
                      placeholder="+49 123 456789"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className={`grid grid-cols-1 ${!isLogin ? 'sm:grid-cols-2' : ''} gap-6`}>
              <div className="text-left">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 block ml-4">{t.email}</label>
                <div className="relative">
                  <i className="fa-solid fa-envelope absolute left-6 top-1/2 -translate-y-1/2 text-slate-300"></i>
                  <input 
                    type="email" 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-14 pr-8 py-5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-[#E31E24] transition-all font-bold text-sm"
                    placeholder="email@example.com"
                  />
                </div>
              </div>
              
              {!isLogin && (
                <div className="text-left">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 block ml-4">{t.profileName}</label>
                  <div className="relative">
                    <i className="fa-solid fa-at absolute left-6 top-1/2 -translate-y-1/2 text-slate-300"></i>
                    <input 
                      type="text" 
                      required 
                      value={profileName}
                      onChange={(e) => setProfileName(e.target.value)}
                      className="w-full pl-14 pr-8 py-5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-[#E31E24] transition-all font-bold text-sm"
                      placeholder="username123"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="text-left">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 block ml-4">{t.password}</label>
              <div className="relative">
                <i className="fa-solid fa-shield-halved absolute left-6 top-1/2 -translate-y-1/2 text-slate-300"></i>
                <input 
                  type="password" 
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-14 pr-8 py-5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-[#E31E24] transition-all font-bold text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full py-6 bg-slate-900 text-white font-black uppercase tracking-[0.2em] rounded-2xl shadow-xl hover:bg-[#E31E24] transition-all active:scale-95 disabled:opacity-50 mt-6 text-xs"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-4">
                  <i className="fa-solid fa-circle-notch animate-spin"></i>
                  {isLogin ? "LOGGING IN..." : "PREPARING WELCOME MAIL..."}
                </span>
              ) : (isLogin ? t.login : t.register)}
            </button>
          </form>

          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="mt-10 text-[11px] font-black text-slate-400 hover:text-[#E31E24] uppercase tracking-[0.3em] transition-colors"
          >
            {isLogin ? "Noch kein Konto? Registrieren" : "Haben Sie bereits ein Konto? Anmelden"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
