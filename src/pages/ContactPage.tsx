import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { BOUTIQUE_INFO } from '../data/products';
import {
  MapPin,
  Phone,
  Clock,
  MessageCircle,
  Mail,
  Send,
  CheckCircle2,
  Calendar,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { openAppointmentModal, createWhatsAppLink } = useShop();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Bridal Dress Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleWhatsAppSend = () => {
    const msg = `As-salamu alaykum Ashrafi Bridal Studio!
*Name*: ${name || 'Client'}
*Phone*: ${phone || 'Not specified'}
*Subject*: ${subject}
*Message*: ${message || 'I would like to inquire about bridal dresses and atelier appointments.'}`;

    window.open(createWhatsAppLink(msg), '_blank');
  };

  return (
    <div className="min-h-screen bg-white text-[#1A1816]">
      {/* Header */}
      <section className="py-24 bg-[#FAF8F5] border-b border-[#ECE6DE] text-center">
        <div className="max-w-4xl mx-auto px-4">
          <span className="text-xs uppercase tracking-[0.35em] text-[#9E7B3B] font-semibold block mb-3">
            KARACHI BOUTIQUE & CONCIERGE
          </span>
          <h1
            className="text-4xl sm:text-6xl font-display font-medium text-[#1A1816] mb-6"
            style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
          >
            Visit Our Atelier
          </h1>
          <p className="text-sm sm:text-base text-[#5C5144] max-w-2xl mx-auto leading-relaxed font-light">
            Conveniently located in Saima Centre on Karachi's bustling Main Tariq Road. Private fitting rooms and bespoke bridal consultations await.
          </p>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#ECE6DE]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Direct Atelier Details */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-[#9E7B3B] font-semibold block mb-2">
                FLAGSHIP BOUTIQUE
              </span>
              <h2
                className="text-2xl sm:text-3xl font-display text-[#1A1816]"
                style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
              >
                Ashrafi Bridal Studio
              </h2>
              <p className="text-xs text-[#706456] mt-2 leading-relaxed">
                Specializing in luxury Pakistani bridal lehengas, bespoke Barat, Nikah, and Mehndi couture with international insured express shipping.
              </p>
            </div>

            {/* Structured Location Cards */}
            <div className="space-y-4 text-xs">
              {/* Address card */}
              <div className="p-5 bg-[#FAF8F5] border border-[#E8E2D8] flex gap-4 items-start shadow-2xs">
                <MapPin className="w-5 h-5 text-[#9E7B3B] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="font-semibold text-sm text-[#1A1816]">Boutique Location</h4>
                  <p className="text-[#5C5144]">
                    <strong>Shop:</strong> {BOUTIQUE_INFO.shopNumber}
                  </p>
                  <p className="text-[#706456]">
                    <strong>Address:</strong> {BOUTIQUE_INFO.address}
                  </p>
                  <a
                    href={BOUTIQUE_INFO.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#9E7B3B] font-semibold hover:underline mt-2 pt-2 border-t border-[#EAE4DB] w-full"
                  >
                    <span>View on Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Operating Hours card */}
              <div className="p-5 bg-[#FAF8F5] border border-[#E8E2D8] flex gap-4 items-start shadow-2xs">
                <Clock className="w-5 h-5 text-[#9E7B3B] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-sm text-[#1A1816]">Operating Hours</h4>
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] uppercase font-semibold">
                      Open Today
                    </span>
                  </div>
                  <p className="text-[#5C5144]">
                    <strong>Salon Opening:</strong> {BOUTIQUE_INFO.openingHours}
                  </p>
                  <p className="text-[#706456]">
                    Monday through Saturday. Walk-ins welcome; private fitting appointments recommended for bridal parties.
                  </p>
                </div>
              </div>

              {/* Contact Telephone card */}
              <div className="p-5 bg-[#FAF8F5] border border-[#E8E2D8] flex gap-4 items-start shadow-2xs">
                <Phone className="w-5 h-5 text-[#9E7B3B] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="font-semibold text-sm text-[#1A1816]">Direct Atelier Contacts</h4>
                  <p className="text-[#5C5144]">
                    Local Phone: <a href={`tel:${BOUTIQUE_INFO.phone}`} className="text-[#9E7B3B] font-semibold hover:underline">{BOUTIQUE_INFO.phone}</a>
                  </p>
                  <p className="text-[#5C5144]">
                    International / WhatsApp: <a href={BOUTIQUE_INFO.whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-emerald-700 font-semibold hover:underline">{BOUTIQUE_INFO.phoneIntl}</a>
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <a
                href={BOUTIQUE_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-2xs transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Concierge</span>
              </a>

              <button
                onClick={() => openAppointmentModal()}
                className="flex-1 py-3 px-4 bg-[#1A1816] hover:bg-[#9E7B3B] text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-2xs transition-colors"
              >
                <Calendar className="w-4 h-4 text-[#E6D7B8]" />
                <span>Book Fitting</span>
              </button>
            </div>
          </div>

          {/* Right Column: Direct Message Form */}
          <div className="lg:col-span-7 bg-[#FAF8F5] border border-[#E8E2D8] p-8 sm:p-10 shadow-sm">
            <span className="text-xs uppercase tracking-[0.3em] text-[#9E7B3B] font-semibold block mb-2">
              CLIENT DIRECT INQUIRY
            </span>
            <h3
              className="text-2xl sm:text-3xl font-display text-[#1A1816] mb-2"
              style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
            >
              Send an Atelier Inquiry
            </h3>
            <p className="text-xs text-[#706456] mb-8">
              Fill in your questions regarding bridal lehengas, stitched formals, custom color dying, or pricing.
            </p>

            {submitted ? (
              <div className="p-8 bg-white border border-[#9E7B3B]/40 text-center space-y-4 shadow-xs">
                <CheckCircle2 className="w-12 h-12 text-[#9E7B3B] mx-auto" />
                <h4 className="text-xl font-serif text-[#1A1816]">Inquiry Sent Successfully</h4>
                <p className="text-xs text-[#706456] max-w-sm mx-auto">
                  Thank you, {name || 'valued customer'}. Our bridal desk at Tariq Road has received your message and will respond promptly.
                </p>
                <div className="pt-4 flex justify-center gap-3">
                  <button
                    onClick={handleWhatsAppSend}
                    className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white text-xs uppercase tracking-wider font-semibold flex items-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Copy to WhatsApp</span>
                  </button>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 bg-white border border-[#E0D8CB] text-xs uppercase tracking-wider text-[#1A1816]"
                  >
                    Send Another
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#1A1816] font-semibold mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Fatima Zahra"
                      className="w-full bg-white border border-[#E0D8CB] text-sm text-[#1A1816] placeholder-[#8C7E70] px-4 py-2.5 focus:outline-none focus:border-[#9E7B3B] shadow-2xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#1A1816] font-semibold mb-1.5">
                      WhatsApp / Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 0333 1234567"
                      className="w-full bg-white border border-[#E0D8CB] text-sm text-[#1A1816] placeholder-[#8C7E70] px-4 py-2.5 focus:outline-none focus:border-[#9E7B3B] shadow-2xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#1A1816] font-semibold mb-1.5">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. fatima@example.com"
                      className="w-full bg-white border border-[#E0D8CB] text-sm text-[#1A1816] placeholder-[#8C7E70] px-4 py-2.5 focus:outline-none focus:border-[#9E7B3B] shadow-2xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#1A1816] font-semibold mb-1.5">
                      Inquiry Category
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full bg-white border border-[#E0D8CB] text-sm text-[#1A1816] px-4 py-2.5 focus:outline-none focus:border-[#9E7B3B] shadow-2xs"
                    >
                      <option value="Bridal Dress Inquiry">Bridal Dress Inquiry</option>
                      <option value="Made-to-Order Customization">Made-to-Order Customization</option>
                      <option value="Stitched / Unstitched Stock Check">Stitched / Unstitched Stock Check</option>
                      <option value="International Worldwide Delivery">International Worldwide Delivery</option>
                      <option value="Salon Appointment Booking">Salon Appointment Booking</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#1A1816] font-semibold mb-1.5">
                    Your Message / Specific Requirements *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe the dress, color palette, wedding ceremony date, or custom embroidery questions..."
                    className="w-full bg-white border border-[#E0D8CB] text-sm text-[#1A1816] placeholder-[#8C7E70] p-4 focus:outline-none focus:border-[#9E7B3B] shadow-2xs"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-7 py-3 bg-[#1A1816] hover:bg-[#9E7B3B] text-white font-semibold text-xs uppercase tracking-widest active:scale-95 transition-all flex items-center justify-center gap-2 shadow-xs"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Atelier Inquiry</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleWhatsAppSend}
                    className="w-full sm:w-auto px-7 py-3 bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-xs uppercase tracking-widest active:scale-95 transition-all flex items-center justify-center gap-2 shadow-2xs"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Inquire via WhatsApp</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
