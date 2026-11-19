import { Room, ServerError } from "colyseus";
import { randomUUID } from "node:crypto";
import { AetherBattleState, PilotState, EnemyState, ShotState } from "../state/AetherBattleState.js";

const WORLD = Object.freeze({ width: 1000, height: 600 });
const SHIP_IDS = new Set(["valkyrie","viper","titan","wraith","bastion","phoenix","singularity","omega"]);
const WEAPONS = new Set(["supernova","emp","cluster","singularity","cryo","gravity"]);
const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const isBoolean = value => typeof value === "boolean";

async function supabaseRequest(path, token) {
  const base = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY;
  if (!base || !key) throw new Error("Faltan SUPABASE_URL y SUPABASE_PUBLISHABLE_KEY.");
  const response = await fetch(`${base}/rest/v1/${path}`, {
    headers: { apikey: key, Authorization: `Bearer ${token}` }
  });
  const body = await response.json().catch(() => null);
  if (!response.ok) throw new Error(body?.message || "No se pudo validar la sala cooperativa.");
  return body;
}

export class AetherBattleRoom extends Room {
  maxClients = 4;
  state = new AetherBattleState();

  async onCreate(options) {
    if (!options.coopRoomId) throw new ServerError(400, "Falta el identificador de la sala cooperativa.");
    if (!/^[0-9a-f-]{36}$/i.test(String(options.coopRoomId))) throw new ServerError(400, "Identificador de sala inválido.");
    this.coopRoomId = String(options.coopRoomId);
    this.setPrivate(true);
    this.inputs = new Map();
    this.lastInputAt = new Map();
    this.lastFireAt = new Map();
    this.spawnClock = 0;
    this.lastTickAt = Date.now();
    this.state.phase = "waiting";

    this.onMessage("input", (client, message) => this.receiveInput(client, message));
    this.onMessage("weapon", (client, message) => this.useWeapon(client, message));

    this.setSimulationInterval((deltaMs) => this.simulate(deltaMs), 1000 / 30);
  }

  static async onAuth(token) {
    if (!token) throw new ServerError(401, "Debes iniciar sesión con tu cuenta AETHER NOVA.");
    const base = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_PUBLISHABLE_KEY;
    if (!base || !key) throw new ServerError(503, "El servidor no tiene configurada la autenticación.");
    const response = await fetch(`${base}/auth/v1/user`, {
      headers: { apikey: key, Authorization: `Bearer ${token}` }
    });
    if (!response.ok) throw new ServerError(401, "La sesión de Supabase no es válida o venció.");
    const user = await response.json();
    return { userId: user.id, accessToken: token };
  }

  async onJoin(client, options, auth) {
    if (String(options.coopRoomId || "") !== this.coopRoomId) {
      throw new ServerError(400, "La sala de combate no coincide con la invitación.");
    }
    const roomId = encodeURIComponent(this.coopRoomId);
    const userId = encodeURIComponent(auth.userId);
    const [members, rooms] = await Promise.all([
      supabaseRequest(`coop_room_members?select=pilot_name,ship_id&room_id=eq.${roomId}&user_id=eq.${userId}&limit=1`, auth.accessToken),
      supabaseRequest(`coop_rooms?select=status,host_user_id,max_players&id=eq.${roomId}&limit=1`, auth.accessToken)
    ]);
    if (!members?.length || !rooms?.length) throw new ServerError(403, "Tu cuenta no pertenece a esta sala.");
    if (rooms[0].status !== "playing") throw new ServerError(409, "La sala todavía no inició la misión.");
    this.maxClients = clamp(Number(rooms[0].max_players) || 2, 2, 4);
    if (!SHIP_IDS.has(members[0].ship_id)) throw new ServerError(400, "La nave elegida no es válida.");

    const pilot = new PilotState();
    pilot.userId = auth.userId;
    pilot.pilotName = String(members[0].pilot_name || "Piloto").slice(0, 16);
    pilot.shipId = members[0].ship_id;
    const index = this.state.players.size;
    pilot.x = index % 2 === 0 ? 380 : 620;
    pilot.y = 500;
    this.state.players.set(client.sessionId, pilot);
    this.inputs.set(client.sessionId, { left: false, right: false, up: false, down: false, fire: false });
    if (this.state.players.size >= 2) this.state.phase = "active";
    this.broadcast("pilot-joined", { pilotName: pilot.pilotName, shipId: pilot.shipId });
  }

  onLeave(client) {
    const pilot = this.state.players.get(client.sessionId);
    if (pilot) {
      pilot.connected = false;
      this.state.players.delete(client.sessionId);
    }
    this.inputs.delete(client.sessionId);
    this.lastInputAt.delete(client.sessionId);
    this.lastFireAt.delete(client.sessionId);
    if (this.state.players.size < 2 && this.state.phase === "active") this.state.phase = "waiting";
  }

  receiveInput(client, message) {
    if (!this.state.players.has(client.sessionId) || !message || typeof message !== "object") return;
    const now = Date.now();
    const previous = this.lastInputAt.get(client.sessionId) || 0;
    if (now - previous < 20) return;
    this.lastInputAt.set(client.sessionId, now);
    this.inputs.set(client.sessionId, {
      left: isBoolean(message.left) && message.left,
      right: isBoolean(message.right) && message.right,
      up: isBoolean(message.up) && message.up,
      down: isBoolean(message.down) && message.down,
      fire: isBoolean(message.fire) && message.fire
    });
  }

  useWeapon(client, message) {
    const pilot = this.state.players.get(client.sessionId);
    const type = String(message?.type || "");
    if (!pilot || !WEAPONS.has(type) || pilot.bombs <= 0) return;
    const now = Date.now();
    const previous = this.lastFireAt.get(client.sessionId) || 0;
    if (now - previous < 500) return;
    this.lastFireAt.set(client.sessionId, now);
    pilot.bombs -= 1;
    const damage = ({ supernova: 5, emp: 1, cluster: 2, singularity: 4, cryo: 1, gravity: 2 })[type];
    for (const enemy of this.state.enemies.values()) {
      enemy.hp -= damage;
      if (type === "cryo") enemy.speed *= 0.55;
      if (type === "gravity") enemy.x += (WORLD.width / 2 - enemy.x) * 0.25;
    }
    this.removeDestroyedEnemies();
    this.broadcast("weapon-fired", { type, pilot: pilot.pilotName });
  }

  spawnEnemy() {
    const id = randomUUID();
    const enemy = new EnemyState();
    enemy.id = id;
    enemy.x = 45 + Math.random() * (WORLD.width - 90);
    enemy.y = -25;
    enemy.hp = 2 + Math.floor(this.state.sector / 3);
    enemy.speed = 65 + this.state.sector * 2;
    enemy.kind = this.state.serverTick % 4 === 0 ? "armored" : "scout";
    this.state.enemies.set(id, enemy);
  }

  removeDestroyedEnemies() {
    for (const [id, enemy] of this.state.enemies) {
      if (enemy.hp <= 0) {
        this.state.enemies.delete(id);
        for (const pilot of this.state.players.values()) pilot.score += 100;
      }
    }
  }

  simulate(deltaMs) {
    if (this.state.phase !== "active") return;
    const dt = clamp(deltaMs / 1000, 0, 0.05);
    this.state.serverTick += 1;
    this.spawnClock += dt;
    if (this.spawnClock >= 1.4 && this.state.enemies.size < 14) {
      this.spawnClock = 0;
      this.spawnEnemy();
    }

    for (const [sessionId, pilot] of this.state.players) {
      const input = this.inputs.get(sessionId) || {};
      const dx = Number(!!input.right) - Number(!!input.left);
      const dy = Number(!!input.down) - Number(!!input.up);
      const length = Math.hypot(dx, dy) || 1;
      const speed = pilot.shipId === "viper" ? 285 : pilot.shipId === "titan" ? 185 : 230;
      pilot.x = clamp(pilot.x + dx / length * speed * dt, 30, WORLD.width - 30);
      pilot.y = clamp(pilot.y + dy / length * speed * dt, 35, WORLD.height - 35);
      if (input.fire) {
        const now = Date.now();
        if (now - (this.lastFireAt.get(sessionId) || 0) > 220) {
          this.lastFireAt.set(sessionId, now);
          const shot = new ShotState();
          shot.id = randomUUID();
          shot.ownerId = sessionId;
          shot.x = pilot.x;
          shot.y = pilot.y - 24;
          shot.vx = 0;
          shot.vy = -520;
          shot.damage = 1;
          this.state.shots.set(shot.id, shot);
        }
      }
    }

    for (const [id, enemy] of this.state.enemies) {
      enemy.y += enemy.speed * dt;
      if (enemy.y > WORLD.height + 30) this.state.enemies.delete(id);
    }
    for (const [id, shot] of this.state.shots) {
      shot.x += shot.vx * dt;
      shot.y += shot.vy * dt;
      let hit = false;
      for (const enemy of this.state.enemies.values()) {
        if (Math.hypot(enemy.x - shot.x, enemy.y - shot.y) < 22) {
          enemy.hp -= shot.damage;
          hit = true;
          break;
        }
      }
      if (hit || shot.y < -30 || shot.x < -30 || shot.x > WORLD.width + 30) this.state.shots.delete(id);
    }
    this.removeDestroyedEnemies();
  }
}
