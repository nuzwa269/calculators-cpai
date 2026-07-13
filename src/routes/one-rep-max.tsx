import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { CalcLayout, Metric, calcHead } from "@/components/calc-layout";
import { oneRepMax } from "@/lib/calculators";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const SLUG = "one-rep-max";
const TITLE = "One Rep Max (1RM) Calculator — Epley & Brzycki";
const DESC = "Estimate your one-rep max and training percentages (50–95%) for any lift using the Epley and Brzycki formulas.";

export const Route = createFileRoute("/one-rep-max")({
  head: () => calcHead(SLUG, TITLE, DESC),
  component: Page,
});

function Page() {
  const [weight, setWeight] = useState(100);
  const [reps, setReps] = useState(5);
  const r = useMemo(() => oneRepMax(weight, reps), [weight, reps]);
  return (
    <CalcLayout
      slug={SLUG}
      category="training"
      title="One Rep Max Calculator"
      intro="Enter the heaviest weight you lifted for a set of reps to estimate your 1RM and get a full percentage table for programming."
      howItWorks={<p>We average two standard formulas — Epley (weight × (1 + reps/30)) and Brzycki (weight × 36/(37−reps)). Most accurate below 10 reps.</p>}
      faq={[
        { q: "Which formula is best?", a: "Both are close for 3–8 reps. Average of the two is the safer estimate." },
        { q: "Can I test my true 1RM?", a: "Yes, but only after a proper warm-up and with a spotter. Estimates from doubles or triples are safer for most lifters." },
      ]}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="w">Weight lifted (kg or lb)</Label>
          <Input id="w" type="number" min={1} value={weight} onChange={(e) => setWeight(Number(e.target.value))} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="r">Reps performed</Label>
          <Input id="r" type="number" min={1} max={15} value={reps} onChange={(e) => setReps(Number(e.target.value))} />
        </div>
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <Metric label="Estimated 1RM (average)" value={`${r.average}`} primary />
        <Metric label="Epley" value={`${r.epley}`} />
        <Metric label="Brzycki" value={`${r.brzycki}`} />
      </div>
      <div className="mt-6">
        <h3 className="mb-2 text-sm font-semibold text-foreground">Training percentages</h3>
        <div className="overflow-hidden rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-3 py-2 text-left">%</th>
                <th className="px-3 py-2 text-left">Weight</th>
                <th className="px-3 py-2 text-left">Typical reps</th>
              </tr>
            </thead>
            <tbody>
              {r.percentages.map((p) => (
                <tr key={p.pct} className="border-t border-border">
                  <td className="px-3 py-2 font-medium">{p.pct}%</td>
                  <td className="px-3 py-2">{p.weight}</td>
                  <td className="px-3 py-2 text-muted-foreground">{repRange(p.pct)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </CalcLayout>
  );
}

function repRange(pct: number): string {
  if (pct >= 95) return "1";
  if (pct >= 90) return "2–3";
  if (pct >= 85) return "3–5";
  if (pct >= 80) return "5–7";
  if (pct >= 75) return "6–8";
  if (pct >= 70) return "8–10";
  if (pct >= 65) return "10–12";
  if (pct >= 60) return "12–15";
  return "15+";
}
