// ============================================
// SYSTEM — SELFIMPROVE STUBS
// All rendering moved to newfeatures.js
// This file migrates old data keys and stubs
// out old functions so nothing crashes.
// ============================================

function getSleepLogs() {
  const key = 'sys_sleep_hunter';
  try {
    const old = localStorage.getItem('sys_sleep_' + getCurrentUser());
    if (old && !localStorage.getItem(key)) localStorage.setItem(key, old);
    return JSON.parse(localStorage.getItem(key) || '[]');
  } catch { return []; }
}

function getMoodLogs() {
  const key = 'sys_mood_hunter';
  try {
    const old = localStorage.getItem('sys_mood_' + getCurrentUser());
    if (old && !localStorage.getItem(key)) localStorage.setItem(key, old);
    return JSON.parse(localStorage.getItem(key) || '[]');
  } catch { return []; }
}

function getBodyLogs() {
  const key = 'sys_body_hunter';
  try {
    const old = localStorage.getItem('sys_body_' + getCurrentUser());
    if (old && !localStorage.getItem(key)) localStorage.setItem(key, old);
    return JSON.parse(localStorage.getItem(key) || '[]');
  } catch { return []; }
}

function getStudyLogs() {
  const key = 'sys_study_hunter';
  try {
    const old = localStorage.getItem('sys_study_' + getCurrentUser());
    if (old && !localStorage.getItem(key)) localStorage.setItem(key, old);
    return JSON.parse(localStorage.getItem(key) || '[]');
  } catch { return []; }
}

// Stubs — prevent crashes from any stale calls
function renderSleepTracker() {}
function renderMoodTracker() {}
function renderStudyTracker() {}
function renderBodyMeasurements() {}
