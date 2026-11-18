# AETHER NOVA: ECLIPSE — Comercial 3.0 Alpha 6

## Etapa 6: Universo online híbrido

La experiencia offline se mantiene como modo principal y no requiere crear una cuenta online.

### Funciones incorporadas en el cliente
- Registro e inicio de sesión opcional por correo y contraseña mediante Supabase Auth.
- Estado de conexión diferenciado entre modo local y online.
- Copia manual del progreso local a la nube y recuperación confirmada de la copia.
- Envío de puntuaciones a una clasificación galáctica.
- Torneo semanal: la tabla online muestra los mejores registros individuales enviados desde el inicio de la semana UTC (no suma varias partidas).
- Panel de transmisiones/eventos galácticos publicados por administración.
- Insignias cosméticas de comandante desbloqueables por hitos de campaña/supervivencia y selección de emblema; el identificador también se registra en el perfil online.
- Si el servidor no está configurado o no hay conexión, campaña, supervivencia, desafío diario y guardados locales siguen disponibles.

### Configuración requerida para habilitar online
1. Crear un proyecto Supabase.
2. Ejecutar `SUPABASE_SCHEMA_ALPHA6.sql` en SQL Editor.
3. Copiar Project URL y anon/public key a `cloud-config.js`.
4. Cambiar `enabled` a `true`.
5. Configurar en Supabase Auth los proveedores y la confirmación de correo según la política de publicación.
6. Publicar el sitio mediante HTTPS (por ejemplo GitHub Pages).

No se incluye ni se debe incluir una clave `service_role`, contraseña administrativa o secreto privado en el cliente.

### Seguridad y límites
- Row Level Security limita perfiles y guardados a su propietario.
- La tabla pública de clasificación solo permite lectura y envío autenticado del propio user_id.
- Los eventos solo son visibles cuando `published = true`; su administración debe hacerse desde el panel seguro de Supabase.
- Las puntuaciones se validan por formato y rango, pero el cliente puede manipular resultados. La clasificación es social/no competitiva; torneos con premios requieren validación server-side y controles anti-trampas.
- La copia de nube incluye datos de progresión y partida guardada. La recuperación reemplaza los créditos/mejoras locales y requiere confirmación explícita.

### Verificación de esta entrega
- Sintaxis JavaScript y JSON.
- Estructura del esquema SQL y políticas RLS revisadas estáticamente.
- Integridad del paquete.
- No se pudo probar una instancia Supabase real porque no se proporcionaron URL ni anon key; por eso la capa online se entrega desactivada hasta configurarla.
- No se afirma prueba física Android ni validación anti-trampas.
