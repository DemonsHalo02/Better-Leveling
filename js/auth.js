// ============================================
// SYSTEM — AUTHENTICATION
// ============================================

function getUsers() {
  try { return JSON.parse(localStorage.getItem('sys_users') || '{}'); }
  catch { return {}; }
}

function saveUsers(u) {
  localStorage.setItem('sys_users', JSON.stringify(u));
}

function getCurrentUser() {
  try { return JSON.parse(localStorage.getItem('sys_current') || 'null'); }
  catch { return null; }
}

function switchLoginTab(tab, el) {
  document.querySelectorAll('.ltab').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
  document.getElementById('signin-form').style.display = tab === 'signin' ? 'block' : 'none';
  document.getElementById('signup-form').style.display = tab === 'signup' ? 'block' : 'none';
  document.getElementById('login-error').textContent = '';
  document.getElementById('reg-error').textContent = '';
}

function handleLogin() {
  const name = document.getElementById('login-user').value.trim();
  const pass = document.getElementById('login-pass').value;
  const err  = document.getElementById('login-error');

  if (!name || !pass) { err.textContent = '[ ERROR ] All fields required'; return; }

  const users = getUsers();
  if (!users[name.toLowerCase()]) { err.textContent = '[ ERROR ] Hunter not found'; return; }
  if (users[name.toLowerCase()].password !== btoa(pass)) { err.textContent = '[ ERROR ] Invalid passkey'; return; }

  localStorage.setItem('sys_current', JSON.stringify(name.toLowerCase()));
  launchApp(users[name.toLowerCase()]);
}

function handleRegister() {
  const name  = document.getElementById('reg-name').value.trim();
  const pass  = document.getElementById('reg-pass').value;
  const cls   = document.getElementById('reg-class').value;
  const err   = document.getElementById('reg-error');

  if (!name || !pass) { err.textContent = '[ ERROR ] All fields required'; return; }
  if (name.length < 2) { err.textContent = '[ ERROR ] Name too short'; return; }
  if (pass.length < 4) { err.textContent = '[ ERROR ] Passkey too short (min 4)'; return; }

  const users = getUsers();
  if (users[name.toLowerCase()]) { err.textContent = '[ ERROR ] Hunter already exists'; return; }

  const bonus = CLASS_BONUSES[cls] || {};
  const newHunter = {
    name,
    password: btoa(pass),
    class: cls,
    level: 1,
    xp: 0,
    stats: {
      str:   10 + (bonus.str   || 0),
      vit:   10 + (bonus.vit   || 0),
      agi:   10 + (bonus.agi   || 0),
      int:   10 + (bonus.int   || 0),
      sense: 10 + (bonus.sense || 0),
    },
    quests: [],
    questDate: '',
    foodLog: [],
    foodDate: '',
    workouts: [],
    totalWorkoutMin: 0,
    streakDays: 0,
    lastActive: '',
    questsCompleted: 0,
    totalXPEarned: 0,
  };

  users[name.toLowerCase()] = newHunter;
  saveUsers(users);
  localStorage.setItem('sys_current', JSON.stringify(name.toLowerCase()));
  launchApp(newHunter);
}

function demoLogin() {
  const demo = {
    name: 'DEMO HUNTER',
    class: 'fighter',
    level: 7,
    xp: 250,
    stats: { str: 28, vit: 22, agi: 18, int: 15, sense: 14 },
    quests: [],
    questDate: '',
    foodLog: [],
    foodDate: '',
    workouts: [],
    totalWorkoutMin: 120,
    streakDays: 3,
    lastActive: '',
    questsCompleted: 18,
    totalXPEarned: 940,
  };
  localStorage.setItem('sys_current', JSON.stringify('__demo__'));
  const users = getUsers();
  users['__demo__'] = demo;
  saveUsers(users);
  launchApp(demo);
}

function saveCurrentHunter(data) {
  const key = getCurrentUser();
  if (!key) return;
  const users = getUsers();
  users[key] = { ...users[key], ...data };
  saveUsers(users);
}

function logout() {
  localStorage.removeItem('sys_current');
  location.reload();
}
