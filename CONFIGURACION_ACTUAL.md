# Configuración de servicios online — AETHER NOVA: ECLIPSE

Esta guía describe la configuración de Supabase. La campaña local puede jugarse sin conectar una cuenta online.

## 1. Publicación
1. Mantener los archivos de la aplicación en la raíz del repositorio de GitHub Pages.
2. Confirmar que estén presentes `index.html`, `game.js`, `aether3d.js`, `style.css`, `cloud-config.js` y `sw.js`.
3. Abrir el sitio mediante HTTPS y recargarlo. Si una PWA instalada conserva recursos anteriores, cerrarla y volver a abrirla con conexión.

## 2. Esquema y migraciones de Supabase
Los archivos SQL se aplican en orden según las funciones que se utilicen:
1. `SUPABASE_SCHEMA_ALPHA6.sql` para instalar el esquema base, si todavía no existe.
2. `SUPABASE_MIGRATION_ALPHA_6_4.sql` para las tablas y funciones de eventos, si se utilizará ese módulo.
3. `SUPABASE_MIGRATION_ALPHA_7_4.sql` para la protección y limitación de frecuencia del ranking.

Los sufijos Alpha de los archivos SQL son identificadores históricos de migraciones. No indican la edición actual del videojuego. No volver a ejecutar migraciones ya aplicadas salvo que se haya verificado que son idempotentes.

## 3. Desplegar la función del ranking
La función `submit-score` requiere Supabase CLI y acceso al proyecto:

```bash
npm install -g supabase
supabase login
supabase link --project-ref gmwlcfprhsarxlbgwsvf
supabase functions deploy submit-score
```

La función utiliza variables de entorno de Edge Functions. La clave `service_role` es secreta y nunca debe incorporarse a GitHub Pages, `cloud-config.js`, JavaScript del cliente ni conversaciones.

La función autentica al usuario, valida campos y limita la frecuencia de envíos. Esto no constituye un sistema antitrampas completo del gameplay.

## 4. Configuración del cliente
El archivo `cloud-config.js` contiene la URL del proyecto y una clave pública publishable. Solo deben utilizarse claves públicas en el navegador. No sustituirlas por claves secretas.

## 5. Autenticación
En Supabase Dashboard:
1. Authentication → Providers → Email: habilitar el acceso por correo.
2. Definir si se requiere confirmación de correo.
3. Authentication → URL Configuration: agregar la URL HTTPS exacta del sitio publicado a Redirect URLs.

## 6. Copia de progreso
1. Iniciar sesión con la cuenta online.
2. En el panel de cuenta, utilizar primero la opción manual para subir o recuperar la copia.
3. La sincronización automática de la copia se activa después de esa primera acción durante la sesión.
4. En otro dispositivo, recuperar la copia antes de continuar la partida.

La recuperación reemplaza la copia local compatible tras pedir confirmación; no fusiona automáticamente dos partidas.

## 7. Alcance cooperativo
El juego permite crear y unirse a salas de escuadrón. La sala gestiona miembros y estado de preparación, pero el combate cooperativo sincronizado aún no está implementado.

## 8. Seguridad
Nunca compartir contraseñas, PIN, claves `service_role` ni secretos de proveedores. Las claves `sb_publishable_...` o anon son las únicas aptas para el cliente.
