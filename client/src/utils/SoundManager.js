export const SoundManager = {
  ctx: null,

  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
  },

  playTone(freq, type, duration, vol = 0.1) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
    gain.gain.setValueAtTime(vol, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + duration);
  },

  typeKey() {
    this.init();
    this.playTone(800, 'sine', 0.05, 0.05);
  },

  success() {
    this.init();
    this.playTone(600, 'sine', 0.1, 0.1);
    setTimeout(() => this.playTone(800, 'sine', 0.2, 0.1), 100);
  },

  error() {
    this.init();
    this.playTone(150, 'sawtooth', 0.3, 0.2);
  },

  gameOver() {
    this.init();
    this.playTone(400, 'triangle', 0.2, 0.1);
    setTimeout(() => this.playTone(300, 'triangle', 0.2, 0.1), 200);
    setTimeout(() => this.playTone(200, 'triangle', 0.4, 0.1), 400);
  },

  win() {
    this.init();
    this.playTone(500, 'sine', 0.1, 0.1);
    setTimeout(() => this.playTone(650, 'sine', 0.1, 0.1), 100);
    setTimeout(() => this.playTone(800, 'sine', 0.1, 0.1), 200);
    setTimeout(() => this.playTone(1000, 'sine', 0.3, 0.1), 300);
  }
};
