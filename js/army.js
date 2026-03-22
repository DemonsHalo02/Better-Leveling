// ============================================
// SYSTEM — SHADOW ARMY & INVENTORY
// ============================================

const SHADOW_SOLDIERS = [
  { id: 'iron',    name: 'Iron',    title: 'Soldier',   req: { questsCompleted: 5  }, icon: '⚔️',  color: '#7aa0cc', power: 100 },
  { id: 'tank',    name: 'Tank',    title: 'Knight',    req: { questsCompleted: 15 }, icon: '🛡️',  color: '#60a5fa', power: 300 },
  { id: 'swift',   name: 'Swift',   title: 'Assassin',  req: { totalWorkoutMin: 120 }, icon: '🗡️', color: '#00e5a0', power: 350 },
  { id: 'sage',    name: 'Sage',    title: 'Mage',      req: { level: 5            }, icon: '🔮',  color: '#a855f7', power: 400 },
  { id: 'hunter',  name: 'Hunter',  title: 'Ranger',    req: { streakDays: 7       }, icon: '🏹',  color: '#f0c040', power: 450 },
  { id: 'shadow',  name: 'Shadow',  title: 'General',   req: { level: 20           }, icon: '🌑',  color: '#ff6b35', power: 800 },
  { id: 'beru',    name: 'Beru',    title: 'Marshal',   req: { level: 50           }, icon: '🦋',  color: '#f0c040', power: 9999 },
];

// ===== SHADOW ARMY PAGE =====
function renderShadowArmy() {
  const el = document.getElementById('page-army');
  const raised = getRaisedShadows();
  const totalPower = raised.reduce((sum, id) => {
    const s = SHADOW_SOLDIERS.find(s => s.id === id);
    return sum + (s?.power || 0);
  }, 0);

  let html = `
    <div class="section-head">SHADOW ARMY</div>
    <div style="background:var(--panel);border:1px solid var(--border);border-radius:8px;padding:14px;margin-bottom:14px">
      <div style="display:flex;justify-content:space-around;text-align:center">
        <div>
          <div style="font-family:var(--font-hud);font-size:24px;color:var(--accent)">${raised.length}</div>
          <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3)">SOLDIERS</div>
        </div>
        <div style="width:1px;background:var(--border)"></div>
        <div>
          <div style="font-family:var(--font-hud);font-size:24px;color:var(--gold)">${totalPower.toLocaleString()}</div>
          <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3)">TOTAL POWER</div>
        </div>
        <div style="width:1px;background:var(--border)"></div>
        <div>
          <div style="font-family:var(--font-hud);font-size:24px;color:var(--purple)">${SHADOW_SOLDIERS.length - raised.length}</div>
          <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3)">REMAINING</div>
        </div>
      </div>
    </div>
  `;

  SHADOW_SOLDIERS.forEach(soldier => {
    const isRaised = raised.includes(soldier.id);
    const canRaise = checkSoldierReq(soldier.req);

    html += `
      <div onclick="${(!isRaised && canRaise) ? `raiseShadow('${soldier.id}')` : ''}"
        style="
          background:${isRaised ? `${soldier.color}12` : 'var(--panel)'};
          border:1px solid ${isRaised ? soldier.color + '55' : canRaise ? 'var(--border2)' : 'var(--border)'};
          border-radius:8px;padding:14px;margin-bottom:8px;
          display:flex;align-items:center;gap:12px;
          cursor:${(!isRaised && canRaise) ? 'pointer' : 'default'};
          opacity:${(!isRaised && !canRaise) ? '0.4' : '1'};
          position:relative;overflow:hidden
        ">
        ${isRaised ? `<div style="position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,${soldier.color},transparent)"></div>` : ''}
        <div style="
          width:46px;height:46px;border-radius:8px;flex-shrink:0;
          background:${isRaised ? `${soldier.color}20` : 'rgba(0,0,0,0.3)'};
          border:1px solid ${isRaised ? soldier.color + '66' : 'var(--border)'};
          display:flex;align-items:center;justify-content:center;font-size:22px
        ">${soldier.icon}</div>
        <div style="flex:1">
          <div style="display:flex;align-items:center;gap:6px">
            <span style="font-family:var(--font-hud);font-size:15px;color:${isRaised ? soldier.color : canRaise ? 'var(--text)' : 'var(--text3)'}">${soldier.name}</span>
            <span style="font-family:var(--font-mono);font-size:9px;color:var(--text3)">${soldier.title}</span>
          </div>
          <div style="font-family:var(--font-mono);font-size:10px;color:var(--text3);margin-top:3px">
            ${isRaised ? `POWER: ${soldier.power.toLocaleString()}` : getReqText(soldier.req)}
          </div>
        </div>
        ${isRaised
          ? `<span class="stat-pill pill-accent">RAISED</span>`
          : canRaise
          ? `<button style="background:rgba(0,180,255,0.1);border:1px solid var(--accent);border-radius:6px;color:var(--accent);font-family:var(--font-hud);font-size:11px;padding:6px 10px;cursor:pointer">ARISE</button>`
          : `<span style="font-family:var(--font-mono);font-size:9px;color:var(--text3)">LOCKED</span>`
        }
      </div>
    `;
  });

  el.innerHTML = html;
}

function checkSoldierReq(req) {
  if (req.level && HUNTER.level < req.level) return false;
  if (req.questsCompleted && (HUNTER.questsCompleted || 0) < req.questsCompleted) return false;
  if (req.totalWorkoutMin && (HUNTER.totalWorkoutMin || 0) < req.totalWorkoutMin) return false;
  if (req.streakDays && (HUNTER.streakDays || 0) < req.streakDays) return false;
  return true;
}

function getReqText(req) {
  if (req.level) return `Requires: Level ${req.level}`;
  if (req.questsCompleted) return `Requires: ${req.questsCompleted} quests completed`;
  if (req.totalWorkoutMin) return `Requires: ${req.totalWorkoutMin} min trained`;
  if (req.streakDays) return `Requires: ${req.streakDays}-day streak`;
  return 'Requirements not met';
}

function raiseShadow(id) {
  const soldier = SHADOW_SOLDIERS.find(s => s.id === id);
  const raised = getRaisedShadows();
  if (raised.includes(id)) return;
  raised.push(id);
  saveRaisedShadows(raised);
  addXP(50, 'sense');
  showNotif(`[ ARISE ] ${soldier.name} the ${soldier.title} has been raised!`, 'gold');
  renderShadowArmy();
}

function getRaisedShadows() {
  try { return JSON.parse(localStorage.getItem('sys_shadows_' + getCurrentUser()) || '[]'); }
  catch { return []; }
}
function saveRaisedShadows(s) { localStorage.setItem('sys_shadows_' + getCurrentUser(), JSON.stringify(s)); }

// Auto-check for new shadows after XP gain
function checkShadowUnlocks() {
  SHADOW_SOLDIERS.forEach(s => {
    const raised = getRaisedShadows();
    if (!raised.includes(s.id) && checkSoldierReq(s.req)) {
      showNotif(`[ SYSTEM ] ${s.name} the ${s.title} is ready to be raised!`);
    }
  });
}

// ===== INVENTORY =====
function renderInventory() {
  const el = document.getElementById('page-inventory');
  const inv = getInventory();
  const equipped = getEquipped();

  const rarityColors = { E: '#7aa0cc', D: '#4ade80', C: '#60a5fa', B: '#a78bfa', A: '#f59e0b', S: '#f0c040' };

  let html = `
    <div class="section-head">INVENTORY</div>
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:14px;padding:10px;background:var(--panel);border:1px solid var(--border);border-radius:6px">
      <span style="font-size:18px">🎒</span>
      <div style="flex:1">
        <div style="font-size:13px;font-weight:600;color:var(--text)">${inv.length} Items</div>
        <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3)">ITEMS COLLECTED FROM QUESTS & RAIDS</div>
      </div>
    </div>
  `;

  if (inv.length === 0) {
    html += `<div style="text-align:center;padding:30px;color:var(--text3);font-family:var(--font-mono);font-size:11px;letter-spacing:2px">INVENTORY EMPTY<br><br>Complete quests, boss raids,<br>and dungeons to earn items.</div>`;
  } else {
    const types = [...new Set(inv.map(i => i.type))];
    types.forEach(type => {
      const items = inv.filter(i => i.type === type);
      html += `
        <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);letter-spacing:2px;margin-bottom:8px;text-transform:uppercase">${type}S (${items.length})</div>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:14px">
      `;
      items.forEach((item, i) => {
        const rc = rarityColors[item.rarity] || '#7aa0cc';
        html += `
          <div style="
            background:${rc}12;border:1px solid ${rc}44;border-radius:8px;
            padding:12px 8px;text-align:center;position:relative
          ">
            <div style="font-size:24px;margin-bottom:4px">${item.icon}</div>
            <div style="font-size:10px;font-weight:600;color:var(--text);line-height:1.2">${item.name}</div>
            <div style="font-family:var(--font-mono);font-size:9px;color:${rc};margin-top:3px">${item.rarity}-RANK</div>
          </div>
        `;
      });
      html += `</div>`;
    });
  }

  // Default starter items
  if (inv.length === 0) {
    html += `
      <div style="margin-top:16px">
        <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);letter-spacing:2px;margin-bottom:8px">HOW TO EARN ITEMS</div>
        ${[
          ['◈', 'Complete all daily quests', 'Daily Clear Badge'],
          ['⚔️', 'Defeat a Boss Raid', 'Boss Trophy'],
          ['🏅', 'Clear a Dungeon', 'Dungeon Badge'],
          ['⭐', 'Unlock ARISE skill', 'Shadow Monarch Crest'],
        ].map(([icon, act, item]) => `
          <div style="display:flex;align-items:center;gap:10px;padding:8px;border-bottom:1px solid var(--border)">
            <span style="font-size:16px">${icon}</span>
            <div style="flex:1;font-size:12px;color:var(--text3)">${act}</div>
            <div style="font-family:var(--font-mono);font-size:9px;color:var(--gold)">${item}</div>
          </div>
        `).join('')}
      </div>
    `;
  }

  el.innerHTML = html;
}

function addToInventory(item) {
  const inv = getInventory();
  inv.push({ ...item, acquiredDate: new Date().toLocaleDateString() });
  localStorage.setItem('sys_inv_' + getCurrentUser(), JSON.stringify(inv));
}

function getInventory() {
  try { return JSON.parse(localStorage.getItem('sys_inv_' + getCurrentUser()) || '[]'); }
  catch { return []; }
}

function getEquipped() {
  try { return JSON.parse(localStorage.getItem('sys_equipped_' + getCurrentUser()) || '{}'); }
  catch { return {}; }
}
