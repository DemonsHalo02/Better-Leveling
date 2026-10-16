import React, { useState } from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { useSyncStore } from '../../store/useSyncStore';
import { useWorkoutStore } from '../../store/useWorkoutStore';
import { useNutritionStore } from '../../store/useNutritionStore';
import { useWeightStore } from '../../store/useWeightStore';
import { GoalType, CalisthenicsIntensity } from '../../types';
import { calculateMacroTargets } from '../../lib/algorithms';
import {
  saveCredentials,
  getSavedCredentials,
  clearCredentials,
  testSupabaseConnection,
} from '../../lib/supabase';
import {
  Settings,
  Cloud,
  Database,
  User,
  Target,
  Sparkles,
  Download,
  LogOut,
  Check,
  AlertCircle,
  Loader2,
  RefreshCw,
  Copy,
  Info,
} from 'lucide-react';

interface SettingsViewProps {
  onOpenAuthModal?: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ onOpenAuthModal }) => {
  const { user, updateProfile, signOut, isAuthenticated } = useAuthStore();
  const { status, lastSyncedAt, syncNow } = useSyncStore();
  const { currentTier, setTier } = useWorkoutStore();
  const { getLatestWeight, getExpenditureReport } = useWeightStore();
  const { getAllDailyIntakeMap } = useNutritionStore();

  const savedCreds = getSavedCredentials();
  const [supabaseUrl, setSupabaseUrl] = useState(savedCreds.url);
  const [supabaseAnonKey, setSupabaseAnonKey] = useState(savedCreds.anonKey);
  const [isTesting, setIsTesting] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<{
    tested: boolean;
    success: boolean;
    message: string;
  } | null>(null);

  const [displayName, setDisplayName] = useState(user.displayName);
  const [heightFeet, setHeightFeet] = useState(user.heightFeet || 5);
  const [heightInches, setHeightInches] = useState(user.heightInches || 10);
  const [startingWeightLbs, setStartingWeightLbs] = useState(user.startingWeightLbs || 165);
  const [targetWeightLbs, setTargetWeightLbs] = useState(user.targetWeightLbs || 155);
  const [goal, setGoal] = useState<GoalType>(user.goal);

  // Macro fields
  const [calories, setCalories] = useState(user.macroGoals.calories);
  const [protein, setProtein] = useState(user.macroGoals.protein);
  const [carbs, setCarbs] = useState(user.macroGoals.carbs);
  const [fat, setFat] = useState(user.macroGoals.fat);

  const [savedFeedback, setSavedFeedback] = useState(false);
  const [copiedSchema, setCopiedSchema] = useState(false);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile({
      displayName,
      heightFeet: Number(heightFeet),
      heightInches: Number(heightInches),
      startingWeightLbs: Number(startingWeightLbs),
      targetWeightLbs: Number(targetWeightLbs),
      goal,
      calisthenicsTier: currentTier,
      macroGoals: {
        calories: Number(calories),
        protein: Number(protein),
        carbs: Number(carbs),
        fat: Number(fat),
      },
    });
    setSavedFeedback(true);
    setTimeout(() => setSavedFeedback(false), 2000);
  };

  const handleAutoCalculateMacros = () => {
    const latest = getLatestWeight();
    const currentWeight = latest ? latest.trend : startingWeightLbs;
    const dailyMap = getAllDailyIntakeMap();
    const expenditure = getExpenditureReport(dailyMap);

    const calculated = calculateMacroTargets(
      currentWeight,
      expenditure.estimatedTDEE,
      goal,
      1.0 // 1 lb/week
    );

    setCalories(calculated.calories);
    setProtein(calculated.protein);
    setCarbs(calculated.carbs);
    setFat(calculated.fat);
  };

  const handleTestConnection = async () => {
    if (!supabaseUrl || !supabaseAnonKey) {
      setConnectionStatus({
        tested: true,
        success: false,
        message: 'Please provide both the Supabase URL and Anon Key.',
      });
      return;
    }

    setIsTesting(true);
    const result = await testSupabaseConnection(supabaseUrl, supabaseAnonKey);
    setIsTesting(false);
    setConnectionStatus({
      tested: true,
      success: result.success,
      message: result.message,
    });
  };

  const handleSaveSupabaseConfig = async () => {
    saveCredentials(supabaseUrl, supabaseAnonKey);
    await syncNow();
    setSavedFeedback(true);
    setTimeout(() => setSavedFeedback(false), 2000);
  };

  const handleClearSupabase = () => {
    clearCredentials();
    setSupabaseUrl('');
    setSupabaseAnonKey('');
    setConnectionStatus(null);
  };

  const handleCopySchemaNotice = () => {
    navigator.clipboard.writeText(
      `-- Better Leveling Schema is located at supabase/schema.sql in the project repository`
    );
    setCopiedSchema(true);
    setTimeout(() => setCopiedSchema(false), 2000);
  };

  const handleExportData = () => {
    const data = {
      user: useAuthStore.getState().user,
      dailyLogs: useNutritionStore.getState().dailyLogs,
      customFoods: useNutritionStore.getState().customFoods,
      weightEntries: useWeightStore.getState().entries,
      workoutHistory: useWorkoutStore.getState().history,
      exportedAt: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `better-leveling-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-5 pb-28">
      {/* Settings Header */}
      <div className="bg-dark-850/80 border border-dark-750 rounded-2xl p-4 backdrop-blur shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400">
              <Settings size={18} />
            </div>
            <div>
              <h2 className="font-extrabold text-base text-dark-50">App & Sync Settings</h2>
              <p className="text-xs text-dark-400">
                Manage your athlete profile, macro goals, and cross-device cloud database
              </p>
            </div>
          </div>

          {!isAuthenticated && onOpenAuthModal && (
            <button
              onClick={onOpenAuthModal}
              className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-dark-950 font-bold text-xs transition"
            >
              Sign In
            </button>
          )}
        </div>
      </div>

      {/* Database & Cloud Synchronization (Supabase) */}
      <div className="bg-dark-850 border border-dark-750 rounded-2xl p-4 sm:p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-dark-800">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
              <Database size={18} />
            </div>
            <div>
              <h3 className="font-bold text-sm text-dark-50">Supabase Cloud Database</h3>
              <p className="text-xs text-dark-400">
                PostgreSQL & Auth for syncing data across all your devices
              </p>
            </div>
          </div>

          <button
            onClick={() => syncNow()}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-dark-800 hover:bg-dark-750 text-dark-200 text-xs font-mono border border-dark-700 transition"
          >
            <RefreshCw size={13} className={status === 'syncing' ? 'animate-spin text-amber-400' : ''} />
            <span>Sync Now</span>
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-dark-300 mb-1">
              Supabase Project URL
            </label>
            <input
              type="text"
              placeholder="https://suftlqgflpjnaptzrxuw.supabase.co"
              value={supabaseUrl}
              onChange={(e) => setSupabaseUrl(e.target.value)}
              className="w-full bg-dark-900 border border-dark-750 rounded-lg px-3 py-2 text-xs font-mono text-dark-50 placeholder:text-dark-600 focus:outline-none focus:border-emerald-400"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-dark-300 mb-1">
              Supabase Anon / Publishable Key
            </label>
            <input
              type="password"
              placeholder="sb_publishable_..."
              value={supabaseAnonKey}
              onChange={(e) => setSupabaseAnonKey(e.target.value)}
              className="w-full bg-dark-900 border border-dark-750 rounded-lg px-3 py-2 text-xs font-mono text-dark-50 placeholder:text-dark-600 focus:outline-none focus:border-emerald-400"
            />
          </div>

          {/* Instant Login Tip */}
          <div className="p-2.5 rounded-xl bg-dark-900 border border-dark-800 text-[11px] text-dark-300 flex items-start gap-2">
            <Info size={14} className="text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-dark-200">Tip for seamless login across devices: </span>
              <span>
                In your Supabase Dashboard, go to <strong>Authentication</strong> $\rightarrow$ <strong>Providers</strong> $\rightarrow$ <strong>Email</strong> and toggle <strong>"Confirm email"</strong> to <strong>OFF</strong>. This allows instant 1-click registration and login without waiting for email verification links!
              </span>
            </div>
          </div>

          {connectionStatus?.tested && (
            <div
              className={`p-2.5 rounded-lg text-xs flex items-center gap-2 ${
                connectionStatus.success
                  ? 'bg-emerald-950/30 border border-emerald-900/40 text-emerald-300'
                  : 'bg-rose-950/30 border border-rose-900/40 text-rose-300'
              }`}
            >
              {connectionStatus.success ? (
                <Check size={14} className="text-emerald-400" />
              ) : (
                <AlertCircle size={14} className="text-rose-400" />
              )}
              <span>{connectionStatus.message}</span>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-2 pt-1">
            <button
              type="button"
              onClick={handleTestConnection}
              disabled={isTesting}
              className="px-3 py-2 rounded-lg bg-dark-800 hover:bg-dark-750 text-dark-200 text-xs font-semibold border border-dark-700 transition flex items-center gap-1.5"
            >
              {isTesting ? <Loader2 size={13} className="animate-spin" /> : null}
              <span>Test Connection</span>
            </button>

            <button
              type="button"
              onClick={handleSaveSupabaseConfig}
              className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-dark-950 font-bold text-xs transition shadow-sm"
            >
              Save & Synchronize
            </button>

            {supabaseUrl && (
              <button
                type="button"
                onClick={handleClearSupabase}
                className="px-3 py-2 rounded-lg border border-dark-750 text-dark-400 hover:text-dark-200 text-xs transition"
              >
                Disconnect
              </button>
            )}

            <button
              type="button"
              onClick={handleCopySchemaNotice}
              className="px-3 py-2 rounded-lg bg-dark-800 hover:bg-dark-750 text-dark-400 hover:text-dark-200 text-xs font-mono border border-dark-700 transition flex items-center gap-1 ml-auto"
              title="See supabase/schema.sql"
            >
              <Copy size={12} />
              <span>{copiedSchema ? 'Copied Note' : 'Schema File'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Athlete Profile & Goals Form (US Measurements) */}
      <form
        onSubmit={handleSaveProfile}
        className="bg-dark-850 border border-dark-750 rounded-2xl p-4 sm:p-5 shadow-sm space-y-4"
      >
        <div className="flex items-center justify-between pb-3 border-b border-dark-800">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400">
              <User size={18} />
            </div>
            <div>
              <h3 className="font-bold text-sm text-dark-50">Athlete Profile & Goals</h3>
              <p className="text-xs text-dark-400">USA Measurements: Feet, Inches, and Pounds (lbs)</p>
            </div>
          </div>

          {savedFeedback && (
            <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
              <Check size={14} /> Saved!
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-dark-300 mb-1">Display Name</label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full bg-dark-900 border border-dark-750 rounded-lg px-3 py-2 text-xs text-dark-50 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-dark-300 mb-1">Fitness Goal</label>
            <select
              value={goal}
              onChange={(e) => setGoal(e.target.value as GoalType)}
              className="w-full bg-dark-900 border border-dark-750 rounded-lg px-3 py-2 text-xs text-dark-50 focus:outline-none focus:border-cyan-400"
            >
              <option value="fat_loss">Fat Loss (Caloric Deficit)</option>
              <option value="maintenance">Maintenance (Energy Balance)</option>
              <option value="muscle_gain">Muscle Gain (Lean Surplus)</option>
            </select>
          </div>

          {/* Height in Feet & Inches */}
          <div>
            <label className="block text-xs font-medium text-dark-300 mb-1">Height</label>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center bg-dark-900 border border-dark-750 rounded-lg px-2.5 py-1.5 focus-within:border-cyan-400">
                <input
                  type="number"
                  min="3"
                  max="7"
                  value={heightFeet}
                  onChange={(e) => setHeightFeet(parseInt(e.target.value) || 5)}
                  className="w-full bg-transparent text-xs font-mono text-dark-50 focus:outline-none"
                />
                <span className="text-[11px] font-mono text-dark-400 ml-1">ft</span>
              </div>
              <div className="flex items-center bg-dark-900 border border-dark-750 rounded-lg px-2.5 py-1.5 focus-within:border-cyan-400">
                <input
                  type="number"
                  min="0"
                  max="11"
                  value={heightInches}
                  onChange={(e) => setHeightInches(parseInt(e.target.value) || 0)}
                  className="w-full bg-transparent text-xs font-mono text-dark-50 focus:outline-none"
                />
                <span className="text-[11px] font-mono text-dark-400 ml-1">in</span>
              </div>
            </div>
          </div>

          {/* Starting & Target Weight in lbs */}
          <div>
            <label className="block text-xs font-medium text-dark-300 mb-1">Target Weight</label>
            <div className="flex items-center bg-dark-900 border border-dark-750 rounded-lg px-2.5 py-1.5 focus-within:border-cyan-400">
              <input
                type="number"
                step="0.1"
                value={targetWeightLbs}
                onChange={(e) => setTargetWeightLbs(parseFloat(e.target.value) || 155)}
                className="w-full bg-transparent text-xs font-mono text-dark-50 focus:outline-none"
              />
              <span className="text-[11px] font-mono text-dark-400 ml-1">lbs</span>
            </div>
          </div>
        </div>

        {/* Calisthenics Tier Selector */}
        <div>
          <label className="block text-xs font-medium text-dark-300 mb-1.5">
            Calisthenics Intensity Tier
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {(['beginner', 'intermediate', 'advanced', 'expert'] as CalisthenicsIntensity[]).map((tier) => (
              <button
                type="button"
                key={tier}
                onClick={() => setTier(tier)}
                className={`p-2 rounded-lg border text-xs font-semibold capitalize transition ${
                  currentTier === tier
                    ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-300'
                    : 'border-dark-750 text-dark-400 hover:text-dark-200'
                }`}
              >
                {tier}
              </button>
            ))}
          </div>
        </div>

        {/* Macro Goals */}
        <div className="pt-2 border-t border-dark-800 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-xs uppercase font-mono tracking-wider text-dark-400">
              Macro Targets (Grams)
            </h4>
            <button
              type="button"
              onClick={handleAutoCalculateMacros}
              className="flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 transition"
            >
              <Sparkles size={13} />
              <span>Auto-Calculate (0.95g/lb)</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div>
              <label className="block text-[11px] font-mono text-amber-400 mb-1">Calories (kcal)</label>
              <input
                type="number"
                value={calories}
                onChange={(e) => setCalories(parseInt(e.target.value) || 2000)}
                className="w-full bg-dark-900 border border-dark-750 rounded-lg px-2.5 py-1.5 text-xs font-mono font-bold text-dark-50 focus:outline-none focus:border-amber-400"
              />
            </div>
            <div>
              <label className="block text-[11px] font-mono text-cyan-400 mb-1">Protein (g)</label>
              <input
                type="number"
                value={protein}
                onChange={(e) => setProtein(parseInt(e.target.value) || 165)}
                className="w-full bg-dark-900 border border-dark-750 rounded-lg px-2.5 py-1.5 text-xs font-mono font-bold text-dark-50 focus:outline-none focus:border-cyan-400"
              />
            </div>
            <div>
              <label className="block text-[11px] font-mono text-emerald-400 mb-1">Carbs (g)</label>
              <input
                type="number"
                value={carbs}
                onChange={(e) => setCarbs(parseInt(e.target.value) || 215)}
                className="w-full bg-dark-900 border border-dark-750 rounded-lg px-2.5 py-1.5 text-xs font-mono font-bold text-dark-50 focus:outline-none focus:border-emerald-400"
              />
            </div>
            <div>
              <label className="block text-[11px] font-mono text-purple-400 mb-1">Fat (g)</label>
              <input
                type="number"
                value={fat}
                onChange={(e) => setFat(parseInt(e.target.value) || 65)}
                className="w-full bg-dark-900 border border-dark-750 rounded-lg px-2.5 py-1.5 text-xs font-mono font-bold text-dark-50 focus:outline-none focus:border-purple-400"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-dark-950 font-bold text-xs transition shadow-md shadow-amber-500/20"
        >
          Save Profile & Macro Targets
        </button>
      </form>

      {/* Backup & Sign Out */}
      <div className="bg-dark-850 border border-dark-750 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <button
          onClick={handleExportData}
          className="flex items-center gap-1.5 text-xs text-dark-300 hover:text-dark-100 transition"
        >
          <Download size={15} className="text-cyan-400" />
          <span>Export All Data (JSON Backup)</span>
        </button>

        {isAuthenticated && (
          <button
            onClick={() => signOut()}
            className="flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 transition"
          >
            <LogOut size={15} />
            <span>Sign Out ({user.email})</span>
          </button>
        )}
      </div>
    </div>
  );
};
