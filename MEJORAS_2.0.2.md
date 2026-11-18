# AETHER NOVA: ECLIPSE — actualización comercial 2.0.2

## Mejoras de rendimiento para móviles
- Resolución interna adaptativa: DPR máximo 1.25 en pantallas pequeñas/táctiles y 1.65 en escritorio.
- Fondo de nebulosa precalculado por sector y reutilizado como imagen, evitando reconstruir varios degradados radiales en cada fotograma.
- Menos estrellas y partículas en móviles; explosiones ajustadas a la capacidad del dispositivo.
- Se desactivan desenfoques de sombra costosos en móviles y se solicita un contexto Canvas optimizado (`alpha:false`, `desynchronized:true`).

## Más identidad y espectáculo
- Cada sector recibe una variación cromática ambiental y una pantalla breve de llegada con número, región y alerta de guardián.
- Agujero negro: disco de acreción giratorio, anillos térmicos y núcleo de horizonte oscuro.
- Magnetar: líneas de campo magnético, pulsos expansivos y núcleo energético.
- Púlsar: doble haz gamma animado, halo y estrella de neutrones luminosa.

## Actualización
Reemplazar los archivos de la versión 2.0.1 por los de este paquete. El Service Worker cambia a `aether-nova-commercial-v22`; al publicar, abrir el juego y recargar completamente para actualizar la caché.

No se modifican las claves de guardado local ni los datos de progreso.


## Alpha 6 — proyectiles de plasma ovalados
Los disparos principales se representan como orbes ovalados con núcleo blanco, halo coloreado y cola de plasma alargada. Se conserva la simulación y las colisiones del motor original.


## Alpha 7 — estela de plasma ampliada
Se amplían los orbes ovalados y se reemplaza la cola estrecha por una estela de plasma en varias capas, más ancha en el origen y afinada hacia atrás. Se mantiene la simulación y colisiones del juego.


## Alpha 8 — estela continua
Se sustituyen las colas cónicas superpuestas por una estela tubular 3D continua, con perfil ovalado, degradado de transparencia y núcleo interno más fino. Esto busca evitar el aspecto de agujas o púas de la versión anterior.


## Alpha 9 — estela de plasma redondeada
Se reemplazan las mallas cónicas por volúmenes elipsoidales solapados con extremos redondeados. El disparo conserva el orbe ovalado y una cola luminosa suave, evitando el acabado de aguja o gota puntiaguda.
