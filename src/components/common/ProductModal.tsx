import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import {
  X,
  Heart,
  MessageCircle,
  Sparkles,
  Scissors,
  Clock,
  ShieldCheck,
  Phone,
} from 'lucide-react';

export const ProductModal: React.FC = () => {
  const {
    activeProduct,
    closeProductModal,
    toggleWishlist,
    isInWishlist,
    formatPKR,
    createWhatsAppLink,
  } = useShop();

  const [selectedImage, setSelectedImage] = useState<string>('');

  if (!activeProduct) return null;

  const currentImage = selectedImage || activeProduct.image;
  const inWishlist = isInWishlist(activeProduct.id);
  const images = [activeProduct.image, activeProduct.secondaryImage].filter(Boolean) as string[];

  const handlePlaceOrderByWhatsApp = () => {
    const msg = `As-salamu alaykum Ashrafi Bridal Studio! I would like to place an order for:

*Ensemble*: ${activeProduct.name} (${activeProduct.categoryName})
*Price*: ${formatPKR(activeProduct.price)}
*Fabric & Details*: ${activeProduct.fabric}

Please provide booking availability, production timeline, and payment instructions.`;

    window.open(createWhatsAppLink(msg), '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white border border-[#E8E2D8] text-[#1A1816] w-full max-w-4xl max-h-[92vh] overflow-y-auto shadow-2xl relative flex flex-col md:flex-row animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={closeProductModal}
          className="absolute top-4 right-4 z-20 p-2.5 bg-white/95 text-[#1A1816] hover:text-[#9E7B3B] transition-colors border border-[#E0D8CB] shadow-xs rounded-full"
          aria-label="Close Product Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Image Gallery */}
        <div className="md:w-1/2 bg-[#FAF8F5] p-6 flex flex-col items-center justify-between border-b md:border-b-0 md:border-r border-[#ECE6DE]">
          <div className="relative aspect-[3/4] w-full overflow-hidden bg-white shadow-xs">
            <img
              src={currentImage}
              alt={activeProduct.name}
              className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute top-3 left-3 px-2.5 py-1 text-[10px] tracking-widest uppercase bg-white/95 text-[#1A1816] border border-[#E0D8CB] font-semibold shadow-2xs">
              {activeProduct.status}
            </div>
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-3 mt-4 w-full justify-center">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-16 h-20 border overflow-hidden transition-all bg-white ${
                    (selectedImage || activeProduct.image) === img
                      ? 'border-[#9E7B3B] scale-105 shadow-xs'
                      : 'border-[#E0D8CB] opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Angle ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          <div className="mt-4 pt-3 border-t border-[#ECE6DE] w-full text-center">
            <p className="text-[11px] text-[#706456] tracking-wide flex items-center justify-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#9E7B3B]" />
              <span>Hand-embroidered at Ashrafi Bridal Studio · Tariq Road, Karachi</span>
            </p>
          </div>
        </div>

        {/* Right Column: Title, Description, Price, Place Order via WhatsApp */}
        <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto bg-white">
          <div className="space-y-4">
            {/* Category & Pieces */}
            <div className="flex items-center justify-between text-xs uppercase tracking-widest text-[#9E7B3B] font-semibold">
              <span>{activeProduct.categoryName}</span>
              <span>{activeProduct.pieces}</span>
            </div>

            {/* Title */}
            <h2
              className="text-2xl sm:text-3xl font-display text-[#1A1816] font-medium"
              style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
            >
              {activeProduct.name}
            </h2>

            {/* Price */}
            <div className="flex items-baseline gap-3 pb-4 border-b border-[#ECE6DE]">
              <span className="text-2xl font-serif font-bold text-[#1A1816] tabular-nums tracking-wide">
                {formatPKR(activeProduct.price)}
              </span>
              {activeProduct.originalPrice && (
                <span className="text-sm text-[#8C7E70] line-through tabular-nums">
                  {formatPKR(activeProduct.originalPrice)}
                </span>
              )}
              <span className="text-xs text-[#706456] ml-auto">Free Insured Courier</span>
            </div>

            {/* Description */}
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#8C7E70] font-semibold block mb-1">
                COUTURE OVERVIEW
              </span>
              <p className="text-xs sm:text-sm text-[#5C5144] leading-relaxed">
                {activeProduct.description}
              </p>
            </div>

            {/* Craftsmanship Details */}
            <div className="bg-[#FAF8F5] border border-[#E8E2D8] p-4 space-y-2.5 text-xs text-[#52483D]">
              <div className="flex items-start gap-2.5">
                <Scissors className="w-4 h-4 text-[#9E7B3B] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-[#1A1816]">Fabric:</strong> {activeProduct.fabric}
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-[#9E7B3B] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-[#1A1816]">Embroidery:</strong> {activeProduct.embroidery}
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#9E7B3B] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-[#1A1816]">Production Time:</strong> {activeProduct.leadTime}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-[#706456] pt-1">
              <ShieldCheck className="w-4 h-4 text-[#9E7B3B]" />
              <span>Tailored with 3-inch internal seam margins for effortless fitting</span>
            </div>
          </div>

          {/* Primary Action Button: PLACE ORDER BY WHATSAPP (Clean Layout, Book Appointment Removed) */}
          <div className="pt-6 border-t border-[#ECE6DE] space-y-3 mt-6">
            <button
              onClick={handlePlaceOrderByWhatsApp}
              className="w-full py-4 bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-xs uppercase tracking-[0.2em] active:scale-98 transition-all flex items-center justify-center gap-2.5 shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Place Order by WhatsApp</span>
            </button>

            <button
              onClick={() => toggleWishlist(activeProduct)}
              className={`w-full py-2.5 border transition-colors text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-2xs ${
                inWishlist
                  ? 'border-[#9E7B3B] bg-[#FAF8F5] text-[#9E7B3B]'
                  : 'border-[#E0D8CB] text-[#1A1816] hover:border-[#1A1816]'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${inWishlist ? 'fill-current' : ''}`} />
              <span>{inWishlist ? 'Saved in Wishlist' : 'Save to Wishlist'}</span>
            </button>

            <p className="text-[10px] text-[#8C7E70] text-center pt-1 leading-tight">
              Direct atelier concierge · Karachi phone & WhatsApp: 0333 3128869
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
