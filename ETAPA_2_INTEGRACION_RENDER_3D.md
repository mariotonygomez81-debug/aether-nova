# AETHER NOVA Alpha 7.4 — puente de renderizado 3D (Etapa 2)

Esta versión añade un renderizador Three.js transparente encima del Canvas 2D original. La nave del jugador se representa en 3D y sigue la posición/ inclinación del objeto Player real. El motor original conserva movimiento, disparos, colisiones, enemigos, asteroides, progresión, HUD, audio y persistencia.

## Ejecución local
Servir la carpeta raíz con un servidor HTTP (no abrir index.html mediante doble clic). Desde la carpeta `aether_nova_alpha_7_4`:

`python -m http.server 8000`

Abrir `http://localhost:8000`. Requiere Internet para cargar Three.js 0.170.0 desde jsDelivr.

## Alcance y limitaciones
- Esta etapa integra únicamente la representación 3D de la nave del jugador con su estado real.
- El resto del escenario y las entidades siguen siendo dibujados por Canvas 2D.
- Si WebGL/Three.js no carga, el juego conserva el renderizado 2D de la nave (fallback).
- No se modifican migraciones, configuración ni datos de Supabase.
- No se ha verificado todavía en el equipo del usuario ni en todos los navegadores/dispositivos.


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
