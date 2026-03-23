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
    // Append custom quests
    try {
      const custom = JSON.parse(localStorage.getItem('sys_custom_quests') || '[]');
      custom.forEach(q => HUNTER.quests.push({ ...q, done: false }));
    } catch {}
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

  // Record for XP history graph
  if (typeof recordDailyXP === 'function') recordDailyXP(amount);

  if (statKey && HUNTER.stats[statKey] !== undefined) {
    HUNTER.stats[statKey] += Math.max(1, Math.floor(amount / 20));
  }
  HUNTER.stats.sense += Math.floor(amount / 40);

  // Track rank BEFORE leveling
  const rankBefore = getRank(HUNTER.level).name;

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
    const rankAfter = getRank(HUNTER.level).name;
    const rankChanged = rankAfter !== rankBefore;
    if (rankChanged) {
      // Rank-up cinematic takes priority over regular level-up
      setTimeout(() => showRankUpCinematic(rankBefore, rankAfter), 300);
    } else {
      setTimeout(() => showLevelUp(), 300);
    }
  }

  // Check achievements after every XP gain
  if (typeof checkAllAchievements === 'function') {
    setTimeout(() => checkAllAchievements(), 800);
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
  document.getElementById('top-avatar').textContent = HUNTER.name.slice(0,2).toUpperCase();
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

// ── RANK-UP CINEMATIC ─────────────────────────────────
function showRankUpCinematic(oldRank, newRank) {
  const rank  = getRank(HUNTER.level);
  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position:fixed;inset:0;z-index:950;background:#000;
    display:flex;flex-direction:column;align-items:center;
    justify-content:center;gap:0;overflow:hidden;
  `;

  // Animated background
  overlay.innerHTML = `
    <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;opacity:0.07">
      <svg viewBox="0 0 400 400" width="400" height="400" style="animation:spin-slow 20s linear infinite">
        <polygon points="200,20 360,110 360,290 200,380 40,290 40,110" fill="none" stroke="${rank.color}" stroke-width="2"/>
        <polygon points="200,60 320,130 320,270 200,340 80,270 80,130" fill="none" stroke="${rank.color}" stroke-width="1"/>
      </svg>
    </div>
    <div style="position:relative;z-index:1;text-align:center;padding:20px">
      <div style="font-family:var(--font-mono);font-size:10px;color:${rank.color};letter-spacing:6px;opacity:0;animation:fadeUp 0.6s 0.3s ease forwards">[ SYSTEM ]</div>
      <div style="font-family:var(--font-hud);font-size:13px;color:var(--text3);letter-spacing:4px;margin:10px 0;opacity:0;animation:fadeUp 0.6s 0.8s ease forwards">RANK ADVANCEMENT</div>
      <div style="font-family:var(--font-hud);font-size:14px;color:var(--text3);letter-spacing:2px;text-decoration:line-through;opacity:0;animation:fadeUp 0.6s 1.2s ease forwards">${oldRank}</div>
      <div style="font-size:24px;margin:12px 0;opacity:0;animation:fadeUp 0.4s 1.8s ease forwards">↓</div>
      <div style="font-family:var(--font-hud);font-size:28px;font-weight:900;letter-spacing:3px;
        color:${rank.color};text-shadow:0 0 40px ${rank.color};
        opacity:0;animation:fadeUp 0.6s 2.2s ease forwards,glow-pulse 2s 2.8s ease infinite">
        ${newRank}
      </div>
      <div style="font-family:var(--font-hud);font-size:14px;color:var(--text3);letter-spacing:2px;margin-top:10px;opacity:0;animation:fadeUp 0.6s 2.8s ease forwards">LEVEL ${HUNTER.level}</div>
    </div>
    <style>
      @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}
      @keyframes spin-slow{to{transform:rotate(360deg)}}
      @keyframes glow-pulse{0%,100%{text-shadow:0 0 40px ${rank.color}}50%{text-shadow:0 0 80px ${rank.color},0 0 120px ${rank.color}}}
    </style>
  `;

  // Tap to dismiss
  overlay.addEventListener('click', () => {
    overlay.style.opacity = '0';
    overlay.style.transition = 'opacity 0.5s';
    setTimeout(() => overlay.remove(), 500);
  });

  document.body.appendChild(overlay);

  // Vibrate
  if (navigator.vibrate) navigator.vibrate([100, 50, 100, 50, 300]);

  // Auto-dismiss after 5 seconds
  setTimeout(() => {
    if (overlay.parentNode) {
      overlay.style.opacity = '0';
      overlay.style.transition = 'opacity 0.5s';
      setTimeout(() => overlay.remove(), 500);
    }
  }, 5000);
}

// ── DAILY LOGIN STREAK BONUS ──────────────────────────
function checkLoginStreakBonus() {
  const key  = 'sys_login_streak';
  const data = JSON.parse(localStorage.getItem(key) || '{"streak":0,"lastLogin":""}');
  const today = new Date().toLocaleDateString();

  if (data.lastLogin === today) return; // already logged in today

  const yesterday = new Date(Date.now() - 86400000).toLocaleDateString();
  if (data.lastLogin === yesterday) {
    data.streak = (data.streak || 0) + 1;
  } else if (data.lastLogin !== today) {
    data.streak = 1; // reset
  }

  data.lastLogin = today;
  localStorage.setItem(key, JSON.stringify(data));

  // Award XP based on streak length
  const streak = data.streak;
  let bonus = 10;
  if (streak >= 30)     bonus = 60;
  else if (streak >= 14) bonus = 40;
  else if (streak >= 7)  bonus = 25;
  else if (streak >= 3)  bonus = 15;

  setTimeout(() => {
    addXP(bonus, 'sense');
    showNotif(`[ LOGIN BONUS ] Day ${streak} streak! +${bonus} XP`, 'gold');
  }, 1500);
}

function undoQuest(index) {
function completeQuest(index) {
  const q = HUNTER.quests[index];
  if (!q || !q.done) return;
  q.done = false;
  // Subtract XP (can't go below 0 for current level)
  HUNTER.xp = Math.max(0, HUNTER.xp - q.xp);
  HUNTER.questsCompleted = Math.max(0, (HUNTER.questsCompleted || 1) - 1);
  HUNTER.totalXPEarned   = Math.max(0, (HUNTER.totalXPEarned   || q.xp) - q.xp);
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
  HUNTER.foodLog.push({ ...food, time: new Date().toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' }) });
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
    time: new Date().toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' }),
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
