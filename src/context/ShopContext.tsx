import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { CartItem, PageRoute, Product, WishlistItem, CategoryTheme } from '../types';
import { PRODUCTS, BOUTIQUE_INFO, CATEGORY_THEMES } from '../data/products';
import {
  initAuth,
  googleSignIn,
  googleLogout,
  getAccessToken,
} from '../services/googleAuth';
import {
  createSampleCatalogSpreadsheet,
  fetchCatalogFromSpreadsheet,
} from '../services/googleSheets';

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

  // Live Products & Categories from Google Sheets
  products: Product[];
  categories: CategoryTheme[];

  // Google Sheets Management
  isGoogleSheetsOpen: boolean;
  openGoogleSheetsModal: () => void;
  closeGoogleSheetsModal: () => void;
  googleUser: User | null;
  isGoogleConnecting: boolean;
  spreadsheetId: string;
  setSpreadsheetId: (id: string) => void;
  spreadsheetUrl: string;
  setSpreadsheetUrl: (url: string) => void;
  isSyncingSheets: boolean;
  sheetsError: string | null;
  lastSyncedAt: string | null;
  handleGoogleSignIn: () => Promise<void>;
  handleGoogleLogout: () => Promise<void>;
  handleCreateSampleSheet: () => Promise<void>;
  handleSyncFromSheets: () => Promise<void>;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation
  const [currentRoute, setCurrentRouteState] = useState<PageRoute>('home');

  const setCurrentRoute = (route: PageRoute) => {
    setCurrentRouteState(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Products state (can be updated live from Google Sheets)
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('ashrafi_products_cached');
      return saved ? JSON.parse(saved) : PRODUCTS;
    } catch {
      return PRODUCTS;
    }
  });

  const [categories, setCategories] = useState<CategoryTheme[]>(() => {
    return Object.values(CATEGORY_THEMES);
  });

  // Google Auth & Sheets Integration State
  const [googleUser, setGoogleUser] = useState<User | null>(null);
  const [isGoogleConnecting, setIsGoogleConnecting] = useState(false);
  const [isGoogleSheetsOpen, setIsGoogleSheetsOpen] = useState(false);
  const [isSyncingSheets, setIsSyncingSheets] = useState(false);
  const [sheetsError, setSheetsError] = useState<string | null>(null);
  const [lastSyncedAt, setLastSyncedAt] = useState<string | null>(() => {
    return localStorage.getItem('ashrafi_sheets_last_synced');
  });

  const [spreadsheetId, setSpreadsheetIdState] = useState<string>(() => {
    return localStorage.getItem('ashrafi_spreadsheet_id') || '';
  });

  const [spreadsheetUrl, setSpreadsheetUrlState] = useState<string>(() => {
    return localStorage.getItem('ashrafi_spreadsheet_url') || '';
  });

  const setSpreadsheetId = (id: string) => {
    setSpreadsheetIdState(id);
    localStorage.setItem('ashrafi_spreadsheet_id', id);
    if (id) {
      const url = `https://docs.google.com/spreadsheets/d/${id}/edit`;
      setSpreadsheetUrlState(url);
      localStorage.setItem('ashrafi_spreadsheet_url', url);
    }
  };

  const setSpreadsheetUrl = (url: string) => {
    setSpreadsheetUrlState(url);
    localStorage.setItem('ashrafi_spreadsheet_url', url);
  };

  // Initialize Firebase Auth listener
  useEffect(() => {
    const unsubscribe = initAuth(
      (user) => {
        setGoogleUser(user);
      },
      () => {
        setGoogleUser(null);
      }
    );
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const openGoogleSheetsModal = () => setIsGoogleSheetsOpen(true);
  const closeGoogleSheetsModal = () => setIsGoogleSheetsOpen(false);

  const handleGoogleSignIn = async () => {
    try {
      setIsGoogleConnecting(true);
      setSheetsError(null);
      const res = await googleSignIn();
      if (res) {
        setGoogleUser(res.user);
        if (spreadsheetId) {
          // If a spreadsheet is already linked, sync immediately
          await handleSyncFromSheets(res.accessToken);
        }
      }
    } catch (err: any) {
      setSheetsError(err.message || 'Google Sign-In failed');
    } finally {
      setIsGoogleConnecting(false);
    }
  };

  const handleGoogleLogout = async () => {
    await googleLogout();
    setGoogleUser(null);
  };

  const handleCreateSampleSheet = async () => {
    try {
      setIsSyncingSheets(true);
      setSheetsError(null);

      let token = await getAccessToken();
      if (!token) {
        const signinRes = await googleSignIn();
        if (!signinRes) throw new Error('Please sign in with Google to create the spreadsheet');
        token = signinRes.accessToken;
        setGoogleUser(signinRes.user);
      }

      const { spreadsheetId: newId, spreadsheetUrl: newUrl } =
        await createSampleCatalogSpreadsheet(token);

      setSpreadsheetId(newId);
      setSpreadsheetUrl(newUrl);

      // Now fetch and confirm the newly populated catalog
      await handleSyncFromSheets(token, newId);
    } catch (err: any) {
      console.error(err);
      setSheetsError(err.message || 'Failed to create sample spreadsheet');
      throw err;
    } finally {
      setIsSyncingSheets(false);
    }
  };

  const handleSyncFromSheets = async (
    providedToken?: string,
    targetSpreadsheetId?: string
  ) => {
    const idToUse = targetSpreadsheetId || spreadsheetId;
    if (!idToUse) {
      setSheetsError('Please enter or create a Google Spreadsheet first.');
      return;
    }

    try {
      setIsSyncingSheets(true);
      setSheetsError(null);

      let token = providedToken || (await getAccessToken());
      if (!token) {
        const signinRes = await googleSignIn();
        if (!signinRes) throw new Error('Sign in required to read spreadsheet');
        token = signinRes.accessToken;
        setGoogleUser(signinRes.user);
      }

      const catalog = await fetchCatalogFromSpreadsheet(idToUse, token);

      if (catalog.products.length > 0) {
        setProducts(catalog.products);
        try {
          localStorage.setItem('ashrafi_products_cached', JSON.stringify(catalog.products));
        } catch (e) {
          console.warn(e);
        }
      }

      if (catalog.categories.length > 0) {
        setCategories(catalog.categories);
      }

      const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setLastSyncedAt(nowStr);
      localStorage.setItem('ashrafi_sheets_last_synced', nowStr);
    } catch (err: any) {
      console.error(err);
      setSheetsError(err.message || 'Failed to sync data from Google Sheet');
    } finally {
      setIsSyncingSheets(false);
    }
  };

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

        // Live Products & Categories from Google Sheets
        products,
        categories,

        // Google Sheets Integration
        isGoogleSheetsOpen,
        openGoogleSheetsModal,
        closeGoogleSheetsModal,
        googleUser,
        isGoogleConnecting,
        spreadsheetId,
        setSpreadsheetId,
        spreadsheetUrl,
        setSpreadsheetUrl,
        isSyncingSheets,
        sheetsError,
        lastSyncedAt,
        handleGoogleSignIn,
        handleGoogleLogout,
        handleCreateSampleSheet,
        handleSyncFromSheets,
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
