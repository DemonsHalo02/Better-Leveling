// ============================================
// SYSTEM — GAME ENGINE
// ============================================

let HUNTER = null; // current hunter state in memory

function loadHunter(data) {
  HUNTER = JSON.parse(JSON.stringify(data));
  const today = new Date().toDateString();

  // Reset quests daily
  if (HUNTER.questDate !== today) {
    HUNTER.quests = getDailyQuests();
    HUNTER.questDate = today;
  }

  // Reset food log daily
  if (HUNTER.foodDate !== today) {
    HUNTER.foodLog = [];
    HUNTER.foodDate = today;
  }

  // Streak logic
  const yesterday = new Date(Date.now() - 86400000).toDateString();
  if (HUNTER.lastActive === yesterday) {
    // streak continues
  } else if (HUNTER.lastActive !== today) {
    HUNTER.streakDays = HUNTER.streakDays > 0 && HUNTER.lastActive !== yesterday ? 0 : HUNTER.streakDays;
  }
  HUNTER.lastActive = today;

  return HUNTER;
}

function persist() {
  saveCurrentHunter(HUNTER);
}

function addXP(amount, statKey) {
  HUNTER.xp += amount;
  HUNTER.totalXPEarned = (HUNTER.totalXPEarned || 0) + amount;

  if (statKey && HUNTER.stats[statKey] !== undefined) {
    HUNTER.stats[statKey] += Math.max(1, Math.floor(amount / 20));
  }
  // Tiny sense boost from any activity
  HUNTER.stats.sense += Math.floor(amount / 40);

  let leveled = false;
  let max = xpForLevel(HUNTER.level);
  while (HUNTER.xp >= max) {
    HUNTER.xp -= max;
    HUNTER.level++;
    max = xpForLevel(HUNTER.level);
    leveled = true;
  }

  persist();
  refreshHUD();

  if (leveled) {
    setTimeout(() => showLevelUp(), 300);
  }
}

function refreshHUD() {
  const max = xpForLevel(HUNTER.level);
  const pct = Math.min(100, Math.round((HUNTER.xp / max) * 100));
  document.getElementById('lv-num').textContent = HUNTER.level;
  document.getElementById('xp-cur').textContent = HUNTER.xp;
  document.getElementById('xp-max').textContent = max;
  document.getElementById('xp-bar').style.width = pct + '%';

  const rank = getRank(HUNTER.level);
  document.getElementById('top-name').textContent = HUNTER.name.toUpperCase();
  document.getElementById('top-rank').textContent = rank.name;
  document.getElementById('top-avatar').textContent = HUNTER.name.slice(0, 2).toUpperCase();
}

function showNotif(msg, type = 'default') {
  const el = document.getElementById('sys-notif');
  el.textContent = msg;
  el.className = 'sys-notif show' + (type === 'gold' ? ' gold' : '');
  clearTimeout(window._notifTimer);
  window._notifTimer = setTimeout(() => el.classList.remove('show'), 2800);
}

function showLevelUp() {
  const rank = getRank(HUNTER.level);
  document.getElementById('levelup-lv').textContent = 'LEVEL ' + HUNTER.level;
  document.getElementById('levelup-rank').textContent = rank.name;
  document.getElementById('levelup-overlay').classList.remove('hidden');
}

function closeLevelUp() {
  document.getElementById('levelup-overlay').classList.add('hidden');
}

function undoQuest(index) {
  const q = HUNTER.quests[index];
  if (!q || !q.done) return;
  q.done = false;
  // Subtract XP (can't go below 0 for current level)
  HUNTER.xp = Math.max(0, HUNTER.xp - q.xp);
  HUNTER.questsCompleted = Math.max(0, (HUNTER.questsCompleted || 1) - 1);
  HUNTER.totalXPEarned = Math.max(0, (HUNTER.totalXPEarned || q.xp) - q.xp);
  // Subtract stat point
  if (q.stat && HUNTER.stats[q.stat]) {
    HUNTER.stats[q.stat] = Math.max(10, HUNTER.stats[q.stat] - Math.max(1, Math.floor(q.xp / 20)));
  }
  persist();
  refreshHUD();
  renderQuestsPage();
  renderStatusPage();
  showNotif(`[ UNDO ] Quest unmarked — go earn it for real!`);
}

function completeQuest(index) {
  const q = HUNTER.quests[index];
  if (!q || q.done) return;
  q.done = true;
  HUNTER.questsCompleted = (HUNTER.questsCompleted || 0) + 1;

  // Check all done
  const allDone = HUNTER.quests.every(q => q.done);
  if (allDone) {
    HUNTER.streakDays = (HUNTER.streakDays || 0) + 1;
    addXP(q.xp, q.stat);
    setTimeout(() => {
      addXP(75, null);
      showNotif('[ SYSTEM ] ALL QUESTS COMPLETE! +75 BONUS XP', 'gold');
    }, 600);
  } else {
    addXP(q.xp, q.stat);
  }

  showNotif(`[ QUEST COMPLETE ] +${q.xp} XP · ${q.stat.toUpperCase()} ↑`);
  persist();
  renderQuestsPage();
  renderStatusPage();
}

function addFoodEntry(food) {
  HUNTER.foodLog.push({ ...food, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) });
  persist();
  renderNutritionPage();
}

function logWorkout(type, durationMin, notes) {
  const wt = WORKOUT_TYPES.find(w => w.id === type);
  const xpEarned = Math.round((wt?.xpPerMin || 1) * durationMin);
  const entry = {
    type, durationMin, notes,
    xpEarned,
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  };
  HUNTER.workouts = HUNTER.workouts || [];
  HUNTER.workouts.unshift(entry);
  if (HUNTER.workouts.length > 50) HUNTER.workouts.length = 50;
  HUNTER.totalWorkoutMin = (HUNTER.totalWorkoutMin || 0) + durationMin;

  addXP(xpEarned, wt?.stat || 'str');
  showNotif(`[ WORKOUT LOGGED ] +${xpEarned} XP`);
  persist();
  renderWorkoutPage();
}