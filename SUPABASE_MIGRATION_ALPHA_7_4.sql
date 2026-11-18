-- AETHER NOVA 7.4 — protección de escritura del ranking
-- Migración ADITIVA. Ejecutar después de SUPABASE_SCHEMA_ALPHA6.sql y Alpha 6.4.
-- No contiene claves ni secretos.

create index if not exists leaderboard_user_recent_idx
  on public.leaderboard (user_id, created_at desc);

create or replace function public.record_leaderboard_score(
  p_user_id uuid,
  p_pilot_name text,
  p_score bigint,
  p_sector integer,
  p_mode text
) returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_recent_count integer;
begin
  if p_user_id is null then
    raise exception 'missing_user';
  end if;
  if p_pilot_name is null or char_length(trim(p_pilot_name)) < 2 or char_length(trim(p_pilot_name)) > 16 then
    raise exception 'invalid_pilot_name';
  end if;
  if p_score is null or p_score < 0 or p_score > 2000000000 then
    raise exception 'invalid_score';
  end if;
  if p_sector is null or p_sector < 1 or p_sector > 9999 then
    raise exception 'invalid_sector';
  end if;
  if p_mode is null or p_mode not in ('campaign', 'survival', 'daily') then
    raise exception 'invalid_mode';
  end if;

  select count(*) into v_recent_count
  from public.leaderboard
  where user_id = p_user_id
    and created_at > now() - interval '20 seconds';

  if v_recent_count >= 1 then
    raise exception 'score_rate_limited';
  end if;

  insert into public.leaderboard (user_id, pilot_name, score, sector, mode)
  values (p_user_id, trim(p_pilot_name), p_score::integer, p_sector, p_mode);
end;
$$;

-- Las escrituras pasan por la Edge Function. La lectura pública del ranking se conserva.
revoke insert on table public.leaderboard from anon, authenticated;
revoke all on function public.record_leaderboard_score(uuid, text, bigint, integer, text) from public, anon, authenticated;
grant execute on function public.record_leaderboard_score(uuid, text, bigint, integer, text) to service_role;

comment on function public.record_leaderboard_score(uuid, text, bigint, integer, text)
  is 'Inserta puntuaciones autenticadas con validación de formato y límite básico de frecuencia. No sustituye validación antitrampas de una partida/replay.';
