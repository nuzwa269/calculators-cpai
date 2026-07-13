import type { ReactNode } from "react";
import { relatedCalculators, type CalcCategory } from "@/lib/calculator-registry";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CALCULATOR_CONTENT } from "@/lib/calculator-content";
import { Link } from "@tanstack/react-router";

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
          ? "rounded-xl bg-gradient-primary p-4 text-primary-foreground shadow-elegant"
          : "rounded-xl border border-slate-200 bg-white p-4 text-slate-900"
      }
    >
      <div
        className={
          primary
            ? "text-xs uppercase tracking-wider text-white/80"
            : "text-xs uppercase tracking-wider text-slate-500"
        }
      >
        {label}
      </div>
      <div className="mt-1 text-2xl font-bold">{value}</div>
      {hint && (
        <div className={primary ? "mt-1 text-xs text-white/85" : "mt-1 text-xs text-slate-500"}>
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
      <main className="bg-neutral-950 pb-16">
        {/* Hero split: form (left, white) + teaser (right, gradient blue) */}
        <section className="relative">
          <div className="mx-auto max-w-6xl px-4 pt-8 sm:px-6 sm:pt-12">
            <a
              href="/"
              className="mb-4 inline-flex items-center text-xs font-medium tracking-wide text-neutral-400 transition-colors hover:text-white"
            >
              ← All calculators
            </a>
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
              {/* Left: form card */}
              <article className="relative overflow-hidden rounded-3xl bg-white p-6 text-neutral-900 shadow-2xl sm:p-8">
                <span className="inline-flex items-center rounded-full bg-orange-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-orange-700 ring-1 ring-inset ring-orange-100">
                  {content?.eyebrow ?? "FREE CALCULATOR"}
                </span>
                <h1 className="mt-4 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-[2.25rem] sm:leading-[1.1]">
                  {headline}
                </h1>
                <p className="mt-3 max-w-xl text-sm text-neutral-600 sm:text-[15px] sm:leading-relaxed">
                  {hook}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {features.map((f) => (
                    <span
                      key={f.label}
                      className="inline-flex items-center rounded-lg bg-neutral-100 px-3 py-1.5 text-xs font-medium text-neutral-700"
                    >
                      {f.label}
                    </span>
                  ))}
                </div>
                <div className="mt-8 [&_label]:text-neutral-700 [&_input]:bg-white [&_input]:text-neutral-900 [&_[data-slot=select-trigger]]:bg-white [&_[data-slot=select-trigger]]:text-neutral-900">
                  {children}
                </div>
              </article>

              {/* Right: teaser card */}
              {content?.teaser && (
                <aside className="relative hidden overflow-hidden rounded-3xl p-6 shadow-2xl sm:p-8 lg:block bg-gradient-to-br from-neutral-900 via-neutral-900 to-black text-white ring-1 ring-white/5">
                  <div
                    aria-hidden
                    className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-orange-500/25 blur-3xl"
                  />
                  <div
                    aria-hidden
                    className="absolute -bottom-24 -left-10 h-64 w-64 rounded-full bg-red-600/20 blur-3xl"
                  />
                  <div className="relative">
                    <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-white ring-1 ring-inset ring-white/15">
                      {content.teaser.eyebrow}
                    </span>
                    <h2 className="mt-4 text-2xl font-semibold tracking-tight leading-tight">
                      {content.teaser.title}
                    </h2>
                    <p className="mt-2 text-sm text-white/80">{content.teaser.body}</p>

                    <div className="mt-6 grid grid-cols-2 gap-3">
                      <div className="rounded-2xl bg-white/95 p-4 text-neutral-900">
                        <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-neutral-500">
                          {content.teaser.inputLabel}
                        </div>
                        <div className="mt-1 text-sm font-bold">
                          {content.teaser.inputValue}
                        </div>
                      </div>
                      <div className="rounded-2xl bg-white/95 p-4 text-neutral-900">
                        <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-neutral-500">
                          {content.teaser.goodForLabel}
                        </div>
                        <div className="mt-1 text-sm font-bold">
                          {content.teaser.goodForValue}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 rounded-2xl bg-black/60 p-4 text-white ring-1 ring-white/5">
                      <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-orange-400">
                        {content.teaser.insightTitle}
                      </div>
                      <p className="mt-1 text-sm text-white/90">
                        {content.teaser.insightBody}
                      </p>
                    </div>

                    <Link
                      to="/coach"
                      hash="contact"
                      className="mt-4 w-full rounded-2xl bg-gradient-to-r from-orange-500 to-red-600 px-4 py-3 text-sm font-semibold uppercase tracking-wider text-white shadow-lg transition-opacity hover:opacity-90"
                    >
                      {content.teaser.ctaLabel}
                    </Link>
                  </div>
                </aside>
              )}
            </div>
          </div>
        </section>

        {/* Semantic content sections */}
        <div className="mx-auto mt-10 max-w-6xl space-y-6 px-4 sm:px-6">
          {content?.meaning && (
            <section className="rounded-3xl bg-white p-6 text-neutral-900 shadow-xl sm:p-8">
              <h2 className="text-xl font-semibold tracking-tight text-neutral-950 sm:text-2xl">
                {content.meaning.title}
              </h2>
              <div className="mt-3 space-y-3 text-sm leading-relaxed text-neutral-600 sm:text-[15px]">
                {content.meaning.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </section>
          )}

          {content?.benefits && (
            <section className="rounded-3xl bg-white p-6 text-neutral-900 shadow-xl sm:p-8">
              <h2 className="text-xl font-semibold tracking-tight text-neutral-950 sm:text-2xl">
                {content.benefits.title}
              </h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                {content.benefits.items.map((b) => (
                  <div
                    key={b.title}
                    className="rounded-2xl border border-neutral-200/70 bg-neutral-50 p-5"
                  >
                    <h3 className="text-sm font-semibold text-neutral-950">{b.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-neutral-600">
                      {b.body}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {faqItems.length > 0 && (
            <section className="rounded-3xl bg-white p-6 text-neutral-900 shadow-xl sm:p-8">
              <h2 className="text-xl font-semibold tracking-tight text-neutral-950 sm:text-2xl">
                Frequently asked questions
              </h2>
              <dl className="mt-5 divide-y divide-neutral-200">
                {faqItems.map((f) => (
                  <div key={f.q} className="py-4 first:pt-0 last:pb-0">
                    <dt className="text-sm font-semibold text-neutral-950">{f.q}</dt>
                    <dd className="mt-1.5 text-sm leading-relaxed text-neutral-600">
                      {f.a}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          {related.length > 0 && (
            <section className="rounded-3xl bg-white p-6 text-neutral-900 shadow-xl sm:p-8">
              <h2 className="text-xl font-semibold tracking-tight text-neutral-950 sm:text-2xl">
                Try more CoachProAI calculators
              </h2>
              <p className="mt-2 text-sm text-neutral-600">
                Internal linking matters. These related calculator pages help users continue their
                journey and help search engines understand your topic cluster.
              </p>
              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                {related.map((r) => (
                  <a
                    key={r.slug}
                    href={`/${r.slug}`}
                    className="group rounded-2xl border border-neutral-200 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-orange-500 hover:shadow-lg"
                  >
                    <div className="text-sm font-semibold text-neutral-950 group-hover:text-orange-600">
                      {r.short}
                    </div>
                    <div className="mt-1.5 text-xs leading-relaxed text-neutral-600">
                      {r.description}
                    </div>
                  </a>
                ))}
              </div>
            </section>
          )}

          {content?.cta && (
            <section className="relative overflow-hidden rounded-3xl bg-neutral-950 p-6 text-white shadow-2xl sm:p-10 ring-1 ring-white/5">
              <div aria-hidden className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-orange-500/25 blur-3xl" />
              <div aria-hidden className="absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-red-600/20 blur-3xl" />
              <h2 className="relative text-2xl font-semibold tracking-tight sm:text-3xl">{content.cta.title}</h2>
              <p className="relative mt-3 max-w-2xl text-sm text-white/75 sm:text-base">
                {content.cta.body}
              </p>
              <div className="relative mt-6 flex flex-wrap gap-3">
                <Link
                  to="/coach"
                  hash="contact"
                  className="inline-flex items-center rounded-xl bg-gradient-to-r from-orange-500 to-red-600 px-5 py-2.5 text-sm font-semibold uppercase tracking-wider text-white shadow-lg transition-opacity hover:opacity-90"
                >
                  {content.cta.primary}
                </Link>
                <a
                  href="/"
                  className="inline-flex items-center rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-white/10"
                >
                  {content.cta.secondary}
                </a>
              </div>
            </section>
          )}

          {content?.disclaimer && (
            <p className="pt-4 text-xs leading-relaxed text-neutral-400">{content.disclaimer}</p>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
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
