/* ============================================================================
   AETHER NOVA: ECLIPSE - MOTOR AUDITADO (PARTE 1 DE 5)
   ============================================================================ */

// Esta distribución utiliza guardado local; no requiere claves ni SDK de terceros.

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  });
}

const ERAS = [
  {
    name: "ÓRBITA DE EXODUS",
    bgTop: "#030612",
    bgBot: "#0b1a3d",
    nebula1: "rgba(0, 240, 255, 0.16)",
    nebula2: "rgba(0, 119, 255, 0.12)",
    rockMain: "#8d99ae",
    rockDark: "#2b2d42",
    chapter: "BITÁCORA ESTELAR • SECTOR 10",
    title: "LA FRONTERA QUEBRADA",
    story: "Has despejado el cinturón exterior de Exodus. Los sensores detectan fluctuaciones gravitacionales anómalas provenientes del núcleo interior: la Singularidad del Eclipse ha comenzado a despertar."
  },
  {
    name: "NEBULOSA ESMERALDA",
    bgTop: "#03120e",
    bgBot: "#093328",
    nebula1: "rgba(0, 255, 163, 0.18)",
    nebula2: "rgba(16, 185, 129, 0.12)",
    rockMain: "#52b788",
    rockDark: "#1b4332",
    chapter: "BITÁCORA ESTELAR • SECTOR 20",
    title: "ECOS EN LA NEBULOSA",
    story: "Entre las nubes ionizadas de Esmeralda, las flotas autónomas del Eclipse intentaron bloquear tu avance. El núcleo de tu caza ha absorbido energía estelar para duplicar su cadencia."
  },
  {
    name: "ABISMO CARMESÍ",
    bgTop: "#140309",
    bgBot: "#380919",
    nebula1: "rgba(255, 42, 109, 0.18)",
    nebula2: "rgba(220, 38, 38, 0.12)",
    rockMain: "#e05773",
    rockDark: "#591826",
    chapter: "BITÁCORA ESTELAR • SECTOR 30",
    title: "SANGRE DE ESTRELLAS",
    story: "Cruzas el cementerio de supernovas del Abismo Carmesí. Los restos radiactivos forjaron aleaciones hiperdensas, pero los ingenieros de la flota han recalibrado tus cañones de plasma."
  },
  {
    name: "CINTURÓN DE MAGNETARES",
    bgTop: "#0d041c",
    bgBot: "#260c47",
    nebula1: "rgba(168, 85, 247, 0.20)",
    nebula2: "rgba(126, 34, 206, 0.14)",
    rockMain: "#a67fd4",
    rockDark: "#3c1e5e",
    chapter: "BITÁCORA ESTELAR • SECTOR 40",
    title: "TORMENTA MAGNÉTICA",
    story: "Los campos electromagnéticos de este cuadrante desgarrarían cualquier nave convencional. Gracias al blindaje cuántico, has superado el cuarenta por ciento de la travesía."
  },
  {
    name: "CORONA SOLAR MUERTA",
    bgTop: "#170d02",
    bgBot: "#402506",
    nebula1: "rgba(255, 183, 3, 0.18)",
    nebula2: "rgba(249, 115, 22, 0.13)",
    rockMain: "#e6a545",
    rockDark: "#5c3a0a",
    chapter: "BITÁCORA ESTELAR • SECTOR 50",
    title: "EL ECUADOR DEL ECLIPSE",
    story: "Mitad del camino alcanzado. Las balizas antiguas confirman que una inteligencia hostil dirige los púlsares y agujeros negros hacia la Tierra. No hay vuelta atrás."
  },
  {
    name: "GRIETA CRIOGÉNICA",
    bgTop: "#02101a",
    bgBot: "#082f49",
    nebula1: "rgba(56, 189, 248, 0.20)",
    nebula2: "rgba(14, 165, 233, 0.14)",
    rockMain: "#90e0ef",
    rockDark: "#1d4e68",
    chapter: "BITÁCORA ESTELAR • SECTOR 60",
    title: "SILENCIO ABSOLUTO",
    story: "En el cero absoluto de la Grieta, los asteroides cristalinos reflejan cada disparo. Tu reactor Nova ahora canaliza rayos de antimateria capaces de perforar cualquier coraza."
  },
  {
    name: "FORJA DE PÚLSARES",
    bgTop: "#140319",
    bgBot: "#33083e",
    nebula1: "rgba(244, 63, 94, 0.20)",
    nebula2: "rgba(217, 70, 239, 0.14)",
    rockMain: "#e673a5",
    rockDark: "#4f1430",
    chapter: "BITÁCORA ESTELAR • SECTOR 70",
    title: "RADIACIÓN GAMMA",
    story: "Sobreviviste a los haces relativistas de la Forja. La vanguardia imperial del Eclipse se retira hacia el horizonte de sucesos central mientras tu nave alcanza fase de asalto pesado."
  },
  {
    name: "HORIZONTE DE SUCESOS",
    bgTop: "#06070d",
    bgBot: "#181b2e",
    nebula1: "rgba(129, 140, 248, 0.18)",
    nebula2: "rgba(99, 102, 241, 0.13)",
    rockMain: "#94a3b8",
    rockDark: "#1e293b",
    chapter: "BITÁCORA ESTELAR • SECTOR 80",
    title: "DONDE LA LUZ SE CURVA",
    story: "La gravedad aquí distorsiona el tiempo. Cada segundo equivale a horas en la Tierra. Tus sistemas de navegación cuántica mantienen el rumbo firme hacia el corazón oscuro."
  },
  {
    name: "SANTUARIO DEL VACÍO",
    bgTop: "#160803",
    bgBot: "#3d1609",
    nebula1: "rgba(251, 146, 60, 0.20)",
    nebula2: "rgba(234, 88, 12, 0.14)",
    rockMain: "#f59e0b",
    rockDark: "#6a1b09",
    chapter: "BITÁCORA ESTELAR • SECTOR 90",
    title: "ÚLTIMA LÍNEA DE DEFENSA",
    story: "Has derribado a los guardianes del Santuario. Solo diez sectores te separan del núcleo de la Singularidad. Tu caza ha alcanzado su forma definitiva de batalla."
  },
  {
    name: "NÚCLEO DEL ECLIPSE",
    bgTop: "#080214",
    bgBot: "#220545",
    nebula1: "rgba(45, 212, 191, 0.22)",
    nebula2: "rgba(168, 85, 247, 0.16)",
    rockMain: "#c4b5fd",
    rockDark: "#240046",
    chapter: "CRÓNICA FINAL • SECTOR 100",
    title: "AMANECER DE AETHER NOVA",
    story: "¡VICTORIA GALÁCTICA! Has destruido el corazón del Eclipse y sellado la Singularidad para siempre. Tu nombre queda grabado eternamente entre las estrellas como salvador de la humanidad."
  }
];

const SHIP_TYPES = {
  valkyrie: { name: "VALKYRIE", speed: 6.6, fireRate: 11, lives: 3, color: "#00f0ff", accent: "#0066ff" },
  viper:    { name: "VIPER-X",  speed: 8.4, fireRate: 8,  lives: 3, color: "#00ff9d", accent: "#059669" },
  titan:    { name: "TITÁN",    speed: 5.6, fireRate: 13, lives: 4, color: "#ffcc33", accent: "#ea580c", damage: 1.10 },
  wraith:   { name: "WRAITH",   speed: 8.0, fireRate: 9,  lives: 2, color: "#c084fc", accent: "#6d28d9", damage: 1.04, unlock: 10 },
  bastion:  { name: "BASTIÓN",  speed: 5.0, fireRate: 12, lives: 5, color: "#60a5fa", accent: "#1d4ed8", damage: 1.06, unlock: 20 },
  phoenix:  { name: "FÉNIX",    speed: 7.2, fireRate: 10, lives: 3, color: "#fb7185", accent: "#be123c", damage: 1.16, unlock: 35 },
  singularity:{ name: "SINGULARIDAD", speed: 6.2, fireRate: 10, lives: 4, color: "#a3e635", accent: "#4d7c0f", damage: 1.22, unlock: 50 },
  omega:    { name: "OMEGA",    speed: 7.4, fireRate: 8,  lives: 4, color: "#f8fafc", accent: "#7c3aed", damage: 1.28, unlock: 75 }
};

const canvas = document.getElementById("gameCanvas");
const IS_LOW_POWER = window.matchMedia("(max-width: 700px), (pointer: coarse)").matches;
const ctx = canvas.getContext("2d", { alpha: false, desynchronized: true });
let eraBackgroundCache = null;
let lastEraBackgroundKey = "";
let sectorBannerTimer = 0;
let bossIntroTimer = 0;
// Debe declararse antes de resizeCanvas(): esa función consulta player.
// Si se declara más abajo, la llamada inicial provoca un ReferenceError (TDZ)
// y detiene toda la inicialización del juego y de los botones.
let player = null;
let W = window.innerWidth;
let H = window.innerHeight;
let DPR = 1;
function resizeCanvas() {
  W = Math.max(320, window.innerWidth);
  H = Math.max(320, window.innerHeight);
  DPR = Math.min(window.devicePixelRatio || 1, IS_LOW_POWER ? 1.25 : 1.65);
  eraBackgroundCache = null;
  lastEraBackgroundKey = "";
  canvas.width = Math.round(W * DPR);
  canvas.height = Math.round(H * DPR);
  canvas.style.width = `${W}px`;
  canvas.style.height = `${H}px`;
  ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  if (player) { player.y = H - Math.max(125, Math.min(185, H * .19)); player.x = Math.max(28, Math.min(W - 28, player.x)); }
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas, { passive: true });

const SoundFX = {
  ctx: null,
  master: null,
  compressor: null,
  enabled: true,
  bgmTimer: null,
  musicEnabled: false,
  musicManuallyDisabled: false,
  step: 0,
  lastPlay: Object.create(null),
  noiseBuffer: null,
  init() {
    try {
      if (!this.ctx) {
        const AudioCtor = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtor) return;
        this.ctx = new AudioCtor({ latencyHint: "interactive" });
        this.master = this.ctx.createGain();
        this.master.gain.value = 0.72;
        this.compressor = this.ctx.createDynamicsCompressor();
        this.compressor.threshold.value = -18;
        this.compressor.knee.value = 18;
        this.compressor.ratio.value = 4;
        this.compressor.attack.value = 0.004;
        this.compressor.release.value = 0.22;
        this.master.connect(this.compressor);
        this.compressor.connect(this.ctx.destination);
        const length = Math.floor(this.ctx.sampleRate * 1.8);
        this.noiseBuffer = this.ctx.createBuffer(1, length, this.ctx.sampleRate);
        const data = this.noiseBuffer.getChannelData(0);
        let last = 0;
        for (let i = 0; i < length; i++) {
          // Ruido rosa aproximado: menos áspero que el ruido blanco.
          const white = Math.random() * 2 - 1;
          last = last * 0.985 + white * 0.015;
          data[i] = last * 3.2;
        }
      }
      if (this.ctx.state === "suspended") this.ctx.resume().catch(() => {});
    } catch (error) { console.warn("Audio no disponible:", error); }
  },
  tone({ frequency = 440, endFrequency = frequency, duration = .15, type = "sine",
         volume = .08, detune = 0, filter = null, destination = null, attack = .008 } = {}) {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const amp = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(Math.max(1, frequency), now);
    if (endFrequency !== frequency) {
      osc.frequency.exponentialRampToValueAtTime(Math.max(1, endFrequency), now + duration);
    }
    osc.detune.value = detune;
    amp.gain.setValueAtTime(.0001, now);
    amp.gain.exponentialRampToValueAtTime(Math.max(.0002, volume), now + attack);
    amp.gain.exponentialRampToValueAtTime(.0001, now + duration);
    let tail = amp;
    if (filter) {
      const f = this.ctx.createBiquadFilter();
      f.type = filter.type || "lowpass";
      f.frequency.setValueAtTime(filter.frequency || 1800, now);
      if (filter.endFrequency) f.frequency.exponentialRampToValueAtTime(filter.endFrequency, now + duration);
      tail.connect(f); tail = f;
    }
    tail.connect(destination || this.master);
    osc.connect(amp);
    osc.start(now);
    osc.stop(now + duration + .025);
  },
  noise({ duration = .2, volume = .08, frequency = 1200, endFrequency = 120,
          type = "lowpass", q = .7, destination = null } = {}) {
    if (!this.ctx || !this.noiseBuffer) return;
    const now = this.ctx.currentTime;
    const source = this.ctx.createBufferSource();
    const filter = this.ctx.createBiquadFilter();
    const amp = this.ctx.createGain();
    source.buffer = this.noiseBuffer;
    source.loop = true;
    filter.type = type;
    filter.Q.value = q;
    filter.frequency.setValueAtTime(frequency, now);
    filter.frequency.exponentialRampToValueAtTime(Math.max(30, endFrequency), now + duration);
    amp.gain.setValueAtTime(Math.max(.0001, volume), now);
    amp.gain.exponentialRampToValueAtTime(.0001, now + duration);
    source.connect(filter); filter.connect(amp); amp.connect(destination || this.master);
    source.start(now); source.stop(now + duration + .03);
  },
  play(type) {
    if (!this.enabled) return;
    const nowMs = performance.now();
    const cooldown = { laser: 62, missile: 130, hit: 95, boom: 120, targetHit: 38, shieldHit: 85, powerup: 90, supernova: 500 };
    if (nowMs - (this.lastPlay[type] || 0) < (cooldown[type] || 70)) return;
    this.lastPlay[type] = nowMs;
    this.init();
    if (!this.ctx || this.ctx.state !== "running" || !this.master) return;
    switch (type) {
      case "laser":
        // Disparo energético: ataque agudo, barrido descendente y pequeño chasquido.
        this.tone({ frequency: 1120, endFrequency: 310, duration: .105, type: "sawtooth", volume: .045, filter: { type: "lowpass", frequency: 3600, endFrequency: 950 } });
        this.tone({ frequency: 1780, endFrequency: 760, duration: .065, type: "sine", volume: .035, detune: -9 });
        break;
      case "missile":
        // Encendido del propulsor y lanzamiento con cuerpo grave.
        this.tone({ frequency: 125, endFrequency: 54, duration: .32, type: "sawtooth", volume: .11, filter: { type: "lowpass", frequency: 650, endFrequency: 170 } });
        this.noise({ duration: .24, volume: .045, frequency: 1900, endFrequency: 260 });
        this.tone({ frequency: 270, endFrequency: 720, duration: .16, type: "triangle", volume: .045 });
        break;
      case "hit":
        this.tone({ frequency: 185, endFrequency: 48, duration: .22, type: "triangle", volume: .14 });
        this.noise({ duration: .17, volume: .075, frequency: 1250, endFrequency: 160 });
        break;
      case "targetHit":
        // Impacto metálico breve al dañar un objetivo enemigo o un asteroide.
        this.tone({ frequency: 420, endFrequency: 115, duration: .105, type: "triangle", volume: .075 });
        this.noise({ duration: .075, volume: .035, frequency: 2600, endFrequency: 520, type: "bandpass", q: 1.2 });
        break;
      case "shieldHit":
        // Descarga cristalina y grave cuando el escudo absorbe un impacto.
        this.tone({ frequency: 760, endFrequency: 190, duration: .24, type: "sine", volume: .13 });
        this.tone({ frequency: 145, endFrequency: 62, duration: .2, type: "triangle", volume: .09 });
        this.noise({ duration: .16, volume: .055, frequency: 1800, endFrequency: 240 });
        break;
      case "boom":
        this.tone({ frequency: 105, endFrequency: 28, duration: .48, type: "sine", volume: .22 });
        this.tone({ frequency: 62, endFrequency: 25, duration: .55, type: "triangle", volume: .12 });
        this.noise({ duration: .42, volume: .12, frequency: 1900, endFrequency: 75 });
        break;
      case "supernova":
        this.tone({ frequency: 72, endFrequency: 18, duration: 1.15, type: "sine", volume: .30 });
        this.tone({ frequency: 46, endFrequency: 16, duration: 1.3, type: "triangle", volume: .19 });
        this.noise({ duration: 1.05, volume: .18, frequency: 950, endFrequency: 45 });
        this.tone({ frequency: 520, endFrequency: 72, duration: .72, type: "sawtooth", volume: .055, filter: { type: "lowpass", frequency: 1500, endFrequency: 120 } });
        break;
      case "powerup":
        // Confirmación ascendente en tres notas.
        this.tone({ frequency: 520, endFrequency: 720, duration: .12, type: "sine", volume: .075 });
        this.tone({ frequency: 780, endFrequency: 1040, duration: .16, type: "triangle", volume: .065 });
        this.tone({ frequency: 1040, endFrequency: 1480, duration: .22, type: "sine", volume: .055 });
        break;
    }
  },
  async activateMusicFromGesture() {
    this.musicEnabled = true;
    this.init();
    if (!this.ctx || !this.master) return false;
    try {
      if (this.ctx.state !== "running") await this.ctx.resume();
      if (this.ctx.state !== "running") return false;
      this.startMusic();
      const button = document.getElementById("btn-menu-music");
      if (button) {
        button.classList.add("is-playing");
        button.textContent = "♫ BANDA SONORA ACTIVADA";
        button.setAttribute("aria-pressed", "true");
      }
      return true;
    } catch (error) {
      console.warn("No se pudo iniciar la banda sonora:", error);
      return false;
    }
  },
  startMusic() {
    this.musicEnabled = true;
    if (!this.ctx || !this.master) this.init();
    if (!this.ctx || !this.master) return;
    const progression = [
      [55, 82.41, 110], [49, 73.42, 98],
      [65.41, 98, 130.81], [43.65, 65.41, 87.31],
      [55, 82.41, 110], [58.27, 87.31, 116.54],
      [49, 73.42, 98], [65.41, 98, 130.81]
    ];
    const playBar = () => {
      if (!this.musicEnabled || !this.ctx || this.ctx.state !== "running" || !this.master) return;
      const chord = progression[this.step % progression.length];
      // Capa ambiental cinematográfica: graves cálidos, pads y motivo melódico audible.
      this.tone({ frequency: chord[0], endFrequency: chord[0] * 1.004, duration: 1.05, type: "sine", volume: .075, attack: .22 });
      this.tone({ frequency: chord[1], endFrequency: chord[1] * .999, duration: .92, type: "triangle", volume: .042, attack: .24, detune: -5 });
      this.tone({ frequency: chord[2], endFrequency: chord[2] * 1.002, duration: .82, type: "sine", volume: .032, attack: .2, detune: 4 });
      const motif = [220, 261.63, 329.63, 392, 329.63, 293.66, 261.63, 196];
      this.tone({ frequency: motif[this.step % motif.length], endFrequency: motif[this.step % motif.length] * 1.003, duration: .72, type: "sine", volume: .038, attack: .18, detune: this.step % 2 ? 5 : -5 });
      if (this.step % 2 === 0) this.tone({ frequency: chord[0] / 2, endFrequency: chord[0] / 2 * .995, duration: 1.25, type: "triangle", volume: .05, attack: .28, filter: { type: "lowpass", frequency: 220, endFrequency: 110 } });
      this.step++;
    };
    if (this.bgmTimer) clearInterval(this.bgmTimer);
    playBar();
    this.bgmTimer = setInterval(playBar, 1050);
  }
};
/* ============================================================================
   AETHER NOVA: ECLIPSE - MOTOR AUDITADO (PARTE 2 DE 5)
   ============================================================================ */

const RockCache = {};
function getRockSprite(eraIndex, kind, radius) {
  const stepRadius = Math.max(10, Math.round(radius / 5) * 5);
  const key = `${eraIndex}_${kind}_${stepRadius}`;
  if (RockCache[key]) return RockCache[key];

  const size = Math.ceil(stepRadius * 2.6);
  const off = document.createElement("canvas");
  off.width = size;
  off.height = size;
  const c = off.getContext("2d");
  const cx = size / 2;
  const cy = size / 2;
  const era = ERAS[eraIndex % ERAS.length];

  let cLight = "#ffffff";
  let cMid = era.rockMain;
  let cDark = era.rockDark;
  let glow = null;

  if (kind === "explosive") { cMid = "#ff4d6d"; cDark = "#590d22"; glow = "#ff2a55"; }
  if (kind === "magnetic")  { cMid = "#c77dff"; cDark = "#240046"; glow = "#d000ff"; }
  if (kind === "crystal")   { cMid = "#90e0ef"; cDark = "#023e8a"; glow = "#00f0ff"; }

  c.save();
  c.translate(cx, cy);
  if (glow) {
    c.shadowBlur = 14;
    c.shadowColor = glow;
  }

  const pts = [];
  const count = 12;
  for (let i = 0; i < count; i++) {
    const ang = (i / count) * Math.PI * 2;
    const r = stepRadius * (0.8 + ((i * 41) % 10) * 0.024);
    pts.push({ x: Math.cos(ang) * r, y: Math.sin(ang) * r });
  }

  const grad = c.createRadialGradient(-stepRadius * 0.35, -stepRadius * 0.35, stepRadius * 0.08, 0, 0, stepRadius * 1.15);
  grad.addColorStop(0, cLight);
  grad.addColorStop(0.28, cMid);
  grad.addColorStop(1, cDark);

  c.fillStyle = grad;
  c.beginPath();
  c.moveTo(pts[0].x, pts[0].y);
  for (let i = 1; i < pts.length; i++) c.lineTo(pts[i].x, pts[i].y);
  c.closePath();
  c.fill();

  c.lineWidth = 1.6;
  c.strokeStyle = glow || "rgba(255,255,255,0.28)";
  c.stroke();

  for (let i = 0; i < 5; i++) {
    const a = i * 1.35 + 0.3;
    const dist = stepRadius * (0.26 + (i % 2) * 0.24);
    const cr = stepRadius * (0.13 + (i % 3) * 0.045);
    const kx = Math.cos(a) * dist;
    const ky = Math.sin(a) * dist;
    c.fillStyle = "rgba(0,0,0,0.34)";
    c.beginPath();
    c.arc(kx, ky, cr, 0, Math.PI * 2);
    c.fill();
    c.strokeStyle = "rgba(255,255,255,0.16)";
    c.lineWidth = 1;
    c.stroke();
  }

  c.restore();
  RockCache[key] = off;
  return off;
}

const state = {
  mode: "MENU",
  score: 0,
  level: 1,
  maxLevels: 100,
  levelProgress: 0,
  levelTarget: 15,
  selectedShip: "valkyrie",
  combo: 1,
  comboTimer: 0,
  shake: 0,
  flash: 0,
  gyroEnabled: false,
  gyroTilt: 0,
  difficulty: "normal",
  runMode: "campaign",
  dailyChallengeWon: false,
  alternateEnding: false,
  runRewardPaid: false
};

const keys = { Left: false, Right: false };
let bullets = [];
let enemyBullets = [];
let asteroids = [];
let enemies = [];
let boss = null;
let phenomena = [];
let powerups = [];
let particles = [];
let floatingTexts = [];
let stars = [];

function initStars() {
  stars = [];
  for (let i = 0; i < (IS_LOW_POWER ? 64 : 110); i++) {
    const layer = i % 3;
    stars.push({
      x: Math.random() * W,
      y: Math.random() * H,
      size: layer === 0 ? 1.1 : layer === 1 ? 1.8 : 2.5,
      speed: layer === 0 ? 0.5 : layer === 1 ? 1.3 : 2.3,
      alpha: layer === 0 ? 0.35 : layer === 1 ? 0.65 : 0.95,
      tint: layer === 2 && Math.random() < 0.3 ? "#a5f3fc" : "#ffffff"
    });
  }
}

const COMMERCIAL_KEY = "aether_commercial_v1";
const DIFFICULTY = {
  easy: { label: "RECLUTA", spawn: 0.78, reward: 0.8 },
  normal: { label: "ÉLITE", spawn: 1, reward: 1 },
  hard: { label: "PESADILLA", spawn: 1.28, reward: 1.5 }
};
const UPGRADE_DEFS = [
  // Nodos originales: se conservan sus identificadores para migrar partidas 2.x/3.0.
  { id: "reactor", branch: "TECNOLOGÍA", name: "REACTOR NOVA", desc: "+5% de velocidad por nivel. Maniobra con mayor precisión.", base: 120, max: 5 },
  { id: "bombBay", branch: "TECNOLOGÍA", name: "BODEGA TÁCTICA", desc: "+1 super bomba al iniciar por nivel.", base: 180, max: 3 },
  { id: "salvage", branch: "TECNOLOGÍA", name: "PROTOCOLO DE SALVAMENTO", desc: "+8% de créditos obtenidos por misión y victoria.", base: 210, max: 5 },
  { id: "cannon", branch: "OFENSIVA", name: "CAÑÓN DE PLASMA", desc: "+12% de daño por nivel. Destruye amenazas más rápido.", base: 160, max: 5 },
  { id: "seeker", branch: "OFENSIVA", name: "MISILES CAZADORES", desc: "Desbloquea misiles guiados periódicos; cada nivel mejora su frecuencia y daño.", base: 260, max: 3 },
  { id: "droneBay", branch: "OFENSIVA", name: "DRONES DE ESCOLTA", desc: "Drones laterales disparan junto a tu nave. Cada nivel aumenta su potencia.", base: 300, max: 3 },
  { id: "hull", branch: "DEFENSA", name: "BLINDAJE TITÁN", desc: "+1 punto de casco inicial por nivel.", base: 220, max: 3 },
  { id: "aegis", branch: "DEFENSA", name: "ESCUDO AEGIS", desc: "Comienza cada expedición con una carga de escudo por nivel; absorbe impactos.", base: 340, max: 3 },
  { id: "capacitor", branch: "DEFENSA", name: "CAPACITOR DE NOVA", desc: "Aumenta el daño de la super bomba contra los jefes.", base: 280, max: 3 }
];
function loadCommercialData() {
  try {
    const raw = JSON.parse(localStorage.getItem(COMMERCIAL_KEY) || "{}");
    return {
      credits: Math.max(0, Number(raw.credits) || 0),
      upgrades: Object.fromEntries(UPGRADE_DEFS.map(u => [u.id, Math.max(0, Math.min(u.max, Number(raw.upgrades?.[u.id]) || 0))])),
      achievements: Array.isArray(raw.achievements) ? raw.achievements.filter(x => typeof x === "string") : [],
      totalRuns: Math.max(0, Number(raw.totalRuns) || 0),
      totalScore: Math.max(0, Number(raw.totalScore) || 0),
      bestSector: Math.max(1, Number(raw.bestSector) || 1),
      bestScore: Math.max(0, Number(raw.bestScore) || 0),
      sound: raw.sound !== false,
      difficulty: ["easy", "normal", "hard"].includes(raw.difficulty) ? raw.difficulty : "normal",
      dailyClaimed: typeof raw.dailyClaimed === "string" ? raw.dailyClaimed : "",
      dailyChallengeClaimed: typeof raw.dailyChallengeClaimed === "string" ? raw.dailyChallengeClaimed : "",
      survivalBestSector: Math.max(1, Number(raw.survivalBestSector) || 1),
      survivalBestScore: Math.max(0, Number(raw.survivalBestScore) || 0),
      bossDefeats: Math.max(0, Number(raw.bossDefeats) || 0),
      bossTrophies: Array.isArray(raw.bossTrophies) ? raw.bossTrophies.filter(x => typeof x === "string").slice(-20) : [],
      selectedShip: Object.prototype.hasOwnProperty.call(SHIP_TYPES, raw.selectedShip) ? raw.selectedShip : "valkyrie",
      missions: raw.missions && typeof raw.missions === "object" && !Array.isArray(raw.missions) ? raw.missions : {}
    };
  } catch (error) {
    console.warn("Se reiniciaron los datos comerciales locales.", error);
    return { credits: 0, upgrades: {}, achievements: [], totalRuns: 0, totalScore: 0, bestSector: 1, bestScore: 0, sound: true, dailyClaimed: "", dailyChallengeClaimed: "", survivalBestSector: 1, survivalBestScore: 0, bossDefeats: 0, bossTrophies: [] };
  }
}
let commercialData = loadCommercialData();
state.difficulty = commercialData.difficulty;
state.selectedShip = commercialData.selectedShip || "valkyrie";
function saveCommercialData() {
  try { localStorage.setItem(COMMERCIAL_KEY, JSON.stringify(commercialData)); }
  catch (error) { console.warn("No se pudo guardar la progresión local.", error); }
  updateCommercialUI();
  if (typeof renderMissionBoard === "function") renderMissionBoard();
  if (typeof syncUnlockedShips === "function") syncUnlockedShips();
  if (typeof scheduleCloudProgressSync === "function") scheduleCloudProgressSync();
}
function updateCommercialUI() {
  const credits = Math.floor(commercialData.credits).toLocaleString("es-AR");
  ["menu-credits", "hangar-credits", "ui-credits"].forEach(id => {
    const el = document.getElementById(id); if (el) el.textContent = credits;
  });
  const status = document.getElementById("network-status");
  if (status) { status.textContent = !navigator.onLine ? "● SIN CONEXIÓN" : cloudSession?.access_token ? "● ONLINE + LOCAL" : "● MODO LOCAL"; status.classList.toggle("offline", !navigator.onLine); }
}
function unlockAchievement(id, title) {
  if (commercialData.achievements.includes(id)) return;
  commercialData.achievements.push(id);
  saveCommercialData();
  if (typeof renderCosmetics === "function") renderCosmetics();
  if (typeof addFloatingText === "function" && player) addFloatingText(W / 2, H * .34, `LOGRO: ${title}`, "#ffdf87");
}
function evaluateAchievements() {
  const milestones = [[5,"PRIMERA BRECHA"],[10,"NUEVO HORIZONTE"],[25,"CAZADOR DEL VACÍO"],[50,"MITAD DE LA LEYENDA"],[75,"DOMINADOR ESTELAR"],[100,"SALVADOR DE LA GALAXIA"]];
  milestones.forEach(([sector, title]) => { if (state.level >= sector) unlockAchievement(`sector_${sector}`, title); });
  if (state.score >= 10000) unlockAchievement("score_10k", "DIEZ MIL Y MÁS");
  if (state.runMode === "survival" && state.level >= 10) unlockAchievement("survival_10", "SUPERVIVIENTE ESTELAR");
  if (state.runMode === "survival" && state.level >= 25) unlockAchievement("survival_25", "MÁS ALLÁ DEL INFINITO");
  if (state.dailyChallengeWon) unlockAchievement("daily_first", "DESAFÍO COMPLETADO");
  if (state.alternateEnding) unlockAchievement("alternate_ending", "VERDAD DEL ECLIPSE");
}
function renderHangar() {
  const stats = document.getElementById("career-stats");
  if (stats) {
    stats.replaceChildren();
    [["PARTIDAS", commercialData.totalRuns], ["MEJOR SECTOR", commercialData.bestSector], ["RÉCORD", commercialData.bestScore.toLocaleString("es-AR")], ["CRÉDITOS", commercialData.credits.toLocaleString("es-AR")], ["MEJOR SUPERVIVENCIA", commercialData.survivalBestSector], ["RÉCORD SUPERVIVENCIA", commercialData.survivalBestScore.toLocaleString("es-AR")]].forEach(([label, value]) => {
      const item = document.createElement("div"); item.className = "career-stat";
      const strong = document.createElement("strong"); strong.textContent = value;
      const small = document.createElement("span"); small.textContent = label;
      item.append(strong, small); stats.append(item);
    });
  }
  const achievementBox = document.getElementById("achievement-list");
  if (achievementBox) {
    achievementBox.replaceChildren();
    const achievementNames = [["sector_5","Primera brecha"],["sector_10","Nuevo horizonte"],["sector_25","Cazador del vacío"],["sector_50","Mitad de la leyenda"],["sector_75","Dominador estelar"],["sector_100","Salvador de la galaxia"],["score_10k","Diez mil y más"],["survival_10","Superviviente estelar"],["survival_25","Más allá del infinito"],["daily_first","Desafío completado"],["alternate_ending","Verdad del Eclipse"]];
    achievementNames.forEach(([id, name]) => {
      const tag = document.createElement("span");
      tag.className = `achievement-chip${commercialData.achievements.includes(id) ? " unlocked" : ""}`;
      tag.textContent = `${commercialData.achievements.includes(id) ? "✦" : "◇"} ${name}`;
      achievementBox.append(tag);
    });
  }
  const grid = document.getElementById("upgrade-grid");
  if (!grid) return;
  grid.replaceChildren();
  let activeBranch = "";
  UPGRADE_DEFS.forEach(def => {
    if (def.branch !== activeBranch) {
      activeBranch = def.branch;
      const heading = document.createElement("h3");
      heading.className = "skill-branch-title";
      heading.textContent = `ÁRBOL ${activeBranch}`;
      grid.append(heading);
    }
    const level = commercialData.upgrades[def.id] || 0;
    const cost = Math.round(def.base * Math.pow(1.72, level));
    const card = document.createElement("article"); card.className = "upgrade-card";
    const title = document.createElement("h3"); title.textContent = def.name;
    const desc = document.createElement("p"); desc.textContent = def.desc;
    const rank = document.createElement("div"); rank.className = "upgrade-level"; rank.textContent = `NIVEL ${level}/${def.max}`;
    const buy = document.createElement("button"); buy.className = "upgrade-buy";
    buy.type = "button"; buy.textContent = level >= def.max ? "MEJORA COMPLETA" : `MEJORAR • ✦ ${cost.toLocaleString("es-AR")}`;
    buy.disabled = level >= def.max || commercialData.credits < cost;
    buy.addEventListener("click", () => {
      if (level >= def.max || commercialData.credits < cost) return;
      commercialData.credits -= cost; commercialData.upgrades[def.id] = level + 1;
      SoundFX.play("powerup"); saveCommercialData(); renderHangar();
      const loadoutNotice = document.getElementById("hangar-purchase-status");
      if (loadoutNotice) loadoutNotice.textContent = `${def.name} instalado en nivel ${level + 1}. El cambio se aplicará en tu próxima expedición.`;
    });
    card.append(title, desc, rank, buy); grid.append(card);
  });
  renderHangarLoadout();
  updateCommercialUI();
}
function renderHangarLoadout() {
  const panel = document.getElementById("hangar-loadout");
  if (!panel) return;
  const upgrades = commercialData.upgrades || {};
  const ship = SHIP_TYPES[state.selectedShip] || SHIP_TYPES.valkyrie;
  const reactor = upgrades.reactor || 0;
  const cannon = upgrades.cannon || 0;
  const hull = upgrades.hull || 0;
  const bombs = upgrades.bombBay || 0;
  const aegis = upgrades.aegis || 0;
  const missiles = upgrades.seeker || 0;
  const drones = upgrades.droneBay || 0;
  const speed = (ship.speed * (1 + reactor * 0.05)).toFixed(2);
  const fireRate = Math.max(4, ship.fireRate * (1 - cannon * 0.045) * (1 - (state.selectedShip === "valkyrie" ? 0.06 : 0))).toFixed(1);
  const installed = UPGRADE_DEFS.filter(def => (upgrades[def.id] || 0) > 0);
  panel.replaceChildren();
  const heading = document.createElement("div");
  heading.className = "hangar-loadout-heading";
  const title = document.createElement("strong");
  title.textContent = `CONFIGURACIÓN ACTIVA • ${ship.name}`;
  const note = document.createElement("span");
  note.textContent = "Las mejoras compradas se aplican al comenzar la próxima expedición.";
  heading.append(title, note);
  const stats = document.createElement("div");
  stats.className = "hangar-loadout-stats";
  const values = [
    ["VELOCIDAD", `${speed}`, `Base ${ship.speed.toFixed(1)} · Reactor +${reactor * 5}%`],
    ["INTERVALO DE DISPARO", `${fireRate}`, "Menor intervalo = dispara más rápido"],
    ["DAÑO DEL CAÑÓN", `x${(1 + cannon * 0.12).toFixed(2)}`, `Bonificación de mejora +${cannon * 12}%`],
    ["BONIFICACIÓN DE NAVE", `x${(Number(ship.damage) || 1).toFixed(2)}`, "Multiplicador propio del casco seleccionado"],
    ["CASCO", `${Math.min(6, ship.lives + hull)}`, `${ship.lives} base · +${hull} blindaje`],
    ["SUPER BOMBAS", `${Math.min(5, 1 + bombs)}`, `Bodega táctica nivel ${bombs}`],
    ["ESCUDO AEGIS", `${Math.min(3, aegis)}`, "Cargas protectoras iniciales"],
    ["MISILES", `${missiles}/3`, "Lanzamiento guiado periódico"],
    ["DRONES", `${drones}/3`, "Disparos laterales de escolta"],
    ["SALVAMENTO", `+${(upgrades.salvage || 0) * 8}%`, "Créditos adicionales por misión"]
  ];
  values.forEach(([label, value, detail]) => {
    const item = document.createElement("div"); item.className = "hangar-loadout-stat";
    const name = document.createElement("span"); name.textContent = label;
    const strong = document.createElement("strong"); strong.textContent = value;
    const small = document.createElement("small"); small.textContent = detail;
    item.append(name, strong, small); stats.append(item);
  });
  const tech = document.createElement("div"); tech.className = "hangar-installed-tech";
  const techTitle = document.createElement("strong"); techTitle.textContent = "SISTEMAS INSTALADOS";
  const tags = document.createElement("div"); tags.className = "hangar-tech-tags";
  if (!installed.length) {
    const empty = document.createElement("span"); empty.className = "hangar-tech-empty";
    empty.textContent = "Todavía no hay mejoras instaladas. Compra un módulo para modificar esta configuración.";
    tags.append(empty);
  } else {
    installed.forEach(def => {
      const tag = document.createElement("span"); tag.className = "hangar-tech-tag";
      tag.textContent = `${def.name} • NIVEL ${upgrades[def.id]}/${def.max}`;
      tags.append(tag);
    });
  }
  tech.append(techTitle, tags);
  panel.append(heading, stats, tech);
}
function awardRunCredits(victory) {
  if (state.runRewardPaid) return 0;
  state.runRewardPaid = true;
  const multiplier = DIFFICULTY[state.difficulty]?.reward || 1;
  const salvageBonus = 1 + (commercialData.upgrades?.salvage || 0) * 0.08;
  const modeBonus = state.runMode === "survival" ? 1.25 : state.runMode === "daily" ? 1.15 : 1;
  const challengeBonus = state.runMode === "daily" && victory && state.dailyChallengeWon && commercialData.dailyChallengeClaimed !== localDateKey() ? 500 : 0;
  const earned = Math.max(25, Math.floor((state.score / 120 + state.level * 4 + (victory ? 1500 : 0)) * multiplier * salvageBonus * modeBonus)) + challengeBonus;
  if (challengeBonus) commercialData.dailyChallengeClaimed = localDateKey();
  if (state.runMode === "survival") {
    commercialData.survivalBestSector = Math.max(commercialData.survivalBestSector, state.level);
    commercialData.survivalBestScore = Math.max(commercialData.survivalBestScore, state.score);
  }
  commercialData.credits += earned;
  commercialData.totalRuns++;
  commercialData.totalScore += state.score;
  commercialData.bestSector = Math.max(commercialData.bestSector, state.level);
  commercialData.selectedShip = state.selectedShip;
  commercialData.bestScore = Math.max(commercialData.bestScore, state.score);
  evaluateAchievements();
  saveCommercialData();
  refreshRunModeUI();
  const reward = document.getElementById("run-reward");
  if (reward) reward.textContent = `✦ RECOMPENSA DE MISIÓN: +${earned.toLocaleString("es-AR")} CRÉDITOS`;
  return earned;
}
function localDateKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
}
function localWeekKey(date = new Date()) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const day = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() - day + 1);
  return d.toISOString().slice(0, 10);
}
const MISSION_DEFS = {
  daily: [
    { id: "kills", title: "LIMPIEZA TÁCTICA", desc: "Destruye naves enemigas", target: 20, reward: 250, unit: "naves" },
    { id: "bosses", title: "CAZADOR DE COMANDANTES", desc: "Derrota un jefe", target: 1, reward: 400, unit: "jefes" },
    { id: "sectors", title: "AVANCE DE FRONTERA", desc: "Completa sectores", target: 3, reward: 350, unit: "sectores" }
  ],
  weekly: [
    { id: "kills", title: "SUPREMACÍA DE FLOTA", desc: "Destruye naves enemigas", target: 120, reward: 900, unit: "naves" },
    { id: "bosses", title: "ROMPECORONAS", desc: "Derrota comandantes", target: 5, reward: 1500, unit: "jefes" },
    { id: "sectors", title: "EXPANSIÓN GALÁCTICA", desc: "Completa sectores", target: 20, reward: 1300, unit: "sectores" }
  ]
};
function ensureMissionState() {
  if (!commercialData.missions || typeof commercialData.missions !== "object") commercialData.missions = {};
  const dailyKey = localDateKey();
  const weeklyKey = localWeekKey();
  if (commercialData.missions.daily?.key !== dailyKey) commercialData.missions.daily = { key: dailyKey, progress: { kills: 0, bosses: 0, sectors: 0 }, claimed: [] };
  if (commercialData.missions.weekly?.key !== weeklyKey) commercialData.missions.weekly = { key: weeklyKey, progress: { kills: 0, bosses: 0, sectors: 0 }, claimed: [] };
  for (const period of ["daily", "weekly"]) {
    const bucket = commercialData.missions[period];
    if (!bucket.progress || typeof bucket.progress !== "object") bucket.progress = { kills: 0, bosses: 0, sectors: 0 };
    if (!Array.isArray(bucket.claimed)) bucket.claimed = [];
    for (const id of ["kills", "bosses", "sectors"]) bucket.progress[id] = Math.max(0, Number(bucket.progress[id]) || 0);
  }
}
let missionDirtyCount = 0;
function recordMissionProgress(kind, amount = 1) {
  ensureMissionState();
  let objectiveCompleted = false;
  for (const period of ["daily", "weekly"]) {
    const bucket = commercialData.missions[period];
    const defs = MISSION_DEFS[period].filter(m => m.id === kind);
    const max = Math.max(...defs.map(m => m.target), 0);
    if (max) {
      const before = bucket.progress[kind] || 0;
      bucket.progress[kind] = Math.min(max, before + Math.max(0, amount));
      if (before < max && bucket.progress[kind] >= max) objectiveCompleted = true;
    }
  }
  missionDirtyCount += Math.max(0, amount);
  if (objectiveCompleted || missionDirtyCount >= 5 || kind !== "kills") {
    missionDirtyCount = 0;
    saveCommercialData();
  } else {
    renderMissionBoard();
  }
}
function claimMissionReward(period, missionId) {
  ensureMissionState();
  const def = MISSION_DEFS[period]?.find(m => m.id === missionId);
  const bucket = commercialData.missions[period];
  if (!def || !bucket || bucket.claimed.includes(missionId) || bucket.progress[missionId] < def.target) return;
  bucket.claimed.push(missionId);
  commercialData.credits += def.reward;
  saveCommercialData();
  SoundFX.play("powerup");
  renderMissionBoard();
  addFloatingText(W / 2, H * .35, `MISIÓN COMPLETADA • +${def.reward} CR`, "#75f0c4");
}
function renderMissionBoard() {
  const board = document.getElementById("mission-board");
  if (!board) return;
  ensureMissionState();
  board.replaceChildren();
  for (const period of ["daily", "weekly"]) {
    const section = document.createElement("section");
    section.className = "mission-period";
    const heading = document.createElement("h3");
    heading.textContent = period === "daily" ? "PROTOCOLOS DIARIOS" : "OPERACIONES SEMANALES";
    section.append(heading);
    for (const def of MISSION_DEFS[period]) {
      const bucket = commercialData.missions[period];
      const progress = Math.min(def.target, bucket.progress[def.id] || 0);
      const claimed = bucket.claimed.includes(def.id);
      const card = document.createElement("article");
      card.className = "mission-card";
      const title = document.createElement("strong"); title.textContent = def.title;
      const desc = document.createElement("small"); desc.textContent = `${def.desc}: ${progress}/${def.target} ${def.unit}`;
      const track = document.createElement("div"); track.className = "mission-track";
      const fill = document.createElement("span"); fill.style.width = `${Math.round(progress / def.target * 100)}%`; track.append(fill);
      const action = document.createElement("button"); action.type = "button"; action.className = "mini-btn";
      action.textContent = claimed ? "RECOMPENSA COBRADA" : progress >= def.target ? `COBRAR +${def.reward} CR` : `RECOMPENSA ✦ ${def.reward}`;
      action.disabled = claimed || progress < def.target;
      action.addEventListener("click", () => claimMissionReward(period, def.id));
      card.append(title, desc, track, action); section.append(card);
    }
    board.append(section);
  }
}
function syncUnlockedShips() {
  const best = Math.max(1, Number(commercialData.bestSector) || 1);
  document.querySelectorAll(".ship-opt").forEach(btn => {
    const key = btn.dataset.ship;
    const spec = SHIP_TYPES[key];
    if (!spec) return;
    const unlocked = !spec.unlock || best >= spec.unlock;
    btn.disabled = !unlocked;
    btn.classList.toggle("locked", !unlocked);
    const small = btn.querySelector("small");
    if (small && spec.unlock) small.textContent = unlocked ? `Desbloqueada • Sector ${spec.unlock}` : `Se desbloquea en sector ${spec.unlock}`;
    btn.classList.toggle("active", key === state.selectedShip);
  });
  if (SHIP_TYPES[state.selectedShip]?.unlock && best < SHIP_TYPES[state.selectedShip].unlock) {
    state.selectedShip = "valkyrie";
    commercialData.selectedShip = "valkyrie";
  }
}
function getDailyChallenge() {
  const date = localDateKey();
  const seed = Number(date.replaceAll("-", "")) || 20260101;
  const targets = [6500, 8500, 10500];
  const target = targets[seed % targets.length];
  return { date, target, reward: 500, title: target === 6500 ? "PRUEBA DE PRECISIÓN" : target === 8500 ? "ASALTO DE LA FLOTA" : "LÍMITE DE SUPERVIVENCIA" };
}
function refreshRunModeUI() {
  document.querySelectorAll(".run-mode-opt").forEach(btn => btn.classList.toggle("active", btn.dataset.runmode === state.runMode));
  const challenge = getDailyChallenge();
  const note = document.getElementById("daily-challenge-note");
  const playButton = document.getElementById("btn-play");
  if (playButton) playButton.textContent = state.runMode === "survival" ? "INICIAR SUPERVIVENCIA ↗" : state.runMode === "daily" ? "ACEPTAR DESAFÍO DIARIO ↗" : "INICIAR EXPEDICIÓN ↗";
  if (note) {
    const claimed = commercialData.dailyChallengeClaimed === challenge.date;
    note.textContent = `✦ ${challenge.title}: alcanza ${challenge.target.toLocaleString("es-AR")} puntos en una sola partida. Recompensa: ${challenge.reward} créditos${claimed ? " • RECOMPENSA YA OBTENIDA HOY" : ""}.`;
  }
}
function claimDailyReward() {
  const today = localDateKey();
  if (commercialData.dailyClaimed === today) { alert("El bono diario ya fue reclamado. Vuelve mañana, comandante."); return; }
  commercialData.dailyClaimed = today;
  commercialData.credits += 150;
  saveCommercialData();
  const button = document.getElementById("btn-daily");
  if (button) button.textContent = "✓ BONO RECLAMADO";
  SoundFX.play("powerup");
  alert("¡Bono diario recibido! +150 créditos.");
}
function refreshDailyButton() {
  const today = localDateKey();
  const button = document.getElementById("btn-daily");
  if (button) button.textContent = commercialData.dailyClaimed === today ? "✓ BONO RECLAMADO" : "✦ BONO DIARIO";
}
function showOverlay(id) {
  ["screen-hangar", "screen-manual"].forEach(name => document.getElementById(name)?.classList.add("hidden"));
  document.getElementById(id)?.classList.remove("hidden");
}

class Player {
  constructor(typeKey) {
    const spec = SHIP_TYPES[typeKey] || SHIP_TYPES.valkyrie;
    this.type = typeKey;
    this.x = W / 2;
    this.y = H - 185;
    this.radius = 20;
    const upgrades = commercialData.upgrades || {};
    this.speed = spec.speed * (1 + (upgrades.reactor || 0) * 0.05);
    const shipFireBonus = typeKey === "valkyrie" ? 0.06 : 0;
    this.baseFireRate = Math.max(4, spec.fireRate * (1 - (upgrades.cannon || 0) * 0.045) * (1 - shipFireBonus));
    this.shipDamageBonus = Number(spec.damage) || 1;
    this.color = spec.color;
    this.accent = spec.accent;
    this.lives = Math.min(6, spec.lives + (upgrades.hull || 0));
    this.bombs = Math.min(5, 1 + (upgrades.bombBay || 0));
    this.permanentShieldCharges = Math.min(3, upgrades.aegis || 0);
    this.missileLevel = Math.max(0, upgrades.seeker || 0);
    this.droneLevel = Math.max(0, upgrades.droneBay || 0);
    this.shotCounter = 0;
    this.tilt = 0;
    this.fireTimer = 0;
    this.invuln = 120;

    this.buffs = {
      triple: 0,
      rapid: 0,
      shield: 0,
      wingmen: 0,
      missiles: 0,
      cryo: 0,
      antigrav: 0,
      faraday: 0,
      antigamma: 0
    };
  }

  getEvolutionTier() {
    return Math.min(10, Math.floor((state.level - 1) / 10) + 1);
  }

  update() {
    let moveDir = 0;
    if (keys.Left) moveDir -= 1;
    if (keys.Right) moveDir += 1;
    if (state.gyroEnabled && Math.abs(state.gyroTilt) > 2) {
      moveDir = Math.max(-1.4, Math.min(1.4, state.gyroTilt / 16));
    }

    this.x += moveDir * this.speed;
    this.tilt += (moveDir * 0.35 - this.tilt) * 0.18;

    if (this.x < 28) this.x = 28;
    if (this.x > W - 28) this.x = W - 28;

    if (this.fireTimer > 0) this.fireTimer--;
    if (this.fireTimer <= 0) {
      this.shoot();
      const rate = this.buffs.rapid > 0 ? Math.max(4, this.baseFireRate * 0.55) : this.baseFireRate;
      this.fireTimer = Math.round(rate);
    }

    if (this.invuln > 0) this.invuln--;
    for (const k in this.buffs) {
      if (this.buffs[k] > 0) this.buffs[k]--;
    }

    if (particles.length < (IS_LOW_POWER ? 55 : 110) && Math.random() < (IS_LOW_POWER ? 0.28 : 0.75)) {
      particles.push({
        x: this.x + (Math.random() - 0.5) * 12,
        y: this.y + 22,
        vx: (Math.random() - 0.5) * 0.9,
        vy: Math.random() * 3.5 + 2.2,
        life: 16,
        maxLife: 16,
        color: this.color,
        size: 3.2
      });
    }
  }

  shoot() {
    const mk = this.getEvolutionTier();
    this.shotCounter++;
    const baseDamage = (1 + Math.floor((mk - 1) * 0.5)) * (1 + (commercialData.upgrades?.cannon || 0) * 0.12) * this.shipDamageBonus;
    const dmg = Math.max(1, Math.round(baseDamage));
    SoundFX.play("laser");

    bullets.push({ x: this.x, y: this.y - 24, vx: 0, vy: -13.5, dmg, color: this.color, missile: false });

    if (mk >= 2 || this.buffs.triple > 0) {
      bullets.push({ x: this.x - 14, y: this.y - 16, vx: -1.4, vy: -13, dmg, color: this.color, missile: false });
      bullets.push({ x: this.x + 14, y: this.y - 16, vx: 1.4, vy: -13, dmg, color: this.color, missile: false });
    }
    if (mk >= 4) {
      bullets.push({ x: this.x - 24, y: this.y - 10, vx: -2.6, vy: -12.5, dmg, color: "#ffcc33", missile: false });
      bullets.push({ x: this.x + 24, y: this.y - 10, vx: 2.6, vy: -12.5, dmg, color: "#ffcc33", missile: false });
    }
    if (mk >= 7) {
      bullets.push({ x: this.x, y: this.y - 28, vx: 0, vy: -15.5, dmg: dmg + 1, color: "#ff2a85", missile: false });
    }

    if (this.buffs.wingmen > 0) {
      bullets.push({ x: this.x - 44, y: this.y - 8, vx: 0, vy: -13.5, dmg, color: "#c77dff", missile: false });
      bullets.push({ x: this.x + 44, y: this.y - 8, vx: 0, vy: -13.5, dmg, color: "#c77dff", missile: false });
    }

    if (this.buffs.missiles > 0 && Math.random() < 0.45) {
      SoundFX.play("missile");
      bullets.push({ x: this.x - 18, y: this.y, vx: -2, vy: -9.5, dmg: dmg * 3, color: "#ff9e00", missile: true });
      bullets.push({ x: this.x + 18, y: this.y, vx: 2, vy: -9.5, dmg: dmg * 3, color: "#ff9e00", missile: true });
    }

    // Misiles permanentes: la Viper-X tiene una cadencia de lanzamiento superior.
    const missileInterval = Math.max(3, 7 - this.missileLevel - (this.type === "viper" ? 1 : 0));
    if (this.missileLevel > 0 && this.shotCounter % missileInterval === 0) {
      const missileDamage = Math.round(dmg * (1.7 + this.missileLevel * 0.35));
      bullets.push({ x: this.x - 12, y: this.y - 4, vx: -1.2, vy: -8.5, dmg: missileDamage, color: "#ff9e42", missile: true });
      bullets.push({ x: this.x + 12, y: this.y - 4, vx: 1.2, vy: -8.5, dmg: missileDamage, color: "#ff9e42", missile: true });
      if (this.missileLevel >= 3) SoundFX.play("missile");
    }

    // Drones de escolta: disparos laterales acompasados con el arma principal.
    if (this.droneLevel > 0 && this.shotCounter % 2 === 0) {
      const droneDamage = Math.max(1, Math.round(dmg * (0.45 + this.droneLevel * 0.18)));
      bullets.push({ x: this.x - 42, y: this.y - 5, vx: -0.35, vy: -12.5, dmg: droneDamage, color: "#72f7ff", missile: false });
      bullets.push({ x: this.x + 42, y: this.y - 5, vx: 0.35, vy: -12.5, dmg: droneDamage, color: "#72f7ff", missile: false });
    }
  }

  absorbCosmicThreat(reason, countermeasure = null) {
    if (countermeasure && this.buffs[countermeasure] > 0) {
      addFloatingText(this.x, this.y - 36, "CONTRAMEDIDA ACTIVA • AMENAZA NEUTRALIZADA", "#72f7ff");
      return true;
    }
    if (this.permanentShieldCharges > 0) {
      this.permanentShieldCharges--;
      this.invuln = 55;
      SoundFX.play("shieldHit");
      spawnExplosion(this.x, this.y, "#55eaff", IS_LOW_POWER ? 10 : 18);
      addFloatingText(this.x, this.y - 34, "AEGIS ABSORBIÓ LA AMENAZA • " + this.permanentShieldCharges + " CARGAS", "#72f7ff");
      return true;
    }
    if (this.buffs.shield > 0) {
      this.buffs.shield = 0;
      this.invuln = 55;
      SoundFX.play("shieldHit");
      spawnExplosion(this.x, this.y, "#55eaff", IS_LOW_POWER ? 10 : 18);
      addFloatingText(this.x, this.y - 34, "ESCUDO DE ENERGÍA ABSORBIÓ LA AMENAZA", "#00f0ff");
      return true;
    }
    state.shake = 34;
    state.flash = 0.9;
    spawnExplosion(this.x, this.y, "#ffffff", IS_LOW_POWER ? 22 : 38);
    addFloatingText(this.x, this.y - 40, reason, "#ff4d6d");
    this.lives = 0;
    endGame(false);
    return false;
  }

  takeDamage(reason = "IMPACTO") {
    if (this.invuln > 0) return;
    // Señal audiovisual inmediata: el jugador siempre percibe el contacto.
    state.shake = Math.max(state.shake, 10);
    state.flash = Math.max(state.flash, .22);
    const priorImpact = window.__AETHER3D_IMPACT || { serial: 0 };
    window.__AETHER3D_IMPACT = { serial: priorImpact.serial + 1, x: this.x, y: this.y,
      color: this.buffs.shield > 0 || this.permanentShieldCharges > 0 ? "#55eaff" : "#ff684d" };
    spawnImpactBurst(this.x, this.y, this.buffs.shield > 0 || this.permanentShieldCharges > 0 ? "#55eaff" : "#ff684d", IS_LOW_POWER ? 8 : 15);
    if (this.permanentShieldCharges > 0) {
      this.permanentShieldCharges--;
      this.invuln = 90;
      SoundFX.play("shieldHit");
      spawnExplosion(this.x, this.y, "#55eaff", IS_LOW_POWER ? 7 : 13);
      addFloatingText(this.x, this.y - 30, `AEGIS BLOQUEÓ EL IMPACTO • ${this.permanentShieldCharges} RESTANTES`, "#72f7ff");
      return;
    }
    if (this.buffs.shield > 0) {
      this.buffs.shield = 0;
      this.invuln = 60;
      SoundFX.play("shieldHit");
      spawnExplosion(this.x, this.y, "#55eaff", IS_LOW_POWER ? 7 : 13);
      addFloatingText(this.x, this.y - 30, "¡ESCUDO ABSORBIÓ DAÑO!", "#00f0ff");
      return;
    }

    this.lives--;
    this.invuln = 110;
    state.combo = 1;
    state.shake = 18;
    SoundFX.play("hit");
    if (navigator.vibrate) { try { navigator.vibrate(220); } catch (e) {} }
    spawnExplosion(this.x, this.y, "#ff2a55", 22);
    addFloatingText(this.x, this.y - 35, reason, "#ff4d6d");
    updateHUD();

    if (this.lives <= 0) {
      endGame(false);
    }
  }

  draw() {
    if (this.invuln > 0 && Math.floor(this.invuln / 5) % 2 === 0) return;
    const mk = this.getEvolutionTier();

    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.tilt);

    if (this.buffs.shield > 0) {
      ctx.strokeStyle = "rgba(0, 240, 255, 0.85)";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(0, 0, 34 + Math.sin(Date.now() * 0.01) * 2, 0, Math.PI * 2);
      ctx.stroke();
    }

    if (this.buffs.cryo > 0 || this.buffs.antigrav > 0 || this.buffs.faraday > 0 || this.buffs.antigamma > 0) {
      ctx.strokeStyle = "rgba(255, 204, 51, 0.75)";
      ctx.setLineDash([6, 4]);
      ctx.beginPath();
      ctx.arc(0, 0, 40, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    ctx.shadowBlur = IS_LOW_POWER ? 0 : 14;
    ctx.shadowColor = this.color;
    ctx.fillStyle = this.accent;

    if (mk >= 3) {
      ctx.beginPath();
      ctx.moveTo(0, -10);
      ctx.lineTo(-34 - mk, 16);
      ctx.lineTo(-18, 22);
      ctx.lineTo(18, 22);
      ctx.lineTo(34 + mk, 16);
      ctx.closePath();
      ctx.fill();
    }

    const grad = ctx.createLinearGradient(0, -28, 0, 24);
    grad.addColorStop(0, "#ffffff");
    grad.addColorStop(0.45, this.color);
    grad.addColorStop(1, this.accent);
    ctx.fillStyle = grad;

    ctx.beginPath();
    ctx.moveTo(0, -28);
    ctx.lineTo(-22, 18);
    ctx.lineTo(-8, 14);
    ctx.lineTo(0, 22);
    ctx.lineTo(8, 14);
    ctx.lineTo(22, 18);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "#081226";
    ctx.beginPath();
    ctx.ellipse(0, -4, 5, 11, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();

    if (this.buffs.wingmen > 0) {
      [-44, 44].forEach((offsetX) => {
        ctx.save();
        ctx.translate(this.x + offsetX, this.y + 4);
        ctx.fillStyle = "#c77dff";
        ctx.beginPath();
        ctx.moveTo(0, -14);
        ctx.lineTo(-10, 10);
        ctx.lineTo(10, 10);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      });
    }
  }
}
/* ============================================================================
   AETHER NOVA: ECLIPSE - MOTOR AUDITADO (PARTE 3 DE 5)
   ============================================================================ */

class CosmicPhenomenon {
  constructor(kind) {
    this.kind = kind;
    this.x = (kind === "ionstorm" || kind === "debrisfield") ? 0 : Math.random() * (W - 140) + 70;
    this.y = kind === "supernova" ? H * 0.34 : -60;
    this.vy = kind === "supernova" ? 0.15 : 1.1;
    this.timer = 0;
    this.maxTimer = kind === "supernova" ? 250 : kind === "ionstorm" ? 560 : kind === "debrisfield" ? 470 : 520;
    this.radius = kind === "supernova" ? 18 : 34;
    this.angle = 0;
    this.strikeX = W * (0.2 + Math.random() * 0.6);
    this.strikeFlash = 0;
    this.lastStrike = -90;
    this.lastPlayerPulse = -1;
    this.detonated = false;
    this.dead = false;
  }

  update() {
    this.timer++;
    this.y += this.vy;
    this.angle += 0.045;

    if (this.kind === "supernova") {
      if (!this.detonated) {
        const ratio = this.timer / this.maxTimer;
        this.radius = 18 + ratio * 155;
        if (this.timer >= this.maxTimer) this.detonateSupernova();
      } else if (this.timer >= this.maxTimer) {
        this.dead = true;
      }
    } else if (this.kind === "blackhole") {
      const pullRange = 330;
      asteroids.forEach((a) => {
        const dx = this.x - a.x;
        const dy = this.y - a.y;
        const d = Math.hypot(dx, dy);
        if (d < pullRange && d > 5) {
          a.x += (dx / d) * 3.4;
          a.y += (dy / d) * 3.4;
          if (d < 28) a.dead = true;
        }
      });

      enemies.forEach((e) => {
        const dx = this.x - e.x;
        const dy = this.y - e.y;
        const d = Math.hypot(dx, dy);
        if (d < pullRange && d > 5) {
          e.x += (dx / d) * 2.6;
          e.y += (dy / d) * 2.6;
          if (d < 30) e.dead = true;
        }
      });

      bullets.forEach((b) => {
        const dx = this.x - b.x, dy = this.y - b.y, d = Math.hypot(dx, dy);
        if (d < pullRange && d > 5) { b.x += dx / d * 3.2; b.y += dy / d * 3.2; }
        if (d < 95) b.dead = true;
      });
      enemyBullets.forEach((b) => {
        const dx = this.x - b.x, dy = this.y - b.y, d = Math.hypot(dx, dy);
        if (d < pullRange && d > 5) { b.x += dx / d * 3.5; b.y += dy / d * 3.5; }
        if (d < 95) b.dead = true;
      });
      if (boss && !boss.dead) {
        const dx = this.x - boss.x, dy = this.y - boss.y, d = Math.hypot(dx, dy);
        if (d < pullRange && d > 5) { boss.x += dx / d * 2.4; boss.y += dy / d * 2.4; }
        if (d < 42) { boss.hp = 0; defeatBoss(); }
      }

      const pdx = this.x - player.x;
      const pdy = this.y - player.y;
      const pd = Math.hypot(pdx, pdy);
      if (pd < pullRange && pd > 0.001 && player.buffs.antigrav <= 0) {
        const force = Math.max(1.4, 5.8 * (1 - pd / pullRange));
        player.x += (pdx / pd) * force;
        player.y += (pdy / pd) * force * 0.72;
        if (pd < 58) {
          const protectedByShield = player.absorbCosmicThreat("ABSORBIDO POR AGUJERO NEGRO", "antigrav");
          if (protectedByShield && state.mode === "PLAYING") {
            player.x = this.x - (pdx / pd) * 92;
            player.y = this.y - (pdy / pd) * 92;
          }
          state.shake = Math.max(state.shake, 20);
        }
      }
    } else if (this.kind === "magnetar") {
      // Pulsos gravitomagnéticos expansivos: empujan nave, enemigos y rocas.
      const phase = this.timer % 140;
      const pulseRadius = phase * 7.6;
      const waveNumber = Math.floor(this.timer / 140);
      if (phase > 3 && phase < 108) {
        const repel = (obj, strength) => {
          const dx = obj.x - this.x, dy = obj.y - this.y, d = Math.hypot(dx, dy);
          if (d < pulseRadius + 24 && d > 8 && d > pulseRadius - 28) {
            const f = strength * (1 - Math.min(.72, d / 1100));
            obj.x += dx / d * f; obj.y += dy / d * f;
          }
        };
        asteroids.forEach(a => repel(a, 7.5));
        enemies.forEach(e => repel(e, 9));
        if (boss && !boss.dead) repel(boss, 11);
        bullets.forEach(b => repel(b, 8));
        const distance = Math.hypot(player.x - this.x, player.y - this.y);
        const waveContact = Math.abs(distance - pulseRadius) < 34;
        if (player.buffs.faraday <= 0 && waveContact && this.lastPlayerPulse !== waveNumber) {
          this.lastPlayerPulse = waveNumber;
          const survived = player.absorbCosmicThreat("DESTRUIDO POR ONDA GRAVITACIONAL DEL MAGNETAR", "faraday");
          if (survived && state.mode === "PLAYING") repel(player, 30);
          state.shake = Math.max(state.shake, 17);
        } else if (state.mode === "PLAYING") {
          const beforeX = player.x, beforeY = player.y;
          repel(player, 24);
          if (beforeX !== player.x || beforeY !== player.y) state.shake = Math.max(state.shake, 9);
        }
        if (phase <= 5 && this.lastPlayerPulse !== waveNumber) {
          addFloatingText(this.x, this.y - 34, "¡PULSO GRAVITACIONAL!", "#e879f9");
        }
        enemyBullets.forEach(b => repel(b, 8));
      }
    } else if (this.kind === "pulsar") {
      // Haz gamma giratorio de gran alcance; castiga también a objetivos y rocas.
      const beamAngle = this.angle * 1.25;
      const hitBeam = (obj, width) => {
        const dx = obj.x - this.x, dy = obj.y - this.y;
        const along = dx * Math.cos(beamAngle) + dy * Math.sin(beamAngle);
        const across = Math.abs(-dx * Math.sin(beamAngle) + dy * Math.cos(beamAngle));
        return Math.abs(along) < 520 && across < width;
      };
      if (this.timer > 35 && this.timer % 9 === 0) {
        enemies.forEach(e => { if (hitBeam(e, 34)) { spawnExplosion(e.x, e.y, "#ff6bff", 5); e.dead = true; } });
        asteroids.forEach(a => { if (hitBeam(a, 30)) { spawnExplosion(a.x, a.y, "#ffb4ff", 4); a.dead = true; } });
        enemyBullets.forEach(b => { if (hitBeam(b, 24)) b.dead = true; });
        bullets.forEach(b => { if (hitBeam(b, 24)) b.dead = true; });
        if (boss && !boss.dead && hitBeam(boss, Math.max(48, boss.radius))) {
          boss.hp = 0;
          defeatBoss();
        }
        if (player.buffs.antigamma <= 0 && hitBeam(player, 42)) {
          player.absorbCosmicThreat("DESTRUIDO POR RAYO GAMMA DEL PÚLSAR", "antigamma");
          state.shake = Math.max(state.shake, 18);
        }
      }
    } else if (this.kind === "ionstorm") {
      // La tormenta anuncia cada descarga antes de atravesar una columna del escenario.
      this.y = H * 0.5 + Math.sin(this.timer * 0.018) * H * 0.12;
      if (this.timer - this.lastStrike >= 82) {
        this.lastStrike = this.timer;
        this.strikeX = W * (0.12 + Math.random() * 0.76);
      }
      const strikeAge = this.timer - this.lastStrike;
      this.strikeFlash = strikeAge >= 18 && strikeAge <= 24 ? 1 : 0;
      if (strikeAge === 21) {
        const width = Math.max(34, W * 0.035);
        asteroids.forEach(a => { if (Math.abs(a.x - this.strikeX) < width + a.radius) { a.hp -= 5; if (a.hp <= 0) a.dead = true; } });
        enemies.forEach(e => { if (Math.abs(e.x - this.strikeX) < width + e.radius) { e.hp -= 8; if (e.hp <= 0) e.dead = true; } });
        if (Math.abs(player.x - this.strikeX) < width + player.radius && player.buffs.antigamma <= 0) {
          player.takeDamage("DESCARGA DE TORMENTA IÓNICA");
          state.shake = Math.max(state.shake, 9);
        }
        spawnExplosion(this.strikeX, this.y, "#67e8f9", IS_LOW_POWER ? 7 : 13);
      }
    } else if (this.kind === "debrisfield") {
      // Campo denso: fragmentos atraviesan el escenario y pueden encadenar explosiones.
      if (this.timer % 29 === 0 && asteroids.length < (IS_LOW_POWER ? 24 : 38)) {
        const rock = new Asteroid(Math.random() * W, -35, 10 + Math.random() * 16, Math.random() < 0.24 ? "explosive" : "normal");
        rock.vx = (Math.random() - 0.5) * 3.8;
        rock.vy = 2.8 + Math.random() * 2.2 + state.level * 0.025;
        asteroids.push(rock);
      }
    }

    if (this.y > H + 120 || this.timer > this.maxTimer) {
      this.dead = true;
    }
  }

  detonateSupernova() {
    SoundFX.play("supernova");
    state.shake = 34;
    state.flash = 0.88;
    if (navigator.vibrate) { try { navigator.vibrate([180, 70, 280]); } catch (e) {} }

    asteroids.forEach((a) => {
      spawnExplosion(a.x, a.y, "#ffcc33", 6);
      a.dead = true;
    });
    enemies.forEach((e) => {
      spawnExplosion(e.x, e.y, "#ff5500", 10);
      e.dead = true;
    });
    bullets.forEach(b => { b.dead = true; });
    enemyBullets.forEach(b => { b.dead = true; });
    if (boss && !boss.dead) {
      boss.hp = 0;
      defeatBoss();
    }
    spawnExplosion(this.x, this.y, "#ffffff", 40);
    const cap = IS_LOW_POWER ? 72 : 118;
    const palette = ["#ffffff", "#fff1a8", "#ffb347", "#ff5b35", "#ff2f75", "#8feaff"];
    for (let i = 0; i < cap && particles.length < (IS_LOW_POWER ? 75 : 145); i++) {
      const angle = Math.random() * Math.PI * 2, shell = i % 3;
      const speed = (shell === 0 ? 5.5 : shell === 1 ? 9 : 13) + Math.random() * 4.5;
      particles.push({
        x: this.x + Math.cos(angle) * (shell * 5), y: this.y + Math.sin(angle) * (shell * 5),
        vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
        life: 34 + Math.random() * 24, maxLife: 58,
        color: palette[i % palette.length], size: (shell === 2 ? 5 : 3) + Math.random() * 3
      });
    }
    player.absorbCosmicThreat("DESTRUIDO POR LA EXPLOSIÓN DE SUPERNOVA", "cryo");
    // Mantiene vivo el fenómeno unos frames para mostrar el frente de choque 2D/3D.
    this.detonated = true;
    this.timer = 0;
    this.maxTimer = 54;
    this.radius = 220;
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);

    if (this.kind === "supernova") {
      if (this.detonated) {
        const p=this.timer/this.maxTimer, fade=1-p;
        for(let i=0;i<4;i++){
          const r=24+p*(420+i*115);
          ctx.strokeStyle=i%2===0?"rgba(255,225,170,"+(fade*.9)+")":"rgba(255,82,42,"+(fade*.72)+")";
          ctx.lineWidth=i===0?7:4; ctx.shadowBlur=IS_LOW_POWER?0:22;
          ctx.shadowColor=i%2===0?"#fff0b2":"#ff4b2b";
          ctx.beginPath(); ctx.arc(0,0,r,0,Math.PI*2); ctx.stroke();
        }
        ctx.shadowBlur=0;
        const blast=ctx.createRadialGradient(0,0,8,0,0,Math.max(10,260*(1-p)));
        blast.addColorStop(0,"rgba(255,255,245,"+(fade*.5)+")");
        blast.addColorStop(.35,"rgba(255,170,70,"+(fade*.26)+")");
        blast.addColorStop(1,"rgba(255,55,20,0)");
        ctx.fillStyle=blast; ctx.beginPath(); ctx.arc(0,0,260*(1-p),0,Math.PI*2); ctx.fill();
      } else {
        const pulse = 1 + Math.sin(this.timer * .19) * .1, charge = this.timer / this.maxTimer;
        ctx.save(); ctx.rotate(this.angle * 1.7);
        for (let i = 0; i < 16; i++) {
          const a = i * Math.PI / 8, inner = this.radius * .72;
          const outer = this.radius * (1.25 + .28 * Math.sin(this.timer * .13 + i));
          ctx.strokeStyle = i % 3 === 0 ? "rgba(255,255,225,.95)" : "rgba(255,105,35,.72)";
          ctx.lineWidth = i % 3 === 0 ? 3 : 1.6;
          ctx.beginPath(); ctx.moveTo(Math.cos(a)*inner,Math.sin(a)*inner);
          ctx.lineTo(Math.cos(a+.08)*outer,Math.sin(a+.08)*outer); ctx.stroke();
        }
        ctx.restore();
        ctx.strokeStyle = "rgba(255,210,120,.68)"; ctx.lineWidth = 3 + charge * 3;
        ctx.beginPath(); ctx.arc(0,0,this.radius*1.45*pulse,0,Math.PI*2); ctx.stroke();
        const glow = ctx.createRadialGradient(0,0,2,0,0,this.radius*1.65);
        glow.addColorStop(0,"#ffffff"); glow.addColorStop(.18,"#fff8cf");
        glow.addColorStop(.42,"#ffb52e"); glow.addColorStop(.72,"#ff4b20");
        glow.addColorStop(1,"rgba(255,35,0,0)");
        ctx.fillStyle=glow; ctx.beginPath(); ctx.arc(0,0,this.radius*1.65*pulse,0,Math.PI*2); ctx.fill();
        ctx.fillStyle="#fff"; ctx.shadowBlur=IS_LOW_POWER?0:24; ctx.shadowColor="#ffb347";
        ctx.beginPath(); ctx.arc(0,0,Math.max(5,this.radius*.2),0,Math.PI*2); ctx.fill(); ctx.shadowBlur=0;
      }
    } else if (this.kind === "blackhole") {
      const pulse = 1 + Math.sin(this.timer * .09) * .07;
      ctx.scale(1.24, 1.24);
      ctx.rotate(this.angle * 1.7);
      // Disco de acreción en dos anillos: el núcleo permanece negro.
      for (let i = 0; i < 3; i++) {
        ctx.save(); ctx.rotate(i * 2.1);
        ctx.strokeStyle = ["rgba(255,190,70,.95)","rgba(255,90,25,.82)","rgba(174,70,255,.72)"][i];
        ctx.lineWidth = 7 - i;
        ctx.beginPath(); ctx.ellipse(0,0,58*pulse,18+i*5,0,0,Math.PI*2); ctx.stroke();
        ctx.restore();
      }
      const g = ctx.createRadialGradient(0,0,8,0,0,78);
      g.addColorStop(0,"#000000"); g.addColorStop(.55,"#05030d"); g.addColorStop(.72,"rgba(70,25,110,.6)"); g.addColorStop(1,"rgba(0,0,0,0)");
      ctx.fillStyle=g; ctx.beginPath(); ctx.arc(0,0,78,0,Math.PI*2); ctx.fill();
      ctx.strokeStyle="rgba(255,210,130,.95)"; ctx.lineWidth=2.5;
      ctx.beginPath(); ctx.ellipse(0,0,65,20,0,Math.PI,Math.PI*2); ctx.stroke();
      ctx.fillStyle="#000"; ctx.beginPath(); ctx.arc(0,0,25,0,Math.PI*2); ctx.fill();
      ctx.strokeStyle="rgba(160,110,255,.8)"; ctx.lineWidth=1.5; ctx.beginPath(); ctx.arc(0,0,29,0,Math.PI*2); ctx.stroke();
    } else if (this.kind === "magnetar") {
      const phase = this.timer % 140, wave = phase * 7.6;
      ctx.rotate(-this.angle * 1.4);
      ctx.strokeStyle="rgba(198,80,255,.38)"; ctx.lineWidth=2.5;
      for(let i=0;i<5;i++){ ctx.beginPath(); ctx.ellipse(0,0,26+i*13,48+i*12,0,0,Math.PI*2); ctx.stroke(); }
      for(let ring=0;ring<3;ring++){
        const r=Math.max(8,wave-ring*115), alpha=Math.max(.08,.92-(phase/112));
        ctx.strokeStyle=ring===0?"rgba(255,245,255,"+alpha+")":(ring===1?"rgba(224,105,255,"+(alpha*.82)+")":"rgba(95,225,255,"+(alpha*.82)+")");
        ctx.lineWidth=ring===0?5:3; ctx.shadowBlur=IS_LOW_POWER?0:18;
        ctx.shadowColor=ring===1?"#d946ef":"#67e8f9";
        ctx.beginPath(); ctx.ellipse(0,0,r,r*.72,0,0,Math.PI*2); ctx.stroke();
      }
      ctx.shadowBlur=0;
      ctx.fillStyle="rgba(180,70,255,.22)"; ctx.beginPath(); ctx.arc(0,0,48,0,Math.PI*2); ctx.fill();
      const mg=ctx.createRadialGradient(-5,-7,2,0,0,24); mg.addColorStop(0,"#fff"); mg.addColorStop(.35,"#f0abfc"); mg.addColorStop(1,"#7e22ce");
      ctx.fillStyle=mg; ctx.beginPath(); ctx.arc(0,0,19,0,Math.PI*2); ctx.fill();
      ctx.fillStyle="#fff"; ctx.fillRect(-2,-52,4,104);
    } else if (this.kind === "pulsar") {
      ctx.rotate(this.angle * 1.25);
      const beamAlpha = .58 + Math.sin(this.timer * .16) * .28;
      const beamGrad = ctx.createLinearGradient(-490,0,490,0);
      beamGrad.addColorStop(0,"rgba(0,255,190,0)"); beamGrad.addColorStop(.5,`rgba(0,255,190,${beamAlpha})`); beamGrad.addColorStop(1,"rgba(0,255,190,0)");
      ctx.fillStyle=beamGrad; ctx.fillRect(-490,-13,980,26);
      ctx.fillStyle="rgba(95,255,225,.2)"; ctx.fillRect(-490,-25,980,50);
      ctx.rotate(-this.angle * 2.5);
      ctx.strokeStyle="rgba(120,255,235,.65)"; ctx.lineWidth=2;
      ctx.beginPath(); ctx.ellipse(0,0,27,11,0,0,Math.PI*2); ctx.stroke();
      const pg=ctx.createRadialGradient(-4,-5,1,0,0,20); pg.addColorStop(0,"#fff"); pg.addColorStop(.45,"#a7fff0"); pg.addColorStop(1,"#00a6a6");
      ctx.fillStyle=pg; ctx.beginPath(); ctx.arc(0,0,17,0,Math.PI*2); ctx.fill();
      ctx.fillStyle="#fff"; ctx.fillRect(-2,-46,4,92);
    } else if (this.kind === "ionstorm") {
      ctx.translate(0, -this.y);
      const warning = 0.35 + Math.sin(this.timer * 0.22) * 0.18;
      ctx.fillStyle = `rgba(34,211,238,${warning})`;
      ctx.fillRect(this.strikeX - 3, -H, 6, H * 2);
      ctx.strokeStyle = "rgba(103,232,249,.75)";
      ctx.lineWidth = 2;
      ctx.setLineDash([7, 9]);
      ctx.beginPath(); ctx.moveTo(this.strikeX, 0); ctx.lineTo(this.strikeX, H); ctx.stroke(); ctx.setLineDash([]);
      if (this.strikeFlash) {
        ctx.strokeStyle = "#e0fbff"; ctx.lineWidth = 5; ctx.shadowBlur = IS_LOW_POWER ? 0 : 24; ctx.shadowColor = "#22d3ee";
        ctx.beginPath(); ctx.moveTo(this.strikeX, 0);
        let x = this.strikeX;
        for (let y = 0; y < H; y += 34) { x += (Math.random() - 0.5) * 48; ctx.lineTo(x, y + 34); }
        ctx.stroke(); ctx.shadowBlur = 0;
      }
      ctx.fillStyle = "rgba(34,211,238,.08)"; ctx.fillRect(0, 0, W, H);
    } else if (this.kind === "debrisfield") {
      ctx.translate(0, -this.y);
      ctx.strokeStyle = "rgba(251,191,36,.2)"; ctx.lineWidth = 2;
      for (let i = 0; i < 5; i++) {
        const x = (i * 0.23 * W + this.timer * (i % 2 ? 1.1 : -0.8) + W) % W;
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x - 90, H); ctx.stroke();
      }
      ctx.fillStyle = "rgba(251,146,60,.055)"; ctx.fillRect(0, 0, W, H);
    }

    ctx.restore();
  }
}

function detonateAsteroidChain(x, y, source, depth = 0) {
  const blastRadius = 142 + depth * 12;
  spawnExplosion(x, y, depth ? "#ff9f43" : "#ffcc33", IS_LOW_POWER ? 9 : 16);
  state.shake = Math.max(state.shake, Math.max(3, 11 - depth));
  if (depth === 0) addFloatingText(x, y - 24, "¡REACCIÓN EN CADENA!", "#ffd166");

  asteroids.forEach(other => {
    if (other === source || other.dead) return;
    const d = Math.hypot(other.x - x, other.y - y);
    if (d < blastRadius) {
      if (other.kind === "explosive" && depth < 4) {
        other.dead = true;
        detonateAsteroidChain(other.x, other.y, other, depth + 1);
      } else {
        other.hp -= Math.max(2, 6 - depth);
        if (other.hp <= 0) other.dead = true;
      }
    }
  });
  enemies.forEach(enemy => {
    if (!enemy.dead && Math.hypot(enemy.x - x, enemy.y - y) < blastRadius + enemy.radius) {
      enemy.hp -= Math.max(5, 15 - depth * 2);
      if (enemy.hp <= 0) enemy.dead = true;
    }
  });
  if (boss && Math.hypot(boss.x - x, boss.y - y) < blastRadius + boss.radius) {
    boss.hp -= Math.max(2, 7 - depth);
    if (boss.hp <= 0) defeatBoss();
  }
}

class Asteroid {
  constructor(x, y, radius, kind = "normal") {
    this.aether3dId = (Asteroid._next3DId = (Asteroid._next3DId || 0) + 1);
    this.x = x ?? Math.random() * (W - 60) + 30;
    this.y = y ?? -45;
    this.radius = radius;
    this.kind = kind;
    const diffMult = 1 + (state.level - 1) * 0.045;

    if (kind === "shooting_star") {
      this.vx = (Math.random() < 0.5 ? 1 : -1) * (3.5 + Math.random() * 2);
      this.vy = 6.5 * diffMult;
      this.hp = 1;
    } else {
      this.vx = (Math.random() - 0.5) * 1.6 * diffMult;
      this.vy = (1.5 + Math.random() * 1.4) * diffMult;
      const baseHp = radius > 32 ? 4 : radius > 20 ? 2 : 1;
      this.hp = Math.ceil(baseHp * (1 + Math.floor(state.level / 10) * 0.4));
    }

    this.maxHp = this.hp;
    this.rot = Math.random() * Math.PI * 2;
    this.rotSpeed = (Math.random() - 0.5) * 0.05;
    this.hitFlash = 0;
    this.dead = false;
  }

  update() {
    if (this.kind === "magnetic" && player) {
      const dx = player.x - this.x;
      this.vx += Math.sign(dx) * 0.04;
    }

    this.x += this.vx;
    this.y += this.vy;
    this.rot += this.rotSpeed;
    if (this.hitFlash > 0) this.hitFlash--;

    if (this.kind === "shooting_star" && particles.length < 110 && Math.random() < 0.7) {
      particles.push({
        x: this.x,
        y: this.y,
        vx: -this.vx * 0.2,
        vy: -this.vy * 0.2,
        life: 14,
        maxLife: 14,
        color: "#00f0ff",
        size: 3.5
      });
    }

    if (this.x < this.radius || this.x > W - this.radius) this.vx *= -1;
    if (this.y > H + 60) this.dead = true;
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rot);

    if (this.kind === "shooting_star") {
      ctx.fillStyle = "#ffffff";
      ctx.shadowBlur = IS_LOW_POWER ? 0 : 16;
      ctx.shadowColor = "#00f0ff";
      ctx.beginPath();
      ctx.arc(0, 0, this.radius * 0.72, 0, Math.PI * 2);
      ctx.fill();
    } else {
      const eraIdx = Math.floor((state.level - 1) / 10);
      const sprite = getRockSprite(eraIdx, this.kind, this.radius);
      ctx.drawImage(sprite, -sprite.width / 2, -sprite.height / 2);
    }

    if (this.hitFlash > 0) {
      ctx.fillStyle = "rgba(255,255,255,0.45)";
      ctx.beginPath();
      ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }
}
/* ============================================================================
   AETHER NOVA: ECLIPSE - MOTOR AUDITADO (PARTE 4A)
   ============================================================================ */

class EnemyShip {
  constructor(variant) {
    this.variant = variant;
    this.x = Math.random() * (W - 90) + 45;
    this.y = -45;
    this.baseX = this.x;
    this.age = Math.floor(Math.random() * 90);
    this.vx = (Math.random() < 0.5 ? 1 : -1) * (variant === "interceptor" || variant === "lancer" ? 2.8 : 1.6);
    this.vy = variant === "bomber" || variant === "carrier" ? 0.9 : variant === "lancer" ? 2.2 : 1.4;
    this.radius = (variant === "bomber" || variant === "carrier" ? 28 : variant === "interceptor" || variant === "lancer" ? 20 : variant === "weaver" ? 18 : 16) * 1.35;
    const sectorTier = Math.max(0, Math.floor((state.level - 1) / 10));
    const scale = 1 + Math.floor(state.level / 5) * 0.22 + sectorTier * 0.08;
    const baseHp = variant === "carrier" ? 22 : variant === "bomber" ? 14 : variant === "interceptor" || variant === "lancer" ? 8 : variant === "weaver" ? 6 : 4;
    const eventScale = activeGalacticEvent ? Math.max(1, Math.min(3, Number(activeGalacticEvent.difficulty_multiplier) || 1)) : 1;
    this.vx *= eventScale;
    this.vy *= eventScale;
    this.hp = Math.ceil(baseHp * scale * eventScale);
    this.fireTimer = 48 + Math.floor(Math.random() * 48);
    this.dashTimer = 90 + Math.floor(Math.random() * 90);
    this.dead = false;
  }

  update() {
    this.age++;
    if (this.variant === "weaver") {
      this.x += Math.sin(this.age * .075) * 3.1;
      this.y += this.vy * 1.18;
    } else if (this.variant === "lancer") {
      this.x += this.vx * .55;
      this.y += this.vy;
      this.dashTimer--;
      if (this.dashTimer <= 0 && player) {
        const angle = Math.atan2(player.y - this.y, player.x - this.x);
        this.vx = Math.cos(angle) * 4.8;
        this.vy = Math.sin(angle) * 4.8;
        this.dashTimer = 150;
      } else if (this.dashTimer === 125) {
        this.vx *= .45; this.vy = 1.8;
      }
    } else if (this.variant === "carrier") {
      this.x += Math.sin(this.age * .025) * 1.5;
      this.y += this.vy * .72;
    } else {
      this.x += this.vx;
      this.y += this.vy;
    }
    if (this.x < 35 || this.x > W - 35) this.vx *= -1;
    if (this.y > H + 70) this.dead = true;

    this.fireTimer--;
    if (this.fireTimer <= 0 && this.y > 40 && this.y < H * .72) {
      this.shoot();
      this.fireTimer = this.variant === "interceptor" || this.variant === "lancer" ? 58 : this.variant === "carrier" ? 72 : 92;
    }
  }

  shoot() {
    if (!player || enemyBullets.length > (IS_LOW_POWER ? 100 : 170)) return;
    const ang = Math.atan2(player.y - this.y, player.x - this.x);
    const shot = (angle, speed, color) => enemyBullets.push({
      x: this.x, y: this.y + 14, vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed, color
    });
    if (this.variant === "scout" || this.variant === "weaver") {
      shot(ang, this.variant === "weaver" ? 4.8 : 4.2, this.variant === "weaver" ? "#4df5ff" : "#ff4d6d");
    } else if (this.variant === "interceptor") {
      [-.13, .13].forEach(offset => shot(Math.PI / 2 + offset, 5.8, "#ff9e00"));
    } else if (this.variant === "lancer") {
      [-.08, 0, .08].forEach(offset => shot(ang + offset, 6.2, "#ff5e00"));
    } else if (this.variant === "carrier") {
      [-.34, -.17, 0, .17, .34].forEach(offset => shot(ang + offset, 4.4, "#c084fc"));
    } else {
      [-.28, 0, .28].forEach(offset => shot(ang + offset, 4.2, "#ff0055"));
    }
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    const colors = {
      scout: "#e63946", interceptor: "#ff9e00", bomber: "#ff0055",
      weaver: "#4df5ff", lancer: "#ff6b35", carrier: "#c084fc"
    };
    const color = colors[this.variant] || "#ff4d6d";
    ctx.shadowBlur = IS_LOW_POWER ? 0 : 12;
    ctx.shadowColor = color;
    ctx.fillStyle = color;
    ctx.strokeStyle = "rgba(255,255,255,.7)";
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    if (this.variant === "carrier") {
      ctx.moveTo(-30, -8); ctx.lineTo(-18, -20); ctx.lineTo(18, -20);
      ctx.lineTo(30, -8); ctx.lineTo(24, 15); ctx.lineTo(-24, 15);
    } else if (this.variant === "weaver") {
      ctx.moveTo(0, 22); ctx.lineTo(-20, -14); ctx.lineTo(-4, -8);
      ctx.lineTo(0, -24); ctx.lineTo(4, -8); ctx.lineTo(20, -14);
    } else if (this.variant === "lancer") {
      ctx.moveTo(0, 25); ctx.lineTo(-14, -18); ctx.lineTo(0, -10); ctx.lineTo(14, -18);
    } else {
      ctx.moveTo(0, this.radius); ctx.lineTo(-this.radius, -this.radius * .7);
      ctx.lineTo(0, -this.radius * .3); ctx.lineTo(this.radius, -this.radius * .7);
    }
    ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.fillStyle = "#fff";
    ctx.fillRect(-3, -5, 6, 8);
    ctx.restore();
  }
}

class BossShip {
  constructor() {
    this.x = W / 2; this.y = 112; this.vx = 2.1;
    this.bossIndex = Math.max(0, Math.floor(state.level / 10) - 1);
    this.variant = this.bossIndex % 10;
    const names = ["LEVIATÁN","DESTRUCTOR","ANOMALÍA","REINA DEL VACÍO","ECLIPSE SUPREMO","COLOSOS DE OBSIDIANA","DEVORADOR DE ESTRELLAS","ARCA INFERNAL","SERAFÍN ABISMAL","NÚCLEO OMEGA"];
    this.name = names[this.variant];
    this.radius = [48,54,46,62,58,66,60,70,64,74][this.variant];
    const sectorRamp = 1 + Math.max(0, state.level - 1) * 0.012;
    const bossDifficulty = state.difficulty === "hard" ? 1.24 : state.difficulty === "easy" ? 0.84 : 1;
    const milestoneRamp = 1 + this.bossIndex * 0.20;
    this.maxHp = Math.round((210 + state.level * 29) * sectorRamp * milestoneRamp * bossDifficulty);
    this.hp = this.maxHp;
    this.timer = 0;
    this.phase = 1;
    this.weakAngle = -Math.PI / 2;
    this.weakRadius = this.radius + 22;
    this.attackClock = 0;
    this.phaseTransitionLock = false;
    this.specialClock = 0;
    this.summonClock = 0;
    const bossWrap = document.getElementById("boss-bar-wrap");
    const bossName = document.getElementById("boss-name");
    if (bossWrap) bossWrap.classList.remove("hidden");
    if (bossName) bossName.textContent = `${this.name} • FASE 1/3`;
    showBossCinematic(this.name, this.variant);
    addFloatingText(W / 2, H * .28, `JEFE DE SECTOR • ${this.name}`, "#ff4bd8");
    addFloatingText(W / 2, H * .34, "IDENTIFICÁ SU NÚCLEO EXPUESTO", "#ffe08a");
    state.shake = Math.max(state.shake, 10);
  }

  update() {
    this.timer++;
    this.attackClock++;
    const ratio = this.hp / this.maxHp;
    const nextPhase = ratio <= .30 ? 3 : ratio <= .66 ? 2 : 1;
    if (nextPhase !== this.phase) {
      this.phase = nextPhase;
      this.vx *= this.phase === 3 ? 1.55 : 1.25;
      this.vx = Math.max(-5.2, Math.min(5.2, this.vx));
      this.attackClock = 0;
      this.phaseTransitionLock = true;
      state.shake = Math.max(state.shake, 14);
      state.flash = Math.max(state.flash, .18);
      const phaseNames = ["", "PROTOCOLO DE ASALTO", "SOBRECARGA CRÍTICA", "NÚCLEO EN FURIA"];
      addFloatingText(W / 2, H * .25, `¡${phaseNames[this.phase]}! FASE ${this.phase}/3`, "#ffcc33");
      if (this.phase === 2) {
        for (let i = 0; i < 2; i++) enemies.push(new EnemyShip(i === 0 ? "interceptor" : "bomber"));
      } else {
        for (let i = 0; i < 3; i++) enemies.push(new EnemyShip(["weaver", "lancer", "scout"][i]));
      }
    }

    const lateralWave = this.variant === 2 ? Math.sin(this.timer * .035) * (this.phase === 3 ? 2.2 : 1.1) : 0;
    this.x += this.vx * (this.phase === 3 ? 1.18 : 1) + lateralWave;
    if (this.x < 68 || this.x > W - 68) this.vx *= -1;
    this.y = 112 + Math.sin(this.timer * (this.phase === 3 ? .045 : .025)) * (this.phase === 3 ? 48 : 34);
    this.weakAngle += this.phase === 3 ? .055 : .025;

    this.specialClock++;
    // Cada comandante tiene una mecánica propia además de sus patrones de disparo.
    if (this.variant === 2 && player && this.specialClock % (this.phase === 3 ? 150 : 220) < 48) {
      const pull = this.phase === 3 ? 0.72 : 0.38;
      player.x += Math.sign(this.x - player.x) * pull;
      player.x = Math.max(player.radius, Math.min(W - player.radius, player.x));
      if (this.specialClock % 55 === 0) addFloatingText(W / 2, H * .62, "CAMPO GRAVITATORIO: ¡CONTRARRESTA!", "#ffd166");
    }
    if (this.variant === 3 && this.specialClock % (this.phase === 3 ? 165 : 245) === 0 && enemies.length < (IS_LOW_POWER ? 8 : 12)) {
      const adds = this.phase === 3 ? 3 : 2;
      for (let i = 0; i < adds; i++) enemies.push(new EnemyShip(["weaver", "interceptor", "scout"][i % 3]));
      addFloatingText(this.x, this.y + 64, "LA REINA INVOCA REFUERZOS", "#7cf7c8");
    }
    if (this.variant === 4 && this.phase === 3 && this.specialClock % 190 === 0) {
      for (let i = 0; i < 2; i++) enemies.push(new EnemyShip(i ? "lancer" : "bomber"));
      state.flash = Math.max(state.flash, .10);
      addFloatingText(W / 2, H * .22, "ECLIPSE: ESCUADRA DE ÉLITE", "#ff6688");
    }

    if (this.variant === 5 && this.specialClock % (this.phase === 3 ? 145 : 230) === 0) {
      for(let i=0;i<(this.phase===3?8:5);i++){const q=i*Math.PI*2/(this.phase===3?8:5);enemyBullets.push({x:this.x+Math.cos(q)*62,y:this.y+Math.sin(q)*38,vx:Math.cos(q)*2.1,vy:Math.sin(q)*2.1+1.1,color:"#d8e2f0"});}
    }
    if (this.variant === 6 && this.specialClock % (this.phase===3?170:260)<55 && player) {player.x+=Math.sign(this.x-player.x)*(this.phase===3?.95:.5);player.x=Math.max(player.radius,Math.min(W-player.radius,player.x));}
    if (this.variant === 7 && this.specialClock % (this.phase===3?155:225)===0) {for(const side of [-1,1])for(let i=0;i<3;i++)enemyBullets.push({x:this.x+side*48,y:this.y+20,vx:side*(1.5+i*.65),vy:3.4+i*.25,color:"#ff874a"});}
    if (this.variant === 8 && this.specialClock % (this.phase===3?125:195)===0) {const lanes=this.phase===3?7:5;for(let i=0;i<lanes;i++){const x=(i+1)*W/(lanes+1);enemyBullets.push({x,y:this.y+22,vx:(player?Math.sign(player.x-x):0)*.65,vy:4.4,color:"#b9a0ff"});}}
    if (this.variant === 9 && this.phase===3 && this.specialClock%145===0) {for(let i=0;i<18;i++){const q=i*Math.PI*2/18;enemyBullets.push({x:this.x,y:this.y,vx:Math.cos(q)*4.4,vy:Math.sin(q)*4.4,color:"#ff3d8d"});}state.flash=Math.max(state.flash,.14);}
    const cadence = Math.max(22, (this.phase === 1 ? 68 : this.phase === 2 ? 48 : 32) - Math.floor(state.level / 4));
    if (player && this.attackClock % cadence === 0 && enemyBullets.length < (IS_LOW_POWER ? 90 : 150)) {
      const aim = Math.atan2(player.y - this.y, player.x - this.x);
      const speed = 4.1 + Math.min(3.1, state.level * .04) + (this.phase - 1) * .55;
      const addShot = (angle, velocity = speed, color = "#ff3864") => {
        if (enemyBullets.length < (IS_LOW_POWER ? 90 : 150)) {
          enemyBullets.push({ x: this.x, y: this.y + 18, vx: Math.cos(angle) * velocity, vy: Math.sin(angle) * velocity, color });
        }
      };

      if (this.variant === 0) {
        // Leviatán: anillos de plasma que se expanden y abanicos de cobertura.
        const count = this.phase === 3 ? 16 : this.phase === 2 ? 12 : 9;
        for (let i = 0; i < count; i++) addShot(i * Math.PI * 2 / count + this.timer * (this.phase === 3 ? .09 : .035), speed * .78, "#a855f7");
        if (this.phase >= 2) [-.34, 0, .34].forEach(o => addShot(aim + o, speed * 1.05, "#ff9e00"));
      } else if (this.variant === 1) {
        // Destructor: lanzas rápidas dirigidas al lugar del piloto.
        const spread = this.phase === 3 ? .075 : .13;
        for (let i = -2; i <= 2; i++) addShot(aim + i * spread, speed * (this.phase === 3 ? 1.48 : 1.2), "#ff9e45");
        if (this.phase >= 2) {
          addShot(aim - .55, speed * .9, "#ffe08a");
          addShot(aim + .55, speed * .9, "#ffe08a");
        }
      } else if (this.variant === 2) {
        // Anomalía: espiral gravitatoria que obliga a cambiar de carril.
        const count = this.phase === 3 ? 14 : 10;
        for (let i = 0; i < count; i++) addShot(i * Math.PI * 2 / count + this.timer * .075, speed * .72, "#22f0d0");
        if (this.phase >= 2) [-.22, 0, .22].forEach(o => addShot(aim + o, speed * 1.05, "#fff06a"));
      } else if (this.variant === 3) {
        // Reina: abanicos escalonados que cubren zonas distintas.
        const offsets = this.phase === 3 ? [-.62, -.46, -.30, -.14, .02, .18, .34, .50, .66] : [-.48, -.30, -.12, .06, .24, .42];
        offsets.forEach(o => addShot(aim + o, speed * (this.phase === 3 ? 1.08 : .92), "#75f0c4"));
      } else if (this.variant === 4) {
        const count=this.phase===3?18:12;for(let i=0;i<count;i++)addShot(i*Math.PI*2/count+this.timer*.12,speed*.82,"#ff3864");
        [-.30,-.15,0,.15,.30].forEach(o=>addShot(aim+o,speed*(this.phase===3?1.45:1.18),"#fff06a"));
      } else if (this.variant === 5) {
        for(let i=-3;i<=3;i++)addShot(aim+i*.2,speed*(i%2?1.05:1.3),"#d8e2f0");
        if(this.phase>=2)for(let i=0;i<8;i++)addShot(i*Math.PI/4+this.timer*.025,speed*.68,"#9aa8bc");
      } else if (this.variant === 6) {
        const n=this.phase===3?20:14;for(let i=0;i<n;i++)addShot(i*Math.PI*2/n-this.timer*.09,speed*(this.phase===3?1.12:.78),"#ffad66");
        if(this.phase>=2)addShot(aim,speed*1.65,"#fff0c2");
      } else if (this.variant === 7) {
        for(const side of [-1,1])for(let i=0;i<4;i++)addShot(aim+side*(.18+i*.13),speed*(1+i*.12),"#ff874a");
      } else if (this.variant === 8) {
        const n=this.phase===3?16:10;for(let i=0;i<n;i++)addShot(i*Math.PI*2/n+this.timer*.045,speed*.9,"#b9a0ff");
        [-.12,0,.12].forEach(o=>addShot(aim+o,speed*1.5,"#fff"));
      } else {
        const n=this.phase===3?24:16;for(let i=0;i<n;i++)addShot(i*Math.PI*2/n+this.timer*.14,speed*1.02,"#ff3d8d");
        for(let i=-3;i<=3;i++)addShot(aim+i*.11,speed*1.62,"#fff0f6");
      }
    }
  }

  getWeakPoint() {
    return {
      x: this.x + Math.cos(this.weakAngle) * this.weakRadius,
      y: this.y + Math.sin(this.weakAngle) * this.weakRadius
    };
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    const glow = ["#a855f7","#e879f9","#22f0d0","#ff9f1c","#ff3864","#d8e2f0","#ffad66","#ff874a","#b9a0ff","#ff3d8d"][this.variant];
    ctx.shadowBlur = IS_LOW_POWER ? 0 : 24;
    ctx.shadowColor = glow;
    ctx.fillStyle = this.phase === 3 ? "#4a071c" : "#2b0918";
    ctx.strokeStyle = glow;
    ctx.lineWidth = this.phase === 3 ? 4 : 3;

    ctx.beginPath();
    if (this.variant === 0) {
      ctx.moveTo(0, 58); ctx.lineTo(-72, 18); ctx.lineTo(-58, -28); ctx.lineTo(-24, -50);
      ctx.lineTo(24, -50); ctx.lineTo(58, -28); ctx.lineTo(72, 18);
    } else if (this.variant === 1) {
      ctx.moveTo(0, 62); ctx.lineTo(-30, 12); ctx.lineTo(-22, -48); ctx.lineTo(0, -35);
      ctx.lineTo(22, -48); ctx.lineTo(30, 12);
    } else if (this.variant === 2) {
      for (let i = 0; i < 10; i++) {
        const a = -Math.PI / 2 + i * Math.PI * 2 / 10;
        const r = i % 2 ? 34 : 66;
        const x = Math.cos(a) * r, y = Math.sin(a) * r;
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
    } else if (this.variant === 3) {
      ctx.moveTo(0, 58); ctx.lineTo(-68, 8); ctx.lineTo(-42, -42); ctx.lineTo(-12, -24);
      ctx.lineTo(0, -54); ctx.lineTo(12, -24); ctx.lineTo(42, -42); ctx.lineTo(68, 8);
    } else if (this.variant === 4) {
      ctx.moveTo(0,66);ctx.lineTo(-76,22);ctx.lineTo(-54,-44);ctx.lineTo(-18,-34);ctx.lineTo(0,-62);ctx.lineTo(18,-34);ctx.lineTo(54,-44);ctx.lineTo(76,22);
    } else if (this.variant === 5) {
      ctx.moveTo(-78,40);ctx.lineTo(-68,-28);ctx.lineTo(-28,-56);ctx.lineTo(0,-42);ctx.lineTo(28,-56);ctx.lineTo(68,-28);ctx.lineTo(78,40);ctx.lineTo(30,25);ctx.lineTo(0,60);ctx.lineTo(-30,25);
    } else if (this.variant === 6) {
      ctx.moveTo(0,-72);ctx.lineTo(28,-28);ctx.lineTo(70,-8);ctx.lineTo(42,22);ctx.lineTo(54,62);ctx.lineTo(0,40);ctx.lineTo(-54,62);ctx.lineTo(-42,22);ctx.lineTo(-70,-8);ctx.lineTo(-28,-28);
    } else if (this.variant === 7) {
      ctx.moveTo(-82,-34);ctx.lineTo(-22,-50);ctx.lineTo(0,-26);ctx.lineTo(22,-50);ctx.lineTo(82,-34);ctx.lineTo(60,10);ctx.lineTo(28,24);ctx.lineTo(18,62);ctx.lineTo(-18,62);ctx.lineTo(-28,24);ctx.lineTo(-60,10);
    } else if (this.variant === 8) {
      for(let i=0;i<12;i++){const q=-Math.PI/2+i*Math.PI/6,r=i%2?35:72,x=Math.cos(q)*r,y=Math.sin(q)*r;if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);}
    } else {
      ctx.moveTo(0,-78);ctx.lineTo(22,-38);ctx.lineTo(78,-20);ctx.lineTo(42,8);ctx.lineTo(62,64);ctx.lineTo(0,36);ctx.lineTo(-62,64);ctx.lineTo(-42,8);ctx.lineTo(-78,-20);ctx.lineTo(-22,-38);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Blindaje exterior y núcleo central.
    ctx.shadowBlur = 0;
    ctx.strokeStyle = "rgba(255,255,255,.32)";
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(0, 2, 25, 0, Math.PI * 2); ctx.stroke();
    const core = ctx.createRadialGradient(-4, -4, 2, 0, 2, 18);
    core.addColorStop(0, "#ffffff"); core.addColorStop(.35, glow); core.addColorStop(1, "#39051a");
    ctx.fillStyle = core;
    ctx.beginPath(); ctx.arc(0, 2, 16, 0, Math.PI * 2); ctx.fill();
    ctx.restore();

    const weak = this.getWeakPoint();
    const pulse = 1 + Math.sin(this.timer * .16) * .16;
    ctx.save();
    ctx.translate(weak.x, weak.y);
    ctx.rotate(this.weakAngle);
    ctx.strokeStyle = "#fff4a3";
    ctx.lineWidth = 2;
    ctx.shadowBlur = IS_LOW_POWER ? 0 : 18;
    ctx.shadowColor = "#ffe66d";
    ctx.beginPath(); ctx.arc(0, 0, 11 * pulse, 0, Math.PI * 2); ctx.stroke();
    ctx.fillStyle = "#fff7c2";
    ctx.beginPath(); ctx.moveTo(0, -7 * pulse); ctx.lineTo(7 * pulse, 0); ctx.lineTo(0, 7 * pulse); ctx.lineTo(-7 * pulse, 0); ctx.closePath(); ctx.fill();
    ctx.restore();
  }
}

const POWERUP_POOL = [
  { id: "triple",    label: "W", color: "#00f0ff", text: "DISPARO TRIPLE" },
  { id: "rapid",     label: "R", color: "#00ff88", text: "FUEGO RÁPIDO" },
  { id: "shield",    label: "S", color: "#38b6ff", text: "ESCUDO ENERGÍA" },
  { id: "wingmen",   label: "D", color: "#c77dff", text: "NAVES ESCOLTA" },
  { id: "missiles",  label: "M", color: "#ff9e00", text: "MISILES BUSCADORES" },
  { id: "bomb",      label: "B", color: "#ff2a85", text: "+1 SUPER BOMBA" },
  { id: "life",      label: "+", color: "#52b788", text: "+1 VIDA CASCO" },
  { id: "cryo",      label: "C", color: "#90e0ef", text: "CRIO-ESCUDO (SUPERNOVA)" },
  { id: "antigrav",  label: "G", color: "#ffd166", text: "ANTIGRAVEDAD (AGUJERO)" },
  { id: "faraday",   label: "F", color: "#b5179e", text: "JAULA FARADAY (MAGNETAR)" },
  { id: "antigamma", label: "X", color: "#06d6a0", text: "BLINDAJE ANTI-GAMMA" }
];

function spawnPowerup(x, y) {
  if (Math.random() > 0.24) return;
  const item = POWERUP_POOL[Math.floor(Math.random() * POWERUP_POOL.length)];
  powerups.push({ x, y, vy: 2.2, ...item });
}

function applyPowerup(p) {
  SoundFX.play("powerup");
  addFloatingText(p.x, p.y - 15, p.text, p.color);
  if (p.id === "bomb") {
    player.bombs = Math.min(5, player.bombs + 1);
  } else if (p.id === "life") {
    player.lives = Math.min(6, player.lives + 1);
  } else {
    player.buffs[p.id] = 660;
  }
  updateHUD();
}
/* ============================================================================
   AETHER NOVA: ECLIPSE - MOTOR AUDITADO (PARTE 4B)
   ============================================================================ */

function spawnExplosion(x, y, color, count = 14) {
  if (IS_LOW_POWER) count = Math.ceil(count * 0.58);
  if (particles.length > (IS_LOW_POWER ? 65 : 130)) return;
  for (let i = 0; i < count; i++) {
    const ang = Math.random() * Math.PI * 2;
    const spd = Math.random() * 4.5 + 1;
    particles.push({
      x,
      y,
      vx: Math.cos(ang) * spd,
      vy: Math.sin(ang) * spd,
      life: 22 + Math.random() * 12,
      maxLife: 34,
      color,
      size: Math.random() * 3 + 1.5
    });
  }
}

function spawnImpactBurst(x, y, color = "#ff5a45", count = 13) {
  const cap = IS_LOW_POWER ? 70 : 150;
  for (let i = 0; i < count && particles.length < cap; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 2.8 + Math.random() * 6.2;
    particles.push({ x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
      life: 10 + Math.random() * 9, maxLife: 19, color,
      size: 2.2 + Math.random() * 2.8 });
  }
}

function addFloatingText(x, y, text, color = "#ffffff") {
  if (floatingTexts.length > 12) floatingTexts.shift();
  floatingTexts.push({ x, y, text, color, life: 55 });
}

function triggerSuperBomb() {
  if (state.mode !== "PLAYING" || !player || player.bombs <= 0) return;
  player.bombs--;
  SoundFX.play("supernova");
  state.shake = 28;
  state.flash = 0.78;
  if (navigator.vibrate) { try { navigator.vibrate(); } catch (e) {} }

  asteroids.forEach((a) => {
    spawnExplosion(a.x, a.y, "#ffcc33", 8);
    state.score += 25;
  });
  asteroids = [];

  enemies.forEach((e) => {
    spawnExplosion(e.x, e.y, "#ff2a85", 12);
    state.score += 100;
  });
  enemies = [];
  enemyBullets = [];

  if (boss) {
    const bombBonus = (commercialData.upgrades?.capacitor || 0) * 0.04;
    boss.hp -= Math.ceil(boss.maxHp * Math.min(0.47, 0.35 + bombBonus));
    addFloatingText(boss.x, boss.y, "¡IMPACTO TERMONUCLEAR!", "#ffcc33");
    if (boss.hp <= 0) defeatBoss();
  }

  addFloatingText(player.x, player.y - 40, "¡SUPER BOMBA DETONADA!", "#ff2a85");
  updateHUD();
}

let spawnClock = 0;

function updateSpawner() {
  spawnClock++;
  const eventDifficulty = activeGalacticEvent ? Math.max(1, Math.min(3, Number(activeGalacticEvent.difficulty_multiplier) || 1)) : 1;
  const diff = (1 + (state.level - 1) * 0.038 + Math.floor((state.level - 1) / 10) * 0.08) * (DIFFICULTY[state.difficulty]?.spawn || 1) * eventDifficulty;

  const isBossSector = state.level % 10 === 0;
  if (isBossSector && !boss && state.levelProgress >= state.levelTarget - 1) {
    boss = new BossShip();
    return;
  }

  const rockInterval = Math.max(10, Math.round(43 / diff));
  if (spawnClock % rockInterval === 0 && !boss && asteroids.length < Math.min(34, 16 + Math.floor(state.level / 2))) {
    const r = Math.random();
    let kind = "normal";
    if (state.level >= 2 && r < 0.16) kind = "explosive";
    else if (state.level >= 3 && r < 0.30) kind = "shooting_star";
    else if (state.level >= 4 && r < 0.44) kind = "magnetic";
    else if (state.level >= 6 && r < 0.56) kind = "crystal";

    const radius = kind === "shooting_star" ? 12 : 18 + Math.random() * 20;
    asteroids.push(new Asteroid(null, null, radius, kind));
  }

  const enemyInterval = Math.max(27, Math.round(178 / (diff * (1 + state.level * .016))));
  const enemyCap = Math.min(IS_LOW_POWER ? 10 : 16, 4 + Math.floor(state.level / 2));
  if (state.level >= 1 && spawnClock % enemyInterval === 0 && !boss && enemies.length < enemyCap) {
    const roll = Math.random();
    let variant = activeGalacticEvent?.enemy_variant || "scout";
    if (!activeGalacticEvent) {
      if (state.level >= 30 && roll < .13) variant = "carrier";
      else if (state.level >= 16 && roll < .31) variant = "lancer";
      else if (state.level >= 9 && roll < .49) variant = "weaver";
      else if (state.level >= 18 && roll < .68) variant = "bomber";
      else if (state.level >= 6 && roll < .84) variant = "interceptor";
    }
    enemies.push(new EnemyShip(variant));

    // Oleadas coordinadas: desde los sectores medios aparecen formaciones,
    // no solamente enemigos aislados.
    const waveChance = Math.min(.72, .16 + state.level * .012);
    if (state.level >= 8 && Math.random() < waveChance) {
      const waveSize = state.level >= 45 ? 3 : state.level >= 20 ? 2 : 1;
      const formation = activeGalacticEvent
        ? [activeGalacticEvent.enemy_variant || "scout"]
        : state.level >= 30
          ? ["weaver", "lancer", "bomber"]
          : state.level >= 12 ? ["scout", "interceptor", "weaver"] : ["scout", "interceptor"];
      for (let i = 0; i < waveSize && enemies.length < enemyCap; i++) {
        enemies.push(new EnemyShip(formation[(i + Math.floor(Math.random() * formation.length)) % formation.length]));
      }
      if (waveSize > 1) addFloatingText(W / 2, H * .19, "¡FORMACIÓN HOSTIL DETECTADA!", "#ff9e00");
    }
  }

  if (spawnClock % Math.max(190, 390 - state.level * 2) === 0 && phenomena.length === 0 && state.level >= 2) {
    const pool = ["blackhole", "supernova"];
    if (state.level >= 4) pool.push("magnetar");
    if (state.level >= 6) pool.push("pulsar");
    if (state.level >= 5) pool.push("ionstorm");
    if (state.level >= 8) pool.push("debrisfield");
    const chosen = pool[Math.floor(Math.random() * pool.length)];
    phenomena.push(new CosmicPhenomenon(chosen));
    // En sectores avanzados pueden superponerse dos amenazas, con un límite estricto.
    const comboChance = IS_LOW_POWER ? 0.10 : 0.22;
    if (state.level >= 30 && Math.random() < comboChance && phenomena.length < 2) {
      const secondaryPool = pool.filter(kind => kind !== chosen && kind !== "supernova");
      if (secondaryPool.length) {
        const secondary = secondaryPool[Math.floor(Math.random() * secondaryPool.length)];
        phenomena.push(new CosmicPhenomenon(secondary));
        addFloatingText(W / 2, H * 0.31, "¡EVENTO CÓSMICO COMBINADO!", "#ff8cf4");
      }
    }
    const names = {
      blackhole: "⚠ ANOMALÍA: AGUJERO NEGRO",
      supernova: "⚠ ALERTA: ESTRELLA EN SUPERNOVA",
      magnetar: "⚠ CAMPO DE MAGNETAR DETECTADO",
      pulsar: "⚠ PÚLSAR DE RAYOS GAMMA",
      ionstorm: "⚠ TORMENTA IÓNICA: DESCARGAS INMINENTES",
      debrisfield: "⚠ CAMPO DE ESCOMBROS: IMPACTOS MÚLTIPLES"
    };
    addFloatingText(W / 2, H * 0.25, names[chosen], "#ffcc33");
  }
}


function showSectorBanner(level) {
  let el = document.getElementById("sector-transition-banner");
  if (!el) {
    el = document.createElement("div");
    el.id = "sector-transition-banner";
    el.className = "sector-transition-banner";
    el.setAttribute("aria-live", "polite");
    document.body.appendChild(el);
  }
  const era = ERAS[Math.min(9, Math.floor((level - 1) / 10))];
  const bossText = level % 10 === 0 ? " • COMANDANTE DE SECTOR DETECTADO" : "";
  el.innerHTML = `<span>SECTOR ${String(level).padStart(2,"0")} / 100</span><strong>${era.name}</strong><small>${level % 10 === 1 ? "NUEVA ZONA ESTELAR" : "AMENAZA EN AUMENTO"}${bossText}</small>`;
  el.classList.remove("show");
  void el.offsetWidth;
  el.classList.add("show");
  clearTimeout(sectorBannerTimer);
  sectorBannerTimer = setTimeout(() => el.classList.remove("show"), 2100);
}

function advanceProgress(amount = 1) {
  if (boss || state.mode !== "PLAYING") return;
  state.levelProgress += amount;
  if (state.levelProgress >= state.levelTarget) {
    completeSector();
  }
  updateHUD();
}

function defeatBoss() {
  if (!boss) return;
  const defeated = boss.name;
  const rewardCredits = [500, 650, 800, 1000, 1500][boss.variant] || 500;
  void trackGalacticEventProgress('defeat_boss', 1);
  SoundFX.play("supernova");
  spawnExplosion(boss.x, boss.y, "#ff2a85", 45);
  state.score += 1000 * state.level;
  commercialData.credits += rewardCredits;
  commercialData.bossDefeats = (commercialData.bossDefeats || 0) + 1;
  recordMissionProgress("bosses", 1);
  commercialData.bossTrophies = Array.isArray(commercialData.bossTrophies) ? commercialData.bossTrophies : [];
  if (!commercialData.bossTrophies.includes(defeated)) commercialData.bossTrophies.push(defeated);
  saveCommercialData();
  addFloatingText(W / 2, H * .42, `JEFE DERROTADO: ${defeated}`, "#ffe08a");
  addFloatingText(W / 2, H * .48, `+${rewardCredits} CRÉDITOS • +1 BOMBA`, "#75f0c4");
  player.bombs = Math.min(5, player.bombs + 1);
  boss = null;
  document.getElementById("boss-bar-wrap").classList.add("hidden");
  completeSector();
}

function completeSector() {
  try {
    if (state.runMode === "campaign" && state.level >= state.maxLevels) {
      showStoryChronicle(9);
      return;
    }

    const completed = state.level;
    recordMissionProgress("sectors", 1);
    state.level++;
    void trackGalacticEventProgress('reach_sector', 1);
    state.levelProgress = 0;
    evaluateAchievements();
    void saveProgress({ quiet: true });
    state.levelTarget = 18 + Math.floor(state.level * 1.9);
    if (player) player.invuln = 90;

    enemyBullets = [];
    if (particles.length > (IS_LOW_POWER ? 24 : 40)) particles.length = IS_LOW_POWER ? 24 : 40;

    if (completed % 10 === 0) {
      for (const k in RockCache) delete RockCache[k];
      const eraIndex = Math.min(9, Math.floor(completed / 10) - 1);
      if (state.runMode === "campaign") showStoryChronicle(eraIndex);
      else {
        addFloatingText(W / 2, H * 0.35, state.runMode === "survival" ? `OLEADA ${state.level}` : `OBJETIVO: ${getDailyChallenge().target.toLocaleString("es-AR")} PTS`, "#00f0ff");
        showSectorBanner(state.level);
      }
    } else {
      addFloatingText(W / 2, H * 0.35, `SECTOR ${state.level} INICIADO`, "#00f0ff");
      showSectorBanner(state.level);
    }
    updateHUD();
  } catch (err) {
    console.error("Error en cambio de sector:", err);
    state.mode = "PLAYING";
  }
}

function showBossCinematic(name, variant) {
  const panel = document.getElementById("boss-intro-cinematic");
  if (!panel) return;
  const subtitles = [
    "FIRMA GRAVITACIONAL: DEVORA-ÓRBITAS. EVITÁ SU ANILLO DE IMPACTO.",
    "CAMPO MAGNÉTICO HOSTIL. PREPARATE PARA EMBESTIDAS Y DESCARGAS.",
    "EMISIÓN GAMMA DETECTADA. NO CRUCES SU HAZ FRONTAL.",
    "BLINDAJE DE OBSIDIANA. CONCENTRÁ EL FUEGO EN EL NÚCLEO.",
    "NÉMESIS DEL ECLIPSE. TODAS LAS ARMAS AUTORIZADAS.",
    "BLINDAJE DE OBSIDIANA. DESTRUÍ SUS PLACAS ANTES DEL NÚCLEO.",
    "DEVORADOR ESTELAR. EVITÁ LA SUCCIÓN Y SUS ONDAS DE CHOQUE.",
    "ARCA INFERNAL. NEUTRALIZÁ SUS BATERÍAS LATERALES.",
    "SERAFÍN ABISMAL. ATENCIÓN A LOS HACES CRUZADOS.",
    "NÚCLEO OMEGA. TODAS LAS DEFENSAS EN ESTADO CRÍTICO."
  ];
  document.getElementById("boss-intro-title").textContent = name;
  document.getElementById("boss-intro-subtitle").textContent = subtitles[variant] || "IDENTIFICÁ EL NÚCLEO EXPUESTO Y SOBREVIVÍ.";
  panel.classList.remove("hidden", "boss-intro-out");
  void panel.offsetWidth;
  panel.classList.add("boss-intro-show");
  clearTimeout(bossIntroTimer);
  bossIntroTimer = setTimeout(() => {
    panel.classList.remove("boss-intro-show");
    panel.classList.add("boss-intro-out");
    setTimeout(() => panel.classList.add("hidden"), 520);
  }, 2450);
}

function showStoryChronicle(eraIndex) {
  state.mode = "STORY";
  const safeIdx = Math.max(0, Math.min(ERAS.length - 1, eraIndex));
  const era = ERAS[safeIdx];
  const mk = player.getEvolutionTier();
  const card = document.getElementById("story-cinematic-card");
  const regionNumber = String(safeIdx + 1).padStart(2, "0");
  if (card) {
    card.style.setProperty("--story-top", era.bgTop);
    card.style.setProperty("--story-bottom", era.bgBot);
    card.style.setProperty("--story-glow", era.nebula1);
    card.style.setProperty("--story-accent", era.rockMain);
  }
  document.getElementById("story-region-index").textContent = `REGIÓN ${regionNumber} / ${String(ERAS.length).padStart(2, "0")}`;
  document.getElementById("story-chapter").textContent = era.chapter;
  document.getElementById("story-title").textContent = era.title;
  document.getElementById("story-text").textContent = era.story;
  const directive = safeIdx === 9 ? "SELLAR LA SINGULARIDAD" : safeIdx >= 7 ? "PREPARAR EL ASALTO FINAL" : safeIdx >= 4 ? "ROMPER LA LÍNEA DE DEFENSA" : "EXPLORAR EL SECTOR Y ELIMINAR LA AMENAZA";
  document.getElementById("story-intel").innerHTML = `<span>DIRECTIVA DE MISIÓN</span><strong>${directive}</strong>`;
  document.getElementById("story-upgrade").textContent =
    state.level >= 100
      ? "¡CAMPAÑA GALÁCTICA COMPLETADA AL 100%!"
      : `¡NAVE EVOLUCIONADA A FASE MK-${mk}! ARMAMENTO MEJORADO`;

  const screen = document.getElementById("screen-story");
  screen.classList.remove("hidden", "story-cinematic-enter");
  void screen.offsetWidth;
  screen.classList.add("story-cinematic-enter");
  setTimeout(() => saveProgress(), 100);
}
/* ============================================================================
   AETHER NOVA: ECLIPSE - MOTOR AUDITADO (PARTE 5A)
   ============================================================================ */

function paintEraBackground(era) {
  const key = `${state.level}:${W}x${H}`;
  if (eraBackgroundCache && lastEraBackgroundKey === key) return;
  const off = document.createElement("canvas");
  off.width = Math.max(1, Math.round(W * (IS_LOW_POWER ? 0.62 : 0.82)));
  off.height = Math.max(1, Math.round(H * (IS_LOW_POWER ? 0.62 : 0.82)));
  const c = off.getContext("2d");
  const w = off.width, h = off.height;
  const bg = c.createLinearGradient(0, 0, 0, h);
  bg.addColorStop(0, era.bgTop); bg.addColorStop(1, era.bgBot);
  c.fillStyle = bg; c.fillRect(0, 0, w, h);
  const n1 = c.createRadialGradient(w*.3,h*.3,8,w*.3,h*.3,w*.7);
  n1.addColorStop(0, era.nebula1); n1.addColorStop(1, "rgba(0,0,0,0)");
  c.fillStyle=n1; c.fillRect(0,0,w,h);
  const n2 = c.createRadialGradient(w*.75,h*.65,8,w*.75,h*.65,w*.65);
  n2.addColorStop(0, era.nebula2); n2.addColorStop(1, "rgba(0,0,0,0)");
  c.fillStyle=n2; c.fillRect(0,0,w,h);
  const sectorTints = ["rgba(0,220,255,.075)","rgba(255,90,170,.065)","rgba(130,90,255,.08)","rgba(255,180,55,.07)","rgba(40,255,170,.065)"];
  const tint = c.createRadialGradient(w*(.18 + (state.level%4)*.2),h*(.22 + (state.level%3)*.22),4,w*.5,h*.5,w*.78);
  tint.addColorStop(0,sectorTints[(state.level-1)%sectorTints.length]); tint.addColorStop(1,"rgba(0,0,0,0)");
  c.fillStyle=tint; c.fillRect(0,0,w,h);
  eraBackgroundCache = off; lastEraBackgroundKey = key;
}

function updateAndDraw() {
  requestAnimationFrame(updateAndDraw);

  const era = ERAS[Math.min(9, Math.floor((state.level - 1) / 10))];
  paintEraBackground(era);
  ctx.drawImage(eraBackgroundCache, 0, 0, W, H);

  stars.forEach((s) => {
    if (state.mode === "PLAYING") s.y += s.speed;
    if (s.y > H) {
      s.y = 0;
      s.x = Math.random() * W;
    }
    ctx.globalAlpha = s.alpha;
    ctx.fillStyle = s.tint;
    ctx.fillRect(s.x, s.y, s.size, s.size);
  });
  ctx.globalAlpha = 1;

  if (state.mode !== "PLAYING" || !player) {
    if (window.__AETHER3D_ACTIVE) {
      window.__AETHER3D_STATE = { playing: false, width: W, height: H };
    }
    return;
  }

  ctx.save();
  if (state.shake > 0) {
    ctx.translate((Math.random() - 0.5) * state.shake, (Math.random() - 0.5) * state.shake);
    state.shake *= 0.88;
    if (state.shake < 0.5) state.shake = 0;
  }

  if (state.comboTimer > 0) state.comboTimer--;
  else state.combo = 1;

  updateSpawner();
  player.update();

  // Puente de estado de solo lectura para el renderizador 3D. La simulación,
  // colisiones, armas, progresión y guardado siguen perteneciendo al motor original.
  if (window.__AETHER3D_ACTIVE) {
    window.__AETHER3D_STATE = {
      x: player.x, y: player.y, width: W, height: H, level: state.level, tilt: player.tilt,
      selectedShip: state.selectedShip, type: player.type, color: player.color, accent: player.accent,
      invulnerable: player.invuln > 0 && Math.floor(player.invuln / 5) % 2 === 0,
      shield: player.buffs.shield > 0, playing: state.mode === "PLAYING",
      enemyShots: enemyBullets.filter(b => !b.dead).map(b => ({
        id: b.aether3dId || (b.aether3dId = "enemy-shot-" + Math.random().toString(36).slice(2)),
        x: b.x, y: b.y, vx: b.vx, vy: b.vy, color: b.color || "#ff4d6d"
      })),
      shots: bullets.filter(b => !b.dead).map(b => ({
        id: b.aether3dId || (b.aether3dId = "shot-" + Math.random().toString(36).slice(2)),
        x: b.x, y: b.y, color: b.color || "#39eaff", missile: !!b.missile
      })),
      asteroids: asteroids.filter(a => !a.dead).map(a => ({
        id: a.aether3dId, x: a.x, y: a.y, radius: a.radius, kind: a.kind,
        rot: a.rot, hitFlash: a.hitFlash, depth: Math.min(18, Math.max(0, a.radius * 0.12)),
        sx: a.kind === "magnetic" ? 1.15 : 1, sy: a.kind === "shooting_star" ? .72 : 1,
        sz: a.kind === "shooting_star" ? .72 : 1
      })),
      enemies: enemies.filter(e => !e.dead).map(e => ({
        id: e.aether3dId || (e.aether3dId = "enemy-" + (e._aether3dId || (e._aether3dId = Math.random().toString(36).slice(2)))),
        x: e.x, y: e.y, radius: e.radius, variant: e.variant, age: e.age || 0
      })),
      boss: boss && !boss.dead ? {
        x: boss.x, y: boss.y, radius: boss.radius, variant: boss.variant,
        phase: boss.phase, hp: boss.hp, maxHp: boss.maxHp, weakAngle: boss.weakAngle
      } : null,
      phenomena: phenomena.filter(ph => !ph.dead).map(ph => ({
        id: ph.aether3dId || (ph.aether3dId = "phenomenon-" + Math.random().toString(36).slice(2)),
        kind: ph.kind, x: ph.x, y: ph.y, radius: ph.radius,
        timer: ph.timer, maxTimer: ph.maxTimer, angle: ph.angle,
        strikeX: ph.strikeX, strikeFlash: ph.strikeFlash
      }))
    };
  }

  phenomena.forEach((ph) => {
    ph.update();
    if (!window.__AETHER3D_ACTIVE) ph.draw();
  });
  phenomena = phenomena.filter((ph) => !ph.dead);

  bullets.forEach((b) => {
    if (b.missile) {
      const candidates = boss ? [boss] : [...enemies, ...asteroids];
      let target = null;
      let nearest = Infinity;
      for (const candidate of candidates) {
        if (!candidate || candidate.dead) continue;
        const distance = Math.hypot(candidate.x - b.x, candidate.y - b.y);
        if (distance < nearest) { nearest = distance; target = candidate; }
      }
      if (target) {
        const ang = Math.atan2(target.y - b.y, target.x - b.x);
        b.vx += Math.cos(ang) * 0.42;
        b.vy += Math.sin(ang) * 0.42;
        const speed = Math.hypot(b.vx, b.vy);
        const maxSpeed = 12;
        if (speed > maxSpeed) { b.vx = b.vx / speed * maxSpeed; b.vy = b.vy / speed * maxSpeed; }
      }
    }
    b.prevX = b.x;
    b.prevY = b.y;
    b.x += b.vx;
    b.y += b.vy;
    if (b.y < -30 || b.x < -30 || b.x > W + 30) b.dead = true;

    if (!window.__AETHER3D_ACTIVE) {
      ctx.fillStyle = b.color;
      ctx.shadowBlur = IS_LOW_POWER ? 0 : 10;
      ctx.shadowColor = b.color;
      ctx.fillRect(b.x - (b.missile ? 3 : 2), b.y - 8, b.missile ? 6 : 4, b.missile ? 16 : 14);
      ctx.shadowBlur = 0;
    }
  });

  asteroids.forEach((a) => {
    a.update();
    if (!window.__AETHER3D_ACTIVE) a.draw();

    if (Math.hypot(a.x - player.x, a.y - player.y) < a.radius + player.radius - 4) {
      a.dead = true;
      spawnImpactBurst((a.x + player.x) * .5, (a.y + player.y) * .5, "#ffb45e", IS_LOW_POWER ? 7 : 13);
      spawnExplosion(a.x, a.y, "#ffb45e", IS_LOW_POWER ? 6 : 11);
      player.takeDamage("COLISIÓN CON ASTEROIDE");
    }

    bullets.forEach((b) => {
      if (!b.dead && !a.dead && Math.hypot(b.x - a.x, b.y - a.y) < a.radius + 6) {
        b.dead = true;
        a.hp -= b.dmg;
        a.hitFlash = 12;
        spawnImpactBurst(b.x, b.y, a.kind === "magnetic" ? "#70e7ff" : "#ffd27a", IS_LOW_POWER ? 3 : 6);
        SoundFX.play("targetHit");
        if (a.hp <= 0) {
          a.dead = true;
          SoundFX.play("boom");
          state.shake = Math.max(state.shake, a.radius > 28 ? 8 : 4);
          spawnExplosion(a.x, a.y, "#ffcc33", IS_LOW_POWER ? 10 : 20);
          spawnImpactBurst(a.x, a.y, "#fff0b0", IS_LOW_POWER ? 8 : 16);
          spawnPowerup(a.x, a.y);

          if (a.kind === "explosive") {
            detonateAsteroidChain(a.x, a.y, a);
          } else if (a.radius > 28 && asteroids.length < 22) {
            asteroids.push(new Asteroid(a.x - 10, a.y, a.radius * 0.55, a.kind));
            asteroids.push(new Asteroid(a.x + 10, a.y, a.radius * 0.55, a.kind));
          }

          state.combo = Math.min(8, state.combo + 1);
          state.comboTimer = 140;
          state.score += 30 * state.combo;
          advanceProgress(1);
        }
      }
    });
  });

  enemies.forEach((e) => {
    e.prevX = e.x;
    e.prevY = e.y;
    e.update();
    if (!window.__AETHER3D_ACTIVE) e.draw();

    // Impacto por barrido: comprueba el recorrido completo del disparo
    // y el desplazamiento del caza durante este fotograma.
    bullets.forEach((b) => {
      if (b.dead || e.dead) return;
      const bx0 = Number.isFinite(b.prevX) ? b.prevX : b.x;
      const by0 = Number.isFinite(b.prevY) ? b.prevY : b.y;
      const ex0 = Number.isFinite(e.prevX) ? e.prevX : e.x;
      const ey0 = Number.isFinite(e.prevY) ? e.prevY : e.y;
      const rx = (b.x - bx0) - (e.x - ex0);
      const ry = (b.y - by0) - (e.y - ey0);
      const sx = bx0 - ex0, sy = by0 - ey0;
      const denom = rx * rx + ry * ry;
      const t = denom > 0 ? Math.max(0, Math.min(1, -(sx * rx + sy * ry) / denom)) : 0;
      const distance = Math.hypot(sx + rx * t, sy + ry * t);
      if (distance < e.radius + (b.missile ? 13 : 11)) {
        b.dead = true;
        e.hp -= b.dmg;
        spawnImpactBurst(b.x, b.y, "#ff8bc8", IS_LOW_POWER ? 3 : 6);
        SoundFX.play("targetHit");
        if (e.hp <= 0) {
          e.dead = true;
          SoundFX.play("boom");
          state.shake = Math.max(state.shake, e.radius > 24 ? 9 : 5);
          spawnExplosion(e.x, e.y, "#ff2a85", IS_LOW_POWER ? 12 : 24);
          spawnImpactBurst(e.x, e.y, "#ffd6ed", IS_LOW_POWER ? 8 : 17);
          spawnPowerup(e.x, e.y);
          state.score += 120 * state.combo;
          recordMissionProgress("kills", 1);
          advanceProgress(2);
        }
      }
    });

    // Solo si sobrevivió a los disparos puede chocar con el jugador.
    if (!e.dead && Math.hypot(e.x - player.x, e.y - player.y) < e.radius + player.radius) {
      e.dead = true;
      const impactX = (e.x + player.x) * 0.5;
      const impactY = (e.y + player.y) * 0.5;
      spawnImpactBurst(impactX, impactY, "#ff6688", IS_LOW_POWER ? 9 : 17);
      spawnExplosion(e.x, e.y, "#ff6688", IS_LOW_POWER ? 8 : 15);
      SoundFX.play("boom");
      player.takeDamage("CHOQUE CON NAVE ENEMIGA");
    }
  });

  if (boss) {
    boss.update();
    if (!window.__AETHER3D_ACTIVE) boss.draw();
    const hpBar = document.getElementById("boss-hp");
    if (hpBar) hpBar.style.width = `${Math.max(0, (boss.hp / boss.maxHp) * 100)}%`;
    const bossName = document.getElementById("boss-name");
    if (bossName) bossName.textContent = `${boss.name} • FASE ${boss.phase}/3`;

    bullets.forEach((b) => {
      if (!b.dead && boss) {
        const weak = boss.getWeakPoint();
        const weakHit = Math.hypot(b.x - weak.x, b.y - weak.y) < 15;
        const bodyHit = Math.hypot(b.x - boss.x, b.y - boss.y) < boss.radius;
        if (weakHit || bodyHit) {
          b.dead = true;
          const damage = Math.round(b.dmg * (weakHit ? 2.35 : 1));
          boss.hp -= damage;
          if (weakHit) {
            addFloatingText(weak.x, weak.y - 12, `NÚCLEO -${damage}`, "#fff29a");
            state.score += 18;
          }
          if (boss.hp <= 0) defeatBoss();
        }
      }
    });
  }

  enemyBullets.forEach((eb) => {
    eb.x += eb.vx;
    eb.y += eb.vy;
    if (eb.y > H + 20 || eb.x < -20 || eb.x > W + 20) eb.dead = true;

    if (!window.__AETHER3D_ACTIVE) {
      ctx.fillStyle = eb.color;
      ctx.beginPath();
      ctx.arc(eb.x, eb.y, 4.5, 0, Math.PI * 2);
      ctx.fill();
    }

    if (!eb.dead && Math.hypot(eb.x - player.x, eb.y - player.y) < player.radius - 3) {
      eb.dead = true;
      player.takeDamage("FUEGO ENEMIGO");
    }
  });

  powerups.forEach((p) => {
    p.y += p.vy;
    if (p.y > H + 30) p.dead = true;

    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, 15, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#050711";
    ctx.font = "bold 13px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(p.label, p.x, p.y);

    if (!p.dead && Math.hypot(p.x - player.x, p.y - player.y) < player.radius + 16) {
      p.dead = true;
      applyPowerup(p);
    }
  });

  particles.forEach((pt) => {
    pt.x += pt.vx;
    pt.y += pt.vy;
    pt.life--;
    ctx.globalAlpha = Math.max(0, pt.life / pt.maxLife);
    ctx.fillStyle = pt.color;
    ctx.shadowBlur = IS_LOW_POWER ? 0 : Math.min(12, pt.size * 2.4);
    ctx.shadowColor = pt.color;
    ctx.beginPath();
    ctx.arc(pt.x, pt.y, Math.max(1, pt.size * 0.62), 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  });
  ctx.globalAlpha = 1;

  floatingTexts.forEach((ft) => {
    ft.y -= 0.9;
    ft.life--;
    ctx.globalAlpha = Math.max(0, ft.life / 55);
    ctx.fillStyle = ft.color;
    ctx.font = "bold 13px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(ft.text, ft.x, ft.y);
  });
  ctx.globalAlpha = 1;

  if (!window.__AETHER3D_ACTIVE) player.draw();

  bullets = bullets.filter((b) => !b.dead);
  enemyBullets = enemyBullets.filter((eb) => !eb.dead);
  asteroids = asteroids.filter((a) => !a.dead);
  enemies.forEach(e => { if (e.dead && !e._eventCounted) { e._eventCounted = true; void trackGalacticEventProgress('destroy_enemies', 1); } });
  enemies = enemies.filter((e) => !e.dead);
  powerups = powerups.filter((p) => !p.dead);
  particles = particles.filter((pt) => pt.life > 0);
  floatingTexts = floatingTexts.filter((ft) => ft.life > 0);

  if (state.flash > 0) {
    ctx.fillStyle = `rgba(255,255,255,${state.flash})`;
    ctx.fillRect(0, 0, W, H);
    state.flash *= 0.86;
    if (state.flash < 0.02) state.flash = 0;
  }

  ctx.restore();
  renderBuffTags();
  if (state.mode === "PLAYING" && state.runMode === "daily" && state.score >= getDailyChallenge().target) {
    state.dailyChallengeWon = true;
    endGame(true);
  }
}
/* ============================================================================
   AETHER NOVA: ECLIPSE - MOTOR AUDITADO (PARTE 5B)
   ============================================================================ */

function updateHUD() {
  if (!player) return;
  const era = ERAS[Math.min(9, Math.floor((state.level - 1) / 10))];
  document.getElementById("ui-score").textContent = state.score.toLocaleString("es-AR");
  updateCommercialUI();
  document.getElementById("ui-level").textContent = state.runMode === "survival" ? `${state.level}/∞` : `${state.level}/100`;
  document.getElementById("ui-lives").textContent = player.lives;
  document.getElementById("ui-bombs").textContent = player.bombs;
  document.getElementById("ui-sector-name").textContent = `${era.name} (MK-${player.getEvolutionTier()})`;
  const pct = Math.min(100, (state.levelProgress / state.levelTarget) * 100);
  document.getElementById("ui-progress").style.width = `${pct}%`;
}

function renderBuffTags() {
  const box = document.getElementById("active-buffs");
  if (!player || !box) return;
  const labels = {
    triple: "TRIPLE LÁSER",
    rapid: "FUEGO RÁPIDO",
    shield: "ESCUDO ACTIVO",
    wingmen: "ESCOLTAS",
    missiles: "MISILES",
    cryo: "CRIO-ESCUDO",
    antigrav: "ANTIGRAVEDAD",
    faraday: "JAULA FARADAY",
    antigamma: "ANTI-GAMMA"
  };
  let html = "";
  for (const k in player.buffs) {
    if (player.buffs[k] > 0) {
      const sec = Math.ceil(player.buffs[k] / 60);
      html += `<div class="buff-tag">${labels[k]} (${sec}s)</div>`;
    }
  }
  box.innerHTML = html;
}


async function enterImmersiveMode() {
  try {
    if (!document.fullscreenElement && document.documentElement.requestFullscreen) {
      await document.documentElement.requestFullscreen({ navigationUI: "hide" });
    }
  } catch (error) { /* La instalación PWA sigue ofreciendo modo inmersivo. */ }
  try { if (screen.orientation?.lock) await screen.orientation.lock("portrait"); } catch (error) {}
}

function startNewGame(savedData = null) {
  enterImmersiveMode();
  // El clic de Iniciar/Continuar es el gesto del usuario que autoriza el audio.
  // La banda sonora se activa automáticamente, sin exigir otro botón.
  if (!SoundFX.musicManuallyDisabled) SoundFX.activateMusicFromGesture();
  bullets = [];
  enemyBullets = [];
  spawnClock = 0;
  state.combo = 1;
  state.runRewardPaid = false;
  eventRunProgress = 0;
  renderEventProgress();
  state.dailyChallengeWon = false;
  state.alternateEnding = false;
  state.runMode = savedData ? (["campaign", "survival"].includes(savedData.runMode) ? savedData.runMode : "campaign") : (state.runMode || "campaign");
  if (!savedData && state.runMode === "daily" && commercialData.dailyChallengeClaimed === getDailyChallenge().date) {
    // Se permite repetir el desafío, pero no volver a cobrar su premio diario.
  }
  state.comboTimer = 0;
  state.shake = 0;
  state.flash = 0;
  asteroids = [];
  enemies = [];
  phenomena = [];
  powerups = [];
  particles = [];
  boss = null;
  document.getElementById("boss-bar-wrap").classList.add("hidden");

  if (savedData) {
    state.level = Math.max(1, Math.min(state.runMode === "survival" ? 9999 : 100, Number(savedData.level) || 1));
    state.score = Math.max(0, Number(savedData.score) || 0);
    state.selectedShip = SHIP_TYPES[savedData.ship] ? savedData.ship : (state.selectedShip || "valkyrie");
    state.difficulty = DIFFICULTY[savedData.difficulty] ? savedData.difficulty : state.difficulty;
    player = new Player(state.selectedShip);
    player.lives = Math.max(1, Math.min(6, Number(savedData.lives) || player.lives));
    player.bombs = Math.max(0, Math.min(5, Number(savedData.bombs ?? 1)));
    player.permanentShieldCharges = Math.max(0, Math.min(3, Number(savedData.aegisCharges ?? player.permanentShieldCharges)));
  } else {
    state.level = 1;
    state.score = 0;
    player = new Player(state.selectedShip);
    if (state.runMode === "daily") { player.lives = 2; player.bombs = 0; }
  }

  state.levelProgress = savedData ? Math.max(0, Math.min(Number(savedData.progress) || 0, 14 + Math.floor(state.level * 1.4) - 1)) : 0;
  state.levelTarget = 18 + Math.floor(state.level * 1.9);
  state.mode = "PLAYING";

  document.getElementById("screen-menu").classList.add("hidden");
  document.getElementById("screen-gameover").classList.add("hidden");
  document.getElementById("screen-pause").classList.add("hidden");
  document.getElementById("hud").classList.remove("hidden");
  document.getElementById("touch-controls").classList.remove("hidden");
  updateHUD();
  updateCommercialUI();
  if (player.permanentShieldCharges > 0) {
    addFloatingText(W / 2, H * 0.28, `ESCUDO AEGIS • ${player.permanentShieldCharges} CARGAS`, "#72f7ff");
  }
}

function togglePause() {
  if (state.mode === "PLAYING") {
    state.mode = "PAUSED";
    document.getElementById("pause-stats").textContent = `Sector ${state.level}${state.runMode === "survival" ? "/∞" : "/100"} • Puntos: ${state.score.toLocaleString("es-AR")}`;
    document.getElementById("screen-pause").classList.remove("hidden");
  } else if (state.mode === "PAUSED") {
    state.mode = "PLAYING";
    document.getElementById("screen-pause").classList.add("hidden");
  }
}

function endGame(victory) {
  state.mode = "GAMEOVER";
  document.getElementById("hud").classList.add("hidden");
  document.getElementById("touch-controls").classList.add("hidden");
  document.getElementById("screen-story").classList.add("hidden");
  state.alternateEnding = !!(victory && state.runMode === "campaign" && state.difficulty === "hard" && player && player.lives >= 2 && state.score >= 25000);
  document.getElementById("end-badge").textContent = state.alternateEnding ? "FINAL ALTERNATIVO DESBLOQUEADO" : victory ? "MISIÓN CUMPLIDA" : "TRANSMISIÓN FINALIZADA";
  document.getElementById("end-title").textContent = state.alternateEnding ? "LA VERDAD DEL ECLIPSE" : victory ? "¡GALAXIA SALVADA!" : "NAVE DESTRUIDA";
  document.getElementById("end-summary").textContent = `Alcanzaste el Sector ${state.level}${state.runMode === "survival" ? " (supervivencia)" : "/100"} con ${state.score.toLocaleString("es-AR")} puntos.`;
  const modeSummary = document.getElementById("end-mode-summary");
  if (modeSummary) modeSummary.textContent = state.runMode === "daily" ? (victory ? "DESAFÍO DIARIO SUPERADO • Recompensa especial acreditada si todavía no la reclamaste hoy." : `DESAFÍO DIARIO: objetivo ${getDailyChallenge().target.toLocaleString("es-AR")} puntos.`) : state.runMode === "survival" ? `RÉCORD DE SUPERVIVENCIA: sector ${commercialData.survivalBestSector} • ${commercialData.survivalBestScore.toLocaleString("es-AR")} puntos.` : state.alternateEnding ? "Sellaste la singularidad sin ceder ante la flota del Eclipse. La transmisión revela quién la creó." : "La campaña registra tu resultado en los récords locales.";
  document.getElementById("screen-gameover").classList.remove("hidden");
  awardRunCredits(victory);
  registerScore();
}

function readStoredJSON(key, fallback) {
  try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : fallback; }
  catch (error) { console.warn(`Datos locales inválidos (${key}); se restablecen.`, error); return fallback; }
}
let activeProfile = readStoredJSON("aether_profile", null);

function getProfileKey(name, pin) {
  // El PIN no se guarda ni se usa como identificador persistente.
  const source = `${name.trim().toLocaleLowerCase("es")}:${pin.trim()}`;
  let hash = 2166136261;
  for (let i = 0; i < source.length; i++) { hash ^= source.charCodeAt(i); hash = Math.imul(hash, 16777619); }
  return `pilot_${(hash >>> 0).toString(16)}`;
}

function refreshAuthUI() {
  const formBox = document.getElementById("auth-form-box");
  const loggedBox = document.getElementById("auth-logged-box");
  if (activeProfile) {
    formBox.classList.add("hidden");
    loggedBox.classList.remove("hidden");
    document.getElementById("user-display-name").textContent = activeProfile.name;
    document.getElementById("user-cloud-status").textContent = cloudSession?.access_token ? "Cuenta online conectada" : "Perfil local activo";
  } else {
    formBox.classList.remove("hidden");
    loggedBox.classList.add("hidden");
  }
  checkSavedRun();
  renderCloudAccount();
}

async function loginWithPin() {
  const nameVal = document.getElementById("input-pilot").value.trim();
  const pinVal = document.getElementById("input-pin").value.trim();
  if (nameVal.length < 2 || !/^\d{4,6}$/.test(pinVal)) {
    alert("Ingresa un nombre de comandante (mín. 2 caracteres) y un PIN numérico de 4 a 6 dígitos.");
    return;
  }

  const key = getProfileKey(nameVal, pinVal);
  const profile = { name: nameVal, key };
  try {
    localStorage.setItem("aether_profile", JSON.stringify(profile));
    activeProfile = profile;
    refreshAuthUI();
  } catch (error) {
    console.error("No se pudo guardar el perfil local:", error);
    alert("El navegador bloqueó el almacenamiento local. Abrí el juego desde GitHub Pages o desde un servidor local y volvé a intentarlo.");
  }
}
/* ============================================================================
   AETHER NOVA: ECLIPSE - MOTOR AUDITADO (PARTE 5C - FINAL)
   ============================================================================ */

async function saveProgress(options = {}) {
  if (!player || state.runMode === "daily") return;
  const key = activeProfile ? activeProfile.key : "guest";
  const pilotName = activeProfile ? activeProfile.name : "Comandante";
  const payload = {
    name: pilotName,
    level: state.level,
    score: state.score,
    ship: state.selectedShip,
    difficulty: state.difficulty,
    runMode: state.runMode === "survival" ? "survival" : "campaign",
    lives: player.lives,
    bombs: player.bombs,
    aegisCharges: player.permanentShieldCharges,
    progress: state.levelProgress,
    updatedAt: Date.now()
  };

  try { localStorage.setItem(`aether_save_${key}`, JSON.stringify(payload)); }
  catch (error) { console.warn("No se pudo guardar la partida en este dispositivo.", error); alert("No hay espacio disponible para guardar el progreso."); return; }
  if (!options.quiet) addFloatingText(W / 2, H * 0.45, "PROGRESO GUARDADO", "#00ff88");
  checkSavedRun();
  if (typeof scheduleCloudProgressSync === "function") scheduleCloudProgressSync();
}

function checkSavedRun() {
  const key = activeProfile ? activeProfile.key : "guest";
  const data = readStoredJSON(`aether_save_${key}`, null);
  const btn = document.getElementById("btn-continue");
  if (data && btn) {
    btn.classList.remove("hidden");
    btn.textContent = `CONTINUAR SECTOR ${Number(data.level) || 1} (${(Number(data.score) || 0).toLocaleString("es-AR")} PTS)`;
  } else if (btn) {
    btn.classList.add("hidden");
  }
}

let latestCloudScoreEntry = null;
let latestCloudScoreRunId = null;

function registerScore() {
  const pilotName = activeProfile ? activeProfile.name : "Comandante";
  const entry = { name: pilotName, score: state.score, level: state.level, mode: state.runMode || "campaign" };
  latestCloudScoreEntry = entry;
  latestCloudScoreRunId = (typeof crypto !== "undefined" && crypto.randomUUID) ? crypto.randomUUID() : `run-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  updateCloudScoreStatus("Preparando envío de puntuación…");
  const stored = readStoredJSON("aether_nova_rank", []);
  const list = Array.isArray(stored) ? stored.filter(r => r && typeof r === "object") : [];
  list.push(entry);
  list.sort((a, b) => (Number(b.score) || 0) - (Number(a.score) || 0));
  try { localStorage.setItem("aether_nova_rank", JSON.stringify(list.slice(0, 5))); }
  catch (error) { console.warn("No se pudo actualizar el ranking local.", error); }


  renderRanking();
  void submitCloudScore(entry, latestCloudScoreRunId);
}

function renderRanking() {
  const ol = document.getElementById("ranking-list");
  if (!ol) return;
  const list = readStoredJSON("aether_nova_rank", []);
  if (list.length === 0) {
    ol.innerHTML = "<li><span>Sin registros aún</span><span class='pts'>0 PTS</span></li>";
    return;
  }
  ol.replaceChildren();
  list.slice(0, 5).forEach((r, i) => {
    const li = document.createElement("li");
    const name = document.createElement("span");
    const points = document.createElement("span");
    const modeLabel = r.mode === "survival" ? "SUP" : r.mode === "daily" ? "DÍA" : "CAM";
    name.textContent = `#${i + 1} ${String(r.name || "Piloto").slice(0, 16)} [${modeLabel}] (S.${Number(r.level) || 1})`;
    points.className = "pts";
    points.textContent = `${Math.max(0, Number(r.score) || 0).toLocaleString("es-AR")} PTS`;
    li.append(name, points);
    ol.append(li);
  });
}


const PILOT_COSMETICS = [
  { id: "nova", label: "✦ NOVA", unlock: null },
  { id: "veteran", label: "⬡ VETERANO", unlock: "sector_25" },
  { id: "survivor", label: "∞ SUPERVIVIENTE", unlock: "survival_25" },
  { id: "legend", label: "✧ LEYENDA", unlock: "sector_100" }
];
function renderCosmetics() {
  const select = document.getElementById("pilot-cosmetic");
  if (!select) return;
  const saved = localStorage.getItem("aether_pilot_cosmetic") || "nova";
  const unlocked = PILOT_COSMETICS.filter(item => !item.unlock || commercialData.achievements.includes(item.unlock));
  select.replaceChildren();
  unlocked.forEach(item => { const option = document.createElement("option"); option.value = item.id; option.textContent = item.label; select.append(option); });
  select.value = unlocked.some(item => item.id === saved) ? saved : "nova";
  localStorage.setItem("aether_pilot_cosmetic", select.value);
}
function setPilotCosmetic(value) {
  const item = PILOT_COSMETICS.find(c => c.id === value);
  if (!item || (item.unlock && !commercialData.achievements.includes(item.unlock))) return;
  localStorage.setItem("aether_pilot_cosmetic", item.id);
  if (cloudSession?.access_token) void cloudPostProfile();
}

/* ============================================================================
   AETHER NOVA — ALPHA 6: SERVICIOS ONLINE OPCIONALES (Supabase REST)
   La campaña, guardados locales y modos offline no dependen de este módulo.
   ============================================================================ */
const CLOUD_CFG = window.AETHER_CLOUD_CONFIG || { enabled: false };
const CLOUD_SESSION_KEY = "aether_cloud_session_v1";
// La sesión vive en sessionStorage: no queda persistida indefinidamente en el perfil local.
function readCloudSession() {
  try {
    const raw = sessionStorage.getItem(CLOUD_SESSION_KEY) || localStorage.getItem(CLOUD_SESSION_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    if (parsed && parsed.access_token && parsed.refresh_token) {
      try { sessionStorage.setItem(CLOUD_SESSION_KEY, JSON.stringify(parsed)); localStorage.removeItem(CLOUD_SESSION_KEY); } catch (_) {}
      return parsed;
    }
  } catch (error) { console.warn("Sesión online local inválida; se solicitará un nuevo inicio de sesión."); }
  return null;
}
let cloudSession = readCloudSession();
let cloudBusy = false;
let cloudSyncTimer = null;
let cloudSyncArmed = (() => { try { return sessionStorage.getItem("aether_cloud_sync_armed") === "1"; } catch (_) { return false; } })();
const CLOUD_REQUEST_TIMEOUT_MS = 12000;
function scheduleCloudProgressSync() {
  if (!cloudSyncArmed || !cloudConfigured() || !cloudSession?.access_token) return;
  clearTimeout(cloudSyncTimer);
  cloudSyncTimer = setTimeout(() => { void uploadCloudSave(); }, 1800);
}
function armCloudProgressSync() {
  cloudSyncArmed = true;
  try { sessionStorage.setItem("aether_cloud_sync_armed", "1"); } catch (_) {}
}

function cloudConfigured() {
  return !!(CLOUD_CFG.enabled && /^https:\/\//.test(CLOUD_CFG.supabaseUrl || "") &&
    CLOUD_CFG.anonKey && !String(CLOUD_CFG.anonKey).includes("TU_SUPABASE"));
}
function cloudSetStatus(message, isError = false) {
  const status = document.getElementById("cloud-auth-status");
  if (status) { status.textContent = message; status.style.color = isError ? "#ff9b9b" : ""; }
  const label = document.getElementById("cloud-account-label");
  if (label && cloudSession?.user?.email) label.textContent = `Conectado: ${cloudSession.user.email}`;
  const profileStatus = document.getElementById("user-cloud-status");
  if (profileStatus && activeProfile) profileStatus.textContent = cloudSession?.access_token ? "Cuenta online conectada" : "Perfil local activo";
  updateCommercialUI();
}
function cloudSetSession(session) {
  cloudSession = session || null;
  try {
    if (cloudSession?.access_token && cloudSession?.refresh_token) sessionStorage.setItem(CLOUD_SESSION_KEY, JSON.stringify(cloudSession));
    else {
      sessionStorage.removeItem(CLOUD_SESSION_KEY);
      cloudSyncArmed = false;
      sessionStorage.removeItem("aether_cloud_sync_armed");
    }
    localStorage.removeItem(CLOUD_SESSION_KEY);
  } catch (error) { console.warn("No se pudo guardar la sesión temporal online.", error); }
  renderCloudAccount();
}
function cloudFetchOptions(options = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), CLOUD_REQUEST_TIMEOUT_MS);
  return { ...options, signal: controller.signal, __timeout: timer };
}
async function cloudRequest(url, options = {}) {
  const request = cloudFetchOptions(options);
  try { return await fetch(url, request); }
  catch (error) {
    if (error?.name === "AbortError") throw new Error("El servidor tardó demasiado. Comprueba tu conexión e inténtalo nuevamente.");
    throw error;
  } finally { clearTimeout(request.__timeout); }
}
function renderCloudAccount() {
  const label = document.getElementById("cloud-account-label");
  const upload = document.getElementById("btn-cloud-upload");
  const restore = document.getElementById("btn-cloud-restore");
  const logout = document.getElementById("btn-cloud-logout");
  const connected = !!cloudSession?.access_token;
  if (label) label.textContent = connected ? `Cuenta online: ${cloudSession.user?.email || "Comandante"}` :
    (cloudConfigured() ? "Cuenta online no conectada" : "Backend online pendiente de configuración");
  [upload, restore, logout].forEach(el => { if (el) el.disabled = !connected; });
  const signup = document.getElementById("btn-cloud-signup");
  const login = document.getElementById("btn-cloud-login");
  [signup, login].forEach(el => { if (el) el.disabled = !cloudConfigured() || cloudBusy; });
  if (!cloudConfigured()) cloudSetStatus("Modo local disponible. Para habilitar perfiles, nube y torneos, configura Supabase en cloud-config.js.");
}
function cloudHeaders(token = cloudSession?.access_token) {
  const headers = {
    apikey: CLOUD_CFG.anonKey,
    "Content-Type": "application/json"
  };
  // La publishable key se envía en apikey; nunca como Bearer.
  // Authorization debe contener únicamente el access_token del usuario.
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}
async function cloudAuthRequest(path, body) {
  const response = await cloudRequest(`${CLOUD_CFG.supabaseUrl}/auth/v1/${path}`, {
    method: "POST", headers: cloudHeaders(null), body: JSON.stringify(body)
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.msg || data.message || data.error_description || data.error || `Error de autenticación (${response.status})`);
  return data;
}
async function cloudRefreshSession() {
  if (!cloudSession?.refresh_token) throw new Error("La sesión online venció. Inicia sesión nuevamente.");
  const refreshed = await cloudAuthRequest("token?grant_type=refresh_token", { refresh_token: cloudSession.refresh_token });
  cloudSetSession(refreshed);
  return refreshed.access_token;
}
async function cloudFetch(tablePath, options = {}, retry = true) {
  if (!cloudConfigured()) throw new Error("El servidor online todavía no está configurado.");
  let token = cloudSession?.access_token;
  if (!token) throw new Error("Inicia sesión con tu cuenta online.");
  const response = await cloudRequest(`${CLOUD_CFG.supabaseUrl}/rest/v1/${tablePath}`, {
    ...options, headers: { ...cloudHeaders(token), ...(options.headers || {}) }
  });
  if (response.status === 401 && retry && cloudSession?.refresh_token) {
    try { await cloudRefreshSession(); }
    catch (refreshError) { cloudSetSession(null); throw new Error("La sesión online venció. Inicia sesión nuevamente."); }
    return cloudFetch(tablePath, options, false);
  }
  const raw = await response.text();
  const data = raw ? (() => { try { return JSON.parse(raw); } catch { return raw; } })() : null;
  if (!response.ok) throw new Error(data?.message || data?.hint || data?.details || `Error del servidor (${response.status})`);
  return data;
}
async function cloudSignUp() {
  if (!cloudConfigured() || cloudBusy) return;
  const email = document.getElementById("cloud-email")?.value.trim();
  const password = document.getElementById("cloud-password")?.value || "";
  if (!email || password.length < 8) return cloudSetStatus("Ingresa un correo válido y una contraseña de al menos 8 caracteres.", true);
  cloudBusy = true; renderCloudAccount();
  try {
    const data = await cloudAuthRequest("signup", { email, password, data: { pilot_name: activeProfile?.name || "Comandante" } });
    if (data.access_token) {
      cloudSetSession(data);
      cloudSetStatus("Cuenta online creada y conectada. Ya puedes participar en la clasificación.");
      await cloudPostProfile(); await refreshOnlineRanking(); await loadGalacticEvents();
    } else cloudSetStatus("Cuenta creada. Revisa tu correo para confirmar la dirección y luego inicia sesión.");
  } catch (error) { cloudSetStatus(error.message, true); }
  finally { cloudBusy = false; renderCloudAccount(); }
}
async function cloudSignIn() {
  if (!cloudConfigured() || cloudBusy) return;
  const email = document.getElementById("cloud-email")?.value.trim();
  const password = document.getElementById("cloud-password")?.value || "";
  if (!email || !password) return cloudSetStatus("Completa correo y contraseña.", true);
  cloudBusy = true; renderCloudAccount();
  try {
    const data = await cloudAuthRequest("token?grant_type=password", { email, password });
    cloudSetSession(data);
    cloudSetStatus("Sesión online iniciada. Tu progreso local permanece intacto.");
    await cloudPostProfile(); await refreshOnlineRanking(); await loadGalacticEvents();
  } catch (error) { cloudSetStatus(error.message, true); }
  finally { cloudBusy = false; renderCloudAccount(); }
}
async function cloudPostProfile() {
  if (!cloudSession?.user?.id) return;
  const pilotName = activeProfile?.name || cloudSession.user.user_metadata?.pilot_name || "Comandante";
  await cloudFetch("pilot_profiles?on_conflict=user_id", {
    method: "POST", headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
    body: JSON.stringify({ user_id: cloudSession.user.id, pilot_name: pilotName, cosmetic_id: localStorage.getItem("aether_pilot_cosmetic") || "nova", updated_at: new Date().toISOString() })
  });
}
function buildCloudSave() {
  const key = activeProfile ? activeProfile.key : "guest";
  return {
    version: 1,
    commercialData,
    runSave: readStoredJSON(`aether_save_${key}`, null),
    pilotName: activeProfile?.name || "Comandante",
    exportedAt: new Date().toISOString()
  };
}
async function uploadCloudSave() {
  if (!cloudSession?.user?.id) return cloudSetStatus("Inicia sesión online para subir tu progreso.", true);
  try {
    await cloudFetch("pilot_saves?on_conflict=user_id", {
      method: "POST", headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
      body: JSON.stringify({ user_id: cloudSession.user.id, pilot_name: activeProfile?.name || "Comandante", save_data: buildCloudSave(), updated_at: new Date().toISOString() })
    });
    armCloudProgressSync();
    cloudSetStatus("Progreso subido a la nube correctamente. La sincronización automática quedó activada para esta sesión.");
  } catch (error) { cloudSetStatus(error.message, true); }
}
async function restoreCloudSave() {
  if (!cloudSession?.user?.id) return cloudSetStatus("Inicia sesión online para recuperar tu progreso.", true);
  if (!confirm("¿Recuperar el progreso de la nube? Las mejoras y créditos locales actuales serán reemplazados por la copia online.")) return;
  try {
    const rows = await cloudFetch(`pilot_saves?select=save_data,updated_at&user_id=eq.${encodeURIComponent(cloudSession.user.id)}&limit=1`);
    const cloud = rows?.[0]?.save_data;
    if (!cloud) return cloudSetStatus("No hay una copia online para esta cuenta.", true);
    if (cloud.version !== 1 || !cloud.commercialData || typeof cloud.commercialData !== "object" || Array.isArray(cloud.commercialData)) {
      return cloudSetStatus("La copia online no tiene un formato compatible. No se modificó tu progreso local.", true);
    }
    if (cloud.runSave && (typeof cloud.runSave !== "object" || Array.isArray(cloud.runSave) || !Number.isFinite(Number(cloud.runSave.level)) || Number(cloud.runSave.level) < 1 || Number(cloud.runSave.level) > 9999)) {
      return cloudSetStatus("La partida guardada en la nube está dañada o no es compatible. Tu progreso local permanece intacto.", true);
    }
    if (cloud.commercialData && typeof cloud.commercialData === "object") {
      const incoming = cloud.commercialData;
      commercialData = { ...commercialData, ...incoming,
        credits: Math.max(0, Number(incoming.credits) || 0),
        upgrades: { ...commercialData.upgrades, ...(incoming.upgrades || {}) },
        achievements: Array.isArray(incoming.achievements) ? incoming.achievements : commercialData.achievements,
        missions: incoming.missions && typeof incoming.missions === "object" && !Array.isArray(incoming.missions) ? incoming.missions : commercialData.missions
      };
      state.selectedShip = Object.prototype.hasOwnProperty.call(SHIP_TYPES, commercialData.selectedShip) ? commercialData.selectedShip : "valkyrie";
      state.difficulty = ["easy", "normal", "hard"].includes(commercialData.difficulty) ? commercialData.difficulty : "normal";
      ensureMissionState();
      saveCommercialData();
    }
    if (cloud.runSave) {
      const key = activeProfile ? activeProfile.key : "guest";
      localStorage.setItem(`aether_save_${key}`, JSON.stringify(cloud.runSave));
    }
    checkSavedRun(); renderHangar();
    armCloudProgressSync();
    cloudSetStatus(`Progreso recuperado. Copia del ${new Date(rows[0].updated_at).toLocaleString("es-AR")}.`);
  } catch (error) { cloudSetStatus(error.message, true); }
}
function updateCloudScoreStatus(message, isError = false) {
  const status = document.getElementById("cloud-score-status");
  if (status) {
    status.textContent = message;
    status.dataset.state = isError ? "error" : "ok";
  }
}
async function submitLatestCloudScore() {
  if (!latestCloudScoreEntry || !latestCloudScoreRunId) {
    updateCloudScoreStatus("No hay una puntuación reciente para enviar.", true);
    return;
  }
  await submitCloudScore(latestCloudScoreEntry, latestCloudScoreRunId);
}
async function submitCloudScore(entry, runId) {
  if (!cloudConfigured()) {
    updateCloudScoreStatus("Backend no configurado. El récord local quedó guardado.", true);
    return false;
  }
  if (!cloudSession?.user?.id || !cloudSession?.access_token) {
    updateCloudScoreStatus("Inicia sesión online para enviar esta puntuación. El récord local está conservado.", true);
    return false;
  }
  const markerKey = "aether_cloud_submitted_runs_v1";
  const submitted = readStoredJSON(markerKey, []);
  if (Array.isArray(submitted) && submitted.includes(runId)) {
    updateCloudScoreStatus("Esta partida ya fue enviada a la clasificación galáctica.");
    return true;
  }
  const button = document.getElementById("btn-submit-score");
  if (button) { button.disabled = true; button.textContent = "ENVIANDO…"; }
  updateCloudScoreStatus("Enviando resultado a la clasificación galáctica…");
  try {
    const scoreResponse = await cloudRequest(`${CLOUD_CFG.supabaseUrl}/functions/v1/submit-score`, {
      method: "POST",
      headers: cloudHeaders(cloudSession.access_token),
      body: JSON.stringify({ pilot_name: String(entry.name || "Comandante").slice(0, 16), score: Math.max(0, Math.floor(entry.score)), sector: Math.max(1, Math.floor(entry.level)), mode: ["campaign", "survival", "daily"].includes(entry.mode) ? entry.mode : "campaign" })
    });
    const scorePayload = await scoreResponse.json().catch(() => ({}));
    if (!scoreResponse.ok) throw new Error(scorePayload.error || scorePayload.message || `Error de validación (${scoreResponse.status})`);
    const nextSubmitted = Array.isArray(submitted) ? submitted : [];
    nextSubmitted.push(runId);
    try { localStorage.setItem(markerKey, JSON.stringify(nextSubmitted.slice(-100))); } catch (_) {}
    updateCloudScoreStatus("✓ Puntuación enviada correctamente. Ya figura en la clasificación galáctica.");
    await refreshOnlineRanking();
    return true;
  } catch (error) {
    console.warn("No se pudo enviar el récord online:", error);
    updateCloudScoreStatus(`No se pudo enviar: ${error.message}. Puedes reintentar con el botón.`, true);
    return false;
  } finally {
    if (button) { button.disabled = false; button.textContent = "REENVIAR PUNTUACIÓN"; }
  }
}
async function refreshOnlineRanking() {
  const list = document.getElementById("online-ranking-list");
  if (!list) return;
  if (!cloudConfigured() || !cloudSession?.access_token) {
    list.replaceChildren(); const li = document.createElement("li"); li.textContent = "Conecta una cuenta online para consultar el torneo semanal."; list.append(li); return;
  }
  try {
    const weekStart = new Date();
    const day = (weekStart.getUTCDay() + 6) % 7;
    weekStart.setUTCDate(weekStart.getUTCDate() - day); weekStart.setUTCHours(0,0,0,0);
    const query = `leaderboard?select=pilot_name,score,sector,mode,created_at&created_at=gte.${encodeURIComponent(weekStart.toISOString())}&order=score.desc&limit=10`;
    const rows = await cloudFetch(query);
    list.replaceChildren();
    if (!rows?.length) { const li = document.createElement("li"); li.textContent = "Aún no hay puntuaciones esta semana."; list.append(li); return; }
    rows.forEach((r, i) => {
      const li = document.createElement("li"); const who = document.createElement("span"); const pts = document.createElement("strong");
      const mode = r.mode === "survival" ? "SUP" : r.mode === "daily" ? "DÍA" : "CAM";
      who.textContent = `#${i+1} ${String(r.pilot_name || "Piloto").slice(0,16)} · ${mode} · S.${r.sector}`;
      pts.textContent = `${Number(r.score || 0).toLocaleString("es-AR")} PTS`; li.append(who, pts); list.append(li);
    });
  } catch (error) { list.replaceChildren(); const li = document.createElement("li"); li.textContent = `Clasificación no disponible: ${error.message}`; list.append(li); }
}

let activeGalacticEvent = null;
let eventRunProgress = 0;
let eventClaimBusy = false;

function eventObjectiveLabel(event = activeGalacticEvent) {
  if (!event) return "";
  const target = Math.max(1, Number(event.objective_target) || 10);
  const labels = {
    destroy_enemies: `Destruye ${target} naves enemigas`,
    reach_sector: `Alcanza el sector ${target}`,
    defeat_boss: `Derrota ${target} jefe${target === 1 ? "" : "s"}`
  };
  return labels[event.objective_type] || labels.destroy_enemies;
}
function eventProgressValue(event = activeGalacticEvent) {
  if (!event) return 0;
  if (event.objective_type === "reach_sector") return Math.max(0, state.level);
  return eventRunProgress;
}
function renderEventProgress() {
  const box = document.getElementById("galactic-event-progress");
  if (!box) return;
  if (!activeGalacticEvent) {
    box.textContent = "No hay una misión especial activa.";
    return;
  }
  const target = Math.max(1, Number(activeGalacticEvent.objective_target) || 10);
  const current = Math.min(target, eventProgressValue());
  box.replaceChildren();
  const title = document.createElement("strong");
  title.textContent = `MISIÓN ESPECIAL: ${activeGalacticEvent.title}`;
  const objective = document.createElement("span");
  objective.textContent = eventObjectiveLabel();
  const progress = document.createElement("span");
  progress.className = "event-progress-value";
  progress.textContent = `${current} / ${target}`;
  const reward = document.createElement("small");
  reward.textContent = `Recompensa: ✦ ${Math.max(0, Number(activeGalacticEvent.reward_credits) || 0).toLocaleString("es-AR")} créditos`;
  const bar = document.createElement("div");
  bar.className = "event-progress-track";
  const fill = document.createElement("div");
  fill.className = "event-progress-fill";
  fill.style.width = `${Math.min(100, current / target * 100)}%`;
  bar.append(fill);
  box.append(title, objective, progress, bar, reward);
}
async function trackGalacticEventProgress(kind, amount = 1) {
  const event = activeGalacticEvent;
  if (!event || eventClaimBusy || state.mode !== "PLAYING") return;
  if (event.objective_type !== kind) return;
  eventRunProgress += Math.max(0, Number(amount) || 0);
  renderEventProgress();
  const target = Math.max(1, Number(event.objective_target) || 10);
  if (eventProgressValue(event) < target) return;
  eventClaimBusy = true;
  try {
    if (!cloudSession?.user?.id) {
      addFloatingText(W / 2, H * .3, "OBJETIVO CUMPLIDO • CONECTA TU CUENTA PARA COBRAR", "#ffd166");
      return;
    }
    await cloudFetch("galactic_event_claims", {
      method: "POST",
      headers: { Prefer: "return=representation" },
      body: JSON.stringify({
        event_id: event.id,
        user_id: cloudSession.user.id,
        progress: eventProgressValue(event),
        claimed_at: new Date().toISOString()
      })
    });
    const reward = Math.max(0, Number(event.reward_credits) || 0);
    commercialData.credits += reward;
    const bonusScore = Math.max(0, Number(event.reward_score) || 0);
    if (bonusScore) { state.score += bonusScore; updateHUD(); }
    saveCommercialData();
    addFloatingText(W / 2, H * .28, `¡EVENTO COMPLETADO! +${reward.toLocaleString("es-AR")} CR • +${bonusScore.toLocaleString("es-AR")} PTS`, "#ffd166");
    event._claimedByCurrentPilot = true;
    renderEventProgress();
    void loadGalacticEvents();
  } catch (error) {
    const msg = /duplicate|unique|23505/i.test(error.message || "")
      ? "ESTE EVENTO YA FUE COBRADO"
      : "OBJETIVO CUMPLIDO • ERROR AL REGISTRAR RECOMPENSA";
    addFloatingText(W / 2, H * .3, msg, "#ff9e80");
    console.warn("No se pudo registrar la recompensa del evento:", error);
  } finally {
    eventClaimBusy = false;
  }
}

function formatEventCountdown(targetDate, now = Date.now()) {
  const remaining = Math.max(0, new Date(targetDate).getTime() - now);
  const totalSeconds = Math.floor(remaining / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  if (days > 0) return `${days} d ${hours} h ${minutes} min`;
  if (hours > 0) return `${hours} h ${minutes} min`;
  if (minutes > 0) return `${minutes} min ${seconds} s`;
  return `${seconds} s`;
}

async function loadGalacticEvents() {
  const box = document.getElementById("galactic-events");
  if (!box) return;
  if (!cloudConfigured()) {
    box.textContent = "Eventos online pendientes de configuración.";
    return;
  }
  if (!cloudSession?.access_token) {
    box.textContent = "Inicia sesión online para consultar las transmisiones galácticas.";
    return;
  }
  try {
    const now = new Date().toISOString();
    const events = await cloudFetch(`galactic_events?select=id,title,description,starts_at,ends_at,objective_type,objective_target,reward_credits,reward_score,enemy_variant,difficulty_multiplier&published=eq.true&ends_at=gt.${encodeURIComponent(now)}&order=starts_at.asc&limit=8`);
    let claimedEventIds = [];
    const historyBox = document.getElementById("galactic-event-history");
    if (cloudSession?.user?.id) {
      try {
        const claims = await cloudFetch(`galactic_event_claims?select=event_id,progress,claimed_at,galactic_events(title)&user_id=eq.${encodeURIComponent(cloudSession.user.id)}&order=claimed_at.desc&limit=5`);
        claimedEventIds = (claims || []).map(item => Number(item.event_id));
        if (historyBox) {
          historyBox.replaceChildren();
          if (!claims?.length) historyBox.textContent = "Todavía no completaste eventos.";
          else claims.forEach(item => {
            const line = document.createElement("small");
            const relatedTitle = item.galactic_events?.title || `Evento #${item.event_id}`;
            line.textContent = `${relatedTitle} • objetivo ${item.progress} • ${new Date(item.claimed_at).toLocaleDateString("es-AR")}`;
            historyBox.append(line);
          });
        }
      } catch (historyError) {
        if (historyBox) historyBox.textContent = "Historial temporalmente no disponible.";
      }
    }
    box.replaceChildren();
    if (!Array.isArray(events) || events.length === 0) {
      const small = document.createElement("small");
      small.textContent = "No hay eventos publicados vigentes o próximos. Vuelve pronto, comandante.";
      activeGalacticEvent = null;
      renderEventProgress();
      box.append(small);
      return;
    }
    const currentTime = Date.now();
    activeGalacticEvent = events.find(event => new Date(event.starts_at).getTime() <= currentTime && currentTime < new Date(event.ends_at).getTime() && !claimedEventIds.includes(Number(event.id))) || null;
    renderEventProgress();
    events.forEach(event => {
      const starts = new Date(event.starts_at).getTime();
      const ends = new Date(event.ends_at).getTime();
      if (!Number.isFinite(starts) || !Number.isFinite(ends) || ends <= starts) return;
      const active = starts <= currentTime && currentTime < ends;
      const claimed = claimedEventIds.includes(Number(event.id));
      const article = document.createElement("article");
      article.className = `galactic-event-card ${claimed ? "is-claimed" : active ? "is-active" : "is-upcoming"}`;
      const state = document.createElement("span");
      state.className = "galactic-event-state";
      state.textContent = claimed ? "✓ EVENTO COMPLETADO" : active ? "● EVENTO EN CURSO" : "◷ EVENTO PRÓXIMO";
      const title = document.createElement("strong");
      const desc = document.createElement("p");
      const dates = document.createElement("small");
      const countdown = document.createElement("small");
      title.textContent = event.title || "Transmisión galáctica";
      desc.textContent = event.description || "Transmisión del alto mando.";
      const objective = document.createElement('small');
      objective.className = 'event-card-objective';
      objective.textContent = `${eventObjectiveLabel(event)} • Recompensa: ✦ ${Math.max(0, Number(event.reward_credits) || 0).toLocaleString('es-AR')} créditos`;
      dates.textContent = `${new Date(starts).toLocaleString("es-AR")} – ${new Date(ends).toLocaleString("es-AR")}`;
      countdown.className = "galactic-event-countdown";
      countdown.textContent = claimed
        ? "Recompensa ya reclamada por este piloto"
        : active
          ? `Finaliza en ${formatEventCountdown(ends, currentTime)}`
          : `Comienza en ${formatEventCountdown(starts, currentTime)}`;
      article.append(state, title, desc, objective, dates, countdown);
      box.append(article);
    });
    if (!activeGalacticEvent) renderEventProgress();
    if (!box.children.length) {
      const small = document.createElement("small");
      small.textContent = "No hay eventos con fechas válidas para mostrar.";
      box.append(small);
    }
  } catch (error) {
    console.error("AETHER NOVA: error al cargar eventos galácticos:", error);
    box.textContent = `No se pudieron cargar los eventos: ${error.message || "error desconocido"}`;
  }
}
async function cloudLogout() {
  const token = cloudSession?.access_token;
  cloudSetSession(null);
  cloudSetStatus("Sesión online cerrada. Tus partidas locales siguen disponibles.");
  if (token && cloudConfigured()) {
    try { await cloudRequest(`${CLOUD_CFG.supabaseUrl}/auth/v1/logout`, { method: "POST", headers: cloudHeaders(token) }); }
    catch (error) { console.warn("No se pudo revocar la sesión en el servidor; se cerró localmente.", error); }
  }
  refreshOnlineRanking();
}
async function restoreCloudSession() {
  if (!cloudConfigured() || !cloudSession?.refresh_token) return;
  try {
    await cloudRefreshSession();
    cloudSetStatus("Sesión online restaurada de forma segura.");
    try { await cloudPostProfile(); } catch (profileError) { console.warn("No se pudo actualizar el perfil online; la sesión sigue activa.", profileError); }
    void refreshOnlineRanking();
    void loadGalacticEvents();
  } catch (error) {
    cloudSetSession(null);
    cloudSetStatus("La sesión online expiró. Puedes seguir jugando en modo local e iniciar sesión nuevamente.", true);
  }
}

function bindTap(id, handler) {
  const el = document.getElementById(id);
  if (!el) return;
  el.addEventListener("click", handler);
}

function bindHold(id, dirKey) {
  const el = document.getElementById(id);
  if (!el) return;
  const on = (event) => {
    event.preventDefault();
    keys[dirKey] = true;
    el.classList.add("pressed");
    try { el.setPointerCapture(event.pointerId); } catch (error) {}
  };
  const off = (event) => {
    if (event) event.preventDefault();
    keys[dirKey] = false;
    el.classList.remove("pressed");
  };
  el.addEventListener("pointerdown", on);
  ["pointerup", "pointercancel", "lostpointercapture", "pointerleave"].forEach(type => el.addEventListener(type, off));
}

bindHold("btn-left", "Left");
bindHold("btn-right", "Right");

window.addEventListener("keydown", (e) => {
  if (["ArrowLeft", "ArrowRight", "Space"].includes(e.code)) e.preventDefault();
  if (e.code === "ArrowLeft" || e.code === "KeyA") keys.Left = true;
  if (e.code === "ArrowRight" || e.code === "KeyD") keys.Right = true;
  if ((e.code === "KeyB" || e.code === "Space") && !e.repeat) triggerSuperBomb();
  if ((e.code === "KeyP" || (e.code === "Escape" && !document.fullscreenElement)) && !e.repeat) togglePause();
});

window.addEventListener("keyup", (e) => {
  if (e.code === "ArrowLeft" || e.code === "KeyA") keys.Left = false;
  if (e.code === "ArrowRight" || e.code === "KeyD") keys.Right = false;
});
window.addEventListener("blur", () => { keys.Left = false; keys.Right = false; });
document.addEventListener("visibilitychange", () => {
  if (document.hidden && state.mode === "PLAYING") togglePause();
});

bindTap("btn-bomb", triggerSuperBomb);
bindTap("btn-pause", togglePause);
bindTap("btn-fullscreen", async () => {
  if (document.fullscreenElement) { try { await document.exitFullscreen(); } catch (error) {} }
  else await enterImmersiveMode();
});
bindTap("btn-resume", togglePause);
bindTap("btn-save", saveProgress);
bindTap("btn-save-pause", saveProgress);


bindTap("btn-menu-music", async (e) => {
  if (!SoundFX.musicEnabled) {
    SoundFX.musicManuallyDisabled = false;
    const ok = await SoundFX.activateMusicFromGesture();
    if (!ok) e.currentTarget.textContent = "AUDIO NO DISPONIBLE";
    return;
  }
  SoundFX.musicEnabled = false;
  SoundFX.musicManuallyDisabled = true;
  if (SoundFX.bgmTimer) {
    clearInterval(SoundFX.bgmTimer);
    SoundFX.bgmTimer = null;
  }
  e.currentTarget.classList.remove("is-playing");
  e.currentTarget.textContent = "♫ ACTIVAR BANDA SONORA";
  e.currentTarget.setAttribute("aria-pressed", "false");
});

bindTap("btn-audio", (e) => {
  SoundFX.enabled = !SoundFX.enabled;
  commercialData.sound = SoundFX.enabled;
  saveCommercialData();
  e.currentTarget.textContent = SoundFX.enabled ? "🔊" : "🔇";
});

bindTap("btn-gyro", async (e) => {
  if (typeof DeviceOrientationEvent !== "undefined" && typeof DeviceOrientationEvent.requestPermission === "function") {
    const res = await DeviceOrientationEvent.requestPermission();
    if (res !== "granted") return;
  }
  state.gyroEnabled = !state.gyroEnabled;
  e.currentTarget.classList.toggle("active", state.gyroEnabled);
});

window.addEventListener("deviceorientation", (e) => {
  if (state.gyroEnabled && e.gamma !== null) state.gyroTilt = e.gamma;
});

document.querySelectorAll(".ship-opt").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".ship-opt").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const spec = SHIP_TYPES[btn.dataset.ship];
    if (!spec || (spec.unlock && commercialData.bestSector < spec.unlock)) return;
    state.selectedShip = btn.dataset.ship;
    commercialData.selectedShip = state.selectedShip;
    saveCommercialData();
    if (typeof renderHangarLoadout === "function") renderHangarLoadout();
    syncUnlockedShips();
  });
});

bindTap("btn-login", loginWithPin);
document.getElementById("pilot-cosmetic")?.addEventListener("change", event => setPilotCosmetic(event.target.value));
renderCosmetics();
bindTap("btn-cloud-signup", cloudSignUp);
bindTap("btn-cloud-login", cloudSignIn);
bindTap("btn-cloud-upload", uploadCloudSave);
bindTap("btn-cloud-restore", restoreCloudSave);
bindTap("btn-cloud-logout", cloudLogout);
bindTap("btn-refresh-online-rank", refreshOnlineRanking);
bindTap("btn-refresh-events", loadGalacticEvents);
bindTap("btn-submit-score", submitLatestCloudScore);
bindTap("btn-logout", () => {
  activeProfile = null;
  localStorage.removeItem("aether_profile");
  refreshAuthUI();
});

bindTap("btn-play", () => startNewGame(null));
bindTap("btn-restart", () => startNewGame(null));
document.querySelectorAll(".run-mode-opt").forEach(btn => btn.addEventListener("click", () => {
  if (state.mode !== "MENU") return;
  state.runMode = ["campaign", "survival", "daily"].includes(btn.dataset.runmode) ? btn.dataset.runmode : "campaign";
  refreshRunModeUI();
}));
bindTap("btn-continue", () => {
  const key = activeProfile ? activeProfile.key : "guest";
  const saved = readStoredJSON(`aether_save_${key}`, null);
  if (saved) startNewGame(saved);
});

bindTap("btn-story-next", () => {
  document.getElementById("screen-story").classList.add("hidden");
  if (state.level >= state.maxLevels) endGame(true);
  else state.mode = "PLAYING";
});

bindTap("btn-quit", () => {
  state.mode = "MENU";
  document.getElementById("screen-pause").classList.add("hidden");
  document.getElementById("hud").classList.add("hidden");
  document.getElementById("touch-controls").classList.add("hidden");
  document.getElementById("screen-menu").classList.remove("hidden");
});

bindTap("btn-to-menu", () => {
  state.mode = "MENU";
  document.getElementById("screen-gameover").classList.add("hidden");
  document.getElementById("screen-menu").classList.remove("hidden");
});

bindTap("btn-clear-rank", () => {
  localStorage.removeItem("aether_nova_rank");
  renderRanking();
});

// Comercial: Hangar, entrenamiento, instalación y preferencias persistentes.
bindTap("btn-hangar", () => { renderHangar(); showOverlay("screen-hangar"); });
bindTap("btn-hangar-close", () => document.getElementById("screen-hangar").classList.add("hidden"));
bindTap("btn-manual", () => showOverlay("screen-manual"));
bindTap("btn-manual-close", () => document.getElementById("screen-manual").classList.add("hidden"));
document.querySelectorAll(".difficulty-opt").forEach(btn => btn.addEventListener("click", () => {
  if (state.mode !== "MENU") return;
  state.difficulty = DIFFICULTY[btn.dataset.difficulty] ? btn.dataset.difficulty : "normal";
  commercialData.difficulty = state.difficulty;
  saveCommercialData();
  document.querySelectorAll(".difficulty-opt").forEach(b => b.classList.toggle("active", b === btn));
}));
window.addEventListener("online", updateCommercialUI);
window.addEventListener("offline", updateCommercialUI);
let deferredInstallPrompt = null;
window.addEventListener("beforeinstallprompt", event => {
  event.preventDefault(); deferredInstallPrompt = event;
  document.getElementById("btn-install")?.classList.remove("hidden");
});
bindTap("btn-install", async () => {
  if (!deferredInstallPrompt) return;
  deferredInstallPrompt.prompt();
  try { await deferredInstallPrompt.userChoice; } catch (error) {}
  deferredInstallPrompt = null;
  document.getElementById("btn-install")?.classList.add("hidden");
});
bindTap("btn-daily", claimDailyReward);
bindTap("btn-share", async () => {
  const shareData = { title: "AETHER NOVA: ECLIPSE", text: "Defiende la galaxia en AETHER NOVA: ECLIPSE.", url: location.href };
  try { if (navigator.share) await navigator.share(shareData); else if (navigator.clipboard) { await navigator.clipboard.writeText(location.href); alert("Enlace copiado."); } }
  catch (error) { if (error?.name !== "AbortError") console.warn("No se pudo compartir:", error); }
});
SoundFX.enabled = commercialData.sound;

initStars();
refreshAuthUI();
renderRanking();
updateCommercialUI();
refreshDailyButton();
refreshRunModeUI();
ensureMissionState();
renderMissionBoard();
syncUnlockedShips();
renderCloudAccount();
renderCosmetics();
if (cloudSession?.refresh_token && cloudConfigured()) { void restoreCloudSession(); }
document.querySelectorAll(".difficulty-opt").forEach(btn => btn.classList.toggle("active", btn.dataset.difficulty === state.difficulty));
if (!SoundFX.enabled) { const audioButton = document.getElementById("btn-audio"); if (audioButton) audioButton.textContent = "🔇"; }
requestAnimationFrame(updateAndDraw);
