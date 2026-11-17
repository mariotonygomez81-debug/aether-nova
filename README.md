# AETHER NOVA: ECLIPSE — Commercial Edition (build 2.0)

Juego arcade espacial PWA en español, con campaña de 100 sectores, tres naves, tres dificultades, jefes, módulos, mejoras permanentes, créditos, logros, bono diario, guardado automático por sector, controles táctiles/teclado, audio Web Audio y soporte offline.

## Publicar en GitHub Pages
1. Crea un repositorio público para el juego y sube el contenido de esta carpeta a la raíz del repositorio.
2. En **Settings → Pages**, selecciona **Deploy from a branch**, rama `main` y carpeta `/ (root)`.
3. Espera la publicación y abre la URL HTTPS que proporciona GitHub Pages.
4. Comprueba el juego en escritorio y móvil antes de enviarlo a PWABuilder.

## Crear la aplicación Android con PWABuilder
1. Introduce la URL HTTPS pública del juego en https://www.pwabuilder.com/.
2. Genera el paquete Android y define el identificador definitivo de paquete.
3. Descarga el certificado/huella SHA-256 y el archivo `assetlinks.json` generado o indicado por PWABuilder.
4. Publica el Digital Asset Links definitivo en `https://TU-DOMINIO/.well-known/assetlinks.json`.
5. Verifica que el identificador y la huella SHA-256 coincidan exactamente con la firma de la app instalada.

### IMPORTANTE: assetlinks provisional
El archivo de `.well-known/assetlinks.json` incluido en este paquete es el archivo aportado previamente por el usuario. **No se considera verificado**. Sustitúyelo por el archivo/datos definitivos de PWABuilder y la huella del certificado correcto. Para una GitHub Pages de proyecto (`usuario.github.io/repositorio/`), `.well-known` no queda publicado en la raíz del dominio. Usa un repositorio GitHub Pages de usuario (`usuario.github.io`), un dominio propio o un hosting que permita servir esa ruta exacta.

## Funciones que son locales en esta edición
- Perfil/PIN local, progreso, créditos, mejoras, logros, bono diario y récords se almacenan en el dispositivo.
- El ranking es local, no global ni competitivo entre usuarios.
- No se incluyen cuentas seguras, backend, sincronización en la nube, anti-cheat, pagos, compras in-app ni monetización.
- El bono diario utiliza la fecha local del dispositivo.

## Antes de una publicación comercial real
Realiza pruebas funcionales en dispositivos Android/iOS y navegadores objetivo; verifica accesibilidad, rendimiento, consumo de batería, comportamiento offline, orientación, instalación y firma; configura soporte/contacto del desarrollador, términos y política de privacidad revisada; añade backend seguro, clasificación global y protección anti-cheat solo si esas funciones se van a ofrecer. Revisa también licencias y derechos de todos los recursos y sonidos.

La etiqueta “Commercial Edition” identifica el paquete de lanzamiento y sus sistemas de progresión; no constituye certificación de calidad, garantía de ingresos ni aprobación de Google Play.
