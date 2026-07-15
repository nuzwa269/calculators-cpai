import { CALCULATORS, CATEGORY_LABELS, calculatorsByCategory } from "@/lib/calculator-registry";

export function SiteFooter() {
  const cats: Array<"nutrition" | "composition" | "training"> = [
    "nutrition",
    "composition",
    "training",
  ];
  return (
    <footer className="mt-24 border-t border-border/60 bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
                C
              </div>
              <span className="text-sm font-bold">CoachProAI</span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Free, accurate fitness calculators built by CoachProAI to help you lose fat, build
              muscle, and stay consistent.
            </p>
          </div>
          {cats.map((c) => (
            <div key={c}>
              <h3 className="text-sm font-semibold text-foreground">{CATEGORY_LABELS[c]}</h3>
              <ul className="mt-3 space-y-2 text-sm">
                {calculatorsByCategory(c).map((cal) => (
                  <li key={cal.slug}>
                    <a
                      href={`/${cal.slug}`}
                      className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {cal.short}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} CoachProAI. All rights reserved.</p>
          <p>
            Educational estimates only — not medical advice. Consult a qualified professional for
            personalized guidance.
          </p>
        </div>
        <span className="sr-only">{CALCULATORS.length} calculators available.</span>
      </div>
    </footer>
  );
}
