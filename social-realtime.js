import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.119.1/+esm";

(() => {
  const config = window.AETHER_CLOUD_CONFIG;
  if (!config?.enabled || !config?.supabaseUrl || !config?.anonKey) return;
  let client = null;
  let currentUser = null;
  let ownChannel = null;
  const friendChannels = new Map();
  let trackedStatus = "";

  const restHeaders = (token) => ({
    apikey: config.anonKey,
    Authorization: "Bearer " + token,
    "Content-Type": "application/json"
  });
  async function readProfile(session) {
    const url = config.supabaseUrl + "/rest/v1/pilot_profiles?select=pilot_name,public_pilot_id,show_presence&user_id=eq." + encodeURIComponent(session.user.id) + "&limit=1";
    const response = await fetch(url, {headers:restHeaders(session.access_token)});
    if (!response.ok) throw new Error("No se pudo leer la configuración de presencia.");
    return (await response.json())[0] || null;
  }
  async function readFriends() {
    const {data,error} = await client.from("friend_network")
      .select("other_user_id")
      .eq("status","accepted");
    if (error) throw error;
    return [...new Set((data || []).map(x => x.other_user_id).filter(id => id && id !== currentUser))];
  }
  function showPresence(userId, status) {
    const node = document.querySelector('.friend-row[data-user-id="' + CSS.escape(userId) + '"] .friend-presence');
    if (!node) return;
    node.textContent = status === "playing" ? "Jugando" : status === "online" ? "En línea" : "Desconectado";
    node.classList.toggle("is-online", status === "online");
    node.classList.toggle("is-playing", status === "playing");
  }
  function updateFromChannel(userId, channel) {
    const state = channel.presenceState();
    const values = Object.values(state).flat();
    const latest = values[0];
    showPresence(userId, latest?.status || "offline");
  }
  async function startOwnPresence(session, profile) {
    if (!profile?.show_presence) return;
    ownChannel = client.channel("pilot:" + currentUser, {
      config:{private:true,presence:{key:currentUser}}
    });
    ownChannel.subscribe(async status => {
      if (status !== "SUBSCRIBED") return;
      trackedStatus = document.getElementById("hud")?.classList.contains("hidden") ? "online" : "playing";
      await ownChannel.track({
        pilot_id:currentUser,
        pilot_name:profile.pilot_name || "Comandante",
        public_pilot_id:profile.public_pilot_id,
        status:trackedStatus
      });
    });
  }
  async function startFriendChannel(userId) {
    if (friendChannels.has(userId)) return;
    const channel = client.channel("pilot:" + userId, {
      config:{private:true,presence:{key:currentUser}}
    });
    channel.on("presence",{event:"sync"},() => updateFromChannel(userId,channel));
    channel.on("presence",{event:"join"},() => updateFromChannel(userId,channel));
    channel.on("presence",{event:"leave"},() => updateFromChannel(userId,channel));
    friendChannels.set(userId,channel);
    channel.subscribe(status => {
      if (status === "SUBSCRIBED") updateFromChannel(userId,channel);
      if (status === "CHANNEL_ERROR" || status === "TIMED_OUT") showPresence(userId,"offline");
    });
  }
  async function syncFriends() {
    if (!client || !currentUser) return;
    try {
      const ids = await readFriends();
      for (const [id,channel] of friendChannels) {
        if (!ids.includes(id)) {
          friendChannels.delete(id);
          await client.removeChannel(channel);
          showPresence(id,"offline");
        }
      }
      await Promise.all(ids.map(startFriendChannel));
    } catch(error) { console.warn("AETHER NOVA Presence: no se pudo sincronizar amigos.",error); }
  }
  async function stop() {
    if (ownChannel && client) await client.removeChannel(ownChannel);
    ownChannel = null;
    if (client) {
      for (const channel of friendChannels.values()) await client.removeChannel(channel);
    }
    friendChannels.clear();
    client = null;
    currentUser = null;
    trackedStatus = "";
    document.querySelectorAll(".friend-presence").forEach(node => {
      node.textContent = "Desconectado";
      node.classList.remove("is-online","is-playing");
    });
  }
  async function start(session) {
    await stop();
    if (!session?.access_token || !session?.user?.id) return;
    currentUser = session.user.id;
    try {
      client = createClient(config.supabaseUrl,config.anonKey,{
        auth:{autoRefreshToken:false,persistSession:false,detectSessionInUrl:false}
      });
      await client.realtime.setAuth(session.access_token);
      const profile = await readProfile(session);
      await startOwnPresence(session,profile);
      await syncFriends();
    } catch(error) {
      console.warn("AETHER NOVA Presence no disponible.",error);
      await stop();
    }
  }
  window.addEventListener("aether:auth", event => { void start(event.detail?.session || null); });
  window.addEventListener("aether:friends-updated", () => { void syncFriends(); });
  window.addEventListener("aether:privacy-updated", async () => {
    if (!client || !currentUser) return;
    const session = window.__AETHER_SOCIAL_SESSION;
    if (session) await start(session);
  });
  window.addEventListener("aether:auth", event => { window.__AETHER_SOCIAL_SESSION = event.detail?.session || null; });
  setInterval(async () => {
    if (!ownChannel || !currentUser) return;
    const next = document.getElementById("hud")?.classList.contains("hidden") ? "online" : "playing";
    if (next !== trackedStatus) {
      trackedStatus = next;
      try { await ownChannel.track({status:next}); } catch(error) {}
    }
  },5000);
  window.addEventListener("beforeunload",() => { if(client) void client.removeAllChannels(); });
})();