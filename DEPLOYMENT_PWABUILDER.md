# Guía breve: GitHub Pages + PWABuilder

- El juego se publica desde la raíz del repositorio de GitHub Pages.
- El manifiesto usa rutas relativas para funcionar en una URL de proyecto.
- El Service Worker cachea el shell y los iconos para ofrecer funcionamiento offline después de la primera carga.
- Para TWA, Digital Asset Links debe estar disponible exactamente en `/.well-known/assetlinks.json` del origen HTTPS.
- No uses el `assetlinks.json` provisional hasta validar `package_name` y `sha256_cert_fingerprints` con la firma final.
- `display: fullscreen` es una preferencia PWA; una pestaña normal no pierde automáticamente la barra de direcciones. La TWA verificada y/o la instalación PWA permiten la experiencia inmersiva según Android y el navegador.


## Alpha 6 — proyectiles de plasma ovalados
Los disparos principales se representan como orbes ovalados con núcleo blanco, halo coloreado y cola de plasma alargada. Se conserva la simulación y las colisiones del motor original.


## Alpha 7 — estela de plasma ampliada
Se amplían los orbes ovalados y se reemplaza la cola estrecha por una estela de plasma en varias capas, más ancha en el origen y afinada hacia atrás. Se mantiene la simulación y colisiones del juego.


## Alpha 8 — estela continua
Se sustituyen las colas cónicas superpuestas por una estela tubular 3D continua, con perfil ovalado, degradado de transparencia y núcleo interno más fino. Esto busca evitar el aspecto de agujas o púas de la versión anterior.


## Alpha 9 — estela de plasma redondeada
Se reemplazan las mallas cónicas por volúmenes elipsoidales solapados con extremos redondeados. El disparo conserva el orbe ovalado y una cola luminosa suave, evitando el acabado de aguja o gota puntiaguda.
