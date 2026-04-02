// ============================================
// BETTER LEVELING — UNIT CONVERTER v1
// Standalone calculator + live app unit switch
// Weight · Distance · Height · Volume · Temp
// ============================================

// ── CONVERSION DEFINITIONS ────────────────────────────
const CONVERTER_GROUPS = [
  {
    id:    'weight',
    name:  'Weight',
    icon:  '⚖️',
    color: 'var(--green)',
    units: [
      { id:'kg',  label:'Kilograms',  symbol:'kg'  },
      { id:'lbs', label:'Pounds',     symbol:'lbs' },
      { id:'g',   label:'Grams',      symbol:'g'   },
      { id:'oz',  label:'Ounces',     symbol:'oz'  },
      { id:'st',  label:'Stone',      symbol:'st'  },
    ],
    // All conversions go through kg as base
    toBase:   { kg:1, lbs:0.453592, g:0.001, oz:0.0283495, st:6.35029 },
    fromBase: { kg:1, lbs:2.20462,  g:1000,  oz:35.274,    st:0.157473 },
    decimals: { kg:2, lbs:1, g:0, oz:1, st:2 },
  },
  {
    id:    'distance',
    name:  'Distance',
    icon:  '📏',
    color: 'var(--accent)',
    units: [
      { id:'km',  label:'Kilometers', symbol:'km' },
      { id:'mi',  label:'Miles',      symbol:'mi' },
      { id:'m',   label:'Meters',     symbol:'m'  },
      { id:'ft',  label:'Feet',       symbol:'ft' },
      { id:'yd',  label:'Yards',      symbol:'yd' },
    ],
    toBase:   { km:1, mi:1.60934, m:0.001, ft:0.0003048, yd:0.0009144 },
    fromBase: { km:1, mi:0.621371, m:1000, ft:3280.84,   yd:1093.61   },
    decimals: { km:3, mi:3, m:1, ft:1, yd:1 },
  },
  {
    id:    'height',
    name:  'Height',
    icon:  '📐',
    color: 'var(--purple)',
    units: [
      { id:'cm',   label:'Centimeters', symbol:'cm'   },
      { id:'in',   label:'Inches',      symbol:'in'   },
      { id:'m',    label:'Meters',      symbol:'m'    },
      { id:'ftin', label:'Feet & In',   symbol:'ft'   },
    ],
    // base = cm
    toBase:   { cm:1, in:2.54, m:100, ftin:30.48 },
    fromBase: { cm:1, in:0.393701, m:0.01, ftin:0.0328084 },
    decimals: { cm:1, in:1, m:3, ftin:0 },
    special: {
      ftin: {
        fromCm: (cm) => {
          const totalIn = cm / 2.54;
          const ft = Math.floor(totalIn / 12);
          const inches = Math.round(totalIn % 12);
          return `${ft}' ${inches}"`;
        },
        toCm: (ftStr) => {
          // parse "5' 10" or "5.10" or just "70" inches
          const match = String(ftStr).match(/(\d+)['\s]+(\d+)/);
          if (match) return (parseInt(match[1]) * 12 + parseInt(match[2])) * 2.54;
          const num = parseFloat(ftStr);
          return num * 30.48; // treat as feet decimal
        },
      },
    },
  },
  {
    id:    'volume',
    name:  'Volume / Liquid',
    icon:  '💧',
    color: 'var(--accent)',
    units: [
      { id:'ml',  label:'Milliliters', symbol:'ml'    },
      { id:'L',   label:'Liters',      symbol:'L'     },
      { id:'floz',label:'Fl. Oz (US)', symbol:'fl oz' },
      { id:'cup', label:'Cups (US)',   symbol:'cup'   },
      { id:'tbsp',label:'Tablespoons', symbol:'tbsp'  },
      { id:'tsp', label:'Teaspoons',   symbol:'tsp'   },
    ],
    // base = ml
    toBase:   { ml:1, L:1000, floz:29.5735, cup:236.588, tbsp:14.7868, tsp:4.92892 },
    fromBase: { ml:1, L:0.001, floz:0.033814, cup:0.00422675, tbsp:0.067628, tsp:0.202884 },
    decimals: { ml:1, L:3, floz:2, cup:2, tbsp:1, tsp:1 },
  },
  {
    id:    'temp',
    name:  'Temperature',
    icon:  '🌡️',
    color: '#ff6b35',
    units: [
      { id:'c', label:'Celsius',    symbol:'°C' },
      { id:'f', label:'Fahrenheit', symbol:'°F' },
      { id:'k', label:'Kelvin',     symbol:'K'  },
    ],
    // Special — use custom converters
    special: {
      convert: (value, from, to) => {
        let c;
        if (from === 'c') c = value;
        else if (from === 'f') c = (value - 32) * 5/9;
        else if (from === 'k') c = value - 273.15;
        if (to === 'c') return +c.toFixed(2);
        if (to === 'f') return +(c * 9/5 + 32).toFixed(2);
        if (to === 'k') return +(c + 273.15).toFixed(2);
        return value;
      },
    },
  },
  {
    id:    'speed',
    name:  'Speed',
    icon:  '⚡',
    color: 'var(--gold)',
    units: [
      { id:'kmh',  label:'km/h',  symbol:'km/h'  },
      { id:'mph',  label:'mph',   symbol:'mph'   },
      { id:'ms',   label:'m/s',   symbol:'m/s'   },
      { id:'min_km', label:'min/km (pace)', symbol:'min/km' },
      { id:'min_mi', label:'min/mi (pace)', symbol:'min/mi' },
    ],
    // base = km/h
    toBase:   { kmh:1, mph:1.60934, ms:3.6, min_km: (v) => 60/v, min_mi: (v) => 60/v*1.60934 },
    fromBase: { kmh:1, mph:0.621371, ms:0.277778,
      min_km: (kmh) => { const m=60/kmh; const min=Math.floor(m); const sec=Math.round((m-min)*60); return `${min}:${String(sec).padStart(2,'0')}`; },
      min_mi: (kmh) => { const mph=kmh*0.621371; const m=60/mph; const min=Math.floor(m); const sec=Math.round((m-min)*60); return `${min}:${String(sec).padStart(2,'0')}`; },
    },
    special: { paceFields: ['min_km','min_mi'] },
  },
];

// ── STATE ─────────────────────────────────────────────
let _convGroup  = 'weight';
let _convFrom   = 'kg';
let _convTo     = 'lbs';
let _convValue  = '';

// ── RENDER CONVERTER PAGE ─────────────────────────────
function renderConverterPage() {
  const el = document.getElementById('page-converter');
  if (!el) return;

  const s     = getSettings();
  const imp   = isImperial();
  const group = CONVERTER_GROUPS.find(g => g.id === _convGroup) || CONVERTER_GROUPS[0];

  el.innerHTML = `
    <!-- APP UNIT TOGGLE (global) -->
    <div class="section-head">APP MEASUREMENT SYSTEM</div>
    <div style="background:var(--panel);border:1px solid var(--border);border-radius:8px;padding:14px;margin-bottom:14px">
      <div style="font-size:13px;color:var(--text);margin-bottom:4px;font-weight:600">Active system used throughout the app</div>
      <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);margin-bottom:10px;line-height:1.6">
        Weight: <strong style="color:var(--accent)">${weightLabel()}</strong> &nbsp;·&nbsp;
        Distance: <strong style="color:var(--accent)">${distLabel()}</strong> &nbsp;·&nbsp;
        Height: <strong style="color:var(--accent)">${heightLabel()}</strong> &nbsp;·&nbsp;
        Volume: <strong style="color:var(--accent)">${volumeLabel()}</strong>
      </div>
      <div style="display:flex;gap:8px">
        <button onclick="applySetting('units','metric')" style="
          flex:1;padding:10px;border-radius:8px;cursor:pointer;text-align:center;
          background:${!imp?'rgba(0,180,255,0.18)':'var(--bg3)'};
          border:1px solid ${!imp?'var(--accent)':'var(--border)'};
          color:${!imp?'var(--accent)':'var(--text3)'};
          font-family:var(--font-hud);font-size:11px;letter-spacing:1px;
        ">🌍 METRIC<br><span style="font-family:var(--font-mono);font-size:8px;opacity:0.7">kg · km · cm · ml</span></button>
        <button onclick="applySetting('units','imperial')" style="
          flex:1;padding:10px;border-radius:8px;cursor:pointer;text-align:center;
          background:${imp?'rgba(0,180,255,0.18)':'var(--bg3)'};
          border:1px solid ${imp?'var(--accent)':'var(--border)'};
          color:${imp?'var(--accent)':'var(--text3)'};
          font-family:var(--font-hud);font-size:11px;letter-spacing:1px;
        ">🇺🇸 IMPERIAL<br><span style="font-family:var(--font-mono);font-size:8px;opacity:0.7">lbs · mi · ft · fl oz</span></button>
      </div>
    </div>

    <!-- QUICK REFERENCE -->
    <div class="section-head">QUICK REFERENCE</div>
    <div style="background:var(--panel);border:1px solid var(--border);border-radius:8px;padding:12px;margin-bottom:14px">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px">
        ${[
          ['1 kg',    '2.205 lbs'],
          ['1 mile',  '1.609 km'],
          ['1 lb',    '453.6 g'],
          ['1 fl oz', '29.57 ml'],
          ['1 inch',  '2.54 cm'],
          ['1 cup',   '236.6 ml'],
          ['100°F',   '37.8°C'],
          ['1 stone', '6.35 kg'],
        ].map(([from, to]) => `
          <div style="display:flex;justify-content:space-between;align-items:center;padding:5px 8px;background:var(--bg3);border-radius:5px">
            <span style="font-family:var(--font-mono);font-size:10px;color:var(--text2)">${from}</span>
            <span style="font-family:var(--font-mono);font-size:9px;color:var(--text3)">→</span>
            <span style="font-family:var(--font-mono);font-size:10px;color:var(--accent)">${to}</span>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- CONVERTER CALCULATOR -->
    <div class="section-head">UNIT CONVERTER</div>

    <!-- Category tabs -->
    <div style="display:flex;gap:4px;margin-bottom:12px;overflow-x:auto;padding-bottom:2px;-webkit-overflow-scrolling:touch">
      ${CONVERTER_GROUPS.map(g => `
        <button onclick="setConvGroup('${g.id}')" style="
          padding:7px 12px;border-radius:20px;cursor:pointer;white-space:nowrap;flex-shrink:0;
          background:${_convGroup===g.id?'rgba(0,180,255,0.18)':'var(--bg3)'};
          border:1px solid ${_convGroup===g.id?'var(--accent)':'var(--border)'};
          color:${_convGroup===g.id?'var(--accent)':'var(--text3)'};
          font-family:var(--font-mono);font-size:10px;
        ">${g.icon} ${g.name}</button>
      `).join('')}
    </div>

    <!-- Converter card -->
    <div style="background:var(--panel);border:1px solid var(--border);border-radius:10px;padding:16px;margin-bottom:10px">
      <!-- Input -->
      <div style="margin-bottom:12px">
        <label style="font-family:var(--font-mono);font-size:9px;color:var(--text3);letter-spacing:2px;display:block;margin-bottom:6px">
          VALUE
        </label>
        <input type="number"
          id="conv-input"
          class="sys-input"
          placeholder="Enter value..."
          inputmode="decimal"
          value="${_convValue}"
          oninput="_convValue=this.value;updateConvResult()"
          style="font-size:20px;text-align:center;font-family:var(--font-hud)"
        />
      </div>

      <!-- From / To selectors -->
      <div style="display:grid;grid-template-columns:1fr 32px 1fr;gap:8px;align-items:center;margin-bottom:14px">
        <div>
          <label style="font-family:var(--font-mono);font-size:9px;color:var(--text3);letter-spacing:2px;display:block;margin-bottom:4px">FROM</label>
          <select id="conv-from" class="sys-input" onchange="_convFrom=this.value;updateConvResult()">
            ${group.units.map(u => `<option value="${u.id}" ${_convFrom===u.id?'selected':''}>${u.label} (${u.symbol})</option>`).join('')}
          </select>
        </div>
        <button onclick="swapConvUnits()" style="
          width:32px;height:32px;border-radius:50%;background:rgba(0,180,255,0.15);
          border:1px solid var(--accent);color:var(--accent);font-size:14px;
          cursor:pointer;display:flex;align-items:center;justify-content:center;
          margin-top:18px;
        ">⇄</button>
        <div>
          <label style="font-family:var(--font-mono);font-size:9px;color:var(--text3);letter-spacing:2px;display:block;margin-bottom:4px">TO</label>
          <select id="conv-to" class="sys-input" onchange="_convTo=this.value;updateConvResult()">
            ${group.units.map(u => `<option value="${u.id}" ${_convTo===u.id?'selected':''}>${u.label} (${u.symbol})</option>`).join('')}
          </select>
        </div>
      </div>

      <!-- Result -->
      <div id="conv-result" style="
        background:rgba(0,180,255,0.06);border:1px solid rgba(0,180,255,0.2);
        border-radius:8px;padding:14px;text-align:center;min-height:60px;
        display:flex;flex-direction:column;align-items:center;justify-content:center;
      ">
        <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);letter-spacing:2px;margin-bottom:4px">RESULT</div>
        <div id="conv-result-val" style="font-family:var(--font-hud);font-size:28px;color:var(--accent)">—</div>
        <div id="conv-result-label" style="font-family:var(--font-mono);font-size:10px;color:var(--text3);margin-top:2px"></div>
      </div>
    </div>

    <!-- All conversions table -->
    <div id="conv-all-table" style="display:none"></div>

    <!-- Fitness quick-conversions -->
    ${renderFitnessConversions(imp)}
  `;

  // Auto-set smart defaults based on active unit system
  _setSmartDefaults(group);
  updateConvResult();
}

function _setSmartDefaults(group) {
  const imp = isImperial();
  // Only set defaults if from/to don't match the group's units
  const ids = group.units.map(u => u.id);
  if (!ids.includes(_convFrom) || !ids.includes(_convTo)) {
    if (group.id === 'weight')   { _convFrom = imp ? 'lbs' : 'kg';  _convTo = imp ? 'kg'  : 'lbs'; }
    if (group.id === 'distance') { _convFrom = imp ? 'mi'  : 'km';  _convTo = imp ? 'km'  : 'mi';  }
    if (group.id === 'height')   { _convFrom = imp ? 'ftin': 'cm';  _convTo = imp ? 'cm'  : 'ftin';}
    if (group.id === 'volume')   { _convFrom = imp ? 'floz': 'ml';  _convTo = imp ? 'ml'  : 'floz';}
    if (group.id === 'temp')     { _convFrom = imp ? 'f'   : 'c';   _convTo = imp ? 'c'   : 'f';   }
    if (group.id === 'speed')    { _convFrom = 'kmh'; _convTo = 'mph'; }
  }
}

function setConvGroup(id) {
  _convGroup = id;
  _convValue = '';
  const group = CONVERTER_GROUPS.find(g => g.id === id);
  _setSmartDefaults(group);
  renderConverterPage();
}

function swapConvUnits() {
  const tmp  = _convFrom;
  _convFrom  = _convTo;
  _convTo    = tmp;
  renderConverterPage();
}

function updateConvResult() {
  const resEl   = document.getElementById('conv-result-val');
  const labelEl = document.getElementById('conv-result-label');
  const fromSel = document.getElementById('conv-from');
  const toSel   = document.getElementById('conv-to');

  if (fromSel) _convFrom = fromSel.value;
  if (toSel)   _convTo   = toSel.value;

  const val = parseFloat(_convValue);
  if (isNaN(val) || _convValue === '') {
    if (resEl)   resEl.textContent   = '—';
    if (labelEl) labelEl.textContent = '';
    return;
  }

  const group = CONVERTER_GROUPS.find(g => g.id === _convGroup);
  if (!group) return;

  let result;

  // Temperature special case
  if (group.special?.convert) {
    result = group.special.convert(val, _convFrom, _convTo);
    const toUnit = group.units.find(u => u.id === _convTo);
    if (resEl)   resEl.textContent   = result;
    if (labelEl) labelEl.textContent = toUnit?.label || '';
    return;
  }

  // Height ftin special case
  if (group.id === 'height' && (_convFrom === 'ftin' || _convTo === 'ftin')) {
    const sp = group.special?.ftin;
    if (_convFrom === 'ftin' && sp) {
      const cm = sp.toCm(val);
      if (_convTo === 'cm') {
        result = cm.toFixed(1);
        if (resEl) resEl.textContent = result + ' cm';
        if (labelEl) labelEl.textContent = 'Centimeters';
      } else if (_convTo === 'in') {
        result = (cm / 2.54).toFixed(1);
        if (resEl) resEl.textContent = result + ' in';
        if (labelEl) labelEl.textContent = 'Inches';
      } else if (_convTo === 'm') {
        result = (cm / 100).toFixed(3);
        if (resEl) resEl.textContent = result + ' m';
        if (labelEl) labelEl.textContent = 'Meters';
      } else {
        if (resEl) resEl.textContent = sp.fromCm(cm);
        if (labelEl) labelEl.textContent = "Feet & Inches";
      }
    } else if (_convTo === 'ftin' && sp) {
      // Convert to cm first, then to ftin
      const cm = val * (group.toBase[_convFrom] || 1);
      if (resEl) resEl.textContent = sp.fromCm(cm);
      if (labelEl) labelEl.textContent = 'Feet & Inches';
    }
    return;
  }

  // Speed pace fields
  if (group.special?.paceFields?.includes(_convTo)) {
    const toFn = group.fromBase[_convTo];
    if (typeof toFn === 'function') {
      const toBase = typeof group.toBase[_convFrom] === 'function'
        ? group.toBase[_convFrom](val)
        : val * (group.toBase[_convFrom] || 1);
      const out = toFn(toBase);
      if (resEl) resEl.textContent = out;
      if (labelEl) labelEl.textContent = group.units.find(u=>u.id===_convTo)?.label || '';
      return;
    }
  }

  // Standard conversion through base unit
  const toBase   = typeof group.toBase[_convFrom]   === 'function' ? group.toBase[_convFrom](val)    : val * (group.toBase[_convFrom] || 1);
  const fromBase = typeof group.fromBase[_convTo]   === 'function' ? group.fromBase[_convTo](toBase) : toBase * (group.fromBase[_convTo] || 1);
  const dec      = group.decimals?.[_convTo] ?? 2;
  const toUnit   = group.units.find(u => u.id === _convTo);

  result = parseFloat(fromBase.toFixed(dec));

  if (resEl)   resEl.textContent   = result.toLocaleString() + ' ' + (toUnit?.symbol || '');
  if (labelEl) labelEl.textContent = toUnit?.label || '';

  // Show all conversions
  renderAllConversions(val, group);
}

function renderAllConversions(val, group) {
  const tableEl = document.getElementById('conv-all-table');
  if (!tableEl) return;
  if (isNaN(val)) { tableEl.style.display = 'none'; return; }

  // Get base value from _convFrom
  let baseVal;
  if (group.special?.convert) { tableEl.style.display = 'none'; return; }
  if (group.id === 'height' && _convFrom === 'ftin' && group.special?.ftin) {
    baseVal = group.special.ftin.toCm(val);
  } else {
    const tb = group.toBase[_convFrom];
    baseVal  = typeof tb === 'function' ? tb(val) : val * (tb || 1);
  }

  const rows = group.units
    .filter(u => u.id !== _convFrom && !group.special?.paceFields?.includes(u.id))
    .map(u => {
      let disp;
      if (group.id === 'height' && u.id === 'ftin' && group.special?.ftin) {
        disp = group.special.ftin.fromCm(baseVal);
      } else {
        const fb  = group.fromBase[u.id];
        const num = typeof fb === 'function' ? fb(baseVal) : baseVal * (fb || 1);
        const dec = group.decimals?.[u.id] ?? 2;
        disp      = parseFloat(num.toFixed(dec)).toLocaleString() + ' ' + u.symbol;
      }
      return `
        <div style="display:flex;justify-content:space-between;align-items:center;padding:6px 10px;border-bottom:1px solid var(--border)">
          <span style="font-family:var(--font-mono);font-size:10px;color:var(--text3)">${u.label}</span>
          <span style="font-family:var(--font-hud);font-size:13px;color:var(--text)">${disp}</span>
        </div>
      `;
    }).join('');

  tableEl.style.display = 'block';
  tableEl.innerHTML = `
    <div style="background:var(--panel);border:1px solid var(--border);border-radius:8px;overflow:hidden;margin-bottom:10px">
      <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);letter-spacing:2px;padding:8px 10px;background:rgba(0,0,0,0.15)">
        ALL EQUIVALENTS FOR ${val} ${group.units.find(u=>u.id===_convFrom)?.symbol||''}
      </div>
      ${rows}
    </div>
  `;
}

// ── FITNESS QUICK CONVERSIONS ─────────────────────────
function renderFitnessConversions(imp) {
  const sections = [
    {
      title: 'Common Body Weights',
      icon:  '⚖️',
      rows: imp
        ? [ ['150 lbs','68.0 kg'],['160 lbs','72.6 kg'],['175 lbs','79.4 kg'],
            ['190 lbs','86.2 kg'],['200 lbs','90.7 kg'],['225 lbs','102.1 kg'] ]
        : [ ['60 kg','132.3 lbs'],['70 kg','154.3 lbs'],['80 kg','176.4 lbs'],
            ['90 kg','198.4 lbs'],['100 kg','220.5 lbs'],['110 kg','242.5 lbs'] ],
    },
    {
      title: 'Running Distances',
      icon:  '🏃',
      rows: imp
        ? [ ['1 mi','1.61 km'],['5 mi','8.05 km'],['10 mi','16.09 km'],
            ['Half marathon','21.10 km'],['Marathon','42.20 km'],['5K','3.11 mi'] ]
        : [ ['1 km','0.62 mi'],['5 km','3.11 mi'],['10 km','6.21 mi'],
            ['Half marathon','13.11 mi'],['Marathon','26.22 mi'],['100 m','328.1 ft'] ],
    },
    {
      title: 'Liquid & Water',
      icon:  '💧',
      rows: imp
        ? [ ['8 fl oz','236.6 ml'],['16 fl oz','473.2 ml'],['32 fl oz','946.4 ml'],
            ['64 fl oz','1.89 L'],['1 gallon','3.785 L'],['1 cup','8 fl oz'] ]
        : [ ['250 ml','8.45 fl oz'],['500 ml','16.9 fl oz'],['1 L','33.8 fl oz'],
            ['1.5 L','50.7 fl oz'],['2 L','67.6 fl oz'],['3 L','101.4 fl oz'] ],
    },
    {
      title: 'Body Temperatures',
      icon:  '🌡️',
      rows: [
        ['Normal (37°C)','98.6°F'],['Fever (38.5°C)','101.3°F'],
        ['High fever (40°C)','104°F'],['Room temp (20°C)','68°F'],
        ['Cold shower (15°C)','59°F'],['Hot bath (40°C)','104°F'],
      ],
    },
  ];

  return `
    <div class="section-head">FITNESS QUICK REFERENCE</div>
    ${sections.map(sec => `
      <div style="background:var(--panel);border:1px solid var(--border);border-radius:8px;margin-bottom:10px;overflow:hidden">
        <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);letter-spacing:2px;padding:8px 12px;background:rgba(0,0,0,0.15)">
          ${sec.icon} ${sec.title.toUpperCase()}
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:0">
          ${sec.rows.map(([a,b]) => `
            <div style="display:flex;justify-content:space-between;padding:7px 12px;border-bottom:1px solid var(--border)">
              <span style="font-family:var(--font-mono);font-size:10px;color:var(--text2)">${a}</span>
            </div>
            <div style="display:flex;justify-content:flex-end;padding:7px 12px;border-bottom:1px solid var(--border)">
              <span style="font-family:var(--font-mono);font-size:10px;color:var(--accent)">${b}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('')}
  `;
}
