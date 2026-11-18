# AETHER NOVA: ECLIPSE

Videojuego arcade espacial web, instalable como PWA y publicado con GitHub Pages.

## Características
- Campaña espacial de 100 sectores, enemigos, jefes y progresión.
- Ocho clases de caza, mejoras, créditos y arsenal de combate.
- Renderizado visual 3D complementario sobre el motor de juego Canvas.
- Controles táctiles, teclado y mandos compatibles mediante Gamepad API.
- Compatibilidad con pantallas grandes y Smart TV sujeta al navegador y al soporte de mandos del dispositivo.
- Perfil y progreso local; servicios online opcionales mediante Supabase.
- Salas cooperativas para organizar escuadrones de 2 a 4 pilotos. La sincronización del combate entre jugadores todavía no está implementada.

## Archivos principales
- `index.html`, `style.css`: interfaz y presentación.
- `game.js`: lógica, simulación y controles.
- `aether3d.js`: capa de renderizado 3D.
- `cloud-config.js`: URL y clave pública de Supabase.
- `sw.js`, `manifest.json`: instalación PWA y caché.
- `icon-192.png`, `icon-512.png`: iconos de la aplicación.
- `privacy.html`: política de privacidad.

## Publicación
GitHub Pages publica el contenido de la raíz del repositorio. Después de cada actualización, esperar a que finalice la acción de despliegue y recargar el juego. Si se utiliza la PWA instalada, cerrarla y abrirla nuevamente para que tome la caché nueva.

## Supabase
La conexión online es opcional. Los archivos SQL conservan el historial de creación y evolución del esquema:
- `SUPABASE_SCHEMA_ALPHA6.sql`: esquema inicial.
- `SUPABASE_MIGRATION_ALPHA_6_4.sql`: migración de eventos.
- `SUPABASE_MIGRATION_ALPHA_7_4.sql`: migración histórica de protección del ranking.

La numeración de esos archivos identifica migraciones históricas de base de datos; no representa la versión actual del videojuego. Consultar `CONFIGURACION_ACTUAL.md` para la puesta en marcha.

Nunca colocar claves secretas ni `service_role` en archivos del cliente.
