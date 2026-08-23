"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { AUBURN_LEWISTON_GROCERY_ITEMS, GroceryItem } from '@/lib/grocery-data';
import { awardXp, loadHunterState, saveHunterState } from '@/lib/hunter-system';
import { ScanLine, Search, AlertCircle, Camera, X, PlusCircle, CheckCircle } from 'lucide-react';

interface BarcodeScannerProps {
  onFoodLogged?: () => void;
}

export default function BarcodeScanner({ onFoodLogged }: BarcodeScannerProps) {
  const [scannerActive, setScannerActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scannedResult, setScannedResult] = useState<GroceryItem | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [customServings, setCustomServings] = useState<number>(1);
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);

  useEffect(() => {
    if (scannerActive) {
      const scanner = new Html5QrcodeScanner(
        "reader",
        { fps: 10, qrbox: { width: 250, height: 150 }, aspectRatio: 1.0 },
        false
      );
      scannerRef.current = scanner;

      scanner.render(
        (decodedText) => {
          handleBarcodeScanned(decodedText);
          scanner.clear();
          setScannerActive(false);
        },
        (error) => {}
      );

      return () => {
        scanner.clear().catch(() => {});
      };
    }
  }, [scannerActive]);

  const handleBarcodeScanned = async (upc: string) => {
    setLoading(true);
    setErrorMsg(null);
    setScannedResult(null);

    let customList: GroceryItem[] = [];
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('pf_custom_grocery_items');
      if (saved) try { customList = JSON.parse(saved); } catch {}
    }
    const allLocal = [...AUBURN_LEWISTON_GROCERY_ITEMS, ...customList];
    const localMatch = allLocal.find(item => item.upc === upc || item.id === upc);
    if (localMatch) {
      setScannedResult(localMatch);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`https://world.openfoodfacts.org/api/v0/product/${upc}.json`);
      const data = await res.json();
      if (data.status === 1 && data.product) {
        const p = data.product;
        const nut = p.nutriments || {};
        const item: GroceryItem = {
          id: `off-${upc}`,
          upc: upc,
          name: p.product_name || "Scanned Food Item",
          store: "All Stores",
          brand: p.brands || "Unknown",
          category: (nut.proteins_100g || 0) > 15 ? 'Protein' : 'Essentials',
          priceEst: "Unknown",
          calories: nut.energy_kcal_100g || nut['energy-kcal_100g'] || nut.energy_100g || 0,
          protein: nut.proteins_100g || 0,
          carbs: nut.carbohydrates_100g || 0,
          fat: nut.fat_100g || 0,
          servingSize: p.serving_size || "100g",
          coachNote: "OpenFoodFacts Database"
        };
        setScannedResult(item);
      } else {
        setErrorMsg(`UPC "${upc}" not found. Try searching by text.`);
      }
    } catch (e) {
      setErrorMsg("Network error looking up barcode.");
    } finally {
      setLoading(false);
    }
  };

  const handleTextSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    setErrorMsg(null);
    setScannedResult(null);

    const q = searchQuery.toLowerCase().trim();
    let customList: GroceryItem[] = [];
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('pf_custom_grocery_items');
      if (saved) try { customList = JSON.parse(saved); } catch {}
    }
    const allLocal = [...AUBURN_LEWISTON_GROCERY_ITEMS, ...customList];
    
    const localMatch = allLocal.find(item => 
      item.name.toLowerCase().includes(q) || item.brand.toLowerCase().includes(q) || item.upc === q
    );

    if (localMatch) {
      setScannedResult(localMatch);
      setLoading(false);
    } else {
      setErrorMsg(`No matches found for "${searchQuery}". Please add manually in Macro Tracker.`);
      setLoading(false);
    }
  };

  const logMeal = () => {
    if (!scannedResult || typeof window === 'undefined') return;
    
    const today = new Date().toISOString().split('T')[0];
    const savedLogs = localStorage.getItem(`pf_meals_${today}`);
    const logs = savedLogs ? JSON.parse(savedLogs) : [];
    
    logs.push({
      id: Date.now().toString(),
      name: `${scannedResult.name} (${customServings}x)`,
      calories: Math.round(scannedResult.calories * customServings),
      protein: Math.round(scannedResult.protein * customServings),
      carbs: Math.round(scannedResult.carbs * customServings),
      fat: Math.round(scannedResult.fat * customServings),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
    
    localStorage.setItem(`pf_meals_${today}`, JSON.stringify(logs));
    window.dispatchEvent(new Event('storage'));

    awardXp(50, 'int', loadHunterState());
    
    setScannedResult(null);
    setSearchQuery('');
    setCustomServings(1);
    
    if (onFoodLogged) onFoodLogged();
  };

  return (
    <div className="bg-[#11182c]/80 backdrop-blur-md border border-white/10 rounded-3xl p-6 shadow-xl w-full mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 border-b border-white/10 pb-4">
        <div>
          <h2 className="text-2xl font-black text-white flex items-center gap-2">
            <ScanLine className="w-6 h-6 text-[#ce1126]" /> 
            Barcode Scanner
          </h2>
          <p className="text-xs text-zinc-400 font-mono mt-1">Auburn / Lewiston Local DB + Global Search</p>
        </div>
        <button
          onClick={() => setScannerActive(!scannerActive)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all ${scannerActive ? 'bg-red-500/20 text-red-500 border border-red-500/30' : 'bg-[#0a3d8f] text-white shadow-[0_0_15px_rgba(10,61,143,0.3)] hover:scale-105'}`}
        >
          {scannerActive ? <X className="w-5 h-5" /> : <Camera className="w-5 h-5" />}
          {scannerActive ? 'Stop Scanner' : 'Scan Barcode'}
        </button>
      </div>

      {scannerActive && (
        <div className="mb-6 rounded-2xl overflow-hidden border border-white/10 bg-black max-w-sm mx-auto shadow-2xl relative">
          <div id="reader" className="w-full"></div>
          <div className="absolute inset-0 border-4 border-[#0a3d8f]/50 rounded-2xl pointer-events-none" />
        </div>
      )}

      <form onSubmit={handleTextSearch} className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search Walmart, Hannaford, Shaws..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-black/40 border border-white/10 text-white placeholder-zinc-500 rounded-xl px-5 py-4 pl-12 outline-none focus:border-[#f5a623] focus:ring-1 focus:ring-[#f5a623] transition-all shadow-inner"
          />
          <Search className="w-5 h-5 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#f5a623] hover:bg-[#d48b1c] text-white p-2 rounded-lg transition-colors">
            <Search className="w-4 h-4" />
          </button>
        </div>
      </form>

      {loading && (
        <div className="flex flex-col items-center justify-center py-10 space-y-4">
          <div className="w-8 h-8 border-4 border-[#0a3d8f] border-t-transparent rounded-full animate-spin" />
          <p className="text-zinc-400 text-sm font-mono animate-pulse">Searching databases...</p>
        </div>
      )}

      {errorMsg && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-start gap-3 mb-6">
          <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <p className="text-sm text-red-200">{errorMsg}</p>
        </div>
      )}

      {scannedResult && !loading && (
        <div className="bg-gradient-to-br from-black/80 to-[#11182c] border border-white/20 rounded-2xl p-5 shadow-2xl animate-in slide-in-from-bottom-4 duration-300 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest bg-white/10 px-2 py-1 rounded text-zinc-300 border border-white/5">{scannedResult.store}</span>
          </div>

          <div className="flex gap-4 mb-4 items-start pr-20">
            <div className="w-12 h-12 rounded-xl bg-[#0a3d8f]/20 border border-[#0a3d8f]/40 flex items-center justify-center shrink-0 shadow-inner">
              <CheckCircle className="w-6 h-6 text-[#0a3d8f] drop-shadow-sm" />
            </div>
            <div>
              <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mb-1">{scannedResult.brand}</p>
              <h3 className="text-lg font-black text-white leading-tight">{scannedResult.name}</h3>
              <p className="text-xs text-zinc-500 mt-1 font-mono">UPC: {scannedResult.upc}</p>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2 mb-6">
            <div className="bg-black/40 border border-white/5 rounded-lg p-2 text-center">
              <div className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider mb-1">Cals</div>
              <div className="text-[#f5a623] font-mono font-black text-sm">{scannedResult.calories}</div>
            </div>
            <div className="bg-black/40 border border-white/5 rounded-lg p-2 text-center">
              <div className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider mb-1">Prot</div>
              <div className="text-[#4ade80] font-mono font-black text-sm">{scannedResult.protein}g</div>
            </div>
            <div className="bg-black/40 border border-white/5 rounded-lg p-2 text-center">
              <div className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider mb-1">Carbs</div>
              <div className="text-[#0a3d8f] font-mono font-black text-sm">{scannedResult.carbs}g</div>
            </div>
            <div className="bg-black/40 border border-white/5 rounded-lg p-2 text-center">
              <div className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider mb-1">Fat</div>
              <div className="text-[#ce1126] font-mono font-black text-sm">{scannedResult.fat}g</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 items-end">
            <div className="w-full sm:w-auto">
              <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1 pl-1">Servings</label>
              <div className="flex items-center gap-2 bg-black/40 border border-white/10 rounded-xl p-1 w-fit">
                <button type="button" onClick={() => setCustomServings(Math.max(0.5, customServings - 0.5))} className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-white font-bold flex items-center justify-center">-</button>
                <div className="w-12 text-center font-mono font-bold text-white text-sm">{customServings}</div>
                <button type="button" onClick={() => setCustomServings(customServings + 0.5)} className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-white font-bold flex items-center justify-center">+</button>
              </div>
            </div>
            
            <button
              onClick={logMeal}
              className="flex-1 w-full bg-gradient-to-r from-[#ce1126] to-[#f5a623] hover:from-[#a00d1d] hover:to-[#d48b1c] text-white px-5 py-3 rounded-xl font-bold tracking-wide transition-all shadow-[0_0_15px_rgba(206,17,38,0.3)] flex items-center justify-center gap-2"
            >
              <PlusCircle className="w-5 h-5" />
              Log {Math.round(scannedResult.calories * customServings)} kcal
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
