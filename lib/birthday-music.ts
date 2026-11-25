// Playful kids'-pop loop (original tune) synthesised with the Web Audio API:
// bouncy toy-synth lead, oom-pah bass + chords, kick / clap / hats.
// If a local file exists at /audio/happy-birthday.mp3 it is used instead.
export const LOCAL_AUDIO_PATH = "/audio/happy-birthday.mp3";
const VOLUME = 0.2;
const BPM = 132;
const EIGHTH = 60 / BPM / 2;

// [midi, length in eighths]; 8 bars of 8 eighths, chords C | F | G | C, C | F | G | C
const MELODY: [number, number][] = [
  [76, 1], [76, 1], [79, 1], [76, 1], [72, 2], [67, 2],
  [77, 1], [77, 1], [81, 1], [77, 1], [72, 2], [69, 2],
  [74, 1], [74, 1], [79, 1], [74, 1], [71, 2], [67, 2],
  [72, 1], [76, 1], [79, 1], [84, 1], [79, 2], [72, 2],
  [84, 2], [79, 1], [76, 1], [79, 2], [76, 2],
  [81, 2], [77, 1], [74, 1], [77, 2], [72, 2],
  [79, 1], [79, 1], [83, 1], [79, 1], [74, 2], [71, 2],
  [84, 1], [83, 1], [84, 1], [79, 1], [76, 2], [72, 2],
];
const CHORDS: { root: number; triad: number[] }[] = [
  { root: 48, triad: [60, 64, 67] },
  { root: 53, triad: [60, 65, 69] },
  { root: 43, triad: [59, 62, 67] },
  { root: 48, triad: [60, 64, 67] },
];

export interface Player {
  play(): Promise<void>;
  pause(): void;
  dispose(): void;
}

export function createPlayer(): Player {
  let ctx: AudioContext | null = null;
  let master: GainNode | null = null;
  let tone: BiquadFilterNode | null = null;
  let timer: number | null = null;
  let pauseTimer: number | null = null;
  let audioEl: HTMLAudioElement | null = null;
  let useFile: boolean | null = null;
  let fadeRaf = 0;
  const buses = new Set<GainNode>();

  const freq = (m: number) => 440 * Math.pow(2, (m - 69) / 12);

  function tone1(bus: GainNode, m: number, t: number, dur: number, vel: number, type: OscillatorType, ring = 0.12) {
    if (!ctx) return;
    const o = ctx.createOscillator();
    o.type = type;
    o.frequency.value = freq(m);
    const g = ctx.createGain();
    const len = Math.max(0.08, dur) + ring;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(vel, t + 0.01);
    g.gain.exponentialRampToValueAtTime(vel * 0.4, t + Math.max(0.05, dur * 0.8));
    g.gain.exponentialRampToValueAtTime(0.0008, t + len);
    o.connect(g).connect(bus);
    o.start(t);
    o.stop(t + len + 0.05);
  }

  function noise(bus: GainNode, t: number, len: number, vel: number, hp: number) {
    if (!ctx) return;
    const buf = ctx.createBuffer(1, Math.ceil(ctx.sampleRate * len), ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / d.length);
    const src = ctx.createBufferSource();
    src.buffer = buf;
    const f = ctx.createBiquadFilter();
    f.type = "highpass";
    f.frequency.value = hp;
    const g = ctx.createGain();
    g.gain.value = vel;
    src.connect(f).connect(g).connect(bus);
    src.start(t);
  }

  function kick(bus: GainNode, t: number) {
    if (!ctx) return;
    const o = ctx.createOscillator();
    o.frequency.setValueAtTime(150, t);
    o.frequency.exponentialRampToValueAtTime(45, t + 0.12);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.5, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.18);
    o.connect(g).connect(bus);
    o.start(t);
    o.stop(t + 0.2);
  }

  function schedule() {
    if (!ctx || !master || !tone) return;
    const bus = ctx.createGain();
    bus.connect(tone);
    buses.add(bus);

    const t0 = ctx.currentTime + 0.1;
    let step = 0;
    MELODY.forEach(([m, len]) => {
      const t = t0 + step * EIGHTH;
      tone1(bus, m, t, len * EIGHTH * 0.9, 0.2, "square");
      tone1(bus, m + 12, t, len * EIGHTH * 0.7, 0.05, "triangle");
      step += len;
    });
    for (let i = 0; i < 64; i++) {
      const t = t0 + i * EIGHTH;
      const bar = Math.floor(i / 8) % 4;
      const beat = i % 8;
      const ch = CHORDS[bar];
      if (beat === 0 || beat === 4) {
        kick(bus, t);
        tone1(bus, ch.root, t, EIGHTH * 1.6, 0.32, "triangle", 0.1);
      }
      if (beat === 2 || beat === 6) {
        noise(bus, t, 0.14, 0.35, 1500);
        ch.triad.forEach((m) => tone1(bus, m, t, EIGHTH * 0.8, 0.07, "triangle", 0.05));
      }
      noise(bus, t, 0.04, 0.12, 7000);
    }

    const total = (64 * EIGHTH + 0.4) * 1000;
    timer = window.setTimeout(() => {
      timer = null;
      schedule();
    }, total - 200);
    window.setTimeout(() => {
      bus.disconnect();
      buses.delete(bus);
    }, total + 3000);
  }

  function clearTimers() {
    if (timer !== null) clearTimeout(timer);
    if (pauseTimer !== null) clearTimeout(pauseTimer);
    timer = pauseTimer = null;
    cancelAnimationFrame(fadeRaf);
  }

  function silenceBuses() {
    buses.forEach((b) => b.disconnect());
    buses.clear();
  }

  function fadeEl(to: number, done?: () => void) {
    cancelAnimationFrame(fadeRaf);
    const el = audioEl!;
    const from = el.volume;
    const start = performance.now();
    const step = (now: number) => {
      const k = Math.min(1, (now - start) / 2000);
      el.volume = from + (to - from) * k;
      if (k < 1) fadeRaf = requestAnimationFrame(step);
      else done?.();
    };
    fadeRaf = requestAnimationFrame(step);
  }

  return {
    async play() {
      if (useFile === null) {
        try {
          const r = await fetch(LOCAL_AUDIO_PATH, { method: "HEAD" });
          useFile =
            r.ok && (r.headers.get("content-type") ?? "").startsWith("audio");
        } catch {
          useFile = false;
        }
      }

      if (useFile) {
        audioEl ??= Object.assign(new Audio(LOCAL_AUDIO_PATH), {
          loop: true,
          volume: 0,
        });
        await audioEl.play();
        fadeEl(VOLUME);
        return;
      }

      if (pauseTimer !== null) {
        clearTimeout(pauseTimer);
        pauseTimer = null;
      }
      ctx ??= new AudioContext();
      if (!master) {
        master = ctx.createGain();
        master.gain.value = 0;
        // warm, rounded tone: roll off the buzzy top end
        tone = ctx.createBiquadFilter();
        tone.type = "lowpass";
        tone.frequency.value = 5200;
        tone.Q.value = 0.4;
        tone.connect(master);
        master.connect(ctx.destination);
      }
      await ctx.resume();

      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
      master.gain.linearRampToValueAtTime(VOLUME, ctx.currentTime + 2.5);

      if (timer === null) schedule();
    },

    pause() {
      if (audioEl) {
        fadeEl(0, () => audioEl?.pause());
        return;
      }
      if (!ctx || !master) return;
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
      master.gain.linearRampToValueAtTime(0, ctx.currentTime + 1);

      const c = ctx;
      pauseTimer = window.setTimeout(() => {
        pauseTimer = null;
        if (timer !== null) clearTimeout(timer);
        timer = null;
        silenceBuses(); // drop notes still queued so resume restarts cleanly
        void c.suspend();
      }, 1100);
    },

    dispose() {
      clearTimers();
      silenceBuses();
      audioEl?.pause();
      audioEl = null;
      void ctx?.close();
      ctx = master = tone = null;
    },
  };
}
