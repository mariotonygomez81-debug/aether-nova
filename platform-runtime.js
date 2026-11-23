/* AETHER NOVA — runtime multiplataforma y calidad adaptativa.
 * No modifica la simulación: solo selecciona límites de renderizado según el equipo.
 */
(() => {
  const ua = navigator.userAgent || "";
  const tv = /Android TV|GoogleTV|BRAVIA|AFT[A-Z0-9]*/i.test(ua);
  const mobile = /Android|iPhone|iPad|iPod/i.test(ua) || matchMedia("(pointer: coarse)").matches;
  const memory = Number(navigator.deviceMemory || 0);
  const cores = Number(navigator.hardwareConcurrency || 0);
  const saveData = !!navigator.connection?.saveData;
  const constrained = saveData || (memory > 0 && memory <= 3) || (cores > 0 && cores <= 4);
  let tier = constrained ? "low" : (memory >= 8 && cores >= 8 ? "ultra" : "high");
  if (tv && !constrained) tier = memory >= 4 && cores >= 6 ? "high" : "medium";
  if (mobile && !constrained) tier = memory >= 6 && cores >= 8 ? "high" : "medium";
  const profiles = {
    low:    { pixelRatio: 0.78, fps: 30, particles: 0.45, shadows: false },
    medium: { pixelRatio: 0.95, fps: 36, particles: 0.65, shadows: false },
    high:   { pixelRatio: 1.15, fps: 45, particles: 0.85, shadows: false },
    ultra:  { pixelRatio: 1.35, fps: 50, particles: 1.0, shadows: false }
  };
  const profile = profiles[tier];
  const platform = tv ? "android-tv" : mobile ? "mobile" : "desktop";
  window.AETHER_PLATFORM = Object.freeze({
    platform, tier, profile: Object.freeze(profile),
    pixelRatio: Math.min(window.devicePixelRatio || 1, profile.pixelRatio),
    fps: profile.fps, particles: profile.particles,
    capabilities: Object.freeze({ gamepad: !!navigator.getGamepads, touch: mobile, coarsePointer: matchMedia("(pointer: coarse)").matches })
  });
  document.documentElement.dataset.aetherPlatform = platform;
  document.documentElement.dataset.aetherQuality = tier;
  console.info("[AETHER NOVA] runtime", window.AETHER_PLATFORM);
})();
