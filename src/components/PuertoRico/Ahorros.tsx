"use client";

import React, { useState, useEffect } from "react";
import { getPRData, savePRData, PRStorageData } from "@/lib/pr-storage";
import { PiggyBank, Plus, TrendingUp, DollarSign, ArrowRight } from "lucide-react";

export default function Ahorros() {
  const [data, setData] = useState<PRStorageData | null>(null);
  const [newAmount, setNewAmount] = useState("");
  const [newDesc, setNewDesc] = useState("");

  useEffect(() => {
    setData(getPRData());
  }, []);

  if (!data) return null;

  const totalSaved = data.savingsEntries.reduce((acc, curr) => acc + curr.amount, 0);
  const goal = 35000;
  const progress = Math.min(100, (totalSaved / goal) * 100);

  const surplus = data.savingsIncome - data.savingsExpenses;
  const monthsRemaining = 56; // Approx from Aug 2026 to Apr 2031
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
      description: newDesc || "Deposito"
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
        <div className="bg-[#11182c] border border-white/5 rounded-2xl p-6 shadow-md flex flex-col items-center justify-center text-center">
          <h2 className="text-xl font-black text-white font-mono mb-6">Meta: $35,000</h2>
          
          <div className="relative w-48 h-48 flex items-center justify-center mb-4">
            <svg className="w-full h-full transform -rotate-90">
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
                style={{ transition: "stroke-dashoffset 1s ease-out" }}
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-2xl font-black text-[#4ade80] font-mono">${totalSaved.toLocaleString()}</span>
              <span className="text-xs text-zinc-400 font-mono mt-1">{progress.toFixed(1)}%</span>
            </div>
          </div>
          
          <p className="text-sm text-zinc-400">Restan ${(goal - totalSaved).toLocaleString()}</p>
        </div>

        {/* Monthly Calculator */}
        <div className="bg-[#11182c] border border-white/5 rounded-2xl p-6 shadow-md flex flex-col">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#f5a623]" /> Flujo de Caja (Mensual)
          </h3>
          
          <div className="space-y-4 mb-6 flex-1">
            <div>
              <label className="text-xs font-mono text-zinc-400 uppercase">Ingresos Remotos Estimados</label>
              <div className="relative mt-1">
                <DollarSign className="absolute left-3 top-2.5 w-4 h-4 text-zinc-500" />
                <input 
                  type="number" 
                  value={data.savingsIncome || ""} 
                  onChange={(e) => handleUpdateMonthly(parseInt(e.target.value) || 0, data.savingsExpenses)}
                  className="w-full bg-black/40 border border-white/10 rounded-lg py-2 pl-9 pr-4 text-sm text-white focus:border-[#4ade80] outline-none"
                  placeholder="0"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-mono text-zinc-400 uppercase">Gastos Base (Lewiston)</label>
              <div className="relative mt-1">
                <DollarSign className="absolute left-3 top-2.5 w-4 h-4 text-zinc-500" />
                <input 
                  type="number" 
                  value={data.savingsExpenses || ""} 
                  onChange={(e) => handleUpdateMonthly(data.savingsIncome, parseInt(e.target.value) || 0)}
                  className="w-full bg-black/40 border border-white/10 rounded-lg py-2 pl-9 pr-4 text-sm text-white focus:border-[#ce1126] outline-none"
                  placeholder="0"
                />
              </div>
            </div>
          </div>

          <div className="bg-black/30 rounded-xl p-4 border border-white/5">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-zinc-300">Excedente Mensual:</span>
              <span className={`font-mono font-bold ${surplus >= 0 ? 'text-[#4ade80]' : 'text-[#ce1126]'}`}>
                ${surplus.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-white/10">
              <span className="text-sm text-zinc-300">Proyección (Abr 2031):</span>
              <span className="font-mono font-bold text-[#f5a623]">
                ${projectedTotal.toLocaleString()}
              </span>
            </div>
            {projectedTotal < goal && (
              <p className="text-[10px] text-[#ce1126] mt-2 leading-tight">
                Warning: Current surplus trajectory falls short of $35k goal by Apr 2031. Need to increase remote income!
              </p>
            )}
          </div>
        </div>
      </div>

      {/* History & Quick Add */}
      <div className="grid md:grid-cols-3 gap-6">
        
        {/* Quick Add */}
        <div className="md:col-span-1 bg-[#11182c] border border-white/5 rounded-2xl p-6 shadow-md h-fit">
          <h3 className="text-lg font-bold text-white mb-4">Añadir Fondos</h3>
          <form onSubmit={handleAddEntry} className="space-y-4">
            <div>
              <label className="text-xs font-mono text-zinc-400 uppercase">Cantidad</label>
              <input 
                type="number"
                required
                value={newAmount}
                onChange={(e) => setNewAmount(e.target.value)}
                placeholder="100"
                className="w-full mt-1 bg-black/40 border border-white/10 rounded-lg p-2 text-sm text-white focus:border-[#4ade80] outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-mono text-zinc-400 uppercase">Descripción</label>
              <input 
                type="text"
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                placeholder="Ej. Cheque de pago, freelance..."
                className="w-full mt-1 bg-black/40 border border-white/10 rounded-lg p-2 text-sm text-white focus:border-[#0a3d8f] outline-none"
              />
            </div>
            <button 
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-[#4ade80]/20 text-[#4ade80] border border-[#4ade80]/50 py-2 rounded-lg text-sm font-bold hover:bg-[#4ade80]/30 transition-colors"
            >
              <Plus className="w-4 h-4" /> Depositar
            </button>
          </form>
        </div>

        {/* History List */}
        <div className="md:col-span-2 bg-[#11182c] border border-white/5 rounded-2xl p-6 shadow-md">
          <h3 className="text-lg font-bold text-white mb-4">Historial de Depósitos</h3>
          <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 no-scrollbar">
            {data.savingsEntries.length === 0 ? (
              <p className="text-zinc-500 font-mono text-sm text-center py-8">No hay depósitos todavía.</p>
            ) : (
              data.savingsEntries.map((entry) => (
                <div key={entry.id} className="flex justify-between items-center bg-black/30 p-3 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-white">{entry.description}</span>
                    <span className="text-[10px] font-mono text-zinc-500">{entry.date}</span>
                  </div>
                  <span className="text-[#4ade80] font-mono font-bold text-sm">+ ${entry.amount.toLocaleString()}</span>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

    </div>
  );
}