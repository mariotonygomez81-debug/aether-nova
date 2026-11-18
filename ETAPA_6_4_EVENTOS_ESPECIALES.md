# AETHER NOVA: ECLIPSE — Alpha 6.4
## Etapa 6.4: operaciones galácticas, objetivos y recompensas

### Cambios
- Los eventos ahora incluyen objetivo, meta, créditos y puntos de recompensa.
- Objetivos soportados: destruir naves enemigas, alcanzar un sector y derrotar jefes.
- Los eventos activos pueden desplegar una variante de enemigo configurada y aumentar su resistencia/velocidad mediante `difficulty_multiplier`.
- Se muestra progreso de misión durante la partida y en el panel de transmisiones.
- Las recompensas se acreditan al completar el objetivo con sesión online.
- Los reclamos quedan registrados en `galactic_event_claims`; una restricción única evita reclamar dos veces el mismo evento por cuenta.
- Se incorpora historial de los últimos cinco eventos reclamados.
- La gestión de eventos se realiza desde Supabase Dashboard (Table Editor / SQL Editor). No se incorpora una consola administrativa en el cliente público.
- Se incrementa la caché PWA a Alpha 6.4.

### Instalación obligatoria de base de datos
Antes de publicar el código, ejecutar una sola vez:
`SUPABASE_MIGRATION_ALPHA_6_4.sql`
desde Supabase → SQL Editor.
La migración agrega columnas y tabla de reclamos. No borra las tablas ni los datos existentes.

### Crear y activar eventos
Desde Supabase → Table Editor → `galactic_events`, crear/editar:
- `title`, `description`, `starts_at`, `ends_at`, `published`
- `objective_type`: `destroy_enemies`, `reach_sector` o `defeat_boss`
- `objective_target`: número requerido
- `reward_credits`, `reward_score`
- `enemy_variant`: `scout`, `interceptor`, `bomber`, `weaver`, `lancer` o `carrier`
- `difficulty_multiplier`: 1.00 a 3.00

Publicar estableciendo `published = true`. El archivo `ADMIN_EVENTOS_ALPHA_6_4.md` incluye consultas de ejemplo.

### Publicación
1. Ejecutar la migración SQL.
2. Publicar el contenido completo de `aether-nova-main` en GitHub Pages.
3. Abrir la app, iniciar sesión y recargar para renovar la caché.
4. Activar el evento de prueba desde Supabase.
5. Completar el objetivo y verificar créditos, puntos e historial.

### Límites de seguridad
El cliente calcula el progreso y la recompensa. La tabla evita reclamos duplicados, pero no evita que un cliente manipulado declare un objetivo falso. No usar esta versión para premios con valor real ni publicar claves secretas. Para validación anti-trampas y recompensas competitivas, trasladar el cálculo y la acreditación a Supabase Edge Functions o un backend confiable.
