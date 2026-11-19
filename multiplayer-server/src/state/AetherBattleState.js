import { schema, t } from "@colyseus/schema";

export const PilotState = schema({
  userId: t.string(),
  pilotName: t.string(),
  shipId: t.string(),
  x: t.number().default(500),
  y: t.number().default(500),
  hp: t.number().default(100),
  lives: t.number().default(3),
  bombs: t.number().default(3),
  score: t.number().default(0),
  connected: t.boolean().default(true)
});

export const EnemyState = schema({
  id: t.string(),
  x: t.number(),
  y: t.number(),
  hp: t.number(),
  speed: t.number(),
  kind: t.string()
});

export const ShotState = schema({
  id: t.string(),
  ownerId: t.string(),
  x: t.number(),
  y: t.number(),
  vx: t.number(),
  vy: t.number(),
  damage: t.number()
});

export const AetherBattleState = schema({
  phase: t.string().default("waiting"),
  sector: t.number().default(1),
  serverTick: t.number().default(0),
  players: t.map(PilotState),
  enemies: t.map(EnemyState),
  shots: t.map(ShotState)
});
