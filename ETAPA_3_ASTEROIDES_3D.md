# AETHER NOVA — Etapa 3: asteroides 3D

- Los asteroides visibles se representan con mallas tridimensionales en Three.js.
- Cada malla se sincroniza mediante un identificador estable con la instancia Asteroid de game.js.
- Movimiento, colisiones, daño, destrucción, fragmentación, combos, puntos y recompensas siguen bajo control del motor original.
- Cuando el renderizador 3D no está activo, el dibujo 2D original continúa disponible.
- No se modifican tablas, credenciales ni funciones de Supabase.

La validación final requiere ejecutar el paquete en navegador y comprobar sectores, impactos, destrucción y rendimiento.


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
