/* ============================================================================
   AETHER NOVA: ECLIPSE - EDICIÓN DEFINITIVA CORREGIDA (BLOQUE 1A)
   ============================================================================ */

// 1. CONFIGURACIÓN DE FIREBASE FIRESTORE
const firebaseConfig = {
  apiKey: "AIzaSyDz0HrlwvKTfpwAjUJzTfcNvzzbXnaOA0I",
  authDomain: "://firebaseapp.com",
  projectId: "aether-nova-54f86",
  storageBucket: "aether-nova-54f86.firebasestorage.app",
  messagingSenderId: "249474043468",
  appId: "1:249474043468:web:9545dd3a084fd0a2f1aee9",
  measurementId: "G-5QE1NGEKDG"
};

let db = null;
try {
  if (window.firebase) {
    if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
    db = firebase.firestore();
  }
} catch (err) {
  console.warn("Modo local activo:", err);
}

// Registro del Service Worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  });
}

// 2. HISTORIA GALÁCTICA Y AMBIENTACIÓN (SECTORES 1 AL 50)
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
   /* ============================================================================
   AETHER NOVA: ECLIPSE - EDICIÓN DEFINITIVA CORREGIDA (BLOQUE 1B)
   ============================================================================ */
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

// 3. ESPECIFICACIONES DE FLOTA
const SHIP_TYPES = {
  valkyrie: { name: "VALKYRIE", speed: 6.6, fireRate: 11, lives: 3, color: "#00f0ff", accent: "#0066ff" },
  viper:    { name: "VIPER-X",  speed: 8.4, fireRate: 8,  lives: 3, color: "#00ff9d", accent: "#059669" },
  titan:    { name: "TITÁN",    speed: 5.6, fireRate: 13, lives: 4, color: "#ffcc33", accent: "#ea580c" }
};

// 4. LIENZO Y RESPONSIVIDAD
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
let W = (canvas.width = window.innerWidth);
let H = (canvas.height = window.innerHeight);

window.addEventListener("resize", () => {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
  if (player) player.y = H - 185;
});

// 5. MOTOR DE AUDIO SINTETIZADO
const SoundFX = {
  ctx: null,
  enabled: true,
  bgmTimer: null,
  step: 0,
  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (this.ctx.state === "suspended") this.ctx.resume();
  },
  play(type) {
    if (!this.enabled) return;
    this.init();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.connect(gain);
    gain.connect(this.ctx.destination);

    if (type === "laser") {
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(820, now);
      osc.frequency.exponentialRampToValueAtTime(170, now + 0.08);
      gain.gain.setValueAtTime(0.07, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.start(now);
      osc.stop(now + 0.08);
    } else if (type === "missile") {
      osc.type = "triangle";
      osc.frequency.setValueAtTime(340, now);
      osc.frequency.exponentialRampToValueAtTime(980, now + 0.16);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
      osc.start(now);
      osc.stop(now + 0.16);
    } else if (type === "boom") {
      osc.type = "square";
      osc.frequency.setValueAtTime(130, now);
      osc.frequency.exponentialRampToValueAtTime(22, now + 0.3);
      gain.gain.setValueAtTime(0.16, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.3);
    } else if (type === "supernova") {
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(90, now);
      osc.frequency.exponentialRampToValueAtTime(16, now + 0.95);
      gain.gain.setValueAtTime(0.32, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.95);
      osc.start(now);
      osc.stop(now + 0.95);
    } else if (type === "powerup") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(460, now);
      osc.frequency.exponentialRampToValueAtTime(1220, now + 0.2);
      gain.gain.setValueAtTime(0.13, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      osc.start(now);
      osc.stop(now + 0.2);
    } else if (type === "hit") {
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(195, now);
      osc.frequency.exponentialRampToValueAtTime(40, now + 0.24);
      gain.gain.setValueAtTime(0.22, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.24);
      osc.start(now);
      osc.stop(now + 0.24);
    }
  },
  startMusic() {
    if (this.bgmTimer) return;
    const notes = [110, 110, 130.8, 146.8, 110, 110, 164.8, 146.8];
    this.bgmTimer = setInterval(() => {
      if (!this.enabled || state.mode !== "PLAYING") return;
      this.init();
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(notes[this.step % notes.length], now);
      gain.gain.setValueAtTime(0.035, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.22);
      this.step++;
    }, 260);
  }
};

// 6. GENERADOR DE TEXTURAS 3D OPTIMIZADO (EVITA SATURACIÓN DE MEMORIA)
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
/* ============================================================================
   AETHER NOVA: ECLIPSE - EDICIÓN DEFINITIVA CORREGIDA (BLOQUE 2A)
   ============================================================================ */

// 7. ESTADO GLOBAL DEL JUEGO
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
  gyroTilt: 0
};

const keys = { Left: false, Right: false };
let player = null;
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
  for (let i = 0; i < 110; i++) {
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

// 8. CLASE JUGADOR (EVOLUCIÓN MK-I A MK-X)
class Player {
  constructor(typeKey) {
    const spec = SHIP_TYPES[typeKey] || SHIP_TYPES.valkyrie;
    this.type = typeKey;
    this.x = W / 2;
    this.y = H - 185;
    this.radius = 20;
    this.speed = spec.speed;
    this.baseFireRate = spec.fireRate;
    this.color = spec.color;
    this.accent = spec.accent;
    this.lives = spec.lives;
    this.bombs = 1;
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
    if (Math.abs(moveDir) > 0.05 && this.fireTimer <= 0) {
      this.shoot();
      const rate = this.buffs.rapid > 0 ? Math.max(4, this.baseFireRate * 0.55) : this.baseFireRate;
      this.fireTimer = Math.round(rate);
    }

    if (this.invuln > 0) this.invuln--;
    for (const k in this.buffs) {
      if (this.buffs[k] > 0) this.buffs[k]--;
    }

    if (particles.length < 130 && Math.random() < 0.8) {
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
    const dmg = 1 + Math.floor((mk - 1) * 0.5);
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
  }

  takeDamage(reason = "IMPACTO") {
    if (this.invuln > 0) return;
    if (this.buffs.shield > 0) {
      this.buffs.shield = 0;
      this.invuln = 60;
      SoundFX.play("hit");
      addFloatingText(this.x, this.y - 30, "¡ESCUDO ABSORBIÓ DAÑO!", "#00f0ff");
      return;
    }

    this.lives--;
    this.invuln = 110;
    state.combo = 1;
    state.shake = 18;
    SoundFX.play("hit");
    if (navigator.vibrate) navigator.vibrate();
    spawnExplosion(this.x, this.y, "#ff2a55", 24);
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
      ctx.setLineDash();
      ctx.beginPath();
      ctx.arc(0, 0, 40, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    ctx.shadowBlur = 14;
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
   AETHER NOVA: ECLIPSE - EDICIÓN DEFINITIVA CORREGIDA (BLOQUE 2B)
   ============================================================================ */

// 9. CLASE FENÓMENOS CÓSMICOS
class CosmicPhenomenon {
  constructor(kind) {
    this.kind = kind;
    this.x = Math.random() * (W - 140) + 70;
    this.y = kind === "supernova" ? H * 0.34 : -60;
    this.vy = kind === "supernova" ? 0.15 : 1.1;
    this.timer = 0;
    this.maxTimer = kind === "supernova" ? 250 : 520;
    this.radius = kind === "supernova" ? 18 : 34;
    this.angle = 0;
    this.dead = false;
  }

  update() {
    this.timer++;
    this.y += this.vy;
    this.angle += 0.045;

    if (this.kind === "supernova") {
      const ratio = this.timer / this.maxTimer;
      this.radius = 18 + ratio * 155;
      if (this.timer >= this.maxTimer) {
        this.detonateSupernova();
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
        const d = Math.hypot(this.x - b.x, this.y - b.y);
        if (d < 95) b.dead = true;
      });

      const pdx = this.x - player.x;
      const pdy = this.y - player.y;
      const pd = Math.hypot(pdx, pdy);
      if (pd < pullRange && player.buffs.antigrav <= 0) {
        player.x += (pdx / pd) * 2.7;
        if (pd < 42) player.takeDamage("ABSORBIDO POR AGUJERO NEGRO");
      }
    } else if (this.kind === "magnetar") {
      if (this.timer % 90 === 0 && player.buffs.faraday <= 0) {
        const dx = player.x - this.x;
        const d = Math.hypot(dx, player.y - this.y);
        if (d < 340) {
          player.x += dx >= 0 ? 58 : -58;
          state.shake = 12;
          addFloatingText(player.x, player.y - 25, "¡PULSO MAGNETAR!", "#d000ff");
        }
      }
    } else if (this.kind === "pulsar") {
      if (player.buffs.antigamma <= 0 && this.timer > 50) {
        const px = player.x - this.x;
        const py = player.y - this.y;
        const dist = Math.hypot(px, py);
        if (dist < 470) {
          const angToPlayer = Math.atan2(py, px);
          const diff = Math.abs(Math.sin(angToPlayer - this.angle));
          if (diff < 0.08) {
            player.takeDamage("RADIACIÓN GAMMA DE PÚLSAR");
          }
        }
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
    if (navigator.vibrate) navigator.vibrate();

    asteroids.forEach((a) => {
      spawnExplosion(a.x, a.y, "#ffcc33", 8);
      a.dead = true;
    });
    enemies.forEach((e) => {
      spawnExplosion(e.x, e.y, "#ff5500", 12);
      e.dead = true;
    });
    enemyBullets = [];
    spawnExplosion(this.x, this.y, "#ffffff", 45);

    if (player.buffs.cryo > 0) {
      addFloatingText(player.x, player.y - 35, "¡CRIO-ESCUDO RESISTIÓ SUPERNOVA!", "#00f0ff");
    } else {
      player.takeDamage("ONDA DE SUPERNOVA");
    }
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);

    if (this.kind === "supernova") {
      ctx.strokeStyle = "rgba(255, 85, 0, 0.5)";
      ctx.setLineDash();
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, 0, 173, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      const g = ctx.createRadialGradient(0, 0, 4, 0, 0, this.radius);
      g.addColorStop(0, "#ffffff");
      g.addColorStop(0.4, "#ffcc33");
      g.addColorStop(0.8, "#ff3b00");
      g.addColorStop(1, "rgba(255, 0, 0, 0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
      ctx.fill();
    } else if (this.kind === "blackhole") {
      ctx.rotate(this.angle * 1.6);
      const g = ctx.createRadialGradient(0, 0, 14, 0, 0, 72);
      g.addColorStop(0, "#000000");
      g.addColorStop(0.38, "#ff7b00");
      g.addColorStop(0.7, "#7209b7");
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(0, 0, 72, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#000000";
      ctx.beginPath();
      ctx.arc(0, 0, 21, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#ffaa00";
      ctx.lineWidth = 2.2;
      ctx.stroke();
    } else if (this.kind === "magnetar") {
      ctx.rotate(-this.angle);
      ctx.strokeStyle = "#d000ff";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(0, 0, 24 + (this.timer % 45) * 1.5, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = "#9d4edd";
      ctx.beginPath();
      ctx.arc(0, 0, 18, 0, Math.PI * 2);
      ctx.fill();
    } else if (this.kind === "pulsar") {
      ctx.rotate(this.angle);
      const beamGrad = ctx.createLinearGradient(-470, 0, 470, 0);
      beamGrad.addColorStop(0, "rgba(0, 255, 170, 0)");
      beamGrad.addColorStop(0.5, "rgba(0, 255, 170, 0.88)");
      beamGrad.addColorStop(1, "rgba(0, 255, 170, 0)");
      ctx.fillStyle = beamGrad;
      ctx.fillRect(-470, -7, 940, 14);

      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(0, 0, 16, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }
}
/* ============================================================================
   AETHER NOVA: ECLIPSE - EDICIÓN DEFINITIVA CORREGIDA (BLOQUE 3A)
   ============================================================================ */

// 10. CLASE ASTEROIDES
class Asteroid {
  constructor(x, y, radius, kind = "normal") {
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

    if (this.kind === "shooting_star" && particles.length < 130 && Math.random() < 0.7) {
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
      ctx.shadowBlur = 16;
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

// 11. CLASE NAVES ENEMIGAS
class EnemyShip {
  constructor(variant) {
    this.variant = variant;
    this.x = Math.random() * (W - 90) + 45;
    this.y = -45;
    this.vx = (Math.random() < 0.5 ? 1 : -1) * (variant === "interceptor" ? 2.8 : 1.6);
    this.vy = variant === "bomber" ? 0.9 : 1.4;
    this.radius = variant === "bomber" ? 28 : variant === "interceptor" ? 20 : 16;
    const scale = 1 + Math.floor(state.level / 5) * 0.35;
    this.hp = Math.ceil((variant === "bomber" ? 14 : variant === "interceptor" ? 7 : 4) * scale);
    this.fireTimer = 60 + Math.floor(Math.random() * 50);
    this.dead = false;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 35 || this.x > W - 35) this.vx *= -1;
    if (this.y > H + 60) this.dead = true;

    this.fireTimer--;
    if (this.fireTimer <= 0 && this.y > 40 && this.y < H * 0.65) {
      this.shoot();
      this.fireTimer = this.variant === "interceptor" ? 75 : 105;
    }
  }

  shoot() {
    const ang = Math.atan2(player.y - this.y, player.x - this.x);
    if (this.variant === "scout") {
      enemyBullets.push({ x: this.x, y: this.y + 16, vx: Math.cos(ang) * 4.5, vy: Math.sin(ang) * 4.5, color: "#ff4d6d" });
    } else if (this.variant === "interceptor") {
      enemyBullets.push({ x: this.x - 10, y: this.y + 14, vx: 0, vy: 5.8, color: "#ff9e00" });
      enemyBullets.push({ x: this.x + 10, y: this.y + 14, vx: 0, vy: 5.8, color: "#ff9e00" });
    } else {
      [-0.28, 0, 0.28].forEach((offset) => {
        enemyBullets.push({
          x: this.x,
          y: this.y + 20,
          vx: Math.cos(ang + offset) * 4.2,
          vy: Math.sin(ang + offset) * 4.2,
          color: "#ff0055"
        });
      });
    }
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.fillStyle = this.variant === "bomber" ? "#ff0055" : this.variant === "interceptor" ? "#ff9e00" : "#e63946";
    ctx.beginPath();
    ctx.moveTo(0, this.radius);
    ctx.lineTo(-this.radius, -this.radius * 0.7);
    ctx.lineTo(0, -this.radius * 0.3);
    ctx.lineTo(this.radius, -this.radius * 0.7);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
}

// 12. CLASE JEFE ACORAZADO
class BossShip {
  constructor() {
    this.x = W / 2;
    this.y = 115;
    this.vx = 2.1;
    this.radius = 52;
    this.maxHp = 85 + state.level * 18;
    this.hp = this.maxHp;
    this.timer = 0;
    const bossWrap = document.getElementById("boss-bar-wrap");
    const bossName = document.getElementById("boss-name");
    if (bossWrap) bossWrap.classList.remove("hidden");
    if (bossName) bossName.textContent = `ACORAZADO ECLIPSE • SECTOR ${state.level}`;
  }

  update() {
    this.timer++;
    this.x += this.vx;
    if (this.x < 65 || this.x > W - 65) this.vx *= -1;

    if (this.timer % 55 === 0) {
      const ang = Math.atan2(player.y - this.y, player.x - this.x);
      [-0.35, -0.17, 0, 0.17, 0.35].forEach((a) => {
        enemyBullets.push({
          x: this.x,
          y: this.y + 38,
          vx: Math.cos(ang + a) * 4.6,
          vy: Math.sin(ang + a) * 4.6,
          color: "#ff2a85"
        });
      });
    }
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.shadowBlur = 22;
    ctx.shadowColor = "#ff0055";
    ctx.fillStyle = "#2b0918";
    ctx.strokeStyle = "#ff2a85";
    ctx.lineWidth = 3;

    ctx.beginPath();
    ctx.moveTo(0, 48);
    ctx.lineTo(-56, 10);
    ctx.lineTo(-42, -36);
    ctx.lineTo(42, -36);
    ctx.lineTo(56, 10);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#ff0055";
    ctx.beginPath();
    ctx.arc(0, 4, 14, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

// 13. POTENCIADORES
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
   AETHER NOVA: ECLIPSE - EDICIÓN DEFINITIVA CORREGIDA (BLOQUE 3B)
   ============================================================================ */

// 14. EFECTOS VISUALES Y TEXTOS FLOTANTES
function spawnExplosion(x, y, color, count = 14) {
  if (particles.length > 140) return;
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

function addFloatingText(x, y, text, color = "#ffffff") {
  if (floatingTexts.length > 12) floatingTexts.shift();
  floatingTexts.push({ x, y, text, color, life: 55 });
}

// 15. SUPER BOMBA TÁCTICA
function triggerSuperBomb() {
  if (state.mode !== "PLAYING" || !player || player.bombs <= 0) return;
  player.bombs--;
  SoundFX.play("supernova");
  state.shake = 28;
  state.flash = 0.78;
  if (navigator.vibrate) navigator.vibrate();

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
    boss.hp -= Math.ceil(boss.maxHp * 0.35);
    addFloatingText(boss.x, boss.y, "¡IMPACTO TERMONUCLEAR!", "#ffcc33");
    if (boss.hp <= 0) defeatBoss();
  }

  addFloatingText(player.x, player.y - 40, "¡SUPER BOMBA DETONADA!", "#ff2a85");
  updateHUD();
}

// 16. GENERACIÓN DE OLEADAS Y PROGRESIÓN DE 100 NIVELES
let spawnClock = 0;

function updateSpawner() {
  spawnClock++;
  const diff = 1 + (state.level - 1) * 0.03;

  if (state.level % 5 === 0 && !boss && state.levelProgress >= state.levelTarget - 1) {
    boss = new BossShip();
    return;
  }

  const rockInterval = Math.max(18, Math.round(52 / diff));
  if (spawnClock % rockInterval === 0 && !boss && asteroids.length < 18) {
    const r = Math.random();
    let kind = "normal";
    if (state.level >= 2 && r < 0.16) kind = "explosive";
    else if (state.level >= 3 && r < 0.30) kind = "shooting_star";
    else if (state.level >= 4 && r < 0.44) kind = "magnetic";
    else if (state.level >= 6 && r < 0.56) kind = "crystal";

    const radius = kind === "shooting_star" ? 12 : 18 + Math.random() * 20;
    asteroids.push(new Asteroid(null, null, radius, kind));
  }

  const enemyInterval = Math.max(75, Math.round(210 / diff));
  if (state.level >= 3 && spawnClock % enemyInterval === 0 && !boss && enemies.length < 6) {
    const roll = Math.random();
    const variant = state.level >= 12 && roll < 0.28 ? "bomber" : state.level >= 6 && roll < 0.62 ? "interceptor" : "scout";
    enemies.push(new EnemyShip(variant));
  }

  if (spawnClock % 480 === 0 && phenomena.length === 0 && state.level >= 2) {
    const pool = ["blackhole", "supernova"];
    if (state.level >= 4) pool.push("magnetar");
    if (state.level >= 6) pool.push("pulsar");
    const chosen = pool[Math.floor(Math.random() * pool.length)];
    phenomena.push(new CosmicPhenomenon(chosen));
    const names = {
      blackhole: "⚠ ANOMALÍA: AGUJERO NEGRO",
      supernova: "⚠ ALERTA: ESTRELLA EN SUPERNOVA",
      magnetar: "⚠ CAMPO DE MAGNETAR DETECTADO",
      pulsar: "⚠ PÚLSAR DE RAYOS GAMMA"
    };
    addFloatingText(W / 2, H * 0.25, names[chosen], "#ffcc33");
  }
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
  SoundFX.play("supernova");
  spawnExplosion(boss.x, boss.y, "#ff2a85", 45);
  state.score += 1000 * state.level;
  player.bombs = Math.min(5, player.bombs + 1);
  boss = null;
  document.getElementById("boss-bar-wrap").classList.add("hidden");
  completeSector();
}

function completeSector() {
  if (state.level >= state.maxLevels) {
    showStoryChronicle(9);
    return;
  }

  const completed = state.level;
  state.level++;
  state.levelProgress = 0;
  state.levelTarget = 14 + Math.floor(state.level * 1.4);
  player.invuln = 90;

  // Limpieza preventiva de memoria y entidades para evitar congelamientos
  enemyBullets = [];
  if (particles.length > 50) particles.length = 50;

  if (completed % 10 === 0) {
    for (const k in RockCache) delete RockCache[k];
    const eraIndex = Math.min(9, Math.floor(completed / 10) - 1);
    showStoryChronicle(eraIndex);
  } else {
    addFloatingText(W / 2, H * 0.35, `SECTOR ${state.level} INICIADO`, "#00f0ff");
  }
  updateHUD();
}

function showStoryChronicle(eraIndex) {
  state.mode = "STORY";
  const safeIdx = Math.max(0, Math.min(ERAS.length - 1, eraIndex));
  const era = ERAS[safeIdx];
  const mk = player.getEvolutionTier();

  document.getElementById("story-chapter").textContent = era.chapter;
  document.getElementById("story-title").textContent = era.title;
  document.getElementById("story-text").textContent = era.story;
  document.getElementById("story-upgrade").textContent =
    state.level >= 100
      ? "¡CAMPAÑA GALÁCTICA COMPLETADA AL 100%!"
      : `¡NAVE EVOLUCIONADA A FASE MK-${mk}! ARMAMENTO MEJORADO`;

  document.getElementById("screen-story").classList.remove("hidden");
  setTimeout(() => saveCloudProgress(), 100);
}
/* ============================================================================
   AETHER NOVA: ECLIPSE - EDICIÓN DEFINITIVA CORREGIDA (BLOQUE 4A)
   ============================================================================ */

// 17. BUCLE PRINCIPAL DE ACTUALIZACIÓN Y DIBUJO
function updateAndDraw() {
  requestAnimationFrame(updateAndDraw);

  const era = ERAS[Math.min(9, Math.floor((state.level - 1) / 10))];
  const bgGrad = ctx.createLinearGradient(0, 0, 0, H);
  bgGrad.addColorStop(0, era.bgTop);
  bgGrad.addColorStop(1, era.bgBot);
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, W, H);

  const neb1 = ctx.createRadialGradient(W * 0.3, H * 0.3, 15, W * 0.3, H * 0.3, W * 0.7);
  neb1.addColorStop(0, era.nebula1);
  neb1.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = neb1;
  ctx.fillRect(0, 0, W, H);

  const neb2 = ctx.createRadialGradient(W * 0.75, H * 0.65, 15, W * 0.75, H * 0.65, W * 0.65);
  neb2.addColorStop(0, era.nebula2);
  neb2.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = neb2;
  ctx.fillRect(0, 0, W, H);

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

  if (state.mode !== "PLAYING" || !player) return;

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

  phenomena.forEach((ph) => {
    ph.update();
    ph.draw();
  });
  phenomena = phenomena.filter((ph) => !ph.dead);

  bullets.forEach((b) => {
    if (b.missile) {
      const target = boss || enemies[0] || asteroids[0];
      if (target && typeof target.x === "number") {
        const ang = Math.atan2(target.y - b.y, target.x - b.x);
        b.vx += Math.cos(ang) * 0.65;
        b.vy += Math.sin(ang) * 0.65;
      }
    }
    b.x += b.vx;
    b.y += b.vy;
    if (b.y < -30 || b.x < -30 || b.x > W + 30) b.dead = true;

    ctx.fillStyle = b.color;
    ctx.shadowBlur = 10;
    ctx.shadowColor = b.color;
    ctx.fillRect(b.x - (b.missile ? 3 : 2), b.y - 8, b.missile ? 6 : 4, b.missile ? 16 : 14);
    ctx.shadowBlur = 0;
  });

  asteroids.forEach((a) => {
    a.update();
    a.draw();

    if (Math.hypot(a.x - player.x, a.y - player.y) < a.radius + player.radius - 4) {
      a.dead = true;
      player.takeDamage("COLISIÓN CON ASTEROIDE");
    }

    bullets.forEach((b) => {
      if (!b.dead && !a.dead && Math.hypot(b.x - a.x, b.y - a.y) < a.radius + 6) {
        b.dead = true;
        a.hp -= b.dmg;
        a.hitFlash = 4;
        if (a.hp <= 0) {
          a.dead = true;
          SoundFX.play("boom");
          spawnExplosion(a.x, a.y, "#ffcc33", 12);
          spawnPowerup(a.x, a.y);

          if (a.kind === "explosive") {
            asteroids.forEach((other) => {
              if (other !== a && Math.hypot(other.x - a.x, other.y - a.y) < 135) {
                other.hp -= 4;
                if (other.hp <= 0) other.dead = true;
              }
            });
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
    e.update();
    e.draw();

    if (Math.hypot(e.x - player.x, e.y - player.y) < e.radius + player.radius) {
      e.dead = true;
      player.takeDamage("CHOQUE CON NAVE ENEMIGA");
    }

    bullets.forEach((b) => {
      if (!b.dead && !e.dead && Math.hypot(b.x - e.x, b.y - e.y) < e.radius + 6) {
        b.dead = true;
        e.hp -= b.dmg;
        if (e.hp <= 0) {
          e.dead = true;
          SoundFX.play("boom");
          spawnExplosion(e.x, e.y, "#ff2a85", 16);
          spawnPowerup(e.x, e.y);
          state.score += 120 * state.combo;
          advanceProgress(2);
        }
      }
    });
  });

  if (boss) {
    boss.update();
    boss.draw();
    const hpBar = document.getElementById("boss-hp");
    if (hpBar) hpBar.style.width = `${Math.max(0, (boss.hp / boss.maxHp) * 100)}%`;

    bullets.forEach((b) => {
      if (!b.dead && boss && Math.hypot(b.x - boss.x, b.y - boss.y) < boss.radius) {
        b.dead = true;
        boss.hp -= b.dmg;
        if (boss.hp <= 0) defeatBoss();
      }
    });
  }

  enemyBullets.forEach((eb) => {
    eb.x += eb.vx;
    eb.y += eb.vy;
    if (eb.y > H + 20 || eb.x < -20 || eb.x > W + 20) eb.dead = true;

    ctx.fillStyle = eb.color;
    ctx.beginPath();
    ctx.arc(eb.x, eb.y, 4.5, 0, Math.PI * 2);
    ctx.fill();

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
    ctx.fillRect(pt.x, pt.y, pt.size, pt.size);
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

  player.draw();

  bullets = bullets.filter((b) => !b.dead);
  enemyBullets = enemyBullets.filter((eb) => !eb.dead);
  asteroids = asteroids.filter((a) => !a.dead);
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
}
/* ============================================================================
   AETHER NOVA: ECLIPSE - EDICIÓN DEFINITIVA CORREGIDA (BLOQUE 4B-1)
   ============================================================================ */

// 18. HUD, PAUSA Y FIN DE PARTIDA
function updateHUD() {
  if (!player) return;
  const era = ERAS[Math.min(9, Math.floor((state.level - 1) / 10))];
  document.getElementById("ui-score").textContent = state.score;
  document.getElementById("ui-level").textContent = `${state.level}/100`;
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

function startNewGame(savedData = null) {
  SoundFX.init();
  SoundFX.startMusic();
  bullets = [];
  enemyBullets = [];
  asteroids = [];
  enemies = [];
  phenomena = [];
  powerups = [];
  particles = [];
  boss = null;
  document.getElementById("boss-bar-wrap").classList.add("hidden");

  if (savedData) {
    state.level = savedData.level || 1;
    state.score = savedData.score || 0;
    state.selectedShip = savedData.ship || "valkyrie";
    player = new Player(state.selectedShip);
    player.lives = savedData.lives || 3;
    player.bombs = savedData.bombs ?? 1;
  } else {
    state.level = 1;
    state.score = 0;
    player = new Player(state.selectedShip);
  }

  state.levelProgress = 0;
  state.levelTarget = 14 + Math.floor(state.level * 1.4);
  state.mode = "PLAYING";

  document.getElementById("screen-menu").classList.add("hidden");
  document.getElementById("screen-gameover").classList.add("hidden");
  document.getElementById("screen-pause").classList.add("hidden");
  document.getElementById("hud").classList.remove("hidden");
  document.getElementById("touch-controls").classList.remove("hidden");
  updateHUD();
}

function togglePause() {
  if (state.mode === "PLAYING") {
    state.mode = "PAUSED";
    document.getElementById("pause-stats").textContent = `Sector ${state.level}/100 • Puntos: ${state.score}`;
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
  document.getElementById("end-badge").textContent = victory ? "MISIÓN CUMPLIDA" : "TRANSMISIÓN FINALIZADA";
  document.getElementById("end-title").textContent = victory ? "¡GALAXIA SALVADA!" : "NAVE DESTRUIDA";
  document.getElementById("end-summary").textContent = `Alcanzaste el Sector ${state.level}/100 con ${state.score} puntos.`;
  document.getElementById("screen-gameover").classList.remove("hidden");
  registerScore();
}

// 19. SISTEMA DE USUARIO + PIN SINCRONIZADO CON FIREBASE FIRESTORE
let activeProfile = JSON.parse(localStorage.getItem("aether_profile") || "null");

function getProfileKey(name, pin) {
  return `${name.trim().toLowerCase()}_${pin.trim()}`;
}

function refreshAuthUI() {
  const formBox = document.getElementById("auth-form-box");
  const loggedBox = document.getElementById("auth-logged-box");
  if (activeProfile) {
    formBox.classList.add("hidden");
    loggedBox.classList.remove("hidden");
    document.getElementById("user-display-name").textContent = activeProfile.name;
    document.getElementById("user-cloud-status").textContent = db ? "Sincronizado en la nube" : "Perfil local activo";
  } else {
    formBox.classList.remove("hidden");
    loggedBox.classList.add("hidden");
  }
  checkSavedRun();
}

async function loginWithPin() {
  const nameVal = document.getElementById("input-pilot").value.trim();
  const pinVal = document.getElementById("input-pin").value.trim();
  if (nameVal.length < 2 || pinVal.length < 4) {
    alert("Ingresa un nombre de comandante (mín. 2 letras) y un PIN de al menos 4 dígitos.");
    return;
  }

  const key = getProfileKey(nameVal, pinVal);
  activeProfile = { name: nameVal, pin: pinVal, key };
  localStorage.setItem("aether_profile", JSON.stringify(activeProfile));

  if (db) {
    try {
      const doc = await db.collection("pilots").doc(key).get();
      if (doc.exists && doc.data().save) {
        localStorage.setItem(`aether_save_${key}`, JSON.stringify(doc.data().save));
      }
    } catch (e) {}
  }
  refreshAuthUI();
}
/* ============================================================================
   AETHER NOVA: ECLIPSE - EDICIÓN DEFINITIVA CORREGIDA (BLOQUE 4B-2 - FINAL)
   ============================================================================ */

async function saveCloudProgress() {
  if (!player) return;
  const key = activeProfile ? activeProfile.key : "guest";
  const pilotName = activeProfile ? activeProfile.name : "Comandante";
  const payload = {
    name: pilotName,
    level: state.level,
    score: state.score,
    ship: state.selectedShip,
    lives: player.lives,
    bombs: player.bombs,
    updatedAt: Date.now()
  };

  localStorage.setItem(`aether_save_${key}`, JSON.stringify(payload));
  if (db && activeProfile) {
    try {
      await db.collection("pilots").doc(key).set({ name: pilotName, save: payload }, { merge: true });
    } catch (e) {}
  }
  addFloatingText(W / 2, H * 0.45, "PROGRESO GUARDADO", "#00ff88");
  checkSavedRun();
}

function checkSavedRun() {
  const key = activeProfile ? activeProfile.key : "guest";
  const raw = localStorage.getItem(`aether_save_${key}`);
  const btn = document.getElementById("btn-continue");
  if (raw && btn) {
    const data = JSON.parse(raw);
    btn.classList.remove("hidden");
    btn.textContent = `CONTINUAR SECTOR ${data.level} (${data.score} PTS)`;
  } else if (btn) {
    btn.classList.add("hidden");
  }
}

async function registerScore() {
  const pilotName = activeProfile ? activeProfile.name : "Comandante";
  const entry = { name: pilotName, score: state.score, level: state.level };
  const list = JSON.parse(localStorage.getItem("aether_nova_rank") || "[]");
  list.push(entry);
  list.sort((a, b) => b.score - a.score);
  localStorage.setItem("aether_nova_rank", JSON.stringify(list.slice(0, 5)));

  if (db && activeProfile) {
    try {
      await db.collection("leaderboard").doc(activeProfile.key).set(entry, { merge: true });
    } catch (e) {}
  }
  renderRanking();
}

function renderRanking() {
  const ol = document.getElementById("ranking-list");
  if (!ol) return;
  const list = JSON.parse(localStorage.getItem("aether_nova_rank") || "[]");
  if (list.length === 0) {
    ol.innerHTML = "<li><span>Sin registros aún</span><span class='pts'>0 PTS</span></li>";
    return;
  }
  ol.innerHTML = list
    .map((r, i) => `<li><span>#${i + 1} ${r.name} (S.${r.level})</span><span class="pts">${r.score} PTS</span></li>`)
    .join("");
}

// 20. EVENTOS TÁCTILES INSTANTÁNEOS, TECLADO Y GIROSCOPIO
function bindTap(id, handler) {
  const el = document.getElementById(id);
  if (!el) return;
  el.addEventListener("click", handler);
}

function bindHold(id, dirKey) {
  const el = document.getElementById(id);
  if (!el) return;
  const on = (e) => { e.preventDefault(); keys[dirKey] = true; el.classList.add("pressed"); };
  const off = (e) => { e.preventDefault(); keys[dirKey] = false; el.classList.remove("pressed"); };
  el.addEventListener("touchstart", on, { passive: false });
  el.addEventListener("touchend", off);
  el.addEventListener("touchcancel", off);
  el.addEventListener("mousedown", on);
  el.addEventListener("mouseup", off);
  el.addEventListener("mouseleave", off);
}

bindHold("btn-left", "Left");
bindHold("btn-right", "Right");

window.addEventListener("keydown", (e) => {
  if (e.code === "ArrowLeft" || e.code === "KeyA") keys.Left = true;
  if (e.code === "ArrowRight" || e.code === "KeyD") keys.Right = true;
  if (e.code === "KeyB" || e.code === "Space") triggerSuperBomb();
  if (e.code === "KeyP" || e.code === "Escape") togglePause();
});

window.addEventListener("keyup", (e) => {
  if (e.code === "ArrowLeft" || e.code === "KeyA") keys.Left = false;
  if (e.code === "ArrowRight" || e.code === "KeyD") keys.Right = false;
});

bindTap("btn-bomb", triggerSuperBomb);
bindTap("btn-pause", togglePause);
bindTap("btn-resume", togglePause);
bindTap("btn-save", saveCloudProgress);
bindTap("btn-save-pause", saveCloudProgress);

bindTap("btn-audio", (e) => {
  SoundFX.enabled = !SoundFX.enabled;
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
    state.selectedShip = btn.dataset.ship;
  });
});

bindTap("btn-login", loginWithPin);
bindTap("btn-logout", () => {
  activeProfile = null;
  localStorage.removeItem("aether_profile");
  refreshAuthUI();
});

bindTap("btn-play", () => startNewGame(null));
bindTap("btn-restart", () => startNewGame(null));
bindTap("btn-continue", () => {
  const key = activeProfile ? activeProfile.key : "guest";
  const saved = JSON.parse(localStorage.getItem(`aether_save_${key}`) || "null");
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

// Arranque inicial
initStars();
refreshAuthUI();
renderRanking();
requestAnimationFrame(updateAndDraw);

