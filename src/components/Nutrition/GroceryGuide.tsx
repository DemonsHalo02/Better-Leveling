"use client";

import React, { useState, useEffect } from 'react';
import { AUBURN_LEWISTON_GROCERY_ITEMS, MEAL_PREP_PLANS, GroceryItem, WALMART_QUICK_SELECT_ITEMS } from '@/lib/grocery-data';
import { ShoppingBag, CheckCircle2, Circle, Utensils, DollarSign, MapPin, Sparkles, Award, RotateCcw, Calendar, Plus, Trash2, Printer, Mail, ExternalLink } from 'lucide-react';


export default function GroceryGuide() {
  const [selectedStore, setSelectedStore] = useState<string>('All Stores');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [activeTab, setActiveTab] = useState<'items' | 'plans'>('items');
  const [selectedCountryPlan, setSelectedCountryPlan] = useState<string>('All');
  const [selectedAisleTemplate, setSelectedAisleTemplate] = useState<string>('All');

  const [customItems, setCustomItems] = useState<GroceryItem[]>([]);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [customName, setCustomName] = useState('');
  const [customStore, setCustomStore] = useState<GroceryItem['store']>('Walmart Supercenter (Auburn, ME)');
  const [customCategory, setCustomCategory] = useState<GroceryItem['category']>('Essentials');
  const [customPrice, setCustomPrice] = useState('');
  const [customNote, setCustomNote] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Calculate current week key (Monday base)
      const now = new Date();
      const day = now.getDay();
      const diff = now.getDate() - day + (day === 0 ? -6 : 1);
      const monday = new Date(now.setDate(diff));
      const currentWeekKey = `${monday.getFullYear()}-${monday.getMonth()}-${monday.getDate()}`;

      const savedWeekKey = localStorage.getItem('pf_grocery_week_key');
      if (savedWeekKey && savedWeekKey !== currentWeekKey) {
        // Auto-reset on new Monday week!
        localStorage.removeItem('pf_grocery_checked');
        localStorage.setItem('pf_grocery_week_key', currentWeekKey);
        setCheckedItems({});
      } else {
        const saved = localStorage.getItem('pf_grocery_checked');
        if (saved) setCheckedItems(JSON.parse(saved));
        if (!savedWeekKey) localStorage.setItem('pf_grocery_week_key', currentWeekKey);
      }

      const savedCustom = localStorage.getItem('pf_custom_grocery_items');
      if (savedCustom) {
        try { setCustomItems(JSON.parse(savedCustom)); } catch {}
      }
    }
  }, []);

  const handleToggleCheck = (id: string) => {
    setCheckedItems(prev => {
      const updated = { ...prev, [id]: !prev[id] };
      if (typeof window !== 'undefined') {
        localStorage.setItem('pf_grocery_checked', JSON.stringify(updated));
      }
      return updated;
    });
  };

  const handleManualReset = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('pf_grocery_checked');
    }
    setCheckedItems({});
  };

  const handleAddCustomItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim() || !customPrice.trim()) return;

    const newItem: GroceryItem = {
      id: `custom-${Date.now()}`,
      upc: "000000000000",
      name: customName.trim(),
      store: customStore,
      brand: "Custom Entry",
      category: customCategory,
      priceEst: customPrice.trim().startsWith('$') ? customPrice.trim() : `$${customPrice.trim()}`,
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      servingSize: "1 unit",
      coachNote: customNote.trim() || "Custom added item for weekly Boricua prep."
    };

    const updated = [newItem, ...customItems];
    setCustomItems(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('pf_custom_grocery_items', JSON.stringify(updated));
    }

    setShowAddModal(false);
    setCustomName('');
    setCustomPrice('');
    setCustomNote('');
  };

  const handleRemoveCustomItem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = customItems.filter(item => item.id !== id);
    setCustomItems(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('pf_custom_grocery_items', JSON.stringify(updated));
    }
  };

  const allItems = [...AUBURN_LEWISTON_GROCERY_ITEMS, ...customItems];

  const filteredItems = allItems.filter(item => {
    const matchStore = selectedStore === 'All Stores' || item.store === selectedStore;
    const matchCat = selectedCategory === 'All' || selectedCategory === '🍱 Meal Prep Templates' || item.category === selectedCategory;
    const matchTemplate = selectedAisleTemplate === 'All' || (item.cuisine ? item.cuisine.includes(selectedAisleTemplate) : item.id.startsWith('custom-'));
    return matchStore && matchCat && matchTemplate;
  });

  const extractPrice = (priceStr: string): number => {
    if (!priceStr) return 0;
    const match = priceStr.match(/\$(\d+(\.\d+)?)/);
    if (match && match[1]) {
      return parseFloat(match[1]);
    }
    return 0;
  };

  const totalItemsCount = allItems.length;
  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
  const progressPct = totalItemsCount > 0 ? Math.round((checkedCount / totalItemsCount) * 100) : 0;

  const totalEstPrice = allItems.reduce((sum, item) => sum + extractPrice(item.priceEst), 0);
  const checkedEstPrice = allItems.filter(item => checkedItems[item.id]).reduce((sum, item) => sum + extractPrice(item.priceEst), 0);

  const stores = ['All Stores', 'Walmart Supercenter (Auburn, ME)', "Shaw's (Auburn/Lewiston)", 'Hannaford (Lewiston/Auburn)'];
  const categories = ['All', 'Protein', 'Carbs', 'Fats', 'Produce', 'Essentials', 'Toiletries / Non-Grocery', '🍱 Meal Prep Templates'];

  const handlePrintPlan = (plan: typeof MEAL_PREP_PLANS[0]) => {
    const slugMap: Record<string, string> = {
      'China': '/Chinese_Meal_Plan_Under_50.html',
      'Korea': '/Korean_Meal_Plan_Under_50.html',
      'Japan': '/Japanese_Meal_Plan_Under_50.html',
      'Puerto Rico': '/Puerto_Rico_Meal_Plan_Under_50.html',
      'Mexico': '/Mexican_Meal_Plan_Under_50.html',
    };
    const url = slugMap[plan.country] || '/Chinese_Meal_Plan_Under_50.html';
    window.open(url, '_blank');
  };

  const handleEmailPlan = (plan: typeof MEAL_PREP_PLANS[0]) => {
    const subject = encodeURIComponent('Better Leveling v2 - ' + plan.title + ' (Under $50)');
    const bodyText = 'Hunter Nick Crosson,\n\nHere is your S-Rank Meal Prep Template for ' + plan.country + ':\n\n' +
      'PLAN: ' + plan.title + '\n' +
      'EST. COST: ' + plan.estCostPerWeek + '\n' +
      'TARGET MACROS: ' + plan.targetDailyCalories + ' kcal | ' + plan.targetDailyProtein + 'g Protein\n\n' +
      'DESCRIPTION:\n' + plan.description + '\n\n' +
      'DAILY TIMELINE:\n' +
      plan.meals.map(m => '[' + m.time + '] ' + m.name + ' (' + m.calories + ' kcal, ' + m.protein + 'g protein)\nIngredients:\n' + m.ingredients.map(i => '- ' + i).join('\n')).join('\n\n') +
      '\n\nStay disciplined and conquer your 170 LB target!';
    
    window.location.href = 'mailto:ncrossonofficial06@gmail.com?subject=' + subject + '&body=' + encodeURIComponent(bodyText);
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header */}
      <div className="bg-system-panel p-6 rounded-2xl border border-system-blue/30 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-system-cyan mb-1">
            <MapPin className="w-3.5 h-3.5 text-system-blue" />
            <span>Auburn & Lewiston, Maine Budget Grocery Guide</span>
          </div>
          <h2 className="text-2xl font-black tracking-wider text-white uppercase text-glow">
            Hunter Grocery Companion
          </h2>
          <p className="text-xs text-zinc-400 mt-1 max-w-xl">
            High-protein, authentic Puerto Rican style staples priced specifically for Auburn Walmart Supercenter (plus Shaw's/Hannaford) to keep your weekly prep under budget! Includes Keurig K-Cup coffee, Sazón, Tostones, and 0-calorie cooking spray.
          </p>
        </div>

        <div className="flex bg-system-dark p-1 rounded-xl border border-white/10">
          <button
            onClick={() => setActiveTab('items')}
            className={`px-5 py-2 rounded-lg font-bold text-xs uppercase tracking-wider transition-all ${
              activeTab === 'items'
                ? 'bg-system-blue text-system-dark font-black shadow-glow-blue'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Aisle Checklist
          </button>
          <button
            onClick={() => setActiveTab('plans')}
            className={`px-5 py-2 rounded-lg font-bold text-xs uppercase tracking-wider transition-all ${
              activeTab === 'plans'
                ? 'bg-system-blue text-system-dark font-black shadow-glow-blue'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Meal Prep Plans
          </button>
        </div>
      </div>

      {activeTab === 'items' ? (
        <>
          {/* Monday Prep Shopping Progress Banner */}
          <div className="bg-system-card p-5 rounded-2xl border border-system-blue/30 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="bg-system-blue text-system-dark text-[10px] font-black uppercase px-2 py-0.5 rounded">
                  Weekly Monday Prep
                </span>
                <span className="text-xs text-system-cyan font-mono flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> Shop Monday | Eat Tuesday
                </span>
              </div>
              <h3 className="text-lg font-black text-white uppercase tracking-wide">
                Auburn Walmart Shopping Cart ({checkedCount}/{totalItemsCount} Checked)
              </h3>
              <p className="text-xs text-zinc-400">
                Check off items as you put them in your cart! List automatically resets every Monday morning for your weekly prep.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-between md:justify-end">
              <div className="bg-system-dark/90 p-2 rounded-xl border border-system-gold/40 shadow-inner flex flex-col justify-center min-w-[120px]">
                <div className="text-[10px] font-mono font-bold text-zinc-400 uppercase">Est. Cart Cost</div>
                <div className="text-xs sm:text-sm font-black text-system-gold font-mono flex items-center gap-1">
                  <span>${checkedEstPrice.toFixed(2)}</span>
                  <span className="text-[10px] text-zinc-500 font-normal">/ ${totalEstPrice.toFixed(2)}</span>
                </div>
              </div>

              <div className="w-32 bg-black/50 p-2 rounded-xl border border-white/10 hidden sm:block">
                <div className="flex justify-between text-[10px] font-mono font-bold mb-1">
                  <span className="text-zinc-400">Cart Progress</span>
                  <span className="text-system-cyan">{progressPct}%</span>
                </div>
                <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-system-blue to-system-cyan rounded-full transition-all duration-300" style={{ width: `${progressPct}%` }} />
                </div>
              </div>

              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-system-blue to-system-cyan text-black font-black uppercase tracking-wider text-xs shadow-glow-blue hover:bg-white transition-all min-h-[38px]"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Item</span>
              </button>

              <button
                onClick={handleManualReset}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-system-dark hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 transition-all text-xs font-bold uppercase tracking-wider whitespace-nowrap min-h-[38px]"
              >
                <RotateCcw className="w-3.5 h-3.5 text-system-gold" />
                <span>Reset List</span>
              </button>
            </div>
          </div>

          {/* Add Custom Item Modal */}
          {showAddModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
              <div className="bg-system-panel border border-system-blue rounded-2xl p-6 max-w-md w-full space-y-4 shadow-glow-blue">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-black text-white uppercase flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-system-blue" /> Add Custom Grocery Item
                  </h3>
                  <button onClick={() => setShowAddModal(false)} className="text-zinc-400 hover:text-white text-sm font-bold">✕</button>
                </div>

                <form onSubmit={handleAddCustomItem} className="space-y-4 text-left">
                  <div className="bg-system-dark/80 p-3.5 rounded-xl border border-system-blue/30 space-y-2">
                    <label className="text-xs font-bold text-system-cyan uppercase flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" /> ⚡ Auburn Walmart Quick-Select Catalog
                    </label>
                    <select
                      onChange={(e) => {
                        const val = e.target.value;
                        if (!val) return;
                        const found = WALMART_QUICK_SELECT_ITEMS.find(i => i.name === val);
                        if (found) {
                          setCustomName(found.name);
                          setCustomCategory(found.category);
                          setCustomPrice(found.price);
                          setCustomNote(found.note);
                          setCustomStore("Walmart Supercenter (Auburn, ME)");
                        }
                      }}
                      defaultValue=""
                      className="w-full bg-black/60 border border-system-blue/40 rounded-lg px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-system-blue"
                    >
                      <option value="">-- Pick a Walmart item or type custom below --</option>
                      <optgroup label="🧴 Toiletries & Household Essentials">
                        {WALMART_QUICK_SELECT_ITEMS.filter(i => i.category === 'Toiletries / Non-Grocery').map(i => (
                          <option key={i.name} value={i.name}>{i.name} ({i.price})</option>
                        ))}
                      </optgroup>
                      <optgroup label="🛒 Groceries & Protein Staples">
                        {WALMART_QUICK_SELECT_ITEMS.filter(i => i.category !== 'Toiletries / Non-Grocery').map(i => (
                          <option key={i.name} value={i.name}>{i.name} ({i.price})</option>
                        ))}
                      </optgroup>
                    </select>
                    <p className="text-[10px] text-zinc-400">Selecting an item auto-fills name, Auburn Walmart location, price, and category!</p>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-zinc-400 uppercase">Item Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Extra Adobo / Greek Yogurt"
                      value={customName}
                      onChange={(e) => setCustomName(e.target.value)}
                      className="w-full bg-system-dark border border-system-blue/40 rounded-xl px-4 py-3 mt-1 text-sm text-white focus:outline-none focus:border-system-cyan shadow-inner"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-zinc-400 uppercase">Store Location</label>
                      <select
                        value={customStore}
                        onChange={(e) => setCustomStore(e.target.value as any)}
                        className="w-full bg-system-dark border border-white/10 rounded-xl px-3 py-3 mt-1 text-xs font-bold text-white focus:outline-none shadow-inner"
                      >
                        <option value="Walmart Supercenter (Auburn, ME)">Walmart (Auburn)</option>
                        <option value="Shaw's (Auburn/Lewiston)">Shaw's</option>
                        <option value="Hannaford (Lewiston/Auburn)">Hannaford</option>
                        <option value="All Stores">All Stores</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-zinc-400 uppercase">Category</label>
                      <select
                        value={customCategory}
                        onChange={(e) => setCustomCategory(e.target.value as any)}
                        className="w-full bg-system-dark border border-white/10 rounded-xl px-3 py-3 mt-1 text-xs font-bold text-white focus:outline-none shadow-inner"
                      >
                        <option value="Protein">Protein</option>
                        <option value="Carbs">Carbs</option>
                        <option value="Fats">Fats</option>
                        <option value="Produce">Produce</option>
                        <option value="Essentials">Essentials</option>
                        <option value="Toiletries / Non-Grocery">Toiletries / Non-Grocery</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-zinc-400 uppercase">Est. Price</label>
                      <input
                        type="text"
                        placeholder="e.g. $3.48"
                        value={customPrice}
                        onChange={(e) => setCustomPrice(e.target.value)}
                        className="w-full bg-system-dark border border-white/10 rounded-xl px-4 py-3 mt-1 text-sm font-mono font-bold text-white focus:outline-none shadow-inner"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-zinc-400 uppercase">Coach Note / Why</label>
                      <input
                        type="text"
                        placeholder="e.g. For Monday Boricua prep"
                        value={customNote}
                        onChange={(e) => setCustomNote(e.target.value)}
                        className="w-full bg-system-dark border border-white/10 rounded-xl px-4 py-3 mt-1 text-sm text-white focus:outline-none shadow-inner"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 pt-3">
                    <button
                      type="button"
                      onClick={() => setShowAddModal(false)}
                      className="flex-1 py-3.5 rounded-xl bg-system-card text-zinc-400 hover:text-white font-bold text-xs sm:text-sm uppercase transition-colors min-h-[44px]"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-system-blue to-system-cyan text-black hover:bg-white font-black text-xs sm:text-sm uppercase shadow-glow-blue transition-all min-h-[44px]"
                    >
                      Save to List
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Store & Category Filters */}
          <div className="space-y-3 bg-system-panel p-5 rounded-2xl border border-white/10">
            {/* Store Filter */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-zinc-400 uppercase mr-2">Store:</span>
              {stores.map((store) => (
                <button
                  key={store}
                  onClick={() => setSelectedStore(store)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    selectedStore === store
                      ? 'bg-system-blue/20 text-system-cyan border border-system-blue shadow-glow-blue'
                      : 'bg-system-dark text-zinc-400 border border-white/5 hover:border-white/20 hover:text-white'
                  }`}
                >
                  {store}
                </button>
              ))}
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/5">
              <span className="text-xs font-bold text-zinc-400 uppercase mr-2">Category:</span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    selectedCategory === cat
                      ? 'bg-system-cyan text-system-dark font-black'
                      : 'bg-system-dark text-zinc-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Meal Prep Template Filter */}
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/5">
              <span className="text-xs font-bold text-zinc-400 uppercase mr-2 flex items-center gap-1">
                <Utensils className="w-3.5 h-3.5 text-system-gold" /> Template Filter:
              </span>
              {['All', 'China', 'Korea', 'Japan', 'Puerto Rico', 'Mexico'].map((tpl) => {
                const flags: Record<string, string> = { 'China': '🇨🇳', 'Korea': '🇰🇷', 'Japan': '🇯🇵', 'Puerto Rico': '🇵🇷', 'Mexico': '🇲🇽' };
                return (
                  <button
                    key={tpl}
                    onClick={() => {
                      setSelectedAisleTemplate(tpl);
                      if (tpl !== 'All') {
                        setSelectedCategory('All');
                        setSelectedStore('All Stores');
                      }
                    }}
                    className={`px-3.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                      selectedAisleTemplate === tpl
                        ? 'bg-system-gold text-system-dark font-black shadow-glow-gold scale-105'
                        : 'bg-system-dark text-zinc-400 hover:text-white border border-white/5'
                    }`}
                  >
                    {flags[tpl] && <span>{flags[tpl]}</span>}
                    <span>{tpl === 'All' ? '🌐 All Items & Templates' : `${tpl} ($50 Limit)`}</span>
                  </button>
                );
              })}
            </div>

            {/* Auburn Walmart Quick-Select Strip */}
            <div className="bg-system-card p-4 rounded-2xl border border-system-blue/40 shadow-inner flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-system-blue animate-ping" />
                <span className="text-xs font-black uppercase tracking-wider text-white">⚡ Auburn Walmart Quick-Select Catalog:</span>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto flex-1 max-w-xl">
                <select
                  onChange={(e) => {
                    const val = e.target.value;
                    if (!val) return;
                    const found = WALMART_QUICK_SELECT_ITEMS.find(i => i.name === val);
                    if (found) {
                      const newItem: GroceryItem = {
                        id: `custom-${Date.now()}`,
                        upc: "000000000000",
                        name: found.name,
                        store: "Walmart Supercenter (Auburn, ME)",
                        brand: "Walmart / Equate / Great Value",
                        category: found.category,
                        priceEst: found.price,
                        calories: 0,
                        protein: 0,
                        carbs: 0,
                        fat: 0,
                        servingSize: "1 unit",
                        coachNote: found.note
                      };
                      const updated = [newItem, ...customItems];
                      setCustomItems(updated);
                      if (typeof window !== 'undefined') {
                        localStorage.setItem('pf_custom_grocery_items', JSON.stringify(updated));
                      }
                      e.target.value = "";
                    }
                  }}
                  defaultValue=""
                  className="w-full bg-system-dark border border-system-blue/50 rounded-xl px-3 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-system-cyan shadow-sm"
                >
                  <option value="">-- Pick an item to instantly add to your Walmart list --</option>
                  <optgroup label="🧴 Toiletries & Household Essentials">
                    {WALMART_QUICK_SELECT_ITEMS.filter(i => i.category === 'Toiletries / Non-Grocery').map(i => (
                      <option key={i.name} value={i.name}>+ Add {i.name} ({i.price})</option>
                    ))}
                  </optgroup>
                  <optgroup label="🛒 Groceries & Protein Staples">
                    {WALMART_QUICK_SELECT_ITEMS.filter(i => i.category !== 'Toiletries / Non-Grocery').map(i => (
                      <option key={i.name} value={i.name}>+ Add {i.name} ({i.price})</option>
                    ))}
                  </optgroup>
                </select>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="px-3 py-2.5 rounded-xl bg-system-panel hover:bg-white/10 text-system-cyan border border-system-blue/40 text-xs font-bold whitespace-nowrap transition-all"
                >
                  + Custom
                </button>
              </div>
            </div>
          </div>

          {/* Meal Prep Templates Display in Aisle Checklist */}
          {(selectedCategory === 'All' || selectedCategory === '🍱 Meal Prep Templates' || selectedAisleTemplate !== 'All') && (
            <div className="space-y-4 bg-system-panel/50 p-5 rounded-2xl border border-system-gold/30">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black uppercase text-system-gold tracking-wider flex items-center gap-2">
                  <Utensils className="w-4 h-4 text-system-gold" />
                  <span>Meal Prep Blueprints & Aisle Shopping Lists (Under $50 Budget)</span>
                </h3>
                {selectedAisleTemplate !== 'All' && (
                  <button
                    onClick={() => setSelectedAisleTemplate('All')}
                    className="text-xs text-zinc-400 hover:text-white underline font-mono"
                  >
                    Clear Template Filter
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {MEAL_PREP_PLANS.filter(p => selectedAisleTemplate === 'All' || p.country === selectedAisleTemplate).map(plan => (
                  <div
                    key={`aisle-plan-${plan.id}`}
                    className={`p-5 rounded-2xl border transition-all flex flex-col justify-between gap-4 ${
                      selectedAisleTemplate === plan.country
                        ? 'bg-gradient-to-br from-system-panel to-system-dark border-system-gold shadow-glow-gold scale-[1.02]'
                        : 'bg-system-panel border-system-blue/30 hover:border-system-blue shadow-md'
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-2xl">{plan.flag}</span>
                        <span className="text-[10px] font-mono font-black uppercase tracking-wider text-system-gold bg-system-gold/15 px-2 py-0.5 rounded border border-system-gold/30">
                          {plan.estCostPerWeek.split(' ')[0]} / Wk
                        </span>
                      </div>
                      <h4 className="text-sm font-black text-white leading-tight">{plan.title}</h4>
                      <p className="text-xs text-zinc-400 line-clamp-2">{plan.description}</p>
                    </div>

                    <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
                      <button
                        onClick={() => {
                          setSelectedAisleTemplate(plan.country);
                          setSelectedCategory('All');
                          setSelectedStore('All Stores');
                        }}
                        className={`w-full py-2 rounded-xl text-xs font-bold font-mono transition-all flex items-center justify-center gap-1.5 ${
                          selectedAisleTemplate === plan.country
                            ? 'bg-system-cyan text-system-dark font-black shadow-glow-blue'
                            : 'bg-system-blue/20 text-system-cyan hover:bg-system-blue/30 border border-system-blue/40'
                        }`}
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>{selectedAisleTemplate === plan.country ? '✓ Showing Aisle List Below' : '🛒 Filter Aisle List To This Plan'}</span>
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handlePrintPlan(plan)}
                          className="flex-1 py-1.5 rounded-lg bg-system-dark text-zinc-300 hover:text-white border border-white/10 text-[11px] font-bold flex items-center justify-center gap-1"
                        >
                          <Printer className="w-3 h-3 text-system-blue" />
                          <span>Print PDF</span>
                        </button>
                        <button
                          onClick={() => handleEmailPlan(plan)}
                          className="flex-1 py-1.5 rounded-lg bg-system-dark text-zinc-300 hover:text-white border border-white/10 text-[11px] font-bold flex items-center justify-center gap-1"
                        >
                          <Mail className="w-3 h-3 text-system-gold" />
                          <span>Email Plan</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Grocery Items List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredItems.length === 0 ? (
              <div className="bg-system-panel p-8 rounded-2xl border border-white/10 text-center space-y-3 col-span-1 md:col-span-2">
                <ShoppingBag className="w-10 h-10 text-system-blue mx-auto opacity-50" />
                <h3 className="text-base font-bold text-white">No Items in "{selectedCategory}" Yet</h3>
                <p className="text-xs text-zinc-400 max-w-md mx-auto">
                  You removed the pre-loaded items so you can add exactly what you need! Pick an item from the Auburn Walmart Quick-Select Catalog above or click "+ Add Item" to add your own.
                </p>
              </div>
            ) : (
              filteredItems.map((item) => {
                const isChecked = checkedItems[item.id] || false;
                return (
                  <div
                    key={item.id}
                    onClick={() => handleToggleCheck(item.id)}
                    className={`cursor-pointer rounded-2xl p-5 border transition-all duration-200 flex items-start justify-between gap-4 ${
                      isChecked
                        ? 'bg-system-panel/40 border-green-500/40 opacity-75'
                        : 'bg-system-panel border-system-blue/30 hover:border-system-blue shadow-md'
                    }`}
                  >
                    <div className="flex items-start gap-3.5 flex-1">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleCheck(item.id);
                        }}
                        className={`mt-0.5 transition-colors ${isChecked ? 'text-green-400' : 'text-zinc-500 hover:text-system-cyan'}`}
                      >
                        {isChecked ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
                      </button>

                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`text-xs font-black uppercase tracking-wider px-2 py-0.5 rounded ${
                            item.store.includes('Walmart') ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40' :
                            item.store.includes("Shaw's") ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40' :
                            'bg-green-500/20 text-green-300 border border-green-500/40'
                          }`}>
                            {item.brand}
                          </span>
                          <span className="text-[10px] font-mono text-zinc-400">{item.store}</span>
                        </div>

                        <h4 className={`text-base font-bold ${isChecked ? 'line-through text-zinc-400' : 'text-white'}`}>
                          {item.name}
                        </h4>

                        <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono text-zinc-400 pt-1">
                          <span className="bg-system-gold/15 text-system-gold font-bold text-xs sm:text-sm px-2.5 py-0.5 rounded border border-system-gold/40 shadow-sm flex items-center gap-1">
                            <DollarSign className="w-3.5 h-3.5 inline text-system-gold" />
                            <span>{item.priceEst.startsWith('$') ? item.priceEst.replace('$', '') : item.priceEst}</span>
                          </span>
                          {item.category === 'Toiletries / Non-Grocery' ? (
                            <>
                              <span>|</span>
                              <span className="text-purple-300 font-bold">🧴 Household Essential</span>
                            </>
                          ) : (
                            <>
                              <span>|</span>
                              <span className="text-system-cyan font-bold">{item.protein}g Protein</span>
                              <span>|</span>
                              <span>{item.calories} kcal</span>
                            </>
                          )}
                        </div>

                      <p className="text-xs text-zinc-400 leading-relaxed pt-1.5 border-t border-white/5 mt-2">
                        <strong className="text-system-cyan">Why Buy:</strong> {item.coachNote}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded border whitespace-nowrap ${
                      item.category === 'Toiletries / Non-Grocery'
                        ? 'bg-purple-500/20 text-purple-300 border-purple-500/40 shadow-sm'
                        : 'bg-system-dark text-zinc-300 border-white/10'
                    }`}>
                      {item.category}
                    </span>
                    {item.id.startsWith('custom-') && (
                      <button
                        type="button"
                        onClick={(e) => handleRemoveCustomItem(item.id, e)}
                        className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/20 transition-all shadow-sm"
                        title="Delete custom item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              );
            }))}
          </div>
        </>
      ) : (
        /* Meal Prep Plans Tab */
        <div className="space-y-6">
          {/* Country Selector Bar */}
          <div className="bg-system-panel p-4 rounded-2xl border border-system-blue/30 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-widest text-system-gold bg-system-gold/10 px-3 py-1 rounded-lg border border-system-gold/30">
                💰 All Plans Guaranteed Under $50
              </span>
              <span className="text-xs font-mono text-zinc-400 hidden md:inline">
                Select your preferred cuisine:
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {[
                { name: 'All', label: '🌐 All Cuisines' },
                { name: 'China', label: '🇨🇳 China (⭐ Featured)' },
                { name: 'Korea', label: '🇰🇷 Korea' },
                { name: 'Japan', label: '🇯🇵 Japan' },
                { name: 'Puerto Rico', label: '🇵🇷 Puerto Rico' },
                { name: 'Mexico', label: '🇲🇽 Mexico' },
              ].map((c) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedCountryPlan(c.name)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold font-mono transition-all cursor-pointer ${
                    selectedCountryPlan === c.name
                      ? 'bg-system-blue text-system-dark shadow-glow-blue scale-105'
                      : 'bg-system-dark text-zinc-300 hover:text-white border border-white/10'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {MEAL_PREP_PLANS.filter(p => selectedCountryPlan === 'All' || p.country === selectedCountryPlan).map((plan) => (
            <div key={plan.id} className="bg-system-panel p-6 rounded-2xl border border-system-blue/40 shadow-glow-blue space-y-6 animate-in fade-in duration-300">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-lg">{plan.flag}</span>
                    <span className="text-xs font-mono font-black uppercase tracking-widest text-system-cyan bg-system-blue/20 px-2.5 py-0.5 rounded border border-system-blue/30">
                      {plan.country} Cuisine
                    </span>
                    {plan.badge && (
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-system-gold/20 text-system-gold border border-system-gold/40">
                        {plan.badge}
                      </span>
                    )}
                    <div className="flex items-center gap-1 text-xs font-mono text-system-gold uppercase font-bold bg-system-dark px-2.5 py-0.5 rounded border border-system-gold/30">
                      <DollarSign className="w-3.5 h-3.5 text-system-gold" />
                      <span>{plan.estCostPerWeek}</span>
                    </div>
                  </div>
                  <h3 className="text-xl md:text-2xl font-black text-white uppercase mt-1">
                    {plan.title}
                  </h3>
                  <p className="text-xs text-zinc-300 mt-1 max-w-3xl leading-relaxed">{plan.description}</p>
                </div>

                <div className="flex items-center gap-3 bg-system-dark px-4 py-2.5 rounded-xl border border-system-cyan/30 shrink-0">
                  <Award className="w-6 h-6 text-system-cyan" />
                  <div>
                    <div className="text-[10px] text-zinc-400 uppercase font-bold">Daily Macro Target</div>
                    <div className="text-sm font-black text-system-cyan font-mono">{plan.targetDailyCalories} kcal | {plan.targetDailyProtein}g Protein</div>
                  </div>
                </div>
              </div>

              {/* Meals Timeline */}
              <div className="space-y-4">
                {plan.meals.map((meal, idx) => (
                  <div key={idx} className="bg-system-dark p-5 rounded-xl border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:border-system-cyan/40 transition-all">
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-system-blue/20 text-system-cyan">
                          {meal.time}
                        </span>
                        <h4 className="text-base font-bold text-white">{meal.name}</h4>
                      </div>
                      <ul className="text-xs text-zinc-300 space-y-1 pl-4 list-disc pt-1">
                        {meal.ingredients.map((ing, i) => (
                          <li key={i}>{ing}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center gap-4 bg-system-panel px-4 py-3 rounded-xl border border-white/5 text-xs font-mono whitespace-nowrap">
                      <div>
                        <div className="text-[10px] text-zinc-500 uppercase">Calories</div>
                        <div className="text-sm font-bold text-white">{meal.calories} kcal</div>
                      </div>
                      <div className="border-l border-white/10 pl-4">
                        <div className="text-[10px] text-zinc-500 uppercase">Protein</div>
                        <div className="text-sm font-bold text-system-cyan">{meal.protein}g</div>
                      </div>
                      <div className="border-l border-white/10 pl-4">
                        <div className="text-[10px] text-zinc-500 uppercase">Carbs / Fat</div>
                        <div className="text-sm text-zinc-400">{meal.carbs}g / {meal.fat}g</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Card Action Bar (Print / Save PDF & Email) */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                <div className="text-xs font-mono text-zinc-400">
                  ⚡ Want a physical copy or offline reference?
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => {
                      setSelectedAisleTemplate(plan.country);
                      setActiveTab('items');
                      setSelectedCategory('All');
                      setSelectedStore('All Stores');
                    }}
                    className="flex items-center gap-2 bg-system-gold/20 hover:bg-system-gold text-system-gold hover:text-system-dark px-3.5 py-2 rounded-xl text-xs font-black font-mono border border-system-gold/40 hover:shadow-glow-gold transition-all cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>🛒 Filter Aisle List To This Plan</span>
                  </button>
                  <button
                    onClick={() => handleEmailPlan(plan)}
                    className="flex items-center gap-2 bg-system-dark hover:bg-white/10 text-zinc-200 hover:text-white px-3.5 py-2 rounded-xl text-xs font-bold font-mono border border-white/10 transition-all cursor-pointer"
                  >
                    <Mail className="w-3.5 h-3.5 text-system-cyan" />
                    <span>📧 Email Template</span>
                  </button>
                  <button
                    onClick={() => handlePrintPlan(plan)}
                    className="flex items-center gap-2 bg-system-blue/20 hover:bg-system-blue text-system-cyan hover:text-system-dark px-4 py-2 rounded-xl text-xs font-black font-mono border border-system-blue/40 hover:shadow-glow-blue transition-all cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>🖨️ Print / Save as PDF</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
