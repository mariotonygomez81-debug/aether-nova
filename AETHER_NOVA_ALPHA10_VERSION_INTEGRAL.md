# AETHER NOVA: ECLIPSE — Alpha 10, versión integral

## Base integrada
Esta versión parte del paquete Alpha 9 y conserva los sistemas y contenidos ya incluidos en ese proyecto: interfaz, campaña, progresión, enemigos y jefes, modos, hangar, mejoras, eventos, ranking, guardado y conexión Supabase.

## Renderizado y efectos visuales
- Conserva el renderizador 3D complementario y el entorno espacial sin planetas ni estación.
- Conserva los asteroides, enemigos y jefes 3D que ya estaban integrados.
- Conserva los proyectiles de plasma ovalados con estela redondeada de Alpha 9.
- La lógica de juego y colisiones continúa en el motor original.

## Audio Alpha 10
- Audio Web Audio sintetizado, sin archivos externos ni descargas adicionales.
- Bus maestro con compresor para controlar picos de volumen.
- Láser con ataque brillante y barrido tonal.
- Misil con encendido grave, ruido filtrado y tono ascendente.
- Impactos y explosiones con capas graves y ruido filtrado.
- Supernova con cola de baja frecuencia y barrido amplio.
- Recolección/mejora con secuencia ascendente de tres tonos.
- Música ambiental de ciencia ficción con acordes graves y armónicos suaves.
- Limitación de repetición de efectos para evitar saturación durante ráfagas.
- El botón de audio existente controla efectos y música.

## Pruebas realizadas
- Validación sintáctica con Node.js de `game.js`, `aether3d.js` y `sw.js`.
- Verificación de integridad del ZIP.
- No se realizó una prueba visual ni auditiva automatizada dentro de Chrome; el resultado final debe validarse en el navegador del usuario.

## Ejecución local
Abrir CMD en la carpeta `aether_nova_alpha_7_4` y ejecutar el comando Node.js de servidor local usado en las versiones anteriores. Luego abrir `http://localhost:8002`.
