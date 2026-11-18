# AETHER NOVA: ECLIPSE — Alpha 6.2
## Etapa 6.2: envío visible de puntuaciones

### Cambios de esta entrega
- Se agrega un control `ENVIAR PUNTUACIÓN` a la pantalla de resultado.
- El envío automático existente se conserva para cuentas autenticadas.
- Se informa al jugador si el envío está pendiente, fue exitoso o falló.
- Si el envío automático falla, el jugador puede reintentarlo desde la pantalla de resultado.
- Se conserva un registro local de los identificadores de partidas confirmadas para evitar reenvíos accidentales desde el mismo navegador.
- Se mantiene el ranking semanal online y su botón de actualización.
- Se incrementa la versión de caché del service worker a Alpha 6.2 para que los clientes descarguen los archivos nuevos.

### Límites conocidos
- La deduplicación implementada es local al navegador y no sustituye una restricción única del lado del servidor. Si una petición llega a Supabase pero la respuesta se pierde antes de llegar al navegador, un reintento podría crear otra fila.
- El esquema actual permite que el cliente autenticado declare su puntuación. No existe validación server-side de la partida ni protección anti-trampas suficiente para torneos con premios.
- La lista muestra las diez mejores puntuaciones de la semana UTC; no representa todavía una clasificación histórica ni una posición completa de todos los pilotos.

### Publicación y prueba
1. Publicar el contenido completo de esta carpeta en GitHub Pages, reemplazando los archivos de la versión anterior.
2. Abrir la aplicación con conexión y recargarla. La caché del service worker cambió de versión.
3. Iniciar sesión con una cuenta online.
4. Completar una partida y verificar el mensaje de envío automático en la pantalla de resultado.
5. Pulsar `Actualizar` en Clasificación Galáctica y comprobar que aparece el registro.
6. Para probar el reintento, usar una partida nueva en un momento en que la conexión esté disponible; no borrar datos del navegador para esta prueba.

### Seguridad
No modificar `cloud-config.js` con claves secretas. La clave `sb_publishable_...` es una clave pública de cliente; nunca incluir `service_role` ni credenciales administrativas en archivos publicados.
