// ============================================
// SYSTEM — SKILL TREE
// Unlock abilities as you level up
// ============================================

const SKILL_TREE = [
  // Tier 1 — Level 1+
  { id: 'iron_body',     name: 'Iron Body',       tier: 1, req: { level: 1  }, stat: 'vit', icon: '🛡️', color: '#00e5a0',
    desc: 'Your body hardens. +2 VIT permanently. Food log unlocked.',
    bonus: { stat: 'vit', amount: 2 } },
  { id: 'swift_step',    name: 'Swift Step',       tier: 1, req: { level: 1  }, stat: 'agi', icon: '⚡', color: '#f0c040',
    desc: 'You move faster. +2 AGI permanently. Step tracking bonus.',
    bonus: { stat: 'agi', amount: 2 } },
  { id: 'keen_mind',     name: 'Keen Mind',        tier: 1, req: { level: 1  }, stat: 'int', icon: '🧠', color: '#a855f7',
    desc: '+2 INT permanently. Mental quests give 25% more XP.',
    bonus: { stat: 'int', amount: 2 } },

  // Tier 2 — Level 5+
  { id: 'warriors_will', name: "Warrior's Will",   tier: 2, req: { level: 5, skill: 'iron_body' }, stat: 'str', icon: '⚔️', color: '#00b4ff',
    desc: 'Strength quests give +50% XP. +3 STR.',
    bonus: { stat: 'str', amount: 3 } },
  { id: 'shadow_step',   name: 'Shadow Step',      tier: 2, req: { level: 5, skill: 'swift_step' }, stat: 'agi', icon: '🌑', color: '#7aa0cc',
    desc: 'Cardio quests give +50% XP. +3 AGI.',
    bonus: { stat: 'agi', amount: 3 } },
  { id: 'insight',       name: 'Insight',          tier: 2, req: { level: 5, skill: 'keen_mind' }, stat: 'int', icon: '👁️', color: '#a855f7',
    desc: 'Streak bonuses doubled. +3 INT.',
    bonus: { stat: 'int', amount: 3 } },

  // Tier 3 — Level 10+
  { id: 'berserker',     name: 'Berserker Mode',   tier: 3, req: { level: 10, skill: 'warriors_will' }, stat: 'str', icon: '🔥', color: '#ff6b35',
    desc: 'Boss raid XP increased by 50%. +5 STR.',
    bonus: { stat: 'str', amount: 5 } },
  { id: 'phantom',       name: 'Phantom Form',     tier: 3, req: { level: 10, skill: 'shadow_step' }, stat: 'agi', icon: '👻', color: '#60a5fa',
    desc: 'Dungeon completion gives 2x XP. +5 AGI.',
    bonus: { stat: 'agi', amount: 5 } },
  { id: 'sovereign',     name: 'Sovereign Mind',   tier: 3, req: { level: 10, skill: 'insight' }, stat: 'int', icon: '👑', color: '#f0c040',
    desc: 'All XP gains +10%. +5 INT. +5 SENSE.',
    bonus: { stat: 'int', amount: 5 }, bonusExtra: { stat: 'sense', amount: 5 } },

  // Tier 4 — Level 20+
  { id: 'arise',         name: 'ARISE',            tier: 4, req: { level: 20, skill: 'sovereign' }, stat: 'sense', icon: '⭐', color: '#f0c040',
    desc: 'The ultimate skill. All stat gains doubled permanently. Shadow Army activated.',
    bonus: { stat: 'sense', amount: 10 } },
];

function renderSkillTree() {
  const el = document.getElementById('page-skills');
  const unlockedSkills = getUnlockedSkills();
  const tiers = [1, 2, 3, 4];

  let html = `
    <div class="section-head">SKILL TREE</div>
    <div style="background:var(--panel);border:1px solid var(--border);border-radius:8px;padding:10px;margin-bottom:14px;text-align:center">
      <div style="font-family:var(--font-mono);font-size:10px;color:var(--text3);letter-spacing:2px">SKILL POINTS AVAILABLE</div>
      <div style="font-family:var(--font-hud);font-size:28px;color:var(--gold)">${getSkillPoints()}</div>
    </div>
  `;

  tiers.forEach(tier => {
    const tierSkills = SKILL_TREE.filter(s => s.tier === tier);
    const tierLabels = ['FOUNDATION', 'AWAKENED', 'ELITE', 'TRANSCENDENT'];
    html += `
      <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);letter-spacing:3px;margin-bottom:8px;display:flex;align-items:center;gap:8px">
        TIER ${tier} — ${tierLabels[tier-1]}
        <div style="flex:1;height:1px;background:var(--border)"></div>
        <div style="font-size:10px;color:var(--text3)">LV ${[1,5,10,20][tier-1]}+</div>
      </div>
      <div style="display:grid;grid-template-columns:repeat(${tierSkills.length > 2 ? 3 : tierSkills.length},1fr);gap:8px;margin-bottom:16px">
    `;

    tierSkills.forEach(skill => {
      const unlocked = unlockedSkills.includes(skill.id);
      const canUnlock = checkSkillRequirements(skill, unlockedSkills);
      const points = getSkillPoints();

      html += `
        <div onclick="${(!unlocked && canUnlock && points > 0) ? `unlockSkill('${skill.id}')` : ''}"
          style="
            background:${unlocked ? `${skill.color}18` : canUnlock ? 'var(--panel)' : 'rgba(0,0,0,0.3)'};
            border:1px solid ${unlocked ? skill.color : canUnlock ? 'var(--border2)' : 'var(--border)'};
            border-radius:8px;padding:12px 8px;text-align:center;
            cursor:${(!unlocked && canUnlock && points > 0) ? 'pointer' : 'default'};
            opacity:${(!unlocked && !canUnlock) ? '0.4' : '1'};
            transition:all 0.2s;position:relative;overflow:hidden
          ">
          ${unlocked ? `<div style="position:absolute;top:4px;right:4px;font-size:9px;color:${skill.color}">✓</div>` : ''}
          <div style="font-size:22px;margin-bottom:6px">${skill.icon}</div>
          <div style="font-family:var(--font-ui);font-size:11px;font-weight:600;color:${unlocked ? skill.color : canUnlock ? 'var(--text)' : 'var(--text3)'};line-height:1.2">${skill.name}</div>
          ${!unlocked && canUnlock ? `<div style="font-family:var(--font-mono);font-size:9px;color:var(--gold);margin-top:4px">1 PT</div>` : ''}
          ${unlocked ? `<div style="font-family:var(--font-mono);font-size:9px;color:${skill.color};margin-top:4px">ACTIVE</div>` : ''}
        </div>
      `;
    });

    html += `</div>`;
  });

  // Skill detail on tap — show description
  html += `<div id="skill-detail" style="display:none"></div>`;

  el.innerHTML = html;

  // Add long-press to see skill details
  el.querySelectorAll('[onclick]').forEach((card, i) => {
    card.addEventListener('touchstart', () => {
      const skill = SKILL_TREE.filter((_, si) => si === i)[0];
    });
  });
}

function checkSkillRequirements(skill, unlockedSkills) {
  if (HUNTER.level < skill.req.level) return false;
  if (skill.req.skill && !unlockedSkills.includes(skill.req.skill)) return false;
  return true;
}

function unlockSkill(skillId) {
  const points = getSkillPoints();
  if (points < 1) { showNotif('[ SYSTEM ] No skill points available'); return; }

  const skill = SKILL_TREE.find(s => s.id === skillId);
  const unlocked = getUnlockedSkills();
  if (unlocked.includes(skillId)) return;

  unlocked.push(skillId);
  saveUnlockedSkills(unlocked);
  spendSkillPoint();

  // Apply bonus
  if (skill.bonus) {
    HUNTER.stats[skill.bonus.stat] = (HUNTER.stats[skill.bonus.stat] || 10) + skill.bonus.amount;
  }
  if (skill.bonusExtra) {
    HUNTER.stats[skill.bonusExtra.stat] = (HUNTER.stats[skill.bonusExtra.stat] || 10) + skill.bonusExtra.amount;
  }

  persist();
  showNotif(`[ SKILL UNLOCKED ] ${skill.name}!`, 'gold');

  if (skillId === 'arise') {
    setTimeout(() => triggerAriseSequence(), 500);
  }

  renderSkillTree();
  renderStatusPage();
}

function triggerAriseSequence() {
  const overlay = document.createElement('div');
  overlay.style.cssText = `position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,0.95);display:flex;align-items:center;justify-content:center;flex-direction:column;gap:16px`;
  overlay.innerHTML = `
    <div style="font-family:var(--font-hud);font-size:11px;color:var(--text3);letter-spacing:6px;animation:fadeInUp 0.5s 0s both">ULTIMATE SKILL</div>
    <div style="font-family:var(--font-hud);font-size:48px;font-weight:900;color:var(--gold);text-shadow:0 0 60px rgba(240,192,64,0.8);animation:fadeInUp 0.5s 0.5s both;letter-spacing:8px">ARISE</div>
    <div style="font-family:var(--font-mono);font-size:12px;color:var(--text2);animation:fadeInUp 0.5s 1s both;letter-spacing:2px">ALL STATS DOUBLED</div>
    <style>@keyframes fadeInUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:none}}</style>
  `;
  document.body.appendChild(overlay);
  setTimeout(() => { overlay.style.opacity='0';overlay.style.transition='opacity 0.8s'; setTimeout(()=>overlay.remove(),800); }, 3000);
}

// ===== SKILL POINT STORAGE =====
function getSkillPoints() {
  // 1 point per 5 levels
  const earned = Math.floor((HUNTER.level - 1) / 5);
  const spent = JSON.parse(localStorage.getItem('sys_sp_spent_' + getCurrentUser()) || '0');
  return Math.max(0, earned - spent);
}

function spendSkillPoint() {
  const key = 'sys_sp_spent_' + getCurrentUser();
  const spent = JSON.parse(localStorage.getItem(key) || '0');
  localStorage.setItem(key, JSON.stringify(spent + 1));
}

function getUnlockedSkills() {
  try { return JSON.parse(localStorage.getItem('sys_skills_' + getCurrentUser()) || '[]'); }
  catch { return []; }
}

function saveUnlockedSkills(skills) {
  localStorage.setItem('sys_skills_' + getCurrentUser(), JSON.stringify(skills));
}

// Check for bonus XP multipliers from skills
function getXPMultiplier(category) {
  const unlocked = getUnlockedSkills();
  let mult = 1.0;
  if (category === 'strength' && unlocked.includes('warriors_will')) mult *= 1.5;
  if (category === 'cardio'   && unlocked.includes('shadow_step'))   mult *= 1.5;
  if (unlocked.includes('sovereign')) mult *= 1.1;
  if (unlocked.includes('arise'))     mult *= 2.0;
  return mult;
}
