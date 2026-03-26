// ============================================
// BETTER LEVELING — SETTINGS v3
// Full working settings page with unit support
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
    return { ...DEFAULT_SETTINGS, ...(saved || old || {}) };
  } catch { return { ...DEFAULT_SETTINGS }; }
}

function saveSettings(partial) {
  const s = { ...getSettings(), ...partial };
  if (s.units === 'metric') { s.weightUnit = 'kg'; s.distanceUnit = 'km'; }
  if (s.units === 'imperial') { s.weightUnit = 'lbs'; s.distanceUnit = 'mi'; }
  localStorage.setItem('bl_settings', JSON.stringify(s));
  applySettings(s);
  if (partial.hunterName) updateGuildScore?.();
  return s;
}

// ── APPLY SETTINGS TO DOM ──────────────────────────────
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

  // Update hunter name in top bar
  if (s.hunterName) {
    const el = document.getElementById('top-name');
    if (el) el.textContent = String(s.hunterName).toUpperCase();
    if (window.HUNTER) HUNTER.name = String(s.hunterName);
  }

  // Update hydration, nutrition, stats pages
  renderHydrationTracker?.();
  renderNutritionPage?.();
  renderStatsPage?.();
}

// ── APPLY A SINGLE SETTING ─────────────────────────────
function applySetting(key, value) {
  const partial = { [key]: value };
  saveSettings(partial);
  renderSettingsPage();

  // Some settings require extra UI updates
  if (key === 'dailyQuestGoal') renderQuestsPage?.();
}

// ── INITIALIZE SETTINGS ───────────────────────────────
function initSettings() {
  applySettings(getSettings());
  renderSettingsPage();
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

// ── SETTINGS PAGE ─────────────────────────────────────
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

    <!-- HUNTER IDENTITY -->
    <div class="section-head">HUNTER IDENTITY</div>
    <div class="sys-card" style="margin-bottom:10px">
      <label class="setting-label">HUNTER NAME</label>
      <div style="display:flex;gap:8px;margin-bottom:12px">
        <input type="text" class="sys-input" id="set-name"
          value="${s.hunterName}" maxlength="20"
          placeholder="Your hunter name..."
          style="flex:1"/>
        <button class="btn-secondary" onclick="applySetting('hunterName', document.getElementById('set-name').value.trim()||'HUNTER')">SAVE</button>
      </div>
      <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3)">
        This name appears in the top bar and on the leaderboard.
      </div>
    </div>

    <!-- FRIENDS -->
    <div class="section-head">ACCOUNTABILITY PARTNERS</div>
    <div class="sys-card" style="margin-bottom:10px">
      <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);margin-bottom:10px;line-height:1.7">
        Add a friend's hunter name to follow them on the leaderboard.
        Share your name <span style="color:var(--accent);font-weight:600">${s.hunterName}</span> so they can add you.
      </div>
      ${friends.length === 0
      ? `<div style="font-family:var(--font-mono);font-size:10px;color:var(--text3);text-align:center;padding:8px 0 10px">No partners added yet</div>`
      : friends.map((f, i) => `
          <div style="display:flex;align-items:center;gap:10px;padding:9px 0;border-bottom:1px solid var(--border)">
            <div style="width:30px;height:30px;border-radius:6px;background:linear-gradient(135deg,var(--accent2),var(--accent));display:flex;align-items:center;justify-content:center;font-family:var(--font-hud);font-size:11px;color:#fff">${f.slice(0, 2).toUpperCase()}</div>
            <div style="flex:1;font-size:13px;font-weight:600;color:var(--text)">${f.toUpperCase()}</div>
            <button onclick="removeFriend(${i})" style="background:transparent;border:none;color:var(--text3);font-size:16px;cursor:pointer">×</button>
          </div>
        `).join('')
    }
      <div style="display:flex;gap:8px;margin-top:10px">
        <input type="text" class="sys-input" id="friend-input-set"
          placeholder="Enter hunter name..." style="flex:1"/>
        <button class="btn-secondary" onclick="addFriendFromSettings()">ADD</button>
      </div>
    </div>

    <!-- UNITS -->
    <div class="section-head">MEASUREMENT UNITS</div>
    <div class="sys-card" style="margin-bottom:10px">
      <div style="display:flex;gap:8px;margin-bottom:8px">
        <button onclick="applySetting('units','metric')" style="
          flex:1;padding:12px;border-radius:8px;cursor:pointer;
          background:${s.units === 'metric' ? 'rgba(0,180,255,0.18)' : 'var(--bg3)'};
          border:1px solid ${s.units === 'metric' ? 'var(--accent)' : 'var(--border)'};
          color:${s.units === 'metric' ? 'var(--accent)' : 'var(--text3)'};
          font-family:var(--font-hud);font-size:12px;letter-spacing:1px;
        "><div style="font-size:18px;margin-bottom:4px">🌍</div>METRIC<div style="font-family:var(--font-mono);font-size:9px;margin-top:2px">kg · km · cm</div></button>
        <button onclick="applySetting('units','imperial')" style="
          flex:1;padding:12px;border-radius:8px;cursor:pointer;
          background:${s.units === 'imperial' ? 'rgba(0,180,255,0.18)' : 'var(--bg3)'};
          border:1px solid ${s.units === 'imperial' ? 'var(--accent)' : 'var(--border)'};
          color:${s.units === 'imperial' ? 'var(--accent)' : 'var(--text3)'};
          font-family:var(--font-hud);font-size:12px;letter-spacing:1px;
        "><div style="font-size:18px;margin-bottom:4px">🇺🇸</div>IMPERIAL<div style="font-family:var(--font-mono);font-size:9px;margin-top:2px">lbs · mi · ft</div></button>
      </div>
      <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3)">
        Active: <strong style="color:var(--accent)">${weightLabel()}</strong> · <strong style="color:var(--accent)">${distLabel()}</strong> · <strong style="color:var(--accent)">${heightLabel()}</strong>
      </div>
    </div>

    <!-- OTHER SETTINGS -->
    <!-- You can append the rest of your sections (quests, hydration, display, accent, data management, etc.) here -->
  `;
}

// ── FRIENDS ───────────────────────────────────────────
function addFriendFromSettings() {
  const input = document.getElementById('friend-input-set');
  const name = input?.value.trim();
  if (!name) return;
  const s = getSettings();
  const friends = s.friends || [];
  if (friends.map(f => f.toLowerCase()).includes(name.toLowerCase())) {
    showNotif('[ ERROR ] Already added'); return;
  }
  friends.push(name);
  saveSettings({ friends });
  if (input) input.value = '';
  showNotif(`[ FRIENDS ] ${name.toUpperCase()} added`);
  renderSettingsPage();
}

function removeFriend(i) {
  const s = getSettings();
  const friends = s.friends || [];
  friends.splice(i, 1);
  saveSettings({ friends });
  renderSettingsPage();
}
