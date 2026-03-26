// ============================================
// BETTER LEVELING — SETTINGS v3
// All settings save/load correctly, units propagate, friends safe
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
    const old = !saved && JSON.parse(localStorage.getItem('sys_settings') || 'null');
    const s = { ...DEFAULT_SETTINGS, ...(saved || old || {}) };
    if (!Array.isArray(s.friends)) s.friends = [];
    return s;
  } catch {
    return { ...DEFAULT_SETTINGS, friends: [] };
  }
}

function saveSettings(partial) {
  const s = { ...getSettings(), ...partial };

  if (partial.units === 'metric') { s.weightUnit = 'kg'; s.distanceUnit = 'km'; }
  if (partial.units === 'imperial') { s.weightUnit = 'lbs'; s.distanceUnit = 'mi'; }

  localStorage.setItem('bl_settings', JSON.stringify(s));
  applySettings(s);

  // Update guild with new name if changed
  if (partial.hunterName) updateGuildScore();

  return s;
}

function applySetting(key, value) {
  saveSettings({ [key]: value });
  renderSettingsPage();

  if (key === 'dailyQuestGoal') renderQuestsPage();

  if (key === 'hunterName') {
    const el = document.getElementById('top-name');
    if (el) el.textContent = String(value).toUpperCase();
    if (HUNTER) HUNTER.name = String(value);
    persist();
  }
}

// ── APPLY TO DOM ──────────────────────────────────────
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

  if (s.hunterName) {
    const el = document.getElementById('top-name');
    if (el) el.textContent = s.hunterName.toUpperCase();
    if (HUNTER) HUNTER.name = s.hunterName;
  }
}

// ── UNIT HELPERS ──────────────────────────────────────
function weightLabel() { return getSettings().units === 'imperial' ? 'lbs' : 'kg'; }
function distLabel() { return getSettings().units === 'imperial' ? 'mi' : 'km'; }
function heightLabel() { return getSettings().units === 'imperial' ? 'ft/in' : 'cm'; }

function toDisplayWeight(kg) {
  if (kg == null) return '—';
  return getSettings().units === 'imperial'
    ? `${(kg * 2.20462).toFixed(1)} lbs`
    : `${kg} kg`;
}
function toDisplayDistance(km) {
  if (km == null) return '—';
  return getSettings().units === 'imperial'
    ? `${(km * 0.621371).toFixed(2)} mi`
    : `${km} km`;
}
function weightInputLabel() { return getSettings().units === 'imperial' ? 'Weight (lbs)' : 'Weight (kg)'; }
function distanceInputLabel() { return getSettings().units === 'imperial' ? 'Distance (mi)' : 'Distance (km)'; }
function heightInputLabel() { return getSettings().units === 'imperial' ? 'Height (ft — e.g. 5.9)' : 'Height (cm)'; }

function inputToKg(val) {
  const n = parseFloat(val);
  return getSettings().units === 'imperial' ? parseFloat((n / 2.20462).toFixed(2)) : n;
}

// ── SETTINGS PAGE RENDER ───────────────────────────
function renderSettingsPage() {
  const el = document.getElementById('page-settings');
  if (!el) return;
  const s = getSettings();

  const accentOpts = [
    { id: 'blue', label: 'Blue', color: '#00b4ff' },
    { id: 'green', label: 'Green', color: '#00e5a0' },
    { id: 'gold', label: 'Gold', color: '#f0c040' },
    { id: 'purple', label: 'Purple', color: '#a855f7' },
    { id: 'red', label: 'Red', color: '#ff4455' },
  ];

  const friends = s.friends || [];

  el.innerHTML = `
    <h2 style="margin-bottom:20px;color:var(--accent)">SETTINGS</h2>

    <!-- HUNTER IDENTITY -->
    <div class="section-head">HUNTER IDENTITY</div>
    <div class="sys-card">
      <label>Hunter Name</label>
      <input id="set-name" value="${s.hunterName}" />
      <button onclick="applySetting('hunterName', document.getElementById('set-name').value.trim()||'HUNTER')">SAVE</button>
    </div>

    <!-- FRIENDS -->
    <div class="section-head">ACCOUNTABILITY PARTNERS</div>
    <div class="sys-card">
      <div style="font-size:9px;color:var(--text3);margin-bottom:10px">
        Share your hunter name <span style="color:var(--accent)">${s.hunterName}</span> to add friends.
      </div>
      ${friends.length === 0
        ? `<div style="font-size:10px;color:var(--text3);text-align:center;padding:8px 0">No partners added yet</div>`
        : friends.map((f, i) => `
          <div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid var(--border)">
            <div style="width:30px;height:30px;border-radius:6px;background:linear-gradient(135deg,var(--accent2),var(--accent));display:flex;align-items:center;justify-content:center;font-size:11px;color:#fff">${f.slice(0, 2).toUpperCase()}</div>
            <div style="flex:1;font-size:13px;font-weight:600;color:var(--text)">${f.toUpperCase()}</div>
            <button onclick="removeFriend(${i})" style="background:none;border:none;color:var(--text3);font-size:16px;cursor:pointer">×</button>
          </div>`).join('')
      }
      <div style="display:flex;gap:8px;margin-top:10px">
        <input type="text" class="sys-input" id="friend-input-set" placeholder="Enter hunter name..." style="flex:1"/>
        <button class="btn-secondary" onclick="addFriendFromSettings()">ADD</button>
      </div>
    </div>

    <!-- UNITS -->
    <div class="section-head">MEASUREMENT UNITS</div>
    <div class="sys-card">
      <button onclick="applySetting('units','metric')">Metric</button>
      <button onclick="applySetting('units','imperial')">Imperial</button>
      <div>Current: ${s.units} (${s.units === 'metric' ? 'kg / km' : 'lbs / mi'})</div>
    </div>

    <!-- DAILY QUEST GOAL -->
    <div class="section-head">DAILY QUEST GOAL</div>
    <div class="sys-card">
      <input type="number" id="set-quest" value="${s.dailyQuestGoal}" min="1" max="10" />
      <button onclick="applySetting('dailyQuestGoal', parseInt(document.getElementById('set-quest').value))">SAVE</button>
    </div>

    <!-- CALORIES & WATER -->
    <div class="section-head">NUTRITION & HYDRATION</div>
    <div class="sys-card">
      <label>Daily Calorie Goal</label>
      <input type="number" id="set-cal" value="${s.calorieGoal}" />
      <button onclick="applySetting('calorieGoal', parseInt(document.getElementById('set-cal').value)||2000)">SAVE</button>
      <label>Daily Water Goal (ml)</label>
      <input type="number" id="set-water" value="${s.waterGoal}" />
      <button onclick="applySetting('waterGoal', parseInt(document.getElementById('set-water').value)||2000)">SAVE</button>
    </div>
  `;
}

// ── FRIENDS ───────────────────────────────────────────
function addFriendFromSettings() {
  const input = document.getElementById('friend-input-set');
  const name = input?.value.trim();
  if (!name) return;
  const s = getSettings();
  if (!Array.isArray(s.friends)) s.friends = [];
  if (s.friends.map(f => f.toLowerCase()).includes(name.toLowerCase())) {
    showNotif('[ ERROR ] Already added'); return;
  }
  s.friends.push(name);
  saveSettings({ friends: s.friends });
  if (input) input.value = '';
  showNotif(`[ FRIENDS ] ${name.toUpperCase()} added`);
  renderSettingsPage();
}

function removeFriend(i) {
  const s = getSettings();
  if (!Array.isArray(s.friends)) s.friends = [];
  s.friends.splice(i, 1);
  saveSettings({ friends: s.friends });
  renderSettingsPage();
}

// ── INIT SETTINGS ───────────────────────────────────
function initSettings() {
  applySettings(getSettings());
  renderSettingsPage();
}

initSettings();
