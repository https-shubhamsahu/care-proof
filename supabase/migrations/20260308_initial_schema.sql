-- ============================================================
-- CareProof — Initial Database Schema
-- ============================================================

-- ── care_entries ──────────────────────────────────────────
-- Each caregiving activity a user logs via document upload
CREATE TABLE public.care_entries (
  id              uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id         uuid        REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  activity        text        NOT NULL,
  date            date        NOT NULL,
  hours           numeric(4,1) NOT NULL DEFAULT 1.0,
  skills          text[]      NOT NULL DEFAULT '{}',
  evidence_url    text,
  evidence_name   text,
  care_type       text        NOT NULL DEFAULT 'general',  -- elder_care | child_care | medical | household | emotional
  notes           text,
  created_at      timestamptz DEFAULT now() NOT NULL,
  updated_at      timestamptz DEFAULT now() NOT NULL
);

-- ── care_scores ────────────────────────────────────────────
-- One row per user, updated whenever entries change
CREATE TABLE public.care_scores (
  id                    uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id               uuid        REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  total_score           integer     NOT NULL DEFAULT 0,
  responsibility_points integer     NOT NULL DEFAULT 0,
  consistency_points    integer     NOT NULL DEFAULT 0,
  complexity_points     integer     NOT NULL DEFAULT 0,
  total_hours           numeric(8,1) NOT NULL DEFAULT 0,
  total_entries         integer     NOT NULL DEFAULT 0,
  updated_at            timestamptz DEFAULT now() NOT NULL
);

-- ── care_valuations ────────────────────────────────────────
-- Economic valuation snapshot, one row per user
CREATE TABLE public.care_valuations (
  id                  uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id             uuid        REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  daily_value_inr     numeric(12,2) NOT NULL DEFAULT 0,
  monthly_value_inr   numeric(14,2) NOT NULL DEFAULT 0,
  lifetime_value_inr  numeric(16,2) NOT NULL DEFAULT 0,
  hourly_rate_inr     numeric(8,2) NOT NULL DEFAULT 450,   -- base rate (India replacement cost)
  updated_at          timestamptz DEFAULT now() NOT NULL
);

-- ── community_stats ────────────────────────────────────────
-- Aggregated platform-wide stats (updated by trigger or cron)
CREATE TABLE public.community_stats (
  id                    uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  total_users           integer     NOT NULL DEFAULT 0,
  total_care_hours      numeric(12,1) NOT NULL DEFAULT 0,
  total_value_inr       numeric(18,2) NOT NULL DEFAULT 0,
  updated_at            timestamptz DEFAULT now() NOT NULL
);

-- Seed a single row (will be updated via trigger)
INSERT INTO public.community_stats (total_users, total_care_hours, total_value_inr)
VALUES (0, 0, 0);

-- ── Row Level Security ─────────────────────────────────────
ALTER TABLE public.care_entries   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.care_scores    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.care_valuations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_stats ENABLE ROW LEVEL SECURITY;

-- care_entries: users own their own rows
CREATE POLICY "Users can view own entries"
  ON public.care_entries FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own entries"
  ON public.care_entries FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own entries"
  ON public.care_entries FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own entries"
  ON public.care_entries FOR DELETE USING (auth.uid() = user_id);

-- care_scores: users own their own row
CREATE POLICY "Users can view own score"
  ON public.care_scores FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can upsert own score"
  ON public.care_scores FOR ALL USING (auth.uid() = user_id);

-- care_valuations: users own their own row
CREATE POLICY "Users can view own valuation"
  ON public.care_valuations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can upsert own valuation"
  ON public.care_valuations FOR ALL USING (auth.uid() = user_id);

-- community_stats: public read
CREATE POLICY "Anyone can read community stats"
  ON public.community_stats FOR SELECT USING (true);

-- ── Triggers ───────────────────────────────────────────────
-- Auto-update care_scores + care_valuations after each care_entry change

CREATE OR REPLACE FUNCTION public.recalculate_user_metrics()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
  v_user_id          uuid;
  v_total_hours      numeric;
  v_total_entries    integer;
  v_resp_pts         integer;
  v_consist_pts      integer;
  v_complex_pts      integer;
  v_total_score      integer;
  v_lifetime_inr     numeric;
  v_monthly_inr      numeric;
  v_daily_inr        numeric;
  v_hourly_rate      numeric := 450;
BEGIN
  -- Determine which user to recalculate for
  IF TG_OP = 'DELETE' THEN
    v_user_id := OLD.user_id;
  ELSE
    v_user_id := NEW.user_id;
  END IF;

  -- Aggregate from care_entries
  SELECT
    COALESCE(SUM(hours), 0),
    COUNT(*)
  INTO v_total_hours, v_total_entries
  FROM public.care_entries
  WHERE user_id = v_user_id;

  -- Score calculation (simple model, tunable)
  -- Responsibility: hours × complexity factor
  v_resp_pts    := LEAST(400, FLOOR(v_total_hours * 1.8));
  -- Consistency: bonus for having multiple distinct months
  v_consist_pts := LEAST(350,
    (SELECT COUNT(DISTINCT DATE_TRUNC('month', date)) FROM public.care_entries WHERE user_id = v_user_id) * 45
  );
  -- Complexity: based on total unique skills across entries
  v_complex_pts := LEAST(250,
    (SELECT COUNT(DISTINCT skill)
     FROM public.care_entries, UNNEST(skills) AS skill
     WHERE user_id = v_user_id) * 20
  );
  v_total_score := v_resp_pts + v_consist_pts + v_complex_pts;

  -- Valuation (Replacement Cost Method — India market wages)
  v_lifetime_inr := v_total_hours * v_hourly_rate;
  -- Monthly: average over number of months active
  SELECT COALESCE(v_lifetime_inr /
    NULLIF(COUNT(DISTINCT DATE_TRUNC('month', date)), 0), 0)
  INTO v_monthly_inr
  FROM public.care_entries
  WHERE user_id = v_user_id;
  -- Daily: simple per-day average
  v_daily_inr := COALESCE(v_lifetime_inr /
    NULLIF((SELECT COUNT(DISTINCT date) FROM public.care_entries WHERE user_id = v_user_id), 0), 0);

  -- Upsert care_scores
  INSERT INTO public.care_scores
    (user_id, total_score, responsibility_points, consistency_points, complexity_points, total_hours, total_entries, updated_at)
  VALUES
    (v_user_id, v_total_score, v_resp_pts, v_consist_pts, v_complex_pts, v_total_hours, v_total_entries, now())
  ON CONFLICT (user_id) DO UPDATE SET
    total_score           = EXCLUDED.total_score,
    responsibility_points = EXCLUDED.responsibility_points,
    consistency_points    = EXCLUDED.consistency_points,
    complexity_points     = EXCLUDED.complexity_points,
    total_hours           = EXCLUDED.total_hours,
    total_entries         = EXCLUDED.total_entries,
    updated_at            = now();

  -- Upsert care_valuations
  INSERT INTO public.care_valuations
    (user_id, daily_value_inr, monthly_value_inr, lifetime_value_inr, updated_at)
  VALUES
    (v_user_id, v_daily_inr, v_monthly_inr, v_lifetime_inr, now())
  ON CONFLICT (user_id) DO UPDATE SET
    daily_value_inr    = EXCLUDED.daily_value_inr,
    monthly_value_inr  = EXCLUDED.monthly_value_inr,
    lifetime_value_inr = EXCLUDED.lifetime_value_inr,
    updated_at         = now();

  -- Update community stats
  UPDATE public.community_stats SET
    total_users       = (SELECT COUNT(DISTINCT user_id) FROM public.care_entries),
    total_care_hours  = (SELECT COALESCE(SUM(hours), 0) FROM public.care_entries),
    total_value_inr   = (SELECT COALESCE(SUM(hours), 0) * 450 FROM public.care_entries),
    updated_at        = now();

  RETURN NEW;
END;
$$;

CREATE TRIGGER on_care_entry_change
  AFTER INSERT OR UPDATE OR DELETE ON public.care_entries
  FOR EACH ROW EXECUTE FUNCTION public.recalculate_user_metrics();

-- Storage bucket for evidence documents
INSERT INTO storage.buckets (id, name, public)
VALUES ('care-evidence', 'care-evidence', false)
ON CONFLICT DO NOTHING;

CREATE POLICY "Users can upload their own evidence"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'care-evidence' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view their own evidence"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'care-evidence' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own evidence"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'care-evidence' AND auth.uid()::text = (storage.foldername(name))[1]);
