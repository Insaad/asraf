import React, { useState } from 'react';
import { Product } from '../../types';
import { useShop } from '../../context/ShopContext';
import { Heart, MessageCircle } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    openProductModal,
    toggleWishlist,
    isInWishlist,
    formatPKR,
    createWhatsAppLink,
  } = useShop();

  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  const inWishlist = isInWishlist(product.id);

  const displayImage = isHovered && product.secondaryImage ? product.secondaryImage : product.image;

  const handlePlaceOrderByWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    const msg = `As-salamu alaykum Ashrafi Bridal Studio! I would like to place an order for:

*Product*: ${product.name} (${product.categoryName})
*Price*: ${formatPKR(product.price)}
*Fabric*: ${product.fabric}

Please share booking availability, customization options, and delivery timelines.`;

    window.open(createWhatsAppLink(msg), '_blank');
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div
      onClick={() => openProductModal(product)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group cursor-pointer flex flex-col bg-white border border-[#E8E2D8] hover:border-[#9E7B3B]/60 transition-all duration-300 relative shadow-2xs hover:shadow-md hover:-translate-y-1 overflow-hidden"
    >
      {/* 1. Large High-Fashion Product Image */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#FAF8F5]">
        {!imageError ? (
          <img
            src={displayImage}
            alt={product.name}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-104"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-[#FAF8F5] to-[#F1ECE3]">
            <span className="text-2xl font-serif text-[#9E7B3B] mb-2 font-display">ASHRAFI</span>
            <span className="text-xs text-[#706456] uppercase tracking-wider">{product.name}</span>
          </div>
        )}

        {/* Minimal Subtle Status Badge */}
        <div className="absolute top-3 left-3 text-[9px] tracking-[0.2em] uppercase font-semibold px-2 py-0.5 bg-white/95 backdrop-blur-xs text-[#4A4238] border border-[#E8E2D8] shadow-2xs">
          {product.status}
        </div>

        {/* Delicate Wishlist Heart Button */}
        <button
          onClick={handleWishlistClick}
          className={`absolute top-3 right-3 p-2 backdrop-blur-md transition-all shadow-2xs rounded-full ${
            inWishlist
              ? 'bg-[#9E7B3B] text-white'
              : 'bg-white/90 text-[#4A4238] hover:bg-[#1A1816] hover:text-white'
          }`}
          aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-3.5 h-3.5 ${inWishlist ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* 2. Clean, Elegant Product Information Module */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-3 border-t border-[#ECE6DE] bg-white">
        <div>
          {/* Category & Pieces Subtitle */}
          <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-[#9E7B3B] font-semibold mb-1">
            <span>{product.categoryName}</span>
            <span>·</span>
            <span>{product.pieces.split(' ')[0]}</span>
          </div>

          {/* Product Title */}
          <h3
            className="text-base sm:text-lg font-serif font-medium text-[#1A1816] group-hover:text-[#9E7B3B] transition-colors line-clamp-1"
            style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
          >
            {product.name}
          </h3>

          {/* Craftsmanship Description */}
          <p className="text-xs text-[#706456] line-clamp-1 mt-0.5 font-light">
            {product.fabric.split('&')[0]} · {product.embroidery.split(',')[0]}
          </p>
        </div>

        <div>
          {/* Price */}
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-base sm:text-lg font-serif font-bold text-[#1A1816] tabular-nums tracking-wide">
              {formatPKR(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-[#9E8E7E] line-through tabular-nums">
                {formatPKR(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Direct Place Order by WhatsApp Button */}
          <button
            onClick={handlePlaceOrderByWhatsApp}
            className="w-full py-2.5 bg-[#1A1816] hover:bg-emerald-700 text-white font-semibold text-[11px] uppercase tracking-[0.16em] active:scale-98 transition-all duration-200 flex items-center justify-center gap-2 shadow-2xs hover:shadow-xs"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-400 group-hover:text-white" />
            <span>Place Order by WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
};
