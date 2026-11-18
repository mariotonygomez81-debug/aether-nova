-- AETHER NOVA: ECLIPSE — Backend opcional Alpha 6 (Supabase)
-- Ejecutar en Supabase SQL Editor. No contiene claves ni credenciales.

create table if not exists public.pilot_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  pilot_name text not null default 'Comandante' check (char_length(pilot_name) between 2 and 16),
  cosmetic_id text not null default 'nova' check (cosmetic_id in ('nova','veteran','survivor','legend')),
  updated_at timestamptz not null default now()
);

create table if not exists public.pilot_saves (
  user_id uuid primary key references auth.users(id) on delete cascade,
  pilot_name text not null default 'Comandante',
  save_data jsonb not null,
  updated_at timestamptz not null default now()
);

create table if not exists public.leaderboard (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  pilot_name text not null check (char_length(pilot_name) between 2 and 16),
  score integer not null check (score between 0 and 2000000000),
  sector integer not null check (sector between 1 and 9999),
  mode text not null check (mode in ('campaign','survival','daily')),
  created_at timestamptz not null default now()
);

create index if not exists leaderboard_weekly_score_idx on public.leaderboard (created_at desc, score desc);
create index if not exists leaderboard_user_idx on public.leaderboard (user_id, created_at desc);

create table if not exists public.galactic_events (
  id bigint generated always as identity primary key,
  title text not null check (char_length(title) between 3 and 80),
  description text not null default '',
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  constraint valid_event_dates check (ends_at > starts_at)
);

-- Límites defensivos para evitar copias de seguridad excesivamente grandes.
do $$ begin
  if not exists (select 1 from pg_constraint where conname = 'pilot_saves_payload_size_limit') then
    alter table public.pilot_saves add constraint pilot_saves_payload_size_limit
      check (pg_column_size(save_data) <= 524288);
  end if;
end $$;

alter table public.pilot_profiles enable row level security;
alter table public.pilot_saves enable row level security;
alter table public.leaderboard enable row level security;
alter table public.galactic_events enable row level security;

-- Cada comandante solo puede modificar su propio perfil y copia de seguridad.
drop policy if exists "pilot profile read own" on public.pilot_profiles;
create policy "pilot profile read own" on public.pilot_profiles for select to authenticated using (auth.uid() = user_id);
drop policy if exists "pilot profile insert own" on public.pilot_profiles;
create policy "pilot profile insert own" on public.pilot_profiles for insert to authenticated with check (auth.uid() = user_id);
drop policy if exists "pilot profile update own" on public.pilot_profiles;
create policy "pilot profile update own" on public.pilot_profiles for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "pilot save read own" on public.pilot_saves;
create policy "pilot save read own" on public.pilot_saves for select to authenticated using (auth.uid() = user_id);
drop policy if exists "pilot save insert own" on public.pilot_saves;
create policy "pilot save insert own" on public.pilot_saves for insert to authenticated with check (auth.uid() = user_id);
drop policy if exists "pilot save update own" on public.pilot_saves;
create policy "pilot save update own" on public.pilot_saves for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "leaderboard public read" on public.leaderboard;
create policy "leaderboard public read" on public.leaderboard for select to anon, authenticated using (true);
drop policy if exists "leaderboard authenticated submit own" on public.leaderboard;
create policy "leaderboard authenticated submit own" on public.leaderboard for insert to authenticated with check (auth.uid() = user_id);

-- Los clientes pueden leer eventos publicados; solo un administrador los administra.
drop policy if exists "published events public read" on public.galactic_events;
create policy "published events public read" on public.galactic_events for select to anon, authenticated using (published = true);

-- Datos de ejemplo: evento no publicado hasta que el administrador lo active.
insert into public.galactic_events (title, description, starts_at, ends_at, published)
select 'ALERTA: LLUVIA DE METEORITOS', 'Evento galáctico de lanzamiento. El alto mando anunciará las condiciones y recompensas.', now(), now() + interval '7 days', false
where not exists (select 1 from public.galactic_events where title = 'ALERTA: LLUVIA DE METEORITOS');

-- IMPORTANTE: nunca habilitar acceso público a pilot_saves ni compartir service_role.
-- La clasificación Alpha 6 acepta puntuaciones enviadas por el cliente; no es anti-trampas.
-- Para torneos competitivos con premios, validar partidas desde un servidor confiable.
