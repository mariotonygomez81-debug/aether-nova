# AETHER NOVA: ECLIPSE — Comercial 3.0 Alpha 6.2

PWA arcade espacial híbrida con campaña de 100 sectores, supervivencia infinita, desafíos diarios, progresión local, perfiles online opcionales, copia de nube y clasificación semanal.

## Ejecutar
Servir esta carpeta desde un servidor HTTP o publicarla en GitHub Pages. Abrir una vez con conexión para instalar la caché offline.

## Archivos principales
- `index.html`: interfaz y selector de modos.
- `style.css`: diseño adaptable.
- `game.js`: motor, campaña, supervivencia, desafíos y progresión.
- `manifest.json`: configuración PWA.
- `sw.js`: caché offline Alpha 6.
- `cloud-config.js`: configuración pública opcional de Supabase (desactivada por defecto).
- `SUPABASE_SCHEMA_ALPHA6.sql`: tablas, índices y políticas RLS del backend.
- `ETAPA_6_ONLINE_HIBRIDA.md`: instrucciones y límites de la etapa.
- `ETAPA_5_MODOS_Y_DESAFIOS.md`: registro de cambios.

Los datos siguen siendo locales en el dispositivo; esta entrega no incorpora servidores ni clasificación online.


## Activar funciones online
Consulta `ETAPA_6_ONLINE_HIBRIDA.md`. La experiencia local funciona sin backend. No coloques claves privadas ni `service_role` en el cliente.


## Alpha 6.1 — Seguridad online
Sesiones temporales, renovación y revocación de sesión, timeout de red, validación previa de restauración y límite de tamaño para copias. Ver `ETAPA_6_1_SEGURIDAD_SINCRONIZACION.md`. La conexión Supabase sigue desactivada hasta configurar credenciales públicas del proyecto.
\n\n## Alpha 6.2 — Ranking visible\nLa pantalla de resultado informa el envío online de puntuaciones y permite reintentar si falla. El ranking semanal conserva su actualización manual. Consulta `ETAPA_6_2_RANKING_VISIBLE.md` para publicar y probar.\n