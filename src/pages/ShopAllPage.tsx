import React, { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS, CATEGORY_THEMES } from '../data/products';
import { ProductCard } from '../components/common/ProductCard';
import { CategoryId } from '../types';
import { Filter, ArrowUpDown, Sparkles, RefreshCw } from 'lucide-react';

export const ShopAllPage: React.FC = () => {
  const { formatPKR, products } = useShop();

  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'all'>('all');
  const [selectedStitching, setSelectedStitching] = useState<string>('all');
  const [selectedFabric, setSelectedFabric] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'newest'>('featured');
  const [maxPrice, setMaxPrice] = useState<number>(650000);

  const categoriesList: { id: CategoryId | 'all'; label: string }[] = [
    { id: 'all', label: 'All Creations' },
    { id: 'nikah', label: 'Nikah' },
    { id: 'barat', label: 'Barat' },
    { id: 'mehndi', label: 'Mehndi' },
    { id: 'walima', label: 'Walima' },
    { id: 'sarees', label: 'Sarees' },
    { id: 'sharara-gharara', label: 'Sharara & Gharara' },
    { id: 'frocks-maxis', label: 'Frocks & Maxis' },
    { id: 'party-wear', label: 'Party Wear' },
  ];

  const uniqueFabrics = useMemo(() => {
    const list = new Set<string>();
    products.forEach((p) => {
      const f = p.fabric.split('&')[0].trim();
      list.add(f);
    });
    return Array.from(list);
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
      if (selectedStitching !== 'all' && p.status !== selectedStitching) return false;
      if (selectedFabric !== 'all' && !p.fabric.toLowerCase().includes(selectedFabric.toLowerCase())) return false;
      if (p.price > maxPrice) return false;
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [products, selectedCategory, selectedStitching, selectedFabric, maxPrice, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedStitching('all');
    setSelectedFabric('all');
    setMaxPrice(650000);
    setSortBy('featured');
  };

  return (
    <div className="min-h-screen bg-white text-[#1A1816]">
      {/* Header Banner */}
      <section className="py-20 bg-[#FAF8F5] border-b border-[#ECE6DE] text-center">
        <div className="max-w-4xl mx-auto px-4">
          <span className="text-xs uppercase tracking-[0.3em] text-[#9E7B3B] font-semibold block mb-2">
            KARACHI HAUTE COUTURE ATELIER
          </span>
          <h1
            className="text-4xl sm:text-5xl font-display font-medium text-[#1A1816] mb-3"
            style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
          >
            The Complete Bridal & Festive Catalog
          </h1>
          <p className="text-xs sm:text-sm text-[#706456] max-w-xl mx-auto leading-relaxed">
            Explore our complete archive of royal lehengas, farshi ghararas, peshwas, and luxury party formals handcrafted to order.
          </p>
        </div>
      </section>

      {/* Interactive Category Tabs */}
      <section className="bg-white border-b border-[#ECE6DE] py-3.5 overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 min-w-max">
          {categoriesList.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-medium transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-[#1A1816] text-white font-semibold shadow-xs'
                  : 'text-[#706456] hover:text-[#1A1816] hover:bg-[#FAF8F5]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Filter & Sort Controls */}
      <section className="py-4 bg-[#FAF8F5] border-b border-[#ECE6DE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3 text-xs text-[#706456]">
            <div className="flex items-center gap-1.5 text-[#1A1816] font-semibold">
              <Filter className="w-3.5 h-3.5 text-[#9E7B3B]" />
              <span>{filteredProducts.length} Creations Available</span>
            </div>

            {/* Stitching filter */}
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

            {/* Fabric filter */}
            <select
              value={selectedFabric}
              onChange={(e) => setSelectedFabric(e.target.value)}
              className="bg-white border border-[#E0D8CB] text-xs text-[#1A1816] py-1.5 px-3 focus:outline-none focus:border-[#9E7B3B] shadow-2xs"
            >
              <option value="all">All Fabrics</option>
              {uniqueFabrics.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>

            {/* Price slider */}
            <div className="flex items-center gap-2 pl-2">
              <span className="text-[#8C7E70]">Max:</span>
              <span className="font-semibold text-[#1A1816] tabular-nums">
                {formatPKR(maxPrice)}
              </span>
              <input
                type="range"
                min="100000"
                max="650000"
                step="25000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-24 accent-[#9E7B3B] cursor-pointer"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 text-xs text-[#706456]">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#9E7B3B]" />
              <span>Sort:</span>
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

            {/* Reset button */}
            {(selectedCategory !== 'all' || selectedStitching !== 'all' || selectedFabric !== 'all' || maxPrice < 650000) && (
              <button
                onClick={resetFilters}
                className="p-1.5 text-[#8C7E70] hover:text-[#1A1816] transition-colors"
                title="Reset Filters"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredProducts.length === 0 ? (
          <div className="py-24 text-center max-w-md mx-auto space-y-4 bg-[#FAF8F5] border border-[#E8E2D8] p-8 shadow-2xs">
            <Sparkles className="w-8 h-8 text-[#9E7B3B] mx-auto opacity-70" />
            <h3 className="text-xl font-serif text-[#1A1816] font-medium">No Ensembles Match These Filters</h3>
            <p className="text-xs text-[#706456] leading-relaxed">
              We frequently produce custom bespoke garments for any color, neckline, and flare requirement. Contact our concierge or reset filters.
            </p>
            <button
              onClick={resetFilters}
              className="px-6 py-2.5 bg-[#1A1816] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#9E7B3B] transition-colors"
            >
              Reset All Filters
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
    </div>
  );
};
