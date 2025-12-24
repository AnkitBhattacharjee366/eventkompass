
import React, { useState, useEffect } from 'react';
import { Language, User, Category, EventItem } from './types';
import { TRANSLATIONS } from './constants';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Discovery from './components/Discovery';
import Profile from './components/Profile';
import AuthModal from './components/AuthModal';
import AboutUs from './components/AboutUs';
import Grievances from './components/Grievances';
import Careers from './components/Careers';
import Press from './components/Press';
import Logo from './components/Logo';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('de');
  const [user, setUser] = useState<User | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [location, setLocation] = useState<string>("Darmstadt, Hessen");
  const [bookings, setBookings] = useState<EventItem[]>([]);
  
  // STATE-BASED ROUTER: Navigation handled via in-memory state
  const [currentPath, setCurrentPath] = useState<string>('/');

  // MANDATORY NAVIGATION FUNCTION (Attached to window for child component access)
  useEffect(() => {
    (window as any).navigate = (path: string) => {
      setCurrentPath(path);
      window.scrollTo(0, 0);
    };
  }, []);

  const t = TRANSLATIONS[lang];

  const toggleLanguage = () => {
    setLang(prev => prev === 'de' ? 'en' : 'de');
  };

  const handleLogout = () => {
    setUser(null);
    setBookings([]);
    (window as any).navigate("/");
  };

  const handleLogin = (newUser: User) => {
    setUser(newUser);
    setShowAuth(false);
  };

  const addBooking = (event: EventItem) => {
    if (!bookings.find(b => b.id === event.id)) {
      setBookings(prev => [event, ...prev]);
    }
  };

  const removeBooking = (eventId: string) => {
    setBookings(prev => prev.filter(b => b.id !== eventId));
  };

  // Central Render Logic for State-Based Router
  const renderContent = () => {
    if (currentPath === '/') {
      return <Home t={t} lang={lang} location={location} setLocation={setLocation} />;
    }
    
    if (currentPath.startsWith('/discovery/')) {
      const category = currentPath.split('/')[2] as Category;
      return (
        <Discovery 
          t={t} 
          lang={lang} 
          location={location} 
          setLocation={setLocation}
          user={user}
          bookings={bookings}
          onAddBooking={addBooking}
          onLoginRequired={() => setShowAuth(true)}
          category={category}
        />
      );
    }
    
    if (currentPath === '/profile') {
      return (
        <Profile 
          t={t} 
          lang={lang} 
          user={user} 
          bookings={bookings}
          onCancelBooking={removeBooking}
        />
      );
    }
    
    if (currentPath === '/about') return <AboutUs t={t} />;
    if (currentPath === '/grievances') return <Grievances t={t} />;
    if (currentPath === '/careers') return <Careers t={t} />;
    if (currentPath === '/press') return <Press t={t} />;
    
    return <Home t={t} lang={lang} location={location} setLocation={setLocation} />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar 
        lang={lang} 
        user={user} 
        t={t} 
        toggleLang={toggleLanguage} 
        onLoginClick={() => setShowAuth(true)}
        onLogout={handleLogout}
        currentPath={currentPath}
      />
      
      <main className="flex-grow">
        {renderContent()}
      </main>

      <footer className="bg-slate-900 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <button 
              onClick={() => (window as any).navigate("/")}
              className="flex flex-col items-center group w-fit text-left"
            >
              <Logo className="h-12 w-12 group-hover:scale-110 transition-transform mb-2" />
              <h3 className="text-xl font-black text-white tracking-tighter uppercase">EventKompass</h3>
            </button>
            <p className="text-slate-400 text-sm leading-relaxed">
              Dein All-in-One-Kompass für die besten Erlebnisse in ganz Deutschland. Entdecke, plane und buche in Sekunden.
            </p>
            <div className="flex space-x-4">
              <button type="button" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#E31E24] transition-colors"><i className="fa-brands fa-instagram"></i></button>
              <button type="button" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#E31E24] transition-colors"><i className="fa-brands fa-linkedin-in"></i></button>
              <button type="button" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#E31E24] transition-colors"><i className="fa-brands fa-facebook-f"></i></button>
            </div>
          </div>
          <div>
            <h4 className="font-black uppercase tracking-widest text-xs text-[#E31E24] mb-6">Plattform</h4>
            <ul className="text-slate-400 text-sm space-y-3 font-medium">
              <li><button onClick={() => (window as any).navigate("/discovery/Festivent")} className="hover:text-white transition-colors">{t.festivent}</button></li>
              <li><button onClick={() => (window as any).navigate("/discovery/Sports")} className="hover:text-white transition-colors">{t.sports}</button></li>
              <li><button onClick={() => (window as any).navigate("/discovery/Dining")} className="hover:text-white transition-colors">{t.dining}</button></li>
              <li><button onClick={() => (window as any).navigate("/discovery/Career")} className="hover:text-white transition-colors">{t.career}</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-black uppercase tracking-widest text-xs text-[#E31E24] mb-6">Unternehmen</h4>
            <ul className="text-slate-400 text-sm space-y-3 font-medium">
              <li><button onClick={() => (window as any).navigate("/about")} className="hover:text-white transition-colors">{t.aboutUs}</button></li>
              <li><button onClick={() => (window as any).navigate("/careers")} className="hover:text-white transition-colors">Karriere</button></li>
              <li><button onClick={() => (window as any).navigate("/press")} className="hover:text-white transition-colors">Presse</button></li>
              <li><button onClick={() => (window as any).navigate("/grievances")} className="hover:text-white transition-colors">{t.grievances}</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-black uppercase tracking-widest text-xs text-[#E31E24] mb-6">Support</h4>
            <ul className="text-slate-400 text-sm space-y-3 font-medium">
              <li><button onClick={() => (window as any).navigate("/grievances")} className="hover:text-white transition-colors">Hilfe-Center</button></li>
              <li><button onClick={() => (window as any).navigate("/grievances")} className="hover:text-white transition-colors">Partner-Programm</button></li>
              <li><button onClick={() => (window as any).navigate("/grievances")} className="hover:text-white transition-colors">Impressum</button></li>
              <li><button onClick={() => (window as any).navigate("/grievances")} className="hover:text-white transition-colors">Datenschutz</button></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 text-center text-slate-500 text-xs font-bold uppercase tracking-[0.2em]">
          &copy; 2025 EventKompass GmbH. Made with <i className="fa-solid fa-heart text-[#E31E24] animate-pulse"></i> in Germany.
        </div>
      </footer>

      {showAuth && (
        <AuthModal 
          t={t} 
          onClose={() => setShowAuth(false)} 
          onSuccess={handleLogin} 
        />
      )}
    </div>
  );
};

export default App;
