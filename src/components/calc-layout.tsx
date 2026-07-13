import type { ReactNode } from "react";
import { relatedCalculators, type CalcCategory } from "@/lib/calculator-registry";
import { Card } from "@/components/ui/card";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

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
          ? "rounded-lg bg-gradient-primary p-4 text-primary-foreground shadow-elegant"
          : "rounded-lg border border-border bg-card p-4"
      }
    >
      <div
        className={
          primary
            ? "text-xs uppercase tracking-wider text-white/80"
            : "text-xs uppercase tracking-wider text-muted-foreground"
        }
      >
        {label}
      </div>
      <div className="mt-1 text-2xl font-bold">{value}</div>
      {hint && (
        <div className={primary ? "mt-1 text-xs text-white/85" : "mt-1 text-xs text-muted-foreground"}>
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
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
      <a
        href="/"
        className="mb-6 inline-flex items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        ← All calculators
      </a>
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{title}</h1>
        <p className="mt-3 max-w-2xl text-base text-muted-foreground">{intro}</p>
      </header>

      <Card className="p-6 shadow-card sm:p-8">{children}</Card>

      {howItWorks && (
        <section className="mt-12">
          <h2 className="text-xl font-semibold text-foreground">How it works</h2>
          <div className="mt-3 space-y-3 text-sm text-muted-foreground leading-relaxed">
            {howItWorks}
          </div>
        </section>
      )}

      {faq && faq.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-semibold text-foreground">Frequently asked questions</h2>
          <div className="mt-4 space-y-4">
            {faq.map((f) => (
              <div key={f.q} className="rounded-lg border border-border bg-card p-4">
                <h3 className="text-sm font-semibold text-foreground">{f.q}</h3>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-semibold text-foreground">Related calculators</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {related.map((r) => (
              <a
                key={r.slug}
                href={`/${r.slug}`}
                className="group rounded-lg border border-border bg-card p-4 transition-all hover:border-primary hover:shadow-elegant"
              >
                <div className="text-sm font-semibold text-foreground group-hover:text-primary">
                  {r.short}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">{r.description}</div>
              </a>
            ))}
          </div>
        </section>
      )}
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
