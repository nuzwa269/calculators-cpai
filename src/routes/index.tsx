import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import {
  CALCULATORS,
  CATEGORY_LABELS,
  calculatorsByCategory,
  type CalcCategory,
} from "@/lib/calculator-registry";
import {
  Flame,
  Dumbbell,
  Activity,
  Sparkles,
  Zap,
  ShieldCheck,
  Award,
  PencilLine,
  Calculator as CalcIcon,
  Target,
  ArrowRight,
} from "lucide-react";

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

const CAT_META: Record<CalcCategory, { icon: typeof Flame; blurb: string }> = {
  nutrition: {
    icon: Flame,
    blurb: "Dial in calories, macros, protein and water for your goal.",
  },
  composition: {
    icon: Activity,
    blurb: "Measure body fat, lean mass, FFMI and recomposition targets.",
  },
  training: {
    icon: Dumbbell,
    blurb: "Program 1RM, plateaus, bulking phases and fat-loss timelines.",
  },
};

function Home() {
  const cats: CalcCategory[] = ["nutrition", "composition", "training"];
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden bg-zinc-950">
        <div className="absolute inset-0 opacity-95" aria-hidden />
        <div
          aria-hidden
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.08) 1px, transparent 0)",
            backgroundSize: "22px 22px",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl animate-[pulse_7s_ease-in-out_infinite]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-primary/10 blur-3xl animate-[pulse_9s_ease-in-out_infinite]"
        />
        <div className="relative mx-auto max-w-5xl px-4 py-20 text-center text-primary-foreground sm:px-6 sm:py-28">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-card/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-white/90 ring-1 ring-inset ring-white/20 animate-fade-in">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            {CALCULATORS.length} free calculators
          </span>
          <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl animate-fade-in">
            Fitness math, solved.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-white/85 sm:text-lg animate-fade-in [animation-delay:120ms]">
            Free, accurate calculators from CoachProAI for calories, macros, body composition, and
            training. No sign-up, no fluff — just answers.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm animate-fade-in [animation-delay:200ms]">
            {cats.map((c) => {
              const Icon = CAT_META[c].icon;
              return (
                <a
                  key={c}
                  href={`#${c}`}
                  className="inline-flex items-center gap-2 rounded-full bg-card/10 px-4 py-2 font-medium text-white ring-1 ring-inset ring-white/20 transition-all hover:-translate-y-0.5 hover:bg-card/20"
                >
                  <Icon className="h-3.5 w-3.5 text-primary" />
                  {CATEGORY_LABELS[c]}
                </a>
              );
            })}
          </div>

          {/* Trust strip */}
          <div className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { icon: Sparkles, label: "Science-based" },
              { icon: Zap, label: "Instant results" },
              { icon: ShieldCheck, label: "No signup" },
              { icon: Award, label: "Coach-reviewed" },
            ].map((t, i) => (
              <div
                key={t.label}
                className="flex items-center justify-center gap-2 rounded-2xl bg-card/5 px-3 py-2.5 text-xs text-white/85 ring-1 ring-white/10 backdrop-blur-sm transition-colors hover:bg-card/10 animate-fade-in"
                style={{ animationDelay: `${280 + i * 80}ms` }}
              >
                <t.icon className="h-3.5 w-3.5 text-primary" />
                <span className="font-medium">{t.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-border bg-card/50">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-4 py-8 sm:grid-cols-4 sm:px-6">
          {[
            { value: `${CALCULATORS.length}`, label: "Free calculators" },
            { value: "0", label: "Sign-ups required" },
            { value: "100%", label: "Science-based" },
            { value: "24/7", label: "Available anytime" },
          ].map((s, i) => (
            <div
              key={s.label}
              className="text-center animate-fade-in"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="bg-primary bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl">
                {s.value}
              </div>
              <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        {cats.map((cat) => {
          const Icon = CAT_META[cat].icon;
          return (
            <section key={cat} id={cat} className="mb-16 scroll-mt-20 animate-fade-in">
              <div className="mb-6 flex items-end justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-white ">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                      {CATEGORY_LABELS[cat]}
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">{CAT_META[cat].blurb}</p>
                  </div>
                </div>
                <span className="whitespace-nowrap text-sm text-muted-foreground">
                  {calculatorsByCategory(cat).length} tools
                </span>
              </div>
              <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
                {calculatorsByCategory(cat).map((cal, i) => (
                  <a
                    key={cal.slug}
                    href={`/${cal.slug}`}
                    className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card p-5  transition-all hover:-translate-y-0.5 hover:border-primary hover: animate-fade-in"
                    style={{ animationDelay: `${i * 50}ms` }}
                  >
                    <div
                      aria-hidden
                      className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-primary/20 blur-2xl transition-all duration-500 group-"
                    />
                    <div className="relative text-lg font-semibold text-foreground group-hover:text-primary">
                      {cal.short}
                    </div>
                    <p className="relative mt-2 flex-1 text-sm text-muted-foreground">
                      {cal.description}
                    </p>
                    <div className="relative mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                      Open calculator
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </a>
                ))}
              </div>
            </section>
          );
        })}

        {/* How it works */}
        <section className="mb-16 rounded-3xl border border-border bg-card p-6  sm:p-10 animate-fade-in">
          <div className="mb-3 h-1 w-10 rounded-full bg-primary" />
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
            How CoachProAI calculators work
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Every tool follows the same simple flow — no signup, no distractions, just numbers you
            can trust.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              {
                icon: PencilLine,
                title: "1. Enter your details",
                body: "A few fields — height, weight, goal. Nothing stored.",
              },
              {
                icon: CalcIcon,
                title: "2. Get instant numbers",
                body: "Validated formulas run the second you type.",
              },
              {
                icon: Target,
                title: "3. Apply to your plan",
                body: "Use the result as the anchor for training and nutrition.",
              },
            ].map((s, i) => (
              <div
                key={s.title}
                className="group rounded-2xl border border-border bg-background p-5 transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-md animate-fade-in"
                style={{ animationDelay: `${i * 90}ms` }}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white shadow-md">
                  <s.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-sm font-semibold text-foreground">{s.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Coach quote */}
        <section className="relative mb-16 overflow-hidden rounded-3xl p-[1px] animate-fade-in">
          <div
            aria-hidden
            className="absolute inset-0 bg-primary opacity-90"
          />
          <div className="relative rounded-[calc(1.5rem-1px)] bg-zinc-950 p-6 text-white sm:p-10">
            <div className="text-4xl leading-none text-primary">“</div>
            <blockquote className="mt-2 text-lg font-medium leading-relaxed text-white/90 sm:text-2xl">
              Numbers start the plan — behavior finishes it. A calculator gives you the anchor;
              consistency does the rest.
            </blockquote>
            <div className="mt-4 text-xs uppercase tracking-[0.15em] text-white/60">
              — CoachProAI
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="relative overflow-hidden rounded-3xl bg-zinc-950 p-6 text-white shadow-2xl ring-1 ring-white/5 sm:p-10 animate-fade-in">
          <div
            aria-hidden
            className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl animate-[pulse_7s_ease-in-out_infinite]"
          />
          <div
            aria-hidden
            className="absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl animate-[pulse_9s_ease-in-out_infinite]"
          />
          <h2 className="relative text-2xl font-semibold tracking-tight sm:text-3xl">
            Want a plan built around your numbers?
          </h2>
          <p className="relative mt-3 max-w-2xl text-sm text-white/75 sm:text-base">
            The calculators give you the targets. CoachProAI turns them into a training and
            nutrition plan that actually fits your week.
          </p>
          <div className="relative mt-6 flex flex-wrap gap-3">
            <Link
              to="/coach"
              hash="contact"
              className="inline-flex items-center rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold uppercase tracking-wider text-white shadow-lg transition-all hover:opacity-90 "
            >
              Book a coach
            </Link>
            <a
              href="#nutrition"
              className="inline-flex items-center rounded-xl border border-white/15 bg-card/5 px-5 py-2.5 text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-card/10"
            >
              Browse calculators
            </a>
          </div>
        </section>
      </div>

      <SiteFooter />
    </div>
  );
}