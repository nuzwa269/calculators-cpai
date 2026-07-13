import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { CalcLayout, Metric, calcHead } from "@/components/calc-layout";
import { reverseDiet } from "@/lib/calculators";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const SLUG = "reverse-diet";
const TITLE = "Reverse Diet Calculator — Rebuild Your Metabolism";
const DESC = "Weekly calorie increase schedule to move from a low-calorie diet back up to maintenance without regaining fat.";

export const Route = createFileRoute("/reverse-diet")({
  head: () => calcHead(SLUG, TITLE, DESC),
  component: Page,
});

function Page() {
  const [current, setCurrent] = useState(1500);
  const [target, setTarget] = useState(2400);
  const [step, setStep] = useState(75);
  const r = useMemo(() => reverseDiet(current, target, step), [current, target, step]);
  return (
    <CalcLayout
      slug={SLUG}
      category="training"
      title="Reverse Diet Calculator"
      intro="Coming off a long cut? A reverse diet slowly raises calories week by week — restoring maintenance without piling back the fat."
      howItWorks={<p>Add 50–100 kcal/week (mostly from carbs) and track weight. If weight stays stable, keep climbing. If it drifts up, pause a week before continuing.</p>}
      faq={[
        { q: "How big should the weekly bump be?", a: "50 kcal/week is safest. 100 kcal/week is faster but more likely to add scale weight." },
        { q: "How long does it take?", a: "8–16 weeks is typical to move from a deep cut back to full maintenance." },
      ]}
    >
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="c">Current calories</Label>
          <Input id="c" type="number" value={current} onChange={(e) => setCurrent(Number(e.target.value))} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="t">Target maintenance</Label>
          <Input id="t" type="number" value={target} onChange={(e) => setTarget(Number(e.target.value))} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="s">Weekly increase</Label>
          <Input id="s" type="number" min={25} max={200} step={25} value={step} onChange={(e) => setStep(Number(e.target.value))} />
        </div>
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <Metric label="Calorie gap" value={`${r.gap} kcal`} />
        <Metric label="Estimated weeks" value={`${r.weeks}`} primary />
      </div>
      {r.schedule.length > 0 && (
        <div className="mt-6">
          <h3 className="mb-2 text-sm font-semibold text-foreground">Week-by-week schedule</h3>
          <div className="overflow-hidden rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-xs uppercase text-muted-foreground">
                <tr>
                  <th className="px-3 py-2 text-left">Week</th>
                  <th className="px-3 py-2 text-left">Daily calories</th>
                </tr>
              </thead>
              <tbody>
                {r.schedule.map((s) => (
                  <tr key={s.week} className="border-t border-border">
                    <td className="px-3 py-2 font-medium">Week {s.week}</td>
                    <td className="px-3 py-2">{s.calories} kcal</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </CalcLayout>
  );
}
