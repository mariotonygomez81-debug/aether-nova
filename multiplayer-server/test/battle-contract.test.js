import test from "node:test";
import assert from "node:assert/strict";
import { getWeaponSpec, isAllowedShip, normalizeBattleInput, SHIP_IDS, WEAPON_SPECS } from "../src/battle-contract.js";

test("normalizes only strict boolean input fields", () => {
  const normalized = normalizeBattleInput({
    left: true, right: 1, up: "true", down: false, fire: true,
    x: 9999, score: 1000000, damage: 999
  });
  assert.deepEqual(normalized, {
    left: true, right: false, up: false, down: false, fire: true
  });
  assert.equal(Object.isFrozen(normalized), true);
});

test("rejects non-object and array input payloads", () => {
  assert.equal(normalizeBattleInput(null), null);
  assert.equal(normalizeBattleInput("left"), null);
  assert.equal(normalizeBattleInput([]), null);
});

test("allows only the eight published ship identifiers", () => {
  assert.equal(SHIP_IDS.length, 8);
  for (const ship of SHIP_IDS) assert.equal(isAllowedShip(ship), true);
  assert.equal(isAllowedShip("admin"), false);
  assert.equal(isAllowedShip({}), false);
});

test("exposes only the six supported tactical weapons and server-side damage", () => {
  assert.deepEqual(Object.keys(WEAPON_SPECS).sort(), [
    "cluster", "cryo", "emp", "gravity", "singularity", "supernova"
  ]);
  assert.equal(getWeaponSpec("supernova").damage, 5);
  assert.equal(getWeaponSpec("cryo").speedMultiplier, 0.55);
  assert.equal(getWeaponSpec("gravity").pull, 0.25);
  assert.equal(getWeaponSpec("unknown"), null);
  assert.equal(getWeaponSpec({}), null);
});
