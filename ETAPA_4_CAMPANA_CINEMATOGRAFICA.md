# AETHER NOVA: ECLIPSE — Comercial 3.0 Alpha 4

## Etapa 4: Campaña cinematográfica y narrativa

### Base de trabajo
Se parte del paquete Comercial 3.0 Alpha 3. Se mantienen el motor de juego, las diez regiones ya definidas en `ERAS`, el progreso de 100 sectores, los jefes, las mejoras del hangar y el almacenamiento local.

### Cambios incorporados
- Se rediseñó la crónica de región como una tarjeta cinematográfica con planeta, órbitas, nebulosa animada y acento cromático tomado de la región activa.
- Se muestra el número de región y una directiva de misión contextual.
- Se agregaron transiciones de entrada para la crónica, con respeto a `prefers-reduced-motion`.
- Se agregó una alerta cinematográfica para la aparición de jefes, con nombre y una breve indicación táctica específica para cada uno de los cinco arquetipos.
- Las alertas de jefe son superpuestas y no bloquean los controles ni la simulación del combate.
- Se actualizó la versión de caché del Service Worker a `aether-nova-eclipse-3-0-alpha4`.

### Compatibilidad
No se modificaron las claves de guardado, los identificadores de mejoras ni el esquema de progreso. Se conservaron los diez biomas narrativos que ya estaban presentes en Alpha 3; esta etapa mejora su presentación y no reemplaza su contenido.

### Verificación
- Sintaxis JavaScript con `node --check`.
- Validación JSON del manifiesto.
- Comprobación de referencias HTML para los nuevos elementos.
- Integridad del ZIP.
- No se afirma prueba en navegador ni en hardware Android físico.
