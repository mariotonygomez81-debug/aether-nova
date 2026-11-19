# AETHER NOVA — servidor autoritativo (fase inicial)

Este servicio separado ejecuta las salas de combate online con Colyseus. El sitio de GitHub Pages sigue siendo el cliente web; **GitHub Pages no puede ejecutar este servidor WebSocket**.

## Requisitos
- Node.js 22 o superior.
- Un servicio de hosting persistente que admita WebSockets y despliegue Docker.
- Variables de entorno:
  - `SUPABASE_URL`: URL del proyecto.
  - `SUPABASE_PUBLISHABLE_KEY`: clave pública/publishable (nunca usar service_role).
  - `PORT`: puerto asignado por el proveedor (por defecto 2567).

## Desarrollo local
```bash
cd multiplayer-server
npm install
SUPABASE_URL="https://TU-PROYECTO.supabase.co" SUPABASE_PUBLISHABLE_KEY="TU_CLAVE_PUBLICA" npm start
```
La comprobación de salud queda disponible en `/health`.

## Seguridad y autoridad
- El servidor valida el access token consultando Supabase Auth.
- Antes de aceptar al piloto, verifica con RLS que pertenezca a la sala cooperativa y que el estado de la sala sea `playing`.
- El cliente solo envía entradas booleanas y acciones; no puede enviar posiciones, puntos, daño ni resultados finales.
- Movimiento, disparos, aparición de enemigos, colisiones, bombas y puntuación inicial se calculan en el servidor.
- Las salas se filtran por `coopRoomId`, para que los clientes no se mezclen entre partidas distintas.
- No contiene claves secretas ni usa service_role.

## Estado de esta fase
Este es el primer núcleo autoritativo de combate y todavía no está conectado al cliente AETHER NOVA ni desplegado en un host WebSocket. El flujo de la sala existente de Supabase debe iniciar el combate antes de que el cliente solicite entrar en `aether_battle`. La integración de cliente y joystick, reconciliación visual, reconexión y pruebas con dos cuentas son etapas siguientes.

## Despliegue
Construir esta carpeta como contexto Docker en un host que mantenga el proceso activo y permita WebSockets. Configurar las variables de entorno anteriores en el panel del proveedor. No publicar `.env` ni la service role key.
