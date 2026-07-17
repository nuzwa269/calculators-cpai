import { Link } from "@tanstack/react-router";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2 group">
          <img src="/logo.png" alt="CoachProAI" className="h-9 w-9 rounded-lg" />
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold tracking-tight text-foreground">CoachProAI</span>
            <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
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
          <Link
            to="/coach"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Coach
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            to="/coach"
            hash="contact"
            className="inline-flex items-center rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-white shadow-sm transition-opacity hover:opacity-90"
          >
            Book coach
          </Link>
        </div>
      </div>
    </header>
  );
}
