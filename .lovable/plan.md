
# CoachProAI Calculators Hub — Extended Plan

برانڈ: **CoachProAI** (موجودہ ڈومین `calculators.coachproai.com` پر لگے گا)۔
موجودہ 5 کیلکولیٹرز کے سلسلے میں **10 نئے** کیلکولیٹر شامل کیے جائیں گے — کل **15**۔

---

## 1. 10 نئے کیلکولیٹرز — SEO ریسرچ + انتخاب کی وجہ

Semrush (US database) سے 20 candidate کیلکولیٹرز پر research کی گئی۔ منتخب وہ کیے جو **(a) موجودہ 5 کے موضوع (fat loss / muscle gain / body composition) سے میل کھاتے ہیں، (b) اچھا search volume رکھتے ہیں، اور (c) قابلِ رینک ہیں (KD مناسب)**۔

| # | کیلکولیٹر | Monthly Volume (US) | Difficulty | فائدہ / کیوں شامل کیا |
|---|---|---|---|---|
| 1 | **TDEE Calculator** | 368,000 | 65 (hard) | ہر diet plan کی بنیاد — Total Daily Energy Expenditure۔ موجودہ Calorie Deficit اور Lean Bulk کا "parent" کیلکولیٹر۔ سب سے بڑا traffic magnet۔ |
| 2 | **BMR Calculator** | 135,000 | 73 (hard) | Basal Metabolic Rate — TDEE کا حصہ۔ Mifflin-St Jeor formula۔ Standalone بھی، اور دوسرے کیلکولیٹرز کو feed کرتا ہے۔ |
| 3 | **Macro Calculator** | 74,000 | **47 (winnable)** | Protein/Carbs/Fat split۔ Protein Calculator سے آگے کا قدرتی قدم۔ Excellent KD-to-volume ratio۔ |
| 4 | **Body Fat % Calculator** | 60,500 | 57 (difficult) | US Navy method (neck/waist/hip)۔ Body composition tracking کیلئے لازمی — Fat Loss اور Recomp دونوں کا measurement tool۔ |
| 5 | **One Rep Max (1RM) Calculator** | 74,000 | 63 (difficult) | Strength training audience کو لاتا ہے۔ Epley/Brzycki formulas۔ Lean Bulk audience سے direct match۔ |
| 6 | **Lean Body Mass Calculator** | 4,400 | **34 (easy win)** | Boer/James formula۔ Protein needs، recomp goals، body fat سب اس پر انحصار کرتے ہیں۔ کم مقابلہ، تیز ranking۔ |
| 7 | **Water Intake Calculator** | 9,900 | **38 (possible)** | روزانہ پانی کی ضرورت (bodyweight + activity + climate)۔ عام fitness audience — top-of-funnel۔ |
| 8 | **Waist-to-Hip Ratio Calculator** | 4,400 | **39 (possible)** | Health risk marker۔ Body Fat % کے ساتھ pair کرتا ہے — cross-linking کا بہترین موقع۔ |
| 9 | **Body Recomposition Calculator** | 2,400 | **32 (easy win)** | بیک وقت fat loss + muscle gain کا plan۔ Plateau Fix اور Lean Bulk کے درمیان کا missing piece۔ |
| 10 | **Reverse Diet Calculator** | 90 | **7 (very easy)** | Post-diet metabolism recovery۔ Volume کم مگر KD تقریباً صفر — یقینی رینکنگ + جدید topic جو CoachProAI کو authority دے گا۔ Plateau Fix کے بعد کا logical step۔ |

**رد کیے گئے:** BMI Calculator (volume 4M مگر KD 99 — ناممکن)، Maintenance Calorie (KD 79 + TDEE سے overlap)، Creatine Dosage (بہت کم volume + supplement scope creep)۔

**نتیجہ:** یہ mix آپ کو 3 کیٹیگریز دے گا:
- **Traffic drivers** (TDEE, BMR, Macro, Body Fat, 1RM) — بڑا volume
- **Winnable long-tail** (LBM, Water, Waist-Hip) — تیز rankings
- **Authority builders** (Body Recomp, Reverse Diet) — advanced audience، کم مقابلہ

---

## 2. Site Architecture

```text
src/routes/
  __root.tsx                    (header + footer + sitewide meta)
  index.tsx                     (hero + 15 calculator cards, categorized)

  # موجودہ 5
  protein.tsx
  calorie-deficit.tsx
  fat-loss-timeline.tsx
  plateau-fix.tsx
  lean-bulk.tsx

  # نئے 10
  tdee.tsx
  bmr.tsx
  macros.tsx
  body-fat.tsx
  one-rep-max.tsx
  lean-body-mass.tsx
  water-intake.tsx
  waist-to-hip-ratio.tsx
  body-recomposition.tsx
  reverse-diet.tsx
```

ہر route کا اپنا `head()` — unique title, description, og:title, og:description۔ ہر calculator page پر `WebApplication` JSON-LD schema۔ Home پر `ItemList` schema۔

---

## 3. Home Page — Categorized Grid

15 کارڈز کو 3 categories میں دکھائیں گے (orphan-card مسئلہ ختم):

- **Nutrition & Calories** (6): TDEE, BMR, Calorie Deficit, Macros, Protein, Water Intake
- **Body Composition** (5): Body Fat %, Lean Body Mass, Waist-to-Hip, Body Recomp, Fat Loss Timeline
- **Training & Goals** (4): 1RM, Lean Bulk, Plateau Fix, Reverse Diet

Grid: `auto-fit, minmax(280px, 1fr)` تاکہ ہر screen پر متوازن رہے۔

---

## 4. Shared Components

- `SiteHeader` — CoachProAI لوگو + nav (Home، تین categories کا dropdown)
- `SiteFooter` — copyright, disclaimer, links
- `CalculatorCard` — home page کارڈز
- `CalculatorShell` — ہر calculator page کا common wrapper (title, intro paragraph, form, results, "How it works" section, FAQ, related calculators)
- `MetricImperialToggle` — units switching (kg/lb, cm/in)

ہر calculator page کے نیچے **"Related calculators"** section — internal linking کے لیے (SEO booster)۔

---

## 5. Calculator Logic

تمام formulas pure functions کے طور پر `src/lib/calculators/*.ts` میں۔ تمام computation client-side — کوئی backend نہیں، کوئی API call نہیں۔

Key formulas:
- **BMR:** Mifflin-St Jeor
- **TDEE:** BMR × activity multiplier (1.2–1.9)
- **Macros:** Protein g/kg + Fat % of calories + remaining carbs
- **Body Fat %:** US Navy method
- **LBM:** Boer formula
- **1RM:** Epley + Brzycki (average دکھائیں)
- **Water:** 35 ml/kg + activity adjustment + climate
- **Body Recomp:** Small deficit (~200 kcal) + high protein (2.2 g/kg) + strength training days
- **Reverse Diet:** Weekly +50–100 kcal increments to reach new maintenance

---

## 6. Design

- **Palette:** Light slate background (#F3F6FB), deep navy text (#0F172A), indigo→blue gradient accents (#4F46E5 → #2563EB)۔ CoachProAI کے موجودہ vibe سے میل کھاتا ہے مگر زیادہ polished۔
- **Typography:** Inter — clean, professional
- **Components:** shadcn/ui (Card, Button, Input, Label, Select, Tabs, Accordion for FAQ)
- **Mobile-first, dark-mode ready**

---

## 7. SEO Foundation

- ہر route: unique title + description + og tags + JSON-LD
- `public/robots.txt` + `public/sitemap.xml` (static list of 16 URLs)
- Internal linking: ہر calculator page سے related calculators
- Semantic HTML، single H1 per page، proper heading order

---

## 8. Deployment — GitHub → Vercel → Custom Domain

سائٹ تیار ہونے کے بعد:

1. Lovable میں **GitHub → Connect project** → new repo
2. Vercel dashboard: **Import Project** → repo select
3. Framework: TanStack Start (Vercel auto-detect)، Build: `bun run build`
4. Vercel Settings → Domains → `calculators.coachproai.com` add
5. DNS پر Vercel کا CNAME record → SSL خودکار

مکمل static/client-side سائٹ ہے، اس لیے Vercel free tier پر آرام سے چلے گی۔

---

## 9. Build Order

1. Design tokens (`src/styles.css`) — palette + Inter font
2. Shared components (Header, Footer, CalculatorCard, CalculatorShell, MetricImperialToggle)
3. 15 pure-function calculator modules in `src/lib/calculators/`
4. Home page — categorized grid + hero + JSON-LD
5. 15 route pages (5 موجودہ کو rebuild + 10 نئے) — ہر ایک اپنا form, result UI, FAQ, related links, head metadata
6. `robots.txt` + `sitemap.xml`
7. Mobile/desktop QA

---

## Confirmation before I build

اگر یہ 10 کیلکولیٹرز اور architecture آپ کو منظور ہیں تو "شروع کریں" کہیں، میں build شروع کر دوں گا۔ اگر کوئی کیلکولیٹر بدلنا/ہٹانا/جوڑنا ہے (مثلاً Running Pace 18K volume، یا Heart Rate Zone 6.6K)، تو بتا دیں — plan update کر دوں گا۔
