// Web Audio API synthesized audio cues for rest timer and milestones
// 100% offline, zero external asset dependencies

class SoundManager {
  private ctx: AudioContext | null = null;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  /**
   * Pleasant double chime when a rest interval completes
   */
  playTimerDone(): void {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // First chime (A5 - 880 Hz)
    this.playTone(ctx, 880, now, 0.25, 'sine');
    // Second chime (C#6 - 1108 Hz)
    this.playTone(ctx, 1108, now + 0.15, 0.45, 'sine');
  }

  /**
   * Subtle tick for 3, 2, 1 countdown
   */
  playCountdownTick(): void {
    const ctx = this.getContext();
    if (!ctx) return;
    this.playTone(ctx, 660, ctx.currentTime, 0.08, 'sine', 0.15);
  }

  /**
   * Rewarding completion chord when an entire workout is finished
   */
  playWorkoutComplete(): void {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 (Major triad)

    notes.forEach((freq, idx) => {
      this.playTone(ctx, freq, now + idx * 0.1, 0.6, 'triangle', 0.25);
    });
  }

  private playTone(
    ctx: AudioContext,
    frequency: number,
    startTime: number,
    duration: number,
    type: OscillatorType = 'sine',
    maxVolume: number = 0.3
  ): void {
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(frequency, startTime);

      // Smooth attack and decay envelope
      gain.gain.setValueAtTime(0.001, startTime);
      gain.gain.exponentialRampToValueAtTime(maxVolume, startTime + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + duration + 0.05);
    } catch {
      // Audio might be blocked if user hasn't interacted yet
    }
  }
}

export const soundManager = new SoundManager();
