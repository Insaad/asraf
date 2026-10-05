import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import {
  X,
  FileSpreadsheet,
  ExternalLink,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  PlusCircle,
  Sparkles,
  LogOut,
  HelpCircle,
} from 'lucide-react';

export const GoogleSheetsModal: React.FC = () => {
  const {
    isGoogleSheetsOpen,
    closeGoogleSheetsModal,
    googleUser,
    isGoogleConnecting,
    handleGoogleSignIn,
    handleGoogleLogout,
    spreadsheetId,
    setSpreadsheetId,
    spreadsheetUrl,
    handleCreateSampleSheet,
    handleSyncFromSheets,
    isSyncingSheets,
    sheetsError,
    lastSyncedAt,
    products,
  } = useShop();

  const [inputSheetInput, setInputSheetInput] = useState('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (!isGoogleSheetsOpen) return null;

  const handleLinkExistingSheet = () => {
    if (!inputSheetInput.trim()) return;

    let id = inputSheetInput.trim();
    // Support full URL: https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
    const urlMatch = id.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
    if (urlMatch && urlMatch[1]) {
      id = urlMatch[1];
    }

    setSpreadsheetId(id);
    setSuccessMessage('Spreadsheet linked successfully. Click "Sync from Sheet" to load.');
    setTimeout(() => setSuccessMessage(null), 4000);
  };

  const onConfirmCreateSampleSheet = async () => {
    // Explicit confirmation dialog per Destructive / Mutating Workspace requirements
    const confirmed = window.confirm(
      'Create a new Google Sheet titled "Ashrafi Bridal Studio — Live Products & Categories Catalog" in your Google Drive populated with all 16 current sample products?'
    );
    if (!confirmed) return;

    try {
      await handleCreateSampleSheet();
      setSuccessMessage('Sample spreadsheet created successfully in your Google Drive!');
      setTimeout(() => setSuccessMessage(null), 5000);
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white border border-[#E8E2D8] text-[#1A1816] w-full max-w-2xl max-h-[92vh] overflow-y-auto shadow-2xl relative flex flex-col animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-6 border-b border-[#ECE6DE] flex items-center justify-between bg-[#FAF8F5]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-50 border border-emerald-200 rounded-sm">
              <FileSpreadsheet className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <h2
                className="text-xl sm:text-2xl font-display font-medium text-[#1A1816]"
                style={{ fontFamily: 'Cinzel, serif' }}
              >
                Google Sheets Catalog
              </h2>
              <p className="text-[10px] tracking-[0.2em] uppercase text-[#9E7B3B] font-semibold">
                Live Products & Categories Sync
              </p>
            </div>
          </div>

          <button
            onClick={closeGoogleSheetsModal}
            className="p-2 text-[#706456] hover:text-[#1A1816] hover:bg-white border border-transparent hover:border-[#E8E2D8] transition-all rounded-full"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Notifications */}
          {successMessage && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {sheetsError && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{sheetsError}</span>
            </div>
          )}

          {/* 1. Google Account Connection Card */}
          <div className="p-4 bg-[#FAF8F5] border border-[#E8E2D8] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#9E7B3B] font-semibold block mb-1">
                GOOGLE WORKSPACE ACCOUNT
              </span>
              {googleUser ? (
                <div className="flex items-center gap-2.5">
                  {googleUser.photoURL ? (
                    <img
                      src={googleUser.photoURL}
                      alt={googleUser.displayName || 'Google User'}
                      className="w-8 h-8 rounded-full border border-[#D6CEBE]"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-[#1A1816] text-white flex items-center justify-center text-xs font-bold">
                      {googleUser.email ? googleUser.email[0].toUpperCase() : 'G'}
                    </div>
                  )}
                  <div>
                    <span className="text-xs font-semibold text-[#1A1816] block">
                      {googleUser.displayName || 'Authorized User'}
                    </span>
                    <span className="text-[11px] text-[#706456] block">{googleUser.email}</span>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-[#706456]">
                  Sign in with Google to create or sync your products and categories directly from your Google Sheets.
                </p>
              )}
            </div>

            <div>
              {googleUser ? (
                <button
                  onClick={handleGoogleLogout}
                  className="px-3.5 py-2 bg-white border border-[#D6CDBC] hover:border-[#1A1816] text-[#1A1816] text-xs font-medium transition-colors flex items-center gap-1.5"
                >
                  <LogOut className="w-3.5 h-3.5 text-[#706456]" />
                  <span>Disconnect</span>
                </button>
              ) : (
                <button
                  onClick={handleGoogleSignIn}
                  disabled={isGoogleConnecting}
                  className="px-4 py-2.5 bg-white border border-[#D6CDBC] hover:border-[#1A1816] hover:shadow-xs text-[#1A1816] text-xs font-semibold flex items-center gap-2 transition-all active:scale-98 disabled:opacity-50"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>{isGoogleConnecting ? 'Connecting...' : 'Sign in with Google'}</span>
                </button>
              )}
            </div>
          </div>

          {/* 2. Sample Spreadsheet Creation & Linking */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest text-[#1A1816] font-semibold">
                CATALOG SPREADSHEET
              </span>
              {spreadsheetId && (
                <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 border border-emerald-200 font-medium">
                  Connected: {products.length} Products Loaded
                </span>
              )}
            </div>

            {/* One-Click Create Sample Sheet Button */}
            <div className="p-4 bg-gradient-to-r from-[#FAF8F5] to-[#F5EFE6] border border-[#E8E2D8] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <strong className="text-xs font-semibold text-[#1A1816] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#9E7B3B]" />
                  <span>Generate Sample Template in Your Drive</span>
                </strong>
                <p className="text-[11px] text-[#706456] mt-0.5 max-w-md">
                  Automatically provisions a structured Google Sheet with all 16 current bridal outfits, images, descriptions, prices, and categories.
                </p>
              </div>

              <button
                onClick={onConfirmCreateSampleSheet}
                disabled={!googleUser || isSyncingSheets}
                className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-600 active:scale-98 text-white text-xs font-semibold uppercase tracking-wider transition-all disabled:opacity-50 whitespace-nowrap flex items-center justify-center gap-2 shadow-2xs"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Create Sample Sheet</span>
              </button>
            </div>

            {/* Or Link an Existing Spreadsheet */}
            <div className="space-y-2">
              <label className="text-xs text-[#706456] block">
                Or enter an existing Google Sheet URL or ID:
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputSheetInput}
                  onChange={(e) => setInputSheetInput(e.target.value)}
                  placeholder="https://docs.google.com/spreadsheets/d/... or ID"
                  className="flex-1 px-3 py-2 text-xs border border-[#D6CEBE] bg-white text-[#1A1816] focus:outline-none focus:border-[#9E7B3B]"
                />
                <button
                  onClick={handleLinkExistingSheet}
                  className="px-4 py-2 bg-[#1A1816] hover:bg-[#9E7B3B] text-white text-xs uppercase tracking-wider font-semibold transition-colors"
                >
                  Link
                </button>
              </div>
            </div>

            {/* Active Connected Spreadsheet Details */}
            {spreadsheetId && (
              <div className="p-4 bg-white border border-[#E8E2D8] space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] text-[#8C7E70] uppercase tracking-wider block">
                      Active Spreadsheet ID
                    </span>
                    <span className="text-xs font-mono font-medium text-[#1A1816] break-all">
                      {spreadsheetId}
                    </span>
                  </div>

                  <a
                    href={spreadsheetUrl || `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200 text-xs font-semibold transition-colors whitespace-nowrap"
                  >
                    <span>Open in Google Sheets</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#ECE6DE]">
                  <div className="text-[11px] text-[#706456]">
                    {lastSyncedAt ? (
                      <span>Last live sync: <strong>{lastSyncedAt}</strong></span>
                    ) : (
                      <span>Click Sync to pull live changes</span>
                    )}
                  </div>

                  <button
                    onClick={handleSyncFromSheets}
                    disabled={isSyncingSheets || !googleUser}
                    className="px-4 py-2 bg-[#1A1816] hover:bg-[#9E7B3B] text-white text-xs uppercase tracking-wider font-semibold flex items-center gap-1.5 active:scale-98 transition-all disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isSyncingSheets ? 'animate-spin' : ''}`} />
                    <span>{isSyncingSheets ? 'Syncing...' : 'Sync Live from Sheet'}</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 3. Guide to Columns & Editable Fields */}
          <div className="p-4 bg-[#FAF8F5] border border-[#E8E2D8] space-y-2 text-xs text-[#5C5144]">
            <span className="text-[10px] uppercase tracking-widest text-[#9E7B3B] font-semibold flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>HOW TO EDIT PRODUCTS & CATEGORIES</span>
            </span>
            <p className="leading-relaxed">
              Open your connected Google Sheet to edit any cell:
            </p>
            <ul className="list-disc list-inside space-y-1 text-[11px] text-[#706456]">
              <li><strong>Name</strong>: Changes the product title in the catalog.</li>
              <li><strong>Price</strong>: Enter numerical PKR price (e.g. <code>275000</code>).</li>
              <li><strong>Image & SecondaryImage</strong>: Paste any high-res image URLs.</li>
              <li><strong>Category</strong>: Use slugs like <code>nikah</code>, <code>barat</code>, <code>walima</code>, <code>mehndi</code>, <code>sarees</code>, <code>sharara-gharara</code>, <code>frocks-maxis</code>, <code>party-wear</code>.</li>
              <li><strong>Description, Fabric, Embroidery, Status</strong>: Fully editable in seconds.</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#ECE6DE] bg-[#FAF8F5] flex justify-end">
          <button
            onClick={closeGoogleSheetsModal}
            className="px-5 py-2 bg-[#1A1816] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#9E7B3B] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
