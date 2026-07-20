-- ============================================================
-- MULTI-SPORT MIGRATION — run this ONCE, right before deploying
-- the multi-sport branch.
--
-- ⚠ DO NOT run while the NBA-only build is still live: it swaps the
-- results primary key from (user_id, day) to (user_id, sport, day),
-- and the old client upserts with on_conflict=user_id,day — those
-- writes fail once the old constraint is gone. The new client always
-- sends sport and on_conflict=user_id,sport,day. Deploy order:
--   1. run this migration
--   2. deploy the multi-sport build
-- (In the minutes between, old clients' result pushes fail silently —
-- fire-and-forget by design — and re-sync on next sign-in.)
-- ============================================================

-- 1. results: one row per user per sport per day
alter table public.results
  add column if not exists sport text not null default 'nba'
  check (sport in ('nba', 'nfl', 'mlb'));

alter table public.results drop constraint results_pkey;
alter table public.results add primary key (user_id, sport, day);

-- 2. plays (anonymous play pool): tag every play with its sport
alter table public.plays
  add column if not exists sport text not null default 'nba'
  check (sport in ('nba', 'nfl', 'mlb'));

create index if not exists plays_sport_day_idx
  on public.plays (sport, day)
  where not is_archive;

-- 3. day_score_stats: the percentile RPC becomes sport-aware.
--    The old 2-arg signature is dropped (new client always passes sport).
drop function if exists public.day_score_stats(integer, integer);

create or replace function public.day_score_stats(
  p_sport text,
  p_day integer,
  p_score integer
)
returns table(total bigint, lower_scores bigint)
language sql
stable security definer
set search_path to ''
as $$
  select count(*)::bigint as total,
         (count(*) filter (where score < p_score))::bigint as lower_scores
  from public.plays
  where sport = p_sport and day = p_day and not is_archive;
$$;

grant execute on function public.day_score_stats(text, integer, integer) to anon, authenticated;
