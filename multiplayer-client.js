/* AETHER NOVA — adaptador del cliente Colyseus.
 * El servidor permanece desactivado hasta configurar battleServerUrl.
 * El cliente nunca decide posiciones, daño, puntuación ni resultados.
 */
(() => {
  let client = null;
  let room = null;
  let lastState = null;
  const stateListeners = new Set();
  const eventListeners = new Map();

  function serverUrl() {
    const value = String(window.AETHER_CLOUD_CONFIG?.battleServerUrl || "").trim();
    if (!value) throw new Error("El servidor de combate todavía no está desplegado/configurado.");
    if (!/^https:\/\//i.test(value)) throw new Error("El servidor debe utilizar HTTPS para habilitar WebSockets seguros.");
    return value.replace(/\/$/, "");
  }

  async function connect(coopRoomId, accessToken) {
    if (!coopRoomId || !accessToken) throw new Error("Falta la sala o la sesión autenticada.");
    if (room && room.connection?.isOpen) {
      if (room.state && room.state.coopRoomId === coopRoomId) return room;
      await disconnect();
    }
    const { Client } = await import("https://esm.sh/@colyseus/sdk@0.18.10");
    client = new Client(serverUrl());
    client.auth.token = accessToken;
    room = await client.joinOrCreate("aether_battle", { coopRoomId });
    room.onStateChange((state) => {
      lastState = state;
      for (const listener of stateListeners) {
        try { listener(state); } catch (error) { console.warn("[AETHER MULTIPLAYER] state listener", error); }
      }
    });
    room.onMessage("weapon-fired", payload => emit("weapon-fired", payload));
    room.onMessage("pilot-joined", payload => emit("pilot-joined", payload));
    room.onLeave(() => { emit("disconnected", null); room = null; client = null; });
    emit("connected", { roomId: room.id, sessionId: room.sessionId });
    return room;
  }

  function sendInput(input = {}) {
    if (!room) return false;
    room.send("input", {
      left: input.left === true, right: input.right === true,
      up: input.up === true, down: input.down === true,
      fire: input.fire === true
    });
    return true;
  }

  function sendWeapon(type) {
    if (!room || typeof type !== "string") return false;
    room.send("weapon", { type });
    return true;
  }

  function onState(listener) {
    if (typeof listener !== "function") return () => {};
    stateListeners.add(listener);
    if (lastState) listener(lastState);
    return () => stateListeners.delete(listener);
  }

  function on(event, listener) {
    if (typeof listener !== "function") return () => {};
    if (!eventListeners.has(event)) eventListeners.set(event, new Set());
    eventListeners.get(event).add(listener);
    return () => eventListeners.get(event)?.delete(listener);
  }

  function emit(event, payload) {
    for (const listener of eventListeners.get(event) || []) {
      try { listener(payload); } catch (error) { console.warn("[AETHER MULTIPLAYER] event listener", error); }
    }
  }

  async function disconnect() {
    const current = room;
    room = null; client = null; lastState = null;
    if (current) { try { await current.leave(); } catch (error) { console.warn("[AETHER MULTIPLAYER] leave", error); } }
    emit("disconnected", null);
  }

  window.AETHER_MULTIPLAYER = Object.freeze({
    connect, sendInput, sendWeapon, onState, on, disconnect,
    get connected() { return !!room; },
    get state() { return lastState; },
    get roomId() { return room?.id || null; }
  });
})();
