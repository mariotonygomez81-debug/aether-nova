# AETHER NOVA: ECLIPSE — Comercial 3.0 Alpha 4

## Etapa 4: Campaña cinematográfica y narrativa

### Base de trabajo
Se parte del paquete Comercial 3.0 Alpha 3. Se mantienen el motor de juego, las diez regiones ya definidas en `ERAS`, el progreso de 100 sectores, los jefes, las mejoras del hangar y el almacenamiento local.

### Cambios incorporados
- Se rediseñó la crónica de región como una tarjeta cinematográfica con planeta, órbitas, nebulosa animada y acento cromático tomado de la región activa.
- Se muestra el número de región y una directiva de misión contextual.
- Se agregaron transiciones de entrada para la crónica, con respeto a `prefers-reduced-motion`.
- Se agregó una alerta cinematográfica para la aparición de jefes, con nombre y una breve indicación táctica específica para cada uno de los cinco arquetipos.
- Las alertas de jefe son superpuestas y no bloquean los controles ni la simulación del combate.
- Se actualizó la versión de caché del Service Worker a `aether-nova-eclipse-3-0-alpha4`.

### Compatibilidad
No se modificaron las claves de guardado, los identificadores de mejoras ni el esquema de progreso. Se conservaron los diez biomas narrativos que ya estaban presentes en Alpha 3; esta etapa mejora su presentación y no reemplaza su contenido.

### Verificación
- Sintaxis JavaScript con `node --check`.
- Validación JSON del manifiesto.
- Comprobación de referencias HTML para los nuevos elementos.
- Integridad del ZIP.
- No se afirma prueba en navegador ni en hardware Android físico.


## Alpha 6 — proyectiles de plasma ovalados
Los disparos principales se representan como orbes ovalados con núcleo blanco, halo coloreado y cola de plasma alargada. Se conserva la simulación y las colisiones del motor original.


## Alpha 7 — estela de plasma ampliada
Se amplían los orbes ovalados y se reemplaza la cola estrecha por una estela de plasma en varias capas, más ancha en el origen y afinada hacia atrás. Se mantiene la simulación y colisiones del juego.


## Alpha 8 — estela continua
Se sustituyen las colas cónicas superpuestas por una estela tubular 3D continua, con perfil ovalado, degradado de transparencia y núcleo interno más fino. Esto busca evitar el aspecto de agujas o púas de la versión anterior.


## Alpha 9 — estela de plasma redondeada
Se reemplazan las mallas cónicas por volúmenes elipsoidales solapados con extremos redondeados. El disparo conserva el orbe ovalado y una cola luminosa suave, evitando el acabado de aguja o gota puntiaguda.
