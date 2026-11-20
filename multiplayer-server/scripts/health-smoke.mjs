const base = String(process.env.AETHER_BATTLE_SERVER_URL || "").replace(/\/$/, "");
if (!base || !/^https:\/\//i.test(base)) {
  console.error("Define AETHER_BATTLE_SERVER_URL con la URL HTTPS del servidor.");
  process.exit(2);
}
const response = await fetch(`${base}/health`, { signal: AbortSignal.timeout(8000) });
if (!response.ok) {
  console.error(`Health check failed: HTTP ${response.status}`);
  process.exit(1);
}
const payload = await response.json();
if (payload?.ok !== true || payload?.service !== "aether-nova-authoritative-server") {
  console.error("Health response did not match the AETHER NOVA service contract.");
  process.exit(1);
}
console.log("AETHER NOVA battle server health: OK");
