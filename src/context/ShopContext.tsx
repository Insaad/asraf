import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, PageRoute, Product, WishlistItem, CategoryTheme } from '../types';
import { PRODUCTS, BOUTIQUE_INFO, CATEGORY_THEMES } from '../data/products';

interface ShopContextType {
  currentRoute: PageRoute;
  setCurrentRoute: (route: PageRoute) => void;
  cart: CartItem[];
  addToCart: (
    product: Product,
    size?: string,
    color?: string,
    stitching?: 'Stitched' | 'Unstitched' | 'Custom Bridal Fit',
    notes?: string
  ) => void;
  removeFromCart: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, delta: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;

  wishlist: WishlistItem[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  wishlistCount: number;
  isWishlistOpen: boolean;
  openWishlist: () => void;
  closeWishlist: () => void;

  activeProduct: Product | null;
  openProductModal: (product: Product) => void;
  closeProductModal: () => void;

  isAppointmentOpen: boolean;
  openAppointmentModal: (prefillNote?: string) => void;
  closeAppointmentModal: () => void;
  appointmentPrefill: string;

  isSizeGuideOpen: boolean;
  openSizeGuideModal: () => void;
  closeSizeGuideModal: () => void;

  isSearchOpen: boolean;
  openSearchModal: () => void;
  closeSearchModal: () => void;

  formatPKR: (amount: number) => string;
  createWhatsAppLink: (message: string) => string;

  // Products & Categories
  products: Product[];
  categories: CategoryTheme[];
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation
  const [currentRoute, setCurrentRouteState] = useState<PageRoute>('home');

  const setCurrentRoute = (route: PageRoute) => {
    setCurrentRouteState(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const products = PRODUCTS;
  const categories = Object.values(CATEGORY_THEMES);

  // Cart with local storage persistence
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('ashrafi_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('ashrafi_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  // Wishlist with local storage persistence
  const [wishlist, setWishlist] = useState<WishlistItem[]>(() => {
    try {
      const saved = localStorage.getItem('ashrafi_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('ashrafi_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  // UI Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [appointmentPrefill, setAppointmentPrefill] = useState('');
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const openWishlist = () => setIsWishlistOpen(true);
  const closeWishlist = () => setIsWishlistOpen(false);

  const openProductModal = (product: Product) => setActiveProduct(product);
  const closeProductModal = () => setActiveProduct(null);

  const openAppointmentModal = (prefillNote = '') => {
    setAppointmentPrefill(prefillNote);
    setIsAppointmentOpen(true);
  };
  const closeAppointmentModal = () => setIsAppointmentOpen(false);

  const openSizeGuideModal = () => setIsSizeGuideOpen(true);
  const closeSizeGuideModal = () => setIsSizeGuideOpen(false);

  const openSearchModal = () => setIsSearchOpen(true);
  const closeSearchModal = () => setIsSearchOpen(false);

  const addToCart = (
    product: Product,
    size = 'Standard (Tailored margins)',
    color = 'As Shown in Lookbook',
    stitching: 'Stitched' | 'Unstitched' | 'Custom Bridal Fit' = 'Stitched',
    notes = ''
  ) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id && item.size === size);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev,
        { product, size, color, quantity: 1, stitchingOption: stitching, customNotes: notes },
      ];
    });
    openCart();
  };

  const removeFromCart = (productId: string, size: string) => {
    setCart((prev) => prev.filter((item) => !(item.product.id === productId && item.size === size)));
  };

  const updateQuantity = (productId: string, size: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId && item.size === size) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const toggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.product.id === product.id);
      if (exists) {
        return prev.filter((item) => item.product.id !== product.id);
      }
      return [...prev, { product, addedAt: new Date().toISOString() }];
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((item) => item.product.id === productId);
  };

  const wishlistCount = wishlist.length;

  const formatPKR = (amount: number): string => {
    return `PKR ${amount.toLocaleString('en-PK')}`;
  };

  const createWhatsAppLink = (message: string) => {
    const encoded = encodeURIComponent(message);
    return `${BOUTIQUE_INFO.whatsappUrl}?text=${encoded}`;
  };

  return (
    <ShopContext.Provider
      value={{
        currentRoute,
        setCurrentRoute,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
        isCartOpen,
        openCart,
        closeCart,
        wishlist,
        toggleWishlist,
        isInWishlist,
        wishlistCount,
        isWishlistOpen,
        openWishlist,
        closeWishlist,
        activeProduct,
        openProductModal,
        closeProductModal,
        isAppointmentOpen,
        openAppointmentModal,
        closeAppointmentModal,
        appointmentPrefill,
        isSizeGuideOpen,
        openSizeGuideModal,
        closeSizeGuideModal,
        isSearchOpen,
        openSearchModal,
        closeSearchModal,
        formatPKR,
        createWhatsAppLink,
        products,
        categories,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
