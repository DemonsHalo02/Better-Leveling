// ============================================
// SYSTEM — PAGE RENDERERS
// ============================================

function showPage(name, btn) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-tab').forEach(b => b.classList.remove('active'));
  document.getElementById('page-' + name).classList.add('active');
  btn.classList.add('active');
  if (name === 'quests')    renderQuestsPage();
  if (name === 'nutrition') renderNutritionPage();
  if (name === 'workout')   renderWorkoutPage();
  if (name === 'status')    renderStatusPage();
}

// ===== QUESTS PAGE =====
function renderQuestsPage() {
  const el = document.getElementById('page-quests');
  const today = new Date().toLocaleDateString('en-US', { weekday:'long', month:'short', day:'numeric' });
  const doneCount = HUNTER.quests.filter(q => q.done).length;
  const total = HUNTER.quests.length;
  const pct = total ? Math.round((doneCount / total) * 100) : 0;

  let html = `
    <div class="sys-card" style="margin-bottom:14px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
        <div>
          <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);letter-spacing:2px">DAILY QUEST LOG</div>
          <div style="font-family:var(--font-ui);font-size:13px;color:var(--text2);margin-top:2px">${today}</div>
        </div>
        <div style="text-align:right">
          <div style="font-family:var(--font-hud);font-size:22px;color:var(--accent)">${doneCount}<span style="font-size:13px;color:var(--text3)">/${total}</span></div>
          <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3)">COMPLETED</div>
        </div>
      </div>
      <div style="height:4px;background:rgba(0,180,255,0.08);border-radius:2px;overflow:hidden;border:1px solid var(--border)">
        <div style="height:100%;width:${pct}%;background:linear-gradient(90deg,var(--accent2),var(--accent));border-radius:2px;transition:width 0.5s"></div>
      </div>
      ${doneCount === total && total > 0 ? `<div style="text-align:center;font-family:var(--font-mono);font-size:10px;color:var(--green);margin-top:8px;letter-spacing:2px">◆ ALL QUESTS CLEARED ◆</div>` : ''}
    </div>

    <div class="section-head">ACTIVE QUESTS</div>
  `;

  HUNTER.quests.forEach((q, i) => {
    const catColor = { strength:'#00b4ff', cardio:'#00e5a0', nutrition:'#f0c040', mental:'#a855f7', lifestyle:'#ff6b35' }[q.category] || '#7aa0cc';
    html += `
      <div class="quest-card ${q.done ? 'quest-done' : ''}" onclick="${q.done ? '' : `completeQuest(${i})`}" style="
        background:var(--panel);
        border:1px solid ${q.done ? 'rgba(0,229,160,0.3)' : 'var(--border)'};
        border-radius:8px;
        padding:12px 14px;
        margin-bottom:8px;
        display:flex;
        align-items:center;
        gap:12px;
        cursor:${q.done ? 'default' : 'pointer'};
        opacity:${q.done ? '0.55' : '1'};
        transition:border-color 0.2s,opacity 0.2s;
        position:relative;
        overflow:hidden;
      ">
        ${q.done ? '' : `<div style="position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,${catColor},transparent);opacity:0.4"></div>`}
        <div style="
          width:36px;height:36px;border-radius:6px;
          background:${q.done ? 'rgba(0,229,160,0.1)' : `rgba(${catColor.startsWith('#00b') ? '0,180,255' : catColor.startsWith('#00e') ? '0,229,160' : catColor.startsWith('#f0c') ? '240,192,64' : catColor.startsWith('#a85') ? '168,85,247' : '255,107,53'},0.1)`};
          border:1px solid ${q.done ? 'rgba(0,229,160,0.4)' : catColor + '44'};
          display:flex;align-items:center;justify-content:center;
          font-size:18px;flex-shrink:0;
        ">${q.done ? '✓' : q.icon}</div>
        <div style="flex:1;min-width:0">
          <div style="font-size:14px;font-weight:600;color:${q.done ? 'var(--text3)' : 'var(--text)'};text-decoration:${q.done ? 'line-through' : 'none'};white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${q.name}</div>
          <div style="display:flex;gap:6px;margin-top:4px;flex-wrap:wrap">
            <span class="stat-pill pill-accent">+${q.xp} XP</span>
            <span class="stat-pill" style="background:${catColor}18;border:1px solid ${catColor}44;color:${catColor}">${q.stat.toUpperCase()} ↑</span>
            <span style="font-family:var(--font-mono);font-size:9px;color:var(--text3);padding:3px 0;letter-spacing:1px">${q.category.toUpperCase()}</span>
          </div>
        </div>
        ${q.done ? '' : `<div style="font-size:18px;color:var(--border2)">›</div>`}
      </div>
    `;
  });

  html += `
    <div style="margin-top:16px;padding:12px;background:rgba(255,51,85,0.06);border:1px solid rgba(255,51,85,0.2);border-radius:6px;text-align:center">
      <div style="font-family:var(--font-mono);font-size:9px;color:var(--red);letter-spacing:2px;margin-bottom:2px">⚠ SYSTEM WARNING</div>
      <div style="font-size:12px;color:var(--text3)">Incomplete quests reset at midnight. Weak hunters rest — <em>hunters train</em>.</div>
    </div>

    <div style="margin-top:12px;padding:10px;background:var(--panel);border:1px solid var(--border);border-radius:6px;display:flex;justify-content:space-around;text-align:center">
      <div>
        <div style="font-family:var(--font-hud);font-size:18px;color:var(--gold)">${HUNTER.streakDays || 0}</div>
        <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3)">DAY STREAK</div>
      </div>
      <div style="width:1px;background:var(--border)"></div>
      <div>
        <div style="font-family:var(--font-hud);font-size:18px;color:var(--accent)">${HUNTER.questsCompleted || 0}</div>
        <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3)">TOTAL QUESTS</div>
      </div>
      <div style="width:1px;background:var(--border)"></div>
      <div>
        <div style="font-family:var(--font-hud);font-size:18px;color:var(--green)">${HUNTER.totalXPEarned || 0}</div>
        <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3)">TOTAL XP</div>
      </div>
    </div>
  `;

  el.innerHTML = html;
}

// ===== NUTRITION PAGE =====
function renderNutritionPage() {
  const el = document.getElementById('page-nutrition');
  const log = HUNTER.foodLog || [];

  // Compute totals
  let totals = { cal: 0, protein: 0, carbs: 0, fat: 0 };
  log.forEach(f => { totals.cal += f.cal; totals.protein += f.protein; totals.carbs += f.carbs; totals.fat += f.fat; });

  const goals = { cal: 2000, protein: 150, carbs: 250, fat: 65 };

  const macros = [
    { key: 'cal',     label: 'CALORIES', val: totals.cal,     goal: goals.cal,     unit: 'kcal', color: '#00b4ff' },
    { key: 'protein', label: 'PROTEIN',  val: totals.protein, goal: goals.protein, unit: 'g',    color: '#00e5a0' },
    { key: 'carbs',   label: 'CARBS',    val: totals.carbs,   goal: goals.carbs,   unit: 'g',    color: '#f0c040' },
    { key: 'fat',     label: 'FAT',      val: totals.fat,     goal: goals.fat,     unit: 'g',    color: '#ff6b35' },
  ];

  const foodOptions = FOOD_DB.map((f, i) =>
    `<option value="${i}">${f.name} · ${f.cal}kcal · P:${f.protein}g</option>`
  ).join('');

  let html = `
    <div class="section-head">MACRO TRACKER</div>
    <div class="sys-card">
  `;

  macros.forEach(m => {
    const pct = Math.min(100, Math.round((m.val / m.goal) * 100));
    const over = m.val > m.goal;
    html += `
      <div class="macro-row">
        <div class="macro-label">${m.label}</div>
        <div class="macro-track"><div class="macro-fill" style="width:${pct}%;background:${over ? 'var(--red)' : m.color}"></div></div>
        <div class="macro-val">${m.val}/${m.goal}${m.unit}</div>
      </div>
    `;
  });

  html += `</div>

    <div class="section-head">LOG FOOD</div>
    <div class="sys-card">
      <div style="margin-bottom:10px">
        <label style="font-family:var(--font-mono);font-size:9px;color:var(--text3);letter-spacing:2px;display:block;margin-bottom:6px">SELECT FOOD</label>
        <select class="sys-input" id="food-select">
          <option value="">Choose food...</option>
          ${foodOptions}
        </select>
      </div>
      <button class="btn-primary" onclick="logSelectedFood()"><span>LOG FOOD</span><div class="btn-arrow">▶</div></button>
    </div>

    <div class="section-head">TODAY'S LOG</div>
  `;

  if (log.length === 0) {
    html += `<div style="text-align:center;padding:20px;color:var(--text3);font-family:var(--font-mono);font-size:11px;letter-spacing:2px">NO FOOD LOGGED YET</div>`;
  } else {
    log.slice().reverse().forEach((f, i) => {
      html += `
        <div style="background:var(--panel);border:1px solid var(--border);border-radius:6px;padding:10px 12px;margin-bottom:6px;display:flex;justify-content:space-between;align-items:center">
          <div>
            <div style="font-size:13px;font-weight:600;color:var(--text)">${f.name}</div>
            <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);margin-top:2px">${f.time} · P:${f.protein}g C:${f.carbs}g F:${f.fat}g</div>
          </div>
          <div style="font-family:var(--font-hud);font-size:14px;color:var(--gold)">${f.cal}<span style="font-size:9px;color:var(--text3)">kcal</span></div>
        </div>
      `;
    });
  }

  el.innerHTML = html;
}

function logSelectedFood() {
  const sel = document.getElementById('food-select');
  const idx = parseInt(sel.value);
  if (isNaN(idx)) { showNotif('[ SYSTEM ] Select a food item'); return; }
  addFoodEntry(FOOD_DB[idx]);
  sel.value = '';
}

// ===== WORKOUT PAGE =====
function renderWorkoutPage() {
  const el = document.getElementById('page-workout');
  const workouts = HUNTER.workouts || [];
  const totalMin = HUNTER.totalWorkoutMin || 0;

  const typeOptions = WORKOUT_TYPES.map(w =>
    `<option value="${w.id}">${w.icon} ${w.name} (${w.xpPerMin} XP/min)</option>`
  ).join('');

  let html = `
    <div class="section-head">HEALTH CONNECT</div>
    <div class="sys-card" id="health-card">
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">
        <div style="font-size:28px">⌚</div>
        <div style="flex:1">
          <div style="font-size:14px;font-weight:600;color:var(--text)">Device Sync</div>
          <div style="font-family:var(--font-mono);font-size:10px;color:var(--text3);margin-top:2px" id="health-status-text">Connect Apple Health or Google Fit</div>
        </div>
      </div>
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        <button class="btn-gold" onclick="connectAppleHealth()" id="apple-btn">🍎 Apple Health</button>
        <button class="btn-secondary" onclick="connectGoogleFit()" id="google-btn">🔄 Google Fit</button>
      </div>
      <div id="health-data-panel" style="display:none;margin-top:12px;padding-top:12px;border-top:1px solid var(--border)">
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;text-align:center">
          <div>
            <div style="font-family:var(--font-hud);font-size:18px;color:var(--green)" id="sync-steps">—</div>
            <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3)">STEPS</div>
          </div>
          <div>
            <div style="font-family:var(--font-hud);font-size:18px;color:var(--accent)" id="sync-hr">—</div>
            <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3)">HEART RATE</div>
          </div>
          <div>
            <div style="font-family:var(--font-hud);font-size:18px;color:var(--gold)" id="sync-cal">—</div>
            <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3)">KCAL BURNED</div>
          </div>
        </div>
      </div>
    </div>

    <div class="section-head">LOG WORKOUT</div>
    <div class="sys-card">
      <div style="margin-bottom:10px">
        <label style="font-family:var(--font-mono);font-size:9px;color:var(--text3);letter-spacing:2px;display:block;margin-bottom:6px">WORKOUT TYPE</label>
        <select class="sys-input" id="wk-type">${typeOptions}</select>
      </div>
      <div style="margin-bottom:10px">
        <label style="font-family:var(--font-mono);font-size:9px;color:var(--text3);letter-spacing:2px;display:block;margin-bottom:6px">DURATION (MINUTES)</label>
        <input type="number" class="sys-input" id="wk-dur" min="1" max="300" placeholder="e.g. 45" inputmode="numeric" />
      </div>
      <div style="margin-bottom:12px">
        <label style="font-family:var(--font-mono);font-size:9px;color:var(--text3);letter-spacing:2px;display:block;margin-bottom:6px">NOTES (OPTIONAL)</label>
        <input type="text" class="sys-input" id="wk-notes" placeholder="e.g. New PR on bench press" />
      </div>
      <div id="xp-preview" style="font-family:var(--font-mono);font-size:11px;color:var(--gold);margin-bottom:10px;min-height:16px"></div>
      <button class="btn-primary" onclick="submitWorkout()"><span>SUBMIT WORKOUT</span><div class="btn-arrow">▶</div></button>
    </div>

    <div class="section-head">HISTORY</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:12px">
      <div style="background:var(--panel);border:1px solid var(--border);border-radius:6px;padding:10px;text-align:center">
        <div style="font-family:var(--font-hud);font-size:22px;color:var(--accent)">${Math.round(totalMin / 60)}h ${totalMin % 60}m</div>
        <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3)">TOTAL TRAINED</div>
      </div>
      <div style="background:var(--panel);border:1px solid var(--border);border-radius:6px;padding:10px;text-align:center">
        <div style="font-family:var(--font-hud);font-size:22px;color:var(--gold)">${workouts.length}</div>
        <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3)">SESSIONS</div>
      </div>
    </div>
  `;

  if (workouts.length === 0) {
    html += `<div style="text-align:center;padding:20px;color:var(--text3);font-family:var(--font-mono);font-size:11px;letter-spacing:2px">NO WORKOUTS LOGGED YET</div>`;
  } else {
    workouts.slice(0, 10).forEach(w => {
      const wt = WORKOUT_TYPES.find(t => t.id === w.type);
      html += `
        <div style="background:var(--panel);border:1px solid var(--border);border-radius:6px;padding:10px 12px;margin-bottom:6px;display:flex;align-items:center;gap:10px">
          <div style="font-size:22px">${wt?.icon || '💪'}</div>
          <div style="flex:1">
            <div style="font-size:13px;font-weight:600;color:var(--text)">${wt?.name || w.type}</div>
            <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);margin-top:2px">${w.date} · ${w.durationMin} min${w.notes ? ' · ' + w.notes : ''}</div>
          </div>
          <span class="stat-pill pill-gold">+${w.xpEarned} XP</span>
        </div>
      `;
    });
  }

  el.innerHTML = html;

  // XP preview on change
  ['wk-type', 'wk-dur'].forEach(id => {
    const el2 = document.getElementById(id);
    if (el2) el2.addEventListener('input', updateXPPreview);
  });
}

function updateXPPreview() {
  const type = document.getElementById('wk-type')?.value;
  const dur  = parseInt(document.getElementById('wk-dur')?.value);
  const prev = document.getElementById('xp-preview');
  if (!prev) return;
  if (type && dur > 0) {
    const wt = WORKOUT_TYPES.find(w => w.id === type);
    const xp = Math.round((wt?.xpPerMin || 1) * dur);
    prev.textContent = `[ ESTIMATED REWARD: +${xp} XP ]`;
  } else {
    prev.textContent = '';
  }
}

function submitWorkout() {
  const type  = document.getElementById('wk-type').value;
  const dur   = parseInt(document.getElementById('wk-dur').value);
  const notes = document.getElementById('wk-notes').value.trim();
  if (!type || isNaN(dur) || dur < 1) { showNotif('[ ERROR ] Enter a valid duration'); return; }
  logWorkout(type, dur, notes);
  document.getElementById('wk-dur').value = '';
  document.getElementById('wk-notes').value = '';
  document.getElementById('xp-preview').textContent = '';
}

// ===== STATUS PAGE =====
function renderStatusPage() {
  const el = document.getElementById('page-status');
  const rank = getRank(HUNTER.level);
  const stats = HUNTER.stats;
  const totalStats = Object.values(stats).reduce((a, b) => a + b, 0);

  const statDefs = [
    { key: 'str',   label: 'STRENGTH',    color: '#00b4ff', icon: '⚔️' },
    { key: 'vit',   label: 'VITALITY',    color: '#00e5a0', icon: '🛡️' },
    { key: 'agi',   label: 'AGILITY',     color: '#f0c040', icon: '⚡' },
    { key: 'int',   label: 'INTELLIGENCE',color: '#a855f7', icon: '🧠' },
    { key: 'sense', label: 'SENSE',        color: '#ff6b35', icon: '👁️' },
  ];

  const maxStat = Math.max(...Object.values(stats));

  let html = `
    <div class="sys-card" style="margin-bottom:14px;text-align:center;padding:20px">
      <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);letter-spacing:3px;margin-bottom:8px">HUNTER PROFILE</div>
      <div style="font-family:var(--font-hud);font-size:24px;font-weight:700;color:var(--text);letter-spacing:2px">${HUNTER.name.toUpperCase()}</div>
      <div style="font-family:var(--font-mono);font-size:12px;margin-top:4px" style="color:${rank.color}">${rank.name}</div>
      <div style="display:inline-block;margin-top:8px;padding:3px 14px;border-radius:20px;background:rgba(240,192,64,0.1);border:1px solid rgba(240,192,64,0.4);font-family:var(--font-hud);font-size:11px;color:var(--gold);letter-spacing:2px">
        ${HUNTER.class?.toUpperCase() || 'FIGHTER'} CLASS
      </div>
    </div>

    <div class="section-head">STAT OVERVIEW</div>
    <div class="sys-card">
  `;

  statDefs.forEach(s => {
    const val = stats[s.key] || 10;
    const pct = Math.min(100, Math.round((val / Math.max(maxStat, 50)) * 100));
    html += `
      <div style="margin-bottom:12px">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:5px">
          <div style="display:flex;align-items:center;gap:6px">
            <span style="font-size:14px">${s.icon}</span>
            <span style="font-family:var(--font-mono);font-size:10px;color:var(--text2);letter-spacing:2px">${s.label}</span>
          </div>
          <span style="font-family:var(--font-hud);font-size:18px;color:${s.color}">${val}</span>
        </div>
        <div style="height:4px;background:rgba(255,255,255,0.04);border-radius:2px;overflow:hidden">
          <div style="height:100%;width:${pct}%;background:${s.color};border-radius:2px;transition:width 0.4s;box-shadow:0 0 6px ${s.color}88"></div>
        </div>
      </div>
    `;
  });

  html += `
      <div style="border-top:1px solid var(--border);padding-top:12px;display:flex;justify-content:space-between;align-items:center">
        <div style="font-family:var(--font-mono);font-size:10px;color:var(--text3);letter-spacing:2px">TOTAL POWER</div>
        <div style="font-family:var(--font-hud);font-size:24px;color:var(--gold);text-shadow:0 0 12px rgba(240,192,64,0.4)">${totalStats}</div>
      </div>
    </div>

    <div class="section-head">ACHIEVEMENTS</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:14px">
  `;

  const achievements = [
    { label: 'Quests Done',   val: HUNTER.questsCompleted || 0,           icon: '◈', color: 'var(--accent)' },
    { label: 'Day Streak',    val: HUNTER.streakDays || 0,                 icon: '🔥', color: 'var(--red)' },
    { label: 'Hours Trained', val: Math.round((HUNTER.totalWorkoutMin||0)/60), icon: '⏱',  color: 'var(--green)' },
    { label: 'Total XP',      val: HUNTER.totalXPEarned || 0,              icon: '⚡', color: 'var(--gold)' },
  ];

  achievements.forEach(a => {
    html += `
      <div style="background:var(--panel);border:1px solid var(--border);border-radius:6px;padding:12px;text-align:center">
        <div style="font-size:18px;margin-bottom:4px">${a.icon}</div>
        <div style="font-family:var(--font-hud);font-size:20px;color:${a.color}">${a.val}</div>
        <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);letter-spacing:1px">${a.label.toUpperCase()}</div>
      </div>
    `;
  });

  html += `</div>

    <div class="section-head">SELF-IMPROVEMENT GOALS</div>
    <div class="sys-card" id="goals-section">
      <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);letter-spacing:2px;margin-bottom:10px">SET YOUR GOAL</div>
      <div style="display:flex;gap:8px;margin-bottom:8px">
        <input type="text" class="sys-input" id="goal-input" placeholder="e.g. Bench press 100kg..." style="flex:1" />
        <button class="btn-gold" onclick="addGoal()" style="white-space:nowrap">ADD</button>
      </div>
      <div id="goals-list"></div>
    </div>
  `;

  el.innerHTML = html;
  renderGoals();
}

function renderGoals() {
  const goals = JSON.parse(localStorage.getItem('sys_goals_' + getCurrentUser()) || '[]');
  const container = document.getElementById('goals-list');
  if (!container) return;
  if (goals.length === 0) {
    container.innerHTML = `<div style="font-family:var(--font-mono);font-size:10px;color:var(--text3);text-align:center;padding:10px;letter-spacing:1px">NO GOALS SET — SET YOUR TARGETS</div>`;
    return;
  }
  container.innerHTML = goals.map((g, i) => `
    <div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid var(--border);cursor:pointer" onclick="toggleGoal(${i})">
      <div style="width:16px;height:16px;border-radius:3px;border:1.5px solid ${g.done ? 'var(--green)' : 'var(--border2)'};background:${g.done ? 'rgba(0,229,160,0.2)' : 'transparent'};display:flex;align-items:center;justify-content:center;font-size:10px;flex-shrink:0">${g.done ? '✓' : ''}</div>
      <span style="flex:1;font-size:13px;color:${g.done ? 'var(--text3)' : 'var(--text)'};text-decoration:${g.done ? 'line-through' : 'none'}">${g.text}</span>
      <span style="font-family:var(--font-mono);font-size:9px;color:var(--text3)">${g.date}</span>
    </div>
  `).join('');
}

function addGoal() {
  const input = document.getElementById('goal-input');
  const text = input.value.trim();
  if (!text) return;
  const key = 'sys_goals_' + getCurrentUser();
  const goals = JSON.parse(localStorage.getItem(key) || '[]');
  goals.push({ text, done: false, date: new Date().toLocaleDateString() });
  localStorage.setItem(key, JSON.stringify(goals));
  input.value = '';
  renderGoals();
  showNotif('[ SYSTEM ] Goal added');
}

function toggleGoal(i) {
  const key = 'sys_goals_' + getCurrentUser();
  const goals = JSON.parse(localStorage.getItem(key) || '[]');
  goals[i].done = !goals[i].done;
  localStorage.setItem(key, JSON.stringify(goals));
  if (goals[i].done) { addXP(20, 'int'); showNotif('[ GOAL ACHIEVED ] +20 XP', 'gold'); }
  renderGoals();
}
