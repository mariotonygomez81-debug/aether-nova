# AETHER NOVA 7.4 — notas de versión

## Universo y progresión
- Se conserva la campaña de 100 sectores, supervivencia, desafío diario, fenómenos cósmicos, mejoras del hangar, cinco jefes y eventos galácticos del paquete anterior.
- Ajuste del crecimiento de resistencia de enemigos y de vida de jefes para una progresión más gradual por sectores.
- Se agregan cinco cazas desbloqueables por avance de campaña: Wraith, Bastión, Fénix, Singularidad y Omega.
- La selección de nave queda guardada en la progresión local y en la copia online.

## Operaciones
- Centro de Operaciones con tres misiones diarias y tres semanales.
- Objetivos de destrucción de naves, derrota de jefes y sectores completados.
- Recompensas reclamables en créditos.
- Progreso de misiones guardado dentro de los datos comerciales y respaldado con la copia de nube.

## Cuenta y nube
- Se retiran los botones y el flujo de autenticación Google/Facebook.
- Se conserva perfil local y acceso online por correo/contraseña.
- Después de una primera subida o restauración manual, el progreso guardado se sincroniza automáticamente durante esa sesión.
- La recuperación continúa requiriendo confirmación y reemplaza la copia local; no fusiona dos progresos.

## Ranking
- El envío pasa por una Edge Function autenticada.
- La función valida formato, vincula el registro al usuario autenticado y aplica un límite de frecuencia.
- No es un sistema antitrampas completo: el servidor aún no verifica telemetría/replay de la partida.

## Configuración
- Migración aditiva `SUPABASE_MIGRATION_ALPHA_7_4.sql`.
- Edge Function `supabase/functions/submit-score`.
- Guía `CONFIGURACION_ALPHA_7_4.md`.

## Verificación de esta entrega
- Sintaxis de `game.js` comprobada con Node.js.
- JSON del manifiesto validado.
- IDs HTML duplicados: ninguno.
- Todos los IDs usados por `bindTap`/`bindHold` existen en `index.html`.
- Referencias locales del HTML comprobadas.
- Balance de llaves CSS comprobado.
- Integridad del ZIP comprobada al empaquetar.
- No se pudo ejecutar una prueba de navegador en este entorno: Chromium no inició por una limitación del entorno gráfico/GPU.
- No se probó contra la instancia Supabase real ni en un dispositivo Android físico.


## Alpha 6 — proyectiles de plasma ovalados
Los disparos principales se representan como orbes ovalados con núcleo blanco, halo coloreado y cola de plasma alargada. Se conserva la simulación y las colisiones del motor original.


## Alpha 7 — estela de plasma ampliada
Se amplían los orbes ovalados y se reemplaza la cola estrecha por una estela de plasma en varias capas, más ancha en el origen y afinada hacia atrás. Se mantiene la simulación y colisiones del juego.


## Alpha 8 — estela continua
Se sustituyen las colas cónicas superpuestas por una estela tubular 3D continua, con perfil ovalado, degradado de transparencia y núcleo interno más fino. Esto busca evitar el aspecto de agujas o púas de la versión anterior.


## Alpha 9 — estela de plasma redondeada
Se reemplazan las mallas cónicas por volúmenes elipsoidales solapados con extremos redondeados. El disparo conserva el orbe ovalado y una cola luminosa suave, evitando el acabado de aguja o gota puntiaguda.
