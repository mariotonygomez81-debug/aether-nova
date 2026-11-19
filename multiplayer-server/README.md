# AETHER NOVA — servidor autoritativo (integración inicial)

Este servicio ejecuta salas de combate online con Colyseus. El sitio GitHub Pages es el cliente web; GitHub Pages no ejecuta el servidor WebSocket.

## Requisitos y configuración
- Node.js 22 o superior.
- Hosting que admita conexiones WebSocket.
- Variables de entorno:
  - `SUPABASE_URL`: URL del proyecto.
  - `SUPABASE_PUBLISHABLE_KEY`: clave pública/publishable. Nunca usar `service_role`.
  - `PORT`: puerto asignado por el proveedor (por defecto 2567).

## Desarrollo local
```bash
cd multiplayer-server
npm install
npm run check
npm test
SUPABASE_URL="https://TU-PROYECTO.supabase.co" SUPABASE_PUBLISHABLE_KEY="TU_CLAVE_PUBLICA" npm start
``
La ruta `/health` devuelve un JSON de estado para monitorización. Para comprobar el servicio desplegado desde una terminal: `AETHER_BATTLE_SERVER_URL=https://aether-nova-battle-server.onrender.com npm run smoke:health`.

## Seguridad y autoridad
- El servidor valida el access token consultando Supabase Auth.
- Antes de aceptar un piloto, verifica mediante RLS que pertenece a la sala y que esta se encuentra en estado `playing`.
- El cliente solo puede enviar entradas booleanas normalizadas y el identificador de una de las seis armas permitidas; no puede establecer posiciones, daño, puntos ni resultados.
- El servidor calcula movimiento, disparos, aparición de enemigos, daño a enemigos y puntuación inicial.
- Las salas se filtran por `coopRoomId`.
- No contiene claves secretas ni usa `service_role`.

## Estado funcional verificado por inspección
- El juego puede solicitar una sala `aether_battle` después de iniciar una misión cooperativa de Supabase.
- El adaptador Colyseus admite mensajes `input` y `weapon` y recibe el estado replicado.
- La app Joystick continúa transmitiendo controles mediante Supabase Realtime al cliente de juego.
- La integración completa del combate aún no está terminada: el motor del juego no envía todavía sus controles de forma sostenida al servidor autoritativo y no renderiza el estado replicado como las naves, disparos y enemigos de la simulación principal.
- El núcleo de servidor actual no implementa todavía colisiones de enemigos contra pilotos, pérdida de vidas, jefes, progresión completa de sectores, persistencia de resultados ni reconciliación visual.
- Por tanto, un estado de servicio `live` confirma que el proceso está levantado, no que el combate cooperativo completo esté validado.

## Pruebas
`npm run check` comprueba sintaxis de los módulos del servidor. `npm test` valida el contrato de entrada, la lista de naves y el catálogo de armas. La prueba de extremo a extremo requiere dos cuentas reales, dos clientes y una sala de Supabase en estado `playing`.

## Despliegue
El servicio Render existente usa Docker con contexto `multiplayer-server`. Los cambios en esa carpeta disparan el despliegue automático cuando se integran en la rama configurada. Configurar variables de entorno desde el panel del proveedor; no publicar archivos `.env` ni claves secretas.
