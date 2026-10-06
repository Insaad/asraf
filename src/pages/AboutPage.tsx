import React from 'react';
import { useShop } from '../context/ShopContext';
import { BOUTIQUE_INFO } from '../data/products';
import { Sparkles, Scissors, MapPin, Clock, Award, ShieldCheck, ArrowRight } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { setCurrentRoute, openAppointmentModal } = useShop();

  return (
    <div className="min-h-screen bg-white text-[#1A1816]">
      {/* Editorial Header */}
      <section className="py-24 bg-[#FAF8F5] border-b border-[#ECE6DE] text-center">
        <div className="max-w-4xl mx-auto px-4">
          <span className="text-xs uppercase tracking-[0.35em] text-[#9E7B3B] font-semibold block mb-3">
            HERITAGE & CRAFTSMANSHIP
          </span>
          <h1
            className="text-4xl sm:text-6xl font-display font-medium text-[#1A1816] mb-6"
            style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
          >
            The House of Ashrafi Bridal Studio
          </h1>
          <p className="text-sm sm:text-base text-[#5C5144] max-w-2xl mx-auto leading-relaxed font-light">
            Rooted in Karachi's iconic fashion quarter on Tariq Road, preserving the sacred needlecraft of Mughal court dressmaking for the contemporary global Pakistani bride.
          </p>
        </div>
      </section>

      {/* Main Narrative Split */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#ECE6DE]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-[0.3em] text-[#9E7B3B] font-semibold">
              OUR ATELIER STORY
            </span>
            <h2
              className="text-3xl sm:text-4xl font-display text-[#1A1816]"
              style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
            >
              Where Ancient Karchob Needlecraft Meets Haute Couture
            </h2>
            <p className="text-xs sm:text-sm text-[#5C5144] leading-relaxed">
              Ashrafi Bridal Studio began with a single unwavering principle: a bride's wedding lehenga is not merely a dress; it is a sacred family heirloom that carries the emotional memory of one of life's most luminous thresholds.
            </p>
            <p className="text-xs sm:text-sm text-[#5C5144] leading-relaxed">
              Situated at GF-26 Saima Centre on Tariq Road, Karachi, our boutique and adjacent artisan workshop houses master craftsmen who have practiced the delicate arts of <em>dabka</em>, <em>naqshi</em>, <em>tilla</em>, and <em>resham</em> across generations. We refuse industrial shortcuts, selecting only heavy 80-gram raw silks, authentic Jamawar brocades, and shimmering French nets.
            </p>

            <div className="pt-4 border-t border-[#F0EBE3] grid grid-cols-2 gap-4 text-xs">
              <div>
                <strong className="text-[#1A1816] block mb-1">Authentic Karachi Atelier</strong>
                <span className="text-[#706456]">Every stitch executed on traditional wooden karchob frames.</span>
              </div>
              <div>
                <strong className="text-[#1A1816] block mb-1">Zero Mass Production</strong>
                <span className="text-[#706456]">Every bridal ensemble is individually cut and hand-finished.</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative border border-[#E8E2D8] p-3 bg-[#FAF8F5] shadow-sm">
              <img
                src="/images/nikah_ivory_couture_1791159230888.jpg"
                alt="Ashrafi Bridal Studio Heritage"
                className="w-full aspect-[4/3] object-cover object-top"
              />
              <div className="p-4 bg-white border-t border-[#EAE4DB] text-xs text-[#706456] flex justify-between items-center">
                <span>The Sacred Nikah Ivory Archive</span>
                <span className="text-[#9E7B3B] font-semibold">GF-26, Saima Centre, Karachi</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Pillars of Ashrafi */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#ECE6DE]">
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-[0.3em] text-[#9E7B3B] font-semibold block mb-2">
            ATELIER ETHOS
          </span>
          <h2
            className="text-3xl sm:text-4xl font-display text-[#1A1816]"
            style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
          >
            The Four Pillars of Ashrafi
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Pure Weaves Only',
              desc: 'We never compromise with polyester synthetic blends. Only pure 80-gram raw silk, organza, tissue, and Jamawar woven across Pakistani looms.',
              icon: Award,
            },
            {
              title: 'Master Artisans',
              desc: 'Generational karigars working with age-old techniques including zardozi, vasli, salma sitara, and gota patti.',
              icon: Scissors,
            },
            {
              title: 'Custom Anatomical Fit',
              desc: 'Tailored precisely around natural posture, posture height, and movement freedom, incorporating generous alteration margins.',
              icon: Sparkles,
            },
            {
              title: 'Insured Global Transit',
              desc: 'Bridal boxes are weather-sealed, packed in archival bridal pouches, and dispatched worldwide via insured express couriers.',
              icon: ShieldCheck,
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-6 bg-white border border-[#E8E2D8] hover:border-[#9E7B3B] transition-all shadow-2xs hover:shadow-xs flex flex-col justify-between"
            >
              <div>
                <item.icon className="w-6 h-6 text-[#9E7B3B] mb-4" />
                <h3
                  className="text-lg font-serif text-[#1A1816] mb-2 font-medium"
                  style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
                >
                  {item.title}
                </h3>
                <p className="text-xs text-[#706456] leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tariq Road Salon Invitation */}
      <section className="py-20 bg-[#FAF8F5]">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <span className="text-xs uppercase tracking-[0.35em] text-[#9E7B3B] font-semibold">
            TARIQ ROAD FLAGSHIP
          </span>
          <h2
            className="text-3xl sm:text-5xl font-display text-[#1A1816]"
            style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
          >
            Experience Our Bridal Salon in Karachi
          </h2>
          <p className="text-sm text-[#5C5144] max-w-xl mx-auto leading-relaxed">
            We welcome brides and families to our private salon at GF-26 Saima Centre on Main Tariq Road. Review fabric drapes, feel the weight of authentic zardozi, and discuss your bespoke dream.
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => openAppointmentModal('Atelier Visit Consultation')}
              className="px-8 py-3.5 bg-[#1A1816] hover:bg-[#9E7B3B] text-white font-semibold text-xs uppercase tracking-widest active:scale-95 transition-all shadow-xs"
            >
              Book Salon Appointment
            </button>
            <button
              onClick={() => setCurrentRoute('contact')}
              className="px-8 py-3.5 bg-white border border-[#D4AF37]/60 text-[#1A1816] hover:border-[#1A1816] font-semibold text-xs uppercase tracking-widest transition-all shadow-2xs"
            >
              View Location & Timings
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
