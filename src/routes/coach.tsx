import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ContactForm } from "@/components/contact-form";
import { Calculator, Flame, Beef, Droplet, Ruler, Percent, Activity } from "lucide-react";

const TITLE = "Amna Wasim — Certified Nutritionist | CoachProAI";
const DESC =
  "Personalized nutrition, weight loss, PCOS, diabetes, and clinical diet plans by Amna Wasim, Certified Nutritionist (DNS). Book your consultation.";
const FACEBOOK = "https://www.facebook.com/profile.php?id=100086587483053";

export const Route = createFileRoute("/coach")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: "/coach" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
    links: [{ rel: "canonical", href: "/coach" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Amna Wasim",
          jobTitle: "Certified Nutritionist",
          description:
            "Doctor of Nutrition Sciences with two years hospital experience. Personalized diet, weight loss, PCOS, diabetes and clinical nutrition plans.",
          url: "/coach",
          sameAs: [FACEBOOK],
          knowsAbout: [
            "Clinical nutrition",
            "Weight loss",
            "PCOS",
            "Diabetes",
            "Ketogenic diet",
            "Sports nutrition",
          ],
        }),
      },
    ],
  }),
  component: CoachPage,
});

const SERVICES: { title: string; body: string }[] = [
  { title: "Counted calorie plans", body: "Precise, goal-based calorie targets built around your body, activity and lifestyle." },
  { title: "Healthy diet plans", body: "Balanced, sustainable eating plans using foods you actually enjoy." },
  { title: "Weight loss plans", body: "Structured fat-loss programs with weekly check-ins and adjustments." },
  { title: "Workout plans", body: "Simple, effective training you can pair with your nutrition to see results faster." },
  { title: "Clinical nutrition", body: "Evidence-based nutrition therapy for medical conditions and recovery." },
  { title: "Sports nutrition", body: "Fuel, hydration and recovery strategies for athletes and active adults." },
  { title: "Supplements guidance", body: "What actually helps, what's a waste — honest, personalized advice." },
  { title: "Diabetes diet", body: "Blood-sugar-friendly meal plans built around your medication and routine." },
  { title: "Heart-healthy diet", body: "Cardio-protective nutrition for cholesterol, blood pressure and long-term heart health." },
  { title: "Hypertension diet", body: "DASH-style, low-sodium plans tailored to your food preferences." },
  { title: "Kidney (renal) diet", body: "Protein, potassium and phosphorus-aware plans for kidney health." },
  { title: "Ketogenic diet", body: "Safe, structured keto for fat loss or metabolic goals — not a fad version." },
  { title: "PCOS nutrition", body: "Insulin-sensitizing plans that address weight, cycle, and skin issues together." },
  { title: "Therapeutic diet", body: "Medical nutrition therapy for gut, liver, thyroid and other conditions." },
  { title: "Healthy recipes", body: "Simple, tasty recipes matched to your plan — no bland dieting food." },
  { title: "Healthy lifestyle coaching", body: "Sleep, stress, and habit support so the nutrition actually sticks." },
  { title: "Physical activity guidance", body: "Movement plans that fit real schedules and any starting fitness level." },
  { title: "Thyroid nutrition", body: "Iodine, selenium and energy-balanced plans for hypothyroid, Hashimoto and hyperthyroid — designed to work alongside your medication." },
  { title: "Pregnancy & lactation nutrition", body: "Trimester-based prenatal and breastfeeding plans focused on folate, iron, calcium and safe calorie intake for mother and baby." },
  { title: "Gut health & IBS nutrition", body: "Low-FODMAP and gut-friendly plans for bloating, IBS, acid reflux and food sensitivities." },
];

const PAIR_TOOLS: { title: string; to: string; Icon: typeof Calculator }[] = [
  { title: "TDEE", to: "/tdee", Icon: Flame },
  { title: "BMR", to: "/bmr", Icon: Activity },
  { title: "Macros", to: "/macros", Icon: Calculator },
  { title: "Protein", to: "/protein", Icon: Beef },
  { title: "Calorie Deficit", to: "/calorie-deficit", Icon: Droplet },
  { title: "Waist-to-Hip Ratio", to: "/waist-to-hip-ratio", Icon: Ruler },
  { title: "Body Fat %", to: "/body-fat", Icon: Percent },
];

const VALUES = [
  {
    title: "Clinical background",
    body: "Doctor of Nutrition Sciences with 2 years of hospital experience across public and private sectors.",
  },
  {
    title: "Personalized, not generic",
    body: "No copy-paste plans. Every recommendation is built around your body, condition, culture and goals.",
  },
  {
    title: "Sustainable results",
    body: "The goal isn't a crash diet — it's a lifestyle you can keep long after we finish working together.",
  },
];

function CoachPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden bg-neutral-950 text-white">
        <div aria-hidden className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-orange-500/25 blur-3xl" />
        <div aria-hidden className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-red-600/20 blur-3xl" />
        <div className="relative mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28">
          <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/90 ring-1 ring-inset ring-white/15">
            Certified Nutritionist · DNS
          </span>
          <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Amna Wasim
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80 sm:text-xl">
            Personalized nutrition and lifestyle plans that actually fit your body, your health,
            and your daily life.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#contact"
              className="inline-flex items-center rounded-xl bg-gradient-to-r from-orange-500 to-red-600 px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white shadow-lg transition-opacity hover:opacity-90"
            >
              Book a consultation
            </a>
            <a
              href="#services"
              className="inline-flex items-center rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-white/10"
            >
              See services
            </a>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="scroll-mt-20 bg-background">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20">
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            About Amna
          </h2>
          <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-neutral-700">
            <p>
              I'm Amna Wasim — a Certified Nutritionist and holder of a bachelor's degree in
              <strong className="font-semibold text-neutral-900"> Doctor of Nutrition Sciences (DNS)</strong>.
              I have two years of practical clinical experience working with patients in both
              public and private hospitals in Pakistan.
            </p>
            <p>
              I believe in the quiet magic of food and good nutrition. Whether the goal is losing
              weight, managing diabetes or PCOS, recovering from an illness, or simply feeling
              lighter and stronger in daily life — the right plan changes everything.
            </p>
            <p>
              My goal is simple: guide you toward a healthier, sustainable lifestyle with a plan
              built specifically around you — not a template from the internet.
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="scroll-mt-20 border-t border-border/60 bg-neutral-50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Services
            </h2>
            <p className="mt-3 text-[15px] text-neutral-600">
              Every plan is 100% personalized. Pick what you need — or ask, and we'll build a
              combined program for you.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {SERVICES.map((s) => (
              <article
                key={s.title}
                className="rounded-2xl border border-border bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-orange-500 hover:shadow-lg"
              >
                <h3 className="text-sm font-semibold text-neutral-950">{s.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-neutral-600">{s.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Tools that pair with your plan */}
      <section id="tools" className="scroll-mt-20 border-t border-border/60 bg-background">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Tools that pair with your plan
            </h2>
            <p className="mt-3 text-[15px] text-neutral-600">
              Free calculators visitors most often use before starting a service — try one, then request your full personalized plan.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-2.5">
            {PAIR_TOOLS.map(({ title, to, Icon }) => (
              <Link
                key={to}
                to={to}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:border-orange-500 hover:text-orange-700"
              >
                <Icon className="h-4 w-4" aria-hidden />
                {title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why */}
      <section className="border-t border-border/60 bg-background">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Why work with Amna
          </h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {VALUES.map((v) => (
              <div key={v.title} className="rounded-2xl border border-border bg-neutral-50 p-6">
                <h3 className="text-base font-semibold text-neutral-950">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="scroll-mt-20 border-t border-border/60 bg-neutral-50">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
          <div>
            <span className="inline-flex items-center rounded-full bg-orange-100 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-orange-700">
              Start your plan
            </span>
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Request your personalized plan
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-neutral-600">
              Tell Amna a bit about yourself and your goal. You'll get a reply — usually within
              24 hours on business days — with next steps for your consultation.
            </p>
            <div className="mt-8 space-y-3 text-sm text-neutral-700">
              <a
                href={FACEBOOK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-white px-4 py-2 font-medium transition-colors hover:border-orange-500 hover:text-orange-700"
              >
                <span aria-hidden>💬</span> Message on Facebook
              </a>
            </div>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-xl sm:p-8">
            <ContactForm />
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}