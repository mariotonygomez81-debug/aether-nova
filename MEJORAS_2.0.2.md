# AETHER NOVA: ECLIPSE — actualización comercial 2.0.2

## Mejoras de rendimiento para móviles
- Resolución interna adaptativa: DPR máximo 1.25 en pantallas pequeñas/táctiles y 1.65 en escritorio.
- Fondo de nebulosa precalculado por sector y reutilizado como imagen, evitando reconstruir varios degradados radiales en cada fotograma.
- Menos estrellas y partículas en móviles; explosiones ajustadas a la capacidad del dispositivo.
- Se desactivan desenfoques de sombra costosos en móviles y se solicita un contexto Canvas optimizado (`alpha:false`, `desynchronized:true`).

## Más identidad y espectáculo
- Cada sector recibe una variación cromática ambiental y una pantalla breve de llegada con número, región y alerta de guardián.
- Agujero negro: disco de acreción giratorio, anillos térmicos y núcleo de horizonte oscuro.
- Magnetar: líneas de campo magnético, pulsos expansivos y núcleo energético.
- Púlsar: doble haz gamma animado, halo y estrella de neutrones luminosa.

## Actualización
Reemplazar los archivos de la versión 2.0.1 por los de este paquete. El Service Worker cambia a `aether-nova-commercial-v22`; al publicar, abrir el juego y recargar completamente para actualizar la caché.

No se modifican las claves de guardado local ni los datos de progreso.
