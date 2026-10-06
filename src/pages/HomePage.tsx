import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS, BOUTIQUE_INFO, TESTIMONIALS, LOOKBOOK_STORIES } from '../data/products';
import { ProductCard } from '../components/common/ProductCard';
import { PageRoute } from '../types';
import {
  Calendar,
  Sparkles,
  Scissors,
  Award,
  ArrowRight,
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { setCurrentRoute, createWhatsAppLink, products } = useShop();

  const [activeTab, setActiveTab] = useState<'featured' | 'bestsellers' | 'new-arrivals'>('featured');

  const displayedProducts = products.filter((p) => {
    if (activeTab === 'bestsellers') return p.isBestseller;
    if (activeTab === 'new-arrivals') return p.isNewArrival;
    return true;
  }).slice(0, 16);

  const occasionCards = [
    {
      id: 'nikah',
      title: 'Nikah Collection',
      urdu: 'نکاح',
      subtitle: 'Ivory Silks, Pearls & Silver Mukesh',
      route: 'nikah' as PageRoute,
      image: '/images/nikah_ivory_couture_1791159230888.jpg',
      color: '#9E7B3B',
    },
    {
      id: 'barat',
      title: 'Barat Collection',
      urdu: 'بارات',
      subtitle: 'Imperial Crimson Velvet & 24K Gold Zardozi',
      route: 'barat' as PageRoute,
      image: '/images/barat_royal_lehenga_1791159245316.jpg',
      color: '#8C1D2F',
    },
    {
      id: 'mehndi',
      title: 'Mehndi Collection',
      urdu: 'مہندی',
      subtitle: 'Festive Emerald, Saffron & Gota Patti',
      route: 'mehndi' as PageRoute,
      image: '/images/mehndi_celebratory_look_1791159262441.jpg',
      color: '#065F46',
    },
    {
      id: 'walima',
      title: 'Walima Collection',
      urdu: 'ولیمہ',
      subtitle: 'Romantic Dusty Rose & Crystal Corsetry',
      route: 'walima' as PageRoute,
      image: '/images/walima_pastel_gown_1791159277503.jpg',
      color: '#BE185D',
    },
  ];

  return (
    <div className="min-h-screen bg-white text-[#1A1816]">
      {/* 1. Full-Screen Minimal Hero - High-Resolution Bridal Photography with Centered Animated Logo Only */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden border-b border-[#ECE6DE] bg-[#FAF8F5]">
        {/* High-Resolution Bridal Photography Background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="/images/luxury_bridal_hero_light_1791160503662.jpg"
            alt="Ashrafi Bridal Studio"
            className="w-full h-full object-cover object-center animate-slow-zoom transition-opacity duration-1000 ease-out"
          />
          {/* Subtle Scrim for High-Contrast Readability while Preserving Full Photographic Detail */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50" />
        </div>

        {/* Centered 'ASHRAFI BRIDAL STUDIO' Logo Only - Animated with Subtle Fade-In */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto animate-in fade-in duration-1000 ease-out">
          <h1
            className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-medium tracking-[0.22em] uppercase text-white drop-shadow-2xl select-none"
            style={{ fontFamily: 'Cinzel, serif' }}
          >
            ASHRAFI BRIDAL STUDIO
          </h1>
        </div>
      </section>

      {/* Featured Bridal Catalog */}
      <section className="py-20 bg-white border-b border-[#ECE6DE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-[#9E7B3B] font-semibold block mb-2">
                ATELIER MASTERPIECES
              </span>
              <h2
                className="text-3xl sm:text-4xl font-display text-[#1A1816]"
                style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
              >
                Featured Bridal & Formal Ensembles
              </h2>
            </div>

            {/* Interactive Segmented Filter Control */}
            <div className="flex items-center p-1 bg-[#FAF8F5] border border-[#E8E2D8]">
              <button
                onClick={() => setActiveTab('featured')}
                className={`px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] transition-all duration-300 ${
                  activeTab === 'featured'
                    ? 'bg-[#1A1816] text-white shadow-xs'
                    : 'text-[#7A6F62] hover:text-[#1A1816] hover:bg-white/60'
                }`}
              >
                Featured
              </button>
              <button
                onClick={() => setActiveTab('bestsellers')}
                className={`px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] transition-all duration-300 ${
                  activeTab === 'bestsellers'
                    ? 'bg-[#1A1816] text-white shadow-xs'
                    : 'text-[#7A6F62] hover:text-[#1A1816] hover:bg-white/60'
                }`}
              >
                Bestsellers
              </button>
              <button
                onClick={() => setActiveTab('new-arrivals')}
                className={`px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] transition-all duration-300 ${
                  activeTab === 'new-arrivals'
                    ? 'bg-[#1A1816] text-white shadow-xs'
                    : 'text-[#7A6F62] hover:text-[#1A1816] hover:bg-white/60'
                }`}
              >
                New Arrivals
              </button>
            </div>
          </div>

          {/* Product Grid with Direct WhatsApp Order Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-14 text-center">
            <button
              onClick={() => setCurrentRoute('shop-all')}
              className="px-9 py-4 bg-[#1A1816] hover:bg-[#9E7B3B] text-white text-[11px] uppercase tracking-[0.22em] font-semibold transition-all duration-300 shadow-xs hover:shadow-md active:scale-98"
            >
              Explore Full Bridal Catalog ({products.length} Outfits) →
            </button>
          </div>
        </div>
      </section>

      {/* 4. SACRED CEREMONIES & FESTIVITIES: Curated by Wedding Occasion (NOW PLACED AFTER PRODUCTS CATALOG) */}
      <section className="py-20 bg-[#FAF8F5] border-b border-[#ECE6DE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-[0.3em] text-[#9E7B3B] font-semibold block mb-2">
              SACRED CEREMONIES & FESTIVITIES
            </span>
            <h2
              className="text-3xl sm:text-4xl font-display text-[#1A1816]"
              style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
            >
              Curated by Wedding Occasion
            </h2>
            <p className="text-xs sm:text-sm text-[#706456] mt-2">
              Each milestone celebration holds its own poetic aesthetic, sacred color palette, and bespoke embroidery motifs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {occasionCards.map((occ) => (
              <div
                key={occ.id}
                onClick={() => setCurrentRoute(occ.route)}
                className="group cursor-pointer relative overflow-hidden bg-white border border-[#E8E2D8] hover:border-[#9E7B3B] transition-all duration-500 flex flex-col justify-end aspect-[3/4] shadow-2xs hover:shadow-xl hover:-translate-y-1"
              >
                {/* Background image */}
                <img
                  src={occ.image}
                  alt={occ.title}
                  className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:from-black/85 transition-colors" />

                {/* Content */}
                <div className="relative z-10 p-6 flex flex-col justify-end">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] uppercase tracking-widest text-[#E6D7B8] font-semibold">
                      COLLECTION
                    </span>
                    <span className="text-lg font-serif text-[#E6D7B8] opacity-90" dir="rtl">
                      {occ.urdu}
                    </span>
                  </div>

                  <h3
                    className="text-2xl font-serif text-white group-hover:text-[#E6D7B8] transition-colors"
                    style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
                  >
                    {occ.title}
                  </h3>

                  <p className="text-xs text-stone-200 mt-1 line-clamp-1">{occ.subtitle}</p>

                  <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between text-xs text-[#E6D7B8] font-medium uppercase tracking-wider">
                    <span>View Designs</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Made-to-Order Couture Atelier Section */}
      <section className="py-24 bg-white border-b border-[#ECE6DE] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Narrative */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs uppercase tracking-[0.3em] text-[#9E7B3B] font-semibold">
                BESPOKE BRIDAL EXPERIENCE
              </span>
              <h2
                className="text-3xl sm:text-5xl font-display text-[#1A1816] leading-tight"
                style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
              >
                Made-to-Order: Your Dream Lehenga Crafted Exclusively for You
              </h2>
              <p className="text-xs sm:text-sm text-[#5C5144] leading-relaxed">
                At Ashrafi Bridal Studio, we believe no two brides are the same. From the curvature of your neckline to the exact shade of crimson Jamawar, our senior designers work alongside you to manifest an heirloom garment.
              </p>

              {/* 4-Step Interactive Timeline */}
              <div className="space-y-4 pt-4">
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-[#FAF8F5] border border-[#D4AF37] text-[#9E7B3B] flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
                    01
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#1A1816]">
                      Couture Consultation & Sketching
                    </h4>
                    <p className="text-xs text-[#706456]">
                      Visit our Tariq Road salon or connect via private virtual video call to review lehenga flare, motifs, and dupatta draping.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-[#FAF8F5] border border-[#D4AF37] text-[#9E7B3B] flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
                    02
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#1A1816]">
                      Fabric Dyeing & Swatch Approval
                    </h4>
                    <p className="text-xs text-[#706456]">
                      We dye pure raw silks and organza nets to your exact shade sample, dispatching physical swatches for your peace of mind.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-[#FAF8F5] border border-[#D4AF37] text-[#9E7B3B] flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
                    03
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#1A1816]">
                      Hand-Embroidery (Karchob & Zardozi)
                    </h4>
                    <p className="text-xs text-[#706456]">
                      Master artisans hand-needle dabka, tilla, Austrian crystals, and seed pearls on wooden embroidery frames (karchob) in Karachi.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-[#FAF8F5] border border-[#D4AF37] text-[#9E7B3B] flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
                    04
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#1A1816]">
                      Internal Can-Can Fitting & Delivery
                    </h4>
                    <p className="text-xs text-[#706456]">
                      Tailored with adjustable margins, delivered in protective archival garment bags with worldwide insured courier tracking.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-4">
                <button
                  onClick={() => setCurrentRoute('made-to-order')}
                  className="px-6 py-3 bg-[#1A1816] hover:bg-[#9E7B3B] text-white font-semibold text-xs uppercase tracking-widest active:scale-95 transition-all shadow-xs"
                >
                  Explore Made-to-Order Service
                </button>
                <a
                  href={createWhatsAppLink("As-salamu alaykum! I would like to inquire about bespoke Made-to-Order bridal couture.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-white border border-[#D4AF37]/60 text-[#1A1816] hover:border-[#1A1816] text-xs uppercase tracking-widest transition-all shadow-2xs flex items-center gap-2"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Custom WhatsApp Inquiry</span>
                </a>
              </div>
            </div>

            {/* Right Visual Image */}
            <div className="lg:col-span-6">
              <div className="relative border border-[#E6DFD5] p-3 bg-white shadow-sm">
                <img
                  src="/images/barat_royal_lehenga_1791159245316.jpg"
                  alt="Zardozi Hand Embroidery at Ashrafi Atelier"
                  className="w-full aspect-[4/3] object-cover object-top"
                />
                <div className="p-4 bg-[#FAF8F5] border-t border-[#EAE4DB] flex items-center justify-between text-xs text-[#706456]">
                  <div>
                    <strong className="text-[#1A1816] block">Atelier Location:</strong>
                    <span>GF-26, Saima Centre, Tariq Road, Karachi</span>
                  </div>
                  <a
                    href={BOUTIQUE_INFO.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#9E7B3B] hover:underline font-semibold flex items-center gap-1"
                  >
                    <span>Direct Atelier Chat</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Editorial Lookbook Highlights */}
      <section className="py-20 bg-[#FAF8F5] border-b border-[#ECE6DE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-[#9E7B3B] font-semibold block mb-2">
                EDITORIAL CAMPAIGN
              </span>
              <h2
                className="text-3xl sm:text-4xl font-display text-[#1A1816]"
                style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
              >
                The Bridal Lookbook 2026
              </h2>
            </div>
            <button
              onClick={() => setCurrentRoute('lookbook')}
              className="text-xs text-[#9E7B3B] hover:underline uppercase tracking-wider font-semibold flex items-center gap-1.5"
            >
              <span>Explore Complete Lookbook</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {LOOKBOOK_STORIES.slice(0, 3).map((story) => (
              <div
                key={story.id}
                onClick={() => setCurrentRoute('lookbook')}
                className="group cursor-pointer bg-white border border-[#E8E2D8] hover:border-[#9E7B3B] transition-all duration-500 flex flex-col shadow-2xs hover:shadow-xl hover:-translate-y-1 overflow-hidden"
              >
                <div className="aspect-[4/3] overflow-hidden bg-[#FAF8F5] relative">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-106"
                  />
                  <div className="absolute top-3 left-3 text-[10px] tracking-widest uppercase bg-white/95 backdrop-blur-xs text-[#1A1816] px-2.5 py-1 border border-[#E0D8CB] font-semibold shadow-2xs">
                    {story.tag}
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3
                      className="text-xl font-serif text-[#1A1816] group-hover:text-[#9E7B3B] transition-colors"
                      style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
                    >
                      {story.title}
                    </h3>
                    <p className="text-xs text-[#706456] mt-1">{story.subtitle}</p>
                    <p className="text-xs text-[#8A7E70] mt-2 line-clamp-2 leading-relaxed">{story.description}</p>
                  </div>
                  <div className="pt-4 border-t border-[#F0EBE3] mt-4 flex items-center justify-between text-xs text-[#706456] group-hover:text-[#9E7B3B] font-medium tracking-wide">
                    <span>View Campaign Story</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Customer Testimonials */}
      <section className="py-20 bg-white border-b border-[#ECE6DE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-[0.3em] text-[#9E7B3B] font-semibold block mb-2">
              REAL BRIDAL MEMOIRS
            </span>
            <h2
              className="text-3xl sm:text-4xl font-display text-[#1A1816]"
              style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
            >
              Words from Ashrafi Brides
            </h2>
            <p className="text-[11px] text-[#7A6F62] mt-1 italic">
              Illustrative client memoirs reflecting actual boutique and international concierge experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="p-6 bg-[#FAF8F5] border border-[#E8E2D8] hover:border-[#9E7B3B]/60 flex flex-col justify-between shadow-2xs hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center gap-1 text-[#9E7B3B] mb-3">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span className="text-[11px] uppercase tracking-wider font-semibold">
                      {t.event}
                    </span>
                  </div>
                  <p className="text-xs text-[#52483D] leading-relaxed italic mb-4">
                    "{t.quote}"
                  </p>
                </div>

                <div className="pt-3 border-t border-[#EAE4DB]">
                  <h4 className="text-xs font-semibold text-[#1A1816]">{t.brideName}</h4>
                  <p className="text-[11px] text-[#706456]">{t.city}</p>
                  <p className="text-[10px] text-[#9E7B3B] font-medium mt-0.5">{t.outfit}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Official Social Media Channels */}
      <section className="py-16 bg-[#FAF8F5] border-b border-[#ECE6DE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-[#9E7B3B] font-semibold block mb-2">
            FOLLOW ASHRAFI ATELIER
          </span>
          <h2
            className="text-2xl sm:text-3xl font-display text-[#1A1816] mb-3"
            style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
          >
            Connect With Our Creative Journey
          </h2>
          <p className="text-xs text-[#706456] max-w-md mx-auto mb-8">
            Watch bridal embroidery behind-the-scenes, lehenga swirls, and runway previews on our official channels.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={BOUTIQUE_INFO.socialLinks.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-white border border-[#E0D8CB] hover:border-[#9E7B3B] text-xs font-semibold uppercase tracking-wider text-[#1A1816] flex items-center gap-2 transition-all shadow-2xs hover:bg-[#FAF8F5]"
            >
              <span>YouTube: @ashrafibridalstudio</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#9E7B3B]" />
            </a>

            <a
              href={BOUTIQUE_INFO.socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-white border border-[#E0D8CB] hover:border-[#9E7B3B] text-xs font-semibold uppercase tracking-wider text-[#1A1816] flex items-center gap-2 transition-all shadow-2xs hover:bg-[#FAF8F5]"
            >
              <span>Facebook: ASHRAFIBRIDALSTUDIO</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#9E7B3B]" />
            </a>

            <a
              href={BOUTIQUE_INFO.socialLinks.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-white border border-[#E0D8CB] hover:border-[#9E7B3B] text-xs font-semibold uppercase tracking-wider text-[#1A1816] flex items-center gap-2 transition-all shadow-2xs hover:bg-[#FAF8F5]"
            >
              <span>TikTok: @dresses.4.you</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#9E7B3B]" />
            </a>
          </div>
        </div>
      </section>

      {/* 9. Visit Our Boutique - Karachi Tariq Road Spotlight */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#FAF8F5] border border-[#E8E2D8] p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-sm">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#D4AF37]/50 text-[#9E7B3B] text-[11px] uppercase tracking-wider font-semibold shadow-2xs">
                <span>KARACHI FLAGSHIP SALON</span>
              </div>

              <h2
                className="text-3xl sm:text-4xl font-display text-[#1A1816]"
                style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
              >
                Visit Ashrafi Bridal Studio
              </h2>

              <p className="text-xs sm:text-sm text-[#5C5144] leading-relaxed max-w-xl">
                Experience the weight of pure brocades and the brilliance of real Austrian crystals in person. Our Tariq Road salon offers private bridal fitting rooms and personal consultations.
              </p>

              <div className="space-y-2.5 pt-2 text-xs text-[#52483D]">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#9E7B3B] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-[#1A1816]">Shop:</strong> {BOUTIQUE_INFO.shopNumber}
                    <br />
                    <span className="text-[#706456]">{BOUTIQUE_INFO.address}</span>
                  </span>
                </div>

                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-[#9E7B3B] shrink-0" />
                  <span>
                    <strong className="text-[#1A1816]">Operating Hours:</strong>{' '}
                    <span className="text-[#9E7B3B] font-semibold">{BOUTIQUE_INFO.openingHours}</span>
                  </span>
                </div>

                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#9E7B3B] shrink-0" />
                  <span>
                    <strong className="text-[#1A1816]">Direct Atelier Call:</strong>{' '}
                    <a
                      href={`tel:${BOUTIQUE_INFO.phone}`}
                      className="text-[#9E7B3B] hover:underline font-semibold"
                    >
                      {BOUTIQUE_INFO.phone}
                    </a>
                  </span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-3">
                <a
                  href={`tel:${BOUTIQUE_INFO.phone}`}
                  className="px-5 py-2.5 bg-[#1A1816] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#9E7B3B] flex items-center gap-2 shadow-2xs transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call 0333 3128869</span>
                </a>

                <a
                  href={BOUTIQUE_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-emerald-700 text-white text-xs uppercase tracking-widest font-semibold hover:bg-emerald-600 flex items-center gap-2 shadow-2xs transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp Concierge</span>
                </a>

                <a
                  href={BOUTIQUE_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-white border border-[#D4AF37]/50 text-[#1A1816] hover:border-[#1A1816] text-xs uppercase tracking-widest flex items-center gap-2 shadow-2xs transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#9E7B3B]" />
                  <span>Google Maps Directions</span>
                </a>
              </div>
            </div>

            {/* Direct WhatsApp Concierge Card */}
            <div className="lg:col-span-5 bg-white border border-[#E6DFD5] p-6 space-y-4 shadow-xs">
              <span className="text-[10px] uppercase tracking-widest text-[#9E7B3B] font-semibold block">
                DIRECT BRIDAL ASSISTANCE
              </span>
              <h3 className="text-xl font-serif text-[#1A1816] font-medium">Connect with Our Master Stylist</h3>
              <p className="text-xs text-[#706456]">
                Have questions about pricing, delivery schedules, or bespoke bridal embroidery? Our Tariq Road salon team is available directly on WhatsApp.
              </p>
              <a
                href={BOUTIQUE_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp: 0333 3128869</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
