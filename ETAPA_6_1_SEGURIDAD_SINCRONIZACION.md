# AETHER NOVA: ECLIPSE — Alpha 6.1
## Etapa 6: seguridad, sesiones y sincronización

Esta entrega continúa la capa online opcional de Alpha 6. La campaña, los récords locales y el guardado offline siguen funcionando sin cuenta ni conexión.

### Mejoras
- Sesión web almacenada en `sessionStorage` en lugar de persistir indefinidamente en `localStorage`; se migra la sesión anterior si existe.
- Renovación de sesión al volver a abrir la aplicación en la misma sesión del navegador.
- Revocación remota al cerrar sesión, con cierre local inmediato como respaldo.
- Tiempo máximo de espera de 12 segundos para solicitudes al backend.
- Manejo explícito de sesión expirada y reautenticación sin bloquear el modo local.
- Validación del formato y del sector de la copia antes de reemplazar datos locales.
- Límite SQL de 512 KiB para cada copia de progreso.
- Caché PWA versionada como Alpha 6.1.

### Configuración
La conexión sigue desactivada por defecto. Para habilitarla, crear el proyecto Supabase, ejecutar `SUPABASE_SCHEMA_ALPHA6.sql`, completar `cloud-config.js` con Project URL y clave pública `anon`, y cambiar `enabled` a `true`. Nunca incluir `service_role`, claves privadas ni contraseñas administrativas en el cliente.

### Seguridad y límites conocidos
- `sessionStorage` reduce la persistencia del token, pero no protege contra XSS en una página comprometida. Mantener dependencias y scripts controlados, HTTPS y una política CSP adecuada al publicar.
- Las políticas RLS aíslan perfiles y copias por usuario.
- La clasificación todavía recibe puntuaciones declaradas por el cliente; puede manipularse. No usarla para premios ni competencia con valor económico hasta implementar validación server-side/Edge Function y controles anti-trampas.
- No se pudo probar contra un proyecto Supabase real porque no se proporcionaron credenciales de proyecto. Tampoco se afirma prueba en Android físico.

### Verificación de esta entrega
Se verifican sintaxis JavaScript, JSON, integridad del ZIP, referencias locales del service worker y consistencia estática del esquema SQL. La conectividad real queda pendiente de configuración del usuario.
