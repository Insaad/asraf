import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { LOOKBOOK_STORIES, BOUTIQUE_INFO } from '../data/products';
import { Play, MessageCircle, ExternalLink, Sparkles, ArrowRight } from 'lucide-react';

export const LookbookPage: React.FC = () => {
  const { openAppointmentModal, createWhatsAppLink, setCurrentRoute } = useShop();
  const [activeStory, setActiveStory] = useState(LOOKBOOK_STORIES[0]);
  const [showVideoNotice, setShowVideoNotice] = useState(false);

  const handleInquireLook = (lookName: string) => {
    const msg = `As-salamu alaykum Ashrafi Bridal Studio! I am admiring the editorial look "${lookName}" in your 2026 Lookbook. Can you please share pricing and custom creation details?`;
    window.open(createWhatsAppLink(msg), '_blank');
  };

  return (
    <div className="min-h-screen bg-white text-[#1A1816]">
      {/* Editorial Header */}
      <section className="py-24 bg-[#FAF8F5] border-b border-[#ECE6DE] text-center">
        <div className="max-w-4xl mx-auto px-4">
          <span className="text-xs uppercase tracking-[0.35em] text-[#9E7B3B] font-semibold block mb-3">
            CAMPAIGN 2026
          </span>
          <h1
            className="text-4xl sm:text-6xl font-display font-medium text-[#1A1816] mb-6"
            style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
          >
            The Ashrafi Editorial Lookbook
          </h1>
          <p className="text-sm sm:text-base text-[#5C5144] max-w-2xl mx-auto leading-relaxed font-light">
            A visual symphony of traditional Pakistani bridal silhouettes, illuminated under high-fashion editorial lighting.
          </p>
        </div>
      </section>

      {/* Featured Campaign Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-[#ECE6DE]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-8 overflow-hidden bg-[#FAF8F5] border border-[#E8E2D8] relative aspect-[16/9] group shadow-sm">
            <img
              src={activeStory.image}
              alt={activeStory.title}
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-103"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#E6D7B8] bg-black/60 px-2.5 py-1 border border-white/20 font-semibold">
                  {activeStory.tag}
                </span>
                <h2
                  className="text-2xl sm:text-3xl font-serif text-white mt-2 font-medium"
                  style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
                >
                  {activeStory.title}
                </h2>
                <p className="text-xs text-stone-200 mt-0.5">{activeStory.subtitle}</p>
              </div>

              <button
                onClick={() => handleInquireLook(activeStory.title)}
                className="px-5 py-2.5 bg-white hover:bg-[#9E7B3B] hover:text-white text-[#1A1816] text-xs uppercase tracking-widest font-semibold transition-all shadow-md flex items-center gap-2 whitespace-nowrap"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>Inquire This Look</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-[#9E7B3B] font-semibold block mb-1">
                EDITORIAL NOTE
              </span>
              <h3 className="text-2xl font-serif text-[#1A1816] mb-3">
                {activeStory.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#5C5144] leading-relaxed">
                {activeStory.description}
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <span className="text-xs uppercase tracking-wider text-[#1A1816] font-semibold block">
                Select Campaign Chapter:
              </span>
              <div className="grid grid-cols-2 gap-2">
                {LOOKBOOK_STORIES.map((story) => (
                  <button
                    key={story.id}
                    onClick={() => setActiveStory(story)}
                    className={`p-2.5 text-left border transition-all text-xs ${
                      activeStory.id === story.id
                        ? 'border-[#9E7B3B] bg-[#FAF8F5] text-[#1A1816] font-semibold shadow-2xs'
                        : 'border-[#E8E2D8] bg-white text-[#706456] hover:text-[#1A1816]'
                    }`}
                  >
                    <span className="block font-medium truncate">{story.title}</span>
                    <span className="text-[10px] text-[#9E7B3B] uppercase tracking-wider">{story.tag}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#ECE6DE] flex flex-col gap-3">
              <button
                onClick={() => setCurrentRoute('shop-all')}
                className="w-full py-3 bg-[#1A1816] hover:bg-[#9E7B3B] text-white font-semibold text-xs uppercase tracking-widest transition-all shadow-xs flex items-center justify-center gap-2"
              >
                <span>Shop Bridal Collection</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => openAppointmentModal(`Lookbook Inspiration: ${activeStory.title}`)}
                className="w-full py-3 bg-white border border-[#D4AF37]/60 text-[#1A1816] hover:border-[#1A1816] font-semibold text-xs uppercase tracking-widest transition-all shadow-2xs"
              >
                Book Bridal Fitting
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Campaign Gallery Stories */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#ECE6DE]">
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-[0.3em] text-[#9E7B3B] font-semibold block mb-2">
            HIGH EDITORIAL SERIES
          </span>
          <h2
            className="text-3xl sm:text-4xl font-display text-[#1A1816]"
            style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
          >
            The Four Chapters of Bridal Elegance
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {LOOKBOOK_STORIES.map((story) => (
            <div
              key={story.id}
              className="bg-white border border-[#E8E2D8] hover:border-[#9E7B3B] transition-all overflow-hidden flex flex-col group shadow-2xs hover:shadow-md"
            >
              <div className="aspect-[16/10] overflow-hidden bg-[#FAF8F5] relative">
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 text-[10px] tracking-widest uppercase bg-white/90 backdrop-blur-xs text-[#1A1816] px-3 py-1 border border-[#E0D8CB] font-semibold shadow-2xs">
                  {story.tag}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3
                    className="text-2xl font-serif text-[#1A1816] group-hover:text-[#9E7B3B] transition-colors mb-2"
                    style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
                  >
                    {story.title}
                  </h3>
                  <p className="text-xs text-[#9E7B3B] font-semibold uppercase tracking-wider mb-3">
                    {story.subtitle}
                  </p>
                  <p className="text-xs sm:text-sm text-[#5C5144] leading-relaxed">
                    {story.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#F0EBE3] flex items-center justify-between">
                  <button
                    onClick={() => handleInquireLook(story.title)}
                    className="text-xs text-[#9E7B3B] hover:underline font-semibold flex items-center gap-1.5"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Inquire this look on WhatsApp</span>
                  </button>

                  <button
                    onClick={() => setActiveStory(story)}
                    className="text-xs text-[#706456] hover:text-[#1A1816] font-medium"
                  >
                    Spotlight Story ↑
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Official YouTube Video Showcase */}
      <section className="py-20 bg-[#FAF8F5]">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <span className="text-xs uppercase tracking-[0.35em] text-[#9E7B3B] font-semibold">
            OFFICIAL VIDEO SHOWCASE
          </span>
          <h2
            className="text-3xl sm:text-4xl font-display text-[#1A1816]"
            style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
          >
            Watch the Craft in Motion
          </h2>
          <p className="text-sm text-[#5C5144] max-w-xl mx-auto leading-relaxed">
            Witness the intricate play of light upon hand-needled dabka and crystal embellishments on our official YouTube and social channels.
          </p>

          <div className="relative border border-[#E8E2D8] bg-white p-4 max-w-2xl mx-auto shadow-sm">
            <div className="aspect-video bg-[#FAF8F5] relative flex items-center justify-center overflow-hidden group">
              <img
                src="/images/hero_bridal_editorial_1791159212402.jpg"
                alt="Ashrafi Bridal Studio Video Preview"
                className="w-full h-full object-cover filter brightness-90 group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />

              <a
                href={BOUTIQUE_INFO.socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-16 h-16 rounded-full bg-white/90 hover:bg-white text-red-600 flex items-center justify-center shadow-lg transition-transform hover:scale-110 relative z-10"
                aria-label="Watch on YouTube"
              >
                <Play className="w-7 h-7 fill-current ml-1" />
              </a>
            </div>

            <div className="p-4 bg-white text-xs text-[#706456] flex items-center justify-between">
              <span>Channel: <strong>@ashrafibridalstudio</strong></span>
              <a
                href={BOUTIQUE_INFO.socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#9E7B3B] hover:underline font-semibold flex items-center gap-1"
              >
                <span>Open YouTube Channel</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
