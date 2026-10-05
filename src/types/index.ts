export type CategoryId =
  | 'all'
  | 'nikah'
  | 'barat'
  | 'mehndi'
  | 'walima'
  | 'party-wear'
  | 'sarees'
  | 'sharara-gharara'
  | 'frocks-maxis'
  | 'made-to-order';

export interface Product {
  id: string;
  name: string;
  category: CategoryId;
  categoryName: string;
  price: number;
  originalPrice?: number;
  image: string;
  secondaryImage?: string;
  colors: string[];
  fabric: string;
  embroidery: string;
  status: 'Stitched' | 'Unstitched' | 'Made to Order' | 'Semi-Stitched';
  description: string;
  details: string[];
  pieces: string; // e.g. "3-Piece (Lehenga, Choli, Dupatta)"
  leadTime: string; // e.g. "6 to 8 weeks for custom bridal stitching"
  isFeatured?: boolean;
  isBestseller?: boolean;
  isNewArrival?: boolean;
}

export interface CartItem {
  product: Product;
  size: string;
  color: string;
  quantity: number;
  stitchingOption: 'Stitched' | 'Unstitched' | 'Custom Bridal Fit';
  customNotes?: string;
}

export interface WishlistItem {
  product: Product;
  addedAt: string;
}

export interface CategoryTheme {
  id: CategoryId;
  name: string;
  urduName: string;
  tagline: string;
  description: string;
  heroImage: string;
  accentColor: string;
  bgGradient: string;
  badgeTone: string;
  paletteDescription: string;
}

export interface Testimonial {
  id: string;
  brideName: string;
  event: string;
  city: string;
  quote: string;
  outfit: string;
  date: string;
}

export type PageRoute =
  | 'home'
  | 'shop-all'
  | 'nikah'
  | 'barat'
  | 'mehndi'
  | 'walima'
  | 'party-wear'
  | 'sarees'
  | 'sharara-gharara'
  | 'frocks-maxis'
  | 'made-to-order'
  | 'about'
  | 'lookbook'
  | 'contact';
