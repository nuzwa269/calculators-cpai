
-- Replace overly permissive INSERT policy with a validated one
DROP POLICY IF EXISTS "Anyone can submit a lead" ON public.coach_leads;

CREATE POLICY "Anyone can submit a valid lead"
ON public.coach_leads
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(btrim(name)) BETWEEN 1 AND 100
  AND length(btrim(email)) BETWEEN 3 AND 255
  AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND length(btrim(message)) BETWEEN 1 AND 2000
  AND (phone IS NULL OR length(phone) <= 40)
  AND (goal IS NULL OR length(goal) <= 80)
);

-- Explicit restrictive policies to make deny-by-default intent clear.
-- No role is granted true, so nobody can read/update/delete via the Data API.
CREATE POLICY "No public read access to leads"
ON public.coach_leads
FOR SELECT
TO anon, authenticated
USING (false);

CREATE POLICY "No public update access to leads"
ON public.coach_leads
FOR UPDATE
TO anon, authenticated
USING (false)
WITH CHECK (false);

CREATE POLICY "No public delete access to leads"
ON public.coach_leads
FOR DELETE
TO anon, authenticated
USING (false);
