# AETHER NOVA: ECLIPSE — Alpha 6.3
## Etapa 6.3: transmisiones galácticas dinámicas

### Cambios de esta entrega
- Los eventos publicados se distinguen como EN CURSO o PRÓXIMO según su ventana de fechas.
- Se muestra una cuenta regresiva hasta el comienzo o el final del evento.
- Se amplía la consulta a un máximo de ocho eventos publicados no finalizados.
- Se agrega un botón para actualizar manualmente las transmisiones.
- Se mantienen las columnas existentes `title`, `description`, `starts_at`, `ends_at` y `published`; no requiere migración SQL.
- Se incrementa la caché PWA a Alpha 6.3.

### Publicación y prueba
1. Publicar el contenido completo de esta carpeta en GitHub Pages, reemplazando la versión anterior.
2. Abrir la aplicación con conexión y recargarla para renovar la caché.
3. Iniciar sesión y abrir el panel de Transmisiones Galácticas.
4. Verificar que un evento futuro muestre PRÓXIMO y la cuenta regresiva de inicio.
5. Verificar que un evento cuya hora de inicio ya pasó y cuya hora de finalización no pasó muestre EN CURSO y la cuenta regresiva de finalización.
6. Pulsar Actualizar para volver a consultar Supabase.

### Alcance
Esta entrega presenta estado y tiempo restante a partir de las fechas existentes. Todavía no incorpora objetivos jugables, recompensas automáticas ni niveles de dificultad específicos por evento; esos requieren definir reglas de juego y ampliar el esquema de datos en una migración posterior.
