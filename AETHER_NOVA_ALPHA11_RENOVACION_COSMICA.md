# AETHER NOVA: ECLIPSE — Alpha 11: Renovación cósmica 3D

## Correcciones incluidas
- Los cazas enemigos se generan desde el sector 1, con el intervalo y límite de enemigos existentes. Las variantes especiales continúan desbloqueándose por progresión.
- Los enemigos tienen modelos 3D diferenciados: scout, interceptor, lancer, weaver, bomber y carrier.
- Se incorpora un puente de estado para sincronizar los fenómenos cósmicos reales del motor con el renderizador 3D.
- Agujero negro: singularidad oscura, disco de acreción, anillos de fotones y halo luminoso.
- Supernova: estrella central, corona y capas expansivas.
- Magnetar: estrella compacta, líneas de campo magnético y pulso expansivo.
- Púlsar: estrella de neutrones, anillos y haces gamma giratorios.
- Cuando el renderizador 3D está activo se desactiva el dibujo 2D duplicado de los fenómenos. Si WebGL no inicia, se conserva el dibujo 2D de respaldo.

## Desbloqueo de fenómenos
Se conserva la progresión original: agujero negro y supernova desde sector 2; magnetar desde sector 4; púlsar desde sector 6. Su aparición es aleatoria durante la partida, no inmediata al iniciar el sector.

## Conservación
La simulación, colisiones, daño, recompensas, progresión, guardado y servicios online siguen en `game.js` y Supabase. El renderizador 3D es una capa visual sincronizada.

## Verificación
Validación sintáctica con Node.js de `game.js`, `aether3d.js` y `sw.js`, y prueba de integridad del ZIP. No se ejecutó una prueba gráfica dentro de Chrome; se requiere validación en el equipo del jugador.
