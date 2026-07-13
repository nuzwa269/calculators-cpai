import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { CalcLayout, Metric, calcHead } from "@/components/calc-layout";
import { leanBodyMass, type Sex } from "@/lib/calculators";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SLUG = "lean-body-mass";
const TITLE = "Lean Body Mass Calculator (Boer Formula)";
const DESC = "Estimate your lean body mass (fat-free mass) using the Boer formula from your height, weight, and sex.";

export const Route = createFileRoute("/lean-body-mass")({
  head: () => calcHead(SLUG, TITLE, DESC),
  component: Page,
});

function Page() {
  const [sex, setSex] = useState<Sex>("male");
  const [weight, setWeight] = useState(75);
  const [height, setHeight] = useState(175);
  const r = useMemo(() => leanBodyMass(sex, weight, height), [sex, weight, height]);
  return (
    <CalcLayout
      slug={SLUG}
      category="composition"
      title="Lean Body Mass Calculator"
      intro="Your lean body mass (LBM) is everything that isn't fat: muscle, bone, organs, water. Use it to dial in protein needs and set realistic muscle-gain goals."
      howItWorks={<p>Boer (1984) — validated for a wide range of adults:<br /><span className="font-mono text-xs">Male: 0.407 × kg + 0.267 × cm − 19.2</span><br /><span className="font-mono text-xs">Female: 0.252 × kg + 0.473 × cm − 48.3</span></p>}
      faq={[
        { q: "Why does LBM matter?", a: "Protein needs and drug doses scale with LBM, not total weight. It's also the number you want to protect during a cut." },
        { q: "How much LBM can I gain?", a: "Beginners: ~0.5–1 kg/month. Intermediate: half of that. Advanced: much less." },
      ]}
    >
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="s">Sex</Label>
          <Select value={sex} onValueChange={(v) => setSex(v as Sex)}>
            <SelectTrigger id="s"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="w">Weight (kg)</Label>
          <Input id="w" type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value))} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="h">Height (cm)</Label>
          <Input id="h" type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))} />
        </div>
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <Metric label="Lean body mass" value={`${r.lbm.toFixed(1)} kg`} primary />
        <Metric label="Estimated body fat" value={`${r.bodyFatKg.toFixed(1)} kg`} />
        <Metric label="Body fat %" value={`${r.bodyFatPct.toFixed(1)}%`} />
      </div>
    </CalcLayout>
  );
}
