# AETHER NOVA Alpha 6.5 — Hangar visible y mejoras comprobables

## Corrección de experiencia
En Alpha 6.4 las compras se guardaban en `commercialData.upgrades` y las mejoras se aplicaban al crear el siguiente objeto `Player` al iniciar una expedición. Sin embargo, el hangar no mostraba una ficha consolidada del rendimiento resultante, por lo que mejoras como velocidad y daño podían parecer invisibles.

## Cambios
- Panel de configuración activa para la nave seleccionada.
- Muestra velocidad, cadencia, daño del cañón, casco, super bombas, Aegis, misiles, drones y bonificación de salvamento.
- Lista los módulos comprados y su nivel.
- Avisa explícitamente que las mejoras se aplican en la próxima expedición.
- Tras una compra, informa qué módulo se instaló y el nivel alcanzado.
- Cambiar la nave seleccionada actualiza la ficha de configuración.
- Nueva versión de caché PWA para forzar la descarga de los archivos Alpha 6.5.

## Importante
Las mejoras compradas se guardan en los datos comerciales locales y se incorporan al jugador al iniciar la siguiente partida. No se altera el saldo ni los niveles ya comprados. El panel es una lectura de la configuración; no concede estadísticas adicionales por sí mismo.

## Prueba sugerida
1. Abrir Hangar y revisar los niveles actuales.
2. Comprar un único módulo de bajo costo.
3. Confirmar que bajan los créditos y sube el nivel del módulo.
4. Verificar que cambia el valor correspondiente en Configuración activa.
5. Cerrar Hangar e iniciar una partida nueva.
6. Comprobar el efecto en combate: más velocidad, daño, vida, bomba, misiles o disparos de drones según el módulo.


## Alpha 6 — proyectiles de plasma ovalados
Los disparos principales se representan como orbes ovalados con núcleo blanco, halo coloreado y cola de plasma alargada. Se conserva la simulación y las colisiones del motor original.


## Alpha 7 — estela de plasma ampliada
Se amplían los orbes ovalados y se reemplaza la cola estrecha por una estela de plasma en varias capas, más ancha en el origen y afinada hacia atrás. Se mantiene la simulación y colisiones del juego.


## Alpha 8 — estela continua
Se sustituyen las colas cónicas superpuestas por una estela tubular 3D continua, con perfil ovalado, degradado de transparencia y núcleo interno más fino. Esto busca evitar el aspecto de agujas o púas de la versión anterior.


## Alpha 9 — estela de plasma redondeada
Se reemplazan las mallas cónicas por volúmenes elipsoidales solapados con extremos redondeados. El disparo conserva el orbe ovalado y una cola luminosa suave, evitando el acabado de aguja o gota puntiaguda.
