import React, { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { CATEGORY_THEMES, PRODUCTS, BOUTIQUE_INFO } from '../data/products';
import { CategoryId, PageRoute } from '../types';
import { ProductCard } from '../components/common/ProductCard';
import {
  Filter,
  ArrowUpDown,
  Sparkles,
  MessageCircle,
  Calendar,
  ChevronRight,
} from 'lucide-react';

interface CategoryPageProps {
  categoryId: CategoryId;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({ categoryId }) => {
  const { setCurrentRoute, openAppointmentModal, createWhatsAppLink, products } = useShop();

  const theme = CATEGORY_THEMES[categoryId] || CATEGORY_THEMES['nikah'];

  // Filters & Sorting state
  const [selectedFabric, setSelectedFabric] = useState<string>('all');
  const [selectedStitching, setSelectedStitching] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'newest'>('featured');
  const [priceMax, setPriceMax] = useState<number>(700000);

  // Available fabrics in this category
  const categoryProducts = useMemo(() => {
    return products.filter((p) => p.category === categoryId);
  }, [products, categoryId]);

  const uniqueFabrics = useMemo(() => {
    const set = new Set<string>();
    categoryProducts.forEach((p) => {
      const mainFabric = p.fabric.split('&')[0].trim();
      set.add(mainFabric);
    });
    return Array.from(set);
  }, [categoryProducts]);

  // Filtered & Sorted products
  const filteredProducts = useMemo(() => {
    return categoryProducts
      .filter((p) => {
        if (selectedFabric !== 'all' && !p.fabric.toLowerCase().includes(selectedFabric.toLowerCase())) {
          return false;
        }
        if (selectedStitching !== 'all' && p.status !== selectedStitching) {
          return false;
        }
        if (p.price > priceMax) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  }, [categoryProducts, selectedFabric, selectedStitching, sortBy, priceMax]);

  // Related collections
  const otherCategories = Object.values(CATEGORY_THEMES).filter((c) => c.id !== categoryId).slice(0, 3);

  const handleWhatsAppConsultation = () => {
    const msg = `As-salamu alaykum Ashrafi Bridal Studio! I am exploring your *${theme.name}* and would like to inquire about bridal orders, customization, and appointments.`;
    window.open(createWhatsAppLink(msg), '_blank');
  };

  return (
    <div className="min-h-screen bg-white text-[#1A1816]">
      {/* 1. Category Editorial Banner - Minimal Luminous Light Luxury */}
      <section className={`relative py-20 sm:py-28 overflow-hidden border-b border-[#ECE6DE] bg-gradient-to-b ${theme.bgGradient}`}>
        {/* Banner image with luminous light diffusion */}
        <div className="absolute inset-0 z-0">
          <img
            src={theme.heroImage}
            alt={theme.name}
            className="w-full h-full object-cover object-top opacity-25 filter brightness-105 scale-102 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/85 to-white/40" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <div className="flex items-center gap-2 mb-3">
            <span className={`text-[11px] uppercase tracking-[0.35em] font-semibold px-3 py-1 border shadow-2xs ${theme.badgeTone}`}>
              ASHRAFI COUTURE
            </span>
            <span className="text-[#A39686]">·</span>
            <span className="text-xl font-serif text-[#9E7B3B] opacity-90" dir="rtl">
              {theme.urduName}
            </span>
          </div>

          <h1
            className="text-4xl sm:text-6xl font-display font-medium tracking-tight text-[#1A1816] mb-4"
            style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
          >
            {theme.name}
          </h1>

          <p className="text-sm sm:text-base text-[#5C5144] max-w-2xl leading-relaxed mb-6 font-light">
            {theme.description}
          </p>

          <div className="flex items-center gap-3 text-xs text-[#706456] tracking-wider uppercase">
            <span>Palette: {theme.paletteDescription}</span>
            <span>·</span>
            <span className="text-[#9E7B3B] font-semibold">{categoryProducts.length} Exclusive Ensembles</span>
          </div>

          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <button
              onClick={handleWhatsAppConsultation}
              className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white text-xs uppercase tracking-widest font-semibold flex items-center gap-2 transition-all shadow-2xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Inquire via WhatsApp</span>
            </button>

            <button
              onClick={() => openAppointmentModal(`Inquiry regarding ${theme.name}`)}
              className="px-6 py-2.5 bg-white border border-[#D4AF37]/60 text-[#1A1816] hover:border-[#1A1816] text-xs uppercase tracking-widest transition-all flex items-center gap-2 shadow-2xs"
            >
              <Calendar className="w-3.5 h-3.5 text-[#9E7B3B]" />
              <span>Book Salon Fitting</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. Filter & Sort Bar */}
      <section className="bg-[#FAF8F5] border-b border-[#ECE6DE] sticky top-20 z-30 py-3.5 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Active Product Count & Filters */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-[#706456]">
            <div className="flex items-center gap-1.5 font-semibold text-[#1A1816]">
              <Filter className="w-3.5 h-3.5 text-[#9E7B3B]" />
              <span>{filteredProducts.length} Pieces</span>
            </div>

            {/* Fabric Filter */}
            <div className="flex items-center gap-1">
              <select
                value={selectedFabric}
                onChange={(e) => setSelectedFabric(e.target.value)}
                className="bg-white border border-[#E0D8CB] text-xs text-[#1A1816] py-1.5 px-3 focus:outline-none focus:border-[#9E7B3B] shadow-2xs"
              >
                <option value="all">All Fabrics</option>
                {uniqueFabrics.map((fab) => (
                  <option key={fab} value={fab}>
                    {fab}
                  </option>
                ))}
              </select>
            </div>

            {/* Stitching Status Filter */}
            <div className="flex items-center gap-1">
              <select
                value={selectedStitching}
                onChange={(e) => setSelectedStitching(e.target.value)}
                className="bg-white border border-[#E0D8CB] text-xs text-[#1A1816] py-1.5 px-3 focus:outline-none focus:border-[#9E7B3B] shadow-2xs"
              >
                <option value="all">All Stitching</option>
                <option value="Made to Order">Made to Order</option>
                <option value="Stitched">Stitched</option>
                <option value="Unstitched">Unstitched</option>
              </select>
            </div>

            {/* Price Max Slider */}
            <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-[#E2DBD0]">
              <span className="text-[#8C7E70]">Max:</span>
              <span className="font-semibold text-[#1A1816] tabular-nums">
                PKR {priceMax.toLocaleString()}
              </span>
              <input
                type="range"
                min="150000"
                max="700000"
                step="25000"
                value={priceMax}
                onChange={(e) => setPriceMax(Number(e.target.value))}
                className="w-24 accent-[#9E7B3B] cursor-pointer"
              />
            </div>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 text-xs text-[#706456]">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#9E7B3B]" />
            <span>Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-[#E0D8CB] text-xs text-[#1A1816] py-1.5 px-3 focus:outline-none focus:border-[#9E7B3B] shadow-2xs"
            >
              <option value="featured">Atelier Curation</option>
              <option value="newest">Newest Arrivals</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </section>

      {/* 3. Product Catalog Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center max-w-md mx-auto space-y-3 bg-[#FAF8F5] border border-[#E8E2D8] p-8 shadow-2xs">
            <Sparkles className="w-8 h-8 text-[#9E7B3B] mx-auto opacity-70" />
            <h3 className="text-xl font-serif text-[#1A1816] font-medium">No Pieces Match This Filter</h3>
            <p className="text-xs text-[#706456]">
              Try adjusting your fabric selection or price range. Our atelier also creates customized versions of any ensemble.
            </p>
            <button
              onClick={() => {
                setSelectedFabric('all');
                setSelectedStitching('all');
                setPriceMax(700000);
              }}
              className="mt-2 px-5 py-2 bg-[#1A1816] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#9E7B3B] transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* 4. Atelier Craftsmanship Note */}
      <section className="py-14 bg-[#FAF8F5] border-y border-[#ECE6DE]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#9E7B3B] font-semibold block mb-2">
            THE ASHRAFI PROMISE
          </span>
          <h3
            className="text-2xl font-serif text-[#1A1816] mb-3"
            style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
          >
            Artisanal Integrity in Every Single Thread
          </h3>
          <p className="text-xs sm:text-sm text-[#5C5144] leading-relaxed max-w-2xl mx-auto mb-6">
            Each creation in our {theme.name} requires between 250 to 500 hand-hours of traditional needlecraft. We guarantee authentic dabka, genuine French nets, pure Jamawar silk trims, and zero machine duplicates.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-xs">
            <div className="px-4 py-2 bg-white border border-[#E4DDD2] text-[#1A1816] shadow-2xs">
              <strong className="text-[#9E7B3B]">Custom Color Dyeing</strong> available upon request
            </div>
            <div className="px-4 py-2 bg-white border border-[#E4DDD2] text-[#1A1816] shadow-2xs">
              <strong className="text-[#9E7B3B]">Can-Can Flare Volume</strong> tailored to height
            </div>
            <div className="px-4 py-2 bg-white border border-[#E4DDD2] text-[#1A1816] shadow-2xs">
              <strong className="text-[#9E7B3B]">Worldwide Courier</strong> with tracking & insurance
            </div>
          </div>
        </div>
      </section>

      {/* 5. Related Collections */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-xs uppercase tracking-widest text-[#9E7B3B] font-semibold">
            CONTINUE EXPLORING
          </span>
          <h3
            className="text-2xl sm:text-3xl font-serif text-[#1A1816] mt-1"
            style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
          >
            Complementary Wedding Collections
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {otherCategories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => setCurrentRoute(cat.id as PageRoute)}
              className="group cursor-pointer bg-white border border-[#E8E2D8] hover:border-[#9E7B3B] p-5 transition-all shadow-2xs hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase tracking-widest text-[#9E7B3B] font-semibold">
                    {cat.tagline}
                  </span>
                  <span className="font-serif text-[#9E7B3B] text-sm" dir="rtl">
                    {cat.urduName}
                  </span>
                </div>
                <h4
                  className="text-xl font-serif text-[#1A1816] group-hover:text-[#9E7B3B] transition-colors"
                  style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
                >
                  {cat.name}
                </h4>
                <p className="text-xs text-[#706456] mt-2 line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-[#F0EBE3] flex items-center justify-between text-xs text-[#1A1816] group-hover:text-[#9E7B3B] font-medium">
                <span>View {cat.name}</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
