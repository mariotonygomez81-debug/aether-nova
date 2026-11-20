# AETHER NOVA — Renovación visual, fase 1

Fecha: 2026-11-19

## Alcance implementado
- Se incorpora `aether-visual-upgrade.css` como una capa visual aislada y cargada después de `style.css`.
- Se mejora la profundidad visual del menú, el panel cinematográfico, la jerarquía tipográfica, los paneles de información, los estados de selección y las interacciones de botones.
- Se reorganiza la cuadrícula de características para pantallas medianas y móviles, manteniendo el contenido y los identificadores DOM existentes.
- Se trasladan las siluetas CSS de las ocho naves a la hoja de estilos dedicada; `index.html` termina correctamente en `</html>`.
- Se corrige el texto del menú y del manual para indicar jefes cada diez sectores, coherente con la lógica existente de `game.js` (`state.level % 10 === 0`).
- Se respeta `prefers-reduced-motion`.
- Se incluye el nuevo CSS en la caché del Service Worker y se incrementa la versión de caché para que la actualización llegue a instalaciones PWA.

## Compatibilidad y límites
- No se modifica `game.js`, `aether3d.js`, el contrato de controles, el flujo de autenticación, Supabase, Colyseus ni la app Joystick.
- El motor 3D y sus perfiles adaptativos permanecen intactos.
- La generación de arte externo con fal está preparada, pero no se pudo ejecutar: la cuenta conectada no tiene créditos disponibles. No se reintentaron generaciones ni se cambió de cuenta.
- Esta fase es una renovación de interfaz mediante CSS y conserva el arte procedural/SVG existente. Los fondos y modelos 3D generados por IA se integrarán en una fase posterior cuando haya créditos y se puedan inspeccionar los archivos resultantes.

## Verificación pendiente
- Revisar la vista real en PC, Android TV y móviles (vertical y horizontal).
- Confirmar que el nuevo Service Worker actualice correctamente la PWA y que el menú siga desplazándose sin tapar controles.
- Verificar rendimiento de animaciones en equipos de gama baja.
