# AETHER NOVA — Visual Environment Phase 2

## Scope
This phase applies the procedural 3D production lessons from the remote Blender pipeline to the live Three.js renderer, without importing unvalidated prototype binaries or changing the game simulation.

## Implemented
- Procedural planetary surface texture generated at runtime from the existing deterministic noise helpers.
- Distant ringed planet with a subtle additive atmosphere.
- Secondary moon on medium/high/ultra profiles.
- Sparse colored cosmic dust rendered as one Points object, not individual lights.
- Adaptive geometry density: 24 segments on low, 36 on medium, 56 on high/ultra; ring and moon omitted on low.
- Ten sector-era color palettes, switching every ten sectors without rebuilding geometry.
- Subtle parallax and rotation while gameplay is active.
- Valkyrie microgeometry: layered armor panels, service lines, cooling vents, fasteners, cannon housings and luminous muzzle details.

## Compatibility boundaries
- No changes to player movement, hitboxes, collisions, damage, scoring, progression, account services, Supabase, Joystick or multiplayer contracts.
- Background planet and moon are decorative only.
- Existing AETHER_PLATFORM tier is used; no new mandatory runtime dependency is introduced.
- No Blender binary is added to the production app shell in this phase.

## Validation
GitHub Actions runs a syntax check for the 3D renderer and verifies that the adaptive low-tier safeguards remain present.

## Required manual visual checks
- Desktop: verify composition, depth and no overlap with combat readability.
- Android TV: verify planet/ring clarity and stable frame pacing.
- Low-end Android/mobile: confirm low-tier planet-only backdrop remains smooth.
- Compare all ten sector eras to ensure color identity remains readable.

## Next phase
After these checks, extend sector-specific environments and convert the validated Valkyrie Blender asset to a production-ready GLB only after visual review and size/performance checks.

## Phase 3 — sector architecture and boss arenas
- Added distant, decorative wreckage clusters with broken hull sections, exposed ribs and restrained emissive seams.
- Added a large sector energy-gate silhouette with a ring and six pylons, positioned behind the combat plane.
- Added a dedicated boss-arena frame with two rotating rings and eight perimeter beacons. It follows the active boss at a deeper camera plane and is hidden when no boss is active.
- Sector accent materials follow the existing ten-era palette without rebuilding geometry.
- All new structures are decorative only: no collision, hitbox, projectile, damage or progression changes.
- Existing quality tier remains in force; these are low-poly background structures with shared materials and no new runtime dependency.

## Phase 3 validation status
- Source change committed to the existing development branch.
- Automated GitHub Actions syntax and visual safeguard checks have not yet been observed for this commit.
- Manual review remains required on desktop, Android TV and mobile to confirm framing, draw-call cost and combat readability.

## Phase 4 — AEGIS shield presentation
- Upgraded the player shield from a single wireframe sphere to a layered energy envelope with two orbital plasma rings.
- Added restrained scale, rotation and opacity pulses to communicate an active shield without changing its gameplay duration or absorption logic.
- Mirrored the visual state for cooperative player two using the existing `coopPlayer2.shield` state; each pilot receives independent visibility and animation.
- Geometry density follows the existing low/medium/high quality tier. No new lights, textures, external assets or runtime dependencies were introduced.
- Gameplay damage, shield charges, invulnerability, multiplayer payload shape and control contracts remain unchanged; only the already-published shield boolean is consumed.

## Phase 4 validation status
- Source update committed to the existing development branch.
- Automated syntax checks and manual visual/performance checks on desktop, Android TV and mobile are still required; no successful run is claimed here.

## Phase 5 — Reactive enemy armor impacts
- The existing enemy render-state payload now includes the current enemy HP value; this is read-only presentation data and does not change combat calculations.
- The 3D renderer compares consecutive HP snapshots and emits a brief, low-cost colored impact burst when an enemy takes damage, plus a short emissive armor pulse.
- Impact colors follow enemy families (violet for carrier/weaver, gold for bomber, cyan for other classes).
- Existing burst concurrency and particle-count caps remain in force for low/medium/high quality tiers.
- No new collision checks, damage events, hitboxes, weapon rules, network messages or database fields were introduced.

## Phase 5 validation status
- Changes are committed on the existing visual development branch.
- Automated workflow result and full visual/performance checks are to be reviewed before merge; desktop, Android TV and mobile device testing remains necessary.

## Phase 6 — weapon trail response and boss destruction
- Existing projectile trail geometry now receives a subtle animated pulse during synchronization, using the already-created trail meshes and shared shot materials; no per-frame geometry or material allocation is added.
- When the renderer observes the active boss transition to the absent state, it emits one enlarged burst at the last synchronized boss position. The event is guarded by the visible/last-position state so it does not repeat every frame.
- The boss burst uses the existing capped burst system and scales down on the low quality tier.
- Boss defeat, rewards, sector progression, projectile movement, collisions, hitboxes, multiplayer and persistence remain unchanged. This is renderer-only feedback.

## Phase 6 validation status
- Renderer and documentation changes are committed on the existing visual development branch.
- GitHub Actions syntax and safeguard checks must be reviewed for the renderer commit. Manual playtesting is still required to assess trail readability and boss burst framing on desktop, Android TV and low-end mobile.


## Fase 7 — silueta cinematográfica de armamento
- Se reemplazó la forma esférica de los proyectiles del jugador por dardos de plasma direccionales: núcleo alargado, punta cónica, camisa energética translúcida, aro de confinamiento y estela posterior.
- Los láseres perforantes ahora tienen un haz más largo con punta definida y una envolvente luminosa; los misiles conservan sus aletas.
- Se mantiene el color del arma, la identificación por ID, la sincronización con los proyectiles reales y la limpieza de geometrías al desaparecer.
- La geometría utiliza menos segmentos en calidad baja y no añade luces, texturas ni dependencias externas.
- No se modificaron velocidad, trayectoria, daño, colisiones, cadencia ni reglas de armamento.

## Fase 7 — validación pendiente
- Ejecutar el workflow de la rama y revisar la sintaxis del renderer.
- Confirmar visualmente que la nueva silueta se distingue sobre fondos claros y oscuros, y que no tapa enemigos pequeños.
- Revisar rendimiento en calidad baja y media; la prueba manual en dispositivos reales sigue pendiente.


## Fase 8 — detalle mineral y HUD táctico
- Se añadieron estratos minerales facetados y aristas superficiales a los asteroides mediante geometría compartida por instancia; la densidad respeta los perfiles low/medium/high.
- Se rediseñaron visualmente los paneles del HUD y los controles táctiles con capas de cristal, reflejos superiores, jerarquía tipográfica, gradientes y estados de interacción.
- Se conservaron identificadores, distribución, dimensiones funcionales, eventos de entrada, datos de combate y progresión.
- No se añadieron dependencias ni luces por asteroide. La mejora de geometría se construye al crear cada asteroide, no en el bucle de renderizado.

## Fase 8 — estado de validación
- Cambios guardados en la rama de desarrollo; pendientes los resultados de GitHub Actions y la comprobación visual en navegador/dispositivos reales.
- La versión pública de GitHub Pages no se modificó; estos cambios todavía no están publicados en producción.


## Fase 9 — optimización de rendimiento 3D
- El renderizador usa antialiasing únicamente en perfil alto; perfiles bajo/medio reducen el pixel ratio y solicitan precisión de shader adecuada para GPU integrada.
- Se desactivó la solicitud de sombras de la luz direccional (el mapa de sombras ya estaba desactivado), evitando trabajo inútil.
- Se eliminó el recorrido de todos los subobjetos de cada proyectil en cada fotograma; los proyectiles conservan su forma y estela estáticas.
- Los recorridos de materiales de invulnerabilidad de ambos pilotos ahora se ejecutan solo cuando cambia el estado, no en todos los fotogramas.
- Se redujeron mallas decorativas por asteroide; se mantiene la geometría facetada principal y los detalles de cráter según el perfil.
- No se modificó el paso de simulación, la velocidad de entidades, la cadencia de disparo, las colisiones ni el balance. El objetivo es reducir coste de renderizado, no ralentizar el juego.

## Fase 9 — arte 3D asistido por IA
- Se seleccionó Hyper3D Rodin V2.5 mediante fal.ai para generar una nave GLB PBR optimizada para Three.js.
- La generación no pudo comenzar: la cuenta fal.ai conectada no tiene créditos disponibles. No se creó ni se integró ningún modelo externo.
- Para reanudar la generación, la cuenta conectada debe cargar créditos desde https://fal.ai/connect/credits?utm_medium=fal_mcp&utm_campaign=balance_exhausted&utm_content=openai. La tarifa publicada para esta generación es USD 0.40 por unidad; el coste final depende de las unidades consumidas.


## Fase 8 — rendimiento de arranque y silueta de Valkyrie
- Se reemplazaron cuatro texturas procedurales de nebulosa de 512×256 por una única textura compartida de 256×128 y tintes por capa; se redujo el ruido fractal de cinco a tres octavas.
- La textura planetaria ahora adapta su resolución al perfil: 160×80 en low, 224×112 en medium y 288×144 en high/ultra, con menos octavas y anisotropía limitada.
- Se eliminó la inserción duplicada del mismo objeto de polvo cósmico en el grupo ambiental.
- Se rediseñó la geometría principal de las alas de Valkyrie con perfiles delta barridos y paneles facetados, manteniendo el fuselaje, motores, cañones y variantes seleccionables.
- Se redujo el pixel ratio de renderizado y la carga de partículas para dispositivos integrados; perfiles: low 30 FPS/0.78, medium 36 FPS/0.95, high 45 FPS/1.15, ultra 50 FPS/1.35 (el renderer aplica además sus propios topes).
- No se modificaron simulación, colisiones, hitboxes, daño, progresión, cuentas, Supabase ni contratos de Joystick/multijugador.
- Verificación automática y pruebas visuales manuales pendientes para este commit. Se requiere revisar especialmente el contorno de las alas, la textura planetaria y la fluidez en el equipo Celeron/UHD 600.


## Fase 9 — rediseño de planeta Exodus
- Se reemplazó la textura azul difusa por una superficie planetaria con océanos profundos, plataformas costeras turquesas, continentes verdes/ocres, tierras altas y nubes.
- La máscara de continentes combina ruido fractal de baja frecuencia y detalle regional para evitar manchas borrosas sin rasgos geográficos.
- Resolución adaptativa contenida para no repetir el problema de rendimiento: low 192×96, medium 256×128, high/ultra 384×192.
- Se mantiene el planeta como elemento ambiental sin colisiones ni cambios de gameplay.
- El cambio responde directamente a la captura del usuario: el planeta anterior se veía pixelado, sin continentes definidos y con coloración uniforme.
- Pendiente: comprobar visualmente la composición y el coste de arranque en navegador, especialmente con Intel UHD 600.


## Fase 10 — plasma ovalado, asteroides geológicos y planeta refinado
- Proyectiles propios de plasma: se eliminó la construcción cilíndrica/cónica y el aro mecánico; ahora usan núcleo elipsoidal, envolvente luminosa, halo y cola de flujo. En perfiles no bajos se agregan dos filamentos curvos de plasma.
- Proyectiles enemigos: se reemplazaron los pequeños cuerpos y cuentas separadas por un óvalo energético con halo y estela.
- Asteroides: silueta irregular con fracturas de varias escalas, sombreado facetado, tonos minerales menos metálicos y más cráteres de mayor tamaño.
- Planeta: máscara de continentes suavizada para evitar bordes dentados; océanos más profundos, costas turquesas, regiones verdes/forestales, tierras altas, zonas frías y nubes.
- Resolución planetaria adaptativa: low 192×96, medium 320×160, high/ultra 512×256.
- No se modificaron física, daño, colisiones, puntuación ni progresión.
- Pendiente de validación visual manual y comprobación de FPS en hardware Intel UHD 600.


## Fase 11 — planeta monumental y dinámico
- El planeta deja de ser una esfera pequeña y aislada: se amplía aproximadamente al doble y se desplaza hacia el lateral del encuadre, con parte de su presencia visual integrada al horizonte.
- Se añade una capa de nubes procedural independiente, de bajo coste, que rota a una velocidad distinta de la superficie para crear parallax atmosférico.
- La atmósfera se amplía y los anillos orbitales pasan a una escala monumental, inclinados y con rotación lenta.
- El cuerpo tiene una oscilación vertical muy sutil y el fondo reduce su desplazamiento horizontal para que el planeta no parezca perseguir al jugador.
- La textura de nubes se genera una sola vez al inicio; durante el juego solo se actualizan rotaciones y posiciones, sin crear geometría ni texturas por frame.
- Se mantiene el cambio cromático por eras y el carácter decorativo del cuerpo celeste.
- Pendiente de inspección visual en navegador y medición de FPS en hardware Intel UHD 600.


## Fase 12 — sustitución de superficie procedural por texturas planetarias reales
- Se incorporan mapas equirectangulares Earth Day Map y Earth Clouds de Solar System Scope, con licencia Creative Commons Attribution 4.0.
- Los mapas se descargan de forma asíncrona desde el CDN público; el juego no bloquea el arranque y conserva la textura procedural como fallback ante errores de red/CORS.
- Se aumenta la resolución de la textura procedural de respaldo y la segmentación de la esfera (40/72/112) para reducir el facetado en los perfiles bajo/medio/alto.
- Se configuran mipmaps, filtrado lineal y anisotropía limitada por la GPU.
- Atribución: Solar System Scope, https://www.solarsystemscope.com/textures/ — CC BY 4.0, https://creativecommons.org/licenses/by/4.0/.
- La carga de mapas requiere conexión al CDN; para una distribución comercial robusta se recomienda empaquetar los archivos licenciados en el propio repositorio con su atribución.
- Pendiente: validar CORS/carga real en Render, comprobar nitidez y FPS en Intel UHD 600 y probar el fallback sin conexión.


## Fase 13 — materiales geológicos para asteroides
- Se genera una textura mineral compartida de albedo y relieve (bump) una sola vez al iniciar el renderer.
- Los materiales normal, explosivo y magnético reutilizan esos mapas con rugosidad y respuesta metálica diferenciadas.
- Se suavizan las normales de la geometría irregular para que el relieve y la iluminación aporten volumen en lugar de una apariencia de poliedro plano.
- Resolución de textura: 256×128 en perfil bajo y 512×256 en perfiles superiores; no se generan mapas ni geometrías durante la animación.
- Los detalles de cráteres y vetas siguen compartiendo geometrías y materiales; la lógica de colisiones, daño y recompensas permanece en game.js.
- Fase 12: superficie terrestre, máscara de nubes independiente y mapa de luces nocturnas de Solar System Scope (CC BY 4.0). Las texturas conservan color real y no reciben tintado de las paletas de era.
- Validación pendiente de inspección visual y FPS en hardware integrado; el mapa externo requiere conexión y conserva fallback procedural.


## Fase 14 — identidad planetaria por progresión de campaña
- Cada bloque de diez sectores selecciona un cuerpo celeste distinto: Tierra, Marte, Júpiter, Saturno, Venus, Urano, Neptuno, Mercurio, Tierra y Luna.
- Las texturas 2K de Solar System Scope se cargan de forma diferida al entrar en cada era y se almacenan en caché; no se descargan todas al iniciar.
- Se activan nubes y luces nocturnas únicamente para la Tierra, y los anillos únicamente para Saturno.
- Si una descarga falla, se conserva el último mapa disponible y el juego continúa sin bloquear la simulación.
- La progresión, enemigos, colisiones, daño y recompensas no cambian; la variación es exclusivamente visual.
- Los mapas se distribuyen bajo CC BY 4.0; se mantiene la atribución a Solar System Scope.


## Fase 15 — entradas espaciales multidireccionales
- Asteroides y estrellas fugaces sin coordenadas explícitas aparecen desde bordes laterales, superior o inferior, con trayectorias vectoriales hacia la zona de combate.
- Los cazas enemigos entran desde cuatro bordes, con aproximación diagonal y transición a su patrón de combate habitual.
- Cada objeto recibe una profundidad 3D individual; el renderer proyecta su posición con la cámara perspectiva y escala según distancia.
- Los cazas inclinan su actitud según el vector de movimiento y conservan el tamaño relativo a su hitbox lógico.
- Se mantienen coordenadas 2D para colisiones, daño, disparos, recompensas y balance; el cambio afecta al patrón de aparición y a su representación espacial.
- Los campos de escombros que crean asteroides con coordenadas explícitas conservan su patrón especial.
- Pendiente de pruebas manuales: comprobar entradas desde todos los bordes, legibilidad de proyectiles, solapamientos, dificultad y FPS en equipos de baja potencia.


## Fase 16 — disparos hacia el punto de fuga y aproximación desde espacio profundo
- Los disparos del jugador se representan como corredores de plasma en perspectiva: nacen visualmente en la nave y se reducen mientras avanzan hacia un punto de fuga a gran profundidad.
- Los impactos siguen calculándose con las coordenadas originales del motor; la trayectoria de profundidad es exclusivamente visual para no alterar daño, cadencia, armas ni balance.
- Los proyectiles enemigos registran su origen y profundidad de lanzamiento y recorren visualmente el trayecto desde el caza hacia el jugador, aumentando su tamaño aparente al aproximarse.
- Asteroides y naves comienzan a profundidades mayores y reducen esa distancia gradualmente para reforzar la sensación de aproximación desde el espacio profundo.
- Se conservan las coordenadas 2D como plano de colisión; esta fase es una proyección 3D de aproximación, no una migración completa del simulador a física 3D.
- Verificación automática de sintaxis y salvaguardas adaptativas; quedan pendientes pruebas de combate para revisar alineación visual con impactos, trayectorias de armas especiales y rendimiento.


## Fase 16 — perspectiva de profundidad para armamento y objetos
- Los disparos del jugador se representan desde la tobera hacia un punto de fuga central situado a gran distancia sobre el eje Z.
- La progresión del proyectil se expresa visualmente como desplazamiento en profundidad y reducción de escala, no como traslación vertical sobre la pantalla.
- La geometría ovalada de plasma orienta su eje longitudinal hacia el fondo (-Z); el daño y la detección de impactos siguen utilizando las coordenadas reales del motor de combate.
- Los cazas enemigos usan escala física estable por clase. Su tamaño aparente aumenta al acercarse por perspectiva, en vez de compensarse para mantener tamaño constante en píxeles.
- Los asteroides usan un radio físico basado en una distancia de referencia; su proyección aumenta naturalmente al aproximarse.
- No se modifican las velocidades, cadencias, daño, hitboxes ni recompensas del combate.
- La simulación lógica sigue siendo 2D en esta fase; el eje Z se aplica al recorrido y a la proyección visual. Una migración de colisiones y navegación a 3D requiere una etapa separada.
- Validación pendiente de pruebas manuales de legibilidad, convergencia visual y rendimiento en GPU integrada.


## Fase 17 — apuntado libre en cuatro direcciones
- Se incorpora una mira holográfica móvil con coordenadas independientes del centro de pantalla.
- Flechas del teclado: izquierda/derecha/arriba/abajo desplazan la mira en cuatro ejes.
- A/D mantienen el desplazamiento horizontal de la nave; los controles táctiles y gamepad existentes conservan el movimiento.
- El armamento directo calcula su vector hacia la mira al disparar, conservando velocidad, daño y cadencia. Los misiles mantienen su guiado autónomo.
- Cada proyectil transmite origen, vector y distancia de apuntado al renderer 3D; su posición se proyecta a profundidad según el avance real y su propia coordenada X/Y, sin convergencia artificial a un único punto de fuga.
- La mira se representa como holograma 3D sincronizado con el objetivo seleccionado.
- Las colisiones y el daño continúan usando el motor lógico existente; por tanto, el apuntado libre funciona dentro de la zona de juego 2D proyectada, no implica aún colisiones volumétricas 3D.
- Pruebas manuales pendientes: teclado, mando, pantalla táctil, cooperativo y precisión de impactos en equipos de baja potencia.


## Fase 18 — perspectiva desde la cabina del piloto
- Se incorpora una superposición vectorial SVG de cabina: marco del parabrisas, pilares laterales, paneles tácticos, retícula central, radar y telemetría.
- El centro del parabrisas permanece transparente para no tapar enemigos, asteroides ni proyectiles.
- La cabina se muestra únicamente durante la partida (HUD activo); no altera menús ni pantallas de selección.
- Se oculta el modelo exterior de la nave del jugador para evitar que la cámara de primera persona siga mostrando la nave desde fuera.
- La capa de cabina usa CSS/SVG ligero, sin texturas externas ni dependencias adicionales; se adapta a pantallas pequeñas y respeta reducción de movimiento.
- La simulación, controles, armas, daño, progreso y colisiones existentes permanecen intactos. La vista es una presentación inmersiva de cabina sobre el renderer 3D actual; no implica todavía una simulación física completa de vuelo en primera persona.
- Verificación manual pendiente en PC, Android TV y móviles, especialmente legibilidad del HUD y visibilidad del campo central.


## Fase 19 — cabina como punto de vista de vuelo
- Se retiran del encuadre de combate el planeta, su atmósfera, nubes, anillos y luna; el fondo queda abierto al espacio profundo.
- Se ocultan los modelos exteriores de ambos cazas del jugador: la cabina representa ahora el punto de vista del piloto.
- Los controles horizontales y verticales inclinan suavemente la cámara en yaw/pitch. La escena completa cambia de perspectiva, en lugar de desplazar una nave dibujada sobre el fondo.
- La retícula holográfica queda anclada al centro del parabrisas.
- Los proyectiles de plasma aumentan su escala visual para mejorar lectura e impacto desde la cabina; se conserva la lógica de daño, cadencia, trayectoria y colisión.
- Se mantienen el renderer adaptativo, las geometrías compartidas y el límite de FPS existente.
- La rotación de cámara es una capa visual sobre la simulación actual; la física de vuelo y las colisiones no se convierten en una simulación 6DoF.
- Verificación manual pendiente: comprobar respuesta de giro, centrado de disparo y rendimiento en PC, Android TV y móvil.


## Fase 20 — plasma volumétrico y mira de respuesta rápida
- Se amplía la retícula central (anillo y brazos) para facilitar adquisición de objetivos desde la cabina.
- Se incrementa la respuesta de yaw/pitch de la cámara a los controles direccionales, con mayor recorrido visual y menor sensación de retardo.
- Los proyectiles propios ganan volumen, longitud y halo; la estela de plasma se extiende para leerse como un flujo energético y no como pequeñas cápsulas.
- Se fuerza la ocultación del cuerpo planetario, capa nubosa, atmósfera y anillos en cada actualización de combate; no deben reaparecer al cambiar de sector.
- Se conservan las trayectorias, colisiones, daño y cadencia del sistema de armas.
- Pruebas automáticas de la rama aprobadas. Validación visual en navegador y prueba de rendimiento en hardware modesto pendientes.


## Fase 7 — recompensas encapsuladas y aproximación de cazas

- Se eliminó la mira central del renderizado 3D de cabina; los controles siguen gobernando la orientación de la nave/cámara.
- Los créditos y potenciadores se exponen al renderizador 3D como objetos persistentes con esfera translúcida, núcleo luminoso, halo y anillo orbital. Los objetos mantienen identificadores estables entre fotogramas y se limpian al desaparecer.
- Los disparos pueden recoger créditos y activar potenciadores al impactar sus coordenadas de juego; se conservan los importes, identificadores y efectos existentes de applyPowerup.
- Los potenciadores y créditos dejan de caer como cortina vertical y permanecen suspendidos con deriva suave mientras se aproximan por profundidad.
- Los cazas enemigos nacen dentro del campo visible a profundidad y se aproximan con movimiento lateral/vertical, con una escala visual mayor para distinguirlos desde la cabina.
- Verificación automática: workflow Visual environment quality checks del commit 83d86e783e27a4ba0e59414acd07b34e818eb873 completado con éxito. Despliegue Render dep-dc1rbhutlv9c73ct4m1g en estado live.
- Pendiente: prueba manual de adquisición de cada tipo de recompensa y de combate contra escuadrones en PC y móvil.


## Fase 8 — impactos legibles, cazas ampliados y cápsulas de poder
- Cola acotada de eventos 3D para impactos contra asteroides/enemigos y recolección de créditos/poderes.
- El renderer muestra destello de contacto, anillos expansivos y partículas en la posición del objeto.
- Cazas enemigos ampliados para mejorar su lectura desde la cabina.
- Esferas 3D de créditos y poderes ampliadas; se ocultan los dibujos Canvas duplicados cuando el renderer 3D está activo.
- Se conservan recompensas, applyPowerup, daño, cadencia, economía, balance y progresión.
- Pendiente validación automática y comprobación visual/rendimiento.


## Fase 9 — orbes cromáticos de poder y optimización GPU
- Los potenciadores se representan como esferas luminosas grandes, con carcasa translúcida aditiva, núcleo del color de la habilidad, centro blanco, halo y dos órbitas animadas.
- Se utiliza el color ya definido por cada habilidad (triple, fuego rápido, láser, plasma, dispersión, escoltas, misiles, bombas, vida y escudos); los créditos conservan su identidad dorada.
- Los orbes aumentan su escala al aproximarse por profundidad; se acelera moderadamente su avance en Z sin cambiar las reglas de adquisición, recompensa ni aplicación de poderes.
- Se eliminó MeshPhysicalMaterial con transmisión de los coleccionables y se sustituyó por materiales básicos aditivos; las geometrías y materiales se comparten por color y se reutilizan entre apariciones.
- La limpieza de un orbe ya no destruye recursos GPU compartidos. Se evita crear arreglos temporales de objetos clonados en cada fotograma durante la sincronización.
- No se modifican puntuación, economía, daño, colisiones, cadencia, progresión, cuentas, Supabase, Joystick ni contratos multijugador.
- Validación automática de sintaxis y rendimiento pendiente; se requiere comprobar visualmente que cada tipo de orbe se distingue y medir fluidez en el equipo de gama baja.


## Fase 10 — recompensas 3D reales y adquisición por impacto
- Los potenciadores dejan de generarse como cápsulas/meteoritos 2D: nacen como orbes con identidad única, posición de pantalla inicial y profundidad de entrada.
- Los orbes derivan suavemente en X/Y y avanzan por el eje Z hacia la cabina; ya no se eliminan por una caída vertical fuera de pantalla.
- Los créditos también se convierten en orbes dorados tridimensionales que flotan y se aproximan en profundidad, en lugar de seguir una parábola 2D.
- Los disparos pueden recoger orbes de poder y créditos; el contacto produce un destello/ráfaga en la posición del orbe, reproduce el sonido y aplica la habilidad o suma los créditos.
- La comprobación de impacto usa un radio mayor y, cuando el proyectil contiene datos de trayectoria, valida también la proximidad en profundidad para reducir falsos impactos.
- Cada recompensa tiene identidad de malla independiente para que dos orbes del mismo tipo no compartan posición ni se oculten entre sí.
- Se mantienen las funciones de aplicación de poderes, límites de inventario, importes, economía y progresión existentes.
- Validación automática de sintaxis de game.js y aether3d.js y comprobaciones específicas de recompensas: pendiente de ejecución en CI. Prueba manual visual y de rendimiento: pendiente.


## Fase 11 — orbes de poder 3D de alta legibilidad
- Se amplían las esferas de energía y créditos con una silueta mayor, halo pulsante, núcleo brillante y tres anillos orbitales animados.
- Cada potenciador incorpora un glifo frontal luminoso con su identificador (W, R, L, P, etc.) y conserva su color original; los créditos muestran el símbolo monetario.
- El glifo permanece orientado hacia la cámara para que la habilidad se identifique durante el acercamiento.
- Los orbes nacen a menor distancia de profundidad y avanzan más rápido por el eje Z; se añade deriva lateral/vertical suave para que no parezcan iconos estáticos pegados al plano.
- Se comparten geometrías, materiales y texturas de glifos por combinación de símbolo/color para evitar recompilar recursos y mantener controlado el coste GPU.
- Se conservan la adquisición por disparo/contacto, los identificadores, las recompensas, el balance, la economía y la aplicación de habilidades.
- No se modifican cuentas, Supabase, Joystick, multijugador ni progresión.
- CI: las comprobaciones de sintaxis ES module y game.js y las salvaguardas de calidad adaptativa finalizaron correctamente; el job todavía estaba en estado in_progress al registrar esta nota. Inspección visual y medición de FPS reales pendientes.


## Fase 12 — publicación de recursos visuales sin caché obsoleta
- Se detectó que index.html mantenía identificadores de caché antiguos para game.js y aether3d.js, por lo que navegadores podían reutilizar versiones anteriores aunque GitHub tuviera los cambios nuevos.
- Se actualizaron ambos parámetros de versión a power-orbs-depth-v3 para forzar la descarga de los scripts del motor y del renderizador 3D.
- El workflow visual ahora también se activa cuando cambia index.html.
- Esta corrección resuelve la entrega de scripts obsoletos en clientes que respetan los parámetros de URL como clave de caché. No equivale a desplegar la rama en Render ni a verificar visualmente el resultado.
- La versión de producción y main permanecen sin cambios.


## Fase 13 — combate legible, impactos alineados y recompensas visibles
- Se eliminó el retículo central dibujado en el cristal de cabina y se retiró el objeto holográfico de mira del renderizador 3D; no se alteró la lógica de apuntado ni la entrada del teclado.
- Los cazas enemigos aumentan su escala visual aproximadamente al doble (con ajuste por clase), manteniendo intactos sus hitboxes y reglas de daño.
- Los eventos de impacto ahora transportan la profundidad real del objetivo. Las ráfagas se dibujan en el mismo plano 3D del enemigo/asteroide, evitando destellos desfasados respecto del casco.
- Se amplificó la lectura del daño: ráfagas de mayor radio, pulso emisivo del blindaje y explosiones más grandes al destruir cazas.
- Los orbes de poderes y créditos ahora tienen mayor tamaño, prioridad de renderizado y materiales aditivos sin prueba de profundidad para que no queden ocultos detrás de geometría ambiental.
- Se conservan las geometrías/materiales compartidos y los límites adaptativos; no se crean luces ni recursos nuevos por fotograma.
- Se invalidó la caché de ambos scripts del motor/renderizador con una nueva versión de recursos.
- Validación automática de sintaxis y salvaguardas pendiente. La comprobación visual en navegador y FPS en PC Intel UHD 600 sigue siendo obligatoria antes de integrar en `main`.


## Fase 14 — orbes de energía de alto contraste y acercamiento visible
- Se añadieron billboards de resplandor radial por color, compartidos en caché, detrás de cada orbe 3D; glifo frontal ampliado y materiales no afectados por tone mapping.
- Los potenciadores y créditos aparecen a menor profundidad inicial para que sean visibles desde el comienzo de su recorrido, manteniendo deriva, temporizador y reglas de recogida.
- Se amplió la esfera y su halo pulsante; se conserva la reutilización de geometrías y materiales y no se generan recursos por fotograma.
- Los impactos al recoger potenciadores/créditos ahora se sitúan en la misma profundidad del orbe, en lugar de usar un plano genérico lejano.
- Se aumentó de nuevo la escala visual de los cazas enemigos sin cambiar hitboxes ni balance.
- CI automática pendiente. La vista previa Render continúa configurada para la rama de desarrollo; verificar su commit publicado antes de pruebas visuales.


## Fase 15 — tamaño moderado de orbes de recompensa
- Se reduce de forma marcada la escala física de los coleccionables: poderes a una base de 1.32 y créditos a 1.08, con variación de profundidad más contenida.
- Se reduce el billboard de resplandor a 3.15/2.65 y el glifo frontal a 0.92 para mantener la identificación sin cubrir el campo de combate.
- Se conservan el color por habilidad, núcleo, órbitas, recogida por disparo/contacto, profundidad, recompensas y materiales/geometrías compartidos.
- No se alteran daño, colisiones, cadencia, economía, progresión ni servicios online.
- Se invalida la caché de game.js y aether3d.js con pickup-orbs-balanced-v1.
- La reducción se orienta a recuperar proporción visual: orbes claramente menores que cazas y objetivos, con halo próximo a su silueta.


## Fase 16 — esferas compactas que se recogen al disparar
- Se sustituyó la presentación de los coleccionables grandes por pequeñas esferas de energía: escala base 0.34 para poderes y 0.28 para créditos, con variación de profundidad muy moderada.
- El brillo radial queda pegado a la esfera (0.78/0.66), sin grandes discos luminosos, y se retiran los anillos exteriores y el glifo frontal sobredimensionado.
- Se mantienen carcasa, núcleo, punto central, color identificador y un único aro fino para dar lectura tridimensional.
- Se conserva la mecánica existente de impacto de proyectiles: al disparar y acertar sobre un potenciador se aplica el poder; al acertar sobre un crédito se suman los créditos. No se modifican las recompensas ni el balance.
- Se actualiza la versión de caché de los scripts para forzar la carga de la presentación nueva.
- Validación de CI y prueba visual posterior al despliegue pendientes.


## Fase 17 — acabado visual refinado de orbes
- Se corrige el aspecto excesivamente pequeño y plano de la fase anterior: poderes a escala base 0.68 y créditos 0.54, con variación moderada por profundidad.
- La carcasa pasa de material aditivo translúcido a acabado Phong brillante y sólido, con reflejo especular y emisión tenue; el núcleo conserva luminosidad de color y centro blanco.
- Se atenúa el halo esférico y se usa un resplandor radial más suave y proporcionado. El aro queda como detalle fino, sin grandes anillos ni símbolos flotantes.
- Se mantiene intacta la mecánica de disparo/recogida, los valores de recompensa y el resto del combate.
- Caché de scripts actualizada a pickup-energy-spheres-v3.
- Requiere revisión visual en preview para ajustar proporción final según la captura real.


## Fase 18 — alineación de proyectiles e impactos de contacto
- Se elimina la inclinación artificial en profundidad al orientar los proyectiles 3D: la dirección visual ahora sigue el vector real X/Y sobre el plano de combate, evitando que parezcan pasar por encima o debajo de los objetivos.
- Se reduce la escala de proyectiles 3D (1.65; láser 1.85) para que el núcleo y la estela no oculten el punto de contacto.
- La colisión contra asteroides ahora utiliza barrido del segmento recorrido por el disparo y movimiento del asteroide, igualando la robustez que ya tenía la colisión contra enemigos.
- Enemigos y asteroides calculan el punto de contacto sobre su superficie, no en el centro del disparo, y publican ahí el impacto 3D con la profundidad real del objeto.
- Se ajusta el tamaño de las ráfagas 3D de impacto para que sean visibles pero localizadas en la superficie, evitando grandes anillos flotantes.
- No se cambian daño, cadencia, precisión lógica del juego, vida ni recompensas; se mejora la coincidencia visual y el registro de colisiones.
- La revisión visual y pruebas de rendimiento quedan pendientes tras desplegar.
