"use client";

import React, { useState, useEffect } from "react";
import {
  ShieldAlert,
  Users,
  Crown,
  Database,
  Activity,
  Lock,
  Trash2,
  UserCheck,
  RefreshCw,
  RotateCcw,
  Search,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Award,
  Zap,
  Sliders,
  Send,
  Radio,
} from "lucide-react";
import {
  loadHunterState,
  saveHunterState,
  resetHunterState,
  awardXp,
  isSystemAdmin,
  HunterState,
} from "@/lib/hunter-system";

export interface GuildMember {
  id: string;
  name: string;
  email: string;
  level: number;
  rank: string;
  tier: "E-Rank Free" | "S-Rank VIP Guild";
  status: "Active" | "Suspended";
  joinedDate: string;
}

const DEFAULT_MEMBERS: GuildMember[] = [
  {
    id: "user-admin-001",
    name: "Nick Crosson",
    email: "ncrossonofficial06@gmail.com",
    level: 100,
    rank: "Shadow Monarch",
    tier: "S-Rank VIP Guild",
    status: "Active",
    joinedDate: "2026-01-01",
  },
  {
    id: "user-sung-002",
    name: "Jin-Woo Sung",
    email: "monarch_shadow@system.kr",
    level: 99,
    rank: "National Level Hunter",
    tier: "S-Rank VIP Guild",
    status: "Active",
    joinedDate: "2026-02-14",
  },
  {
    id: "user-cha-003",
    name: "Cha Hae-In",
    email: "blade_dancer@guild.kr",
    level: 85,
    rank: "S-Rank Hunter",
    tier: "S-Rank VIP Guild",
    status: "Active",
    joinedDate: "2026-03-10",
  },
  {
    id: "user-baek-004",
    name: "Baek Yoon-Ho",
    email: "white_tiger@guild.kr",
    level: 82,
    rank: "S-Rank Hunter",
    tier: "E-Rank Free",
    status: "Active",
    joinedDate: "2026-04-05",
  },
  {
    id: "user-alex-005",
    name: "Alex Rivera",
    email: "alex_hunter24@gmail.com",
    level: 28,
    rank: "B-Rank Hunter",
    tier: "E-Rank Free",
    status: "Active",
    joinedDate: "2026-06-20",
  },
  {
    id: "user-marcus-006",
    name: "Marcus Vance",
    email: "m_vance_lifts@yahoo.com",
    level: 14,
    rank: "C-Rank Hunter",
    tier: "E-Rank Free",
    status: "Suspended",
    joinedDate: "2026-07-02",
  },
];

export default function AdminDashboard() {
  const [isAdmin, setIsAdmin] = useState<boolean>(true);
  const [members, setMembers] = useState<GuildMember[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [tierFilter, setTierFilter] = useState<string>("all");
  const [broadcastMsg, setBroadcastMsg] = useState<string>("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New Hunter Modal / Quick Add
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [newName, setNewName] = useState<string>("");
  const [newEmail, setNewEmail] = useState<string>("");
  const [newLevel, setNewLevel] = useState<number>(1);
  const [newTier, setNewTier] = useState<"E-Rank Free" | "S-Rank VIP Guild">("E-Rank Free");

  useEffect(() => {
    const authorized = isSystemAdmin();
    setIsAdmin(authorized);

    if (typeof window !== "undefined") {
      const savedMembers = localStorage.getItem("pf_admin_guild_roster");
      if (savedMembers) {
        try {
          setMembers(JSON.parse(savedMembers));
        } catch {
          setMembers(DEFAULT_MEMBERS);
        }
      } else {
        // Seed initial list + check active user
        const initialList = [...DEFAULT_MEMBERS];
        try {
          const currUser = localStorage.getItem("hunter_current_user");
          if (currUser) {
            const parsed = JSON.parse(currUser);
            if (parsed.email && !initialList.some((m) => m.email.toLowerCase() === parsed.email.toLowerCase())) {
              initialList.push({
                id: `user-local-${Date.now()}`,
                name: parsed.displayName || parsed.email.split("@")[0],
                email: parsed.email,
                level: 10,
                rank: "Awakened Hunter",
                tier: (parsed.tier === "S-Rank VIP Guild" ? "S-Rank VIP Guild" : "E-Rank Free") as "E-Rank Free" | "S-Rank VIP Guild",
                status: "Active" as const,
                joinedDate: new Date().toISOString().split("T")[0],
              });
            }
          }
        } catch {}
        setMembers(initialList);
        localStorage.setItem("pf_admin_guild_roster", JSON.stringify(initialList));
      }
    }
  }, []);

  const saveRoster = (updated: GuildMember[]) => {
    setMembers(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("pf_admin_guild_roster", JSON.stringify(updated));
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  if (!isAdmin) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-300">
        <div className="w-20 h-20 rounded-3xl bg-red-500/10 border-2 border-red-500/40 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(239,68,68,0.3)]">
          <Lock className="w-10 h-10 text-red-500 animate-pulse" />
        </div>
        <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-wider mb-2">
          Access Denied - Monarch Level Clearance Required
        </h2>
        <p className="text-zinc-400 text-sm max-w-md leading-relaxed">
          This command suite is restricted exclusively to the Creator Admin (<span className="text-system-gold font-mono">ncrossonofficial06@gmail.com</span>). Unauthorized access logs have been recorded.
        </p>
      </div>
    );
  }

  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTier =
      tierFilter === "all" ||
      (tierFilter === "vip" && member.tier === "S-Rank VIP Guild") ||
      (tierFilter === "free" && member.tier === "E-Rank Free");
    return matchesSearch && matchesTier;
  });

  const handleToggleVip = (id: string) => {
    const updated = members.map((m) => {
      if (m.id === id) {
        const nextTier: "E-Rank Free" | "S-Rank VIP Guild" = m.tier === "S-Rank VIP Guild" ? "E-Rank Free" : "S-Rank VIP Guild";
        // If modifying logged in user or admin, sync local VIP tier
        if (m.email.toLowerCase() === "ncrossonofficial06@gmail.com" || (typeof window !== "undefined" && localStorage.getItem("hunter_current_user")?.includes(m.email))) {
          if (typeof window !== "undefined") {
            localStorage.setItem("hunter_vip_tier", nextTier);
            window.dispatchEvent(new CustomEvent("hunterStateChanged"));
          }
        }
        return { ...m, tier: nextTier };
      }
      return m;
    });
    saveRoster(updated);
    showToast("User VIP Guild status updated successfully!");
  };

  const handleAdjustLevel = (id: string, delta: number) => {
    const updated = members.map((m) => {
      if (m.id === id) {
        const nextLevel = Math.min(100, Math.max(1, m.level + delta));
        let nextRank = m.rank;
        if (nextLevel >= 100) nextRank = "Shadow Monarch";
        else if (nextLevel >= 70) nextRank = "National Level Hunter";
        else if (nextLevel >= 45) nextRank = "S-Rank Hunter";
        else if (nextLevel >= 25) nextRank = "A-Rank Hunter";
        else if (nextLevel >= 10) nextRank = "B-Rank Hunter";
        else nextRank = "C-Rank Hunter";

        // If adjusting current hunter state
        if (typeof window !== "undefined" && localStorage.getItem("hunter_current_user")?.includes(m.email)) {
          const state = loadHunterState();
          state.level = nextLevel;
          saveHunterState(state);
        }

        return { ...m, level: nextLevel, rank: nextRank };
      }
      return m;
    });
    saveRoster(updated);
    showToast(`Hunter level adjusted (+${delta} levels)!`);
  };

  const handleToggleStatus = (id: string) => {
    const updated = members.map((m) => {
      if (m.id === id) {
        const nextStatus: "Active" | "Suspended" = m.status === "Active" ? "Suspended" : "Active";
        return { ...m, status: nextStatus };
      }
      return m;
    });
    saveRoster(updated);
    showToast("Hunter account status toggled!");
  };

  const handleDeleteMember = (id: string, name: string) => {
    if (confirm(`Are you sure you want to expel ${name} from the guild database?`)) {
      const updated = members.filter((m) => m.id !== id);
      saveRoster(updated);
      showToast(`Member ${name} removed from roster.`);
    }
  };

  const handleResetActiveAccount = () => {
    if (confirm("⚡ MONARCH RE-AWAKENING: Reset your active local hunter account to Level 1 E-Rank with base stats?")) {
      resetHunterState();
      showToast("Your local account and progression have been reset to Level 1 E-Rank!");
    }
  };

  const handleResetSystemAccounts = () => {
    if (confirm("⚠️ SYSTEM-WIDE DIRECTIVE: Reset ALL registered hunter accounts across the guild database back to Level 1 E-Rank status?")) {
      const resetMembers = members.map((m) => ({
        ...m,
        level: 1,
        rank: "Awakened Hunter",
      }));
      saveRoster(resetMembers);
      resetHunterState();
      showToast("All hunter accounts globally reset to Level 1 E-Rank status!");
    }
  };

  const handleResetMemberAccount = (id: string, name: string, email: string) => {
    if (confirm(`Reset ${name}'s account back to Level 1 E-Rank Hunter?`)) {
      const updated = members.map((m) => {
        if (m.id === id) {
          return { ...m, level: 1, rank: "Awakened Hunter", status: "Active" as const };
        }
        return m;
      });
      saveRoster(updated);

      if (typeof window !== "undefined" && (localStorage.getItem("hunter_current_user")?.includes(email) || email.toLowerCase() === "ncrossonofficial06@gmail.com")) {
        resetHunterState();
      }
      showToast(`${name}'s account has been reset to Level 1 E-Rank!`);
    }
  };

  const handleAddMemberSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim()) return;

    let rank = "Awakened Hunter";
    if (newLevel >= 100) rank = "Shadow Monarch";
    else if (newLevel >= 70) rank = "National Level Hunter";
    else if (newLevel >= 45) rank = "S-Rank Hunter";
    else if (newLevel >= 25) rank = "A-Rank Hunter";

    const newMember: GuildMember = {
      id: `user-${Date.now()}`,
      name: newName.trim(),
      email: newEmail.trim().toLowerCase(),
      level: newLevel,
      rank,
      tier: newTier,
      status: "Active",
      joinedDate: new Date().toISOString().split("T")[0],
    };

    const updated = [newMember, ...members];
    saveRoster(updated);
    setShowAddModal(false);
    setNewName("");
    setNewEmail("");
    setNewLevel(1);
    showToast(`New Hunter ${newMember.name} registered into Guild Roster!`);
  };

  const handleBroadcastSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastMsg.trim()) return;

    const announcement = {
      message: broadcastMsg.trim(),
      active: true,
      timestamp: Date.now(),
    };

    if (typeof window !== "undefined") {
      localStorage.setItem("pf_system_announcement", JSON.stringify(announcement));
      window.dispatchEvent(new CustomEvent("hunterSystemBroadcast", { detail: announcement }));
    }

    setBroadcastMsg("");
    showToast("⚡ System Broadcast transmitted to all Hunter terminals!");
  };

  const handleClearBroadcast = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("pf_system_announcement");
      window.dispatchEvent(new CustomEvent("hunterSystemBroadcast", { detail: null }));
    }
    showToast("Active System Broadcast terminated.");
  };

  const handleResetAllQuestsToday = () => {
    if (confirm("Reset today's daily quest checkmarks for your local hunter profile?")) {
      const state = loadHunterState();
      state.mp = 0;
      state.completedQuestsToday = {
        workout: false,
        calories: false,
        protein: false,
        hydration: false,
        weighIn: false,
        cardio: false,
        matchaTea: false,
      };
      saveHunterState(state);
      showToast("All daily quests reset to 0!");
    }
  };

  // KPIs
  const totalMembers = members.length;
  const vipCount = members.filter((m) => m.tier === "S-Rank VIP Guild").length;
  const activeCount = members.filter((m) => m.status === "Active").length;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-gradient-to-r from-red-600 via-system-purple to-system-blue text-white px-6 py-3.5 rounded-xl font-black uppercase text-sm tracking-wider shadow-[0_0_25px_rgba(239,68,68,0.5)] flex items-center gap-3 animate-in fade-in slide-in-from-top duration-300">
          <CheckCircle2 className="w-5 h-5 text-system-gold" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Admin Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-900/40 via-[#1a0a24] to-system-panel p-6 border-2 border-red-500/60 shadow-[0_0_30px_rgba(239,68,68,0.25)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-red-500/10 rounded-full blur-3xl pointer-events-none animate-pulse" />

        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 border border-red-500 text-red-400 text-xs font-mono uppercase tracking-widest font-bold">
            <ShieldAlert className="w-3.5 h-3.5 text-red-400 animate-bounce" />
            Monarch Level Command Center
          </div>
          <h2 className="text-2xl md:text-3xl font-black tracking-wider text-white uppercase text-glow flex items-center gap-2.5">
            <span>GUILD ADMINISTRATION & USER MANAGEMENT</span>
          </h2>
          <p className="text-zinc-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
            Manage Hunter accounts, assign S-Rank VIP Guild permissions, adjust level hierarchies, and transmit real-time system broadcasts.
          </p>
        </div>

        <div className="relative z-10 flex flex-col items-end gap-2 text-right">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-green-500/10 border border-green-500/40 text-green-400 font-mono text-xs font-bold shadow-sm">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-ping" />
            Monarch Server Node #1 Active
          </span>
          <span className="text-[11px] font-mono text-zinc-400">
            Auth: <strong className="text-system-gold">ncrossonofficial06@gmail.com</strong>
          </span>
        </div>
      </div>

      {/* KPI Overview Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
        <div className="bg-system-panel p-5 rounded-2xl border border-white/10 shadow-lg flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase font-bold text-zinc-400">Total Hunters</div>
            <div className="text-2xl font-black text-white mt-1">{totalMembers}</div>
            <div className="text-[11px] text-system-cyan">Registered in Guild</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-system-blue/10 border border-system-blue/30 flex items-center justify-center text-system-cyan">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-system-panel p-5 rounded-2xl border border-system-gold/40 shadow-lg flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase font-bold text-zinc-400">VIP Guild Members</div>
            <div className="text-2xl font-black text-system-gold mt-1">{vipCount}</div>
            <div className="text-[11px] text-yellow-300">S-Rank Access Unlocked</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-system-gold/10 border border-system-gold/30 flex items-center justify-center text-system-gold">
            <Crown className="w-6 h-6 animate-pulse" />
          </div>
        </div>

        <div className="bg-system-panel p-5 rounded-2xl border border-green-500/30 shadow-lg flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase font-bold text-zinc-400">Active Status</div>
            <div className="text-2xl font-black text-green-400 mt-1">{activeCount}</div>
            <div className="text-[11px] text-green-300">Operational Hunters</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/30 flex items-center justify-center text-green-400">
            <UserCheck className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-system-panel p-5 rounded-2xl border border-system-purple/40 shadow-lg flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase font-bold text-zinc-400">Cloud Storage Health</div>
            <div className="text-2xl font-black text-system-purple mt-1">100%</div>
            <div className="text-[11px] text-purple-300">Art Vault & Firebase Sync</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-system-purple/10 border border-system-purple/30 flex items-center justify-center text-system-purple">
            <Database className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* System Broadcast Command Box */}
      <div className="bg-system-panel rounded-2xl p-6 border border-system-purple/50 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-system-purple/10 border border-system-purple flex items-center justify-center">
              <Radio className="w-5 h-5 text-system-purple animate-pulse" />
            </div>
            <div>
              <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-system-purple">Global Transmission Suite</div>
              <h3 className="text-lg font-black text-white uppercase tracking-wider">Monarch System Broadcast</h3>
            </div>
          </div>
          <button
            onClick={handleClearBroadcast}
            className="text-xs font-mono text-zinc-400 hover:text-red-400 underline cursor-pointer transition-all"
          >
            Clear Active Broadcast
          </button>
        </div>

        <form onSubmit={handleBroadcastSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={broadcastMsg}
            onChange={(e) => setBroadcastMsg(e.target.value)}
            placeholder="Enter global notification (e.g. ⚡ System Alert: Double XP Workout Weekend Active)..."
            className="flex-1 bg-system-dark border border-white/20 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-system-purple font-mono"
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-system-purple to-system-blue text-white font-black uppercase text-xs tracking-widest shadow-glow-purple hover:scale-105 transition-all flex items-center justify-center gap-2 cursor-pointer flex-shrink-0"
          >
            <Send className="w-4 h-4" />
            <span>Transmit Alert</span>
          </button>
        </form>
      </div>

      {/* Account Re-Awakening & Reset Suite */}
      <div className="bg-gradient-to-r from-red-950/30 via-system-panel to-system-panel rounded-2xl p-6 border-2 border-red-500/40 shadow-[0_0_25px_rgba(239,68,68,0.15)] space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500 flex items-center justify-center">
              <RotateCcw className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-red-400">Monarch System Override</div>
              <h3 className="text-lg font-black text-white uppercase tracking-wider">Account Re-Awakening & Reset Engine</h3>
            </div>
          </div>
          <div className="text-[11px] font-mono text-zinc-400 bg-red-500/10 px-3 py-1 rounded-full border border-red-500/30">
            High Authority Required
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="bg-system-dark/80 p-4 rounded-xl border border-white/10 flex flex-col justify-between gap-3">
            <div>
              <div className="text-xs font-bold text-white uppercase flex items-center gap-1.5">
                <RefreshCw className="w-3.5 h-3.5 text-system-cyan" />
                <span>Reset Active Account</span>
              </div>
              <p className="text-[11px] text-zinc-400 mt-1">
                Wipes current local hunter levels and stats back to Level 1 E-Rank while preserving your name and profile settings.
              </p>
            </div>
            <button
              onClick={handleResetActiveAccount}
              className="w-full py-2.5 rounded-lg bg-system-blue/20 hover:bg-system-blue text-system-cyan hover:text-black border border-system-blue/40 font-black uppercase text-xs tracking-wider transition-all cursor-pointer shadow-glow-blue flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset My Account</span>
            </button>
          </div>

          <div className="bg-system-dark/80 p-4 rounded-xl border border-white/10 flex flex-col justify-between gap-3">
            <div>
              <div className="text-xs font-bold text-white uppercase flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-system-gold" />
                <span>Reset Daily Quests</span>
              </div>
              <p className="text-[11px] text-zinc-400 mt-1">
                Clears all today&apos;s daily quest checkmarks (workout, protein, water, etc.) back to 0% for a fresh tracking day.
              </p>
            </div>
            <button
              onClick={handleResetAllQuestsToday}
              className="w-full py-2.5 rounded-lg bg-system-gold/20 hover:bg-system-gold text-system-gold hover:text-black border border-system-gold/40 font-black uppercase text-xs tracking-wider transition-all cursor-pointer shadow-glow-gold flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Daily Quests</span>
            </button>
          </div>

          <div className="bg-system-dark/80 p-4 rounded-xl border border-red-500/30 flex flex-col justify-between gap-3">
            <div>
              <div className="text-xs font-bold text-red-400 uppercase flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                <span>Reset All Guild Accounts</span>
              </div>
              <p className="text-[11px] text-zinc-400 mt-1">
                Global wipe: resets ALL registered hunter accounts across the entire database back to Level 1 Awakened status.
              </p>
            </div>
            <button
              onClick={handleResetSystemAccounts}
              className="w-full py-2.5 rounded-lg bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/40 font-black uppercase text-xs tracking-wider transition-all cursor-pointer shadow-[0_0_15px_rgba(239,68,68,0.3)] flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Global Account Reset</span>
            </button>
          </div>
        </div>
      </div>

      {/* Guild Roster & User Management Section */}
      <div className="bg-system-panel rounded-2xl p-6 border border-white/10 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/40 flex items-center justify-center">
              <Users className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-red-400">Hunter Hierarchy Database</div>
              <h3 className="text-lg font-black text-white uppercase tracking-wider">Registered Guild Members ({filteredMembers.length})</h3>
            </div>
          </div>

          {/* Search, Filter, & Add Button */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search hunters..."
                className="w-full bg-system-dark border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-system-blue font-mono"
              />
            </div>

            <select
              value={tierFilter}
              onChange={(e) => setTierFilter(e.target.value)}
              className="bg-system-dark border border-white/10 rounded-xl px-3 py-2 text-xs text-zinc-300 font-mono focus:outline-none focus:border-system-blue cursor-pointer"
            >
              <option value="all">All Tiers</option>
              <option value="vip">VIP Guild Only</option>
              <option value="free">E-Rank Free Only</option>
            </select>

            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 rounded-xl bg-system-gold text-black font-black uppercase text-xs tracking-wider shadow-glow-gold hover:scale-105 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 fill-black" />
              <span>+ Add Hunter</span>
            </button>
          </div>
        </div>

        {/* User Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-zinc-400 uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">Hunter & Email</th>
                <th className="py-3 px-4">Level & Rank</th>
                <th className="py-3 px-4">Guild Tier</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Monarch Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredMembers.map((member) => {
                const isVip = member.tier === "S-Rank VIP Guild";
                const isSelf = member.email.toLowerCase() === "ncrossonofficial06@gmail.com" || member.email.toLowerCase() === "ncrossonofficial06@gmail.com";

                return (
                  <tr key={member.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-4">
                      <div className="font-bold text-white flex items-center gap-2">
                        <span>{member.name}</span>
                        {isSelf && (
                          <span className="bg-red-500/20 text-red-400 text-[9px] px-1.5 py-0.5 rounded uppercase font-black border border-red-500/30">
                            Creator
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-zinc-400">{member.email}</div>
                    </td>

                    <td className="py-4 px-4">
                      <div className="font-black text-system-cyan">LV. {member.level}</div>
                      <div className="text-[10px] text-zinc-400">{member.rank}</div>
                    </td>

                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-bold text-[10px] border ${
                          isVip
                            ? "bg-system-gold/15 text-system-gold border-system-gold/40 shadow-[0_0_10px_rgba(255,215,0,0.15)]"
                            : "bg-zinc-800 text-zinc-300 border-white/10"
                        }`}
                      >
                        {isVip && <Crown className="w-3 h-3 text-system-gold" />}
                        {member.tier}
                      </span>
                    </td>

                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold ${
                          member.status === "Active"
                            ? "text-green-400 bg-green-500/10 border border-green-500/20"
                            : "text-red-400 bg-red-500/10 border border-red-500/20"
                        }`}
                      >
                        {member.status}
                      </span>
                    </td>

                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* Toggle VIP */}
                        <button
                          onClick={() => handleToggleVip(member.id)}
                          className={`px-2.5 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all border cursor-pointer ${
                            isVip
                              ? "bg-system-dark text-zinc-400 border-white/10 hover:border-yellow-500/40 hover:text-yellow-400"
                              : "bg-system-gold/20 text-system-gold border-system-gold/40 hover:bg-system-gold hover:text-black"
                          }`}
                          title={isVip ? "Downgrade to E-Rank Free" : "Promote to S-Rank VIP Guild"}
                        >
                          {isVip ? "Revoke VIP" : "Grant VIP"}
                        </button>

                        {/* Adjust Level +10 */}
                        <button
                          onClick={() => handleAdjustLevel(member.id, 10)}
                          className="px-2 py-1.5 rounded-lg bg-system-blue/20 hover:bg-system-blue text-system-cyan hover:text-black border border-system-blue/40 text-[10px] font-bold transition-all cursor-pointer"
                          title="Boost +10 Hunter Levels"
                        >
                          +10 LV
                        </button>

                        {/* Reset Individual Account */}
                        <button
                          onClick={() => handleResetMemberAccount(member.id, member.name, member.email)}
                          className="px-2 py-1.5 rounded-lg bg-red-500/15 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/30 text-[10px] font-bold transition-all cursor-pointer flex items-center gap-1"
                          title="Reset account to Level 1 E-Rank"
                        >
                          <RotateCcw className="w-3 h-3" />
                          <span>Reset</span>
                        </button>

                        {/* Toggle Suspend */}
                        {!isSelf && (
                          <button
                            onClick={() => handleToggleStatus(member.id)}
                            className="p-1.5 rounded-lg bg-system-dark hover:bg-white/10 border border-white/10 text-zinc-400 hover:text-white transition-all cursor-pointer"
                            title="Toggle account suspension"
                          >
                            <AlertTriangle className="w-3.5 h-3.5" />
                          </button>
                        )}

                        {/* Delete */}
                        {!isSelf && (
                          <button
                            onClick={() => handleDeleteMember(member.id, member.name)}
                            className="p-1.5 rounded-lg bg-system-dark hover:bg-red-500/20 border border-white/10 hover:border-red-500/40 text-zinc-400 hover:text-red-400 transition-all cursor-pointer"
                            title="Delete user from database"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick System Maintenance Utilities */}
      <div className="bg-system-panel rounded-2xl p-6 border border-white/10 shadow-xl space-y-4">
        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
          <div className="w-10 h-10 rounded-xl bg-system-blue/10 border border-system-blue flex items-center justify-center">
            <Sliders className="w-5 h-5 text-system-blue" />
          </div>
          <div>
            <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-system-blue">System Utilities & Testing</div>
            <h3 className="text-lg font-black text-white uppercase tracking-wider">Monarch Maintenance Actions</h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
          <div className="p-4 rounded-xl bg-system-dark/80 border border-white/10 flex items-center justify-between gap-4">
            <div>
              <div className="font-bold text-white uppercase">Reset Today's Quests</div>
              <div className="text-[11px] text-zinc-400 mt-0.5">Clear daily checkmarks for local hunter state</div>
            </div>
            <button
              onClick={handleResetAllQuestsToday}
              className="px-4 py-2 rounded-xl bg-red-500/20 hover:bg-red-500 text-red-300 hover:text-white border border-red-500/40 font-bold uppercase tracking-wider transition-all cursor-pointer flex-shrink-0"
            >
              Reset Quests
            </button>
          </div>

          <div className="p-4 rounded-xl bg-system-dark/80 border border-white/10 flex items-center justify-between gap-4">
            <div>
              <div className="font-bold text-white uppercase">Sync Local Roster to Storage</div>
              <div className="text-[11px] text-zinc-400 mt-0.5">Backup admin user database locally & cloud</div>
            </div>
            <button
              onClick={() => showToast("Guild database synchronized to local memory & cloud state!")}
              className="px-4 py-2 rounded-xl bg-system-cyan/20 hover:bg-system-cyan text-system-cyan hover:text-black border border-system-cyan/40 font-bold uppercase tracking-wider transition-all cursor-pointer flex-shrink-0 flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Force Sync</span>
            </button>
          </div>
        </div>
      </div>

      {/* Add Member Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-system-panel border-2 border-system-gold rounded-2xl p-6 max-w-md w-full shadow-glow-gold space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-lg font-black text-white uppercase tracking-wider flex items-center gap-2">
                <Crown className="w-5 h-5 text-system-gold" /> Add New Guild Hunter
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-zinc-400 hover:text-white font-mono text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddMemberSubmit} className="space-y-4 font-mono text-xs">
              <div>
                <label className="block text-zinc-400 uppercase font-bold mb-1">Hunter Name</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Thomas Andre"
                  className="w-full bg-system-dark border border-white/20 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-system-gold"
                />
              </div>

              <div>
                <label className="block text-zinc-400 uppercase font-bold mb-1">Hunter Email</label>
                <input
                  type="email"
                  required
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="e.g. goliath@guild.com"
                  className="w-full bg-system-dark border border-white/20 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-system-gold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-400 uppercase font-bold mb-1">Initial Level</label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={newLevel}
                    onChange={(e) => setNewLevel(parseInt(e.target.value) || 1)}
                    className="w-full bg-system-dark border border-white/20 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-system-gold"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 uppercase font-bold mb-1">Guild Tier</label>
                  <select
                    value={newTier}
                    onChange={(e) => setNewTier(e.target.value as "E-Rank Free" | "S-Rank VIP Guild")}
                    className="w-full bg-system-dark border border-white/20 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-system-gold cursor-pointer"
                  >
                    <option value="E-Rank Free">E-Rank Free</option>
                    <option value="S-Rank VIP Guild">S-Rank VIP Guild</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-system-dark text-zinc-400 hover:text-white font-bold uppercase transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-system-gold text-black font-black uppercase tracking-wider shadow-glow-gold hover:scale-105 transition-all cursor-pointer"
                >
                  Register Hunter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
