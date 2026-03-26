// ============================================
// SETTINGS.JS — Full Working Version
// ============================================

// DEFAULT SETTINGS
const DEFAULT_SETTINGS = {
  units: 'metric',           // metric or imperial
  dailyQuestGoal: 3,
  waterGoal: 2000,           // ml
  calorieGoal: 2000,
  accentColor: 'blue',       // blue, green, gold, purple, red
  hunterName: 'HUNTER',
  compactMode: false,
  showQuote: true,
  vibration: true,
  streakReminder: true,
};

// ── STORAGE ────────────────────────────────────────
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
  applySettings(s);
  return s;
}

// ── APPLY SETTINGS TO DOM ─────────────────────────
function applySettings(s) {
  s = s || getSettings();

  // Accent Colors
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

  // Compact mode styling
  document.documentElement.style.setProperty('--card-padding', s.compactMode ? '10px' : '14px');

  // Hunter name update
  const nameEl = document.getElementById('top-name');
  if (nameEl) nameEl.textContent = s.hunterName.toUpperCase();

  // Units update for hydration, etc.
  safeRenderHydration();
}

// ── SAFE RENDER HELPERS ─────────────────────────────
function safeRenderHydration() {
  try {
    if (typeof renderHydrationTracker === 'function')
      renderHydrationTracker(document.getElementById('page-improve'));
  } catch (e) { console.warn(e); }
}

function safeRenderQuests() {
  try {
    if (typeof renderQuestsPage === 'function')
      renderQuestsPage();
  } catch (e) { console.warn(e); }
}

// ── APPLY SINGLE SETTING ───────────────────────────
function applySetting(key, value) {
  saveSettings({ [key]: value });
  renderSettingsPage();

  if (key === 'dailyQuestGoal') safeRenderQuests();
  if (key === 'units') safeRenderHydration();
}

// ── SETTINGS PAGE RENDER ───────────────────────────
function renderSettingsPage() {
  const el = document.getElementById('page-settings');
  if (!el) return;

  const s = getSettings();

  el.innerHTML = `
    <h2 style="margin-bottom:20px;color:var(--accent)">SETTINGS</h2>

    <div class="settings-section">
      <label>Hunter Name</label>
      <input id="set-name" value="${s.hunterName}" />
      <button onclick="applySetting('hunterName', document.getElementById('set-name').value)">SAVE</button>
    </div>

    <div class="settings-section">
      <label>Units</label>
      <button onclick="applySetting('units','metric')">Metric</button>
      <button onclick="applySetting('units','imperial')">Imperial</button>
      <div style="margin-top:5px;font-size:12px;color:var(--text3)">
        Current: ${s.units} (${s.units === 'metric' ? 'kg / km' : 'lbs / mi'})
      </div>
    </div>

    <div class="settings-section">
      <label>Daily Quest Goal</label>
      <input type="number" id="set-quest" value="${s.dailyQuestGoal}" min="1" max="10" />
      <button onclick="applySetting('dailyQuestGoal', parseInt(document.getElementById('set-quest').value))">SAVE</button>
    </div>

    <div class="settings-section">
      <label>Water Goal (ml)</label>
      <input type="number" id="set-water" value="${s.waterGoal}" />
      <button onclick="applySetting('waterGoal', parseInt(document.getElementById('set-water').value))">SAVE</button>
    </div>

    <div class="settings-section">
      <label>Calorie Goal</label>
      <input type="number" id="set-cal" value="${s.calorieGoal}" />
      <button onclick="applySetting('calorieGoal', parseInt(document.getElementById('set-cal').value))">SAVE</button>
    </div>
  `;
}

// ── INIT SETTINGS ───────────────────────────────────
function initSettings() {
  applySettings(getSettings());
  renderSettingsPage();
}

// Initialize on load
initSettings();
