# Configuración posterior — AETHER NOVA 7.4

Esta guía separa lo que funciona localmente de los servicios que requieren Supabase.

## A. Publicar el juego
1. Extraer el ZIP.
2. Subir el contenido de la carpeta `aether_nova_alpha_7_4` a la raíz del repositorio de GitHub Pages.
3. Confirmar que `index.html`, `game.js`, `style.css`, `cloud-config.js` y `sw.js` queden en la raíz publicada.
4. Abrir la URL HTTPS y recargar. Si una PWA instalada conserva la versión anterior, cerrar la aplicación instalada y volver a abrirla con conexión.

## B. Supabase: migración
Si el proyecto ya tiene instalados `SUPABASE_SCHEMA_ALPHA6.sql` y la migración de Alpha 6.4:
1. Abrir Supabase Dashboard → SQL Editor.
2. Crear una consulta nueva.
3. Copiar todo el contenido de `SUPABASE_MIGRATION_ALPHA_7_4.sql`.
4. Ejecutar una sola vez.
5. Verificar que no haya errores.

No vuelvas a crear las tablas base si ya existen. La migración 7.4 es aditiva.

Si todavía no instalaste el backend base, ejecutar primero `SUPABASE_SCHEMA_ALPHA6.sql` y luego, si se utilizarán eventos con objetivos/recompensas, `SUPABASE_MIGRATION_ALPHA_6_4.sql`. Después ejecutar la migración 7.4.

## C. Desplegar la Edge Function del ranking
La nueva versión envía las puntuaciones a `submit-score`. Para publicarla se necesita Supabase CLI y acceso al proyecto.

En una terminal:
```bash
npm install -g supabase
supabase login
supabase link --project-ref gmwlcfprhsarxlbgwsvf
supabase functions deploy submit-score
```

La función utiliza variables del entorno de Edge Functions:
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

Supabase suele proporcionar estas variables en el entorno de sus funciones. Si el panel del proyecto indica que alguna falta, configurarla en Edge Functions → Secrets. La `service_role` es secreta: nunca copiarla a `cloud-config.js`, GitHub Pages, archivos JavaScript del cliente ni conversaciones.

La función verifica el token del jugador con Supabase Auth, valida nombre/rango de puntuación/sector/modo y aplica un límite de frecuencia por usuario. No es una verificación antitrampas completa del gameplay.

## D. Revisar la configuración pública del cliente
Abrir `cloud-config.js`. El paquete conserva la URL y publishable key pública del proyecto AETHER NOVA que ya estaban en la versión base:
- Project URL: `https://gmwlcfprhsarxlbgwsvf.supabase.co`
- Publishable key: `sb_publishable_...`

No reemplazar esa clave por `service_role`. Si el proyecto real es otro, reemplazar únicamente la URL y la publishable/anon key pública.

## E. Activar y verificar Auth tradicional
En Supabase Dashboard:
1. Authentication → Providers → Email.
2. Habilitar Email.
3. Definir si se requiere confirmación de correo.
4. Authentication → URL Configuration: agregar la URL exacta de GitHub Pages a Redirect URLs.
5. Mantener Google y Facebook deshabilitados; esta edición no usa acceso social.

## F. Sincronización de progreso
1. Crear o iniciar sesión con el perfil online por correo/contraseña.
2. En el panel de cuenta, pulsar primero `Subir progreso` o `Recuperar nube`.
3. A partir de esa acción, la sincronización automática se activa durante esa sesión del navegador cada vez que se guarda progreso comercial o partida.
4. Si se inicia sesión en otro dispositivo, recuperar primero la copia de nube antes de empezar a progresar en ese dispositivo.

La recuperación reemplaza la copia local compatible; el juego pide confirmación. No se fusionan dos partidas distintas automáticamente.

## G. Comprobación final recomendada
- Juego local: iniciar campaña, mover la nave, derrotar enemigos y guardar.
- Misiones: verificar que aumenten los contadores al destruir enemigos, derrotar jefes y completar sectores; reclamar una recompensa completada.
- Flota: comprobar que Wraith, Bastión, Fénix, Singularidad y Omega estén bloqueadas hasta alcanzar sus sectores.
- Hangar: comprar una mejora y comprobar sus estadísticas.
- Nube: subir progreso, recargar y comprobar que la cuenta siga conectada; después realizar una nueva acción y verificar que se actualice la copia.
- Ranking: iniciar sesión y enviar un resultado; verificar que la Edge Function esté desplegada y que el registro aparezca en `leaderboard`.
- PWA: instalar o actualizar en un dispositivo real y comprobar los controles táctiles.

## Seguridad
Nunca compartas contraseñas, PIN, `service_role` o secretos de proveedores. Las claves públicas `sb_publishable_...`/anon son las únicas que pueden estar en el cliente.


## Alpha 6 — proyectiles de plasma ovalados
Los disparos principales se representan como orbes ovalados con núcleo blanco, halo coloreado y cola de plasma alargada. Se conserva la simulación y las colisiones del motor original.


## Alpha 7 — estela de plasma ampliada
Se amplían los orbes ovalados y se reemplaza la cola estrecha por una estela de plasma en varias capas, más ancha en el origen y afinada hacia atrás. Se mantiene la simulación y colisiones del juego.


## Alpha 8 — estela continua
Se sustituyen las colas cónicas superpuestas por una estela tubular 3D continua, con perfil ovalado, degradado de transparencia y núcleo interno más fino. Esto busca evitar el aspecto de agujas o púas de la versión anterior.


## Alpha 9 — estela de plasma redondeada
Se reemplazan las mallas cónicas por volúmenes elipsoidales solapados con extremos redondeados. El disparo conserva el orbe ovalado y una cola luminosa suave, evitando el acabado de aguja o gota puntiaguda.
