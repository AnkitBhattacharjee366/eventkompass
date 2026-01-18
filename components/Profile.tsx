
import React, { useState, useEffect } from 'react';
import { User, EventItem } from '../types';
import { CATEGORY_COLORS } from '../constants';

interface ProfileProps {
  t: any;
  lang: string;
  user: User | null;
  bookings: EventItem[];
  onCancelBooking: (id: string) => void;
}

const Profile: React.FC<ProfileProps> = ({ t, lang, user, bookings, onCancelBooking }) => {
  const [confirmCancel, setConfirmCancel] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      (window as any).navigate("/");
    }
  }, [user]);

  if (!user) return null;

  const handleCancelClick = (id: string) => {
    if (confirmCancel === id) {
      onCancelBooking(id);
      setConfirmCancel(null);
    } else {
      setConfirmCancel(id);
      setTimeout(() => setConfirmCancel(null), 3000); // Reset confirm state after 3s
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
        <div className="bg-slate-900 p-8 text-white flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
          <div className="w-24 h-24 rounded-full bg-[#E31E24] flex items-center justify-center text-4xl border-4 border-slate-800 font-black">
            {user.name.charAt(0)}
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold">{user.name}</h1>
            <p className="text-slate-400">{user.email}</p>
            <div className="mt-2 flex space-x-2 justify-center md:justify-start">
              <span className="bg-slate-800 px-3 py-1 rounded-full text-xs font-bold text-[#E31E24] uppercase tracking-widest border border-slate-700">
                {t.premiumMember}
              </span>
            </div>
          </div>
        </div>
        
        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center">
                  <i className="fa-solid fa-id-card mr-2 text-[#E31E24]"></i> {t.accountInfo}
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">{t.customerId}</span>
                    <span className="font-mono font-bold text-slate-800">{user.id}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">{lang === 'de' ? 'Standort' : 'Location'}</span>
                    <span className="font-bold text-slate-800">{user.location}</span>
                  </div>
                </div>
                <button className="mt-6 w-full py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-100 transition-colors">
                  {t.editProfile}
                </button>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <h3 className="text-xl font-bold text-slate-800 flex items-center">
                <i className="fa-solid fa-calendar-check mr-2 text-[#E31E24]"></i> {t.myBookings}
              </h3>
              
              {bookings.length === 0 ? (
                <div className="py-20 text-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                  <i className="fa-solid fa-calendar-xmark text-4xl text-slate-300 mb-4"></i>
                  <p className="text-slate-500 font-medium">{t.noBookings}</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {bookings.map(booking => (
                    <div key={booking.id} className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm flex flex-col sm:flex-row items-center justify-between hover:border-red-200 transition-colors group">
                      <div className="flex items-center space-x-4 w-full">
                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${CATEGORY_COLORS[booking.category as keyof typeof CATEGORY_COLORS] || 'from-slate-500 to-slate-700'} text-white flex items-center justify-center text-xl shadow-md`}>
                          <i className={`fa-solid ${
                            booking.category === 'Festivent' ? 'fa-music' : 
                            booking.category === 'Sports' ? 'fa-trophy' : 
                            booking.category === 'Dining' ? 'fa-utensils' : 'fa-briefcase'
                          }`}></i>
                        </div>
                        <div className="flex-grow">
                          <h4 className="font-bold text-slate-800 line-clamp-1">{booking.title}</h4>
                          <div className="flex items-center text-xs text-slate-500 mt-1 space-x-3">
                            <span className="flex items-center"><i className="fa-solid fa-calendar mr-1"></i> {booking.date}</span>
                            <span className="flex items-center"><i className="fa-solid fa-location-dot mr-1"></i> {booking.location}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 sm:mt-0 sm:ml-4 w-full sm:w-auto flex items-center justify-end space-x-3">
                        <button 
                          onClick={() => handleCancelClick(booking.id)}
                          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                            confirmCancel === booking.id 
                            ? "bg-red-600 text-white border-red-600 animate-pulse" 
                            : "bg-white text-slate-500 border-slate-200 hover:text-red-600 hover:border-red-200"
                          }`}
                        >
                          {confirmCancel === booking.id ? t.confirmQ : t.cancel}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
