import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { CalcLayout, Metric, calcHead } from "@/components/calc-layout";
import { plateauFix } from "@/lib/calculators";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const SLUG = "plateau-fix";
const TITLE = "Weight Loss Plateau Calculator — Break the Stall";
const DESC = "Diagnose a weight-loss plateau and get a concrete action plan — calorie drop, step boost, and refeed timing.";

export const Route = createFileRoute("/plateau-fix")({
  head: () => calcHead(SLUG, TITLE, DESC),
  component: Page,
});

function Page() {
  const [calories, setCalories] = useState(1800);
  const [change, setChange] = useState(0.1);
  const [steps, setSteps] = useState(7000);
  const r = useMemo(() => plateauFix(calories, change, steps), [calories, change, steps]);
  return (
    <CalcLayout
      slug={SLUG}
      category="training"
      title="Weight Loss Plateau Calculator"
      intro="Stuck at the same weight for 2+ weeks despite eating in a deficit? This tool tells you if you've truly plateaued and what to change first."
      howItWorks={<p>If your 2-week weight change is smaller than ±0.3 kg, we suggest a 10% calorie drop, a 15% step increase, and one refeed day at maintenance to reset hunger hormones.</p>}
      faq={[
        { q: "Is it a real plateau?", a: "Only if you've been tracking accurately for 2+ weeks. Water and food weight can hide progress for 7–10 days." },
        { q: "What is a refeed?", a: "1 day eating at maintenance calories with higher carbs. Restores leptin, boosts training, and preserves adherence." },
      ]}
    >
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="c">Current daily calories</Label>
          <Input id="c" type="number" value={calories} onChange={(e) => setCalories(Number(e.target.value))} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="ch">2-week weight change (kg)</Label>
          <Input id="ch" type="number" step={0.1} value={change} onChange={(e) => setChange(Number(e.target.value))} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="st">Current daily steps</Label>
          <Input id="st" type="number" value={steps} onChange={(e) => setSteps(Number(e.target.value))} />
        </div>
      </div>
      <div className="mt-6">
        {r.isPlateau ? (
          <>
            <div className="rounded-lg bg-destructive/10 p-4 text-sm text-destructive">
              You're in a plateau. Here's the fix:
            </div>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              <Metric label="New daily calories" value={`${r.newCalories} kcal`} hint={`−${r.calorieDrop} kcal`} primary />
              <Metric label="New step goal" value={`${(steps + r.stepIncrease).toLocaleString()}`} hint={`+${r.stepIncrease.toLocaleString()}/day`} />
              <Metric label="Refeed" value={r.refeedDay ? "1 day/week" : "—"} hint="Maintenance calories, higher carbs" />
            </div>
          </>
        ) : (
          <div className="rounded-lg bg-green-500/10 p-4 text-sm text-green-700 dark:text-green-400">
            You're not in a plateau — you're still losing. Stay the course for another 1–2 weeks.
          </div>
        )}
      </div>
    </CalcLayout>
  );
}
