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
  const [location, setLocation] = useState<string>("Darmstadt");
  const [bookings, setBookings] = useState<EventItem[]>([]);
  const [currentPath, setCurrentPath] = useState<string>('/');

  useEffect(() => {
    // SPA navigation
    (window as any).navigate = (path: string) => {
      setCurrentPath(path);
      window.scrollTo(0, 0);
    };

    // Handle direct links on GitHub Pages
    if (window.location.pathname !== '/' && window.location.pathname !== currentPath) {
      setCurrentPath(window.location.pathname);
    }
  }, []);

  const t = TRANSLATIONS[lang];

  const toggleLanguage = () => setLang(prev => prev === 'de' ? 'en' : 'de');
  const handleLogout = () => { setUser(null); setBookings([]); (window as any).navigate("/"); };
  const handleLogin = (newUser: User) => { setUser(newUser); setShowAuth(false); };
  const addBooking = (event: EventItem) => { if (!bookings.find(b => b.id === event.id)) setBookings(prev => [event, ...prev]); };
  const removeBooking = (eventId: string) => setBookings(prev => prev.filter(b => b.id !== eventId));

  const renderContent = () => {
    if (currentPath === '/') return <Home t={t} lang={lang} location={location} setLocation={setLocation} />;
    if (currentPath.startsWith('/discovery/')) {
      const category = currentPath.split('/')[2] as Category;
      return <Discovery t={t} lang={lang} location={location} setLocation={setLocation} user={user} bookings={bookings} onAddBooking={addBooking} onLoginRequired={() => setShowAuth(true)} category={category} />;
    }
    if (currentPath === '/profile') return <Profile t={t} lang={lang} user={user} bookings={bookings} onCancelBooking={removeBooking} />;
    if (currentPath === '/about') return <AboutUs t={t} lang={lang} />;
    if (currentPath === '/grievances') return <Grievances t={t} lang={lang} />;
    if (currentPath === '/careers') return <Careers t={t} lang={lang} />;
    if (currentPath === '/press') return <Press t={t} lang={lang} />;
    return <Home t={t} lang={lang} location={location} setLocation={setLocation} />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar lang={lang} user={user} t={t} toggleLang={toggleLanguage} onLoginClick={() => setShowAuth(true)} onLogout={handleLogout} currentPath={currentPath} location={location} setLocation={setLocation} />
      <main className="flex-grow">{renderContent()}</main>

      <footer className="bg-slate-900 text-white py-16 px-6">
        {/* Footer content as in your previous App.tsx */}
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 text-center text-slate-500 text-xs font-bold uppercase tracking-[0.2em]">
          &copy; 2025 EventKompass GmbH. Made with <i className="fa-solid fa-heart text-[#E31E24] animate-pulse"></i> in Germany.
        </div>
      </footer>

      {showAuth && <AuthModal t={t} onClose={() => setShowAuth(false)} onSuccess={handleLogin} />}
    </div>
  );
};

export default App;
