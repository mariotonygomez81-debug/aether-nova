# AETHER NOVA: ECLIPSE — Corrección de Edición Comercial 2.0

## Error corregido
En `game.js`, `resizeCanvas()` se ejecutaba antes de inicializar `player`. Como `resizeCanvas()` consulta esa variable, JavaScript lanzaba un `ReferenceError` por la zona temporal de inicialización (TDZ). Ese error interrumpía la ejecución del archivo y evitaba que se registraran los eventos de los botones y que se inicializara el perfil.

## Cambios
- Se declara `player` antes de la primera llamada a `resizeCanvas()`.
- Se agregó manejo de errores al guardar el perfil local para informar cuando el navegador bloquea el almacenamiento.
- Se incrementó el nombre de caché del Service Worker a `aether-nova-commercial-v21` para forzar la descarga de los archivos corregidos.

## Actualización
Reemplazar en el alojamiento todos los archivos de la versión 2.0 por los de este paquete. Luego abrir el sitio y recargarlo con `Ctrl + F5`. Si ya estaba instalado como PWA, cerrar la aplicación y abrirla nuevamente después de que el Service Worker actualice la caché.

Para crear el perfil local, ingresar un nombre de al menos 2 caracteres y un PIN numérico de 4 a 6 dígitos. El perfil se almacena en el navegador de ese dispositivo; no es una cuenta online.
