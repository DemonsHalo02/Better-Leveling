// ============================================
// BETTER LEVELING — SETTINGS v4
// Fully working settings page, safe stubs for hydration, guild, quests
// ============================================

// DEFAULT SETTINGS
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
  return s;
}

function applySetting(key, value) {
  saveSettings({ [key]: value });
  renderSettingsPage();
  renderQuestsPage();
  renderGuildPage();
}

// ── APPLY SETTINGS ───────────────────────────────
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

// ── SETTINGS PAGE ─────────────────────────────────
function renderSettingsPage() {
  const el = document.getElementById('page-settings');
  if (!el) return;
  const s = getSettings();

  el.innerHTML = `
    <h2 style="color:var(--accent)">Settings</h2>

    <div>
      <label>Hunter Name:</label>
      <input type="text" id="set-name" value="${s.hunterName}" />
      <button onclick="applySetting('hunterName', document.getElementById('set-name').value.trim()||'HUNTER')">SAVE</button>
    </div>

    <div>
      <label>Units:</label>
      <button onclick="applySetting('units','metric')">METRIC</button>
      <button onclick="applySetting('units','imperial')">IMPERIAL</button>
      <p>Current: ${weightLabel()} · ${distLabel()} · ${heightLabel()}</p>
    </div>

    <div>
      <label>Daily Quest Goal:</label>
      ${[1,2,3,4,5].map(n => `<button onclick="applySetting('dailyQuestGoal',${n})">${n}</button>`).join('')}
      <p>${s.dailyQuestGoal} quest${s.dailyQuestGoal!==1?'s':''} for streak</p>
    </div>

    <div>
      <label>Hydration Goal (ml):</label>
      <input type="number" id="set-water" value="${s.waterGoal}" />
      <button onclick="applySetting('waterGoal',parseInt(document.getElementById('set-water').value)||2000)">SAVE</button>
    </div>

    <div>
      <label>Friends:</label>
      <div id="friend-list">${(s.friends || []).map((f,i)=>`<div>${f} <button onclick="removeFriend(${i})">×</button></div>`).join('')}</div>
      <input type="text" id="friend-input-set" placeholder="Add friend"/>
      <button onclick="addFriendFromSettings()">ADD</button>
    </div>
  `;
}

// ── FRIENDS ──────────────────────────────────────
function addFriendFromSettings() {
  const input = document.getElementById('friend-input-set');
  const name = input.value.trim();
  if (!name) return;
  const s = getSettings();
  if ((s.friends||[]).some(f=>f.toLowerCase()===name.toLowerCase())) return alert('Already added');
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

// ── SAFE STUB PAGES ──────────────────────────────
function renderQuestsPage() {
  const el = document.getElementById('page-daily-quests');
  if (!el) return;
  el.innerHTML = `<h2 style="color:var(--accent)">Daily Quests</h2><p>Daily goal: ${getSettings().dailyQuestGoal} quest${getSettings().dailyQuestGoal!==1?'s':''}</p>`;
}

function renderGuildPage() {
  const el = document.getElementById('page-guild');
  if (!el) return;
  const friends = getSettings().friends || [];
  el.innerHTML = `<h2 style="color:var(--accent)">Friends / Guild</h2>${friends.length ? friends.map(f=>`<div>${f}</div>`).join('') : '<p>No friends added yet</p>'}`;
}

// ── INIT ─────────────────────────────────────────
document.addEventListener('DOMContentLoaded', ()=>{
  applySettings(getSettings());
  renderSettingsPage();
  renderQuestsPage();
  renderGuildPage();
});
