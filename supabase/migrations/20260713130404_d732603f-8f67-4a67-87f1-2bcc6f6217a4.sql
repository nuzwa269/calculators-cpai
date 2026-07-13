CREATE TABLE public.coach_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  goal text,
  message text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.coach_leads TO anon, authenticated;
GRANT ALL ON public.coach_leads TO service_role;
ALTER TABLE public.coach_leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit a lead" ON public.coach_leads
  FOR INSERT TO anon, authenticated WITH CHECK (true);