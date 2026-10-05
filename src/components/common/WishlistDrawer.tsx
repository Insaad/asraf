import React from 'react';
import { useShop } from '../../context/ShopContext';
import { X, Trash2, ShoppingBag, Heart, ArrowRight } from 'lucide-react';

export const WishlistDrawer: React.FC = () => {
  const {
    isWishlistOpen,
    closeWishlist,
    wishlist,
    toggleWishlist,
    openProductModal,
    addToCart,
    formatPKR,
    setCurrentRoute,
  } = useShop();

  if (!isWishlistOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-[#FAF8F5] border-l border-[#E2DBD1] text-[#1E1B18] h-full flex flex-col justify-between shadow-2xl relative">
        {/* Header */}
        <div className="p-5 border-b border-[#E8E1D5] flex items-center justify-between bg-white">
          <div>
            <h3
              className="text-lg font-serif font-semibold text-[#1E1B18]"
              style={{ fontFamily: 'Cinzel, serif' }}
            >
              Saved Bridal Favorites
            </h3>
            <p className="text-[11px] text-[#7A6E62]">
              {wishlist.length} {wishlist.length === 1 ? 'Design' : 'Designs'} in your Wishlist
            </p>
          </div>
          <button
            onClick={closeWishlist}
            className="p-2 text-[#7A6E62] hover:text-[#1E1B18] transition-colors"
            aria-label="Close wishlist drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5">
          {wishlist.length === 0 ? (
            <div className="py-20 text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-white border border-[#E2DBD1] flex items-center justify-center text-[#93733A] shadow-xs">
                <Heart className="w-8 h-8 opacity-80" />
              </div>
              <div>
                <h4 className="text-base font-serif text-[#1E1B18] font-semibold">Your Wishlist is Empty</h4>
                <p className="text-xs text-[#7A6E62] mt-1 max-w-xs mx-auto">
                  Click the heart icon on any lehenga, gown, or saree to save it for your bridal consultation.
                </p>
              </div>
              <button
                onClick={() => {
                  closeWishlist();
                  setCurrentRoute('shop-all');
                }}
                className="px-6 py-2.5 bg-[#1E1B18] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#93733A] transition-all shadow-xs"
              >
                Browse All Collections
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {wishlist.map(({ product }) => (
                <div
                  key={product.id}
                  className="p-3 bg-white border border-[#EAE3D9] flex gap-3 items-center shadow-2xs"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-18 h-22 object-cover object-top border border-[#E0D8CB] shrink-0 cursor-pointer"
                    onClick={() => {
                      closeWishlist();
                      openProductModal(product);
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] uppercase tracking-wider text-[#93733A] block font-semibold">
                      {product.categoryName}
                    </span>
                    <h4
                      onClick={() => {
                        closeWishlist();
                        openProductModal(product);
                      }}
                      className="text-sm font-medium text-[#1E1B18] hover:text-[#93733A] transition-colors truncate cursor-pointer font-serif"
                    >
                      {product.name}
                    </h4>
                    <p className="text-xs font-bold text-[#1E1B18] tabular-nums mt-0.5">
                      {formatPKR(product.price)}
                    </p>

                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => {
                          addToCart(product);
                          closeWishlist();
                        }}
                        className="px-2.5 py-1 bg-[#1E1B18] hover:bg-[#93733A] text-[11px] text-white flex items-center gap-1 transition-colors shadow-2xs"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>Add to Bag</span>
                      </button>

                      <button
                        onClick={() => toggleWishlist(product)}
                        className="p-1 text-[#998C7C] hover:text-red-600 transition-colors"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {wishlist.length > 0 && (
          <div className="p-5 border-t border-[#E8E1D5] bg-[#F7F4EE]">
            <button
              onClick={() => {
                closeWishlist();
                setCurrentRoute('contact');
              }}
              className="w-full py-3 bg-[#1E1B18] hover:bg-[#93733A] text-white font-semibold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-xs"
            >
              <span>Schedule Consultation for Wishlist</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
