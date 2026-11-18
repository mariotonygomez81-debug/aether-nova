# AETHER NOVA: ECLIPSE — Edición Comercial 7.4

PWA arcade espacial con campaña de 100 sectores, supervivencia, desafío diario, jefes de cinco familias, hangar tecnológico, cinco naves desbloqueables, misiones diarias/semanales, ranking online y copia de progreso en Supabase.

## Publicación
1. Extraer el contenido de esta carpeta.
2. Publicar todos sus archivos y carpetas en la raíz del repositorio de GitHub Pages, reemplazando la versión anterior.
3. Esperar el despliegue y abrir el sitio con HTTPS.
4. Recargar la PWA. El Service Worker utiliza una caché nueva `aether-nova-eclipse-commercial-7-4`.

## Funciones nuevas de 7.4
- Se eliminó el acceso social Google/Facebook. Se conserva el perfil local y el acceso online existente por correo/contraseña.
- Centro de Operaciones con misiones diarias y semanales, progreso y recompensas.
- Cinco cazas desbloqueables por progreso de campaña: Wraith (sector 10), Bastión (20), Fénix (35), Singularidad (50) y Omega (75).
- Selección de nave persistente y aplicación de sus estadísticas diferenciadas.
- Escalado de resistencia de enemigos y jefes ajustado por avance de sectores.
- Sincronización automática del progreso online después de que el jugador realiza por primera vez una copia manual o restaura una copia en esa sesión.
- Envío del ranking mediante Edge Function con autenticación, validación de formato y límite básico de frecuencia.

## Configuración Supabase
Consultar `CONFIGURACION_ALPHA_7_4.md`.
- Si Alpha 6 ya está configurada, ejecutar solamente `SUPABASE_MIGRATION_ALPHA_7_4.sql`.
- Desplegar `supabase/functions/submit-score`.
- El esquema base sigue siendo `SUPABASE_SCHEMA_ALPHA6.sql`; la migración Alpha 6.4 sigue siendo necesaria para eventos especiales si ya se utiliza ese módulo.
- No colocar `service_role` ni secretos en `cloud-config.js` ni en el navegador.

## Límites importantes
- Las misiones locales se respaldan junto con `commercialData` al subir/recuperar una copia.
- La Edge Function autentica al usuario, valida rangos y limita la frecuencia de envíos. Esto no demuestra que una partida sea legítima ni constituye un sistema antitrampas completo: un cliente modificado aún podría enviar puntuaciones plausibles. No usar para premios con valor económico.
- La copia de progreso continúa siendo una copia iniciada por el jugador; la sincronización automática se activa después de una primera subida/restauración manual en la sesión.
- La funcionalidad local funciona sin Supabase. El ranking y las copias online requieren configurar el proyecto.
- La integración real con Supabase, publicación de Edge Function y pruebas en dispositivos deben verificarse en el proyecto del usuario.

## Archivos clave
- `index.html`, `style.css`, `game.js`: aplicación.
- `cloud-config.js`: URL y publishable key pública.
- `sw.js`: caché PWA.
- `SUPABASE_SCHEMA_ALPHA6.sql`: esquema base.
- `SUPABASE_MIGRATION_ALPHA_6_4.sql`: eventos especiales.
- `SUPABASE_MIGRATION_ALPHA_7_4.sql`: protección y rate limit del ranking.
- `supabase/functions/submit-score/index.ts`: Edge Function de envío de puntuaciones.
- `CONFIGURACION_ALPHA_7_4.md`: configuración posterior a la publicación.


## Alpha 4 — modo espacial ligero
Se retiran los planetas y la estación orbital del escenario. Se reduce la densidad de nebulosas/estrellas y se limita el renderizador 3D a 24 FPS con pixel ratio máximo 0.8 para priorizar la respuesta de los controles.


## Alpha 6 — proyectiles de plasma ovalados
Los disparos principales se representan como orbes ovalados con núcleo blanco, halo coloreado y cola de plasma alargada. Se conserva la simulación y las colisiones del motor original.


## Alpha 7 — estela de plasma ampliada
Se amplían los orbes ovalados y se reemplaza la cola estrecha por una estela de plasma en varias capas, más ancha en el origen y afinada hacia atrás. Se mantiene la simulación y colisiones del juego.


## Alpha 8 — estela continua
Se sustituyen las colas cónicas superpuestas por una estela tubular 3D continua, con perfil ovalado, degradado de transparencia y núcleo interno más fino. Esto busca evitar el aspecto de agujas o púas de la versión anterior.


## Alpha 9 — estela de plasma redondeada
Se reemplazan las mallas cónicas por volúmenes elipsoidales solapados con extremos redondeados. El disparo conserva el orbe ovalado y una cola luminosa suave, evitando el acabado de aguja o gota puntiaguda.
