
import React, { useState } from 'react';

interface ShareModalProps {
  t: any;
  onClose: () => void;
  eventTitle: string;
  category: string;
}

const ShareModal: React.FC<ShareModalProps> = ({ t, onClose, eventTitle, category }) => {
  const [copied, setCopied] = useState(false);
  const shareUrl = window.location.href;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOptions = [
    { 
      name: 'Facebook', 
      icon: 'fa-facebook-f', 
      color: 'bg-[#1877F2]', 
      link: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}` 
    },
    { 
      name: 'X (Twitter)', 
      icon: 'fa-x-twitter', 
      color: 'bg-black', 
      link: `https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out this ${category} event: ${eventTitle}`)}&url=${encodeURIComponent(shareUrl)}` 
    },
    { 
      name: 'WhatsApp', 
      icon: 'fa-whatsapp', 
      color: 'bg-[#25D366]', 
      link: `https://wa.me/?text=${encodeURIComponent(`Check out this ${category} event: ${eventTitle} - ${shareUrl}`)}` 
    },
    { 
      name: 'Email', 
      icon: 'fa-envelope', 
      color: 'bg-slate-500', 
      link: `mailto:?subject=${encodeURIComponent(`Event Idea: ${eventTitle}`)}&body=${encodeURIComponent(`Hey, check out this event on EventKompass: ${shareUrl}`)}` 
    },
  ];

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white w-full max-w-sm rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-black text-slate-900 uppercase tracking-tighter">{t.shareTitle}</h2>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
              <i className="fa-solid fa-xmark text-lg"></i>
            </button>
          </div>

          <div className="mb-8">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">{t.copyLink}</p>
            <div className="flex items-center gap-2 p-1.5 bg-slate-50 rounded-2xl border border-slate-100">
              <input 
                type="text" 
                readOnly 
                value={shareUrl}
                className="flex-grow bg-transparent border-none text-xs font-medium text-slate-500 outline-none px-3 truncate"
              />
              <button 
                onClick={handleCopy}
                className={`px-4 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${
                  copied ? 'bg-emerald-500 text-white' : 'bg-slate-900 text-white hover:bg-[#E31E24]'
                }`}
              >
                {copied ? t.linkCopied : <i className="fa-solid fa-copy"></i>}
              </button>
            </div>
          </div>

          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">{t.shareOn}</p>
            <div className="grid grid-cols-4 gap-4">
              {shareOptions.map((option) => (
                <a 
                  key={option.name}
                  href={option.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 group"
                >
                  <div className={`w-12 h-12 ${option.color} rounded-2xl flex items-center justify-center text-white text-lg shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all`}>
                    <i className={`fa-brands ${option.icon} ${option.name === 'Email' ? 'fa-solid' : ''}`}></i>
                  </div>
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {option.name}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
