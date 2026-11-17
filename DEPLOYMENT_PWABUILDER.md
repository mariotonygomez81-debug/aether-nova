# Guía breve: GitHub Pages + PWABuilder

- El juego se publica desde la raíz del repositorio de GitHub Pages.
- El manifiesto usa rutas relativas para funcionar en una URL de proyecto.
- El Service Worker cachea el shell y los iconos para ofrecer funcionamiento offline después de la primera carga.
- Para TWA, Digital Asset Links debe estar disponible exactamente en `/.well-known/assetlinks.json` del origen HTTPS.
- No uses el `assetlinks.json` provisional hasta validar `package_name` y `sha256_cert_fingerprints` con la firma final.
- `display: fullscreen` es una preferencia PWA; una pestaña normal no pierde automáticamente la barra de direcciones. La TWA verificada y/o la instalación PWA permiten la experiencia inmersiva según Android y el navegador.
