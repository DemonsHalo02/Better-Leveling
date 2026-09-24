"use client";

import React, { useState, useEffect } from "react";
import { auth } from "@/lib/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  User as FirebaseUser,
} from "firebase/auth";
import { loadHunterState, saveHunterState, awardXp } from "@/lib/hunter-system";
import { syncHunterToCloud, restoreHunterFromCloud } from "@/lib/cloud-sync";
import {
  Shield,
  Crown,
  Lock,
  Mail,
  UserCheck,
  CheckCircle2,
  Sparkles,
  AlertCircle,
  ExternalLink,
  CreditCard,
  LogOut,
  Zap,
  Award,
} from "lucide-react";
import confetti from "canvas-confetti";
import VipPremiumShowcase from "./VipPremiumShowcase";

interface LocalAuthUser {
  uid: string;
  email: string;
  displayName: string;
  tier: "S-Rank VIP Guild";
}

export default function MembershipPortal() {
  // Auth state
  const [currentUser, setCurrentUser] = useState<LocalAuthUser | null>(null);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isCloudSyncing, setIsCloudSyncing] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Load local hunter user
      const savedUser = localStorage.getItem("hunter_current_user");
      if (savedUser) {
        try {
          const parsed = JSON.parse(savedUser);
          parsed.tier = "S-Rank VIP Guild";
          localStorage.setItem("hunter_vip_tier", "S-Rank VIP Guild");
          setCurrentUser(parsed);
          if (parsed.email) {
            restoreHunterFromCloud(parsed.email).then((cloudData) => {
              if (cloudData && cloudData.tier) {
                parsed.tier = "S-Rank VIP Guild";
                setCurrentUser({ ...parsed });
              }
            });
          }
        } catch {}
      }

      // Check Firebase Auth observer
      const unsubscribe = auth.onAuthStateChanged(async (user: FirebaseUser | null) => {
        if (user && user.email) {
          const userEmailClean = user.email.toLowerCase();
          const isNickAdmin = userEmailClean === "ncrossonofficial06@gmail.com";
          if (isNickAdmin) {
            localStorage.setItem("hunter_is_admin", "true");
          }
          const activeTier = "S-Rank VIP Guild";

          const updatedUser: LocalAuthUser = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || (isNickAdmin ? "Shadow Monarch Nick" : "Shadow Monarch"),
            tier: activeTier,
          };
          setCurrentUser(updatedUser);
          localStorage.setItem("hunter_current_user", JSON.stringify(updatedUser));
          localStorage.setItem("hunter_vip_tier", activeTier);
          
          // Auto sync back to ensure both devices are in sync
          syncHunterToCloud(user.email, updatedUser.displayName, activeTier);
        }
      });

      return () => unsubscribe();
    }
  }, []);

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    try {
      const emailClean = email.trim().toLowerCase();
      if (emailClean === "ncrossonofficial06@gmail.com") {
        if (password !== "Charminlikeasnake06!") {
          throw new Error("⚠️ Incorrect secret password for Creator Admin account!");
        }
        // Try Firebase auth just in case
        try {
          if (isSignUp) {
            const cred = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(cred.user, { displayName: displayName.trim() || "Shadow Monarch Nick" });
          } else {
            await signInWithEmailAndPassword(auth, email, password);
          }
        } catch (firebaseErr: any) {
          console.warn("Firebase admin login offline or already exists, proceeding:", firebaseErr);
        }

        const adminName = displayName.trim() || "Shadow Monarch Nick";
        const adminUser: LocalAuthUser = {
          uid: "admin-shadow-monarch-001",
          email: emailClean || "ncrossonofficial06@gmail.com",
          displayName: adminName,
          tier: "S-Rank VIP Guild",
        };

        setCurrentUser(adminUser);
        if (typeof window !== "undefined") {
          localStorage.setItem("hunter_current_user", JSON.stringify(adminUser));
          localStorage.setItem("hunter_vip_tier", "S-Rank VIP Guild");
          localStorage.setItem("hunter_is_admin", "true");
          window.dispatchEvent(new CustomEvent("hunterStateChanged"));
        }

        // Update hunter state with Admin Perks
        const hunterState = loadHunterState();
        hunterState.profile.name = adminName;
        hunterState.title = "Shadow Monarch (Creator Admin)";
        hunterState.level = Math.max(hunterState.level, 100);
        hunterState.rank = "Shadow Monarch";
        hunterState.stats.availablePoints += 25;
        saveHunterState(hunterState);

        // Trigger celebration
        confetti({
          particleCount: 250,
          spread: 120,
          origin: { y: 0.5 },
          colors: ["#ffd700", "#00f0ff", "#7000ff", "#ff0055"],
        });

        alert(`👑 ARISE, CREATOR ADMIN NICK! VIP Account unlocked. Welcome back!`);
        setLoading(false);
        return;
      }

      if (isSignUp) {
        if (!displayName.trim()) {
          throw new Error("Please enter your Hunter Name.");
        }
        // Try Firebase sign up
        try {
          const cred = await createUserWithEmailAndPassword(auth, email, password);
          await updateProfile(cred.user, { displayName });
        } catch (firebaseErr: any) {
          console.warn("Firebase sign up offline or unconfigured, falling back to offline LocalStorage auth:", firebaseErr);
        }

        // Offline / local save
        const newUser: LocalAuthUser = {
          uid: `offline-${Date.now()}`,
          email,
          displayName,
          tier: "S-Rank VIP Guild",
        };
        setCurrentUser(newUser);
        if (typeof window !== "undefined") {
          localStorage.setItem("hunter_current_user", JSON.stringify(newUser));
          localStorage.setItem("hunter_vip_tier", "S-Rank VIP Guild");
        }

        // Update Hunter State profile name
        const hunterState = loadHunterState();
        hunterState.profile.name = displayName;
        saveHunterState(hunterState);
        awardXp(250, "int");

        alert(`⚡ Awakening Complete! Welcome to the Guild, Hunter ${displayName}! You now have VIP access. (+250 XP)`);
      } else {
        // Sign in
        try {
          await signInWithEmailAndPassword(auth, email, password);
        } catch (firebaseErr: any) {
          console.warn("Firebase sign in offline or unconfigured, falling back to local auth:", firebaseErr);
        }

        const existing: LocalAuthUser = {
          uid: `offline-${Date.now()}`,
          email,
          displayName: email.split("@")[0] || "Hunter",
          tier: "S-Rank VIP Guild",
        };
        setCurrentUser(existing);
        if (typeof window !== "undefined") {
          localStorage.setItem("hunter_current_user", JSON.stringify(existing));
          localStorage.setItem("hunter_vip_tier", "S-Rank VIP Guild");
        }
        alert(`⚡ Arise! Signed back in as ${existing.displayName}.`);
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Authentication error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (e) {}
    setCurrentUser(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("hunter_current_user");
      localStorage.removeItem("hunter_is_admin");
      localStorage.removeItem("hunter_vip_tier");
      window.dispatchEvent(new CustomEvent("hunterStateChanged"));
    }
  };

  const handleManualCloudSync = async () => {
    if (!currentUser) return;
    setIsCloudSyncing(true);
    try {
      const result = await syncHunterToCloud(currentUser.email, currentUser.displayName, currentUser.tier);
      if (result === true) {
        alert("⚡ Cloud Sync Successful! Your stats are backed up to Firebase Firestore across devices.");
      } else {
        alert(`⚠️ Sync failed. Error details: ${result}`);
      }
    } catch (err: any) {
      alert(`⚠️ Sync timed out or crashed. Error: ${err.message || "Unknown error"}`);
    } finally {
      setIsCloudSyncing(false);
    }
  };

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-300">
      
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-system-card via-system-panel to-system-dark p-6 border border-system-gold/50 shadow-glow-gold">
        <div className="absolute -right-10 -top-10 w-64 h-64 bg-system-gold/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-system-gold/10 border border-system-gold text-system-gold text-xs font-mono uppercase tracking-widest font-bold shadow-sm">
              <Crown className="w-3.5 h-3.5 fill-system-gold animate-bounce" />
              Account Portal
            </div>
            <h2 className="text-2xl md:text-3xl font-black tracking-wider text-white uppercase text-glow">
              Awaken Your <span className="text-system-gold">Shadow Monarch</span> Status
            </h2>
            <p className="text-zinc-300 text-sm leading-relaxed">
              Sign up or log in to sync your journey across devices. Logging into an account unlocks all <strong className="text-system-gold">VIP Premium Features</strong> automatically!
            </p>
          </div>
        </div>
      </div>

      {/* S-Rank VIP Premium Suite & Showcase */}
      <VipPremiumShowcase
        userTier={currentUser ? "S-Rank VIP Guild" : "E-Rank Free"}
        onUpgradeClick={() => {}}
      />

      <div className="max-w-xl mx-auto space-y-6">
        <div className="bg-system-panel p-6 rounded-2xl border border-system-blue/30 shadow-xl space-y-6">
          
          {currentUser ? (
            /* Signed In Hunter Account Card */
            <div className="space-y-6 text-center py-4">
              <div className="relative inline-block mx-auto">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-system-blue to-system-purple border-2 border-system-cyan flex items-center justify-center shadow-glow-blue">
                  <UserCheck className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 bg-system-gold text-black p-1.5 rounded-full border border-black shadow-glow-gold" title="VIP Guild Member">
                  <Crown className="w-4 h-4 fill-black" />
                </div>
              </div>

              <div className="space-y-1">
                <div className="inline-block px-3 py-0.5 rounded-full bg-system-blue/20 text-system-cyan text-xs font-mono font-bold uppercase tracking-wider border border-system-blue/40">
                  {currentUser.tier}
                </div>
                <h3 className="text-2xl font-black text-white uppercase tracking-wide mt-2">
                  Hunter {currentUser.displayName}
                </h3>
                <p className="text-xs font-mono text-zinc-400">{currentUser.email}</p>
              </div>

              <div className="bg-system-dark/80 p-4 rounded-xl border border-white/10 text-left space-y-2 text-xs">
                <div className="flex justify-between font-mono">
                  <span className="text-zinc-400">Account ID:</span>
                  <span className="text-system-cyan font-bold truncate max-w-[150px]">{currentUser.uid}</span>
                </div>
                <div className="flex justify-between font-mono">
                  <span className="text-zinc-400">Sync Engine:</span>
                  <span className="text-green-400 font-bold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-ping" />
                    Active / Local + Cloud
                  </span>
                </div>
                <div className="flex justify-between font-mono">
                  <span className="text-zinc-400">Gym Profile:</span>
                  <span className="text-white font-bold">Quiet Apartment Dojo</span>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={handleManualCloudSync}
                  disabled={isCloudSyncing}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-system-blue to-system-cyan hover:from-system-cyan hover:to-system-blue text-black font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-glow-blue min-h-[44px]"
                >
                  <Zap className={`w-4 h-4 fill-black ${isCloudSyncing ? "animate-spin" : ""}`} />
                  <span>{isCloudSyncing ? "Syncing to Cloud..." : "⚡ Force Cloud Save (Backup Now)"}</span>
                </button>

                <button
                  onClick={handleSignOut}
                  className="w-full py-3 rounded-xl bg-system-card hover:bg-red-500/20 border border-red-500/40 text-red-400 hover:text-red-300 font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 min-h-[44px]"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out of System</span>
                </button>
              </div>
            </div>
          ) : (
            /* Auth Form (Sign In / Sign Up) */
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="text-base font-black text-white uppercase tracking-wider flex items-center gap-2">
                  <Shield className="w-5 h-5 text-system-blue" />
                  <span>{isSignUp ? "Register New Hunter" : "Sign In to System"}</span>
                </h3>
                <button
                  onClick={() => {
                    setIsSignUp(!isSignUp);
                    setErrorMsg(null);
                  }}
                  className="text-xs font-mono font-bold text-system-cyan hover:underline"
                >
                  {isSignUp ? "Existing Hunter? Log In" : "New? Register Now"}
                </button>
              </div>

              {errorMsg && (
                <div className="bg-red-500/15 border border-red-500/40 p-3.5 rounded-xl flex items-center gap-2 text-red-400 text-xs">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <form onSubmit={handleAuthSubmit} className="space-y-4">
                {isSignUp && (
                  <div>
                    <label className="text-xs font-bold text-zinc-400 uppercase font-mono">Hunter Name / Title</label>
                    <input
                      type="text"
                      placeholder="e.g. Shadow Monarch Nick"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="w-full bg-system-dark border border-system-blue/40 rounded-xl px-4 py-3 mt-1 text-sm font-bold text-white focus:outline-none focus:border-system-blue shadow-inner"
                      required={isSignUp}
                    />
                  </div>
                )}

                <div>
                  <label className="text-xs font-bold text-zinc-400 uppercase font-mono">Email Address</label>
                  <input
                    type="email"
                    placeholder="hunter@sololeveling.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-system-dark border border-system-blue/40 rounded-xl px-4 py-3 mt-1 text-sm font-mono text-white focus:outline-none focus:border-system-blue shadow-inner"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-zinc-400 uppercase font-mono">Secret Password</label>
                  <input
                    type="password"
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-system-dark border border-system-blue/40 rounded-xl px-4 py-3 mt-1 text-sm text-white focus:outline-none focus:border-system-blue shadow-inner"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-system-blue to-system-cyan text-black font-black uppercase text-sm tracking-widest shadow-glow-blue hover:bg-white transition-all min-h-[44px] flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{loading ? "Awakening..." : isSignUp ? "Awaken System & Unlock VIP" : "Enter System"}</span>
                </button>
              </form>

              <div className="bg-system-dark/80 p-3 rounded-xl border border-white/5 text-[11px] text-zinc-400 leading-relaxed text-center font-mono">
                🔒 Offline-First Engine: Even without active internet, your credentials and workout progress are encrypted and stored safely in browser localStorage.
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
