import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import {
  CALCULATORS,
  CATEGORY_LABELS,
  calculatorsByCategory,
  type CalcCategory,
} from "@/lib/calculator-registry";

const HOME_TITLE = "CoachProAI Calculators — Free Fitness, Nutrition & Body Comp Tools";
const HOME_DESC =
  "15 free calculators from CoachProAI: TDEE, BMR, macros, protein, body fat, 1RM, water intake, body recomposition, reverse diet and more.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: HOME_TITLE },
      { name: "description", content: HOME_DESC },
      { property: "og:title", content: HOME_TITLE },
      { property: "og:description", content: HOME_DESC },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "CoachProAI Fitness Calculators",
          numberOfItems: CALCULATORS.length,
          itemListElement: CALCULATORS.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `/${c.slug}`,
            name: c.short,
          })),
        }),
      },
    ],
  }),
  component: Home,
});

function Home() {
  const cats: CalcCategory[] = ["nutrition", "composition", "training"];
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-95" aria-hidden />
        <div className="relative mx-auto max-w-5xl px-4 py-20 text-center text-primary-foreground sm:px-6 sm:py-28">
          <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-white/90 ring-1 ring-inset ring-white/20">
            15 free calculators
          </span>
          <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Fitness math, solved.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-white/85 sm:text-lg">
            Free, accurate calculators from CoachProAI for calories, macros, body composition, and
            training. No sign-up, no fluff — just answers.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm">
            {cats.map((c) => (
              <a
                key={c}
                href={`#${c}`}
                className="rounded-full bg-white/10 px-4 py-2 font-medium text-white ring-1 ring-inset ring-white/20 transition-colors hover:bg-white/20"
              >
                {CATEGORY_LABELS[c]}
              </a>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        {cats.map((cat) => (
          <section key={cat} id={cat} className="mb-16 scroll-mt-20">
            <div className="mb-6 flex items-end justify-between">
              <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                {CATEGORY_LABELS[cat]}
              </h2>
              <span className="text-sm text-muted-foreground">
                {calculatorsByCategory(cat).length} tools
              </span>
            </div>
            <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
              {calculatorsByCategory(cat).map((cal) => (
                <a
                  key={cal.slug}
                  href={`/${cal.slug}`}
                  className="group flex h-full flex-col rounded-xl border border-border bg-card p-5 shadow-card transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-elegant"
                >
                  <div className="text-lg font-semibold text-foreground group-hover:text-primary">
                    {cal.short}
                  </div>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground">{cal.description}</p>
                  <div className="mt-4 inline-flex items-center text-sm font-medium text-primary">
                    Open calculator →
                  </div>
                </a>
              ))}
            </div>
          </section>
        ))}
      </div>

      <SiteFooter />
    </div>
  );
}
