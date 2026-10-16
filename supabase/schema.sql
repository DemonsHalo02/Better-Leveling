-- ==============================================================================
-- BETTER LEVELING DATABASE SCHEMA
-- Run this script in your Supabase SQL Editor (https://app.supabase.com)
-- ==============================================================================

-- 1. Profiles Table (Extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  display_name TEXT DEFAULT 'Athlete',
  gender TEXT DEFAULT 'other',
  height_cm NUMERIC DEFAULT 175,
  starting_weight_kg NUMERIC DEFAULT 75,
  target_weight_kg NUMERIC DEFAULT 72,
  goal TEXT DEFAULT 'fat_loss', -- 'fat_loss', 'maintenance', 'muscle_gain'
  activity_level TEXT DEFAULT 'moderate',
  calisthenics_tier TEXT DEFAULT 'beginner', -- 'beginner', 'intermediate', 'advanced', 'expert'
  macro_goals JSONB DEFAULT '{"calories": 2000, "protein": 150, "carbs": 200, "fat": 65}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Food Logs Table (Daily Nutrition tracking)
CREATE TABLE IF NOT EXISTS public.food_logs (
  id TEXT PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  meal_type TEXT NOT NULL, -- 'breakfast', 'lunch', 'dinner', 'snack'
  food_id TEXT NOT NULL,
  name TEXT NOT NULL,
  brand TEXT,
  servings NUMERIC NOT NULL DEFAULT 1,
  serving_size_grams NUMERIC NOT NULL DEFAULT 100,
  calories NUMERIC NOT NULL,
  protein NUMERIC NOT NULL,
  carbs NUMERIC NOT NULL,
  fat NUMERIC NOT NULL,
  logged_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Weight Logs Table (Daily weigh-ins & trending)
CREATE TABLE IF NOT EXISTS public.weight_logs (
  id TEXT PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  weight_kg NUMERIC NOT NULL,
  note TEXT,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id, date)
);

-- 4. Workout Logs Table (6-Day Calisthenics Sessions)
CREATE TABLE IF NOT EXISTS public.workout_logs (
  id TEXT PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  day TEXT NOT NULL,
  intensity TEXT NOT NULL, -- 'beginner', 'intermediate', 'advanced', 'expert'
  focus_title TEXT NOT NULL,
  is_completed BOOLEAN DEFAULT false,
  exercise_logs JSONB NOT NULL DEFAULT '[]'::jsonb,
  notes TEXT,
  started_at TIMESTAMPTZ NOT NULL,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Custom Foods Table
CREATE TABLE IF NOT EXISTS public.custom_foods (
  id TEXT PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  barcode TEXT,
  name TEXT NOT NULL,
  brand TEXT,
  serving_size_grams NUMERIC NOT NULL DEFAULT 100,
  serving_unit TEXT DEFAULT '100g',
  calories NUMERIC NOT NULL,
  protein NUMERIC NOT NULL,
  carbs NUMERIC NOT NULL,
  fat NUMERIC NOT NULL,
  fiber NUMERIC,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==============================================================================
-- INDEXES FOR INSTANT RETRIEVAL
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_food_logs_user_date ON public.food_logs(user_id, date);
CREATE INDEX IF NOT EXISTS idx_weight_logs_user_date ON public.weight_logs(user_id, date);
CREATE INDEX IF NOT EXISTS idx_workout_logs_user_date ON public.workout_logs(user_id, date);
CREATE INDEX IF NOT EXISTS idx_custom_foods_user ON public.custom_foods(user_id);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- Ensures each user can ONLY view, insert, update, and delete their OWN data
-- ==============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.food_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.weight_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workout_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.custom_foods ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Food Logs Policies
CREATE POLICY "Users can view their own food logs"
  ON public.food_logs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own food logs"
  ON public.food_logs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own food logs"
  ON public.food_logs FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own food logs"
  ON public.food_logs FOR DELETE
  USING (auth.uid() = user_id);

-- Weight Logs Policies
CREATE POLICY "Users can view their own weight logs"
  ON public.weight_logs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own weight logs"
  ON public.weight_logs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own weight logs"
  ON public.weight_logs FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own weight logs"
  ON public.weight_logs FOR DELETE
  USING (auth.uid() = user_id);

-- Workout Logs Policies
CREATE POLICY "Users can view their own workout logs"
  ON public.workout_logs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own workout logs"
  ON public.workout_logs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own workout logs"
  ON public.workout_logs FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own workout logs"
  ON public.workout_logs FOR DELETE
  USING (auth.uid() = user_id);

-- Custom Foods Policies
CREATE POLICY "Users can view their own custom foods"
  ON public.custom_foods FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own custom foods"
  ON public.custom_foods FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own custom foods"
  ON public.custom_foods FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own custom foods"
  ON public.custom_foods FOR DELETE
  USING (auth.uid() = user_id);

-- ==============================================================================
-- AUTOMATIC PROFILE CREATION ON USER SIGNUP TRIGGER
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, display_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1))
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
