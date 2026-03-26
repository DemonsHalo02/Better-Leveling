// ============================================
// SETTINGS.JS — Fixed for Working Settings Page
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

// ── STORAGE ───────────────────────────────────────────
function getSettings() {
  try {
    const saved = JSON.parse(localStorage.getItem('bl_settings') || 'null');
    return { ...DEFAULT_SETTINGS, ...(saved || {}) };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

function saveSettings(partial) {
  const s = { ...getSettings(), ...partial };
  if (s.units === 'metric') { s.weightUnit = 'kg'; s.distanceUnit = 'km'; }
  if (s.units === 'imperial') { s.weightUnit = 'lbs'; s.distanceUnit = 'mi'; }
  localStorage.setItem('bl_settings', JSON.stringify(s));
  applySettings(s); // safe now
  return s;
}

function applySetting(key, value) {
  const s = saveSettings({ [key]: value });
  renderSettingsPage();
  if (key === 'dailyQuestGoal') safeRenderQuests();
  if (key === 'units') safeRenderHydration(); // update hydration display
  if (key === 'hunterName') {
    const el = document.getElementById('top-name');
    if (el) el.textContent = String(value).toUpperCase();
  }
}

// ── APPLY SETTINGS TO DOM ─────────────────────────────
function applySettings(s) {
  s = s || getSettings();
  const colors = {
    blue: ['#00b4ff', '#005fff'],
    green: ['#00e5a0', '#00a870'],
    gold: ['#f0c040', '#c09000'],
    purple: ['#a855f7', '#7c3aed'],
    red: ['#ff4455', '#cc2233'],
  };
  const [a, a2] = colors[s.accentColor] || colors.blue;
  document.documentElement.style.setProperty('--accent', a);
  document.documentElement.style.setProperty('--accent2', a2);
  document.documentElement.style.setProperty('--card-padding', s.compactMode ? '10px' : '14px');
}

// ── SAFE RENDER HELPERS ─────────────────────────────
function safeRenderHydration() {
  try { if (typeof renderHydrationTracker === 'function') renderHydrationTracker(document.getElementById('page-improve')); } catch(e){console.warn(e);}
}

function safeRenderQuests() {
  try { if (typeof renderQuestsPage === 'function') renderQuestsPage(); } catch(e){console.warn(e);}
}

// ── UNIT HELPERS ──────────────────────────────────────
function weightLabel() { return getSettings().units === 'imperial' ? 'lbs' : 'kg'; }
function distLabel() { return getSettings().units === 'imperial' ? 'mi' : 'km'; }
function heightLabel() { return getSettings().units === 'imperial' ? 'ft/in' : 'cm'; }

// ── SETTINGS PAGE ─────────────────────────────────────
function renderSettingsPage() {
  const el = document.getElementById('page-settings');
  if (!el) return;
  const s = getSettings();
  el.innerHTML = `
    <h2>SETTINGS</h2>
    <div>
      <label>Hunter Name</label>
      <input id="set-name" value="${s.hunterName}" />
      <button onclick="applySetting('hunterName', document.getElementById('set-name').value)">SAVE</button>
    </div>
    <div>
      <label>Units</label>
      <button onclick="applySetting('units','metric')">Metric</button>
      <button onclick="applySetting('units','imperial')">Imperial</button>
    </div>
    <div>
      <label>Daily Quest Goal</label>
      <input type="number" id="set-quest" value="${s.dailyQuestGoal}" min="1" max="10" />
      <button onclick="applySetting('dailyQuestGoal', parseInt(document.getElementById('set-quest').value))">SAVE</button>
    </div>
    <div>
      <label>Water Goal (ml)</label>
      <input type="number" id="set-water" value="${s.waterGoal}" />
      <button onclick="applySetting('waterGoal', parseInt(document.getElementById('set-water').value))">SAVE</button>
    </div>
  `;
}

// ── INIT SETTINGS ─────────────────────────────────────
function initSettings() {
  applySettings(getSettings());
  renderSettingsPage();
}

initSettings();
