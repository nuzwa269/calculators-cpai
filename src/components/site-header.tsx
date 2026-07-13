import { Link } from "@tanstack/react-router";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground font-bold shadow-elegant">
            C
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-bold text-foreground">CoachProAI</span>
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
              Calculators
            </span>
          </div>
        </Link>
        <nav className="hidden items-center gap-6 text-sm md:flex">
          <Link
            to="/"
            hash="nutrition"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Nutrition
          </Link>
          <Link
            to="/"
            hash="composition"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Body Comp
          </Link>
          <Link
            to="/"
            hash="training"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Training
          </Link>
        </nav>
        <Link
          to="/"
          className="inline-flex items-center rounded-md border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-accent"
        >
          All calculators
        </Link>
      </div>
    </header>
  );
}
