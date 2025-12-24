
import React, { useState, useEffect } from 'react';
import { Category, User, GroundingSource, EventItem } from '../types';
import { CATEGORY_COLORS } from '../constants';
import { fetchEvents } from '../services/gemini';
import ShareModal from './ShareModal';
// Added missing import for Logo component
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

const Discovery: React.FC<DiscoveryProps> = ({ t, lang, location, setLocation, user, bookings, onAddBooking, onLoginRequired, category }) => {
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState("");
  const [sources, setSources] = useState<GroundingSource[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [locInput, setLocInput] = useState(location);
  const [showShareModal, setShowShareModal] = useState(false);

  useEffect(() => {
    const loadEvents = async () => {
      setLoading(true);
      const data = await fetchEvents(category as Category, location, lang);
      setContent(data.text);
      setSources(data.sources);
      setLoading(false);
    };

    if (category) loadEvents();
    setLocInput(location);
  }, [category, location, lang]);

  const getEventTitle = () => {
    const lines = content.split('\n').filter(l => l.trim().length > 0);
    // Try to find the first line that looks like a title
    const firstTitleLine = lines.find(l => l.trim().length > 5);
    return firstTitleLine?.replace(/[#*]/g, '').trim() || `${category} Event in ${location}`;
  };

  const handleLocationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (locInput.trim()) {
      setLocation(locInput.trim());
    }
  };

  const handleBookingAction = () => {
    if (!user) {
      onLoginRequired();
      return;
    }

    const eventTitle = getEventTitle();
    const eventId = `event-${category}-${location}-${eventTitle.replace(/\s+/g, '-').toLowerCase()}`;

    if (bookings.find(b => b.id === eventId)) {
       return; 
    }

    const newBooking: EventItem = {
      id: eventId,
      title: eventTitle,
      description: content.substring(0, 100) + "...",
      location: location,
      date: new Date().toLocaleDateString(lang === 'de' ? 'de-DE' : 'en-US'),
      category: category as Category
    };

    onAddBooking(newBooking);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const isAlreadyBooked = () => {
    const eventTitle = getEventTitle();
    const eventId = `event-${category}-${location}-${eventTitle.replace(/\s+/g, '-').toLowerCase()}`;
    return !!bookings.find(b => b.id === eventId);
  };

  const getGradient = () => {
    return CATEGORY_COLORS[category as keyof typeof CATEGORY_COLORS] || "from-blue-600 to-indigo-600";
  };

  const handleBack = () => {
    (window as any).navigate("/");
  };

  // Helper to render text with stylish list markers and formatting
  const renderFormattedContent = (text: string) => {
    return text.split('\n').map((line, i) => {
      const trimmed = line.trim();
      if (!trimmed) return <div key={i} className="h-4" />;
      
      // Check if it's a heading
      if (trimmed.startsWith('###') || (i === 0 && !trimmed.startsWith('-'))) {
        return (
          <h3 key={i} className="text-3xl font-black text-slate-900 mt-8 mb-4 uppercase tracking-tighter leading-tight flex items-center">
            <span className="w-1.5 h-8 bg-[#E31E24] mr-4 rounded-full"></span>
            {trimmed.replace(/###/g, '').trim()}
          </h3>
        );
      }

      // Check if it's a list item
      if (trimmed.startsWith('-') || trimmed.startsWith('*') || /^\d+\./.test(trimmed)) {
        return (
          <div key={i} className="flex items-start mb-4 group">
            <div className="mt-1.5 mr-4 flex-shrink-0">
              <div className="w-6 h-6 rounded-lg bg-slate-100 flex items-center justify-center text-[10px] text-[#E31E24] group-hover:bg-[#E31E24] group-hover:text-white transition-colors shadow-sm">
                <i className="fa-solid fa-diamond"></i>
              </div>
            </div>
            <p className="text-slate-700 text-lg leading-relaxed font-medium">
              {trimmed.replace(/^[-*\d.]+\s*/, '')}
            </p>
          </div>
        );
      }

      return (
        <p key={i} className="text-slate-600 text-lg leading-relaxed mb-4 font-medium opacity-90">
          {trimmed}
        </p>
      );
    });
  };

  return (
    <div className="min-h-[80vh] pb-24 bg-slate-50">
      <div className={`bg-gradient-to-br ${getGradient()} text-white pt-24 pb-48 relative overflow-hidden`}>
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/20 blur-[120px] rounded-full -mr-48 -mt-48"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/20 blur-[100px] rounded-full -ml-32 -mb-32"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <button 
            onClick={handleBack} 
            className="group inline-flex items-center px-5 py-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-full text-white mb-10 text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:scale-105 active:scale-95"
          >
            <i className="fa-solid fa-arrow-left mr-3 transition-transform group-hover:-translate-x-1"></i> 
            Explorer verlassen
          </button>
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-[9px] font-black uppercase tracking-[0.3em] mb-6">
                <i className="fa-solid fa-sparkles mr-2 text-yellow-400"></i>
                Aktuelle Entdeckungen
              </div>
              <h1 className="text-6xl md:text-8xl font-black mb-6 uppercase tracking-tighter leading-[0.85] drop-shadow-2xl">
                {category}
              </h1>
              <div className="flex flex-wrap items-center gap-4">
                <div className="px-6 py-3 bg-white text-slate-900 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-left-4 duration-700">
                   <div className="w-8 h-8 rounded-full bg-red-50 text-[#E31E24] flex items-center justify-center">
                    <i className="fa-solid fa-location-dot"></i>
                   </div>
                   <span className="text-sm font-black uppercase tracking-tighter">{location}</span>
                </div>
                <button 
                  onClick={() => setLocInput("")} // Simple way to focus input
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-2xl text-white font-black text-xs uppercase tracking-widest transition-all"
                >
                  Stadt ändern
                </button>
              </div>
            </div>
            
            <div className="hidden lg:block">
              <div className="w-48 h-48 border-2 border-dashed border-white/30 rounded-[3rem] flex items-center justify-center rotate-12 relative">
                <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-[3rem]"></div>
                <i className={`fa-solid ${category === Category.Dining ? 'fa-utensils' : category === Category.Sports ? 'fa-trophy' : category === Category.Festivent ? 'fa-music' : 'fa-briefcase'} text-6xl text-white/40 -rotate-12`}></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-20">
        {/* Search Bar Refined */}
        <div className="mb-12">
          <form onSubmit={handleLocationSubmit} className="relative max-w-xl mx-auto group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#E31E24] to-blue-600 rounded-[2.5rem] blur opacity-25 group-focus-within:opacity-50 transition-opacity"></div>
            <div className="relative flex items-center bg-white rounded-[2.2rem] shadow-2xl p-2 border border-slate-100">
              <div className="pl-6 flex items-center pointer-events-none">
                <i className="fa-solid fa-magnifying-glass text-slate-300"></i>
              </div>
              <input 
                type="text"
                value={locInput}
                onChange={(e) => setLocInput(e.target.value)}
                className="flex-grow pl-4 pr-4 py-4 bg-transparent text-slate-900 font-bold placeholder:text-slate-300 focus:outline-none"
                placeholder="In einer anderen Stadt suchen..."
              />
              <button 
                type="submit" 
                className="bg-[#E31E24] hover:bg-slate-900 text-white px-8 py-4 rounded-[1.8rem] font-black text-xs uppercase tracking-widest transition-all shadow-xl active:scale-95"
              >
                Finden
              </button>
            </div>
          </form>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-[4rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.12)] overflow-hidden border border-slate-100 min-h-[600px] relative">
          {/* Subtle Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-bl-[100%] z-0"></div>
          
          {loading ? (
            <div className="relative z-10 flex flex-col items-center justify-center py-48 px-12 text-center">
              <div className="relative mb-12">
                <div className="w-32 h-32 border-[12px] border-slate-50 border-t-[#E31E24] rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Logo className="h-12 w-12 animate-pulse" />
                </div>
              </div>
              <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter mb-4">{t.loading}</h2>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-[#E31E24] rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-2 h-2 bg-[#E31E24] rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-2 h-2 bg-[#E31E24] rounded-full animate-bounce"></span>
              </div>
              <p className="mt-8 text-slate-400 font-medium italic text-lg max-w-md">Wir analysieren Tausende von Datenpunkten in {location} für dich...</p>
            </div>
          ) : (
            <div className="relative z-10">
              {/* Header inside Content */}
              <div className="px-8 md:px-20 pt-16 pb-12 bg-slate-50/50 border-b border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="flex items-center space-x-6">
                  <div className="w-16 h-16 rounded-[1.5rem] bg-white text-[#E31E24] flex items-center justify-center text-2xl shadow-xl border border-slate-100">
                    <i className="fa-solid fa-sparkles"></i>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-1">AI-Kuratiert</p>
                    <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter leading-none">
                      Events in <span className="text-[#E31E24]">{location}</span>
                    </h2>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                   <span className="px-4 py-2 rounded-xl text-[9px] font-black bg-blue-50 text-blue-700 border border-blue-100 uppercase tracking-widest shadow-sm">
                      <i className="fa-solid fa-microchip mr-2"></i> {category === Category.Dining ? 'Gemini 2.5' : 'Gemini 3'}
                   </span>
                   <span className="px-4 py-2 rounded-xl text-[9px] font-black bg-emerald-50 text-emerald-700 border border-emerald-100 uppercase tracking-widest shadow-sm">
                      <i className="fa-solid fa-location-crosshairs mr-2"></i> Real-time Grounding
                   </span>
                </div>
              </div>

              {/* Main Text Area */}
              <div className="px-8 md:px-20 py-16">
                <div className="max-w-none">
                  <div className="bg-slate-50 rounded-[2.5rem] p-1 shadow-inner mb-12">
                    <div className="bg-white rounded-[2.3rem] p-8 md:p-12 border border-slate-100 shadow-sm">
                      {renderFormattedContent(content)}
                    </div>
                  </div>

                  {/* Sources styled as chic tags/links */}
                  {sources.length > 0 && (
                    <div className="mt-16">
                      <div className="flex items-center mb-8 px-4">
                        <div className="h-px bg-slate-200 flex-grow mr-6"></div>
                        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] whitespace-nowrap">
                          Offizielle Quellen & Buchungslinks
                        </h3>
                        <div className="h-px bg-slate-200 flex-grow ml-6"></div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
                        {sources.map((source, idx) => (
                          <a 
                            key={idx} 
                            href={source.uri} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center p-6 rounded-[2rem] bg-white border border-slate-200 hover:border-[#E31E24] hover:shadow-[0_20px_40px_-10px_rgba(227,30,36,0.1)] hover:-translate-y-2 hover:scale-[1.03] transition-all group"
                          >
                            <div className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center mr-5 group-hover:bg-[#E31E24] group-hover:text-white transition-all shadow-inner">
                              <i className="fa-solid fa-link text-sm"></i>
                            </div>
                            <div className="flex-grow min-w-0">
                              <span className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 group-hover:text-[#E31E24] transition-colors">Information</span>
                              <span className="block text-sm font-black text-slate-800 truncate group-hover:text-[#E31E24] transition-colors">{source.title}</span>
                            </div>
                            <i className="fa-solid fa-arrow-right-long text-slate-200 ml-4 transition-transform group-hover:translate-x-1 group-hover:text-[#E31E24]"></i>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Section */}
                  <div className="mt-20 p-2 bg-gradient-to-r from-slate-900 to-slate-800 rounded-[3.5rem] shadow-2xl group overflow-hidden">
                    <div className="bg-white/5 backdrop-blur-3xl rounded-[3.2rem] p-10 md:p-14 flex flex-col lg:flex-row items-center justify-between relative overflow-hidden">
                      {/* Animated Background Pattern for CTA */}
                      <div className="absolute inset-0 opacity-5 pointer-events-none">
                        <svg className="w-full h-full" viewBox="0 0 100 100">
                          <pattern id="cta-pattern" width="10" height="10" patternUnits="userSpaceOnUse">
                            <circle cx="2" cy="2" r="1" fill="white" />
                          </pattern>
                          <rect width="100" height="100" fill="url(#cta-pattern)" />
                        </svg>
                      </div>

                      <div className="relative z-10 text-center lg:text-left mb-12 lg:mb-0">
                        <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#E31E24]/20 border border-[#E31E24]/30 text-[#E31E24] text-[9px] font-black uppercase tracking-[0.2em] mb-6">
                          Limitiertes Angebot
                        </div>
                        <h3 className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-tighter text-white leading-none">Bereit für ein Abenteuer?</h3>
                        <p className="text-slate-400 font-medium text-lg max-w-lg mx-auto lg:mx-0">Sichere dir jetzt deinen Platz in {location}. Wir synchronisieren alles mit deinem Profil.</p>
                      </div>

                      <div className="flex flex-col sm:flex-row items-center gap-5 relative z-10 w-full lg:w-auto">
                        <button 
                          onClick={() => setShowShareModal(true)}
                          className="w-full sm:w-auto px-10 py-6 rounded-2xl font-black uppercase tracking-widest transition-all bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:border-white/40 active:scale-95 text-xs flex items-center justify-center gap-3"
                        >
                          <i className="fa-solid fa-share-nodes text-lg"></i>
                          {t.share}
                        </button>
                        <button 
                          onClick={handleBookingAction}
                          disabled={isAlreadyBooked()}
                          className={`w-full sm:w-auto px-14 py-6 rounded-2xl font-black uppercase tracking-widest transition-all shadow-2xl active:scale-95 flex items-center justify-center text-sm ${
                            isAlreadyBooked() 
                            ? "bg-slate-700 text-slate-500 cursor-not-allowed border border-slate-600" 
                            : "bg-[#E31E24] text-white hover:bg-[#ff2d34] hover:shadow-[0_25px_50px_-12px_rgba(227,30,36,0.5)] hover:-translate-y-1"
                          }`}
                        >
                          <i className={`fa-solid ${isAlreadyBooked() ? 'fa-check-double' : 'fa-ticket-simple'} mr-4 text-xl`}></i> 
                          {isAlreadyBooked() ? t.alreadyBooked : t.booking}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Verified Badge at bottom */}
              <div className="flex justify-center pb-12">
                <div className="px-6 py-2 rounded-full bg-slate-50 border border-slate-100 flex items-center gap-3 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
                  <Logo className="h-6 w-6" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">EventKompass AI Verified</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {showShareModal && (
        <ShareModal 
          t={t} 
          onClose={() => setShowShareModal(false)} 
          eventTitle={getEventTitle()} 
          category={category || ""} 
        />
      )}

      {showToast && (
        <div className="fixed bottom-12 right-12 z-[100] animate-in fade-in slide-in-from-right-10 zoom-in duration-500">
          <div className="bg-slate-900 text-white p-1 rounded-3xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.4)] flex items-center overflow-hidden border border-white/10">
            <div className="bg-[#E31E24] px-8 py-6 flex items-center justify-center rounded-[1.8rem]">
              <i className="fa-solid fa-calendar-check text-3xl"></i>
            </div>
            <div className="px-10 py-6">
              <p className="font-black uppercase tracking-tighter text-2xl leading-none mb-1">{t.bookingSuccess}</p>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">In Profil gespeichert</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Discovery;
