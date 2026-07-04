"use client";

import React, { useState } from "react";
import HunterStatusBar from "@/components/Navigation/HunterStatusBar";
import SystemSidebar, { TabType } from "@/components/Navigation/SystemSidebar";
import DailyQuestDashboard from "@/components/Dashboard/DailyQuestDashboard";
import WorkoutQuestView from "@/components/Workouts/WorkoutQuestView";
import BarcodeScanner from "@/components/Scanner/BarcodeScanner";
import NutritionTracker from "@/components/Nutrition/NutritionTracker";
import GroceryGuide from "@/components/Nutrition/GroceryGuide";
import WeightAndPrTracker from "@/components/Tracking/WeightAndPrTracker";
import { Shield, Sparkles } from "lucide-react";

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>("quests");

  return (
    <div className="min-h-screen bg-system-dark text-white flex flex-col font-sans selection:bg-system-blue selection:text-system-dark">
      {/* Top Hunter Status Bar */}
      <HunterStatusBar />

      {/* Navigation Tab Bar */}
      <SystemSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8">
        <div className="animate-in fade-in duration-300">
          {activeTab === "quests" && (
            <DailyQuestDashboard onNavigate={(tab) => setActiveTab(tab)} />
          )}
          {activeTab === "workouts" && <WorkoutQuestView />}
          {activeTab === "scanner" && (
            <div className="space-y-8">
              <BarcodeScanner onFoodLogged={() => {}} />
              <div className="border-t border-white/10 pt-8">
                <NutritionTracker onNavigate={(tab) => setActiveTab(tab)} />
              </div>
            </div>
          )}
          {activeTab === "weight" && <WeightAndPrTracker />}
          {activeTab === "grocery" && <GroceryGuide />}
        </div>
      </main>

      {/* System Footer */}
      <footer className="w-full bg-system-panel/50 border-t border-white/5 py-6 px-4 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-500 font-mono">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-system-blue" />
            <span className="font-bold text-zinc-400">BETTER LEVELING v2</span>
            <span>|</span>
            <span>Shadow Monarch Fitness & Health System</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-system-cyan">
              <span className="w-2 h-2 rounded-full bg-system-cyan animate-ping" />
              Planet Fitness Lewiston, ME Sync Active
            </span>
            <span>|</span>
            <span>Offline-First Local Storage Engine</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
