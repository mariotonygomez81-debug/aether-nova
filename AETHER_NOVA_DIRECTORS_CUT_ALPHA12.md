# AETHER NOVA: ECLIPSE — Director's Cut Alpha 12

## Base
Construida sobre AETHER NOVA Alpha 11 Renovación Cósmica 3D y conserva el juego original, su simulación 2D de reglas/colisiones, interfaz, progresión, campaña, armas, jefes, fenómenos, ranking, guardado y conexión Supabase.

## Correcciones gráficas
- Corrección de jerarquía de grupos en piezas de naves enemigas: componentes secundarios que podían quedar unidos a la nave del jugador ahora pertenecen al grupo enemigo correcto.
- Modelos de enemigos con blindaje, siluetas y reactores emisivos diferenciados.
- Mejoras de suavizado y densidad de píxeles del renderizador, con límite conservador para no disparar el coste de GPU.
- Animación de discos de acreción, anillos magnéticos, haces de púlsar y capas de expansión de supernova.
- Se mantienen los fenómenos 3D y las estelas de plasma existentes.
- No se reintroducen planetas ni estación espacial decorativa.

## Audio
Se conserva el sistema de audio sintetizado de Alpha 10: láser, misil, impacto, explosión, supernova, potenciadores y ambiente musical. No se añadieron muestras de audio grabadas ni una banda sonora licenciada; los efectos son generados por Web Audio.

## Verificaciones
- `node --check` correcto para game.js, aether3d.js y sw.js.
- ZIP íntegro.
- No se ejecutó una prueba de navegador/escucha automatizada en esta sesión. La calidad final depende también del hardware, navegador y disponibilidad del módulo Three.js desde CDN.
- Esta versión es una mejora concreta, no una afirmación de paridad con un juego AAA comercial.

## Ejecución
Abrir CMD dentro de `aether_nova_alpha_7_4` y ejecutar el servidor Node.js habitual en puerto 8002. Abrir `http://localhost:8002`. Para actualizar recursos: Ctrl+F5.
