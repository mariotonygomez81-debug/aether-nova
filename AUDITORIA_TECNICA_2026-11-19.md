# AETHER NOVA — Auditoría técnica inicial
**Fecha:** 2026-11-19  
**Alcance:** repositorios de juego y Joystick, Supabase y despliegue Render.  
**Estado:** auditoría estática y revisión de infraestructura; todavía no se ha realizado una partida de prueba automatizada con dos cuentas/dispositivos.

## 1. Fuentes de verdad
- Juego: `mariotonygomez81-debug/aether-nova`, rama `main`.
- Joystick: `mariotonygomez81-debug/aether-nova-mobile-controller`, rama `main`.
- Backend online: proyecto Supabase `AETHER-NOVA-ECLIPSE`.
- Servidor autoritativo: servicio Render `aether-nova-battle-server`.
- No se creó un repositorio paralelo ni se modificaron funcionalidades de juego en esta auditoría.

## 2. Hallazgos principales

### 2.1 Juego y cuentas
- El cliente mantiene campaña local y un perfil/PIN local. La documentación actual también indica que la campaña local puede jugarse sin cuenta.
- Esto no coincide con la arquitectura aprobada del producto: cuentas obligatorias. La transición debe preservar partidas locales existentes y permitir migrarlas a una cuenta sin pérdida de progreso.
- El cliente contiene autenticación Supabase, perfiles, guardado en nube, ranking, eventos, amigos, escuadrones y salas cooperativas. No obstante, la cuenta online no es obligatoria para toda la experiencia.

### 2.2 Joystick
- La app es una PWA independiente, orientada a pantalla horizontal, con código de vinculación de 12 caracteres y parámetro `player=2`.
- La app envía el evento Realtime `input` con movimiento, seis acciones tácticas y nave seleccionada. Recibe `game-status` y `command-ack`.
- El juego implementa ambos canales `aether-phone-<código>`, selección de nave y acciones para piloto 1 y piloto 2. La comunicación bidireccional del modo de control local está implementada en el código.
- El Joystick y el servidor Colyseus todavía no comparten el mismo circuito de entrada: el Joystick transmite a Supabase Realtime; el adaptador Colyseus espera mensajes `input` y `weapon` con otro formato.

### 2.3 Multijugador autoritativo
- El commit más reciente del juego declara conexión con Render. El cliente carga `multiplayer-client.js`, crea/unifica una sala Colyseus y recibe cambios de estado para mostrar un indicador.
- La conexión no equivale todavía a combate sincronizado completo: en el código inspeccionado no se encontraron llamadas del juego a `AETHER_MULTIPLAYER.sendInput()` ni a `sendWeapon()`. El estado remoto tampoco se integra al renderizado de las naves, enemigos y disparos del juego.
- El adaptador declara esos métodos, pero el gameplay continúa usando el motor local y los canales Realtime del Joystick.
- El servidor valida el token Supabase, comprueba que el usuario pertenezca a la sala y que la sala esté en estado `playing`. Calcula movimiento, disparos, aparición de enemigos y daño a enemigos en un mundo de prueba 1000×600 a 30 ticks/s.
- El servidor todavía es un núcleo inicial: no se verificaron colisiones de enemigos contra pilotos, daño/vidas, progresión real de sectores/jefes, sincronización visual con el cliente, reconexión, persistencia del resultado ni equivalencia de todas las armas y mejoras del juego.
- El servidor pasa a fase activa cuando hay al menos dos clientes conectados. Esto debe probarse con dos cuentas reales y reconexión.

### 2.4 Render
- El servicio `aether-nova-battle-server` existe, está vinculado al repositorio principal y apunta al contexto Docker `multiplayer-server`.
- El último despliegue consultado está en estado `live`, construido desde el commit `228b41f1ffb7b320d6c5001403496a7b29520b36`. Los logs muestran arranque de Colyseus y escucha en el puerto asignado; no se encontraron logs de nivel error en la consulta.
- El servicio está en plan Free y tiene una instancia. Puede tener limitaciones de disponibilidad/latencia frente a un plan persistente.
- El código expone `/health`, pero la configuración del servicio consultada no tiene un `healthCheckPath` HTTP configurado. La ruta no quedó verificada mediante una petición HTTP externa en esta auditoría.
- El despliegue live consultado corresponde a un commit anterior al último commit del cliente principal; el servidor debe versionarse y desplegarse independientemente cuando cambie su carpeta.

### 2.5 Supabase
- Proyecto `AETHER-NOVA-ECLIPSE`: estado `ACTIVE_HEALTHY`, PostgreSQL 17.
- Se encontraron 12 tablas públicas relevantes y todas aparecen con RLS habilitado.
- Hay 8 migraciones registradas, incluyendo salas cooperativas, identidad/privacidad, endurecimiento de RPC, políticas de guardado y progreso de misiones. No se reaplicó ninguna migración.
- La Edge Function `submit-score` está activa y exige JWT.
- Las políticas consultadas restringen perfiles y guardados a su propietario; ranking y eventos publicados son de lectura pública. Las tablas de sala, miembros, amistades e invitaciones tienen políticas de acceso.
- Las funciones RPC cooperativas inspeccionadas usan wrappers SQL con `search_path` vacío; la función trigger `guard_friend_request` es SECURITY DEFINER y comprueba `auth.uid()`.
- El asesor de seguridad informa una advertencia: la protección contra contraseñas filtradas está deshabilitada. Debe activarse en Auth.
- El asesor de rendimiento reporta 13 índices sin uso observado. No deben eliminarse solo por esa advertencia: la base es reciente y todavía tiene poco tráfico.
- Pendiente verificar explícitamente los permisos/grants de Data API y ejecutar pruebas autenticadas de políticas RLS, especialmente la lectura de miembros de sala. No se debe asumir que RLS habilitado equivale a permisos funcionales correctos.

## 3. Riesgos priorizados
1. **Crítico — integración de combate:** conexión Colyseus establecida, pero movimiento, armas y renderizado no están conectados al motor autoritativo.
2. **Alto — requisitos de cuentas:** sigue existiendo acceso local sin cuenta, contrario a la decisión de cuentas obligatorias; migrar sin perder guardados.
3. **Alto — pruebas de RLS/Data API:** verificar políticas y permisos reales con dos cuentas, sin abrir tablas públicamente por comodidad.
4. **Alto — integridad de juego:** el servidor inicial no implementa todavía el conjunto de reglas de combate, daño, progreso y recompensas del juego completo.
5. **Medio — documentación:** el README del servidor describe el estado como no conectado; ahora existe un handshake desde el cliente, pero el combate sigue sin integrarse. Actualizarlo cuando se complete la etapa de integración.
6. **Medio — operación:** configurar y verificar un health check HTTP y evaluar la limitación del plan Free para sesiones online.

## 4. Plan de implementación ordenado
### Etapa A — Contrato multijugador y pruebas de integración
- Definir un único contrato de mensajes para juego, Joystick y servidor.
- Conectar los controles de ambos pilotos al servidor y mapear las ocho naves y las seis armas tácticas.
- Incorporar interpolación/reconciliación visual sin romper el modo local ni la campaña existente.
- Probar 2 y 4 pilotos, pérdida de conexión, reconexión, latencia y salida de un miembro.

### Etapa B — Simulación autoritativa completa
- Completar daño, vidas, colisiones, armas, enemigos, jefes, sectores, recompensas y límites anti-trampas en servidor.
- Sincronizar estado y eventos visuales con el cliente; guardar resultados de forma validada.
- Mantener compatibilidad con el guardado local y el esquema actual.

### Etapa C — Cuentas obligatorias y migración segura
- Diseñar el flujo de primera ejecución, inicio de sesión y recuperación.
- Migrar perfiles y progreso local a la cuenta autenticada con copia de seguridad, validación y sin sobrescribir partidas.
- Mantener modo de recuperación ante pérdida temporal de conexión, sin permitir jugar online sin autenticación.

### Etapa D — Seguridad y operación
- Activar protección contra contraseñas filtradas.
- Probar políticas RLS y permisos Data API con cuentas de prueba.
- Configurar health check HTTP, supervisión, límites de frecuencia y reconexión.
- Revisar el plan de Render antes de pruebas de carga o publicación comercial.

### Etapa E — Compatibilidad y publicación
- Pruebas de regresión de campaña, guardado, armas, Joystick P1/P2, PWA, Android, Android TV y Windows.
- Verificar calidad gráfica adaptativa, rendimiento y caché PWA.
- Actualizar manuales y checklist de publicación.

## 5. Límites de esta auditoría
- No se editaron archivos de gameplay ni se aplicaron cambios a Supabase o Render.
- No se ejecutaron migraciones ni se leyeron secretos/credenciales.
- El estado `live` de Render confirma el despliegue del proceso, no una sesión de combate funcional.
- La integración de dos cuentas/dispositivos requiere pruebas de extremo a extremo; no se declara aprobada hasta completarlas.
