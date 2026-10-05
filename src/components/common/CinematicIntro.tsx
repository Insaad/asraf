import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface SplashScreenProps {
  onEnter: () => void;
}

export const CinematicIntro: React.FC<SplashScreenProps> = ({ onEnter }) => {
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Graceful auto-fade into the website after 2.4 seconds of beautiful animation
    const timer = setTimeout(() => {
      setIsFading(true);
      setTimeout(onEnter, 700);
    }, 2400);

    return () => clearTimeout(timer);
  }, [onEnter]);

  const handleDismiss = () => {
    setIsFading(true);
    setTimeout(onEnter, 300);
  };

  return (
    <div
      onClick={handleDismiss}
      className={`fixed inset-0 z-50 bg-[#FAF8F5] cursor-pointer flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden transition-opacity duration-700 ease-out ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Traditional Rotating Mughal Sacred Geometry Mandala */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none flex items-center justify-center">
        <svg
          className="w-[700px] h-[700px] sm:w-[900px] sm:h-[900px] animate-spin-very-slow"
          viewBox="0 0 200 200"
          fill="none"
          stroke="#93733A"
          strokeWidth="0.6"
        >
          <circle cx="100" cy="100" r="95" strokeDasharray="3 3" />
          <circle cx="100" cy="100" r="75" />
          <circle cx="100" cy="100" r="50" strokeDasharray="4 2" />
          <circle cx="100" cy="100" r="25" />
          <path d="M100 0 L100 200 M0 100 L200 100 M29 29 L171 171 M29 171 L171 29" />
          <polygon points="100,10 125,75 190,100 125,125 100,190 75,125 10,100 75,75" />
        </svg>
      </div>

      {/* Center Beautifully Animated Brand Presentation */}
      <div className="relative z-10 max-w-lg mx-auto flex flex-col items-center animate-in fade-in zoom-in-95 duration-1000">
        {/* Subtle Ornamental Crest Motif */}
        <div className="inline-flex items-center gap-2 text-[10px] tracking-[0.4em] uppercase text-[#9E7B3B] font-semibold mb-6 px-4 py-1.5 bg-white border border-[#E8E2D8] shadow-2xs animate-float">
          <span>◈</span>
          <span>HAUTE COUTURE ATELIER · KARACHI</span>
          <span>◈</span>
        </div>

        {/* Animated Brand Typography */}
        <h1
          className="text-5xl sm:text-7xl md:text-8xl font-display font-medium tracking-[0.24em] uppercase text-[#1A1816] mb-2 drop-shadow-sm transition-transform duration-1000"
          style={{ fontFamily: 'Cinzel, serif' }}
        >
          ASHRAFI
        </h1>

        <div className="flex items-center justify-center gap-3 my-3">
          <span className="w-12 sm:w-20 h-px bg-gradient-to-r from-transparent to-[#9E7B3B]" />
          <p className="text-sm sm:text-base tracking-[0.45em] uppercase text-[#706456] font-medium font-sans">
            BRIDAL STUDIO
          </p>
          <span className="w-12 sm:w-20 h-px bg-gradient-to-l from-transparent to-[#9E7B3B]" />
        </div>

        <p className="text-xs sm:text-sm text-[#8C7E70] italic tracking-widest mt-2 max-w-sm font-serif text-center">
          Generational Karchob Needlecraft & Royal Heirloom Silhouettes
        </p>

        {/* Gentle Enter Hint */}
        <div className="mt-12 flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[#9E7B3B] hover:text-[#1A1816] font-semibold transition-colors">
          <span>Click Anywhere to Enter</span>
          <ArrowRight className="w-3.5 h-3.5 animate-pulse" />
        </div>
      </div>
    </div>
  );
};
