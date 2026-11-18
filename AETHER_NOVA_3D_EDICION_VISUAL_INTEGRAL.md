# AETHER NOVA: ECLIPSE — Edición 3D visual integral (base Alpha 7.4)

## Alcance de esta entrega
Esta compilación concentra en una sola entrega las mejoras visuales 3D principales, conservando el motor de juego original como autoridad para simulación, colisiones, progresión y persistencia.

### Representación 3D añadida
- Caza del jugador con fuselaje metálico, cabina, paneles, alas, motores y elementos luminosos.
- Asteroides de geometría subdividida y superficie irregular.
- Naves enemigas 3D para las variantes existentes.
- Nave jefe 3D con núcleo luminoso y silueta de acorazado.
- Fondo espacial con campo estelar profundo, nebulosas procedurales, planetas texturizados, anillos y estación orbital.
- Sincronización de enemigos, jefe, asteroides y nave con posiciones del juego original.
- HUD, audio, armas, daño, progresión, recompensas y sistemas online continúan en el juego original.

## Ejecutar en Windows
1. Descomprimir el ZIP en una carpeta nueva.
2. Abrir la carpeta `aether_nova_alpha_7_4`.
3. Escribir `cmd` en la barra de direcciones del Explorador y pulsar Enter.
4. Ejecutar `py -m http.server 8000`.
5. Mantener abierta la terminal.
6. Abrir Chrome en `http://localhost:8000`.

Three.js 0.170.0 se carga desde jsDelivr; se necesita conexión a Internet. No abrir `index.html` con doble clic.

## Prueba recomendada
- Abrir el juego e iniciar una partida.
- Verificar que la nave del jugador, asteroides y enemigos se representan en 3D.
- Llegar a un encuentro de jefe para comprobar el modelo 3D del jefe.
- Comprobar colisiones, destrucción, daño, puntos, pausa y regreso al hangar.
- Comprobar rendimiento en pantalla completa y ventana.
- Probar también una recarga de página para comprobar que el Service Worker actualiza el paquete.

## Limitaciones conocidas / honestidad de validación
- El renderizador 3D es una capa visual sincronizada con la simulación 2D; no se ha migrado el motor de físicas ni la lógica a un motor 3D nativo.
- Los proyectiles, pickups, partículas y algunos efectos de combate todavía pueden conservar representación 2D.
- Los planetas, nebulosas y la estación son elementos ambientales procedurales; no son escenarios interactivos ni estaciones visitables.
- El diseño 3D de la nave y enemigos es geométrico/procedural, no un modelo artístico externo de alta poligonización.
- La compilación pasó comprobaciones sintácticas de JavaScript y estructura del ZIP. La validación visual y de rendimiento debe hacerse en el navegador y equipo del usuario.
- La integración no modifica tablas, claves ni funciones de Supabase. No se deben ejecutar migraciones SQL para esta entrega.


## Alpha 3 — optimización de rendimiento
- Renderizador 3D limitado a 30 FPS para liberar tiempo de CPU/GPU al motor de juego original.
- Pixel ratio máximo reducido a 1.15 y antialiasing del overlay desactivado.
- Sombras dinámicas desactivadas en el overlay para reducir el costo de GPU.
- Menos partículas de estrellas y polvo.
- Textura de planetas gaseosos con bandas menos regulares y mayor variación turbulenta.
- Estación con módulos habitacionales y travesaños adicionales.


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
