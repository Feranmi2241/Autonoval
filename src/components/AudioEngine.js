// Custom Synthesized Audio Engine for the AutoNova Portal
// Uses native Web Audio API to create responsive futuristic audio cues.

class AutoNovaAudioEngine {
  ctx = null;
  humOscillator = null;
  humGain = null;
  isMuted = true;
  humActive = false;

  constructor() {
    // Lazy initialization on first user interaction to comply with browser autoplay policies.
  }

  init() {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    } catch (e) {
      console.warn("Web Audio API not supported in this browser.", e);
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopDrivetrainHum();
    } else {
      this.startDrivetrainHum();
    }
    return this.isMuted;
  }

  getMuteState() {
    return this.isMuted;
  }

  // Synthesizes a high-precision futuristic tactile click
  playClick() {
    this.init();
    if (!this.ctx || this.isMuted) return;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    // Fast decay digital click
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1200, now);
    osc.frequency.exponentialRampToValueAtTime(150, now + 0.08);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.start(now);
    osc.stop(now + 0.09);
  }

  // Synthesizes a light hover tick
  playHover() {
    this.init();
    if (!this.ctx || this.isMuted) return;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(400, now + 0.03);

    gain.gain.setValueAtTime(0.02, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

    osc.start(now);
    osc.stop(now + 0.04);
  }

  // Synthesizes a futuristic premium chord upon completion/success
  playSuccess() {
    this.init();
    if (!this.ctx || this.isMuted) return;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    const now = this.ctx.currentTime;
    const notes = [261.63, 329.63, 392.00, 523.25, 659.25]; // C Major Chord (C4, E4, G4, C5, E5)
    
    notes.forEach((freq, index) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.type = 'sine';
      // Slight stagger for a beautiful arpeggio effect
      const noteStart = now + (index * 0.06);
      osc.frequency.setValueAtTime(freq, noteStart);
      
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.06, noteStart + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, noteStart + 1.2);

      osc.start(noteStart);
      osc.stop(noteStart + 1.3);
    });
  }

  // Synthesizes a subtle, continuous low-frequency drivetrain hum of an electric vehicle
  startDrivetrainHum() {
    this.init();
    if (!this.ctx || this.isMuted || this.humActive) return;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    const now = this.ctx.currentTime;
    this.humOscillator = this.ctx.createOscillator();
    this.humGain = this.ctx.createGain();

    // Low sub-bass sine wave layered with a subtle triangle overtone
    this.humOscillator.type = 'sine';
    this.humOscillator.frequency.setValueAtTime(48, now); // 48Hz deep electric hum

    this.humGain.gain.setValueAtTime(0, now);
    this.humGain.gain.linearRampToValueAtTime(0.04, now + 1.0); // Fade in over 1s

    this.humOscillator.connect(this.humGain);
    this.humGain.connect(this.ctx.destination);

    this.humOscillator.start(now);
    this.humActive = true;
  }

  // Modulates hum frequency based on a factor (e.g. cursor velocity or position 0.0 to 1.0)
  modulateHum(factor) {
    if (!this.ctx || this.isMuted || !this.humOscillator) return;
    const now = this.ctx.currentTime;
    // Map factor to hum pitch (48Hz to 96Hz)
    const targetFreq = 48 + (factor * 48);
    this.humOscillator.frequency.setTargetAtTime(targetFreq, now, 0.15);
  }

  stopDrivetrainHum() {
    if (!this.humOscillator || !this.humGain || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      this.humGain.gain.cancelScheduledValues(now);
      this.humGain.gain.setValueAtTime(this.humGain.gain.value, now);
      this.humGain.gain.exponentialRampToValueAtTime(0.001, now + 0.5); // Smooth fade-out
      
      const osc = this.humOscillator;
      setTimeout(() => {
        try {
          osc.stop();
        } catch (e) {}
      }, 600);
    } catch (e) {}
    
    this.humOscillator = null;
    this.humGain = null;
    this.humActive = false;
  }
}

export const AutoNovaAudio = new AutoNovaAudioEngine();
