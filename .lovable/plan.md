# Calculator pages — richer look + new sections

Scope: صرف `src/components/calc-layout.tsx` (اور معمولی helper additions اسی فائل میں)۔ کوئی calculator logic، route، یا content schema تبدیل نہیں — تمام موجودہ per-slug content ویسے ہی کام کرے گا۔

## 1. Visual effects (subtle, semantic)

- Hero left card پر animated grain + soft orange radial glow (`::before` gradient blob, low opacity)۔
- Hero right teaser کارڈ کے existing blobs کو slow `animate-pulse`/float کریں (custom keyframe `float` — `@utility` in `styles.css`)۔ ⚠ نوٹ: صرف `calc-layout.tsx` scope میں tailwind arbitrary values استعمال کروں گا تاکہ styles.css نہ چھونا پڑے (`animate-[pulse_6s_ease-in-out_infinite]`, `animate-[spin_20s_linear_infinite]`).
- ہر section کارڈ پر `animate-fade-in` on mount + hover پر `hover:-translate-y-0.5 transition-all` (پہلے سے related cards پر ہے، سب پر consistent)۔
- Metric card `primary` variant پر shimmering gradient border (conic gradient mask) اور hover scale۔
- Section headings کے ساتھ چھوٹی gradient accent bar (orange→red, `h-1 w-10 rounded-full`)۔
- Background: `main` پر subtle dotted grid pattern (radial-gradient in inline style) تاکہ dead-flat black نہ لگے۔
- Scroll reveal کے بجائے CSS-only staggered `animate-fade-in` with `[animation-delay]` arbitrary values (SSR-safe, no JS)۔

## 2. نئے sections (calc-layout میں add)

ترتیب (hero کے بعد):

1. **Trust strip** — 4 چھوٹے stat/trust chips (Science-based • Instant • Private (no signup) • Coach-reviewed)۔ Icons lucide سے۔
2. **How it works** — 3-step stepper (Enter details → Get instant numbers → Apply to your plan)۔ Numbered circles، gradient accent۔
3. **Formula / method card** — موجودہ per-route `howItWorks` prop کو یہاں render کریں (ابھی صرف prop لیا جاتا ہے، UI میں نہیں دکھایا جاتا)۔ Monospace formula، "Method" heading۔
4. **Meaning** (موجود)
5. **Benefits** (موجود)
6. **Use cases / who is this for** — 3 چھوٹے کارڈز (Fat loss phase • Muscle building • Maintenance/recomp) — content کے بغیر بھی generic defaults سے کام کرے گا؛ اگر بعد میں content میں `useCases` شامل ہو تو override۔ فی الحال defaults۔
7. **Coach quote / callout** — highlighted blockquote گراڈیئنٹ بارڈر کے ساتھ ("Numbers start the plan — behavior finishes it.")۔
8. **FAQ** (موجود)
9. **Related** (موجود)
10. **Share bar** — Copy link + Twitter/WhatsApp share (native `navigator.share` fallback؛ ssr-safe: onClick handlers only)۔
11. **CTA** (موجود)

سب new sections optional-safe رکھیں گے تاکہ کسی slug کے کم content کے باوجود کچھ بھی نہ ٹوٹے۔

## 3. Technical notes

- Only `src/components/calc-layout.tsx` تبدیل ہوگی؛ نئے sub-components اسی فائل میں چھوٹے functions کے طور پر۔
- Icons: `lucide-react` (پہلے سے موجود)۔
- Tokens: semantic tokens/existing orange-red gradient برقرار — hardcoded colors صرف پہلے سے موجود pattern کے مطابق (پہلے ہی neutral/orange کلاسیں استعمال ہو رہی ہیں)۔
- کسی route file کو ہاتھ لگانے کی ضرورت نہیں۔
- SSR-safe: کوئی `window` access module-scope پر نہیں؛ share handlers صرف onClick میں۔

## 4. Out of scope

- Calculator logic، routes، content schema، header/footer، SEO میٹا، backend۔
