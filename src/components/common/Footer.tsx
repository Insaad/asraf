import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { BOUTIQUE_INFO } from '../../data/products';
import { PageRoute } from '../../types';
import { MapPin, Phone, Clock, Mail, CheckCircle2, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentRoute } = useShop();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
    }, 3000);
  };

  const navigateTo = (route: PageRoute) => {
    setCurrentRoute(route);
  };

  return (
    <footer className="bg-[#FAF7F2] text-[#2C2722] border-t border-[#E8E1D5]">
      {/* Newsletter & Atelier Promise Banner */}
      <div className="border-b border-[#E8E1D5] bg-[#F4EFE6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <span className="text-[11px] uppercase tracking-[0.3em] text-[#93733A] font-semibold">
                ASHRAFI COUTURE PRIVILEGE
              </span>
              <h3 className="text-2xl sm:text-3xl font-display text-[#1E1B18] mt-2 mb-3">
                Be the First to Preview New Bridal Masterpieces
              </h3>
              <p className="text-sm text-[#6E6050] max-w-xl leading-relaxed">
                Receive private invitations to seasonal trunk shows, lookbook releases, and exclusive styling sessions at our Tariq Road salon.
              </p>
            </div>

            <div className="lg:col-span-5">
              {subscribed ? (
                <div className="p-4 bg-white border border-[#93733A]/40 flex items-center gap-3 text-sm text-[#735824] shadow-xs">
                  <CheckCircle2 className="w-5 h-5 text-[#93733A] shrink-0" />
                  <span>Thank you. You have been added to the Ashrafi Private Bridal Register.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C7D6D]" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full bg-white border border-[#D6CDBC] text-sm text-[#1E1B18] placeholder-[#998B79] pl-10 pr-4 py-3 focus:outline-none focus:border-[#93733A] transition-colors"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#1E1B18] hover:bg-[#93733A] text-white font-semibold text-xs uppercase tracking-widest active:scale-95 transition-all flex items-center justify-center gap-2 whitespace-nowrap shadow-xs"
                  >
                    <span>Subscribe</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Boutique Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Column 1: Brand & Heritage */}
          <div className="lg:col-span-2">
            <span
              className="text-2xl font-display tracking-[0.2em] uppercase font-bold text-[#1E1B18]"
              style={{ fontFamily: 'Cinzel, serif' }}
            >
              ASHRAFI
            </span>
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#93733A] font-semibold mt-1 mb-4">
              BRIDAL STUDIO · KARACHI
            </p>
            <p className="text-sm text-[#6E6050] leading-relaxed max-w-sm mb-6">
              Embodying the timeless grandeur of Pakistani bridal couture. Handcrafted with generational karchob zardozi, authentic dabka, and pure weaves for the modern heirloom bride.
            </p>

            {/* Official Social Links */}
            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-widest text-[#93733A] block font-semibold">
                Official Channels
              </span>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={BOUTIQUE_INFO.socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-white border border-[#E0D8CB] hover:border-[#93733A] text-xs text-[#2C2722] hover:text-[#93733A] transition-all shadow-2xs"
                >
                  YouTube
                </a>
                <a
                  href={BOUTIQUE_INFO.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-white border border-[#E0D8CB] hover:border-[#93733A] text-xs text-[#2C2722] hover:text-[#93733A] transition-all shadow-2xs"
                >
                  Facebook
                </a>
                <a
                  href={BOUTIQUE_INFO.socialLinks.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-white border border-[#E0D8CB] hover:border-[#93733A] text-xs text-[#2C2722] hover:text-[#93733A] transition-all shadow-2xs"
                >
                  TikTok
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Bridal Collections */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#93733A] font-semibold mb-4">
              Bridal Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-[#635547]">
              <li>
                <button
                  onClick={() => navigateTo('nikah')}
                  className="hover:text-[#93733A] transition-colors"
                >
                  Nikah Collection (Ivory & Gold)
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('barat')}
                  className="hover:text-[#93733A] transition-colors"
                >
                  Barat Collection (Crimson & Velvet)
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('mehndi')}
                  className="hover:text-[#93733A] transition-colors"
                >
                  Mehndi Collection (Emerald & Saffron)
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('walima')}
                  className="hover:text-[#93733A] transition-colors"
                >
                  Walima Collection (Pastels & Gowns)
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('made-to-order')}
                  className="hover:text-[#93733A] transition-colors"
                >
                  Made-to-Order Couture
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('shop-all')}
                  className="hover:text-[#93733A] transition-colors"
                >
                  View Complete Catalog
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Silhouettes & Occasions */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#93733A] font-semibold mb-4">
              Silhouettes
            </h4>
            <ul className="space-y-2.5 text-xs text-[#635547]">
              <li>
                <button
                  onClick={() => navigateTo('sarees')}
                  className="hover:text-[#93733A] transition-colors"
                >
                  Luxury Draped Sarees
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('sharara-gharara')}
                  className="hover:text-[#93733A] transition-colors"
                >
                  Sharara & Farshi Gharara
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('frocks-maxis')}
                  className="hover:text-[#93733A] transition-colors"
                >
                  Bridal Peshwas & Maxis
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('party-wear')}
                  className="hover:text-[#93733A] transition-colors"
                >
                  Party Wear & Formals
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('lookbook')}
                  className="hover:text-[#93733A] transition-colors"
                >
                  Campaign Lookbook 2026
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('about')}
                  className="hover:text-[#93733A] transition-colors"
                >
                  Karachi Atelier Craftsmanship
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Karachi Boutique Info */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#93733A] font-semibold mb-4">
              Karachi Boutique
            </h4>
            <div className="space-y-3 text-xs text-[#635547]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#93733A] shrink-0 mt-0.5" />
                <span>
                  {BOUTIQUE_INFO.shopNumber}
                  <br />
                  <span className="text-[#877868]">{BOUTIQUE_INFO.address}</span>
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#93733A] shrink-0" />
                <span className="text-[#1E1B18] font-semibold">{BOUTIQUE_INFO.openingHours}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#93733A] shrink-0" />
                <a
                  href={`tel:${BOUTIQUE_INFO.phone}`}
                  className="hover:text-[#93733A] transition-colors text-[#1E1B18] font-medium"
                >
                  {BOUTIQUE_INFO.phone}
                </a>
              </div>

              <div className="pt-2">
                <a
                  href={BOUTIQUE_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-[#D6CDBC] hover:border-[#93733A] text-xs text-[#735824] transition-colors shadow-2xs font-medium"
                >
                  <span>Chat on WhatsApp</span>
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="mt-14 pt-8 border-t border-[#E8E1D5] flex flex-col md:flex-row items-center justify-between text-[11px] text-[#877868] gap-4">
          <p>© {new Date().getFullYear()} Ashrafi Bridal Studio. All Rights Reserved. Karachi, Pakistan.</p>
          <div className="flex items-center gap-6">
            <span>Illustrative Sample Catalogue & Pricing</span>
            <span>·</span>
            <span>Handcrafted in Karachi</span>
            <span>·</span>
            <span>Worldwide Shipping</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
