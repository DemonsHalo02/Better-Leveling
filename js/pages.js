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
      ${goalHit ? `<div style="text-align:center;font-family:var(--font-mono);font-size:10px;color:var(--green);margin-top:8px;letter-spacing:2px">◆ DAILY GOAL REACHED — STREAK ACTIVE ◆</div>` : `<div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);margin-top:6px">${goal - doneCount} more quest${goal-doneCount!==1?'s':''} to hit your daily goal</div>`}
    </div>

    <div class="section-head">ACTIVE QUESTS</div>
  `;

  HUNTER.quests.forEach((q, i) => {
    const catColor = {
      strength: '#00b4ff', cardio: '#00e5a0', nutrition: '#f0c040',
      mental: '#a855f7',   lifestyle: '#ff6b35', weekend: '#f0c040',
      surprise: '#ff3355'
    }[q.category] || '#7aa0cc';

    const isSurprise = q.category === 'surprise';
    const isWeekend  = q.category === 'weekend';

    html += `
      <div class="quest-card ${q.done ? 'quest-done' : ''}"
        onclick="${q.done ? `undoQuestConfirm(${i})` : `questConfirm(${i})`}"
        style="
          background:${isSurprise ? 'rgba(255,51,85,0.06)' : isWeekend ? 'rgba(240,192,64,0.06)' : 'var(--panel)'};
          border:1px solid ${q.done ? 'rgba(0,229,160,0.3)' : isSurprise ? 'rgba(255,51,85,0.4)' : isWeekend ? 'rgba(240,192,64,0.35)' : 'var(--border)'};
          border-radius:8px;padding:12px 14px;margin-bottom:8px;
          display:flex;align-items:center;gap:12px;
          cursor:pointer;
          opacity:${q.done ? '0.6' : '1'};
          transition:border-color 0.2s,opacity 0.2s;
          position:relative;overflow:hidden;
        ">
        <div style="position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,${catColor},transparent);opacity:${q.done ? '0.2' : '0.5'}"></div>
        <div style="
          width:38px;height:38px;border-radius:6px;flex-shrink:0;
          background:${q.done ? 'rgba(0,229,160,0.1)' : catColor + '18'};
          border:1px solid ${q.done ? 'rgba(0,229,160,0.4)' : catColor + '55'};
          display:flex;align-items:center;justify-content:center;font-size:18px;
        ">${q.done ? '✓' : q.icon}</div>
        <div style="flex:1;min-width:0">
          <div style="font-size:14px;font-weight:600;color:${q.done ? 'var(--text3)' : 'var(--text)'};text-decoration:${q.done ? 'line-through' : 'none'};white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${q.name}</div>
          <div style="display:flex;gap:6px;margin-top:4px;flex-wrap:wrap;align-items:center">
            <span class="stat-pill pill-accent">+${q.xp} XP</span>
            <span class="stat-pill" style="background:${catColor}18;border:1px solid ${catColor}44;color:${catColor}">${q.stat.toUpperCase()} ↑</span>
            ${isSurprise ? `<span class="stat-pill pill-red">SURPRISE</span>` : ''}
            ${isWeekend  ? `<span class="stat-pill pill-gold">WEEKEND</span>` : ''}
          </div>
        </div>
        <div style="font-size:13px;color:${q.done ? 'var(--text3)' : 'var(--border2)'};flex-shrink:0">
          ${q.done ? '↩' : '›'}
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

  el.innerHTML = html;
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
