import React, { useState } from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { useSyncStore } from '../../store/useSyncStore';
import { X, Lock, Mail, User, AlertCircle, Loader2, Sparkles, Check } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSettings: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onOpenSettings,
}) => {
  const { login, signUp, isLoading, error, clearError, isSupabaseConfigured } = useAuthStore();
  const { syncNow } = useSyncStore();

  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setFeedback(null);

    if (mode === 'login') {
      const res = await login(email, password);
      if (res.success) {
        setFeedback('Logged in successfully!');
        await syncNow();
        setTimeout(() => onClose(), 800);
      }
    } else {
      const res = await signUp(email, password, displayName);
      if (res.success) {
        setFeedback('Account created! Logging in...');
        await syncNow();
        setTimeout(() => onClose(), 800);
      }
    }
  };

  const handleContinueOffline = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/85 backdrop-blur-sm animate-fadeIn">
      <div className="bg-dark-900 border border-dark-750 w-full max-w-md rounded-2xl p-5 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-dark-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-black text-sm">
              BL
            </div>
            <div>
              <h3 className="font-bold text-dark-50 text-base">
                {mode === 'login' ? 'Sign In to Better Leveling' : 'Create Athlete Account'}
              </h3>
              <p className="text-[11px] text-dark-400">
                Sync your nutrition & calisthenics across all devices
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-dark-400 hover:text-dark-50 hover:bg-dark-800 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Supabase status notice */}
        {!isSupabaseConfigured && (
          <div className="mt-3 p-2.5 rounded-xl bg-dark-850 border border-dark-750 text-xs text-dark-300 flex items-start gap-2">
            <Sparkles size={14} className="text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <span>Using local offline storage. To sync across multiple devices, connect your free </span>
              <button
                onClick={() => {
                  onClose();
                  onOpenSettings();
                }}
                className="text-amber-400 underline font-semibold hover:text-amber-300"
              >
                Supabase credentials
              </button>
              <span> in Settings.</span>
            </div>
          </div>
        )}

        {/* Tab Switcher */}
        <div className="grid grid-cols-2 gap-1 mt-4 p-1 rounded-xl bg-dark-850 border border-dark-750">
          <button
            type="button"
            onClick={() => {
              setMode('login');
              clearError();
            }}
            className={`py-1.5 text-xs font-semibold rounded-lg transition ${
              mode === 'login'
                ? 'bg-amber-500 text-dark-950 shadow-sm'
                : 'text-dark-400 hover:text-dark-200'
            }`}
          >
            Log In
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('signup');
              clearError();
            }}
            className={`py-1.5 text-xs font-semibold rounded-lg transition ${
              mode === 'signup'
                ? 'bg-amber-500 text-dark-950 shadow-sm'
                : 'text-dark-400 hover:text-dark-200'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-medium text-dark-300 mb-1">Display Name</label>
              <div className="relative">
                <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-500" />
                <input
                  type="text"
                  placeholder="e.g. Nick"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full bg-dark-850 border border-dark-750 rounded-lg pl-9 pr-3 py-2 text-xs text-dark-50 placeholder:text-dark-600 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-dark-300 mb-1">Email Address</label>
            <div className="relative">
              <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-500" />
              <input
                type="email"
                required
                placeholder="athlete@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-dark-850 border border-dark-750 rounded-lg pl-9 pr-3 py-2 text-xs text-dark-50 placeholder:text-dark-600 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-dark-300 mb-1">Password</label>
            <div className="relative">
              <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-500" />
              <input
                type="password"
                required
                minLength={6}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-dark-850 border border-dark-750 rounded-lg pl-9 pr-3 py-2 text-xs text-dark-50 placeholder:text-dark-600 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {error && (
            <div className="p-2.5 rounded-lg bg-rose-950/30 border border-rose-900/40 text-xs text-rose-300 flex items-start gap-2">
              <AlertCircle size={15} className="flex-shrink-0 mt-0.5 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          {feedback && (
            <div className="p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-900/40 text-xs text-emerald-300 flex items-center gap-2">
              <Check size={15} className="text-emerald-400" />
              <span>{feedback}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-dark-950 font-bold text-xs flex items-center justify-center gap-2 transition shadow-md shadow-amber-500/20 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Processing...</span>
              </>
            ) : mode === 'login' ? (
              <span>Sign In</span>
            ) : (
              <span>Create Account</span>
            )}
          </button>
        </form>

        <div className="mt-4 pt-3 border-t border-dark-800 text-center">
          <button
            onClick={handleContinueOffline}
            className="text-xs text-dark-400 hover:text-dark-200 transition"
          >
            Continue in local offline mode
          </button>
        </div>
      </div>
    </div>
  );
};
