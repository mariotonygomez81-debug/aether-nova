# AETHER NOVA — Gestión de eventos Alpha 6.4

## Panel administrativo seguro

La administración se realiza desde Supabase Dashboard, no desde el juego público.
La tabla `galactic_events` mantiene la política de lectura de eventos publicados.
No agregar `service_role` ni credenciales administrativas al frontend.

Abrir Supabase → Table Editor → `galactic_events` para crear y editar eventos.
Campos nuevos:
- `objective_type`: `destroy_enemies`, `reach_sector` o `defeat_boss`.
- `objective_target`: cantidad de naves, sector o jefes requeridos.
- `reward_credits`: créditos otorgados al completar el objetivo.
- `reward_score`: puntos adicionales otorgados.
- `enemy_variant`: `scout`, `interceptor`, `bomber`, `weaver`, `lancer` o `carrier`.
- `difficulty_multiplier`: reserva para escalado de dificultad (1.00 a 3.00).

Para activar un evento, establecer `published = true` y definir `starts_at` / `ends_at`.
Para retirarlo, establecer `published = false`.

## SQL para activar el evento de prueba

```sql
UPDATE public.galactic_events
SET published = true,
    starts_at = now(),
    ends_at = now() + interval '7 days'
WHERE title = 'OPERACIÓN: CAZADORES DEL VACÍO';
```

## SQL para desactivar

```sql
UPDATE public.galactic_events
SET published = false
WHERE title = 'OPERACIÓN: CAZADORES DEL VACÍO';
```

## Límites de esta Alpha

- Las recompensas se acreditan en los créditos locales del dispositivo y los reclamos quedan registrados en Supabase.
- La tabla impide que la misma cuenta reclame dos veces el mismo evento.
- Los objetivos se computan en el cliente; esta versión no ofrece protección anti-trampas ni validación server-side.
- `enemy_variant` y `difficulty_multiplier` se almacenan para configuración y visualización, pero la selección dinámica de enemigos y el escalado de dificultad quedan para una siguiente iteración.
- Para premios de valor real, mover validación y acreditación a una Edge Function o backend confiable.


## Alpha 6 — proyectiles de plasma ovalados
Los disparos principales se representan como orbes ovalados con núcleo blanco, halo coloreado y cola de plasma alargada. Se conserva la simulación y las colisiones del motor original.


## Alpha 7 — estela de plasma ampliada
Se amplían los orbes ovalados y se reemplaza la cola estrecha por una estela de plasma en varias capas, más ancha en el origen y afinada hacia atrás. Se mantiene la simulación y colisiones del juego.


## Alpha 8 — estela continua
Se sustituyen las colas cónicas superpuestas por una estela tubular 3D continua, con perfil ovalado, degradado de transparencia y núcleo interno más fino. Esto busca evitar el aspecto de agujas o púas de la versión anterior.


## Alpha 9 — estela de plasma redondeada
Se reemplazan las mallas cónicas por volúmenes elipsoidales solapados con extremos redondeados. El disparo conserva el orbe ovalado y una cola luminosa suave, evitando el acabado de aguja o gota puntiaguda.
