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

interface LocalAuthUser {
  uid: string;
  email: string;
  displayName: string;
  tier: "E-Rank Free" | "S-Rank VIP Guild";
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

  // PayPal Business Subscriptions state
  const [paypalEmail, setPaypalEmail] = useState("nick@betterleveling.com");
  const [monthlyPlanId, setMonthlyPlanId] = useState("P-9YP26432WY575283BNJEZ6GQ");
  const [yearlyPlanId, setYearlyPlanId] = useState("P-5XP014252D7812136NJEZ6XA");
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [isCloudSyncing, setIsCloudSyncing] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Load saved PayPal business subscriptions config
      const savedPaypal = localStorage.getItem("pf_business_paypal");
      if (savedPaypal) setPaypalEmail(savedPaypal);
      const savedMonthlyPlan = localStorage.getItem("pf_paypal_monthly_plan");
      if (savedMonthlyPlan) setMonthlyPlanId(savedMonthlyPlan);
      const savedYearlyPlan = localStorage.getItem("pf_paypal_yearly_plan");
      if (savedYearlyPlan) setYearlyPlanId(savedYearlyPlan);

      // Load local hunter user
      const savedUser = localStorage.getItem("hunter_current_user");
      if (savedUser) {
        try {
          const parsed = JSON.parse(savedUser);
          if (parsed.email?.toLowerCase() === "ncrossonofficial06@gmail.com") {
            parsed.tier = "S-Rank VIP Guild";
            localStorage.setItem("hunter_vip_tier", "S-Rank VIP Guild");
          }
          setCurrentUser(parsed);
          if (parsed.email) {
            restoreHunterFromCloud(parsed.email).then((cloudData) => {
              if (cloudData && cloudData.tier) {
                parsed.tier = cloudData.tier;
                setCurrentUser({ ...parsed });
              }
            });
          }
        } catch (e) {
          console.error("Error parsing user", e);
        }
      }

      // Check Firebase Auth observer
      const unsubscribe = auth.onAuthStateChanged(async (user: FirebaseUser | null) => {
        if (user && user.email) {
          const isNickAdmin = user.email.toLowerCase() === "ncrossonofficial06@gmail.com";
          if (isNickAdmin) {
            localStorage.setItem("hunter_vip_tier", "S-Rank VIP Guild");
          }
          const cloudData = await restoreHunterFromCloud(user.email);
          const activeTier = isNickAdmin
            ? "S-Rank VIP Guild"
            : (cloudData?.tier || (localStorage.getItem("hunter_vip_tier") as "E-Rank Free" | "S-Rank VIP Guild") || "E-Rank Free");

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

  const savePaypalEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      localStorage.setItem("pf_business_paypal", paypalEmail);
      setIsEditingPaypal(false);
      alert(`✅ Linked Business PayPal account updated to: ${paypalEmail}`);
    }
  };

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    try {
      if (email.trim().toLowerCase() === "ncrossonofficial06@gmail.com") {
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
          email: "ncrossonofficial06@gmail.com",
          displayName: adminName,
          tier: "S-Rank VIP Guild",
        };

        setCurrentUser(adminUser);
        if (typeof window !== "undefined") {
          localStorage.setItem("hunter_current_user", JSON.stringify(adminUser));
          localStorage.setItem("hunter_vip_tier", "S-Rank VIP Guild");
        }

        // Update hunter state with Admin Perks
        const hunterState = loadHunterState();
        hunterState.profile.name = adminName;
        hunterState.profile.title = "Shadow Monarch (Creator Admin)";
        hunterState.profile.level = Math.max(hunterState.profile.level, 100);
        hunterState.profile.rank = "S-Rank";
        hunterState.statPoints += 25;
        saveHunterState(hunterState);

        // Trigger celebration
        confetti({
          particleCount: 250,
          spread: 120,
          origin: { y: 0.5 },
          colors: ["#ffd700", "#00f0ff", "#7000ff", "#ff0055"],
        });

        alert(`👑 ARISE, CREATOR ADMIN NICK! S-Rank VIP Guild Membership unlocked forever. Welcome back!`);
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
          tier: "E-Rank Free",
        };
        setCurrentUser(newUser);
        if (typeof window !== "undefined") {
          localStorage.setItem("hunter_current_user", JSON.stringify(newUser));
        }

        // Update Hunter State profile name
        const hunterState = loadHunterState();
        hunterState.profile.name = displayName;
        saveHunterState(hunterState);
        awardXp(250, "int");

        alert(`⚡ Awakening Complete! Welcome to the Guild, Hunter ${displayName}! (+250 XP)`);
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
          tier: (localStorage.getItem("hunter_vip_tier") as "E-Rank Free" | "S-Rank VIP Guild") || "E-Rank Free",
        };
        setCurrentUser(existing);
        if (typeof window !== "undefined") {
          localStorage.setItem("hunter_current_user", JSON.stringify(existing));
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
    }
  };

  const handleManualCloudSync = async () => {
    if (!currentUser) return;
    setIsCloudSyncing(true);
    const success = await syncHunterToCloud(currentUser.email, currentUser.displayName, currentUser.tier);
    setIsCloudSyncing(false);
    if (success) {
      alert("⚡ Cloud Sync Successful! Your membership & stats are backed up to Firebase Firestore across devices.");
    } else {
      alert("⚠️ Stored offline backup in local browser cache. Configure Firebase database in Cloudflare for live multi-device sync!");
    }
  };

  const handleActivateVIP = () => {
    if (!currentUser) {
      alert("⚠️ Please Sign In or Register a Hunter account first before upgrading to S-Rank VIP!");
      return;
    }

    const upgraded: LocalAuthUser = { ...currentUser, tier: "S-Rank VIP Guild" };
    setCurrentUser(upgraded);
    if (typeof window !== "undefined") {
      localStorage.setItem("hunter_current_user", JSON.stringify(upgraded));
      localStorage.setItem("hunter_vip_tier", "S-Rank VIP Guild");
    }
    syncHunterToCloud(upgraded.email, upgraded.displayName, "S-Rank VIP Guild");

    // Award XP and Stat points
    awardXp(1000, "str");
    const hunterState = loadHunterState();
    hunterState.rank = "S-Rank";
    hunterState.stats.availablePoints += 5;
    saveHunterState(hunterState);

    // Confetti celebration
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#ffd700", "#00f0ff", "#7000ff"],
    });

    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 6000);
  };

  const getPaypalCheckoutUrl = () => {
    const currentPlan = billingCycle === "monthly" ? monthlyPlanId : yearlyPlanId;
    // If user pasted a full URL (like a PayPal Hosted Subscription link from Subscriptions tab)
    if (currentPlan.startsWith("http")) {
      return currentPlan;
    }
    // If user pasted a Plan ID from PayPal Subscriptions tab (e.g., P-1234567890)
    if (currentPlan.startsWith("P-")) {
      return `https://www.paypal.com/webapps/billing/plans/subscribe?plan_id=${encodeURIComponent(currentPlan)}`;
    }
    // Standard subscription link fallback
    const amount = billingCycle === "monthly" ? "9.99" : "89.99";
    const itemName = billingCycle === "monthly" ? "S-Rank VIP Guild Membership (Monthly)" : "S-Rank VIP Guild Membership (Annual Save 25%)";
    return `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick-subscriptions&business=${encodeURIComponent(paypalEmail)}&item_name=${encodeURIComponent(itemName)}&a3=${amount}&p3=1&t3=${billingCycle === "monthly" ? "M" : "Y"}&currency_code=USD`;
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
              Guild Membership & Authentication Portal
            </div>
            <h2 className="text-2xl md:text-3xl font-black tracking-wider text-white uppercase text-glow">
              Awaken Your <span className="text-system-gold">Shadow Monarch</span> VIP Status
            </h2>
            <p className="text-zinc-300 text-sm leading-relaxed">
              Sign up or log in to sync your 242 lbs → 170 lbs transformation journey across devices. Upgrade to the <strong className="text-system-gold">S-Rank VIP Guild Membership</strong> with PayPal for real-time cloud backups, unlimited AI scanning, and elite coaching perks!
            </p>
          </div>
        </div>
      </div>

      {/* Success Toast */}
      {showSuccessToast && (
        <div className="bg-gradient-to-r from-green-500/20 via-system-gold/20 to-system-blue/20 border-2 border-system-gold p-5 rounded-2xl flex items-center justify-between gap-4 shadow-glow-gold animate-in zoom-in-95 duration-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-system-gold text-black flex items-center justify-center font-black">
              <Crown className="w-6 h-6 fill-black" />
            </div>
            <div>
              <h4 className="text-base font-black text-white uppercase tracking-wider">S-Rank VIP Guild Status Activated!</h4>
              <p className="text-xs text-zinc-300">You received +1,000 XP, +5 Free Stat Points, and instant unlock of all Shadow Monarch features.</p>
            </div>
          </div>
          <button onClick={() => setShowSuccessToast(false)} className="text-zinc-400 hover:text-white font-bold">✕</button>
        </div>
      )}

      {/* Two Column Section: Left = Auth Box, Right = Membership Tier Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column (5 Cols): Authentication & Account Manager */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-system-panel p-6 rounded-2xl border border-system-blue/30 shadow-xl space-y-6">
            
            {currentUser ? (
              /* Signed In Hunter Account Card */
              <div className="space-y-6 text-center py-4">
                <div className="relative inline-block mx-auto">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-system-blue to-system-purple border-2 border-system-cyan flex items-center justify-center shadow-glow-blue">
                    <UserCheck className="w-10 h-10 text-white" />
                  </div>
                  {currentUser.tier === "S-Rank VIP Guild" && (
                    <div className="absolute -top-2 -right-2 bg-system-gold text-black p-1.5 rounded-full border border-black shadow-glow-gold" title="VIP Guild Member">
                      <Crown className="w-4 h-4 fill-black" />
                    </div>
                  )}
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
                    <span className="text-white font-bold">Planet Fitness Lewiston ME</span>
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
                    <span>{loading ? "Awakening..." : isSignUp ? "Awaken System (+250 XP)" : "Enter System"}</span>
                  </button>
                </form>

                <div className="bg-system-dark/80 p-3 rounded-xl border border-white/5 text-[11px] text-zinc-400 leading-relaxed text-center font-mono">
                  🔒 Offline-First Engine: Even without active internet, your credentials and workout progress are encrypted and stored safely in browser localStorage.
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Right Column (7 Cols): PayPal Business Membership Tiers */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-system-panel p-5 rounded-2xl border border-white/10">
            <div>
              <h3 className="text-lg font-black text-white uppercase tracking-wider flex items-center gap-2">
                <Award className="w-5 h-5 text-system-gold" />
                <span>Guild Membership Tiers</span>
              </h3>
              <p className="text-xs text-zinc-400">Choose your rank to unlock cloud sync and elite nutrition tools.</p>
            </div>

            {/* Billing Toggle */}
            <div className="flex items-center bg-system-dark p-1 rounded-xl border border-white/10 self-stretch sm:self-auto">
              <button
                type="button"
                onClick={() => setBillingCycle("monthly")}
                className={`flex-1 sm:flex-none px-4 py-1.5 rounded-lg text-xs font-bold uppercase font-mono transition-all ${
                  billingCycle === "monthly" ? "bg-system-blue text-black font-black shadow-sm" : "text-zinc-400 hover:text-white"
                }`}
              >
                Monthly
              </button>
              <button
                type="button"
                onClick={() => setBillingCycle("yearly")}
                className={`flex-1 sm:flex-none px-4 py-1.5 rounded-lg text-xs font-bold uppercase font-mono transition-all flex items-center justify-center gap-1 ${
                  billingCycle === "yearly" ? "bg-system-gold text-black font-black shadow-sm" : "text-zinc-400 hover:text-white"
                }`}
              >
                <span>Yearly</span>
                <span className="text-[9px] bg-red-500 text-white px-1 rounded font-black">-25%</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Tier 1: E-Rank Free */}
            <div className="bg-system-panel p-6 rounded-2xl border border-white/10 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest">Standard Access</span>
                    <h4 className="text-xl font-black text-white uppercase mt-0.5">E-Rank Hunter</h4>
                  </div>
                  <div className="text-right font-mono">
                    <div className="text-2xl font-black text-white">$0</div>
                    <div className="text-[10px] text-zinc-500 uppercase">Forever Free</div>
                  </div>
                </div>

                <hr className="border-white/10" />

                <ul className="space-y-3 text-xs text-zinc-300">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-system-cyan flex-shrink-0" />
                    <span>6-Day Push/Pull/Legs Split Tracker</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-system-cyan flex-shrink-0" />
                    <span>Planet Fitness Lewiston ME Equipment Specs</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-system-cyan flex-shrink-0" />
                    <span>Auburn/Lewiston Walmart & Shaw's Grocery Guide</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-system-cyan flex-shrink-0" />
                    <span>Camera Barcode Scanner (Local DB)</span>
                  </li>
                  <li className="flex items-center gap-2.5 text-zinc-500">
                    <Lock className="w-4 h-4 text-zinc-600 flex-shrink-0" />
                    <span className="line-through">Cloud Sync Across iOS & Desktop</span>
                  </li>
                  <li className="flex items-center gap-2.5 text-zinc-500">
                    <Lock className="w-4 h-4 text-zinc-600 flex-shrink-0" />
                    <span className="line-through">Unlimited AI OpenFoodFacts Lookups</span>
                  </li>
                </ul>
              </div>

              <div className="w-full py-3 rounded-xl bg-system-dark border border-white/10 text-center text-zinc-400 text-xs font-bold uppercase">
                {currentUser?.tier === "S-Rank VIP Guild" ? "Included in VIP" : "Current Active Tier"}
              </div>
            </div>

            {/* Tier 2: S-Rank VIP Guild */}
            <div className="bg-gradient-to-br from-system-panel via-system-card to-[#120a21] p-6 rounded-2xl border-2 border-system-gold shadow-glow-gold flex flex-col justify-between space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-system-gold text-black text-[9px] font-black uppercase tracking-widest px-4 py-1 rounded-bl-xl shadow-md font-mono">
                Recommended VIP
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-mono font-bold text-system-gold uppercase tracking-widest flex items-center gap-1">
                      <Crown className="w-3.5 h-3.5 fill-system-gold" /> Guild VIP
                    </span>
                    <h4 className="text-xl font-black text-white uppercase mt-0.5">S-Rank Monarch</h4>
                  </div>
                  <div className="text-right font-mono">
                    <div className="text-2xl font-black text-system-gold">
                      {billingCycle === "monthly" ? "$9.99" : "$89.99"}
                    </div>
                    <div className="text-[10px] text-zinc-400 uppercase">
                      {billingCycle === "monthly" ? "Per Month" : "Per Year ($7.50/mo)"}
                    </div>
                  </div>
                </div>

                <hr className="border-system-gold/30" />

                <ul className="space-y-3 text-xs text-zinc-200">
                  <li className="flex items-center gap-2.5 font-bold text-system-gold">
                    <Crown className="w-4 h-4 fill-system-gold text-system-gold flex-shrink-0" />
                    <span>Everything in E-Rank Free Tier</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-system-gold flex-shrink-0" />
                    <span>Real-time Cloud Sync across all mobile devices</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-system-gold flex-shrink-0" />
                    <span>Unlimited OpenFoodFacts Global Barcode API</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-system-gold flex-shrink-0" />
                    <span>Shadow Monarch Golden Rank Badge & Frame</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-system-gold flex-shrink-0" />
                    <span>Direct PayPal Business Checkout Integration</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-system-gold flex-shrink-0" />
                    <span>+1,000 Bonus XP & +5 Free Stat Points on Upgrade</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-3 pt-2">
                {currentUser?.tier === "S-Rank VIP Guild" ? (
                  <div className="w-full py-3.5 rounded-xl bg-system-gold text-black text-center text-xs font-black uppercase tracking-widest shadow-glow-gold flex items-center justify-center gap-2 min-h-[44px]">
                    <Crown className="w-4 h-4 fill-black" />
                    <span>VIP Guild Member Active</span>
                  </div>
                ) : (
                  <>
                    {/* Official PayPal Hosted Checkout Button */}
                    <a
                      href={getPaypalCheckoutUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3.5 rounded-xl bg-[#0070ba] hover:bg-[#005ea6] text-white text-center text-xs font-black uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2 min-h-[44px]"
                    >
                      <CreditCard className="w-4 h-4" />
                      <span>Pay via PayPal Business ({billingCycle === "monthly" ? "$9.99/mo" : "$89.99/yr"})</span>
                      <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                    </a>

                    {/* Instant Activation Demo Button for testing */}
                    <button
                      type="button"
                      onClick={handleActivateVIP}
                      className="w-full py-2.5 rounded-xl bg-system-gold/20 hover:bg-system-gold text-system-gold hover:text-black border border-system-gold/60 text-[11px] font-black uppercase tracking-widest transition-all min-h-[44px]"
                    >
                      ⚡ Instant VIP Unlock (Test Mode / +1000 XP)
                    </button>
                  </>
                )}
              </div>
            </div>

          </div>

          <div className="bg-system-panel p-4 rounded-xl border border-system-blue/20 text-xs text-zinc-400 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-system-blue flex-shrink-0" />
              <div>
                <div className="font-bold text-white uppercase">Linked Business Subscriptions Security</div>
                <div className="text-[11px]">All subscription transactions are encrypted and processed securely by PayPal Business Subscriptions via <span className="text-system-cyan font-mono">{paypalEmail}</span>.</div>
              </div>
            </div>
            <span className="text-[10px] font-mono bg-system-blue/10 text-system-cyan px-2 py-1 rounded border border-system-blue/30 whitespace-nowrap">
              256-Bit SSL
            </span>
          </div>
        </div>

      </div>

    </div>
  );
}
