
import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "h-10 w-auto" }) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      className={className}
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer Red Ring */}
      <circle cx="50" cy="50" r="45" stroke="#E31E24" strokeWidth="4" />
      
      {/* Cardinal Directions (Compass Points) */}
      <path d="M50 2 L53 10 H47 L50 2Z" fill="#E31E24" /> {/* North */}
      <path d="M50 98 L47 90 H53 L50 98Z" fill="#E31E24" /> {/* South */}
      <path d="M98 50 L90 47 V53 L98 50Z" fill="#E31E24" /> {/* East */}
      <path d="M2 50 L10 53 V47 L2 50Z" fill="#E31E24" /> {/* West */}
      
      {/* Inner Blue Circle */}
      <circle cx="50" cy="50" r="32" fill="#2D4096" />
      
      {/* Stylized 'e' */}
      <path 
        d="M65 48 C65 40 58 34 50 34 C42 34 35 40 35 48 C35 56 42 62 50 62 C55 62 60 60 63 56" 
        stroke="white" 
        strokeWidth="6" 
        strokeLinecap="round" 
      />
      <path d="M35 48 H65" stroke="white" strokeWidth="6" strokeLinecap="round" />
    </svg>
  );
};

export default Logo;
