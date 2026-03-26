// ============================================
// BETTER LEVELING — SETTINGS v3
// Full working settings page with units, hydration, daily quest, and guild/friends
// ============================================

// ── DEFAULT SETTINGS ─────────────────────────────
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

// ── STORAGE ──────────────────────────────────────
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
  if (partial.units === 'metric') { s.weightUnit = 'kg'; s.distanceUnit = 'km'; }
  if (partial.units === 'imperial') { s.weightUnit = 'lbs'; s.distanceUnit = 'mi'; }
  localStorage.setItem('bl_settings', JSON.stringify(s));
  applySettings(s);
  if (partial.hunterName) updateGuildScore?.();
  return s;
}

function applySetting(key, value) {
  saveSettings({ [key]: value });
  renderSettingsPage();
  if (key === 'dailyQuestGoal') renderQuestsPage();
  if (key === 'units') {
    renderHydrationTracker(document.getElementById('page-hydration'));
    renderNutritionPage?.();
    renderStatsPage?.();
  }
  if (key === 'hunterName') {
    const el = document.getElementById('top-name');
    if (el) el.textContent = String(value).toUpperCase();
    persist?.();
  }
}

// ── APPLY TO DOM ──────────────────────────────────
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

// ── UNIT HELPERS ──────────────────────────────────
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
function inputToKg(val) {
  const n = parseFloat(val);
  return getSettings().units === 'imperial' ? parseFloat((n / 2.20462).toFixed(2)) : n;
}

// ── SETTINGS PAGE ──────────────────────────────────
function toggle(key, label, desc, value) {
  return `
    <div style="display:flex;align-items:center;gap:12px;padding:11px 0;border-bottom:1px solid var(--border)">
      <div style="flex:1">
        <div style="font-size:13px;font-weight:600;color:var(--text)">${label}</div>
        <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);margin-top:2px">${desc}</div>
      </div>
      <div onclick="applySetting('${key}',${!value})" style="
        width:46px;height:26px;border-radius:13px;cursor:pointer;flex-shrink:0;
        background:${value ? 'var(--accent)' : 'var(--border2)'};
        position:relative;transition:background 0.2s;
      ">
        <div style="
          position:absolute;top:3px;
          left:${value ? '23px' : '3px'};
          width:20px;height:20px;border-radius:50%;
          background:#fff;transition:left 0.2s;
          box-shadow:0 1px 3px rgba(0,0,0,0.3);
        "></div>
      </div>
    </div>
  `;
}

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

  el.innerHTML = `
    <h2 style="color:var(--accent)">Settings</h2>

    <div class="section-head">HUNTER NAME</div>
    <input type="text" id="set-name" value="${s.hunterName}" />
    <button onclick="applySetting('hunterName',document.getElementById('set-name').value.trim()||'HUNTER')">SAVE</button>

    <div class="section-head">UNITS</div>
    <button onclick="applySetting('units','metric')">METRIC</button>
    <button onclick="applySetting('units','imperial')">IMPERIAL</button>
    <p>Current: ${weightLabel()} · ${distLabel()} · ${heightLabel()}</p>

    <div class="section-head">DAILY QUEST GOAL</div>
    ${[1,2,3,4,5].map(n => `<button onclick="applySetting('dailyQuestGoal',${n})" style="margin:2px">${n}</button>`).join('')}
    <p>Quests for streak: ${s.dailyQuestGoal}</p>

    <div class="section-head">HYDRATION</div>
    <input type="number" id="set-water" value="${s.waterGoal}" />
    <button onclick="applySetting('waterGoal',parseInt(document.getElementById('set-water').value)||2000)">SAVE</button>

    <div class="section-head">FRIENDS</div>
    <div id="friend-list">${(s.friends || []).map((f,i)=>`
      <div>${f} <button onclick="removeFriend(${i})">×</button></div>
    `).join('')}</div>
    <input type="text" id="friend-input-set" placeholder="Add friend"/>
    <button onclick="addFriendFromSettings()">ADD</button>
  `;
}

// ── FRIENDS ──────────────────────────────────────
function addFriendFromSettings() {
  const input = document.getElementById('friend-input-set');
  const name = input.value.trim();
  if (!name) return;
  const s = getSettings();
  if ((s.friends || []).some(f=>f.toLowerCase()===name.toLowerCase())) return alert('Already added');
  s.friends = [...(s.friends||[]), name];
  saveSettings({ friends: s.friends });
  input.value = '';
  renderSettingsPage();
}

function removeFriend(i) {
  const s = getSettings();
  s.friends.splice(i,1);
  saveSettings({ friends: s.friends });
  renderSettingsPage();
}

// ── STUB PAGES ───────────────────────────────────
function renderQuestsPage() {
  const el = document.getElementById('page-daily-quests');
  if (!el) return;
  const goal = getSettings().dailyQuestGoal;
  el.innerHTML = `<h2 style="color:var(--accent)">Daily Quests</h2><p>Daily goal: ${goal} quest${goal!==1?'s':''}</p>`;
}

function renderGuildPage() {
  const el = document.getElementById('page-guild');
  if (!el) return;
  const friends = getSettings().friends || [];
  el.innerHTML = `<h2 style="color:var(--accent)">Friends / Guild</h2>
    ${friends.length ? friends.map(f=>`<div>${f}</div>`).join('') : '<p>No friends added yet</p>'}`;
}

// ── INIT ─────────────────────────────────────────
document.addEventListener('DOMContentLoaded', ()=>{
  applySettings(getSettings());
  renderSettingsPage();
  renderQuestsPage();
  renderGuildPage();
});
