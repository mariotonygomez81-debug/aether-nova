# AETHER NOVA: ECLIPSE — Comercial 3.0 Alpha 2

## Etapa 2: Caos cósmico y destrucción ambiental

### Fenómenos cósmicos
- **Tormenta iónica:** anuncia una columna de descarga, da tiempo para esquivarla y luego impacta a jugador, enemigos y asteroides dentro del corredor.
- **Campo de escombros:** genera una lluvia temporal de rocas con velocidades y trayectorias variables; algunas son explosivas.
- **Agujero negro:** conserva la atracción de asteroides y enemigos, además de absorber proyectiles cercanos y amenazar la posición de la nave.
- **Magnetar:** mantiene pulsos gravitomagnéticos expansivos que repelen objetos y proyectiles.
- **Púlsar:** su haz giratorio daña enemigos y asteroides, además de representar un peligro para la nave.
- **Supernova:** conserva su detonación de área y su impacto sobre el campo de batalla.

### Destrucción en cadena
- Los asteroides explosivos generan una onda de daño de área.
- Pueden detonar otros asteroides explosivos cercanos, con profundidad máxima de cuatro detonaciones encadenadas.
- La onda también daña enemigos y puede afectar a un jefe si está dentro del radio.
- Se limita la cantidad de partículas según el perfil de dispositivo.

### Dificultad y rendimiento
- Las tormentas iónicas aparecen desde el sector 5 y los campos de escombros desde el sector 8.
- Desde el sector 30 existe una probabilidad de superposición de dos fenómenos.
- Se limita la superposición a dos eventos simultáneos; la probabilidad es menor en dispositivos táctiles/de baja potencia.
- Se actualizó el nombre de caché del Service Worker a `aether-nova-eclipse-3-0-alpha2`.

## Verificación
- `node --check game.js`: correcto.
- `manifest.json`: JSON válido.
- Prueba de carga en navegador automatizado: no completada; el entorno de ejecución bloqueó la navegación local del navegador.
- No se afirma validación en teléfonos físicos ni mediciones de FPS reales.
