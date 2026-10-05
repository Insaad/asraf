import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { BOUTIQUE_INFO } from '../../data/products';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-end flex-col gap-2">
      {/* Friendly Bridal Concierge Bubble */}
      {showTooltip && (
        <div className="bg-[#17120F] text-[#EDE7DF] border border-[#B38D4F]/40 p-3 max-w-xs shadow-2xl relative mb-1 animate-in fade-in slide-in-from-bottom-2">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute top-1.5 right-1.5 text-[#8F8171] hover:text-[#EDE7DF]"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <p className="text-[11px] font-semibold text-[#CBAB6D] uppercase tracking-wider mb-1">
            Ashrafi Bridal Concierge
          </p>
          <p className="text-xs text-[#A89885] leading-relaxed">
            Planning your wedding? Speak with our senior designer directly on WhatsApp for price estimates, custom color dyeing, and bespoke timelines.
          </p>
          <a
            href={BOUTIQUE_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2.5 inline-block text-xs font-semibold text-[#E2C99A] hover:underline"
          >
            Start Chat on {BOUTIQUE_INFO.phone} →
          </a>
        </div>
      )}

      {/* Floating Action Button */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setShowTooltip(!showTooltip)}
          className="hidden md:flex items-center gap-2 px-3 py-2 bg-[#17120F]/90 backdrop-blur-md border border-[#3E342B] text-xs text-[#D8C7A5] hover:border-[#B38D4F] transition-all shadow-lg"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Bridal Inquiry</span>
        </button>

        <a
          href={BOUTIQUE_INFO.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-13 h-13 rounded-full bg-gradient-to-tr from-[#059669] to-[#10B981] hover:from-[#047857] hover:to-[#059669] text-white flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all relative group"
          aria-label="Direct WhatsApp Bridal Chat"
        >
          <MessageCircle className="w-7 h-7" />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
        </a>
      </div>
    </div>
  );
};
