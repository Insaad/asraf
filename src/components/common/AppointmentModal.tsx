import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { BOUTIQUE_INFO } from '../../data/products';
import { X, Calendar, Clock, MapPin, Video, CheckCircle2, MessageCircle } from 'lucide-react';

export const AppointmentModal: React.FC = () => {
  const { isAppointmentOpen, closeAppointmentModal, appointmentPrefill, createWhatsAppLink } =
    useShop();

  const [brideName, setBrideName] = useState('');
  const [phone, setPhone] = useState('');
  const [weddingDate, setWeddingDate] = useState('');
  const [eventType, setEventType] = useState('Barat');
  const [consultationType, setConsultationType] = useState<'In-Person' | 'Virtual'>('In-Person');
  const [preferredTime, setPreferredTime] = useState('3:00 PM');
  const [submitted, setSubmitted] = useState(false);

  if (!isAppointmentOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleWhatsAppBooking = () => {
    const msg = `As-salamu alaykum Ashrafi Bridal Studio! I would like to book a Personalized Bridal Consultation:
*Bride Name*: ${brideName}
*Phone / WhatsApp*: ${phone}
*Wedding Date*: ${weddingDate}
*Event*: ${eventType}
*Consultation Mode*: ${consultationType === 'In-Person' ? 'In-Person at Tariq Road Boutique' : 'Worldwide Virtual Video Call'}
*Preferred Time*: ${preferredTime}
${appointmentPrefill ? `*Details/Inquiry*: ${appointmentPrefill}\n` : ''}
Please confirm availability.`;

    window.open(createWhatsAppLink(msg), '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white border border-[#E2DBD1] text-[#1E1B18] w-full max-w-lg p-6 sm:p-8 shadow-2xl relative">
        <button
          onClick={closeAppointmentModal}
          className="absolute top-4 right-4 p-2 text-[#7A6E62] hover:text-[#1E1B18] transition-colors"
          aria-label="Close Appointment Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="text-center mb-6">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#93733A] font-semibold">
                ASHRAFI HAUTE COUTURE
              </span>
              <h3
                className="text-2xl font-serif text-[#1E1B18] mt-1 font-semibold"
                style={{ fontFamily: 'Cinzel, serif' }}
              >
                Book Bridal Consultation
              </h3>
              <p className="text-xs text-[#6B5E50] mt-1">
                One-on-one session with our master couturiers to design your bespoke wedding attire.
              </p>
            </div>

            {/* Atelier hours notice */}
            <div className="mb-5 p-3 bg-[#FAF7F2] border border-[#E8E1D5] text-xs text-[#5C4A2E] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#93733A]" />
                <span>Atelier Hours: {BOUTIQUE_INFO.openingHours}</span>
              </div>
              <span className="text-[#8C7A68] text-[11px]">Tariq Road, Karachi</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* Consultation Type Selector */}
              <div>
                <label className="text-[#5C5042] block mb-1.5 uppercase tracking-wider text-[11px] font-semibold">
                  Consultation Format
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setConsultationType('In-Person')}
                    className={`p-3 border text-left flex items-start gap-2.5 transition-colors ${
                      consultationType === 'In-Person'
                        ? 'border-[#93733A] bg-[#F7F3EB] text-[#1E1B18]'
                        : 'border-[#D6CDBC] text-[#6E6152] bg-white'
                    }`}
                  >
                    <MapPin className="w-4 h-4 text-[#93733A] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold block text-xs">Karachi Salon</span>
                      <span className="text-[10px] text-[#7A6E62] block">Saima Centre, Tariq Rd</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setConsultationType('Virtual')}
                    className={`p-3 border text-left flex items-start gap-2.5 transition-colors ${
                      consultationType === 'Virtual'
                        ? 'border-[#93733A] bg-[#F7F3EB] text-[#1E1B18]'
                        : 'border-[#D6CDBC] text-[#6E6152] bg-white'
                    }`}
                  >
                    <Video className="w-4 h-4 text-[#93733A] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold block text-xs">Virtual Video Call</span>
                      <span className="text-[10px] text-[#7A6E62] block">Worldwide WhatsApp / Zoom</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Bride Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[#5C5042] block mb-1 uppercase tracking-wider text-[11px] font-medium">
                    Bride's Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={brideName}
                    onChange={(e) => setBrideName(e.target.value)}
                    placeholder="e.g. Sarah Mansoor"
                    className="w-full bg-[#FAF8F5] border border-[#D6CDBC] p-2.5 text-[#1E1B18] focus:outline-none focus:border-[#93733A]"
                  />
                </div>
                <div>
                  <label className="text-[#5C5042] block mb-1 uppercase tracking-wider text-[11px] font-medium">
                    WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0333 1234567 or intl code"
                    className="w-full bg-[#FAF8F5] border border-[#D6CDBC] p-2.5 text-[#1E1B18] focus:outline-none focus:border-[#93733A]"
                  />
                </div>
              </div>

              {/* Event Type & Wedding Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[#5C5042] block mb-1 uppercase tracking-wider text-[11px] font-medium">
                    Occasion
                  </label>
                  <select
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-[#D6CDBC] p-2.5 text-[#1E1B18] focus:outline-none focus:border-[#93733A]"
                  >
                    <option value="Barat">Barat Bridal</option>
                    <option value="Nikah">Nikah Ceremony</option>
                    <option value="Walima">Walima Reception</option>
                    <option value="Mehndi">Mehndi Celebration</option>
                    <option value="Trousseau / Multiple Events">Complete Wedding Trousseau</option>
                  </select>
                </div>
                <div>
                  <label className="text-[#5C5042] block mb-1 uppercase tracking-wider text-[11px] font-medium">
                    Approx. Wedding Date
                  </label>
                  <input
                    type="date"
                    value={weddingDate}
                    onChange={(e) => setWeddingDate(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-[#D6CDBC] p-2.5 text-[#1E1B18] focus:outline-none focus:border-[#93733A]"
                  />
                </div>
              </div>

              {/* Preferred Slot */}
              <div>
                <label className="text-[#5C5042] block mb-1 uppercase tracking-wider text-[11px] font-semibold">
                  Preferred Time Slot (After 2:00 PM)
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {['2:30 PM', '4:00 PM', '6:00 PM', '8:00 PM'].map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setPreferredTime(time)}
                      className={`py-2 text-center border transition-colors ${
                        preferredTime === time
                          ? 'border-[#93733A] bg-[#F7F3EB] text-[#1E1B18] font-bold'
                          : 'border-[#D6CDBC] text-[#6E6152] bg-white'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#1E1B18] hover:bg-[#93733A] text-white font-semibold uppercase tracking-widest text-xs active:scale-98 transition-all flex items-center justify-center gap-2 shadow-xs"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Request Bridal Appointment</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 mx-auto rounded-full bg-emerald-50 border border-emerald-500/50 flex items-center justify-center text-emerald-600">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest text-[#93733A] font-semibold">
                Appointment Requested
              </span>
              <h3 className="text-2xl font-serif text-[#1E1B18] mt-1 font-semibold">
                We Look Forward to Welcoming You, {brideName}
              </h3>
              <p className="text-xs text-[#6B5E50] mt-2 leading-relaxed max-w-sm mx-auto">
                Your consultation request has been reserved for {eventType} at {preferredTime} ({consultationType}).
              </p>
            </div>

            <div className="pt-2 space-y-2">
              <button
                onClick={handleWhatsAppBooking}
                className="w-full py-3 bg-emerald-800 hover:bg-emerald-700 text-white font-semibold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-colors shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Confirm Instantly on WhatsApp</span>
              </button>

              <button
                onClick={closeAppointmentModal}
                className="w-full py-2 border border-[#D6CDBC] text-xs text-[#6B5E50] hover:text-[#1E1B18] font-medium"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
