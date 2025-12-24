
import React from 'react';
import { Language, User } from '../types';
import Logo from './Logo';

interface NavbarProps {
  lang: Language;
  user: User | null;
  t: any;
  toggleLang: () => void;
  onLoginClick: () => void;
  onLogout: () => void;
  currentPath: string;
}

const Navbar: React.FC<NavbarProps> = ({ lang, user, t, toggleLang, onLoginClick, onLogout, currentPath }) => {
  const navItemClass = (path: string) => `
    text-[15px] font-medium transition-colors duration-200
    ${currentPath === path ? 'text-[#E31E24] font-bold' : 'text-slate-600 hover:text-[#2D4096]'}
  `;

  const handleNavigate = (path: string) => {
    (window as any).navigate(path);
  };

  return (
    <nav className="bg-white py-4 shadow-sm border-b border-gray-100">
      <div className="max-w-[1400px] mx-auto px-6 flex justify-between items-center">
        {/* Left: Logo and Name */}
        <button 
          onClick={() => handleNavigate("/")}
          className="flex flex-col items-center group"
        >
          <Logo className="h-14 w-14 mb-1 group-hover:scale-105 transition-transform" />
          <span className="text-[10px] font-black text-[#E31E24] tracking-[0.15em] uppercase leading-none">
            EVENTKOMPASS
          </span>
        </button>

        {/* Right: Navigation Items */}
        <div className="flex items-center space-x-10">
          <div className="flex items-center space-x-8">
            <button onClick={() => handleNavigate("/")} className={navItemClass('/')}>
              {t.home}
            </button>
            {user && (
              <button onClick={() => handleNavigate("/profile")} className={navItemClass('/profile')}>
                {t.myBookings}
              </button>
            )}
            <button onClick={() => handleNavigate("/about")} className={navItemClass('/about')}>
              {t.aboutUs}
            </button>
            <button onClick={() => handleNavigate("/grievances")} className={navItemClass('/grievances')}>
              {t.grievances}
            </button>
          </div>

          <div className="flex items-center pl-8 border-l border-gray-200 space-x-6">
            <button 
              onClick={toggleLang}
              className="text-[12px] font-black text-slate-400 hover:text-[#E31E24] transition-colors uppercase tracking-widest"
            >
              {lang === 'de' ? 'EN' : 'DE'}
            </button>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => handleNavigate("/profile")} 
                  className="flex items-center space-x-2 text-[14px] font-bold text-slate-700 hover:text-[#E31E24] transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 shadow-inner">
                    <i className="fa-solid fa-user text-xs"></i>
                  </div>
                  <span>{user.name}</span>
                </button>
                <button 
                  onClick={onLogout}
                  className="text-slate-400 hover:text-[#E31E24] transition-colors"
                  title={t.logout}
                >
                  <i className="fa-solid fa-right-from-bracket"></i>
                </button>
              </div>
            ) : (
              <button 
                onClick={onLoginClick}
                className="inline-flex items-center px-6 py-2 bg-[#E31E24] text-[13px] font-black rounded-lg text-white hover:bg-[#c41a1f] shadow-lg shadow-red-500/20 transition-all uppercase tracking-widest active:scale-95"
              >
                {t.login}
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
