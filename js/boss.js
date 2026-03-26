// ============================================
// SYSTEM — BOSS RAIDS & DUNGEONS
// Weekly boss challenges + dungeon runs
// ============================================

const BOSS_POOL = [
  {
    id: 'iron_giant',
    name: 'THE IRON GIANT',
    subtitle: 'Guardian of the Iron Gate',
    rank: 'B',
    color: '#60a5fa',
    hp: 1000,
    tasks: [
      { text: '200 push-ups (any time this week)', xp: 80,  stat: 'str', progress: 0, goal: 200 },
      { text: 'Run 15 km total this week',          xp: 100, stat: 'agi', progress: 0, goal: 15  },
      { text: 'Hit protein goal 5 days in a row',   xp: 80,  stat: 'vit', progress: 0, goal: 5   },
    ],
    reward: { xp: 400, item: 'Iron Will Badge', stat: 'str', statBonus: 5 },
    lore: 'An ancient construct that tests the limits of physical endurance. Only those who push beyond their limits may pass.',
  },
  {
    id: 'shadow_lurker',
    name: 'THE SHADOW LURKER',
    subtitle: 'Demon of the Mind Gate',
    rank: 'A',
    color: '#a855f7',
    hp: 1500,
    tasks: [
      { text: 'Meditate 7 days in a row',           xp: 100, stat: 'int',   progress: 0, goal: 7  },
      { text: 'Journal every day this week',         xp: 80,  stat: 'int',   progress: 0, goal: 7  },
      { text: 'Sleep before 10PM 5 nights',          xp: 80,  stat: 'sense', progress: 0, goal: 5  },
    ],
    reward: { xp: 600, item: 'Shadow Clarity Ring', stat: 'int', statBonus: 6 },
    lore: 'A demon born from neglected thoughts and restless minds. Defeat it by mastering your inner world.',
  },
  {
    id: 'crimson_beast',
    name: 'THE CRIMSON BEAST',
    subtitle: 'Warlord of the Crimson Keep',
    rank: 'S',
    color: '#ff3355',
    hp: 2500,
    tasks: [
      { text: 'Log 5 workouts this week',           xp: 120, stat: 'str', progress: 0, goal: 5   },
      { text: 'Walk 50,000 steps total',             xp: 120, stat: 'agi', progress: 0, goal: 50000 },
      { text: 'Zero sugar for 5 days',               xp: 100, stat: 'vit', progress: 0, goal: 5   },
      { text: 'Complete all daily quests 3 days',    xp: 100, stat: 'sense',progress: 0, goal: 3  },
    ],
    reward: { xp: 1000, item: 'Crimson Hunter Crest', stat: 'str', statBonus: 10 },
    lore: 'The most fearsome warlord of the red dungeons. Only S-Rank caliber hunters dare challenge it.',
  },
];

const DUNGEON_POOL = [
  {
    id: 'stone_cave',
    name: 'Stone Cave',
    rank: 'E',
    color: '#7aa0cc',
    floors: 3,
    description: 'A beginner dungeon. Good for fresh hunters.',
    challenges: [
      { text: '30 push-ups', xp: 15, stat: 'str' },
      { text: '20 squats', xp: 15, stat: 'str' },
      { text: 'Drink 1L water', xp: 10, stat: 'vit' },
    ],
  },
  {
    id: 'frost_cavern',
    name: 'Frost Cavern',
    rank: 'C',
    color: '#60a5fa',
    floors: 5,
    description: 'A mid-tier dungeon with icy trials.',
    challenges: [
      { text: '75 push-ups', xp: 30, stat: 'str' },
      { text: 'Run 2 km', xp: 35, stat: 'agi' },
      { text: 'Meditate 10 min', xp: 20, stat: 'int' },
      { text: 'Hit protein goal', xp: 25, stat: 'vit' },
      { text: 'Cold shower', xp: 20, stat: 'vit' },
    ],
  },
  {
    id: 'demon_castle',
    name: "Demon's Castle",
    rank: 'A',
    color: '#a855f7',
    floors: 7,
    description: 'A brutal dungeon for advanced hunters only.',
    challenges: [
      { text: '150 push-ups', xp: 50, stat: 'str' },
      { text: '100 squats', xp: 50, stat: 'str' },
      { text: 'Run 5 km', xp: 60, stat: 'agi' },
      { text: 'Fast for 16 hours', xp: 50, stat: 'vit' },
      { text: 'Meditate 20 min', xp: 40, stat: 'int' },
      { text: 'Read for 1 hour', xp: 35, stat: 'int' },
      { text: 'No phone for 3 hours', xp: 45, stat: 'sense' },
    ],
  },
];

// ===== BOSS RAID PAGE =====
function renderBossPage() {
  const el = document.getElementById('page-boss');
  const bossData = getBossData();
  const activeBoss = getActiveBoss(bossData);
  const dungeonData = getDungeonData();

  let html = `<div class="section-head">WEEKLY BOSS RAID</div>`;

  if (activeBoss) {
    const boss = BOSS_POOL.find(b => b.id === activeBoss.id);
    const totalTasks = boss.tasks.length;
    const doneTasks = activeBoss.tasks.filter(t => t.done).length;
    const hpPct = Math.round(((totalTasks - doneTasks) / totalTasks) * 100);

    html += `
      <div class="sys-card" style="border-color:${boss.color}44;margin-bottom:14px">
        <div style="position:absolute;top:0;left:0;right:0;height:2px;background:${boss.color};opacity:0.5"></div>
        <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:10px">
          <div>
            <div style="font-family:var(--font-mono);font-size:9px;color:${boss.color};letter-spacing:2px">${boss.rank}-RANK BOSS</div>
            <div style="font-family:var(--font-hud);font-size:18px;color:var(--text);letter-spacing:1px;margin-top:2px">${boss.name}</div>
            <div style="font-size:11px;color:var(--text3);margin-top:1px">${boss.subtitle}</div>
          </div>
          <div style="text-align:right">
            <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3)">HP</div>
            <div style="font-family:var(--font-hud);font-size:20px;color:var(--red)">${hpPct}%</div>
          </div>
        </div>

        <!-- HP Bar -->
        <div style="height:8px;background:rgba(255,51,85,0.1);border:1px solid rgba(255,51,85,0.3);border-radius:4px;overflow:hidden;margin-bottom:12px">
          <div style="height:100%;width:${hpPct}%;background:linear-gradient(90deg,#ff3355,#ff6680);border-radius:4px;transition:width 0.5s"></div>
        </div>

        <div style="font-size:12px;color:var(--text3);font-style:italic;margin-bottom:12px;padding:8px;background:rgba(0,0,0,0.2);border-radius:4px;border-left:2px solid ${boss.color}44">"${boss.lore}"</div>

        <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);letter-spacing:2px;margin-bottom:8px">RAID OBJECTIVES</div>
    `;

    boss.tasks.forEach((task, i) => {
      const taskState = activeBoss.tasks[i] || { done: false };
      html += `
        <div onclick="${taskState.done ? '' : `completeBossTask('${activeBoss.id}', ${i})`}"
          style="display:flex;align-items:center;gap:10px;padding:10px;
          background:${taskState.done ? 'rgba(0,229,160,0.05)' : 'rgba(0,0,0,0.2)'};
          border:1px solid ${taskState.done ? 'rgba(0,229,160,0.3)' : 'var(--border)'};
          border-radius:6px;margin-bottom:6px;cursor:${taskState.done ? 'default' : 'pointer'};
          opacity:${taskState.done ? '0.6' : '1'}">
          <div style="width:20px;height:20px;border-radius:4px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:11px;
            background:${taskState.done ? 'rgba(0,229,160,0.2)' : 'transparent'};
            border:1.5px solid ${taskState.done ? 'var(--green)' : 'var(--border2)'}">
            ${taskState.done ? '✓' : ''}
          </div>
          <div style="flex:1">
            <div style="font-size:13px;font-weight:600;color:${taskState.done ? 'var(--text3)' : 'var(--text)'};text-decoration:${taskState.done ? 'line-through' : 'none'}">${task.text}</div>
          </div>
          <span class="stat-pill pill-gold">+${task.xp} XP</span>
        </div>
      `;
    });

    if (doneTasks === totalTasks) {
      html += `
        <div style="text-align:center;padding:14px;background:rgba(240,192,64,0.08);border:1px solid var(--gold);border-radius:6px;margin-top:8px">
          <div style="font-family:var(--font-hud);font-size:14px;color:var(--gold);letter-spacing:2px">◆ BOSS DEFEATED ◆</div>
          <div style="font-family:var(--font-mono);font-size:10px;color:var(--text3);margin-top:4px">Reward: ${boss.reward.item} · +${boss.reward.xp} XP</div>
        </div>
      `;
    }

    html += `</div>`;
  } else {
    html += `
      <div class="sys-card" style="text-align:center;padding:24px">
        <div style="font-size:32px;margin-bottom:8px">⚔️</div>
        <div style="font-family:var(--font-hud);font-size:14px;color:var(--text);margin-bottom:8px">NO ACTIVE BOSS</div>
        <div style="font-family:var(--font-mono);font-size:10px;color:var(--text3);margin-bottom:16px;letter-spacing:1px">CHOOSE A RAID TO BEGIN</div>
        ${BOSS_POOL.map(b => `
          <button onclick="startBossRaid('${b.id}')" style="
            display:flex;align-items:center;gap:10px;width:100%;
            background:var(--bg3);border:1px solid ${b.color}44;
            border-radius:6px;padding:12px;margin-bottom:8px;cursor:pointer;
            text-align:left;transition:border-color 0.2s
          ">
            <div style="font-family:var(--font-mono);font-size:10px;color:${b.color};width:20px">${b.rank}</div>
            <div style="flex:1">
              <div style="font-family:var(--font-hud);font-size:13px;color:var(--text)">${b.name}</div>
              <div style="font-size:11px;color:var(--text3);margin-top:2px">${b.tasks.length} objectives · +${b.reward.xp} XP reward</div>
            </div>
            <div style="color:var(--text3);font-size:16px">›</div>
          </button>
        `).join('')}
      </div>
    `;
  }

  // DUNGEONS
  html += `<div class="section-head" style="margin-top:16px">DUNGEONS</div>`;

  DUNGEON_POOL.forEach(d => {
    const dData = dungeonData[d.id] || { completedFloors: 0, cleared: false };
    const floorPct = Math.round((dData.completedFloors / d.floors) * 100);

    html += `
      <div class="sys-card" style="border-color:${d.color}33;margin-bottom:10px">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">
          <div style="font-family:var(--font-mono);font-size:11px;color:${d.color};width:20px;font-weight:700">${d.rank}</div>
          <div style="flex:1">
            <div style="font-size:14px;font-weight:600;color:var(--text)">${d.name}</div>
            <div style="font-size:11px;color:var(--text3)">${d.description}</div>
          </div>
          <div style="text-align:right">
            <div style="font-family:var(--font-mono);font-size:10px;color:var(--text3)">${dData.completedFloors}/${d.floors}</div>
            <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3)">FLOORS</div>
          </div>
        </div>
        <div style="height:4px;background:rgba(255,255,255,0.05);border-radius:2px;overflow:hidden;margin-bottom:10px">
          <div style="height:100%;width:${floorPct}%;background:${d.color};border-radius:2px;transition:width 0.4s"></div>
        </div>
        ${dData.cleared
          ? `<div style="text-align:center;font-family:var(--font-mono);font-size:10px;color:var(--green);letter-spacing:2px">✓ CLEARED</div>`
          : `<button class="btn-secondary" style="width:100%;color:${d.color};border-color:${d.color}44" onclick="enterDungeon('${d.id}')">ENTER DUNGEON</button>`
        }
      </div>
    `;
  });

  el.innerHTML = html;
}

// ===== DUNGEON MODAL =====
function enterDungeon(id) {
  const dungeon = DUNGEON_POOL.find(d => d.id === id);
  const dungeonData = getDungeonData();
  const dData = dungeonData[id] || { completedFloors: 0, cleared: false };
  const nextFloor = dData.completedFloors;
  if (nextFloor >= dungeon.floors) return;
  const challenge = dungeon.challenges[nextFloor];

  const modal = document.createElement('div');
  modal.style.cssText = `
    position:fixed;inset:0;z-index:400;background:rgba(0,0,0,0.85);
    display:flex;align-items:center;justify-content:center;padding:24px;
  `;
  modal.innerHTML = `
    <div style="background:var(--bg2);border:1px solid ${dungeon.color}55;border-radius:12px;padding:24px;width:100%;max-width:360px;position:relative">
      <div style="font-family:var(--font-mono);font-size:9px;color:${dungeon.color};letter-spacing:3px;margin-bottom:4px">${dungeon.name.toUpperCase()} — FLOOR ${nextFloor + 1}</div>
      <div style="font-family:var(--font-hud);font-size:18px;color:var(--text);margin-bottom:12px">FLOOR CHALLENGE</div>
      <div style="padding:14px;background:rgba(0,0,0,0.3);border-radius:6px;border:1px solid var(--border);margin-bottom:16px">
        <div style="font-size:15px;font-weight:600;color:var(--text);margin-bottom:6px">${challenge.text}</div>
        <span class="stat-pill pill-gold">+${challenge.xp} XP</span>
      </div>
      <div style="display:flex;gap:8px">
        <button class="btn-secondary" style="flex:1" onclick="this.closest('div[style*=fixed]').remove()">RETREAT</button>
        <button class="btn-primary" style="flex:2" onclick="completeFloor('${id}', ${nextFloor}, this)"><span>COMPLETE</span><div class="btn-arrow">▶</div></button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
}

function completeFloor(dungeonId, floorIndex, btn) {
  const dungeon = DUNGEON_POOL.find(d => d.id === dungeonId);
  const challenge = dungeon.challenges[floorIndex];
  addXP(challenge.xp, challenge.stat);
  showNotif(`[ DUNGEON ] Floor ${floorIndex + 1} cleared! +${challenge.xp} XP`);

  const data = getDungeonData();
  if (!data[dungeonId]) data[dungeonId] = { completedFloors: 0, cleared: false };
  data[dungeonId].completedFloors = floorIndex + 1;
  if (floorIndex + 1 >= dungeon.floors) {
    data[dungeonId].cleared = true;
    addXP(100, 'sense');
    setTimeout(() => showNotif(`[ DUNGEON CLEARED ] ${dungeon.name}! +100 BONUS XP`, 'gold'), 800);
    addToInventory({ name: `${dungeon.name} Clear Badge`, type: 'badge', rarity: dungeon.rank, icon: '🏅' });
  }
  saveDungeonData(data);
  btn.closest('div[style*="position:fixed"]').remove();
  renderBossPage();
}

// ===== BOSS LOGIC =====
function startBossRaid(bossId) {
  const boss = BOSS_POOL.find(b => b.id === bossId);
  const data = getBossData();
  data.active = {
    id: bossId,
    tasks: boss.tasks.map(() => ({ done: false })),
    startDate: new Date().toLocaleDateString(),
  };
  saveBossData(data);
  renderBossPage();
  showNotif(`[ RAID ] ${boss.name} has appeared!`);
}

function completeBossTask(bossId, taskIndex) {
  const data = getBossData();
  const boss = BOSS_POOL.find(b => b.id === bossId);
  if (!data.active || data.active.id !== bossId) return;

  data.active.tasks[taskIndex].done = true;
  const task = boss.tasks[taskIndex];
  addXP(task.xp, task.stat);
  showNotif(`[ BOSS RAID ] Task cleared! +${task.xp} XP`);

  const allDone = data.active.tasks.every(t => t.done);
  if (allDone) {
    data.active.defeated = true;
    addXP(boss.reward.xp, boss.reward.stat);
    HUNTER.stats[boss.reward.stat] += boss.reward.statBonus;
    addToInventory({ name: boss.reward.item, type: 'reward', rarity: boss.rank, icon: '🏆' });
    persist();
    setTimeout(() => showNotif(`[ BOSS DEFEATED ] ${boss.name}! +${boss.reward.xp} XP · ${boss.reward.item} acquired!`, 'gold'), 400);
    data.active = null;
  }

  saveBossData(data);
  renderBossPage();
}

// ===== STORAGE =====
function getBossData() {
  try { return JSON.parse(localStorage.getItem('sys_boss_' + getCurrentUser()) || '{}'); }
  catch { return {}; }
}
function saveBossData(d) { localStorage.setItem('sys_boss_' + getCurrentUser(), JSON.stringify(d)); }
function getActiveBoss(data) { return data.active && !data.active.defeated ? data.active : null; }
function getDungeonData() {
  try { return JSON.parse(localStorage.getItem('sys_dungeons_' + getCurrentUser()) || '{}'); }
  catch { return {}; }
}
function saveDungeonData(d) { localStorage.setItem('sys_dungeons_' + getCurrentUser(), JSON.stringify(d)); }
