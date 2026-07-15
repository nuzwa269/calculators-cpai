import type { ReactNode } from "react";
import { relatedCalculators, type CalcCategory } from "@/lib/calculator-registry";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CALCULATOR_CONTENT } from "@/lib/calculator-content";
import { Link } from "@tanstack/react-router";
import {
  Sparkles,
  Zap,
  ShieldCheck,
  Award,
  PencilLine,
  Calculator as CalcIcon,
  Target,
  Share2,
  Link2,
  Twitter,
  MessageCircle,
} from "lucide-react";

function AccentBar() {
  return (
    <div className="mb-3 h-1 w-10 rounded-full bg-primary" />
  );
}

export function Metric({
  label,
  value,
  hint,
  primary,
}: {
  label: string;
  value: string;
  hint?: string;
  primary?: boolean;
}) {
  return (
    <div
      className={
        primary
          ? "group relative overflow-hidden rounded-xl bg-primary p-4 text-white  transition-transform hover:-translate-y-0.5 hover:scale-[1.02]"
          : "group rounded-xl border border-slate-200 bg-card p-4 text-slate-900 transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-md"
      }
    >
      {primary && (
        <div
          aria-hidden
          className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-card/20 blur-2xl animate-[pulse_5s_ease-in-out_infinite]"
        />
      )}
      <div
        className={
          primary
            ? "relative text-xs uppercase tracking-wider text-white/85"
            : "text-xs uppercase tracking-wider text-slate-500"
        }
      >
        {label}
      </div>
      <div className={primary ? "relative mt-1 text-2xl font-bold" : "mt-1 text-2xl font-bold"}>
        {value}
      </div>
      {hint && (
        <div className={primary ? "relative mt-1 text-xs text-white/85" : "mt-1 text-xs text-slate-500"}>
          {hint}
        </div>
      )}
    </div>
  );
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface CalcLayoutProps {
  slug: string;
  category: CalcCategory;
  title: string;
  intro: string;
  children: ReactNode; // form + result
  howItWorks?: ReactNode;
  faq?: FaqItem[];
}

export function CalcLayout({
  slug,
  title,
  intro,
  children,
  howItWorks,
  faq,
}: CalcLayoutProps) {
  const related = relatedCalculators(slug, 3);
  const content = CALCULATOR_CONTENT[slug];
  const headline = content?.headline ?? title;
  const hook = content?.hook ?? intro;
  const features = content?.features ?? [
    { label: "Free to use" },
    { label: "Instant results" },
    { label: "Coach-designed" },
  ];
  const faqItems = content?.faq ?? faq ?? [];

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main
        className="relative bg-background pb-16"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)",
          backgroundSize: "22px 22px",
        }}
      >
        {/* Hero split: form (left, white) + teaser (right, gradient blue) */}
        <section className="relative">
          <div className="mx-auto max-w-6xl px-4 pt-8 sm:px-6 sm:pt-12">
            <a
              href="/"
              className="mb-4 inline-flex items-center text-xs font-medium tracking-wide text-muted-foreground transition-colors hover:text-white"
            >
              ← All calculators
            </a>
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
              {/* Left: form card */}
              <article className="relative overflow-hidden rounded-3xl bg-card p-6 text-foreground shadow-2xl sm:p-8 animate-fade-in">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/20 blur-3xl animate-[pulse_7s_ease-in-out_infinite]"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-primary/10 blur-3xl animate-[pulse_9s_ease-in-out_infinite]"
                />
                <div className="relative">
                <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-primary ring-1 ring-inset ring-primary/30">
                  {content?.eyebrow ?? "FREE CALCULATOR"}
                </span>
                <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-[2.25rem] sm:leading-[1.1]">
                  {headline}
                </h1>
                <p className="mt-3 max-w-xl text-sm text-muted-foreground sm:text-[15px] sm:leading-relaxed">
                  {hook}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {features.map((f) => (
                    <span
                      key={f.label}
                      className="inline-flex items-center rounded-lg bg-muted px-3 py-1.5 text-xs font-medium text-foreground ring-1 ring-inset ring-border transition-colors hover:bg-primary/10 hover:text-primary hover:ring-primary/40"
                    >
                      {f.label}
                    </span>
                  ))}
                </div>
                <div className="mt-8 [&_label]:text-foreground [&_input]:bg-card [&_input]:text-foreground [&_[data-slot=select-trigger]]:bg-card [&_[data-slot=select-trigger]]:text-foreground">
                  {children}
                </div>
                </div>
              </article>

              {/* Right: teaser card */}
              {content?.teaser && (
                <aside className="relative hidden overflow-hidden rounded-3xl p-6 shadow-2xl sm:p-8 lg:block bg-card text-white ring-1 ring-white/5 animate-fade-in [animation-delay:120ms]">
                  <div
                    aria-hidden
                    className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-primary/20 blur-3xl animate-[pulse_6s_ease-in-out_infinite]"
                  />
                  <div
                    aria-hidden
                    className="absolute -bottom-24 -left-10 h-64 w-64 rounded-full bg-primary/10 blur-3xl animate-[pulse_8s_ease-in-out_infinite]"
                  />
                  <div className="relative">
                    <span className="inline-flex items-center rounded-full bg-card/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-white ring-1 ring-inset ring-white/15">
                      {content.teaser.eyebrow}
                    </span>
                    <h2 className="mt-4 text-2xl font-semibold tracking-tight leading-tight">
                      {content.teaser.title}
                    </h2>
                    <p className="mt-2 text-sm text-white/80">{content.teaser.body}</p>

                    <div className="mt-6 grid grid-cols-2 gap-3">
                      <div className="rounded-2xl bg-card/95 p-4 text-foreground">
                        <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                          {content.teaser.inputLabel}
                        </div>
                        <div className="mt-1 text-sm font-bold">
                          {content.teaser.inputValue}
                        </div>
                      </div>
                      <div className="rounded-2xl bg-card/95 p-4 text-foreground">
                        <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                          {content.teaser.goodForLabel}
                        </div>
                        <div className="mt-1 text-sm font-bold">
                          {content.teaser.goodForValue}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 rounded-2xl bg-background/80 p-4 text-white ring-1 ring-white/5">
                      <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-primary">
                        {content.teaser.insightTitle}
                      </div>
                      <p className="mt-1 text-sm text-white/90">
                        {content.teaser.insightBody}
                      </p>
                    </div>

                    <Link
                      to="/coach"
                      hash="contact"
                      className="mt-4 inline-flex w-full items-center justify-center rounded-2xl bg-primary px-4 py-3 text-sm font-semibold uppercase tracking-wider text-white shadow-lg transition-all hover:opacity-90 "
                    >
                      {content.teaser.ctaLabel}
                    </Link>
                  </div>
                </aside>
              )}
            </div>

            {/* Trust strip */}
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { icon: Sparkles, label: "Science-based" },
                { icon: Zap, label: "Instant results" },
                { icon: ShieldCheck, label: "No signup" },
                { icon: Award, label: "Coach-reviewed" },
              ].map((t, i) => (
                <div
                  key={t.label}
                  className="flex items-center gap-2 rounded-2xl bg-card/5 px-4 py-3 text-sm text-white/85 ring-1 ring-white/10 backdrop-blur-sm transition-colors hover:bg-card/10 animate-fade-in"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <t.icon className="h-4 w-4 text-primary" />
                  <span className="font-medium">{t.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Semantic content sections */}
        <div className="mx-auto mt-10 max-w-6xl space-y-6 px-4 sm:px-6">
          {/* How it works stepper */}
          <section className="rounded-3xl bg-card p-6 text-foreground shadow-xl sm:p-8 animate-fade-in">
            <AccentBar />
            <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
              How this calculator works
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {[
                { icon: PencilLine, title: "1. Enter your details", body: "A few fields — height, weight, goal. No signup, nothing stored." },
                { icon: CalcIcon, title: "2. Get instant numbers", body: "We compute using validated formulas the moment you type." },
                { icon: Target, title: "3. Apply to your plan", body: "Use the result as the anchor for your training and nutrition." },
              ].map((s) => (
                <div key={s.title} className="group relative rounded-2xl border border-border bg-muted p-5 transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-md">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white shadow-md">
                    <s.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-sm font-semibold text-foreground">{s.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Method / formula card */}
          {howItWorks && (
            <section className="rounded-3xl bg-card p-6 text-white shadow-xl ring-1 ring-white/5 sm:p-8 animate-fade-in">
              <AccentBar />
              <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">The method behind the number</h2>
              <div className="mt-4 rounded-2xl bg-background/60 p-5 text-sm leading-relaxed text-white/85 ring-1 ring-white/10 [&_.font-mono]:text-primary">
                {howItWorks}
              </div>
            </section>
          )}

          {content?.meaning && (
            <section className="rounded-3xl bg-card p-6 text-foreground shadow-xl sm:p-8 animate-fade-in">
              <AccentBar />
              <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                {content.meaning.title}
              </h2>
              <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
                {content.meaning.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </section>
          )}

          {content?.benefits && (
            <section className="rounded-3xl bg-card p-6 text-foreground shadow-xl sm:p-8 animate-fade-in">
              <AccentBar />
              <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                {content.benefits.title}
              </h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                {content.benefits.items.map((b, i) => (
                  <div
                    key={b.title}
                    className="rounded-2xl border border-border bg-muted p-5 transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-md animate-fade-in"
                    style={{ animationDelay: `${i * 90}ms` }}
                  >
                    <h3 className="text-sm font-semibold text-foreground">{b.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {b.body}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Use cases */}
          <section className="rounded-3xl bg-card p-6 text-foreground shadow-xl sm:p-8 animate-fade-in">
            <AccentBar />
            <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">Who this is for</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              {[
                { title: "Fat loss phase", body: "Anchor your calorie and protein targets so you cut fat without losing muscle." },
                { title: "Muscle building", body: "Set a surplus that actually grows tissue instead of just adding fat." },
                { title: "Maintenance / recomp", body: "Hold body weight while slowly improving body composition and performance." },
              ].map((u, i) => (
                <div
                  key={u.title}
                  className="rounded-2xl bg-card p-5 ring-1 ring-border transition-all hover:-translate-y-0.5 hover:ring-orange-300 hover:shadow-md animate-fade-in"
                  style={{ animationDelay: `${i * 90}ms` }}
                >
                  <h3 className="text-sm font-semibold text-foreground">{u.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{u.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Coach quote */}
          <section className="relative overflow-hidden rounded-3xl p-[1px] shadow-xl animate-fade-in">
            <div aria-hidden className="absolute inset-0 bg-primary opacity-90" />
            <div className="relative rounded-[calc(1.5rem-1px)] bg-background p-6 text-white sm:p-8">
              <div className="text-4xl leading-none text-primary">“</div>
              <blockquote className="mt-2 text-lg font-medium leading-relaxed text-white/90 sm:text-xl">
                Numbers start the plan — behavior finishes it. A calculator gives you the anchor; consistency does the rest.
              </blockquote>
              <div className="mt-4 text-xs uppercase tracking-[0.15em] text-white/60">— CoachProAI</div>
            </div>
          </section>

          {faqItems.length > 0 && (
            <section className="rounded-3xl bg-card p-6 text-foreground shadow-xl sm:p-8 animate-fade-in">
              <AccentBar />
              <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                Frequently asked questions
              </h2>
              <dl className="mt-5 divide-y divide-border">
                {faqItems.map((f) => (
                  <div key={f.q} className="group py-4 first:pt-0 last:pb-0 transition-colors">
                    <dt className="text-sm font-semibold text-foreground">{f.q}</dt>
                    <dd className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {f.a}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          {related.length > 0 && (
            <section className="rounded-3xl bg-card p-6 text-foreground shadow-xl sm:p-8 animate-fade-in">
              <AccentBar />
              <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                Try more CoachProAI calculators
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Internal linking matters. These related calculator pages help users continue their
                journey and help search engines understand your topic cluster.
              </p>
              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                {related.map((r) => (
                  <a
                    key={r.slug}
                    href={`/${r.slug}`}
                    className="group rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-lg"
                  >
                    <div className="text-sm font-semibold text-foreground group-hover:text-primary">
                      {r.short}
                    </div>
                    <div className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                      {r.description}
                    </div>
                  </a>
                ))}
              </div>
            </section>
          )}

          {/* Share bar */}
          <ShareBar slug={slug} title={headline} />

          {content?.cta && (
            <section className="relative overflow-hidden rounded-3xl bg-background p-6 text-white shadow-2xl sm:p-10 ring-1 ring-white/5 animate-fade-in">
              <div aria-hidden className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl animate-[pulse_7s_ease-in-out_infinite]" />
              <div aria-hidden className="absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl animate-[pulse_9s_ease-in-out_infinite]" />
              <h2 className="relative text-2xl font-semibold tracking-tight sm:text-3xl">{content.cta.title}</h2>
              <p className="relative mt-3 max-w-2xl text-sm text-white/75 sm:text-base">
                {content.cta.body}
              </p>
              <div className="relative mt-6 flex flex-wrap gap-3">
                <Link
                  to="/coach"
                  hash="contact"
                  className="inline-flex items-center rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold uppercase tracking-wider text-white shadow-lg transition-all hover:opacity-90 "
                >
                  {content.cta.primary}
                </Link>
                <a
                  href="/"
                  className="inline-flex items-center rounded-xl border border-white/15 bg-card/5 px-5 py-2.5 text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-card/10"
                >
                  {content.cta.secondary}
                </a>
              </div>
            </section>
          )}

          {content?.disclaimer && (
            <p className="pt-4 text-xs leading-relaxed text-muted-foreground">{content.disclaimer}</p>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

function ShareBar({ slug, title }: { slug: string; title: string }) {
  const path = `/${slug}`;
  const copy = () => {
    if (typeof window === "undefined") return;
    const url = window.location.origin + path;
    if (navigator.share) {
      navigator.share({ title, url }).catch(() => {
        navigator.clipboard?.writeText(url);
      });
    } else {
      navigator.clipboard?.writeText(url);
    }
  };
  const twitterHref = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(path)}`;
  const waHref = `https://wa.me/?text=${encodeURIComponent(title + " " + path)}`;
  return (
    <section className="flex flex-wrap items-center justify-between gap-3 rounded-3xl bg-card/5 p-5 text-white ring-1 ring-white/10 backdrop-blur-sm animate-fade-in">
      <div className="flex items-center gap-2 text-sm">
        <Share2 className="h-4 w-4 text-primary" />
        <span className="font-medium">Found this useful? Share it</span>
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={copy}
          className="inline-flex items-center gap-1.5 rounded-xl bg-card/10 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-white ring-1 ring-white/10 transition-colors hover:bg-card/20"
        >
          <Link2 className="h-3.5 w-3.5" /> Copy link
        </button>
        <a
          href={twitterHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-xl bg-card/10 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-white ring-1 ring-white/10 transition-colors hover:bg-card/20"
        >
          <Twitter className="h-3.5 w-3.5" /> Twitter
        </a>
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-xl bg-card/10 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-white ring-1 ring-white/10 transition-colors hover:bg-card/20"
        >
          <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
        </a>
      </div>
    </section>
  );
}

// Build JSON-LD scripts array for a route head()
export function calcJsonLd(slug: string, title: string, description: string) {
  return [
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: title,
        applicationCategory: "HealthApplication",
        operatingSystem: "Any",
        url: `/${slug}`,
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        description,
      }),
    },
  ];
}

// Common head() builder
export function calcHead(slug: string, title: string, description: string) {
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `/${slug}` },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: `/${slug}` }],
    scripts: calcJsonLd(slug, title, description),
  };
}
