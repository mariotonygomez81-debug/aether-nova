# AETHER NOVA: ECLIPSE — Comercial 3.0 Alpha 3

## Etapa 3: Progresión, árbol de habilidades y evolución de naves

### Objetivo
Ampliar el hangar existente sin reemplazar el sistema comercial ni alterar los identificadores de las mejoras anteriores. Los créditos y niveles guardados en `aether_commercial_v1` siguen siendo compatibles.

### Árbol de evolución

#### Tecnología
- **Reactor Nova:** conserva el aumento progresivo de velocidad.
- **Bodega Táctica:** conserva las bombas iniciales adicionales.
- **Protocolo de Salvamento:** aumenta un 8% por nivel los créditos obtenidos al cerrar una misión.

#### Ofensiva
- **Cañón de Plasma:** conserva el aumento de daño por nivel.
- **Misiles Cazadores:** añade lanzamientos periódicos de misiles guiados; los niveles superiores reducen el intervalo y aumentan el daño.
- **Drones de Escolta:** incorpora disparos laterales automáticos; los niveles superiores aumentan su daño.

#### Defensa
- **Blindaje Titán:** conserva los puntos de casco iniciales adicionales.
- **Escudo Aegis:** entrega hasta tres cargas iniciales, una por nivel; cada carga absorbe un impacto y concede invulnerabilidad temporal.
- **Capacitor de Nova:** aumenta el daño de la super bomba contra jefes en cuatro puntos porcentuales por nivel, con un máximo total del 47%.

### Identidad de las naves
- **Valkyrie:** perfil equilibrado con una bonificación de cadencia de disparo.
- **Viper-X:** perfil veloz; sus misiles permanentes se activan con un intervalo menor.
- **Titán:** perfil pesado; sus disparos infligen un 10% más de daño.

### Compatibilidad y guardado
- Se mantienen las claves de las cuatro mejoras originales (`reactor`, `cannon`, `hull`, `bombBay`).
- Los nuevos nodos se agregan al mismo objeto de progresión local. Los perfiles antiguos reciben nivel cero en las nuevas mejoras, sin borrar créditos, logros ni récords.
- Las cargas Aegis se reinician al iniciar una expedición y su cantidad restante se conserva al guardar y continuar una partida.
- Se actualizó el nombre de caché del Service Worker a `aether-nova-eclipse-3-0-alpha3` para evitar servir recursos antiguos.

## Verificación realizada
- `node --check game.js`: correcto.
- `manifest.json`: JSON válido.
- Comprobación de que los identificadores de mejoras heredadas siguen presentes: correcta.
- Integridad del ZIP: correcta.
- No se completó una prueba de juego en navegador ni en un dispositivo Android físico; no se afirman mediciones reales de FPS o validación de controles en hardware.


## Alpha 6 — proyectiles de plasma ovalados
Los disparos principales se representan como orbes ovalados con núcleo blanco, halo coloreado y cola de plasma alargada. Se conserva la simulación y las colisiones del motor original.


## Alpha 7 — estela de plasma ampliada
Se amplían los orbes ovalados y se reemplaza la cola estrecha por una estela de plasma en varias capas, más ancha en el origen y afinada hacia atrás. Se mantiene la simulación y colisiones del juego.


## Alpha 8 — estela continua
Se sustituyen las colas cónicas superpuestas por una estela tubular 3D continua, con perfil ovalado, degradado de transparencia y núcleo interno más fino. Esto busca evitar el aspecto de agujas o púas de la versión anterior.


## Alpha 9 — estela de plasma redondeada
Se reemplazan las mallas cónicas por volúmenes elipsoidales solapados con extremos redondeados. El disparo conserva el orbe ovalado y una cola luminosa suave, evitando el acabado de aguja o gota puntiaguda.
