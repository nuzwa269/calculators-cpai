# /coach — 20 سروسز (grid balance) + Tools sub-section

## 1. سروسز: 17 → 20 (perfect grid)

`src/routes/coach.tsx` کے `SERVICES` array میں تین نئے کارڈز شامل تاکہ 3-کالم اور 4-کالم دونوں layouts پر grid بھری اور balanced نظر آئے (20 = 4×5 اور 2×10):

- **Thyroid nutrition** — Hypothyroid/Hashimoto اور hyperthyroid کے لیے iodine، selenium اور energy-متوازن پلانز۔
- **Pregnancy & lactation nutrition** — Trimester-based prenatal اور breastfeeding — folate، iron، calcium۔
- **Gut health & IBS nutrition** — Bloating، IBS، acid reflux اور low-FODMAP پلانز۔

موجودہ responsive grid classes برقرار۔

## 2. نیا سب-سیکشن: "Tools that pair with your plan"

Services grid کے نیچے (About سے پہلے)، id=`tools`:

- چھوٹی heading + ایک لائن تعارف۔
- 7 core کیلکولیٹرز کے chip-style `<Link>` بٹنز، `PAIR_TOOLS` array سے `.map`:
  TDEE, BMR, Macros, Protein, Calorie Deficit, Waist-to-Hip Ratio, Body Fat %.
- Route paths پہلے `src/routeTree.gen.ts` سے verify ہوں گے تاکہ typed `<Link to>` پاس ہو۔
- Styling صرف semantic tokens (`bg-secondary`, `text-secondary-foreground`, `border`, `rounded-full`)۔
- Icons lucide سے: Calculator, Flame, Beef, Droplet, Ruler, Percent, Activity۔

## 3. Scope

صرف `src/routes/coach.tsx` میں presentational اضافہ۔ کوئی نیا route، backend، DB، calculator logic، header یا SEO تبدیلی نہیں۔
