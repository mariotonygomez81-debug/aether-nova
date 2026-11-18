# AETHER NOVA: ECLIPSE — Alpha 6.6: Guerra Galáctica

## Cambios de esta entrega
- Cinco comandantes con identidad y patrones diferenciados: Leviatán, Destructor, Anomalía, Reina del Vacío y Eclipse Supremo.
- Tres fases de combate progresivas para cada jefe.
- Leviatán: anillos de plasma y abanicos de cobertura.
- Destructor: lanzas rápidas dirigidas al piloto.
- Anomalía: campo gravitatorio que desplaza suavemente al jugador y espirales.
- Reina del Vacío: invoca refuerzos y cubre carriles con abanicos.
- Eclipse Supremo: doble espiral, ráfagas de precisión y escuadra de élite en fase final.
- Siluetas de los jefes diferenciadas.
- Recompensas locales al derrotar jefes: 500, 650, 800, 1.000 o 1.500 créditos según el comandante, además de la puntuación del sector y una super bomba.
- Se conserva el progreso comercial existente; se agregan contadores e insignias de jefes derrotados.

## Instalación
1. Publicar el contenido completo de esta carpeta en GitHub Pages, reemplazando la versión anterior.
2. Esperar el despliegue.
3. Recargar el juego. El Service Worker usa una nueva caché Alpha 6.6.
4. Iniciar una expedición. Los jefes aparecen al final de cada sector, como en la versión anterior.

## Pruebas recomendadas
- Llegar al jefe del sector 1 y comprobar su barra de vida y sus tres fases.
- Probar sectores posteriores para encontrar los otros comandantes en rotación.
- Verificar que cada patrón sea distinguible y que el jugador pueda esquivar sus ataques.
- Derrotar un jefe y comprobar el mensaje de recompensa, el saldo de créditos del hangar y la persistencia tras recargar.

## Alcance y límites
- Esta versión conserva el modelo de guardado comercial local que utiliza el código base entregado. Los créditos de jefes se guardan localmente en el dispositivo; no se sincronizan automáticamente con una economía de servidor.
- Los eventos online existentes mantienen su mecanismo anterior. No se añadieron tablas ni migraciones SQL.
- La validación de sintaxis no sustituye una prueba en navegador y dispositivo real.


## Alpha 6 — proyectiles de plasma ovalados
Los disparos principales se representan como orbes ovalados con núcleo blanco, halo coloreado y cola de plasma alargada. Se conserva la simulación y las colisiones del motor original.


## Alpha 7 — estela de plasma ampliada
Se amplían los orbes ovalados y se reemplaza la cola estrecha por una estela de plasma en varias capas, más ancha en el origen y afinada hacia atrás. Se mantiene la simulación y colisiones del juego.


## Alpha 8 — estela continua
Se sustituyen las colas cónicas superpuestas por una estela tubular 3D continua, con perfil ovalado, degradado de transparencia y núcleo interno más fino. Esto busca evitar el aspecto de agujas o púas de la versión anterior.


## Alpha 9 — estela de plasma redondeada
Se reemplazan las mallas cónicas por volúmenes elipsoidales solapados con extremos redondeados. El disparo conserva el orbe ovalado y una cola luminosa suave, evitando el acabado de aguja o gota puntiaguda.
