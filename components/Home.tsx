
import React, { useState, useEffect, useRef } from 'react';
import { Category } from '../types';
import { CATEGORY_COLORS, GERMAN_CITIES } from '../constants';
import { parseSearchQuery } from '../services/gemini';

interface HomeProps {
  t: any;
  lang: string;
  location: string;
  setLocation: (loc: string) => void;
}

const Home: React.FC<HomeProps> = ({ t, lang, location, setLocation }) => {
  const [searchInput, setSearchInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const categories = [
    { id: Category.Festivent, icon: "fa-music", title: t.festivent, desc: t.festiventDesc },
    { id: Category.Sports, icon: "fa-trophy", title: t.sports, desc: t.sportsDesc },
    { id: Category.Dining, icon: "fa-utensils", title: t.dining, desc: t.diningDesc },
    { id: Category.Career, icon: "fa-briefcase", title: t.career, desc: t.careerDesc },
  ];

  const handleNavigate = (path: string) => {
    (window as any).navigate(path);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;

    setIsSearching(true);
    const { category, location: extractedLocation } = await parseSearchQuery(searchInput);
    if (extractedLocation) setLocation(extractedLocation);
    handleNavigate(`/discovery/${category}`);
    setIsSearching(false);
  };

  const selectCity = (city: string) => {
    setLocation(city);
    setSearchInput(city);
    setShowSuggestions(false);
    window.scrollTo({ top: window.innerHeight * 0.7, behavior: 'smooth' });
  };

  const filteredCities = GERMAN_CITIES.filter(city => 
    city.name.toLowerCase().includes(searchInput.toLowerCase())
  ).slice(0, 8);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const quickCities = ["Berlin", "München", "Hamburg", "Frankfurt am Main", "Köln", "Darmstadt"];

  const featuredItems = [
    { cat: Category.Festivent, img: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?q=80&w=1974&auto=format&fit=crop", tag: t.festivals, title: t.berlinSummerBeats, loc: "Waldbühne, Berlin", color: "bg-purple-600/90" },
    { cat: Category.Sports, img: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=2069&auto=format&fit=crop", tag: t.stadium, title: t.munichDerby, loc: "Allianz Arena", color: "bg-red-600/90" },
    { cat: Category.Dining, img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop", tag: t.gourmet, title: t.tasteOfHessen, loc: "Luisenplatz, Darmstadt", color: "bg-emerald-600/90" }
  ];

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-[750px] md:h-[850px] flex items-center justify-center overflow-hidden px-4">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=2070&auto=format&fit=crop" 
            alt="Germany" 
            className="w-full h-full object-cover brightness-[0.35] scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-transparent to-slate-50"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto text-center text-white animate-in fade-in slide-in-from-bottom-12 duration-1000">
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black mb-8 tracking-tighter drop-shadow-2xl uppercase leading-[0.85] hmi-title">
            {t.heroTitle}
          </h1>
          <p className="text-lg md:text-2xl mb-12 opacity-80 font-medium max-w-3xl mx-auto leading-relaxed px-4">
            {t.heroSubtitle}
          </p>
          
          <div className="max-w-4xl mx-auto relative px-2" ref={searchRef}>
            <div className="flex flex-col md:flex-row items-stretch gap-4 bg-white/5 backdrop-blur-3xl p-3 sm:p-4 rounded-[2rem] sm:rounded-[3rem] border border-white/10 shadow-2xl group transition-all focus-within:bg-white/10">
              <form onSubmit={handleSearch} className="flex-grow flex items-center bg-white rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3 sm:py-4 shadow-inner relative">
                <i className="fa-solid fa-sparkles text-[#E31E24] mr-3 sm:mr-4 text-lg sm:text-xl"></i>
                <input 
                  type="text" 
                  value={searchInput}
                  onFocus={() => setShowSuggestions(true)}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder={t.searchIntelligentPlaceholder}
                  className="w-full outline-none text-slate-900 font-bold text-sm sm:text-lg placeholder:text-slate-300 placeholder:font-medium"
                />
              </form>
              
              <button 
                onClick={handleSearch}
                disabled={isSearching}
                className="bg-[#E31E24] hover:bg-[#c41a1f] text-white font-black px-8 sm:px-12 py-4 sm:py-5 rounded-xl sm:rounded-2xl transition-all shadow-xl hover:shadow-red-500/50 uppercase tracking-widest active:scale-95 text-xs sm:text-sm h-12 sm:h-14 flex items-center justify-center min-w-[150px] sm:min-w-[180px]"
              >
                {isSearching ? (
                  <i className="fa-solid fa-circle-notch animate-spin text-xl"></i>
                ) : (
                  <>
                    <i className="fa-solid fa-magnifying-glass mr-3"></i>
                    {t.search}
                  </>
                )}
              </button>
            </div>

            {/* Smart Suggestions Dropdown */}
            {showSuggestions && filteredCities.length > 0 && !searchInput.includes(' ') && (
              <div className="absolute top-full left-0 right-0 mt-4 bg-white rounded-[2rem] shadow-2xl border border-slate-100 p-3 sm:p-4 text-slate-900 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
                <p className="px-4 sm:px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">{t.citySuggestions}</p>
                <div className="max-h-64 overflow-y-auto mt-2">
                  {filteredCities.map((city, idx) => (
                    <button 
                      key={idx}
                      onClick={() => selectCity(city.name)}
                      className="w-full text-left px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl hover:bg-slate-50 font-black text-sm sm:text-lg uppercase tracking-tighter flex items-center transition-all group"
                    >
                      <div className="w-8 h-8 sm:w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mr-3 sm:mr-4 group-hover:bg-[#E31E24] group-hover:text-white transition-all">
                        <i className="fa-solid fa-location-arrow text-[10px] sm:text-xs"></i>
                      </div>
                      {city.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Current Selection Badge */}
            <div className="mt-8 flex justify-center">
              <div className="inline-flex items-center px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-[10px] sm:text-[11px] font-black tracking-[0.2em] uppercase shadow-2xl">
                <i className="fa-solid fa-location-crosshairs mr-2 sm:mr-3 text-[#E31E24] animate-pulse"></i>
                {t.current}: <span className="ml-2 sm:ml-3 text-white px-2.5 py-1 bg-white/10 rounded-lg">{location}</span>
              </div>
            </div>
            
            <div className="mt-8 sm:mt-12 flex flex-wrap items-center justify-center gap-2 sm:gap-4">
              <span className="text-white/40 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] w-full mb-1 sm:mb-2">{t.quickChoiceMetro}</span>
              {quickCities.map(city => (
                <button 
                  key={city}
                  onClick={() => selectCity(city)}
                  className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl transition-all font-black text-[9px] sm:text-[11px] border uppercase tracking-widest active:scale-95 ${
                    location === city 
                    ? "bg-[#E31E24] text-white border-[#E31E24] shadow-xl" 
                    : "bg-white/5 text-white/70 border-white/10 hover:bg-white hover:text-slate-900 hover:border-white"
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section id="categories" className="max-w-7xl mx-auto py-12 sm:py-24 px-4 -mt-16 sm:-mt-24 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {categories.map((cat) => (
            <button 
              key={cat.id}
              onClick={() => handleNavigate(`/discovery/${cat.id}`)}
              className="group cursor-pointer bg-white p-8 sm:p-12 rounded-[2.5rem] sm:rounded-[3.5rem] border border-slate-100 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-3 hover:scale-[1.02] relative overflow-hidden flex flex-col items-center text-center active:scale-[0.98] w-full"
            >
              <div className={`absolute top-0 right-0 w-32 h-32 sm:w-40 h-40 -mr-8 -mt-8 sm:-mr-12 sm:-mt-12 opacity-5 rounded-full bg-gradient-to-br ${CATEGORY_COLORS[cat.id as keyof typeof CATEGORY_COLORS]}`}></div>
              <div className={`w-20 h-20 sm:w-24 h-24 rounded-2xl sm:rounded-[2rem] bg-gradient-to-br ${CATEGORY_COLORS[cat.id as keyof typeof CATEGORY_COLORS]} text-white flex items-center justify-center text-3xl sm:text-4xl mb-6 sm:mb-10 shadow-2xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-700`}>
                <i className={`fa-solid ${cat.icon}`}></i>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-3 sm:mb-4 uppercase tracking-tighter group-hover:text-[#E31E24] transition-colors">{cat.title}</h3>
              <p className="text-slate-500 font-medium leading-relaxed mb-6 sm:mb-10 text-xs sm:text-sm">
                {cat.desc}
              </p>
              <div className="mt-auto px-6 sm:px-8 py-3 sm:py-4 bg-slate-50 rounded-xl sm:rounded-2xl text-[10px] sm:text-[11px] font-black text-slate-900 uppercase tracking-[0.2em] group-hover:bg-slate-900 group-hover:text-white transition-all shadow-inner">
                {t.exploreBtn} <i className="fa-solid fa-compass ml-2 sm:ml-3 transition-transform group-hover:rotate-45"></i>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Featured Section */}
      <section className="bg-slate-900 py-20 sm:py-32 px-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#E31E24] to-transparent opacity-40"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 sm:mb-20 text-center md:text-left gap-8">
            <div className="max-w-2xl">
              <span className="text-[#E31E24] font-black uppercase tracking-[0.4em] text-[9px] sm:text-[10px] mb-3 sm:mb-4 block">{t.eventHighlight}</span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 sm:mb-6 uppercase tracking-tighter leading-[0.9] hmi-title">{t.topExperiencesMonth}</h2>
              <p className="text-slate-400 text-base sm:text-xl font-medium leading-relaxed">{t.heroSubtitle}</p>
            </div>
            <button 
              onClick={() => handleNavigate(`/discovery/${Category.Festivent}`)}
              className="group bg-white/5 hover:bg-[#E31E24] text-white px-8 sm:px-10 py-4 sm:py-5 rounded-xl sm:rounded-2xl font-black text-[10px] sm:text-xs uppercase tracking-widest transition-all flex items-center shadow-2xl active:scale-95 border border-white/10 hover:border-[#E31E24]"
            >
              {t.discoverAll} <i className="fa-solid fa-arrow-right-long ml-3 sm:ml-4 transition-transform group-hover:translate-x-2"></i>
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {featuredItems.map((item, idx) => (
              <button 
                key={idx} 
                onClick={() => handleNavigate(`/discovery/${item.cat}`)}
                className={`relative group overflow-hidden rounded-[3rem] sm:rounded-[4rem] aspect-[4/5] cursor-pointer shadow-2xl active:scale-[0.98] transition-all hover:scale-[1.02] text-left w-full ${idx === 2 ? 'sm:col-span-2 lg:col-span-1' : ''}`}
              >
                <img src={item.img} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={item.tag} />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8 sm:p-12 text-white w-full">
                  <span className={`${item.color} backdrop-blur-md text-[8px] sm:text-[9px] font-black px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-3 sm:mb-5 inline-block uppercase tracking-widest shadow-xl`}>{item.tag}</span>
                  <h3 className="text-2xl sm:text-3xl font-black mb-2 sm:mb-3 tracking-tighter uppercase leading-none hmi-title">{item.title}</h3>
                  <p className="text-slate-400 font-bold text-[10px] sm:text-xs uppercase tracking-widest flex items-center">
                    <i className="fa-solid fa-location-dot mr-2 text-[#E31E24]"></i> {item.loc}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
