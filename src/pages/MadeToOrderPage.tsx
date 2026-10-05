import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { BOUTIQUE_INFO } from '../data/products';
import {
  Scissors,
  Sparkles,
  Palette,
  CheckCircle2,
  Calendar,
  MessageCircle,
  Clock,
  ShieldCheck,
  Send,
} from 'lucide-react';

export const MadeToOrderPage: React.FC = () => {
  const { openAppointmentModal, createWhatsAppLink } = useShop();

  const [clientName, setClientName] = useState('');
  const [phone, setPhone] = useState('');
  const [weddingDate, setWeddingDate] = useState('');
  const [eventType, setEventType] = useState('Barat Bridal');
  const [budgetRange, setBudgetRange] = useState('PKR 350,000 - 550,000');
  const [notes, setNotes] = useState('');
  const [formSent, setFormSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
  };

  const handleWhatsAppDirect = () => {
    const msg = `As-salamu alaykum Ashrafi Bridal Studio! I am looking to initiate a Made-to-Order bespoke bridal ensemble:
*Bride*: ${clientName || 'Bride'}
*Phone*: ${phone || 'Not specified'}
*Event*: ${eventType}
*Budget Range*: ${budgetRange}
*Target Date*: ${weddingDate || 'Upcoming Wedding'}
${notes ? `*Custom Requirements*: ${notes}\n` : ''}
Please connect me with your senior couture designer.`;

    window.open(createWhatsAppLink(msg), '_blank');
  };

  return (
    <div className="min-h-screen bg-white text-[#1A1816]">
      {/* 1. Hero */}
      <section className="relative py-24 sm:py-28 bg-[#FAF8F5] border-b border-[#ECE6DE] text-center overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
          <span className="text-xs uppercase tracking-[0.35em] text-[#9E7B3B] font-semibold block mb-3">
            THE ATELIER PRIVATE SERVICE
          </span>
          <h1
            className="text-4xl sm:text-6xl font-display font-medium text-[#1A1816] mb-6 leading-tight"
            style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
          >
            Bespoke Made-to-Order Couture
          </h1>
          <p className="text-sm sm:text-base text-[#5C5144] max-w-2xl mx-auto leading-relaxed font-light mb-8">
            An exclusive collaboration with our Karachi couturiers. Designed from scratch to your exact measurements, color dreams, and heirloom bridal aspirations.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => {
                document.getElementById('inquiry-form')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-3.5 bg-[#1A1816] hover:bg-[#9E7B3B] text-white font-semibold text-xs uppercase tracking-widest active:scale-95 transition-all shadow-xs"
            >
              Start Custom Bridal Order
            </button>
            <button
              onClick={() => openAppointmentModal('Made-to-Order Consultation')}
              className="px-8 py-3.5 bg-white border border-[#D4AF37]/60 text-[#1A1816] hover:border-[#1A1816] font-semibold text-xs uppercase tracking-widest transition-all shadow-2xs"
            >
              Book In-Person Salon Fitting
            </button>
          </div>
        </div>
      </section>

      {/* 2. The 6-Stage Couture Journey */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#ECE6DE]">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-[#9E7B3B] font-semibold block mb-2">
            ATELIER METHODOLOGY
          </span>
          <h2
            className="text-3xl sm:text-4xl font-display text-[#1A1816]"
            style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
          >
            The Journey of a Couture Bridal Ensemble
          </h2>
          <p className="text-xs sm:text-sm text-[#706456] mt-2">
            Every step is documented, measured, and verified with you before needle touches fabric.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              step: '01',
              title: 'Private Design Consultation',
              desc: 'Meet our head designer at GF-26 Saima Centre on Tariq Road or connect via private video appointment to discuss silhouettes, motifs, and event aesthetics.',
              icon: Scissors,
            },
            {
              step: '02',
              title: 'Custom Silhouette Sketches',
              desc: 'Detailed croquis sketches are produced capturing your bespoke lehenga flare, neckline drop, back drape, and sleeve finishing details.',
              icon: Palette,
            },
            {
              step: '03',
              title: 'Fabric Dyeing & Swatch Approval',
              desc: 'We custom-dye pure raw silks, Jamawars, and French nets to your exact shade reference, dispatching physical swatches for your approval.',
              icon: Sparkles,
            },
            {
              step: '04',
              title: 'Generational Karchob Embroidery',
              desc: 'Over 300 to 600 hours of painstaking hand needlecraft using antique dabka, tilla, cut-dana, Swarovski crystals, and real pearls.',
              icon: Clock,
            },
            {
              step: '05',
              title: 'Internal Architecture & Can-Can',
              desc: 'Constructed with multi-layered cotton-lined can-can skirts, reinforced boning, waist adjusters, and generous 3-inch internal seam allowances.',
              icon: ShieldCheck,
            },
            {
              step: '06',
              title: 'Fitting Verification & Delivery',
              desc: 'Final salon fitting in Karachi or tracked DHL/FedEx insured express courier worldwide in archival bridal dust covers.',
              icon: CheckCircle2,
            },
          ].map((item) => (
            <div
              key={item.step}
              className="p-8 bg-white border border-[#E8E2D8] hover:border-[#9E7B3B] transition-all shadow-2xs hover:shadow-sm group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-serif font-light text-[#9E7B3B]">
                    {item.step}
                  </span>
                  <div className="w-10 h-10 rounded-full bg-[#FAF8F5] border border-[#E6DFD5] flex items-center justify-center text-[#9E7B3B]">
                    <item.icon className="w-5 h-5" />
                  </div>
                </div>
                <h3
                  className="text-lg font-serif text-[#1A1816] group-hover:text-[#9E7B3B] transition-colors mb-2"
                  style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
                >
                  {item.title}
                </h3>
                <p className="text-xs text-[#706456] leading-relaxed">{item.desc}</p>
              </div>
              <div className="mt-6 pt-3 border-t border-[#F0EBE3] text-[10px] uppercase tracking-widest text-[#9E7B3B] font-semibold">
                Guaranteed Craftsmanship
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Bespoke Inquiry Form & WhatsApp Direct */}
      <section id="inquiry-form" className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF8F5] border border-[#E8E2D8] p-8 sm:p-12 shadow-sm">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs uppercase tracking-[0.3em] text-[#9E7B3B] font-semibold block mb-2">
              INITIATE YOUR CREATION
            </span>
            <h2
              className="text-3xl sm:text-4xl font-display text-[#1A1816]"
              style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
            >
              Bespoke Bridal Inquiry Form
            </h2>
            <p className="text-xs text-[#706456] mt-2">
              Provide your wedding dates and style aspirations. A senior Ashrafi bridal consultant will respond within 24 hours.
            </p>
          </div>

          {formSent ? (
            <div className="p-8 bg-white border border-[#9E7B3B]/40 text-center space-y-4 shadow-xs">
              <CheckCircle2 className="w-12 h-12 text-[#9E7B3B] mx-auto" />
              <h3 className="text-2xl font-serif text-[#1A1816]">Bespoke Inquiry Received</h3>
              <p className="text-xs text-[#706456] max-w-md mx-auto">
                Thank you, {clientName || 'valued bride'}. Our head stylist is reviewing your specifications and will connect directly via WhatsApp or telephone to coordinate your bridal sketch session.
              </p>
              <div className="pt-4 flex justify-center gap-4">
                <button
                  onClick={handleWhatsAppDirect}
                  className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white text-xs uppercase tracking-wider font-semibold flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Immediate WhatsApp Note</span>
                </button>
                <button
                  onClick={() => setFormSent(false)}
                  className="px-6 py-2.5 bg-white border border-[#E0D8CB] text-xs uppercase tracking-wider text-[#1A1816]"
                >
                  Edit Information
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#1A1816] font-semibold mb-2">
                    Bride's Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Ayesha Khan"
                    className="w-full bg-white border border-[#E0D8CB] text-sm text-[#1A1816] placeholder-[#8C7E70] px-4 py-3 focus:outline-none focus:border-[#9E7B3B] transition-colors shadow-2xs"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#1A1816] font-semibold mb-2">
                    WhatsApp Contact Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +92 333 1234567"
                    className="w-full bg-white border border-[#E0D8CB] text-sm text-[#1A1816] placeholder-[#8C7E70] px-4 py-3 focus:outline-none focus:border-[#9E7B3B] transition-colors shadow-2xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#1A1816] font-semibold mb-2">
                    Wedding / Ceremony Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={weddingDate}
                    onChange={(e) => setWeddingDate(e.target.value)}
                    className="w-full bg-white border border-[#E0D8CB] text-sm text-[#1A1816] px-4 py-3 focus:outline-none focus:border-[#9E7B3B] transition-colors shadow-2xs"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#1A1816] font-semibold mb-2">
                    Event Type
                  </label>
                  <select
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    className="w-full bg-white border border-[#E0D8CB] text-sm text-[#1A1816] px-4 py-3 focus:outline-none focus:border-[#9E7B3B] transition-colors shadow-2xs"
                  >
                    <option value="Barat Bridal Lehenga">Barat Bridal Lehenga</option>
                    <option value="Nikah Ivory Gown / Peshwas">Nikah Ivory Gown / Peshwas</option>
                    <option value="Walima Crystal Gown">Walima Crystal Gown</option>
                    <option value="Mehndi Festive Ensemble">Mehndi Festive Ensemble</option>
                    <option value="Farshi Gharara Heirloom">Farshi Gharara Heirloom</option>
                    <option value="Custom Bridal Saree">Custom Bridal Saree</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#1A1816] font-semibold mb-2">
                    Estimated Budget (PKR)
                  </label>
                  <select
                    value={budgetRange}
                    onChange={(e) => setBudgetRange(e.target.value)}
                    className="w-full bg-white border border-[#E0D8CB] text-sm text-[#1A1816] px-4 py-3 focus:outline-none focus:border-[#9E7B3B] transition-colors shadow-2xs"
                  >
                    <option value="PKR 250,000 - 350,000">PKR 250,000 - 350,000</option>
                    <option value="PKR 350,000 - 550,000">PKR 350,000 - 550,000</option>
                    <option value="PKR 550,000 - 800,000">PKR 550,000 - 800,000</option>
                    <option value="PKR 800,000+ (Imperial Couture)">PKR 800,000+ (Imperial Couture)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#1A1816] font-semibold mb-2">
                  Special Customization Notes & Color Desires
                </label>
                <textarea
                  rows={4}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Tell us about your preferred neckline, sleeve length, dupatta border width, favorite embroidery elements, or inspiration from our collection..."
                  className="w-full bg-white border border-[#E0D8CB] text-sm text-[#1A1816] placeholder-[#8C7E70] p-4 focus:outline-none focus:border-[#9E7B3B] transition-colors shadow-2xs"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 bg-[#1A1816] hover:bg-[#9E7B3B] text-white font-semibold text-xs uppercase tracking-widest active:scale-95 transition-all flex items-center justify-center gap-2 shadow-xs"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Bespoke Request</span>
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppDirect}
                  className="w-full sm:w-auto px-8 py-3.5 bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-xs uppercase tracking-widest active:scale-95 transition-all flex items-center justify-center gap-2 shadow-2xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat Direct on WhatsApp (0333 3128869)</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
