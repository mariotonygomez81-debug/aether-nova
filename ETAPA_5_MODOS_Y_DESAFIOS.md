# AETHER NOVA: ECLIPSE — Comercial 3.0 Alpha 5

## Etapa 5: Modos de juego, desafíos y récords

### Modos incorporados
- Campaña: conserva la expedición narrativa de 100 sectores.
- Supervivencia: continúa más allá del sector 100, con dificultad y oleadas escalables; registra el mejor sector y puntaje local.
- Desafío diario: objetivo de puntuación rotativo según fecha local, nave con dos puntos de casco y sin super bombas; al completarlo otorga una recompensa especial de 500 créditos una sola vez por fecha.

### Progresión y finales
- Los récords locales identifican el modo de juego.
- Se añadieron logros para supervivencia y primer desafío diario completado.
- Final alternativo de campaña: victoria en Pesadilla, con al menos dos puntos de casco y 25.000 puntos.
- Se mantiene el bono diario anterior, independiente del desafío diario.

### Compatibilidad
- Se conservan las claves de almacenamiento anteriores y se agregan campos opcionales con valores predeterminados.
- Las partidas de supervivencia guardan el modo; los desafíos diarios no se guardan para evitar continuar una misión con una fecha/objetivo distinto.
- Service Worker actualizado a Alpha 5.

### Verificación
- Validación de sintaxis JavaScript.
- Validación JSON del manifiesto.
- Comprobación de IDs HTML y referencias del Service Worker.
- Integridad del paquete ZIP.
- No se afirma prueba de juego en navegador ni en dispositivo Android físico.
