"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { AUBURN_LEWISTON_GROCERY_ITEMS, GroceryItem } from '@/lib/grocery-data';
import { awardXp, loadHunterState, saveHunterState } from '@/lib/hunter-system';
import { ScanLine, Search, CheckCircle, AlertCircle, Camera, X, PlusCircle, Utensils, Sparkles } from 'lucide-react';

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
        /* verbose= */ false
      );
      scannerRef.current = scanner;

      scanner.render(
        (decodedText) => {
          handleBarcodeScanned(decodedText);
          scanner.clear();
          setScannerActive(false);
        },
        (error) => {
          // ignore scan errors per frame
        }
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

    // 1. Check local Auburn/Lewiston database first
    const localMatch = AUBURN_LEWISTON_GROCERY_ITEMS.find(item => item.upc === upc || item.id === upc);
    if (localMatch) {
      setScannedResult(localMatch);
      setLoading(false);
      return;
    }

    // 2. Query OpenFoodFacts API
    try {
      const res = await fetch(`https://world.openfoodfacts.org/api/v0/product/${upc}.json`);
      const data = await res.json();
      if (data.status === 1 && data.product) {
        const p = data.product;
        const nut = p.nutriments || {};
        const item: GroceryItem = {
          id: `off-${upc}`,
          upc: upc,
          name: p.product_name || "Scanned Grocery Item",
          store: "All Stores",
          brand: p.brands || "Generic / Walmart / Hannaford",
          category: (nut.proteins_100g || 0) > 15 ? 'Protein' : 'Essentials',
          priceEst: "Est. Store Brand Price",
          calories: Math.round(nut['energy-kcal_serving'] || nut['energy-kcal_100g'] || nut['energy-kcal'] || 150),
          protein: Math.round(nut.proteins_serving || nut.proteins_100g || nut.proteins || 5),
          carbs: Math.round(nut.carbohydrates_serving || nut.carbohydrates_100g || nut.carbohydrates || 15),
          fat: Math.round(nut.fat_serving || nut.fat_100g || nut.fat || 3),
          servingSize: p.serving_size || "1 Serving (100g)",
          coachNote: "Scanned directly via OpenFoodFacts database. Verify serving size matches your meal portion!"
        };
        setScannedResult(item);
      } else {
        setErrorMsg(`UPC "${upc}" not found in database. Try searching by text below or select from our Auburn/Lewiston ME grocery guide!`);
      }
    } catch (e) {
      setErrorMsg("Network error looking up barcode. Please try manual text search below.");
    } finally {
      setLoading(false);
    }
  };

  const handleManualSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setLoading(true);
    setErrorMsg(null);

    const q = searchQuery.toLowerCase().trim();
    const match = AUBURN_LEWISTON_GROCERY_ITEMS.find(
      item => item.name.toLowerCase().includes(q) || item.brand.toLowerCase().includes(q) || item.category.toLowerCase().includes(q)
    );

    if (match) {
      setScannedResult(match);
      setLoading(false);
    } else {
      setErrorMsg(`No direct local match for "${searchQuery}". Showing closest high-protein recommendation!`);
      setScannedResult(AUBURN_LEWISTON_GROCERY_ITEMS[0]); // fallback to chicken
      setLoading(false);
    }
  };

  const handleLogFood = () => {
    if (!scannedResult) return;
    const cals = Math.round(scannedResult.calories * customServings);
    const prot = Math.round(scannedResult.protein * customServings);

    // Save to local meal log
    if (typeof window !== 'undefined') {
      const today = new Date().toISOString().split('T')[0];
      const savedLogs = localStorage.getItem(`pf_meals_${today}`);
      const logs = savedLogs ? JSON.parse(savedLogs) : [];
      logs.push({
        id: Date.now().toString(),
        name: `${scannedResult.name} (${customServings}x)`,
        calories: cals,
        protein: prot,
        carbs: Math.round(scannedResult.carbs * customServings),
        fat: Math.round(scannedResult.fat * customServings),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
      localStorage.setItem(`pf_meals_${today}`, JSON.stringify(logs));
    }

    // Award XP & mark daily nutrition quest progress
    awardXp(50, 'int');
    const state = loadHunterState();
    if (!state.completedQuestsToday.calories) {
      state.completedQuestsToday.calories = true;
    }
    saveHunterState(state);

    if (onFoodLogged) onFoodLogged();
    setScannedResult(null);
    setCustomServings(1);
    alert(`⚡ Successfully logged +${cals} kcal & +${prot}g protein to your Daily Quest!`);
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header */}
      <div className="bg-system-panel p-6 rounded-2xl border border-system-blue/30 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-system-cyan mb-1">
            <Sparkles className="w-3.5 h-3.5 text-system-blue" />
            <span>OpenFoodFacts & Local Walmart / Shaw's / Hannaford UPC Engine</span>
          </div>
          <h2 className="text-2xl font-black tracking-wider text-white uppercase text-glow">
            Hunter Barcode Scanner
          </h2>
          <p className="text-xs text-zinc-400 mt-1 max-w-xl">
            Scan ingredient barcodes with your web camera or use quick text search to instantly log calories and macros toward your 2,650 kcal / 190g protein daily goals.
          </p>
        </div>

        <button
          onClick={() => {
            setScannerActive(!scannerActive);
            setScannedResult(null);
            setErrorMsg(null);
          }}
          className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-black uppercase text-xs sm:text-sm tracking-widest transition-all min-h-[44px] ${
            scannerActive
              ? 'bg-red-500 text-white shadow-lg'
              : 'bg-gradient-to-r from-system-blue to-system-cyan text-black hover:bg-white shadow-glow-blue'
          }`}
        >
          <Camera className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>{scannerActive ? 'Close Camera' : 'Activate Camera Scanner'}</span>
        </button>
      </div>

      {/* Live Camera Scanner Box */}
      {scannerActive && (
        <div className="bg-system-card p-6 rounded-2xl border border-system-blue shadow-glow-blue flex flex-col items-center justify-center space-y-4 animate-in fade-in duration-200">
          <div className="text-center space-y-1">
            <h3 className="text-base font-black text-white uppercase tracking-wider">Point Camera at Ingredient Barcode</h3>
            <p className="text-xs text-zinc-400">Position the UPC code inside the scanner box. It will automatically detect and fetch macros.</p>
          </div>
          <div id="reader" className="w-full max-w-md bg-black/60 rounded-xl overflow-hidden border border-system-blue/40 p-2" />
          <button
            onClick={() => setScannerActive(false)}
            className="text-xs text-zinc-400 hover:text-white uppercase font-bold py-2 px-4 min-h-[44px]"
          >
            Cancel Scanning
          </button>
        </div>
      )}

      {/* Manual Search Bar & Quick Lookups */}
      <div className="bg-system-panel p-6 rounded-2xl border border-white/10 space-y-4">
        <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
          <Search className="w-4 h-4 text-system-blue" />
          <span>Manual Text Search / Quick UPC Backup</span>
        </h3>
        
        <form onSubmit={handleManualSearch} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search e.g. 'Chicken', 'Greek Yogurt', 'Eggs', 'Oats', or paste UPC code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-system-dark border border-system-blue/40 rounded-xl px-4 py-3.5 font-mono text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-system-blue shadow-inner"
            />
          </div>
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-system-card border border-system-blue/50 text-system-cyan font-bold uppercase text-xs sm:text-sm tracking-wider hover:bg-system-blue hover:text-black transition-all min-h-[44px]"
          >
            Search Food
          </button>
        </form>

        {/* Quick Click Badges for Auburn / Lewiston Stores */}
        <div className="pt-2">
          <div className="text-[11px] text-zinc-400 uppercase font-bold mb-2">⚡ Instant Auburn / Lewiston ME Staples:</div>
          <div className="flex flex-wrap gap-2">
            {AUBURN_LEWISTON_GROCERY_ITEMS.slice(0, 5).map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setScannedResult(item);
                  setErrorMsg(null);
                }}
                className="px-3 py-1.5 rounded-lg bg-system-dark border border-white/10 hover:border-system-blue/40 text-xs text-zinc-300 hover:text-white transition-all flex items-center gap-1.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-system-blue" />
                <span>{item.name.replace('Great Value ', 'GV ')}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Error Notice */}
      {errorMsg && (
        <div className="bg-red-500/10 border border-red-500/40 p-4 rounded-xl flex items-center gap-3 text-red-400 text-xs">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Scanned / Found Food Result Card */}
      {scannedResult && (
        <div className="bg-gradient-to-br from-system-panel via-system-card to-system-dark p-6 rounded-2xl border border-system-cyan shadow-glow-blue space-y-6 animate-in zoom-in-95 duration-200">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-system-blue text-system-dark">
                  {scannedResult.brand}
                </span>
                <span className="text-[10px] font-mono text-zinc-400">{scannedResult.store}</span>
              </div>
              <h3 className="text-xl font-black text-white uppercase mt-1">
                {scannedResult.name}
              </h3>
              <div className="text-xs text-system-gold font-mono mt-0.5">Serving: {scannedResult.servingSize}</div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-system-dark px-3 py-1.5 rounded-xl border border-white/10">
                <span className="text-xs text-zinc-400 uppercase font-bold">Servings:</span>
                <select
                  value={customServings}
                  onChange={(e) => setCustomServings(parseFloat(e.target.value))}
                  className="bg-transparent text-white font-mono font-bold text-sm focus:outline-none"
                >
                  <option value={0.5} className="bg-system-dark">0.5x</option>
                  <option value={1} className="bg-system-dark">1.0x</option>
                  <option value={1.5} className="bg-system-dark">1.5x</option>
                  <option value={2} className="bg-system-dark">2.0x</option>
                  <option value={3} className="bg-system-dark">3.0x</option>
                </select>
              </div>
            </div>
          </div>

          {/* Macro Breakdown Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-system-dark p-4 rounded-xl border border-system-blue/30 text-center">
              <div className="text-[11px] text-zinc-400 font-bold uppercase">Calories</div>
              <div className="text-2xl font-black text-white font-mono mt-1 text-glow">
                {Math.round(scannedResult.calories * customServings)}
              </div>
              <div className="text-[10px] text-system-cyan font-mono">kcal</div>
            </div>

            <div className="bg-system-dark p-4 rounded-xl border border-system-cyan/30 text-center">
              <div className="text-[11px] text-zinc-400 font-bold uppercase">Protein</div>
              <div className="text-2xl font-black text-system-cyan font-mono mt-1">
                {Math.round(scannedResult.protein * customServings)}g
              </div>
              <div className="text-[10px] text-zinc-400 font-mono">Muscle Armor</div>
            </div>

            <div className="bg-system-dark p-4 rounded-xl border border-white/10 text-center">
              <div className="text-[11px] text-zinc-400 font-bold uppercase">Carbs</div>
              <div className="text-2xl font-black text-white font-mono mt-1">
                {Math.round(scannedResult.carbs * customServings)}g
              </div>
              <div className="text-[10px] text-zinc-400 font-mono">Lifting Fuel</div>
            </div>

            <div className="bg-system-dark p-4 rounded-xl border border-white/10 text-center">
              <div className="text-[11px] text-zinc-400 font-bold uppercase">Fat</div>
              <div className="text-2xl font-black text-white font-mono mt-1">
                {Math.round(scannedResult.fat * customServings)}g
              </div>
              <div className="text-[10px] text-zinc-400 font-mono">Hormone Health</div>
            </div>
          </div>

          {/* Coach Note & Log Action */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-2">
            <p className="text-xs text-zinc-300 leading-relaxed max-w-xl">
              <strong className="text-system-gold">Coach's Advice:</strong> {scannedResult.coachNote}
            </p>

            <button
              onClick={handleLogFood}
              className="w-full md:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-system-blue to-system-cyan text-system-dark font-black uppercase tracking-widest text-sm shadow-glow-blue hover:from-white hover:to-white transition-all transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <PlusCircle className="w-5 h-5" />
              <span>Log to Daily Quest (+{Math.round(scannedResult.calories * customServings)} kcal)</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
