// ============================================
// SYSTEM — PAGE RENDERERS
// ============================================

// ── SWAP QUEST TO NO-EQUIPMENT ALTERNATIVE ────────────
function swapQuestAlternative(index) {
  const q = HUNTER.quests[index];
  if (!q || q.done || !q.altId) return;

  const alt = (typeof QUEST_POOL !== 'undefined' ? QUEST_POOL : [])
    .find(p => p.id === q.altId);
  if (!alt) { showNotif('[ ERROR ] Alternative not found'); return; }

  const html = '<div style="text-align:center;padding:8px 0">'
    + '<div style="font-size:32px;margin-bottom:10px">🔄</div>'
    + '<div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);letter-spacing:2px;margin-bottom:8px">NO-EQUIPMENT ALTERNATIVE</div>'
    + '<div style="font-size:13px;color:var(--text3);text-decoration:line-through;margin-bottom:4px">' + q.name + '</div>'
    + '<div style="font-size:11px;color:var(--text3);margin-bottom:8px">→ swap to →</div>'
    + '<div style="font-size:14px;font-weight:600;color:var(--text);margin-bottom:6px">' + alt.name + '</div>'
    + '<span class="stat-pill pill-gold" style="display:inline-flex;margin-bottom:14px">+' + alt.xp + ' XP</span>'
    + '<div style="font-size:12px;color:var(--text3);margin-bottom:18px;line-height:1.5">Same XP, no equipment needed.<br>One swap per quest.</div>'
    + '<div style="display:flex;gap:10px">'
    + '<button onclick="closeBottomSheet()" style="flex:1;padding:13px;background:transparent;border:1px solid var(--border);border-radius:8px;color:var(--text3);font-family:var(--font-hud);font-size:12px;cursor:pointer">CANCEL</button>'
    + '<button onclick="closeBottomSheet();confirmQuestSwap(' + index + ')" style="flex:2;padding:13px;background:rgba(240,192,64,0.15);border:1px solid var(--gold);border-radius:8px;color:var(--gold);font-family:var(--font-hud);font-size:13px;font-weight:700;cursor:pointer">🔄 SWAP</button>'
    + '</div></div>';

  if (typeof showBottomSheet === 'function') {
    showBottomSheet('No Equipment? Swap Quest', html);
  }
}

function confirmQuestSwap(index) {
  const q = HUNTER.quests[index];
  if (!q || !q.altId) return;
  const alt = (typeof QUEST_POOL !== 'undefined' ? QUEST_POOL : [])
    .find(p => p.id === q.altId);
  if (!alt) return;
  HUNTER.quests[index] = { ...alt, done: false, swapped: true, altId: null, needsEquip: false };
  persist();
  renderQuestsPage();
  showNotif('[ SWAP ] Quest swapped — no equipment needed!');
}

function skipQuestConfirm(idx) {
  const q = HUNTER.quests[idx];
  if (!q) return;
  if (typeof showBottomSheet !== 'function') {
    if (confirm('Skip "' + q.name + '"? Uses your weekly token.')) skipQuest(idx);
    return;
  }
  const html = '<div style="text-align:center;padding:8px 0">'
    + '<div style="font-size:36px;margin-bottom:10px">⏭️</div>'
    + '<div style="font-size:15px;font-weight:600;color:var(--text);margin-bottom:6px">' + q.name + '</div>'
    + '<div style="font-family:var(--font-mono);font-size:10px;color:var(--gold);margin-bottom:6px">Uses your weekly skip token</div>'
    + '<div style="font-size:12px;color:var(--text3);margin-bottom:20px;line-height:1.6">You get 1 skip per week, resets every Monday.<br>The quest is removed from your daily goal count.</div>'
    + '<div style="display:flex;gap:10px">'
    + '<button onclick="closeBottomSheet()" style="flex:1;padding:13px;background:transparent;border:1px solid var(--border);border-radius:8px;color:var(--text3);font-family:var(--font-hud);font-size:12px;cursor:pointer">CANCEL</button>'
    + '<button onclick="closeBottomSheet();skipQuest(' + idx + ')" style="flex:2;padding:13px;background:rgba(240,192,64,0.15);border:1px solid var(--gold);border-radius:8px;color:var(--gold);font-family:var(--font-hud);font-size:13px;font-weight:700;cursor:pointer">⏭ SKIP IT</button>'
    + '</div></div>';
  showBottomSheet('Skip Quest?', html);
}

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
  const doneCount  = HUNTER.quests.filter(q => q.done).length;
  const total      = HUNTER.quests.length;
  const goal       = typeof getSettings === 'function' ? (getSettings().dailyQuestGoal || 3) : 3;
  const goalHit    = doneCount >= goal;
  const goalPct    = Math.min(100, Math.round((doneCount / goal) * 100));
  const showQuote  = typeof getSettings === 'function' ? getSettings().showQuote !== false : true;

  // Today's workout plan
  const todayPlan = typeof getTodaysWorkout === 'function' ? getTodaysWorkout() : null;

  let html = `
    ${showQuote && typeof renderDailyQuote === 'function' ? renderDailyQuote() : ''}
    ${todayPlan ? `
      <div style="background:rgba(0,229,160,0.06);border:1px solid rgba(0,229,160,0.25);border-radius:6px;padding:10px 14px;margin-bottom:12px;display:flex;align-items:center;gap:10px">
        <div style="font-size:20px">📅</div>
        <div>
          <div style="font-family:var(--font-mono);font-size:9px;color:var(--green);letter-spacing:2px">TODAY'S PLAN</div>
          <div style="font-size:13px;font-weight:600;color:var(--text);margin-top:2px">${todayPlan}</div>
        </div>
      </div>
    ` : ''}
    <div class="sys-card" style="margin-bottom:14px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
        <div>
          <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);letter-spacing:2px">DAILY QUEST LOG</div>
          <div style="font-family:var(--font-ui);font-size:13px;color:var(--text2);margin-top:2px">${today}</div>
        </div>
        <div style="text-align:right">
          <div style="font-family:var(--font-hud);font-size:22px;color:${goalHit?'var(--green)':'var(--accent)'}">${doneCount}<span style="font-size:13px;color:var(--text3)">/${goal}</span><span style="font-size:11px;color:var(--text3)"> goal</span></div>
          <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3)">${doneCount}/${total} TOTAL</div>
        </div>
      </div>
      <div style="height:4px;background:rgba(0,180,255,0.08);border-radius:2px;overflow:hidden;border:1px solid var(--border)">
        <div style="height:100%;width:${goalPct}%;background:${goalHit?'linear-gradient(90deg,var(--green),#00ff88)':'linear-gradient(90deg,var(--accent2),var(--accent))'};border-radius:2px;transition:width 0.5s"></div>
      </div>
      ${goalHit ? '<div style="text-align:center;font-family:var(--font-mono);font-size:10px;color:var(--green);margin-top:8px;letter-spacing:2px">◆ DAILY GOAL REACHED — STREAK ACTIVE ◆</div>' : '<div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);margin-top:6px">' + (goal - doneCount) + ' more quest' + (goal-doneCount!==1?'s':'') + ' to hit your daily goal</div>'}
    </div>
  `;

  const skipAvailable = typeof canSkipQuest === 'function' ? canSkipQuest() : false;
  const skipData      = typeof getSkipData  === 'function' ? getSkipData()  : {};

  html += `
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
      <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);letter-spacing:2px">ACTIVE QUESTS</div>
      <div style="display:flex;align-items:center;gap:6px">
        <div style="font-size:16px">${skipAvailable ? '⏭️' : '🔒'}</div>
        <div style="font-family:var(--font-mono);font-size:9px;color:${skipAvailable?'var(--gold)':'var(--text3)'}">
          ${skipAvailable ? 'SKIP AVAILABLE' : 'SKIP USED THIS WEEK'}
        </div>
      </div>
    </div>
  `;

  HUNTER.quests.forEach((q, i) => {
    if (q.skipped) {
      html += `
        <div style="
          border-radius:8px;padding:12px 14px;margin-bottom:8px;
          background:rgba(0,0,0,0.15);
          border:1px solid var(--border);
          display:flex;align-items:center;gap:12px;
          opacity:0.45;
        ">
          <div style="width:38px;height:38px;border-radius:6px;flex-shrink:0;background:rgba(122,160,204,0.1);border:1px solid var(--border);display:flex;align-items:center;justify-content:center;font-size:18px">⏭️</div>
          <div style="flex:1;min-width:0">
            <div style="font-size:14px;font-weight:600;color:var(--text3);text-decoration:line-through;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${q.name}</div>
            <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);margin-top:4px">SKIPPED · Weekly token used</div>
          </div>
        </div>
      `;
      return;
    }
    const catColor = {
      strength: '#00b4ff', cardio: '#00e5a0', nutrition: '#f0c040',
      mental: '#a855f7',   lifestyle: '#ff6b35', weekend: '#f0c040',
      surprise: '#ff3355'
    }[q.category] || '#7aa0cc';

    const isSurprise = q.category === 'surprise';
    const isWeekend  = q.category === 'weekend';

    html += `
      <div class="quest-card ${q.done ? 'quest-done' : ''}"
        style="
          background:${isSurprise ? 'rgba(255,51,85,0.06)' : isWeekend ? 'rgba(240,192,64,0.06)' : 'var(--panel)'};
          border:1px solid ${q.done ? 'rgba(0,229,160,0.3)' : isSurprise ? 'rgba(255,51,85,0.4)' : isWeekend ? 'rgba(240,192,64,0.35)' : 'var(--border)'};
          border-radius:8px;padding:12px 14px;margin-bottom:8px;
          display:flex;align-items:center;gap:12px;
          opacity:${q.done ? '0.6' : '1'};
          transition:border-color 0.2s,opacity 0.2s;
          position:relative;overflow:hidden;
        ">
        <div style="position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,${catColor},transparent);opacity:${q.done ? '0.2' : '0.5'}"></div>
        <div onclick="${q.done ? 'undoQuestConfirm('+i+')' : 'questConfirm('+i+')'}" style="
          width:38px;height:38px;border-radius:6px;flex-shrink:0;cursor:pointer;
          background:${q.done ? 'rgba(0,229,160,0.1)' : catColor + '18'};
          border:1px solid ${q.done ? 'rgba(0,229,160,0.4)' : catColor + '55'};
          display:flex;align-items:center;justify-content:center;font-size:18px;
        ">${q.done ? '✓' : q.icon}</div>
        <div onclick="${q.done ? 'undoQuestConfirm('+i+')' : 'questConfirm('+i+')'}" style="flex:1;min-width:0;cursor:pointer">
          <div style="font-size:14px;font-weight:600;color:${q.done ? 'var(--text3)' : 'var(--text)'};text-decoration:${q.done ? 'line-through' : 'none'};white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${q.name}</div>
          <div style="display:flex;gap:6px;margin-top:4px;flex-wrap:wrap;align-items:center">
            <span class="stat-pill pill-accent">+${q.xp} XP</span>
            <span class="stat-pill" style="background:${catColor}18;border:1px solid ${catColor}44;color:${catColor}">${q.stat.toUpperCase()} ↑</span>
            ${isSurprise ? '<span class="stat-pill pill-red">SURPRISE</span>' : ''}
            ${isWeekend  ? '<span class="stat-pill pill-gold">WEEKEND</span>'  : ''}
          </div>
        </div>
        <div style="display:flex;flex-direction:column;align-items:center;gap:4px;flex-shrink:0">
          <div onclick="${q.done ? 'undoQuestConfirm('+i+')' : 'questConfirm('+i+')'}" style="font-size:13px;color:${q.done ? 'var(--text3)' : 'var(--border2)'};cursor:pointer">
            ${q.done ? '↩' : '›'}
          </div>
          ${!q.done && skipAvailable ? '<div onclick="skipQuestConfirm('+i+')" title="Skip (1/week)" style="font-size:12px;color:var(--text3);cursor:pointer;padding:2px;opacity:0.6" onmouseover="this.style.opacity=1;this.style.color=\'var(--gold)\'" onmouseout="this.style.opacity=0.6;this.style.color=\'var(--text3)\'">⏭</div>' : ''}
          ${!q.done && q.needsEquip && q.altId ? '<div onclick="swapQuestAlternative('+i+')" title="No equipment? Swap for alternative" style="font-size:12px;cursor:pointer;padding:2px;color:var(--gold);opacity:0.7" onmouseover="this.style.opacity=1" onmouseout="this.style.opacity=0.7">🔄</div>' : ''}
        </div>
      </div>
    `;
  });

  html += `
    <div style="margin-top:16px;padding:12px;background:rgba(255,51,85,0.06);border:1px solid rgba(255,51,85,0.2);border-radius:6px;text-align:center">
      <div style="font-family:var(--font-mono);font-size:9px;color:var(--red);letter-spacing:2px;margin-bottom:2px">⚠ SYSTEM WARNING</div>
      <div style="font-size:12px;color:var(--text3)">Incomplete quests reset at midnight. Tap a completed quest to undo it.</div>
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

  // Weekly boss health bar
  html += renderWeeklyBossBar();

  // Quest history (last 5)
  html += renderQuestHistoryPreview();

  el.innerHTML = html;
}

// ── WEEKLY BOSS HEALTH BAR ─────────────────────────────
const WEEKLY_BOSSES = [
  { name: 'THE IRON GIANT',    color: '#60a5fa', icon: '🗿', maxHp: 2000, rank: 'B' },
  { name: 'THE SHADOW LURKER', color: '#a855f7', icon: '👁',  maxHp: 2500, rank: 'A' },
  { name: 'THE CRIMSON BEAST', color: '#ff3355', icon: '🔥', maxHp: 3500, rank: 'S' },
  { name: 'THE VOID TYRANT',   color: '#ff6b35', icon: '👑', maxHp: 5000, rank: 'National' },
  { name: 'SHADOW SOVEREIGN',  color: '#a855f7', icon: '🦋', maxHp: 9999, rank: 'Shadow Monarch' },
];

function getWeekBossData() {
  const weekKey = _getWeekKey();
  try {
    const d = JSON.parse(localStorage.getItem('bl_week_boss') || '{}');
    if (d.weekKey !== weekKey) {
      // New week — pick next boss
      const prev = d.bossIndex || 0;
      const next = { weekKey, bossIndex: (prev + 1) % WEEKLY_BOSSES.length, hp: WEEKLY_BOSSES[(prev+1)%WEEKLY_BOSSES.length].maxHp, defeated: false };
      localStorage.setItem('bl_week_boss', JSON.stringify(next));
      return next;
    }
    return d;
  } catch {
    const d = { weekKey, bossIndex: 0, hp: WEEKLY_BOSSES[0].maxHp, defeated: false };
    localStorage.setItem('bl_week_boss', JSON.stringify(d));
    return d;
  }
}

function _getWeekKey() {
  const d = new Date(), s = new Date(d.getFullYear(), 0, 1);
  const w = Math.ceil(((d - s) / 86400000 + s.getDay() + 1) / 7);
  return `${d.getFullYear()}-W${String(w).padStart(2,'0')}`;
}

function damageBoss(xpDealt) {
  const data = getWeekBossData();
  if (data.defeated) return;
  const boss = WEEKLY_BOSSES[data.bossIndex];
  const dmg  = Math.round(xpDealt * 1.5); // XP → damage
  data.hp    = Math.max(0, data.hp - dmg);
  if (data.hp <= 0) {
    data.hp = 0;
    data.defeated = true;
    localStorage.setItem('bl_week_boss', JSON.stringify(data));
    // Award boss defeat bonus
    setTimeout(() => {
      addXP(boss.maxHp / 10, 'str');
      showNotif(`[ BOSS DEFEATED ] ${boss.name}! +${Math.round(boss.maxHp/10)} XP`, 'gold');
      if (navigator.vibrate) navigator.vibrate([200,100,200,100,400]);
    }, 800);
  } else {
    localStorage.setItem('bl_week_boss', JSON.stringify(data));
  }
}

function renderWeeklyBossBar() {
  const data    = getWeekBossData();
  const boss    = WEEKLY_BOSSES[data.bossIndex];
  const pct     = Math.round((data.hp / boss.maxHp) * 100);
  const dmgDone = boss.maxHp - data.hp;
  const defeated = data.defeated || data.hp <= 0;

  return `
    <div style="
      margin-top:14px;padding:14px;
      background:${defeated ? 'rgba(0,229,160,0.06)' : 'rgba(255,51,85,0.06)'};
      border:1px solid ${defeated ? 'rgba(0,229,160,0.3)' : 'rgba(255,51,85,0.3)'};
      border-radius:8px;position:relative;overflow:hidden;
    ">
      <div style="position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,${boss.color},transparent)"></div>
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">
        <div style="font-size:22px;${defeated?'filter:grayscale(1)':''}">${boss.icon}</div>
        <div style="flex:1">
          <div style="font-family:var(--font-mono);font-size:8px;color:${boss.color};letter-spacing:2px;margin-bottom:2px">
            [ WEEKLY BOSS · ${boss.rank}-RANK ]
          </div>
          <div style="font-family:var(--font-hud);font-size:14px;color:${defeated?'var(--text3)':boss.color};letter-spacing:1px">
            ${boss.name}${defeated?' — DEFEATED':''}
          </div>
        </div>
        <div style="text-align:right;flex-shrink:0">
          <div style="font-family:var(--font-hud);font-size:14px;color:${defeated?'var(--green)':'var(--red)'}">
            ${defeated ? '✓' : data.hp.toLocaleString()}
          </div>
          <div style="font-family:var(--font-mono);font-size:8px;color:var(--text3)">
            ${defeated ? 'SLAIN' : '/ '+boss.maxHp.toLocaleString()+' HP'}
          </div>
        </div>
      </div>
      <!-- HP bar -->
      <div style="height:8px;background:rgba(0,0,0,0.3);border-radius:4px;overflow:hidden;margin-bottom:6px;border:1px solid rgba(255,255,255,0.05)">
        <div style="
          height:100%;
          width:${pct}%;
          background:${defeated ? 'var(--green)' : pct > 60 ? boss.color : pct > 30 ? 'var(--gold)' : 'var(--red)'};
          border-radius:4px;
          transition:width 0.6s ease;
          box-shadow:0 0 8px ${boss.color}66;
        "></div>
      </div>
      <div style="display:flex;justify-content:space-between;font-family:var(--font-mono);font-size:9px;color:var(--text3)">
        <span>${defeated ? 'Boss defeated this week! New boss Monday.' : `${pct}% HP remaining`}</span>
        <span>${dmgDone.toLocaleString()} dmg dealt</span>
      </div>
      ${!defeated ? `
        <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);margin-top:5px;text-align:center">
          Complete quests to deal damage · Defeat for +${Math.round(boss.maxHp/10)} XP reward
        </div>
      ` : ''}
    </div>
  `;
}

// ── QUEST HISTORY PREVIEW ─────────────────────────────
function renderQuestHistoryPreview() {
  const history = getQuestHistory().slice(0, 5);
  if (history.length === 0) return '';

  return `
    <div style="margin-top:14px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
        <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);letter-spacing:2px">RECENT COMPLETIONS</div>
        <button onclick="showFullQuestHistory()" style="background:transparent;border:none;color:var(--accent);font-family:var(--font-mono);font-size:9px;cursor:pointer;letter-spacing:1px">VIEW ALL →</button>
      </div>
      ${history.map(q => `
        <div style="display:flex;align-items:center;gap:8px;padding:7px 0;border-bottom:1px solid var(--border)">
          <div style="font-size:15px;width:22px;text-align:center;flex-shrink:0">${q.icon}</div>
          <div style="flex:1;min-width:0">
            <div style="font-size:12px;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${q.name}</div>
            <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3)">${q.date} · ${q.time}</div>
          </div>
          <span class="stat-pill pill-gold" style="flex-shrink:0">+${q.xp} XP</span>
        </div>
      `).join('')}
    </div>
  `;
}

function getQuestHistory() {
  try { return JSON.parse(localStorage.getItem('bl_quest_history') || '[]'); }
  catch { return []; }
}

function showFullQuestHistory() {
  const history = getQuestHistory();
  if (history.length === 0) { showNotif('No quest history yet'); return; }

  // Group by date
  const byDate = {};
  history.forEach(q => {
    if (!byDate[q.date]) byDate[q.date] = [];
    byDate[q.date].push(q);
  });

  const content = Object.entries(byDate).slice(0, 14).map(([date, quests]) => `
    <div style="margin-bottom:12px">
      <div style="font-family:var(--font-mono);font-size:9px;color:var(--accent);letter-spacing:2px;margin-bottom:6px">${date}</div>
      ${quests.map(q => `
        <div style="display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid var(--border)">
          <div style="font-size:14px;width:20px;text-align:center;flex-shrink:0">${q.icon}</div>
          <div style="flex:1;font-size:12px;color:var(--text)">${q.name}</div>
          <span class="stat-pill pill-gold">+${q.xp}</span>
        </div>
      `).join('')}
    </div>
  `).join('');

  if (typeof showBottomSheet === 'function') {
    showBottomSheet(`Quest History (${history.length} total)`, content);
  }
}

// ── QUEST CONFIRM POPUP ───────────────────────────────
function questConfirm(index) {
  const q = HUNTER.quests[index];
  if (!q || q.done) return;

  const overlay = document.createElement('div');
  overlay.style.cssText = `position:fixed;inset:0;z-index:600;background:rgba(0,0,0,0.75);display:flex;align-items:flex-end;justify-content:center;padding-bottom:max(24px,env(safe-area-inset-bottom));backdrop-filter:blur(4px)`;
  overlay.innerHTML = `
    <div style="width:100%;max-width:420px;background:var(--bg2);border:1px solid var(--border);border-radius:16px 16px 12px 12px;padding:20px;animation:slideUp 0.25s ease">
      <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);letter-spacing:3px;margin-bottom:6px;text-align:center">QUEST COMPLETE?</div>
      <div style="font-size:16px;font-weight:600;color:var(--text);text-align:center;margin-bottom:4px">${q.icon} ${q.name}</div>
      <div style="text-align:center;margin-bottom:16px">
        <span class="stat-pill pill-gold">+${q.xp} XP</span>
      </div>
      <div style="font-size:13px;color:var(--text3);text-align:center;margin-bottom:18px">Only mark this complete if you actually did it, hunter.</div>
      <div style="display:flex;gap:10px">
        <button style="flex:1;padding:13px;background:transparent;border:1px solid var(--border);border-radius:8px;color:var(--text3);font-family:var(--font-hud);font-size:13px;letter-spacing:1px;cursor:pointer" onclick="this.closest('[style*=fixed]').remove()">CANCEL</button>
        <button style="flex:2;padding:13px;background:rgba(0,180,255,0.15);border:1px solid var(--accent);border-radius:8px;color:var(--accent);font-family:var(--font-hud);font-size:13px;font-weight:600;letter-spacing:2px;cursor:pointer" onclick="this.closest('[style*=fixed]').remove();completeQuest(${index})">✓ COMPLETED</button>
      </div>
    </div>
    <style>@keyframes slideUp{from{transform:translateY(40px);opacity:0}to{transform:none;opacity:1}}</style>
  `;
  overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });
  document.body.appendChild(overlay);
}

// ── UNDO QUEST CONFIRM ────────────────────────────────
function undoQuestConfirm(index) {
  const q = HUNTER.quests[index];
  if (!q || !q.done) return;

  const overlay = document.createElement('div');
  overlay.style.cssText = `position:fixed;inset:0;z-index:600;background:rgba(0,0,0,0.75);display:flex;align-items:flex-end;justify-content:center;padding-bottom:max(24px,env(safe-area-inset-bottom));backdrop-filter:blur(4px)`;
  overlay.innerHTML = `
    <div style="width:100%;max-width:420px;background:var(--bg2);border:1px solid var(--border);border-radius:16px 16px 12px 12px;padding:20px;animation:slideUp 0.25s ease">
      <div style="font-family:var(--font-mono);font-size:9px;color:var(--red);letter-spacing:3px;margin-bottom:6px;text-align:center">UNDO QUEST?</div>
      <div style="font-size:16px;font-weight:600;color:var(--text);text-align:center;margin-bottom:16px">${q.icon} ${q.name}</div>
      <div style="font-size:13px;color:var(--text3);text-align:center;margin-bottom:18px">This will remove the XP you earned. Only undo if you marked it by mistake.</div>
      <div style="display:flex;gap:10px">
        <button style="flex:1;padding:13px;background:transparent;border:1px solid var(--border);border-radius:8px;color:var(--text3);font-family:var(--font-hud);font-size:13px;letter-spacing:1px;cursor:pointer" onclick="this.closest('[style*=fixed]').remove()">KEEP IT</button>
        <button style="flex:2;padding:13px;background:rgba(255,51,85,0.1);border:1px solid var(--red);border-radius:8px;color:var(--red);font-family:var(--font-hud);font-size:13px;font-weight:600;letter-spacing:2px;cursor:pointer" onclick="this.closest('[style*=fixed]').remove();undoQuest(${index})">↩ UNDO</button>
      </div>
    </div>
  `;
  overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });
  document.body.appendChild(overlay);
}


// renderNutritionPage and logSelectedFood moved to foodscanner.js

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
  // Re-inject admin panel after goals re-render (it sits at top)
  if (typeof renderAdminPanel === 'function') renderAdminPanel();
}

// ============================================
// SYSTEM SHOP
// Spend gold earned from daily quest goals
// ============================================

const SHOP_ITEMS = [
  {
    id:    'class_token',
    name:  'Class Change Token',
    desc:  'Change your hunter class to any of the 5 classes. Stats will be recalculated.',
    icon:  '🎭',
    cost:  50,
    type:  'token',
    color: '#a855f7',
    rare:  'EPIC',
  },
  {
    id:    'xp_boost',
    name:  'XP Booster (×2 for 24h)',
    desc:  'Double all XP earned from quests for the next 24 hours.',
    icon:  '⚡',
    cost:  30,
    type:  'consumable',
    color: '#f0c040',
    rare:  'RARE',
  },
  {
    id:    'extra_skip',
    name:  'Extra Quest Skip',
    desc:  'Get one additional quest skip to use this week on top of your weekly token.',
    icon:  '⏭️',
    cost:  20,
    type:  'consumable',
    color: '#00b4ff',
    rare:  'UNCOMMON',
  },
  {
    id:    'stat_reset',
    name:  'Stat Reset Scroll',
    desc:  'Redistribute all your bonus stat points freely.',
    icon:  '📜',
    cost:  40,
    type:  'token',
    color: '#00e5a0',
    rare:  'EPIC',
  },
  {
    id:    'name_change',
    name:  'Hunter Name Change',
    desc:  'Change your hunter display name and leaderboard identity.',
    icon:  '✏️',
    cost:  15,
    type:  'token',
    color: '#60a5fa',
    rare:  'UNCOMMON',
  },
  {
    id:    'gold_quest',
    name:  'Bonus Gold Quest',
    desc:  'Add a special bonus quest today worth +20 gold on completion.',
    icon:  '🏆',
    cost:  10,
    type:  'consumable',
    color: '#ff6b35',
    rare:  'COMMON',
  },
  {
    id:    'streak_shield',
    name:  'Streak Shield',
    desc:  'Protect your streak for 1 day if you miss your daily goal.',
    icon:  '🛡️',
    cost:  25,
    type:  'consumable',
    color: '#00b4ff',
    rare:  'RARE',
  },
];

const RARE_COLORS = {
  COMMON:   '#7aa0cc',
  UNCOMMON: '#00e5a0',
  RARE:     '#60a5fa',
  EPIC:     '#a855f7',
};

function renderShopPage() {
  const el   = document.getElementById('page-shop');
  if (!el) return;
  const gold = getGold();
  const owned = getOwnedItems();

  el.innerHTML = `
    <!-- GOLD BALANCE -->
    <div style="
      background:rgba(240,192,64,0.08);border:1px solid rgba(240,192,64,0.3);
      border-radius:10px;padding:16px;margin-bottom:14px;
      display:flex;align-items:center;justify-content:space-between;
    ">
      <div>
        <div style="font-family:var(--font-mono);font-size:9px;color:var(--gold);letter-spacing:3px;margin-bottom:4px">YOUR BALANCE</div>
        <div style="font-family:var(--font-hud);font-size:32px;color:var(--gold)">🪙 ${gold.toLocaleString()}</div>
        <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);margin-top:2px">Earn 10 🪙 per daily goal · 5 🪙 for full clear</div>
      </div>
      <div style="text-align:right">
        <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3)">ITEMS OWNED</div>
        <div style="font-family:var(--font-hud);font-size:22px;color:var(--text)">${Object.values(owned).reduce((a,b)=>a+b,0)}</div>
      </div>
    </div>

    <!-- OWNED ITEMS -->
    ${Object.keys(owned).length > 0 ? `
      <div class="section-head">YOUR ITEMS</div>
      <div style="display:flex;flex-direction:column;gap:6px;margin-bottom:14px">
        ${Object.entries(owned).map(([id, qty]) => {
          const item = SHOP_ITEMS.find(s => s.id === id);
          if (!item || qty <= 0) return '';
          return `
            <div style="
              display:flex;align-items:center;gap:12px;padding:12px;
              background:${item.color}10;border:1px solid ${item.color}44;border-radius:8px;
            ">
              <div style="font-size:24px">${item.icon}</div>
              <div style="flex:1">
                <div style="font-size:13px;font-weight:600;color:var(--text)">${item.name}</div>
                <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);margin-top:2px">× ${qty} owned</div>
              </div>
              <button onclick="useShopItem('${id}')" style="
                padding:8px 14px;background:${item.color}22;border:1px solid ${item.color};
                border-radius:6px;color:${item.color};font-family:var(--font-hud);
                font-size:11px;cursor:pointer;letter-spacing:1px;
              ">USE</button>
            </div>
          `;
        }).join('')}
      </div>
    ` : ''}

    <!-- SHOP ITEMS -->
    <div class="section-head">SYSTEM SHOP</div>
    <div style="display:flex;flex-direction:column;gap:8px">
      ${SHOP_ITEMS.map(item => {
        const canAfford = gold >= item.cost;
        const rColor    = RARE_COLORS[item.rare] || '#7aa0cc';
        return `
          <div style="
            background:${item.color}08;
            border:1px solid ${item.color}30;
            border-radius:10px;padding:14px;
            position:relative;overflow:hidden;
          ">
            <div style="position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,${item.color},transparent)"></div>
            <div style="display:flex;align-items:flex-start;gap:12px">
              <div style="
                width:44px;height:44px;border-radius:8px;flex-shrink:0;
                background:${item.color}18;border:1px solid ${item.color}44;
                display:flex;align-items:center;justify-content:center;font-size:22px;
              ">${item.icon}</div>
              <div style="flex:1;min-width:0">
                <div style="display:flex;align-items:center;gap:6px;margin-bottom:2px">
                  <div style="font-size:14px;font-weight:600;color:var(--text)">${item.name}</div>
                  <span style="font-family:var(--font-mono);font-size:8px;color:${rColor};padding:1px 5px;border:1px solid ${rColor}44;border-radius:3px">${item.rare}</span>
                </div>
                <div style="font-size:12px;color:var(--text3);line-height:1.5;margin-bottom:10px">${item.desc}</div>
                <div style="display:flex;align-items:center;justify-content:space-between">
                  <div style="font-family:var(--font-hud);font-size:16px;color:var(--gold)">🪙 ${item.cost}</div>
                  <button onclick="buyShopItem('${item.id}')" style="
                    padding:9px 18px;border-radius:7px;cursor:${canAfford?'pointer':'not-allowed'};
                    background:${canAfford?item.color+'22':'rgba(0,0,0,0.2)'};
                    border:1px solid ${canAfford?item.color:'var(--border)'};
                    color:${canAfford?item.color:'var(--text3)'};
                    font-family:var(--font-hud);font-size:12px;font-weight:600;letter-spacing:1px;
                    opacity:${canAfford?'1':'0.5'};
                  ">${canAfford ? 'BUY' : 'NOT ENOUGH 🪙'}</button>
                </div>
              </div>
            </div>
          </div>
        `;
      }).join('')}
    </div>

    <div style="margin-top:14px;padding:10px;background:rgba(0,180,255,0.04);border:1px solid rgba(0,180,255,0.15);border-radius:6px">
      <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);letter-spacing:2px;margin-bottom:4px">HOW TO EARN GOLD</div>
      <div style="font-size:12px;color:var(--text3);line-height:1.7">
        🪙 <strong style="color:var(--text)">+10</strong> when you hit your daily quest goal<br>
        🪙 <strong style="color:var(--text)">+5</strong> when you clear every single quest<br>
        More ways to earn gold coming soon.
      </div>
    </div>
  `;
}

function getOwnedItems() {
  try { return JSON.parse(localStorage.getItem('bl_shop_owned') || '{}'); }
  catch { return {}; }
}
function saveOwnedItems(o) { localStorage.setItem('bl_shop_owned', JSON.stringify(o)); }

function buyShopItem(id) {
  const item = SHOP_ITEMS.find(s => s.id === id);
  if (!item) return;
  if (getGold() < item.cost) { showNotif('[ SHOP ] Not enough gold!'); return; }

  const html = '<div style="text-align:center;padding:8px 0">'
    + '<div style="font-size:40px;margin-bottom:10px">' + item.icon + '</div>'
    + '<div style="font-size:15px;font-weight:600;color:var(--text);margin-bottom:6px">' + item.name + '</div>'
    + '<div style="font-size:12px;color:var(--text3);margin-bottom:14px;line-height:1.5">' + item.desc + '</div>'
    + '<div style="font-family:var(--font-hud);font-size:18px;color:var(--gold);margin-bottom:16px">🪙 ' + item.cost + ' gold</div>'
    + '<div style="display:flex;gap:10px">'
    + '<button onclick="closeBottomSheet()" style="flex:1;padding:13px;background:transparent;border:1px solid var(--border);border-radius:8px;color:var(--text3);font-family:var(--font-hud);font-size:12px;cursor:pointer">CANCEL</button>'
    + '<button onclick="closeBottomSheet();confirmBuy(\'' + id + '\')" style="flex:2;padding:13px;background:rgba(240,192,64,0.15);border:1px solid var(--gold);border-radius:8px;color:var(--gold);font-family:var(--font-hud);font-size:13px;font-weight:700;cursor:pointer">🪙 CONFIRM PURCHASE</button>'
    + '</div></div>';

  if (typeof showBottomSheet === 'function') showBottomSheet('Purchase Item', html);
}

function confirmBuy(id) {
  const item = SHOP_ITEMS.find(s => s.id === id);
  if (!item) return;
  if (!spendGold(item.cost)) { showNotif('[ SHOP ] Not enough gold!'); return; }

  const owned = getOwnedItems();
  owned[id]   = (owned[id] || 0) + 1;
  saveOwnedItems(owned);

  refreshGoldHUD();
  showNotif('[ SHOP ] ' + item.name + ' purchased! Check Your Items.', 'gold');
  if (typeof renderShopPage === 'function') renderShopPage();
}

function useShopItem(id) {
  const owned = getOwnedItems();
  if (!owned[id] || owned[id] <= 0) return;

  if (id === 'class_token')   { useClassToken();   return; }
  if (id === 'xp_boost')      { useXPBoost();      return; }
  if (id === 'extra_skip')    { useExtraSkip();    return; }
  if (id === 'stat_reset')    { useStatReset();    return; }
  if (id === 'name_change')   { useNameChange();   return; }
  if (id === 'gold_quest')    { useGoldQuest();    return; }
  if (id === 'streak_shield') { useStreakShield(); return; }
}

function _consumeItem(id) {
  const owned = getOwnedItems();
  if (!owned[id] || owned[id] <= 0) return false;
  owned[id]--;
  if (owned[id] <= 0) delete owned[id];
  saveOwnedItems(owned);
  return true;
}

// ── ITEM EFFECTS ──────────────────────────────────────
function useClassToken() {
  const classes = [
    { id:'fighter',  icon:'⚔️',  name:'Fighter',  desc:'STR focused — high attack power' },
    { id:'mage',     icon:'🔮',  name:'Mage',     desc:'INT focused — mental mastery' },
    { id:'assassin', icon:'🗡️', name:'Assassin', desc:'AGI focused — speed and precision' },
    { id:'tank',     icon:'🛡️', name:'Tank',     desc:'VIT focused — endurance and defense' },
    { id:'ranger',   icon:'🏹',  name:'Ranger',   desc:'SENSE focused — awareness and balance' },
  ];
  const html = '<div style="margin-bottom:4px">'
    + '<div style="font-family:var(--font-mono);font-size:9px;color:var(--purple);letter-spacing:2px;text-align:center;margin-bottom:12px">SELECT YOUR NEW CLASS</div>'
    + classes.map(c => `
        <div onclick="closeBottomSheet();confirmClassChange('${c.id}')" style="
          display:flex;align-items:center;gap:12px;padding:12px;margin-bottom:6px;
          background:var(--bg3);border:1px solid var(--border);border-radius:8px;cursor:pointer;
        " onmouseover="this.style.borderColor='var(--accent)'" onmouseout="this.style.borderColor='var(--border)'">
          <div style="font-size:24px;width:36px;text-align:center">${c.icon}</div>
          <div>
            <div style="font-size:14px;font-weight:600;color:var(--text)">${c.name}</div>
            <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3)">${c.desc}</div>
          </div>
        </div>
      `).join('')
    + '</div>';
  if (typeof showBottomSheet === 'function') showBottomSheet('Class Change Token 🎭', html);
}

function confirmClassChange(newClass) {
  if (!_consumeItem('class_token')) return;
  HUNTER.class = newClass;
  // Apply class stat bonuses
  if (typeof CLASS_BONUSES !== 'undefined' && CLASS_BONUSES[newClass]) {
    const bonus = CLASS_BONUSES[newClass];
    Object.entries(bonus).forEach(([stat, val]) => {
      HUNTER.stats[stat] = Math.max(10, (HUNTER.stats[stat] || 10) + val);
    });
  }
  persist();
  refreshHUD();
  if (typeof renderStatusPage === 'function') renderStatusPage();
  showNotif('[ CLASS CHANGE ] You are now a ' + newClass.toUpperCase() + '!', 'gold');
  renderShopPage();
}

function useXPBoost() {
  if (!_consumeItem('xp_boost')) return;
  const expires = Date.now() + 86400000; // 24h
  localStorage.setItem('bl_xp_boost', String(expires));
  showNotif('[ BOOST ] XP ×2 active for 24 hours!', 'gold');
  renderShopPage();
}

function getXPMultiplier() {
  try {
    const exp = parseInt(localStorage.getItem('bl_xp_boost') || '0');
    return (exp && Date.now() < exp) ? 2 : 1;
  } catch { return 1; }
}

function useExtraSkip() {
  if (!_consumeItem('extra_skip')) return;
  // Grant +1 extra skip this week
  const data    = typeof getSkipData === 'function' ? getSkipData() : {};
  const weekKey = typeof getWeekKey_skip === 'function' ? getWeekKey_skip() : '';
  data.weekKey  = weekKey;
  data.used     = false; // reset so they can use it again
  localStorage.setItem('bl_quest_skip', JSON.stringify(data));
  showNotif('[ SKIP ] Extra skip token granted!', 'gold');
  if (typeof renderQuestsPage === 'function') renderQuestsPage();
  renderShopPage();
}

function useStatReset() {
  if (!_consumeItem('stat_reset')) return;
  // Reset all stats to base 10 and let player know to visit Status
  Object.keys(HUNTER.stats).forEach(k => { HUNTER.stats[k] = 10; });
  persist();
  showNotif('[ RESET ] Stats reset to base 10. Earn XP to rebuild!', 'gold');
  renderShopPage();
}

function useNameChange() {
  if (typeof showBottomSheet !== 'function') return;
  const html = '<div>'
    + '<label style="font-family:var(--font-mono);font-size:9px;color:var(--text3);display:block;margin-bottom:8px;letter-spacing:2px">NEW HUNTER NAME</label>'
    + '<input type="text" id="shop-name-input" class="sys-input" placeholder="Enter new name..." maxlength="20" style="margin-bottom:14px"/>'
    + '<button onclick="const n=document.getElementById(\'shop-name-input\')?.value.trim();if(!n)return;closeBottomSheet();applyNameChange(n);" style="width:100%;padding:13px;background:rgba(96,165,250,0.15);border:1px solid #60a5fa;border-radius:8px;color:#60a5fa;font-family:var(--font-hud);font-size:13px;cursor:pointer">✓ CONFIRM</button>'
    + '</div>';
  showBottomSheet('Hunter Name Change ✏️', html);
}

function applyNameChange(newName) {
  if (!_consumeItem('name_change')) return;
  if (typeof saveSettings === 'function') saveSettings({ hunterName: newName });
  if (HUNTER) HUNTER.name = newName;
  persist();
  refreshHUD();
  showNotif('[ NAME ] Hunter name changed to ' + newName.toUpperCase() + '!', 'gold');
  renderShopPage();
}

function useGoldQuest() {
  if (!_consumeItem('gold_quest')) return;
  // Add a special gold quest to today's list
  if (HUNTER && HUNTER.quests) {
    HUNTER.quests.push({
      id:       'gold_quest_' + Date.now(),
      name:     '🏆 Bonus: Complete any physical activity (20 min)',
      xp:       40,
      stat:     'str',
      category: 'strength',
      icon:     '🏆',
      done:     false,
      goldReward: 20,
    });
    persist();
    if (typeof renderQuestsPage === 'function') renderQuestsPage();
    showNotif('[ BONUS ] Gold quest added to today\'s list!', 'gold');
  }
  renderShopPage();
}

function useStreakShield() {
  if (!_consumeItem('streak_shield')) return;
  localStorage.setItem('bl_streak_shield', String(Date.now() + 86400000));
  showNotif('[ SHIELD ] Streak protected for 24 hours!', 'gold');
  renderShopPage();
}
