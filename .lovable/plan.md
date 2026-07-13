
# Coach Portfolio + Contact Form (اسی سائٹ پر `/coach`)

## 1. مقصد

ہر کیلکولیٹر پیج کے CTA بینر پر موجود **"Start full plan"** بٹن اب `/coach` روٹ پر لے جائے گا، جہاں Amna Wasim کا مکمل پورٹ فولیو + سروسز + رابطہ فارم ہوگا۔ فارم submission Lovable Cloud database میں محفوظ ہوگی اور Amna کو ای میل نوٹیفکیشن جائے گی۔

---

## 2. نئے/تبدیل ہونے والے فائلز

### نیا روٹ: `src/routes/coach.tsx`
سیمنٹک، Tesla-style سیکشنز:

1. **Hero** — نام، ٹائٹل (Certified Nutritionist, DNS)، ایک لائن ٹیگ لائن، دو CTAs (Book consultation → فارم پر scroll، WhatsApp لنک)
2. **About** (`<section id="about">`) — bio پیراگراف (bachelor's in DNS + 2 years hospital experience)
3. **Services grid** (`<section id="services">`) — 17 سروسز 3-کالم گرڈ میں (Counted calories، Healthy diet plans، Weight loss، Workout plans، Clinical nutrition، Physical activity، Sports nutrition، Supplements، Diabetes، Heart، Hypertension، Kidney، Keto، PCOS، Healthy food options، Recipes، Therapeutic diet)
4. **Why work with me** — 3-4 value props
5. **Contact form** (`<section id="contact">`) — Name، Email، Phone (optional)، Goal (select: Weight loss/Diabetes/PCOS/Sports/Other)، Message
6. **Social links footer** — Facebook link

`head()` میں unique SEO meta + `Person` JSON-LD schema (name, jobTitle, url, sameAs facebook)۔

### نیا component: `src/components/contact-form.tsx`
- Zod validation (name 1-100، email valid، message 1-1000)
- react-hook-form + shadcn Form/Input/Textarea/Select
- Submit → `submitCoachLead` server function
- Success toast + reset

### نیا server function: `src/lib/coach-leads.functions.ts`
- `createServerFn({ method: "POST" })` + Zod input validator
- `supabaseAdmin` (dynamic import) سے `coach_leads` table میں insert
- Resend gateway کے ذریعے Amna کو email notification (کنیکٹر کے بعد)
- Return `{ ok: true }`

### Database migration (Lovable Cloud)
```sql
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
-- کوئی SELECT policy نہیں: صرف service_role (server fn) پڑھ سکتا ہے
CREATE POLICY "public can insert leads" ON public.coach_leads
  FOR INSERT TO anon, authenticated WITH CHECK (true);
```

### CTA لنک اپ ڈیٹ
`src/components/calc-layout.tsx` میں "Start full plan" بٹن کو `<Link to="/coach" hash="contact">` بنا دیں گے، تاکہ ہر calculator سے براہِ راست فارم پر لینڈ ہو۔

### Header nav
`src/components/site-header.tsx` میں "Coach" لنک شامل ہوگا۔

### Sitemap
`src/routes/sitemap[.]xml.ts` میں `/coach` شامل۔

---

## 3. Email notification (Resend connector)

Amna کو ہر lead پر ای میل بھیجنے کے لیے **Resend connector** لنک کریں گے۔ ای میل onboarding@resend.dev سے آ سکتی ہے (test) یا verified domain سے۔ Amna کا receiving email address ایک secret (`COACH_NOTIFY_EMAIL`) کے طور پر رکھیں گے تاکہ کوڈ میں ہارڈ کوڈ نہ ہو۔

---

## 4. Prerequisites (build شروع کرتے وقت مانگے جائیں گے)

1. **Lovable Cloud enable** — database + server functions کے لیے (خودکار)
2. **Amna کا notification email** — کہاں leads receive کرنا چاہتی ہیں؟
3. **Resend connector** — ای میل بھیجنے کے لیے (اختیاری، نہ ہو تو صرف database میں save ہوگا)

---

## 5. Design consistency

- وہی orange/red Tesla-style palette (`--primary`, gradient hero)
- Hero میں Amna کا نام + role، ہلکا orange accent
- Services cards: `border-border`, hover پر `border-primary`
- Form: minimalist، `bg-orange-50/40` container، orange submit button

---

## منظوری کے بعد میں build mode میں یہ ترتیب سے بناؤں گا:
1. Lovable Cloud enable + `coach_leads` migration
2. `/coach` route + contact form UI
3. Server function (DB insert)
4. Resend connector + ای میل نوٹیفکیشن
5. CTA لنک، header، sitemap اپ ڈیٹ

**کیا شروع کریں؟** (اور Amna کا notification email address بتا دیں)
