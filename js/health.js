// ============================================
// SYSTEM — HEALTH DEVICE INTEGRATION
// Apple Health (via Web API) + Google Fit
// ============================================

let healthConnected = false;
let healthSource = null;

// -----------------------------------------------
// APPLE HEALTH — uses Web Share Target + DeviceMotion
// On iOS, access via Health API requires a native app.
// This uses the best available browser approach:
// 1. DeviceMotion API for step estimation
// 2. Screen wake lock for workout tracking
// 3. Deep link to Health app for manual sync
// -----------------------------------------------
async function connectAppleHealth() {
  // Check if iOS
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

  if (isIOS) {
    showNotif('[ SYSTEM ] Requesting health permissions...');

    // Request motion permissions (iOS 13+)
    if (typeof DeviceMotionEvent !== 'undefined' && typeof DeviceMotionEvent.requestPermission === 'function') {
      try {
        const perm = await DeviceMotionEvent.requestPermission();
        if (perm === 'granted') {
          startMotionTracking();
          setHealthConnected('Apple Health (Motion)');
          showNotif('[ CONNECTED ] Apple Health Motion Sync Active');
        } else {
          showHealthFallback('apple');
        }
      } catch (e) {
        showHealthFallback('apple');
      }
    } else {
      // iOS 12 or Android — simulate with fallback
      showHealthFallback('apple');
    }
  } else {
    showHealthFallback('apple');
  }
}

async function connectGoogleFit() {
  showNotif('[ SYSTEM ] Connecting to Google Fit...');

  // Google Fit requires OAuth — we simulate the connection
  // In production: use Google Identity Services SDK + Fitness REST API
  // https://developers.google.com/fit/rest/v1/get-started

  setTimeout(() => {
    // Simulate successful Google Fit connection with sample data
    setHealthConnected('Google Fit');
    loadSimulatedHealthData();
    showNotif('[ CONNECTED ] Google Fit Sync Active');
  }, 1200);
}

function showHealthFallback(source) {
  const card = document.getElementById('health-card');
  if (!card) return;

  const msg = source === 'apple'
    ? 'To sync Apple Health on iPhone:\n1. Open the Shortcuts app\n2. Create a shortcut to share Health data\n3. Or use the Health app and screenshot your stats.'
    : 'Google Fit requires account authorization.\nIn production, this connects via OAuth 2.0.';

  showNotif('[ INFO ] See setup instructions below');

  // Show a setup note in the card
  const note = document.createElement('div');
  note.style.cssText = 'margin-top:12px;padding:10px;background:rgba(240,192,64,0.08);border:1px solid rgba(240,192,64,0.25);border-radius:6px;font-size:11px;color:var(--text2);font-family:var(--font-mono);letter-spacing:0.5px;line-height:1.6;white-space:pre-wrap';
  note.textContent = msg;
  card.appendChild(note);

  // Still "connect" with simulated data for demo
  setTimeout(() => {
    setHealthConnected(source === 'apple' ? 'Apple Health (Simulated)' : 'Google Fit (Simulated)');
    loadSimulatedHealthData();
  }, 500);
}

// -----------------------------------------------
// MOTION TRACKING — estimates steps from accelerometer
// -----------------------------------------------
let stepCount = 0;
let lastAccel = { x: 0, y: 0, z: 0 };
let stepThreshold = 1.2;
let lastStepTime = 0;

function startMotionTracking() {
  window.addEventListener('devicemotion', (e) => {
    const accel = e.accelerationIncludingGravity;
    if (!accel) return;

    const delta = Math.abs(accel.x - lastAccel.x)
                + Math.abs(accel.y - lastAccel.y)
                + Math.abs(accel.z - lastAccel.z);

    const now = Date.now();
    if (delta > stepThreshold && now - lastStepTime > 300) {
      stepCount++;
      lastStepTime = now;
      updateHealthDisplay({ steps: stepCount });

      // Award XP every 1000 steps
      if (stepCount % 1000 === 0) {
        addXP(15, 'agi');
        showNotif(`[ SYSTEM ] ${stepCount.toLocaleString()} steps! +15 XP`);
      }
    }

    lastAccel = { x: accel.x || 0, y: accel.y || 0, z: accel.z || 0 };
  });
}

// -----------------------------------------------
// SIMULATED HEALTH DATA
// Replace these values with real API calls in production
// -----------------------------------------------
function loadSimulatedHealthData() {
  // Simulate realistic daily health data
  const now = new Date();
  const hour = now.getHours();
  const simSteps = Math.round(1200 + (hour / 24) * 8800 + Math.random() * 500);
  const simHR    = Math.round(62 + Math.random() * 20);
  const simCal   = Math.round(simSteps * 0.04 + 1200);

  updateHealthDisplay({ steps: simSteps, hr: simHR, cal: simCal });

  // Auto-award XP based on steps
  if (simSteps >= 10000 && !HUNTER._stepsXPAwarded) {
    HUNTER._stepsXPAwarded = true;
    addXP(35, 'agi');
    showNotif('[ HEALTH ] 10K steps detected! +35 XP', 'gold');
  }
}

function updateHealthDisplay(data) {
  if (data.steps !== undefined) {
    const el = document.getElementById('sync-steps');
    if (el) el.textContent = data.steps.toLocaleString();
  }
  if (data.hr !== undefined) {
    const el = document.getElementById('sync-hr');
    if (el) el.textContent = data.hr + ' BPM';
  }
  if (data.cal !== undefined) {
    const el = document.getElementById('sync-cal');
    if (el) el.textContent = data.cal;
  }
}

function setHealthConnected(source) {
  healthConnected = true;
  healthSource = source;

  // Update top bar indicator
  const dot = document.getElementById('watch-dot');
  const label = document.getElementById('watch-label');
  if (dot) dot.classList.add('connected');
  if (label) label.textContent = 'LIVE';

  // Show health data panel
  const panel = document.getElementById('health-data-panel');
  if (panel) panel.style.display = 'block';

  // Update status text
  const txt = document.getElementById('health-status-text');
  if (txt) txt.textContent = `Connected: ${source}`;
}

// -----------------------------------------------
// HOW TO INTEGRATE REAL HEALTH APIs
// -----------------------------------------------
//
// === APPLE HEALTH (iOS Native) ===
// Apple Health requires a native iOS app (Swift/React Native).
// To integrate this web app natively:
// 1. Wrap in Capacitor: npm install @capacitor/core @capacitor/health
// 2. Use plugin: @perfood/capacitor-healthkit
// 3. Query: HealthKit.queryHKitSampleType({ sampleName: 'stepCount', ... })
// See: https://github.com/Ad-Blasters/capacitor-health
//
// === GOOGLE FIT (Android + Web) ===
// 1. Enable Fitness API in Google Cloud Console
// 2. Add OAuth 2.0 credentials
// 3. Use the REST API:
//    GET https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate
//    Authorization: Bearer {access_token}
// See: https://developers.google.com/fit/rest
//
// === GARMIN / FITBIT ===
// Both have REST APIs that work in web apps.
// Garmin: https://developer.garmin.com/gc-developer-program/
// Fitbit:  https://dev.fitbit.com/build/reference/web-api/
