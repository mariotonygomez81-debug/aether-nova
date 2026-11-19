(() => {
  const grid = document.getElementById("diagnostic-grid");
  if (!grid) return;
  const platform = window.AETHER_PLATFORM || {};
  const memory = navigator.deviceMemory ? navigator.deviceMemory + " GB" : "No informado";
  const cores = navigator.hardwareConcurrency ? navigator.hardwareConcurrency + " núcleos" : "No informado";
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  const canvas = document.createElement("canvas");
  let webgl = "No disponible";
  try {
    const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
    if (gl) {
      webgl = (typeof WebGL2RenderingContext !== "undefined" && gl instanceof WebGL2RenderingContext) ? "WebGL 2 disponible" : "WebGL 1 disponible";
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    }
  } catch (_) {}
  const checks = [
    ["PLATAFORMA", platform.platform || "No detectada", platform.tier ? "Perfil " + platform.tier : "", "pass"],
    ["RENDER ADAPTATIVO", platform.pixelRatio ? "DPR " + Number(platform.pixelRatio).toFixed(2) : "No detectado", platform.fps ? platform.fps + " FPS objetivo" : "", "pass"],
    ["MEMORIA DEL DISPOSITIVO", memory, cores, "pass"],
    ["WEBGL / GRÁFICOS", webgl, "Necesario para el renderizado 3D", webgl === "No disponible" ? "fail" : "pass"],
    ["WEBSOCKET", typeof WebSocket === "function" ? "Disponible" : "No disponible", "Necesario para el combate online", typeof WebSocket === "function" ? "pass" : "fail"],
    ["PANTALLA", screen.width + " × " + screen.height, "DPR físico " + (window.devicePixelRatio || 1), "pass"],
    ["ENTRADA TÁCTIL", navigator.maxTouchPoints > 0 ? "Disponible" : "No detectada", navigator.maxTouchPoints + " puntos táctiles", navigator.maxTouchPoints > 0 ? "pass" : "warn"],
    ["GAMEPAD", "getGamepads" in navigator ? "API disponible" : "No disponible", "Conectá un mando para comprobarlo", "getGamepads" in navigator ? "pass" : "warn"],
    ["SERVICE WORKER", "serviceWorker" in navigator ? "Disponible" : "No disponible", "Caché y experiencia instalable", "serviceWorker" in navigator ? "pass" : "warn"],
    ["AHORRO DE DATOS", connection?.saveData ? "Activado" : "Desactivado / no informado", connection?.effectiveType || "Tipo de red no informado", connection?.saveData ? "warn" : "pass"],
    ["ORIENTACIÓN", screen.orientation?.type || "No informada", "Rotación detectada por el navegador", "pass"]
  ];
  for (const [label,value,detail,status] of checks) {
    const card=document.createElement("article");
    const small=document.createElement("small"); small.textContent=label;
    const strong=document.createElement("strong"); strong.textContent=value; strong.className=status;
    const span=document.createElement("span"); span.className="detail"; span.textContent=detail;
    card.append(small,strong,span); grid.append(card);
  }
  const userAgent=document.createElement("article");
  const label=document.createElement("small"); label.textContent="NAVEGADOR";
  const value=document.createElement("strong"); value.textContent=navigator.userAgentData?.platform || navigator.platform || "No informado";
  const detail=document.createElement("span"); detail.className="detail"; detail.textContent="Agente de usuario: "+navigator.userAgent.slice(0,150);
  userAgent.append(label,value,detail); grid.append(userAgent);
})();
