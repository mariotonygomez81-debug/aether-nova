/*
 * AETHER NOVA — configuración del backend online.
 * Completar con el Project URL y la anon/public key de Supabase.
 * Nunca colocar aquí service_role, claves privadas ni contraseñas administrativas.
 */
window.AETHER_CLOUD_CONFIG = Object.freeze({
  enabled: true,
  supabaseUrl: "https://gmwlcfprhsarxlbgwsvf.supabase.co",
  anonKey: "sb_publishable_X42q42dH1evVZY4NDZi6BQ_6dMP_wbr",
  // Completar después de desplegar multiplayer-server en un host con WebSockets.
  battleServerUrl: ""
});
