
import React, { useState, useRef, useEffect } from 'react';
import { Language, User } from '../types';
import { GERMAN_CITIES } from '../constants';
import Logo from './Logo';

interface NavbarProps {
  lang: Language;
  user: User | null;
  t: any;
  toggleLang: () => void;
  onLoginClick: () => void;
  onLogout: () => void;
  currentPath: string;
  location: string;
  setLocation: (loc: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  lang, user, t, toggleLang, onLoginClick, onLogout, currentPath, location, setLocation 
}) => {
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleNavigate = (path: string) => {
    (window as any).navigate(path);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowLocationPicker(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredCities = GERMAN_CITIES.filter(city => 
    city.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <nav className="bg-white py-4 shadow-sm border-b border-gray-100 sticky top-0 z-[50]">
      <div className="max-w-[1400px] mx-auto px-6 flex justify-between items-center">
        {/* Left: Branding & Location */}
        <div className="flex items-center space-x-12">
          <button 
            onClick={() => handleNavigate("/")}
            className="flex items-center group gap-4"
          >
            <Logo className="h-10 w-10 group-hover:scale-105 transition-transform" />
            <span className="text-sm font-black text-[#E31E24] tracking-widest uppercase leading-none border-l pl-4 border-slate-200">
              EVENTKOMPASS
            </span>
          </button>

          {/* HMI Typeahead Search for Location */}
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setShowLocationPicker(!showLocationPicker)}
              className="flex items-center space-x-3 px-5 py-2 rounded-xl bg-slate-50 border border-slate-100 hover:border-[#E31E24] transition-all group shadow-sm"
            >
              <i className="fa-solid fa-location-dot text-slate-400 group-hover:text-[#E31E24]"></i>
              <span className="text-xs font-black text-slate-900 uppercase tracking-tighter">{location}</span>
              <i className={`fa-solid fa-chevron-down text-[10px] text-slate-300 transition-transform ${showLocationPicker ? 'rotate-180' : ''}`}></i>
            </button>

            {showLocationPicker && (
              <div className="absolute top-full left-0 mt-3 w-80 bg-white rounded-[1.5rem] shadow-[0_25px_70px_-15px_rgba(0,0,0,0.15)] border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-top-2">
                <div className="p-4 border-b border-slate-50 bg-slate-50/50">
                  <input 
                    type="text"
                    autoFocus
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t.searchPlaceholder}
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-xs font-bold outline-none focus:border-[#E31E24]"
                  />
                </div>
                <div className="max-h-72 overflow-y-auto p-2">
                  {filteredCities.map(city => (
                    <button
                      key={city.name}
                      onClick={() => { setLocation(city.name); setShowLocationPicker(false); }}
                      className={`w-full text-left px-4 py-3 rounded-lg text-xs font-bold flex items-center justify-between transition-all ${location === city.name ? 'bg-red-50 text-[#E31E24]' : 'text-slate-700 hover:bg-slate-50'}`}
                    >
                      {city.name}
                      {location === city.name && <i className="fa-solid fa-check"></i>}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Actions & Language Control */}
        <div className="flex items-center gap-10">
          <div className="hidden lg:flex items-center space-x-8 text-[11px] font-black uppercase tracking-widest text-slate-500">
            <button onClick={() => handleNavigate("/")} className="hover:text-[#E31E24] transition-colors">{t.home}</button>
            {user && <button onClick={() => handleNavigate("/profile")} className="hover:text-[#E31E24] transition-colors">{t.myBookings}</button>}
            <button onClick={() => handleNavigate("/about")} className="hover:text-[#E31E24] transition-colors">{t.aboutUs}</button>
          </div>

          <div className="flex items-center gap-6 border-l pl-8 border-slate-100">
            {/* HMI Segmented Button for 2 choices */}
            <div className="flex bg-slate-100 p-1 rounded-xl">
              <button 
                onClick={lang === 'de' ? undefined : toggleLang}
                className={`px-4 py-1.5 rounded-lg text-[10px] font-black transition-all ${lang === 'de' ? 'bg-white text-[#E31E24] shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
              >
                DE
              </button>
              <button 
                onClick={lang === 'en' ? undefined : toggleLang}
                className={`px-4 py-1.5 rounded-lg text-[10px] font-black transition-all ${lang === 'en' ? 'bg-white text-[#E31E24] shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
              >
                EN
              </button>
            </div>
            
            {user ? (
              <div className="flex items-center gap-3">
                {/* Profile Link Capsule */}
                <button 
                  onClick={() => handleNavigate("/profile")} 
                  className="flex items-center gap-3 group px-4 py-1.5 rounded-xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-all shadow-sm"
                >
                  <div className="w-7 h-7 rounded-full bg-slate-900 flex items-center justify-center text-white text-[10px] group-hover:bg-[#E31E24] transition-colors shadow-sm font-black">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-[10px] font-black text-slate-900 uppercase tracking-tighter hidden sm:block">
                    {user.name}
                  </span>
                </button>
                
                {/* Explicit Logout Button */}
                <button 
                  onClick={onLogout}
                  className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:text-[#E31E24] hover:border-[#E31E24] transition-all group"
                  title={t.logout}
                >
                  <i className="fa-solid fa-power-off text-xs group-hover:scale-110 transition-transform"></i>
                </button>
              </div>
            ) : (
              <button 
                onClick={onLoginClick}
                className="px-6 py-2.5 bg-slate-900 text-white text-[11px] font-black rounded-xl hover:bg-[#E31E24] shadow-xl transition-all uppercase tracking-widest"
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
