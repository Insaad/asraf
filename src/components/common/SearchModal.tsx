import React, { useState, useMemo } from 'react';
import { useShop } from '../../context/ShopContext';
import { PRODUCTS } from '../../data/products';
import { X, Search as SearchIcon, ArrowRight } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, closeSearchModal, openProductModal, formatPKR } = useShop();
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q) ||
        p.fabric.toLowerCase().includes(q) ||
        p.embroidery.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }, [query]);

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-start justify-center pt-20 p-4 animate-in fade-in duration-200">
      <div className="bg-white border border-[#E8E2D8] text-[#1A1816] w-full max-w-2xl shadow-2xl p-6 sm:p-8 relative">
        <button
          onClick={closeSearchModal}
          className="absolute top-5 right-5 p-2 text-[#706456] hover:text-[#1A1816] transition-colors"
          aria-label="Close search modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <span className="text-[10px] uppercase tracking-widest text-[#9E7B3B] font-semibold block">
            ASHRAFI SEARCH CONCIERGE
          </span>
          <h3 className="text-2xl font-serif text-[#1A1816] mt-1 font-medium" style={{ fontFamily: 'Cinzel, serif' }}>
            Find Your Bridal Masterpiece
          </h3>
        </div>

        {/* Input box */}
        <div className="relative mb-6">
          <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C7E70]" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by lehenga, saree, zardozi, velvet, nikah, walima..."
            className="w-full bg-[#FAF8F5] border border-[#E0D8CB] text-sm text-[#1A1816] placeholder-[#8C7E70] pl-10 pr-4 py-3 focus:outline-none focus:border-[#9E7B3B] transition-colors shadow-2xs"
          />
        </div>

        {/* Quick searches */}
        {!query && (
          <div className="space-y-3">
            <span className="text-[11px] uppercase tracking-wider text-[#706456] font-semibold block">
              Suggested Bridal Terms:
            </span>
            <div className="flex flex-wrap gap-2">
              {['Nikah White', 'Barat Maroon', 'Zardozi', 'Farshi Gharara', 'Peshwas', 'Organza Saree', 'Austrian Crystal'].map(
                (term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-3 py-1.5 bg-[#FAF8F5] hover:bg-[#F2ECE3] border border-[#E8E2D8] text-xs text-[#5C5144] hover:text-[#1A1816] transition-colors"
                  >
                    {term}
                  </button>
                )
              )}
            </div>
          </div>
        )}

        {/* Results */}
        {query && (
          <div className="max-h-80 overflow-y-auto divide-y divide-[#F0EBE3] mt-4">
            {filtered.length === 0 ? (
              <div className="py-8 text-center text-xs text-[#706456]">
                No bridal pieces match "{query}". Please search by fabric, ceremony, or color.
              </div>
            ) : (
              filtered.map((product) => (
                <div
                  key={product.id}
                  onClick={() => {
                    closeSearchModal();
                    openProductModal(product);
                  }}
                  className="py-3 px-2 flex items-center gap-4 hover:bg-[#FAF8F5] cursor-pointer transition-colors group"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-16 object-cover object-top border border-[#E8E2D8]"
                  />
                  <div className="flex-1">
                    <span className="text-[10px] uppercase tracking-wider text-[#9E7B3B] font-semibold block">
                      {product.categoryName} · {product.status}
                    </span>
                    <h4 className="text-sm font-serif text-[#1A1816] group-hover:text-[#9E7B3B] transition-colors font-medium">
                      {product.name}
                    </h4>
                    <p className="text-xs text-[#706456] line-clamp-1">{product.fabric}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-[#1A1816] tabular-nums block">
                      {formatPKR(product.price)}
                    </span>
                    <span className="text-[10px] text-[#9E7B3B] group-hover:translate-x-1 transition-transform inline-flex items-center gap-0.5 font-medium">
                      View →
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};
