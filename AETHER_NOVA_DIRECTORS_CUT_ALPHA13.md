# AETHER NOVA: ECLIPSE — Director's Cut Alpha 13

## Combate e impactos
- Los asteroides y las naves enemigas generan destellos y partículas al recibir disparos.
- Al destruir asteroides o naves se reproduce una explosión reforzada con fragmentos/partículas 2D y una ráfaga 3D en el renderizador superpuesto.
- Los choques del jugador con asteroides y naves producen efectos de contacto visibles.
- Los impactos sobre el jugador generan una ráfaga 3D en la posición de la nave, sacudida de cámara y flash; los escudos tienen un efecto visual y sonido diferenciados.
- Se añadieron sonidos breves de impacto sobre objetivos y un sonido específico de absorción por escudo.
- Se amplió la duración del destello de impacto sobre asteroides.

## Correcciones del renderizador 3D
- Se añadió la conversión de coordenadas 2D a espacio 3D utilizada por naves y jefes.
- Se implementó la sincronización de la flota enemiga 3D y la limpieza de sus modelos.
- Se añadieron ráfagas 3D al desaparecer asteroides y naves enemigas.

## Validación
- Comprobación sintáctica con Node.js de game.js, aether3d.js y sw.js.
- Integridad del ZIP verificada.
- No se realizó todavía una prueba visual ni auditiva en navegador real; requiere validación en el equipo del usuario.
