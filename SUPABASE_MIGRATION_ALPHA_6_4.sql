-- AETHER NOVA: ECLIPSE — Migración Alpha 6.4
-- Ejecutar UNA SOLA VEZ en Supabase > SQL Editor.
-- No contiene claves ni requiere service_role en el juego.

alter table public.galactic_events
  add column if not exists objective_type text not null default 'destroy_enemies',
  add column if not exists objective_target integer not null default 10,
  add column if not exists reward_credits integer not null default 500,
  add column if not exists reward_score integer not null default 1000,
  add column if not exists enemy_variant text not null default 'scout',
  add column if not exists difficulty_multiplier numeric(4,2) not null default 1.00;

do $$ begin
  if not exists (select 1 from pg_constraint where conname = 'galactic_events_objective_type_check') then
    alter table public.galactic_events add constraint galactic_events_objective_type_check
      check (objective_type in ('destroy_enemies','reach_sector','defeat_boss'));
  end if;
  if not exists (select 1 from pg_constraint where conname = 'galactic_events_target_check') then
    alter table public.galactic_events add constraint galactic_events_target_check
      check (objective_target between 1 and 1000);
  end if;
  if not exists (select 1 from pg_constraint where conname = 'galactic_events_rewards_check') then
    alter table public.galactic_events add constraint galactic_events_rewards_check
      check (reward_credits between 0 and 1000000 and reward_score between 0 and 10000000);
  end if;
  if not exists (select 1 from pg_constraint where conname = 'galactic_events_enemy_variant_check') then
    alter table public.galactic_events add constraint galactic_events_enemy_variant_check
      check (enemy_variant in ('scout','interceptor','bomber','weaver','lancer','carrier'));
  end if;
  if not exists (select 1 from pg_constraint where conname = 'galactic_events_difficulty_check') then
    alter table public.galactic_events add constraint galactic_events_difficulty_check
      check (difficulty_multiplier between 1.00 and 3.00);
  end if;
end $$;

create table if not exists public.galactic_event_claims (
  id bigint generated always as identity primary key,
  event_id bigint not null references public.galactic_events(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  progress integer not null default 0 check (progress >= 0),
  claimed_at timestamptz not null default now(),
  constraint galactic_event_claims_once unique (event_id, user_id)
);

alter table public.galactic_event_claims enable row level security;

drop policy if exists "pilot reads own event claims" on public.galactic_event_claims;
create policy "pilot reads own event claims"
  on public.galactic_event_claims for select to authenticated
  using (auth.uid() = user_id);

drop policy if exists "pilot claims own event reward" on public.galactic_event_claims;
create policy "pilot claims own event reward"
  on public.galactic_event_claims for insert to authenticated
  with check (auth.uid() = user_id);

-- Ejemplo de evento de prueba (queda sin publicar).
insert into public.galactic_events
(title, description, starts_at, ends_at, published, objective_type, objective_target, reward_credits, reward_score, enemy_variant, difficulty_multiplier)
select
  'OPERACIÓN: CAZADORES DEL VACÍO',
  'El alto mando ordena neutralizar una escuadra hostil antes de que alcance los corredores civiles.',
  now() + interval '1 hour',
  now() + interval '8 days',
  false,
  'destroy_enemies',
  12,
  750,
  1500,
  'lancer',
  1.25
where not exists (
  select 1 from public.galactic_events where title = 'OPERACIÓN: CAZADORES DEL VACÍO'
);

-- IMPORTANTE:
-- La app cliente no puede validar honestamente los objetivos ni impedir trampas.
-- Para premios competitivos de valor, validar y acreditar recompensas desde Edge Functions
-- o un backend confiable, nunca desde una clave service_role publicada.
