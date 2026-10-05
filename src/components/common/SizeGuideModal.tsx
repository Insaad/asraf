import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { X, Ruler, CheckCircle } from 'lucide-react';

export const SizeGuideModal: React.FC = () => {
  const { isSizeGuideOpen, closeSizeGuideModal } = useShop();
  const [unit, setUnit] = useState<'inches' | 'cm'>('inches');

  if (!isSizeGuideOpen) return null;

  const sizeData = [
    { size: 'XS', bust: 32, waist: 26, hip: 36, shoulder: 13.5, choliLen: 14.5, lehengaLen: 42 },
    { size: 'S', bust: 34, waist: 28, hip: 38, shoulder: 14.0, choliLen: 15.0, lehengaLen: 42.5 },
    { size: 'M', bust: 36, waist: 30, hip: 40, shoulder: 14.5, choliLen: 15.5, lehengaLen: 43 },
    { size: 'L', bust: 38, waist: 32, hip: 42, shoulder: 15.0, choliLen: 16.0, lehengaLen: 43.5 },
    { size: 'XL', bust: 41, waist: 35, hip: 45, shoulder: 15.5, choliLen: 16.5, lehengaLen: 44 },
  ];

  const convert = (valInches: number) => {
    return unit === 'inches' ? valInches : Math.round(valInches * 2.54);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white border border-[#E8E2D8] text-[#1A1816] w-full max-w-2xl p-6 sm:p-8 shadow-2xl relative">
        <button
          onClick={closeSizeGuideModal}
          className="absolute top-5 right-5 p-2 text-[#706456] hover:text-[#1A1816] transition-colors"
          aria-label="Close size guide"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-1">
          <Ruler className="w-5 h-5 text-[#9E7B3B]" />
          <span className="text-[10px] uppercase tracking-widest text-[#9E7B3B] font-semibold">
            ASHRAFI BESPOKE BRIDAL MEASUREMENTS
          </span>
        </div>
        <h3 className="text-2xl font-serif text-[#1A1816] mb-2 font-medium" style={{ fontFamily: 'Cinzel, serif' }}>
          Bridal Sizing & Fitting Standard
        </h3>
        <p className="text-xs text-[#706456] mb-6">
          Every Ashrafi bridal lehenga is handcrafted with internal margin allowances of 2.5 to 3 inches for effortless alteration.
        </p>

        {/* Unit Toggle */}
        <div className="flex justify-end mb-4">
          <div className="inline-flex border border-[#E0D8CB] p-0.5 bg-[#FAF8F5]">
            <button
              onClick={() => setUnit('inches')}
              className={`px-3 py-1 text-xs transition-colors ${
                unit === 'inches' ? 'bg-white text-[#1A1816] font-semibold shadow-2xs' : 'text-[#706456]'
              }`}
            >
              Inches (in)
            </button>
            <button
              onClick={() => setUnit('cm')}
              className={`px-3 py-1 text-xs transition-colors ${
                unit === 'cm' ? 'bg-white text-[#1A1816] font-semibold shadow-2xs' : 'text-[#706456]'
              }`}
            >
              Centimeters (cm)
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border border-[#E8E2D8] mb-6">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#FAF8F5] text-[#1A1816] uppercase tracking-wider text-[11px] font-semibold border-b border-[#E8E2D8]">
              <tr>
                <th className="py-3 px-3">Size</th>
                <th className="py-3 px-3">Bust</th>
                <th className="py-3 px-3">Waist</th>
                <th className="py-3 px-3">Hip</th>
                <th className="py-3 px-3">Shoulder</th>
                <th className="py-3 px-3">Choli Len</th>
                <th className="py-3 px-3">Lehenga Len</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0EBE3]">
              {sizeData.map((row) => (
                <tr key={row.size} className="hover:bg-[#FAF8F5] transition-colors">
                  <td className="py-2.5 px-3 font-semibold text-[#1A1816]">{row.size}</td>
                  <td className="py-2.5 px-3 text-[#5C5144] tabular-nums">{convert(row.bust)}</td>
                  <td className="py-2.5 px-3 text-[#5C5144] tabular-nums">{convert(row.waist)}</td>
                  <td className="py-2.5 px-3 text-[#5C5144] tabular-nums">{convert(row.hip)}</td>
                  <td className="py-2.5 px-3 text-[#5C5144] tabular-nums">{convert(row.shoulder)}</td>
                  <td className="py-2.5 px-3 text-[#5C5144] tabular-nums">{convert(row.choliLen)}</td>
                  <td className="py-2.5 px-3 text-[#5C5144] tabular-nums">{convert(row.lehengaLen)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Atelier Fitting note */}
        <div className="p-4 bg-[#FAF8F5] border border-[#E8E2D8] text-xs text-[#5C5144] flex items-start gap-3">
          <CheckCircle className="w-4 h-4 text-[#9E7B3B] shrink-0 mt-0.5" />
          <p>
            <strong>Complimentary Custom Fitting:</strong> Selecting "Custom Bridal Fit" allows you to enter your personal measurements in the order notes, or schedule an in-person measurement appointment with our master master-cutter at Tariq Road.
          </p>
        </div>
      </div>
    </div>
  );
};
