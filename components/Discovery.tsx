
import React, { useState, useEffect, useMemo } from 'react';
import { Category, User, GroundingSource, EventItem } from '../types';
import { CATEGORY_COLORS } from '../constants';
import { fetchEvents } from '../services/gemini';
import Logo from './Logo';

interface DiscoveryProps {
  t: any;
  lang: 'de' | 'en';
  location: string;
  setLocation: (loc: string) => void;
  user: User | null;
  bookings: EventItem[];
  onAddBooking: (event: EventItem) => void;
  onLoginRequired: () => void;
  category: Category;
}

interface ParsedEvent {
  title: string;
  date: string;
  description: string;
}

const Discovery: React.FC<DiscoveryProps> = ({ t, lang, location, setLocation, user, bookings, onAddBooking, onLoginRequired, category }) => {
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState("");
  const [sources, setSources] = useState<GroundingSource[]>([]);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const loadEvents = async () => {
      setLoading(true);
      const data = await fetchEvents(category as Category, location, lang);
      setContent(data.text);
      setSources(data.sources);
      setLoading(false);
    };
    if (category) loadEvents();
  }, [category, location, lang]);

  const parsedData = useMemo(() => {
    const lines = content.split('\n');
    const introTextLines: string[] = [];
    const events: ParsedEvent[] = [];
    
    let isTable = false;
    lines.forEach(line => {
      const trimmed = line.trim();
      if (trimmed.startsWith('|') && trimmed.includes('|')) {
        const cells = trimmed.split('|').map(c => c.trim()).filter(c => c !== '');
        if (cells.length >= 2 && !cells[0].toLowerCase().includes('titel') && !cells[1].includes('---')) {
          events.push({
            title: cells[0].replace(/\*\*/g, ''),
            date: cells[1],
            description: cells[2] || ''
          });
        }
        isTable = true;
      } else if (!isTable && trimmed.length > 0 && !trimmed.startsWith('#')) {
        introTextLines.push(trimmed);
      }
    });

    return { intro: introTextLines.join('\n'), events };
  }, [content]);

  const renderStylishIntro = (text: string) => {
    if (!text) return null;
    const parts = text.split('**');
    return (
      <p className="text-xl md:text-3xl lg:text-4xl text-slate-400 font-medium leading-[1.3] tracking-tight text-center max-w-5xl mx-auto px-4">
        {parts.map((part, i) => (
          i % 2 === 1 ? (
            <span key={i} className="text-slate-900 font-black decoration-[#E31E24]/30 decoration-4 underline-offset-4">
              {part}
            </span>
          ) : (
            <span key={i}>{part}</span>
          )
        ))}
      </p>
    );
  };

  const handleBookingAction = (sourceTitle?: string, sourceUri?: string) => {
    if (!user) { onLoginRequired(); return; }
    const eventId = `event-source-${Date.now()}`;
    const newBooking: EventItem = {
      id: eventId,
      title: sourceTitle || "Premium Reservation",
      description: sourceUri ? `Verified via: ${sourceUri}` : `Exclusive booking in ${location}`,
      location: location,
      date: new Date().toLocaleDateString(lang === 'de' ? 'de-DE' : 'en-US'),
      category: category as Category,
      url: sourceUri
    };
    onAddBooking(newBooking);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const getGradient = () => CATEGORY_COLORS[category as keyof typeof CATEGORY_COLORS] || "from-blue-600 to-indigo-600";
  const getIcon = () => {
    switch(category) {
      case Category.Festivent: return 'fa-music';
      case Category.Sports: return 'fa-trophy';
      case Category.Dining: return 'fa-utensils';
      case Category.Career: return 'fa-briefcase';
      default: return 'fa-calendar';
    }
  };

  const getSourceDetails = (title: string, idx: number) => {
    const rating = (4 + (idx % 10) / 10).toFixed(1);
    const reviews = 100 + (idx * 42);
    const imageKeyword = category === Category.Dining ? 'restaurant,food' : 
                         category === Category.Festivent ? 'concert,party' :
                         category === Category.Sports ? 'stadium,sports' : 'office,business';
    const imageUrl = `https://loremflickr.com/800/600/${imageKeyword}?lock=${idx + 100}`;
    return { rating, reviews, imageUrl };
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20 overflow-x-hidden">
      <div className={`bg-gradient-to-br ${getGradient()} text-white pt-24 pb-48 px-4 sm:px-6 relative overflow-hidden`}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-black rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-end gap-10 relative z-10 text-center md:text-left">
          <div className="animate-in slide-in-from-left duration-700">
            <span className="inline-block px-5 py-2 rounded-full bg-black/20 text-[10px] font-black uppercase tracking-[0.3em] mb-6 backdrop-blur-md border border-white/10">
              <i className="fa-solid fa-sparkles mr-2"></i> {t.aiPowered}
            </span>
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] mb-4 hmi-title">
              {t[category.toLowerCase()]}
            </h1>
            <p className="text-xl sm:text-2xl font-bold opacity-80 flex items-center justify-center md:justify-start">
              <i className="fa-solid fa-location-dot mr-3 text-[#E31E24]"></i> {location}, Germany
            </p>
          </div>
          <button 
            onClick={() => (window as any).navigate("/")} 
            className="px-8 py-4 bg-white/10 hover:bg-white text-white hover:text-slate-900 border border-white/20 rounded-2xl text-[10px] font-black uppercase tracking-widest backdrop-blur-md transition-all active:scale-95 shadow-2xl"
          >
            {t.leaveExplorer}
          </button>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 -mt-32 relative z-20">
        <div className="bg-white rounded-[2.5rem] sm:rounded-[4rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] border border-slate-100 overflow-hidden min-h-[600px] flex flex-col">
          {loading ? (
            <div className="flex-grow flex flex-col items-center justify-center py-40 sm:py-60">
              <div className="relative w-24 h-24 sm:w-32 h-32 mb-12">
                <div className="absolute inset-0 border-[8px] sm:border-[12px] border-slate-100 rounded-full"></div>
                <div className="absolute inset-0 border-[8px] sm:border-[12px] border-t-[#E31E24] rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center text-2xl sm:text-3xl text-slate-200">
                  <i className={`fa-solid ${getIcon()} animate-pulse`}></i>
                </div>
              </div>
              <p className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tighter animate-pulse px-4 text-center">{t.loading}</p>
            </div>
          ) : (
            <div className="p-6 sm:p-16 lg:p-24">
              {parsedData.intro && (
                <div className="mb-16 sm:mb-24 animate-in fade-in slide-in-from-top-6 duration-1000 relative">
                  <div className="flex items-center gap-4 sm:gap-6 mb-8 sm:mb-10">
                    <div className="h-px flex-grow bg-slate-100"></div>
                    <div className="flex items-center gap-3 px-4 sm:px-6 py-2 bg-slate-50 rounded-full border border-slate-100 shadow-sm">
                       <i className="fa-solid fa-feather-pointed text-[#E31E24] text-[10px]"></i>
                       <span className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">
                         {t.exclusiveCuration}
                       </span>
                    </div>
                    <div className="h-px flex-grow bg-slate-100"></div>
                  </div>
                  {renderStylishIntro(parsedData.intro)}
                </div>
              )}

              <div className="mb-16 sm:mb-24">
                <div className="flex items-center justify-between mb-10 sm:mb-12">
                   <div className="text-center sm:text-left w-full sm:w-auto">
                      <h4 className="text-[9px] sm:text-xs font-black text-[#E31E24] uppercase tracking-[0.4em] mb-2">
                        {t.realtimeGrounding}
                      </h4>
                      <h2 className="text-3xl sm:text-4xl font-black text-slate-900 uppercase tracking-tighter hmi-title">
                        {t.topRecommendations}
                      </h2>
                   </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
                  {sources.map((s, idx) => {
                    const details = getSourceDetails(s.title, idx);
                    const isBooked = bookings.some(b => b.title === s.title);
                    return (
                      <div key={idx} className="group relative bg-white rounded-[2rem] sm:rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: `${idx * 50}ms` }}>
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <img src={details.imageUrl} alt={s.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                          <div className="absolute bottom-4 left-6 flex items-center gap-2">
                             <div className="bg-[#E31E24] p-1.5 rounded-lg"><Logo className="w-3 h-3" /></div>
                             <span className="text-white text-[9px] font-black uppercase tracking-widest">{t.official}</span>
                          </div>
                        </div>
                        <div className="p-5 sm:p-6 flex flex-col flex-grow">
                          <div className="flex items-center gap-1 mb-3">
                             {[...Array(5)].map((_, i) => (
                               <i key={i} className={`fa-solid fa-star text-[10px] ${i < Math.floor(parseFloat(details.rating)) ? 'text-amber-400' : 'text-slate-200'}`}></i>
                             ))}
                             <span className="text-[10px] font-black text-slate-900 ml-1">{details.rating}</span>
                          </div>
                          <h3 className="text-base sm:text-lg font-black text-slate-900 uppercase tracking-tighter mb-4 line-clamp-2 leading-none group-hover:text-[#E31E24] transition-colors hmi-title">{s.title}</h3>
                          <div className="flex items-center gap-3 sm:gap-4 mt-auto">
                            <button onClick={() => handleBookingAction(s.title, s.uri)} disabled={isBooked} className={`flex-grow py-3 sm:py-3.5 rounded-xl text-[9px] sm:text-[10px] font-black uppercase tracking-widest transition-all shadow-lg active:scale-95 ${isBooked ? "bg-emerald-500 text-white cursor-default" : "bg-slate-900 text-white hover:bg-[#E31E24]"}`}>
                              {isBooked ? t.alreadyBooked : t.booking}
                            </button>
                            <a href={s.uri} target="_blank" className="w-10 h-10 sm:w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-[#E31E24] border border-slate-100 transition-all hover:bg-white">
                              <i className="fa-solid fa-arrow-up-right-from-square text-sm"></i>
                            </a>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="border-t border-slate-100 pt-16 sm:pt-20 mb-8 sm:mb-12">
                <h4 className="text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-[0.4em] mb-10 sm:mb-12 text-center">{t.currentCuration}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
                  {parsedData.events.length > 0 && parsedData.events.map((event, idx) => (
                    <div key={idx} className="group bg-slate-50 rounded-[2.5rem] sm:rounded-[3rem] border border-slate-100 p-8 sm:p-10 hover:bg-white hover:shadow-2xl hover:-translate-y-4 transition-all duration-500 flex flex-col animate-in fade-in">
                      <div className="flex justify-between items-start mb-6 sm:mb-8">
                        <div className={`w-14 h-14 sm:w-16 h-16 rounded-2xl sm:rounded-3xl bg-gradient-to-br ${getGradient()} flex items-center justify-center text-white text-xl sm:text-2xl shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all`}>
                          <i className={`fa-solid ${getIcon()}`}></i>
                        </div>
                        <span className="px-4 py-1.5 sm:px-5 sm:py-2 bg-white rounded-full text-[9px] sm:text-[10px] font-black text-slate-900 uppercase tracking-widest shadow-sm border border-slate-100 group-hover:border-[#E31E24] transition-all whitespace-nowrap">{event.date}</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tighter mb-4 leading-tight group-hover:text-[#E31E24] transition-colors line-clamp-2 hmi-title">{event.title}</h3>
                      <p className="text-slate-500 font-medium text-xs sm:text-sm leading-relaxed mb-8 sm:mb-10 flex-grow line-clamp-4">{event.description}</p>
                      <button onClick={() => handleBookingAction(event.title)} className={`w-full py-4 sm:py-5 rounded-xl sm:rounded-2xl font-black text-[9px] sm:text-[10px] uppercase tracking-[0.2em] transition-all shadow-lg active:scale-95 flex items-center justify-center gap-3 ${bookings.some(b => b.title === event.title) ? "bg-emerald-500 text-white cursor-default" : "bg-slate-900 text-white group-hover:bg-[#E31E24]"}`}>
                        {bookings.some(b => b.title === event.title) ? <><i className="fa-solid fa-check"></i> {t.alreadyBooked}</> : <><i className="fa-solid fa-ticket-simple"></i> {t.booking}</>}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {showToast && (
        <div className="fixed bottom-6 right-6 sm:bottom-12 sm:right-12 z-[100] bg-slate-900 text-white p-6 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl animate-in slide-in-from-right-12 duration-500 flex items-center gap-6 sm:gap-8 border border-white/10 backdrop-blur-xl">
          <div className="w-12 h-12 sm:w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center text-2xl sm:text-3xl shadow-lg shadow-emerald-500/30 animate-bounce"><i className="fa-solid fa-check"></i></div>
          <div><p className="font-black uppercase tracking-tighter text-xl sm:text-2xl mb-1 leading-none">{t.bookingSuccess}</p><p className="text-[9px] sm:text-xs text-slate-400 font-black uppercase tracking-[0.2em]">{t.syncedWithProfile}</p></div>
        </div>
      )}
    </div>
  );
};

export default Discovery;
