# AETHER NOVA — Cinematic Environments Alpha 2

## Cambios incluidos
- Nebulosas procedurales en capas con cuatro familias cromáticas: azul/violeta/magenta, cian/turquesa, púrpura/ámbar y azul petróleo/plata.
- Tres capas de estrellas con variaciones de color y profundidad, más polvo cósmico.
- Cuatro planetas procedurales: oceánico con nubes, desértico con cráteres, helado con anillos y gigante gaseoso.
- Atmósferas coloreadas, halos y rotación independiente de las nubes.
- Estación orbital ampliada con anillos, módulos, brazos, hangares, radiadores, paneles solares segmentados, antenas, balizas y motores.
- Iluminación y tone mapping ajustados; caché del Service Worker renovada.

## Compatibilidad y alcance
Se conserva `game.js` y el sistema de juego. Esta entrega mejora principalmente el entorno espacial del renderizador Three.js. Los modelos siguen siendo geometría procedural; no se presentan como modelos artísticos externos de producción. La integración requiere WebGL y conexión para cargar Three.js desde jsDelivr.

## Prueba recomendada
1. Descomprimir el ZIP en una carpeta nueva, sin sobrescribir la versión anterior.
2. Iniciar el servidor local en el puerto 8002.
3. Abrir el juego y entrar a una partida para observar el fondo, los planetas y la estación.
4. Si el navegador conserva recursos antiguos, cerrar la pestaña y volver a cargar; el nombre de caché fue actualizado.
5. Comprobar que el HUD, controles, enemigos y progresión sigan funcionando.

Esta versión fue validada mediante comprobación sintáctica de JavaScript y de integridad del ZIP; no se realizó una prueba visual en un navegador real en este entorno.


## Alpha 6 — proyectiles de plasma ovalados
Los disparos principales se representan como orbes ovalados con núcleo blanco, halo coloreado y cola de plasma alargada. Se conserva la simulación y las colisiones del motor original.


## Alpha 7 — estela de plasma ampliada
Se amplían los orbes ovalados y se reemplaza la cola estrecha por una estela de plasma en varias capas, más ancha en el origen y afinada hacia atrás. Se mantiene la simulación y colisiones del juego.


## Alpha 8 — estela continua
Se sustituyen las colas cónicas superpuestas por una estela tubular 3D continua, con perfil ovalado, degradado de transparencia y núcleo interno más fino. Esto busca evitar el aspecto de agujas o púas de la versión anterior.


## Alpha 9 — estela de plasma redondeada
Se reemplazan las mallas cónicas por volúmenes elipsoidales solapados con extremos redondeados. El disparo conserva el orbe ovalado y una cola luminosa suave, evitando el acabado de aguja o gota puntiaguda.
