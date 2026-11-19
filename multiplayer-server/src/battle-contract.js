export const SHIP_IDS = Object.freeze([
  "valkyrie", "viper", "titan", "wraith",
  "bastion", "phoenix", "singularity", "omega"
]);

export const WEAPON_SPECS = Object.freeze({
  supernova: Object.freeze({ damage: 5 }),
  emp: Object.freeze({ damage: 1 }),
  cluster: Object.freeze({ damage: 2 }),
  singularity: Object.freeze({ damage: 4 }),
  cryo: Object.freeze({ damage: 1, speedMultiplier: 0.55 }),
  gravity: Object.freeze({ damage: 2, pull: 0.25 })
});

export function normalizeBattleInput(message) {
  if (!message || typeof message !== "object" || Array.isArray(message)) return null;
  return Object.freeze({
    left: message.left === true,
    right: message.right === true,
    up: message.up === true,
    down: message.down === true,
    fire: message.fire === true
  });
}

export function isAllowedShip(shipId) {
  return typeof shipId === "string" && SHIP_IDS.includes(shipId);
}

export function getWeaponSpec(type) {
  return typeof type === "string" ? WEAPON_SPECS[type] || null : null;
}
