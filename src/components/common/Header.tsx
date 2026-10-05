import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { PageRoute } from '../../types';
import { BOUTIQUE_INFO } from '../../data/products';
import {
  Heart,
  Search,
  Menu,
  X,
  Phone,
  MessageCircle,
  ArrowRight,
  MapPin,
  FileSpreadsheet,
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    currentRoute,
    setCurrentRoute,
    wishlistCount,
    openWishlist,
    openSearchModal,
    openGoogleSheetsModal,
    spreadsheetId,
  } = useShop();

  const [menuOpen, setMenuOpen] = useState(false);

  const navigateTo = (route: PageRoute) => {
    setCurrentRoute(route);
    setMenuOpen(false);
  };

  const primaryNavLinks: { label: string; route: PageRoute; urdu: string; desc: string }[] = [
    { label: 'Home', route: 'home', urdu: 'مرکز', desc: 'Atelier introduction & featured showcases' },
    { label: 'Shop All Creations', route: 'shop-all', urdu: 'تمام ملبوسات', desc: 'Complete catalog of royal bridal & formal ensembles' },
    { label: 'Nikah Collection', route: 'nikah', urdu: 'نکاح', desc: 'Pristine ivory, pearls & antique silver mukesh' },
    { label: 'Barat Collection', route: 'barat', urdu: 'بارات', desc: 'Imperial deep crimson velvet & 24K gold zardozi' },
    { label: 'Mehndi Collection', route: 'mehndi', urdu: 'مہندی', desc: 'Festive emerald, saffron & traditional gota patti' },
    { label: 'Walima Collection', route: 'walima', urdu: 'ولیمہ', desc: 'Romantic dusty rose, champagne & Swarovski crystals' },
    { label: 'Made to Order Couture', route: 'made-to-order', urdu: 'خصوصی سلائی', desc: 'Bespoke one-on-one bridal design & custom measurements' },
    { label: 'Editorial Lookbook 2026', route: 'lookbook', urdu: 'لوک بک', desc: 'Campaign photography and official video showcases' },
    { label: 'Heritage & Story', route: 'about', urdu: 'ہماری تاریخ', desc: 'Master artisans & generational Karchob embroidery' },
    { label: 'Karachi Boutique', route: 'contact', urdu: 'رابطہ', desc: 'Visit our Tariq Road flagship salon & showroom' },
  ];

  const subCategories: { label: string; route: PageRoute; desc: string }[] = [
    { label: 'Sharara & Gharara', route: 'sharara-gharara', desc: 'Mughal royal courts & Farshi volume' },
    { label: 'Luxury Sarees', route: 'sarees', desc: 'Handcrafted tissue silks & embellished pallus' },
    { label: 'Frocks & Maxis', route: 'frocks-maxis', desc: 'Cascading floor-length bridal kalidaars' },
    { label: 'Party Wear Formals', route: 'party-wear', desc: 'Sleek luxury formals & cocktail evening wear' },
  ];

  return (
    <>
      {/* Main Luxury Header - Sticky, Clean, Minimalist */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#ECE6DE] transition-all shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between relative">
          {/* Left Zone: 3 Lines Menu Button */}
          <div className="flex items-center z-10">
            <button
              onClick={() => setMenuOpen(true)}
              className="group flex items-center gap-2.5 py-2 px-2 sm:px-3 hover:bg-[#FAF8F5] border border-transparent hover:border-[#E8E2D8] transition-all text-[#1A1816]"
              aria-label="Open Navigation Menu"
            >
              <div className="flex flex-col gap-1 w-5 justify-center">
                <span className="h-0.5 w-5 bg-[#1A1816] group-hover:bg-[#9E7B3B] transition-colors" />
                <span className="h-0.5 w-4 bg-[#1A1816] group-hover:w-5 group-hover:bg-[#9E7B3B] transition-all" />
                <span className="h-0.5 w-5 bg-[#1A1816] group-hover:bg-[#9E7B3B] transition-colors" />
              </div>
              <span className="text-xs tracking-[0.2em] uppercase font-semibold text-[#1A1816] group-hover:text-[#9E7B3B] transition-colors hidden sm:inline">
                Menu
              </span>
            </button>
          </div>

          {/* Center Zone: ASHRAFI BRIDAL STUDIO (Perfect Absolute Center) */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-auto">
            <button
              onClick={() => navigateTo('home')}
              className="group flex flex-col items-center focus:outline-none py-1"
            >
              <span
                className="text-lg sm:text-2xl md:text-3xl font-display tracking-[0.22em] uppercase font-medium text-[#1A1816] group-hover:text-[#9E7B3B] transition-colors whitespace-nowrap"
                style={{ fontFamily: 'Cinzel, serif' }}
              >
                ASHRAFI BRIDAL STUDIO
              </span>
              <span className="text-[8px] sm:text-[9px] tracking-[0.38em] uppercase text-[#8C7E70] font-sans font-light -mt-0.5">
                HAUTE COUTURE · KARACHI
              </span>
            </button>
          </div>

          {/* Right Zone: Search & Wishlist Only (Zero buttons added) */}
          <div className="flex items-center gap-1 sm:gap-2 z-10">
            <button
              onClick={openSearchModal}
              className="p-2.5 text-[#4A4238] hover:text-[#1A1816] hover:bg-[#FAF8F5] transition-colors rounded-full"
              title="Search bridal collections"
              aria-label="Search"
            >
              <Search className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            </button>

            <button
              onClick={openWishlist}
              className="p-2.5 text-[#4A4238] hover:text-[#1A1816] hover:bg-[#FAF8F5] transition-colors relative rounded-full"
              title="Saved bridal favorites"
              aria-label="Wishlist"
            >
              <Heart className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 bg-[#9E7B3B] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {wishlistCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Full Animated Luxury Navigation Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-md flex justify-start animate-in fade-in duration-300">
          <div className="w-full max-w-3xl bg-white border-r border-[#E6DFD5] h-full flex flex-col shadow-2xl relative animate-in slide-in-from-left duration-300 overflow-y-auto">
            {/* Top Bar inside Menu */}
            <div className="p-6 sm:p-8 border-b border-[#ECE6DE] flex items-center justify-between bg-[#FAF8F5]">
              <div>
                <span
                  className="text-2xl sm:text-3xl font-display tracking-[0.2em] uppercase font-medium text-[#1A1816]"
                  style={{ fontFamily: 'Cinzel, serif' }}
                >
                  ASHRAFI BRIDAL STUDIO
                </span>
                <p className="text-[10px] tracking-[0.3em] uppercase text-[#9E7B3B] font-semibold mt-0.5">
                  HAUTE COUTURE BRIDAL ATELIER · KARACHI
                </p>
              </div>

              <button
                onClick={() => setMenuOpen(false)}
                className="p-3 text-[#1A1816] hover:text-[#9E7B3B] hover:bg-white border border-[#E0D8CB] transition-all rounded-full"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Menu Body - 2 Columns on Desktop */}
            <div className="p-6 sm:p-8 flex-1 grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* Primary Navigation Column */}
              <div className="md:col-span-7 space-y-1">
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#9E7B3B] font-semibold block mb-3">
                  EXPLORE ATELIER
                </span>

                <div className="divide-y divide-[#F0EBE3]">
                  {primaryNavLinks.map((item) => (
                    <button
                      key={item.route}
                      onClick={() => navigateTo(item.route)}
                      className={`w-full py-3 text-left flex items-center justify-between group transition-all ${
                        currentRoute === item.route
                          ? 'text-[#9E7B3B] font-bold pl-2 border-l-2 border-[#9E7B3B]'
                          : 'text-[#1A1816] hover:text-[#9E7B3B] hover:pl-2'
                      }`}
                    >
                      <div>
                        <span className="text-base sm:text-lg font-serif tracking-wide block">
                          {item.label}
                        </span>
                        <span className="text-[11px] text-[#706456] block font-sans font-light">
                          {item.desc}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-serif text-[#9E7B3B] opacity-70" dir="rtl">
                          {item.urdu}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#9E7B3B]" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Secondary Column: Categories & Concierge */}
              <div className="md:col-span-5 space-y-6 md:border-l md:border-[#ECE6DE] md:pl-8">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[#9E7B3B] font-semibold block mb-3">
                    SPECIALTY SILHOUETTES
                  </span>
                  <div className="space-y-2">
                    {subCategories.map((item) => (
                      <button
                        key={item.route}
                        onClick={() => navigateTo(item.route)}
                        className={`w-full text-left p-2.5 border transition-all text-xs flex flex-col ${
                          currentRoute === item.route
                            ? 'border-[#9E7B3B] bg-[#FAF8F5] text-[#9E7B3B] font-bold'
                            : 'border-[#E8E2D8] hover:border-[#9E7B3B] text-[#1A1816] hover:bg-[#FAF8F5]'
                        }`}
                      >
                        <span className="font-semibold">{item.label}</span>
                        <span className="text-[10px] text-[#706456] mt-0.5">{item.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Google Sheets Catalog Manager Link */}
                <div className="p-3.5 bg-white border border-[#E8E2D8] hover:border-emerald-600 transition-colors shadow-2xs">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] uppercase tracking-widest text-emerald-800 font-semibold flex items-center gap-1.5">
                      <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Google Sheets Sync</span>
                    </span>
                    {spreadsheetId && (
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="Connected" />
                    )}
                  </div>
                  <p className="text-[11px] text-[#706456] mb-2.5">
                    Live-edit prices, titles, images, descriptions & categories via your Google Sheet.
                  </p>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      openGoogleSheetsModal();
                    }}
                    className="w-full py-2 bg-[#1A1816] hover:bg-emerald-700 text-white text-[11px] font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
                  >
                    <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Manage Google Sheet</span>
                  </button>
                </div>

                {/* Direct WhatsApp Concierge Block inside Menu */}
                <div className="p-4 bg-[#FAF8F5] border border-[#E8E2D8] space-y-3">
                  <span className="text-[10px] uppercase tracking-widest text-[#9E7B3B] font-semibold block">
                    DIRECT BRIDAL INQUIRY
                  </span>
                  <p className="text-xs text-[#5C5144]">
                    Connect directly with our Tariq Road studio head designer for pricing, custom color swatches & ordering.
                  </p>
                  <a
                    href={BOUTIQUE_INFO.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-2xs transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Concierge</span>
                  </a>
                </div>

                {/* Boutique Location */}
                <div className="space-y-1 text-xs text-[#5C5144]">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-[#9E7B3B] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#1A1816] block">Atelier Address:</strong>
                      <span>{BOUTIQUE_INFO.shopNumber}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 pt-1">
                    <Phone className="w-4 h-4 text-[#9E7B3B] shrink-0" />
                    <span>Call: {BOUTIQUE_INFO.phone}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Bar inside Menu */}
            <div className="p-6 border-t border-[#ECE6DE] bg-[#FAF8F5] flex flex-wrap items-center justify-between gap-3 text-xs text-[#706456]">
              <div className="flex items-center gap-3">
                <a
                  href={BOUTIQUE_INFO.socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#9E7B3B] transition-colors"
                >
                  YouTube
                </a>
                <span>·</span>
                <a
                  href={BOUTIQUE_INFO.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#9E7B3B] transition-colors"
                >
                  Facebook
                </a>
                <span>·</span>
                <a
                  href={BOUTIQUE_INFO.socialLinks.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#9E7B3B] transition-colors"
                >
                  TikTok
                </a>
              </div>

              <a
                href={`tel:${BOUTIQUE_INFO.phone}`}
                className="px-4 py-2 bg-[#1A1816] text-white hover:bg-[#9E7B3B] text-[11px] uppercase tracking-wider font-semibold transition-colors flex items-center gap-2"
              >
                <Phone className="w-3.5 h-3.5 text-[#E6D7B8]" />
                <span>Call Atelier: {BOUTIQUE_INFO.phone}</span>
              </a>
            </div>
          </div>

          {/* Click outside to close */}
          <div className="flex-1" onClick={() => setMenuOpen(false)} />
        </div>
      )}
    </>
  );
};
