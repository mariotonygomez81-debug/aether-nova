# AETHER NOVA: ECLIPSE — Comercial 3.0 Alpha 2

## Etapa 2: Caos cósmico y destrucción ambiental

### Fenómenos cósmicos
- **Tormenta iónica:** anuncia una columna de descarga, da tiempo para esquivarla y luego impacta a jugador, enemigos y asteroides dentro del corredor.
- **Campo de escombros:** genera una lluvia temporal de rocas con velocidades y trayectorias variables; algunas son explosivas.
- **Agujero negro:** conserva la atracción de asteroides y enemigos, además de absorber proyectiles cercanos y amenazar la posición de la nave.
- **Magnetar:** mantiene pulsos gravitomagnéticos expansivos que repelen objetos y proyectiles.
- **Púlsar:** su haz giratorio daña enemigos y asteroides, además de representar un peligro para la nave.
- **Supernova:** conserva su detonación de área y su impacto sobre el campo de batalla.

### Destrucción en cadena
- Los asteroides explosivos generan una onda de daño de área.
- Pueden detonar otros asteroides explosivos cercanos, con profundidad máxima de cuatro detonaciones encadenadas.
- La onda también daña enemigos y puede afectar a un jefe si está dentro del radio.
- Se limita la cantidad de partículas según el perfil de dispositivo.

### Dificultad y rendimiento
- Las tormentas iónicas aparecen desde el sector 5 y los campos de escombros desde el sector 8.
- Desde el sector 30 existe una probabilidad de superposición de dos fenómenos.
- Se limita la superposición a dos eventos simultáneos; la probabilidad es menor en dispositivos táctiles/de baja potencia.
- Se actualizó el nombre de caché del Service Worker a `aether-nova-eclipse-3-0-alpha2`.

## Verificación
- `node --check game.js`: correcto.
- `manifest.json`: JSON válido.
- Prueba de carga en navegador automatizado: no completada; el entorno de ejecución bloqueó la navegación local del navegador.
- No se afirma validación en teléfonos físicos ni mediciones de FPS reales.


## Alpha 6 — proyectiles de plasma ovalados
Los disparos principales se representan como orbes ovalados con núcleo blanco, halo coloreado y cola de plasma alargada. Se conserva la simulación y las colisiones del motor original.


## Alpha 7 — estela de plasma ampliada
Se amplían los orbes ovalados y se reemplaza la cola estrecha por una estela de plasma en varias capas, más ancha en el origen y afinada hacia atrás. Se mantiene la simulación y colisiones del juego.


## Alpha 8 — estela continua
Se sustituyen las colas cónicas superpuestas por una estela tubular 3D continua, con perfil ovalado, degradado de transparencia y núcleo interno más fino. Esto busca evitar el aspecto de agujas o púas de la versión anterior.


## Alpha 9 — estela de plasma redondeada
Se reemplazan las mallas cónicas por volúmenes elipsoidales solapados con extremos redondeados. El disparo conserva el orbe ovalado y una cola luminosa suave, evitando el acabado de aguja o gota puntiaguda.
