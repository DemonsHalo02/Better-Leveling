// ============================================
// SETTINGS — FULL SAFE RESTORE
// ============================================

const DEFAULT_SETTINGS = {
  units: 'metric',
  dailyQuestGoal: 3,
  accentColor: 'blue',
  hunterName: 'HUNTER',
  showQuote: true,
  compactMode: false,
  vibration: true,
  streakReminder: true,
  calorieGoal: 2000,
  waterGoal: 2000,
  friends: [],
};

function getSettings() {
  try {
    const saved = JSON.parse(localStorage.getItem('bl_settings') || 'null');
    const s = saved ? { ...DEFAULT_SETTINGS, ...saved } : { ...DEFAULT_SETTINGS };
    if (!Array.isArray(s.friends)) s.friends = [];
    if (!s.accentColor) s.accentColor = 'blue';
    return s;
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

function saveSettings(partial) {
  const s = { ...getSettings(), ...partial };
  localStorage.setItem('bl_settings', JSON.stringify(s));
  applySettings(s);
  return s;
}

function applySettings(s) {
  if (!s) s = getSettings();
  if (!s.accentColor) s.accentColor = 'blue';

  const colors = {
    blue: ['#00b4ff', '#005fff'],
    green: ['#00e5a0', '#00a870'],
    gold: ['#f0c040', '#c09000'],
    purple: ['#a855f7', '#7c3aed'],
    red: ['#ff4455', '#cc2233'],
  };

  const [a, a2] = colors[s.accentColor] || colors.blue;

  if (document.documentElement) {
    document.documentElement.style.setProperty('--accent', a);
    document.documentElement.style.setProperty('--accent2', a2);
    document.documentElement.style.setProperty('--card-padding', s.compactMode ? '10px' : '14px');
  }

  const nameEl = document.getElementById('top-name');
  if (nameEl) nameEl.textContent = s.hunterName.toUpperCase();
}

// SAFE INIT
document.addEventListener('DOMContentLoaded', () => {
  const s = getSettings();
  applySettings(s);
  if (typeof renderSettingsPage === 'function') renderSettingsPage();
});
