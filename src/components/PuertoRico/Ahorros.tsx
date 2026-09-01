"use client";

import React, { useState, useEffect } from "react";
import { getPRData, savePRData, PRStorageData } from "@/lib/pr-storage";
import { PiggyBank, Plus, TrendingUp, DollarSign } from "lucide-react";

export default function Ahorros() {
  const [data, setData] = useState<PRStorageData | null>(null);
  const [newAmount, setNewAmount] = useState("");
  const [newDesc, setNewDesc] = useState("");

  useEffect(() => {
    setData(getPRData());
    const handleUpdate = () => setData(getPRData());
    window.addEventListener("prDataUpdated", handleUpdate);
    return () => window.removeEventListener("prDataUpdated", handleUpdate);
  }, []);

  if (!data) return null;

  const totalSaved = data.savingsEntries.reduce((acc, curr) => acc + curr.amount, 0);
  const goal = 15000;
  const progress = Math.min(100, (totalSaved / goal) * 100);

  const surplus = data.savingsIncome - data.savingsExpenses;
  const monthsRemaining = 24; // Approx runway to build a MacBook Pro + iPad Pro + emergency fund
  const projectedTotal = totalSaved + (surplus * monthsRemaining);

  const handleUpdateMonthly = (income: number, expenses: number) => {
    setData(savePRData({ savingsIncome: income, savingsExpenses: expenses }));
  };

  const handleAddEntry = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(newAmount);
    if (isNaN(amount) || amount === 0) return;

    const entry = {
      id: Date.now().toString(),
      date: new Date().toISOString().split("T")[0],
      amount: amount,
      description: newDesc || "Deposit"
    };

    const newEntries = [entry, ...data.savingsEntries];
    setData(savePRData({ savingsEntries: newEntries }));
    
    setNewAmount("");
    setNewDesc("");
    
    // trigger confetti if milestone reached (e.g., every $5k)
    const prevTotal = totalSaved;
    const newTotal = totalSaved + amount;
    if (Math.floor(newTotal / 5000) > Math.floor(prevTotal / 5000)) {
      window.dispatchEvent(new Event('triggerConfetti'));
    }
  };

  // SVG Chart calculations
  const circumference = 2 * Math.PI * 60;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Top Section */}
      <div className="grid md:grid-cols-2 gap-6">
        
        {/* Goal Chart */}
        <div className="bg-[#11182c]/80 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col items-center justify-center text-center relative overflow-hidden group transition-all duration-300 hover:border-white/20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#4ade80]/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          
          <h2 className="text-2xl font-black text-white font-mono mb-8 tracking-tight z-10 flex items-center gap-2">
            <PiggyBank className="w-6 h-6 text-[#4ade80] drop-shadow-sm" /> 
            Goal: $15,000
          </h2>
          
          <div className="relative w-48 h-48 flex items-center justify-center mb-6 z-10">
            <svg className="w-full h-full transform -rotate-90 drop-shadow-[0_0_15px_rgba(74,222,128,0.3)]">
              <circle cx="96" cy="96" r="60" className="stroke-white/5" strokeWidth="12" fill="none" />
              <circle
                cx="96"
                cy="96"
                r="60"
                className="stroke-[#4ade80]"
                strokeWidth="12"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                style={{ transition: "stroke-dashoffset 1.5s ease-out" }}
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-3xl font-black text-[#4ade80] font-mono drop-shadow-sm">${totalSaved.toLocaleString()}</span>
              <span className="text-sm text-zinc-400 font-bold font-mono mt-1 bg-black/40 px-2 py-0.5 rounded-md border border-white/5 shadow-inner">{progress.toFixed(1)}%</span>
            </div>
          </div>
          
          <p className="text-sm text-zinc-300 font-bold bg-white/5 px-4 py-1.5 rounded-full border border-white/10 z-10">
            Remaining: <span className="text-white">${(goal - totalSaved).toLocaleString()}</span>
          </p>
        </div>

        {/* Monthly Calculator */}
        <div className="bg-[#11182c]/80 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col transition-all duration-300 hover:border-white/20">
          <h3 className="text-xl font-black text-white mb-6 flex items-center gap-3 tracking-tight">
            <TrendingUp className="w-6 h-6 text-[#f5a623]" /> Cash Flow <span className="text-zinc-400 font-medium text-base">(Monthly)</span>
          </h3>
          
          <div className="space-y-5 mb-8 flex-1">
            <div>
              <label className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider mb-2 block">Estimated Remote Income</label>
              <div className="relative">
                <DollarSign className="absolute left-3.5 top-3 w-5 h-5 text-zinc-500" />
                <input 
                  type="number" 
                  value={data.savingsIncome || ""} 
                  onChange={(e) => handleUpdateMonthly(parseInt(e.target.value) || 0, data.savingsExpenses)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white font-bold focus:border-[#4ade80] focus:ring-1 focus:ring-[#4ade80]/50 outline-none transition-all shadow-inner"
                  placeholder="0"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider mb-2 block">Base Expenses (Lewiston)</label>
              <div className="relative">
                <DollarSign className="absolute left-3.5 top-3 w-5 h-5 text-zinc-500" />
                <input 
                  type="number" 
                  value={data.savingsExpenses || ""} 
                  onChange={(e) => handleUpdateMonthly(data.savingsIncome, parseInt(e.target.value) || 0)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white font-bold focus:border-[#ce1126] focus:ring-1 focus:ring-[#ce1126]/50 outline-none transition-all shadow-inner"
                  placeholder="0"
                />
              </div>
            </div>
          </div>

          <div className="bg-black/40 rounded-2xl p-5 border border-white/5 shadow-inner">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-bold text-zinc-300">Monthly Surplus:</span>
              <span className={`font-mono font-black text-lg ${surplus >= 0 ? 'text-[#4ade80] drop-shadow-[0_0_8px_rgba(74,222,128,0.4)]' : 'text-[#ce1126]'}`}>
                ${surplus.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center pt-3 border-t border-white/10">
              <span className="text-sm font-bold text-zinc-300">Projection (Apr 2031):</span>
              <span className="font-mono font-black text-lg text-[#f5a623] drop-shadow-[0_0_8px_rgba(245,166,35,0.4)]">
                ${projectedTotal.toLocaleString()}
              </span>
            </div>
            {projectedTotal < goal && (
              <div className="mt-4 bg-[#ce1126]/10 border border-[#ce1126]/30 p-3 rounded-xl">
                <p className="text-[11px] font-medium text-[#ce1126] leading-relaxed">
                  <span className="font-bold">Warning:</span> Current surplus trajectory falls short of the $15k goal within 24 months. Consider increasing income (art commissions, content monetization) to cover the MacBook Pro + iPad Pro + emergency fund!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* History & Quick Add */}
      <div className="grid md:grid-cols-3 gap-6">
        
        {/* Quick Add */}
        <div className="md:col-span-1 bg-[#11182c]/80 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl h-fit">
          <h3 className="text-xl font-black text-white mb-6 tracking-tight">Add Funds</h3>
          <form onSubmit={handleAddEntry} className="space-y-5">
            <div>
              <label className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider mb-2 block">Amount</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-2.5 w-4 h-4 text-zinc-500" />
                <input 
                  type="number"
                  required
                  value={newAmount}
                  onChange={(e) => setNewAmount(e.target.value)}
                  placeholder="100"
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-2 pl-9 pr-3 text-sm text-white font-bold focus:border-[#4ade80] focus:ring-1 focus:ring-[#4ade80]/50 outline-none transition-all shadow-inner"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider mb-2 block">Description</label>
              <input 
                type="text"
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                placeholder="Ex. Paycheck, art commission..."
                className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-sm text-white focus:border-[#0a3d8f] focus:ring-1 focus:ring-[#0a3d8f]/50 outline-none transition-all shadow-inner placeholder:text-zinc-600"
              />
            </div>
            <button 
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-[#4ade80]/10 text-[#4ade80] border border-[#4ade80]/30 py-3 rounded-xl text-sm font-black uppercase tracking-wider hover:bg-[#4ade80]/20 hover:border-[#4ade80]/60 transition-all hover:scale-105 shadow-sm mt-2"
            >
              <Plus className="w-5 h-5" /> Deposit
            </button>
          </form>
        </div>

        {/* History List */}
        <div className="md:col-span-2 bg-[#11182c]/80 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl">
          <h3 className="text-xl font-black text-white mb-6 tracking-tight">Deposit History</h3>
          <div className="space-y-3 max-h-[350px] overflow-y-auto pr-3 custom-scrollbar">
            {data.savingsEntries.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-zinc-500 bg-black/20 rounded-2xl border border-white/5 border-dashed">
                <PiggyBank className="w-10 h-10 mb-3 opacity-50" />
                <p className="font-mono text-sm font-bold">No deposits yet.</p>
              </div>
            ) : (
              data.savingsEntries.map((entry) => (
                <div key={entry.id} className="group flex justify-between items-center bg-black/30 p-4 rounded-2xl border border-white/5 hover:border-white/20 transition-all duration-300 hover:bg-black/50 hover:shadow-lg">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-bold text-white tracking-wide">{entry.description}</span>
                    <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest">{entry.date}</span>
                  </div>
                  <span className="text-[#4ade80] font-mono font-black text-base drop-shadow-sm group-hover:scale-110 transition-transform">
                    + ${entry.amount.toLocaleString()}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

    </div>
  );
}