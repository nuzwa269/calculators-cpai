import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { CalcLayout, Metric, calcHead } from "@/components/calc-layout";
import { PersonFields, DEFAULT_PERSON } from "@/components/person-fields";
import { bmrMifflin, tdee, ACTIVITY_MULTIPLIERS } from "@/lib/calculators";

const SLUG = "tdee";
const TITLE = "TDEE Calculator — Total Daily Energy Expenditure";
const DESC =
  "Calculate your Total Daily Energy Expenditure (TDEE) — the calories you burn each day — using the Mifflin-St Jeor formula and your activity level.";

export const Route = createFileRoute("/tdee")({
  head: () => calcHead(SLUG, TITLE, DESC),
  component: Page,
});

function Page() {
  const [p, setP] = useState(DEFAULT_PERSON);
  const result = useMemo(() => {
    const bmr = bmrMifflin(p.sex, p.weight, p.height, p.age);
    return { bmr: Math.round(bmr), tdee: Math.round(tdee(bmr, p.activity)) };
  }, [p]);
  return (
    <CalcLayout
      slug={SLUG}
      category="nutrition"
      title="TDEE Calculator"
      intro="Estimate the calories you burn each day. TDEE is the foundation of every cut, bulk, or maintenance plan."
      howItWorks={
        <p>
          We calculate BMR (Basal Metabolic Rate) with the Mifflin-St Jeor equation, then multiply
          by your activity multiplier ({ACTIVITY_MULTIPLIERS.sedentary}–{ACTIVITY_MULTIPLIERS.very_active}) to
          estimate total daily calories burned including movement and workouts.
        </p>
      }
      faq={[
        { q: "How accurate is a TDEE calculator?", a: "Within ±10% for most people. Track weight for 2 weeks, then adjust calories by 100–200 based on actual results." },
        { q: "Should I eat at my TDEE?", a: "Eat at TDEE to maintain weight, subtract 300–500 for fat loss, or add 200–400 for a lean bulk." },
      ]}
    >
      <PersonFields value={p} onChange={setP} />
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <Metric label="BMR (calories at rest)" value={`${result.bmr} kcal/day`} />
        <Metric label="TDEE (total daily burn)" value={`${result.tdee} kcal/day`} primary />
      </div>
      <div className="mt-4 rounded-lg bg-muted/50 p-4 text-sm text-muted-foreground">
        <p><strong className="text-foreground">To lose fat:</strong> eat {result.tdee - 500}–{result.tdee - 300} kcal/day.</p>
        <p className="mt-1"><strong className="text-foreground">To gain muscle:</strong> eat {result.tdee + 200}–{result.tdee + 400} kcal/day.</p>
      </div>
    </CalcLayout>
  );
}
