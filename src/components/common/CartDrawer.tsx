import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { BOUTIQUE_INFO } from '../../data/products';
import {
  X,
  Trash2,
  Plus,
  Minus,
  MessageCircle,
  ShieldCheck,
  Truck,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    closeCart,
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartCount,
    formatPKR,
    createWhatsAppLink,
    setCurrentRoute,
  } = useShop();

  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'form' | 'success'>('cart');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Karachi');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'Cash on Delivery' | 'Bank Transfer / Wire' | 'WhatsApp Assisted'>('WhatsApp Assisted');
  const [orderId, setOrderId] = useState('');

  if (!isCartOpen) return null;

  const handleWhatsAppCheckout = () => {
    if (cart.length === 0) return;

    let itemsList = cart
      .map(
        (item, idx) =>
          `${idx + 1}. *${item.product.name}*\n   - Size: ${item.size}\n   - Stitching: ${item.stitchingOption}\n   - Color: ${item.color}\n   - Qty: ${item.quantity}\n   - Price: ${formatPKR(item.product.price * item.quantity)}${item.customNotes ? `\n   - Notes: ${item.customNotes}` : ''}`
      )
      .join('\n\n');

    const message = `As-salamu alaykum Ashrafi Bridal Studio! I would like to place an inquiry/order for my bridal bag:\n\n${itemsList}\n\n*Estimated Total*: ${formatPKR(
      cartTotal
    )}\n\nPlease advise on production timeline, bespoke fitting slots at Tariq Road, and payment details.`;

    window.open(createWhatsAppLink(message), '_blank');
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const newOrderId = `ASHRAFI-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(newOrderId);
    setCheckoutStep('success');
    clearCart();
  };

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
              Bridal Shopping Bag
            </h3>
            <p className="text-[11px] text-[#7A6E62]">
              {cartCount} {cartCount === 1 ? 'Masterpiece' : 'Masterpieces'} Selected
            </p>
          </div>
          <button
            onClick={closeCart}
            className="p-2 text-[#7A6E62] hover:text-[#1E1B18] transition-colors"
            aria-label="Close cart drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5">
          {checkoutStep === 'cart' && (
            <>
              {cart.length === 0 ? (
                <div className="py-20 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-white border border-[#E2DBD1] flex items-center justify-center text-[#93733A] shadow-xs">
                    <ShieldCheck className="w-8 h-8 opacity-80" />
                  </div>
                  <div>
                    <h4 className="text-base font-serif text-[#1E1B18] font-semibold">Your Bridal Bag is Empty</h4>
                    <p className="text-xs text-[#7A6E62] mt-1 max-w-xs mx-auto">
                      Explore our handcrafted Nikah, Barat, Mehndi, and Walima collections to begin your bespoke journey.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      closeCart();
                      setCurrentRoute('shop-all');
                    }}
                    className="px-6 py-2.5 bg-[#1E1B18] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#93733A] transition-all shadow-xs"
                  >
                    Explore Bridal Collections
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item, idx) => (
                    <div
                      key={`${item.product.id}-${item.size}-${idx}`}
                      className="p-3.5 bg-white border border-[#EAE3D9] flex gap-3 relative shadow-2xs"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-20 h-24 object-cover object-top border border-[#E0D8CB] shrink-0"
                      />
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between">
                            <h4 className="text-sm font-semibold text-[#1E1B18] line-clamp-1">
                              {item.product.name}
                            </h4>
                            <button
                              onClick={() => removeFromCart(item.product.id, item.size)}
                              className="text-[#998C7C] hover:text-red-600 transition-colors p-1"
                              title="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <p className="text-[11px] text-[#63574A] mt-0.5">
                            Size: <span className="text-[#1E1B18] font-bold">{item.size}</span> ·{' '}
                            {item.stitchingOption}
                          </p>
                          <p className="text-[11px] text-[#7A6E62]">Color: {item.color}</p>
                          {item.customNotes && (
                            <p className="text-[10px] text-[#93733A] italic line-clamp-1 mt-0.5">
                              "{item.customNotes}"
                            </p>
                          )}
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-[#F0EBE3] mt-2">
                          <div className="flex items-center border border-[#D6CDBC] bg-[#FAF8F5]">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.size, -1)}
                              className="p-1 text-[#6B5E50] hover:text-[#1E1B18]"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 text-xs tabular-nums font-bold text-[#1E1B18]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.size, 1)}
                              className="p-1 text-[#6B5E50] hover:text-[#1E1B18]"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <span className="text-xs font-bold text-[#1E1B18] tabular-nums">
                            {formatPKR(item.product.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Bridal Couture Trust Signals */}
                  <div className="p-3 bg-white border border-[#EAE3D9] space-y-1.5 text-[11px] text-[#6B5E50]">
                    <div className="flex items-center gap-2">
                      <Truck className="w-3.5 h-3.5 text-[#93733A]" />
                      <span>Complimentary insured air courier across Pakistan & worldwide</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#93733A]" />
                      <span>Karachi Atelier Authenticity & Tailoring Guarantee</span>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {checkoutStep === 'form' && (
            <form onSubmit={handleSubmitOrder} className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#E8E1D5]">
                <h4 className="text-sm font-bold text-[#1E1B18] uppercase tracking-wider">
                  Client Information
                </h4>
                <button
                  type="button"
                  onClick={() => setCheckoutStep('cart')}
                  className="text-xs text-[#7A6E62] hover:underline"
                >
                  ← Back to Bag
                </button>
              </div>

              <div>
                <label className="text-xs text-[#5C5042] block mb-1 font-medium">Bride / Client Full Name *</label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Mahnoor Tariq"
                  className="w-full bg-white border border-[#D6CDBC] text-xs text-[#1E1B18] p-2.5 focus:outline-none focus:border-[#93733A]"
                />
              </div>

              <div>
                <label className="text-xs text-[#5C5042] block mb-1 font-medium">
                  WhatsApp / Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 0300 1234567 or +44 / +1"
                  className="w-full bg-white border border-[#D6CDBC] text-xs text-[#1E1B18] p-2.5 focus:outline-none focus:border-[#93733A]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-[#5C5042] block mb-1 font-medium">City *</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Karachi, Lahore, London..."
                    className="w-full bg-white border border-[#D6CDBC] text-xs text-[#1E1B18] p-2.5 focus:outline-none focus:border-[#93733A]"
                  />
                </div>
                <div>
                  <label className="text-xs text-[#5C5042] block mb-1 font-medium">Country</label>
                  <input
                    type="text"
                    defaultValue="Pakistan"
                    className="w-full bg-white border border-[#D6CDBC] text-xs text-[#1E1B18] p-2.5 focus:outline-none focus:border-[#93733A]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-[#5C5042] block mb-1 font-medium">Delivery Address *</label>
                <textarea
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="House / Street, Area, Postal Code"
                  rows={2}
                  className="w-full bg-white border border-[#D6CDBC] text-xs text-[#1E1B18] p-2.5 focus:outline-none focus:border-[#93733A]"
                />
              </div>

              <div>
                <label className="text-xs text-[#5C5042] block mb-1 font-medium">Preferred Confirmation</label>
                <select
                  value={paymentMethod}
                  onChange={(e) =>
                    setPaymentMethod(
                      e.target.value as 'Cash on Delivery' | 'Bank Transfer / Wire' | 'WhatsApp Assisted'
                    )
                  }
                  className="w-full bg-white border border-[#D6CDBC] text-xs text-[#1E1B18] p-2.5 focus:outline-none focus:border-[#93733A]"
                >
                  <option value="WhatsApp Assisted">WhatsApp Bridal Concierge Confirmation</option>
                  <option value="Bank Transfer / Wire">Direct Bank Transfer / Wire (Pakistan & International)</option>
                  <option value="Cash on Delivery">Cash on Delivery (Pakistan Metro Cities)</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-[#1E1B18] hover:bg-[#93733A] text-white font-semibold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-xs"
                >
                  <span>Submit Bridal Order Request</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}

          {checkoutStep === 'success' && (
            <div className="py-12 text-center space-y-4">
              <div className="w-14 h-14 mx-auto rounded-full bg-emerald-50 border border-emerald-500/50 flex items-center justify-center text-emerald-600">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <span className="text-xs uppercase tracking-widest text-[#93733A] font-semibold">
                  Order Request Received
                </span>
                <h4 className="text-xl font-serif text-[#1E1B18] mt-1 font-semibold">Thank You, {customerName}</h4>
                <p className="text-xs font-mono text-[#7A6E62] mt-1 font-bold">Reference: {orderId}</p>
                <p className="text-xs text-[#635547] mt-3 leading-relaxed max-w-xs mx-auto">
                  Our Tariq Road Karachi bridal coordinator will contact you on WhatsApp ({phone}) within 2 hours to verify measurements and provide final swatch approvals.
                </p>
              </div>

              <div className="pt-4 space-y-2">
                <a
                  href={`${BOUTIQUE_INFO.whatsappUrl}?text=${encodeURIComponent(
                    `Hello Ashrafi Bridal Studio! I just submitted order request #${orderId} for client ${customerName}. Please confirm receipt.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 bg-emerald-800 text-white text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 hover:bg-emerald-700 shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Notify via WhatsApp Now</span>
                </a>

                <button
                  onClick={() => {
                    setCheckoutStep('cart');
                    closeCart();
                  }}
                  className="w-full py-2.5 border border-[#D6CDBC] text-xs text-[#3D352E] hover:border-[#1E1B18] font-medium"
                >
                  Return to Storefront
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer calculation & CTAs */}
        {cart.length > 0 && checkoutStep === 'cart' && (
          <div className="p-5 border-t border-[#E8E1D5] bg-[#F7F4EE] space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-[#6B5E50]">
                <span>Estimated Subtotal:</span>
                <span className="text-[#1E1B18] font-bold tabular-nums">
                  {formatPKR(cartTotal)}
                </span>
              </div>
              <div className="flex justify-between text-[#6B5E50]">
                <span>Bridal Consultation:</span>
                <span className="text-emerald-700 font-semibold">Complimentary</span>
              </div>
              <div className="flex justify-between text-sm font-semibold text-[#1E1B18] pt-2 border-t border-[#E6DFD5]">
                <span>Total:</span>
                <span className="text-[#1E1B18] text-base font-bold tabular-nums">
                  {formatPKR(cartTotal)}
                </span>
              </div>
            </div>

            <div className="space-y-2 pt-1">
              <button
                onClick={handleWhatsAppCheckout}
                className="w-full py-3 bg-emerald-800 hover:bg-emerald-700 text-white font-semibold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Instant WhatsApp Checkout</span>
              </button>

              <button
                onClick={() => setCheckoutStep('form')}
                className="w-full py-2.5 bg-[#1E1B18] hover:bg-[#93733A] text-white font-semibold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-xs"
              >
                <span>Order Online / Enter Details</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
