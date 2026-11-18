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


## Alpha 6 — proyectiles de plasma ovalados
Los disparos principales se representan como orbes ovalados con núcleo blanco, halo coloreado y cola de plasma alargada. Se conserva la simulación y las colisiones del motor original.


## Alpha 7 — estela de plasma ampliada
Se amplían los orbes ovalados y se reemplaza la cola estrecha por una estela de plasma en varias capas, más ancha en el origen y afinada hacia atrás. Se mantiene la simulación y colisiones del juego.


## Alpha 8 — estela continua
Se sustituyen las colas cónicas superpuestas por una estela tubular 3D continua, con perfil ovalado, degradado de transparencia y núcleo interno más fino. Esto busca evitar el aspecto de agujas o púas de la versión anterior.


## Alpha 9 — estela de plasma redondeada
Se reemplazan las mallas cónicas por volúmenes elipsoidales solapados con extremos redondeados. El disparo conserva el orbe ovalado y una cola luminosa suave, evitando el acabado de aguja o gota puntiaguda.
