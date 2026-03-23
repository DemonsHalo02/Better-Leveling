// ============================================
// SYSTEM — PASSWORD GATE
//
// Only one password to get into the whole app.
// Change APP_PASSWORD below to whatever you want.
// Everyone who knows it shares the same hunter profile.
//
// TO CHANGE THE PASSWORD:
// Edit the APP_PASSWORD value below, save the file,
// and re-upload it to GitHub. That's it.
// ============================================

const APP_PASSWORD = 'DevilsForLife';  // ← CHANGE THIS

// Session key — how long login lasts (in hours)
const SESSION_HOURS = 72;

// ── GATE CHECK ────────────────────────────────────────
function handleGateLogin() {
  const input = document.getElementById('gate-pass');
  const err   = document.getElementById('gate-error');
  const pass  = input?.value || '';

  if (!pass) {
    err.textContent = '[ ERROR ] Enter the passkey';
    shakeCard();
    return;
  }

  if (pass !== APP_PASSWORD) {
    err.textContent = '[ DENIED ] Incorrect passkey';
    input.value = '';
    shakeCard();
    // Lock out after 5 failed attempts
    trackFailedAttempt();
    return;
  }

  err.textContent = '';
  saveSession();
  launchApp(getHunterProfile());
}

// ── SHAKE ANIMATION ───────────────────────────────────
function shakeCard() {
  const card = document.getElementById('login-card');
  if (!card) return;
  card.style.animation = 'none';
  card.offsetHeight; // force reflow
  card.style.animation = 'shake 0.4s ease';
  if (!document.getElementById('shake-style')) {
    const s = document.createElement('style');
    s.id = 'shake-style';
    s.textContent = `@keyframes shake {
      0%,100%{transform:translateX(0)}
      20%{transform:translateX(-10px)}
      40%{transform:translateX(10px)}
      60%{transform:translateX(-8px)}
      80%{transform:translateX(8px)}
    }`;
    document.head.appendChild(s);
  }
}

// ── BRUTE FORCE LOCKOUT ───────────────────────────────
function trackFailedAttempt() {
  const key  = 'sys_gate_fails';
  const data = JSON.parse(localStorage.getItem(key) || '{"count":0,"since":0}');
  const now  = Date.now();

  // Reset counter after 10 minutes
  if (now - data.since > 10 * 60 * 1000) {
    data.count = 0;
    data.since = now;
  }

  data.count++;
  localStorage.setItem(key, JSON.stringify(data));

  if (data.count >= 5) {
    const err = document.getElementById('gate-error');
    const btn = document.querySelector('[onclick="handleGateLogin()"]');
    const input = document.getElementById('gate-pass');
    const lockMins = 10;
    if (err)   err.textContent   = `[ LOCKED ] Too many attempts. Wait ${lockMins} min.`;
    if (btn)   btn.disabled      = true;
    if (input) input.disabled    = true;

    setTimeout(() => {
      if (btn)   btn.disabled   = false;
      if (input) input.disabled = false;
      if (err)   err.textContent = '';
      localStorage.removeItem(key);
    }, lockMins * 60 * 1000);
  }
}

// ── SESSION ───────────────────────────────────────────
function saveSession() {
  localStorage.setItem('sys_gate_session', JSON.stringify({
    expires: Date.now() + SESSION_HOURS * 60 * 60 * 1000,
  }));
}

function hasValidSession() {
  try {
    const s = JSON.parse(localStorage.getItem('sys_gate_session') || 'null');
    return s && s.expires > Date.now();
  } catch { return false; }
}

function clearSession() {
  localStorage.removeItem('sys_gate_session');
}

// ── HUNTER PROFILE ────────────────────────────────────
// Everyone uses the same shared hunter profile stored locally.
// Progress, XP, quests etc. all save to this device.
function getHunterProfile() {
  try {
    const saved = JSON.parse(localStorage.getItem('sys_hunter_profile') || 'null');
    if (saved) return saved;
  } catch {}

  // First time — create a fresh profile
  return {
    name:            'HUNTER',
    class:           'fighter',
    level:           1,
    xp:              0,
    stats:           { str: 10, vit: 10, agi: 10, int: 10, sense: 10 },
    quests:          [],
    questDate:       '',
    foodLog:         [],
    foodDate:        '',
    workouts:        [],
    totalWorkoutMin: 0,
    streakDays:      0,
    lastActive:      '',
    questsCompleted: 0,
    totalXPEarned:   0,
    paid:            true, // password = already authorized
    createdAt:       new Date().toISOString(),
  };
}

function saveCurrentHunter(data) {
  localStorage.setItem('sys_hunter_profile', JSON.stringify(data));
}

// getCurrentUser — returns a fixed key since there's only one profile
function getCurrentUser() { return 'hunter'; }

// ── LOGOUT ────────────────────────────────────────────
function logout() {
  clearSession();
  location.reload();
}

// ── STUBS (kept so other files don't break) ───────────
function getUsers()    { return { hunter: getHunterProfile() }; }
function saveUsers()   {} // no-op — saveCurrentHunter handles it
function switchLoginTab() {}
function handleLogin()    { handleGateLogin(); }
function handleRegister() {}
function demoLogin()      { launchApp(getHunterProfile()); }
