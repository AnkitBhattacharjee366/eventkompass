
import React, { useState } from 'react';
import { Category } from '../types';
import { CATEGORY_COLORS } from '../constants';
import AudioSearch from './AudioSearch';

interface HomeProps {
  t: any;
  lang: string;
  location: string;
  setLocation: (loc: string) => void;
}

const Home: React.FC<HomeProps> = ({ t, lang, location, setLocation }) => {
  const [searchInput, setSearchInput] = useState("");
  const [showLocationToast, setShowLocationToast] = useState(false);

  const categories = [
    { id: Category.Festivent, icon: "fa-music", title: t.festivent, desc: t.festiventDesc },
    { id: Category.Sports, icon: "fa-trophy", title: t.sports, desc: t.sportsDesc },
    { id: Category.Dining, icon: "fa-utensils", title: t.dining, desc: t.diningDesc },
    { id: Category.Career, icon: "fa-briefcase", title: t.career, desc: t.careerDesc },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const targetCity = searchInput.trim() || location;
    setLocation(targetCity);
    setShowLocationToast(true);
    setTimeout(() => setShowLocationToast(false), 3000);
  };

  const quickCities = ["Berlin", "München", "Hamburg", "Frankfurt", "Darmstadt"];

  const featuredItems = [
    { cat: Category.Festivent, img: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?q=80&w=1974&auto=format&fit=crop", tag: "Festivals", title: "Berlin Summer Beats", loc: "Waldbühne, Berlin", color: "bg-purple-600/90" },
    { cat: Category.Sports, img: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=2069&auto=format&fit=crop", tag: "Stadion", title: "München Derby Night", loc: "Allianz Arena", color: "bg-red-600/90" },
    { cat: Category.Dining, img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop", tag: "Gourmet", title: "Taste of Hessen", loc: "Luisenplatz, Darmstadt", color: "bg-emerald-600/90" }
  ];

  const handleNavigate = (path: string) => {
    (window as any).navigate(path);
  };

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative h-[750px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=2070&auto=format&fit=crop" 
            alt="Germany" 
            className="w-full h-full object-cover brightness-[0.35] scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-transparent to-slate-50"></div>
        </div>
        
        <div className="relative z-10 max-w-5xl px-4 text-center text-white animate-in fade-in slide-in-from-bottom-12 duration-1000">
          <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter drop-shadow-2xl uppercase leading-[0.9]">
            {t.heroTitle}
          </h1>
          <p className="text-xl md:text-2xl mb-12 opacity-80 font-medium max-w-3xl mx-auto leading-relaxed">
            {t.heroSubtitle}
          </p>
          
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row items-stretch gap-4 bg-white/5 backdrop-blur-3xl p-4 rounded-[3rem] border border-white/10 shadow-2xl group transition-all focus-within:bg-white/10">
              <form onSubmit={handleSearch} className="flex-grow flex items-center bg-white rounded-2xl px-6 py-4 shadow-inner">
                <i className="fa-solid fa-magnifying-glass text-slate-300 mr-4 text-xl"></i>
                <input 
                  type="text" 
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder={t.searchPlaceholder}
                  className="w-full outline-none text-slate-900 font-bold text-lg placeholder:text-slate-300 placeholder:font-medium"
                />
              </form>
              <div className="flex items-center gap-3">
                <AudioSearch onTranscription={(text) => setSearchInput(text)} lang={lang} />
                <button 
                  onClick={handleSearch}
                  className="bg-[#E31E24] hover:bg-[#c41a1f] text-white font-black px-12 py-5 rounded-2xl transition-all shadow-xl hover:shadow-red-500/50 uppercase tracking-widest active:scale-95 text-sm h-14 flex items-center"
                >
                  {t.search}
                </button>
              </div>
            </div>

            {/* Location Badge positioned below search section */}
            <div className="mt-8 flex justify-center">
              <div className="inline-flex items-center px-6 py-2.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-[11px] font-black tracking-[0.2em] uppercase shadow-2xl animate-in fade-in slide-in-from-top-4 duration-1000">
                <i className="fa-solid fa-location-crosshairs mr-3 text-[#E31E24]"></i>
                {t.myLocation}: <span className="ml-2 text-white">{location}</span>
              </div>
            </div>
            
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <span className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em] w-full mb-2">Beliebte Regionen</span>
              {quickCities.map(city => (
                <button 
                  key={city}
                  onClick={() => {
                    setLocation(city);
                    setSearchInput(city);
                    setShowLocationToast(true);
                    setTimeout(() => setShowLocationToast(false), 2000);
                  }}
                  className={`px-5 py-2.5 rounded-xl transition-all font-black text-[10px] border uppercase tracking-widest active:scale-95 ${
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
      <section className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8 -mt-24 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat) => (
            <button 
              key={cat.id}
              onClick={() => handleNavigate(`/discovery/${cat.id}`)}
              className="group cursor-pointer bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-3 hover:scale-[1.02] relative overflow-hidden flex flex-col items-center text-center active:scale-[0.98] w-full"
            >
              <div className={`absolute top-0 right-0 w-40 h-40 -mr-12 -mt-12 opacity-5 rounded-full bg-gradient-to-br ${CATEGORY_COLORS[cat.id as keyof typeof CATEGORY_COLORS]}`}></div>
              <div className={`w-24 h-24 rounded-[2rem] bg-gradient-to-br ${CATEGORY_COLORS[cat.id as keyof typeof CATEGORY_COLORS]} text-white flex items-center justify-center text-4xl mb-10 shadow-2xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-700`}>
                <i className={`fa-solid ${cat.icon}`}></i>
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4 uppercase tracking-tighter group-hover:text-[#E31E24] transition-colors">{cat.title}</h3>
              <p className="text-slate-500 font-medium leading-relaxed mb-10 text-sm">
                {cat.desc}
              </p>
              <div className="mt-auto px-8 py-4 bg-slate-50 rounded-2xl text-[11px] font-black text-slate-900 uppercase tracking-[0.2em] group-hover:bg-slate-900 group-hover:text-white transition-all shadow-inner">
                Erkunden <i className="fa-solid fa-compass ml-3 transition-transform group-hover:rotate-45"></i>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Featured Section */}
      <section className="bg-slate-900 py-32 px-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#E31E24] to-transparent opacity-40"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 text-center md:text-left gap-8">
            <div className="max-w-2xl">
              <span className="text-[#E31E24] font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Event Highlight</span>
              <h2 className="text-5xl font-black text-white mb-6 uppercase tracking-tighter leading-[0.9]">Top Erlebnisse diesen Monat</h2>
              <p className="text-slate-400 text-xl font-medium leading-relaxed">Wir haben die besten Veranstaltungen in ganz Deutschland für Sie ausgewählt. Von exklusiven Konzerten bis zu sportlichen Großereignissen.</p>
            </div>
            <button 
              onClick={() => handleNavigate(`/discovery/${Category.Festivent}`)}
              className="group bg-white/5 hover:bg-[#E31E24] text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all flex items-center shadow-2xl active:scale-95 border border-white/10 hover:border-[#E31E24]"
            >
              Alle entdecken <i className="fa-solid fa-arrow-right-long ml-4 transition-transform group-hover:translate-x-2"></i>
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {featuredItems.map((item, idx) => (
              <button 
                key={idx} 
                onClick={() => handleNavigate(`/discovery/${item.cat}`)}
                className="relative group overflow-hidden rounded-[4rem] aspect-[4/5] cursor-pointer shadow-2xl active:scale-[0.98] transition-all hover:scale-[1.02] text-left w-full"
              >
                <img src={item.img} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={item.tag} />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-12 text-white w-full">
                  <span className={`${item.color} backdrop-blur-md text-[9px] font-black px-4 py-2 rounded-full mb-5 inline-block uppercase tracking-widest shadow-xl`}>{item.tag}</span>
                  <h3 className="text-3xl font-black mb-3 tracking-tighter uppercase leading-none">{item.title}</h3>
                  <p className="text-slate-400 font-bold text-xs uppercase tracking-widest flex items-center">
                    <i className="fa-solid fa-location-dot mr-2 text-[#E31E24]"></i> {item.loc}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Feedback Toast */}
      {showLocationToast && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] animate-in fade-in slide-in-from-bottom-6 zoom-in">
          <div className="bg-white text-slate-900 px-8 py-4 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex items-center border border-slate-100">
            <div className="w-10 h-10 rounded-full bg-red-50 text-[#E31E24] flex items-center justify-center mr-4">
              <i className="fa-solid fa-location-dot"></i>
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Standort Aktualisiert</p>
              <p className="font-black text-sm uppercase tracking-tighter">{location}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
