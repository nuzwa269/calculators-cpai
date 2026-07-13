import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { CalcLayout, Metric, calcHead } from "@/components/calc-layout";
import { ffmi, type Sex } from "@/lib/calculators";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SLUG = "ffmi";
const TITLE = "FFMI Calculator — Fat-Free Mass Index & Muscle Level";
const DESC =
  "Calculate your Fat-Free Mass Index (FFMI) from weight, height, and body fat percentage to see how much muscle you carry relative to your frame.";

export const Route = createFileRoute("/ffmi")({
  head: () => calcHead(SLUG, TITLE, DESC),
  component: Page,
});

const LEVEL_LABELS: Record<string, string> = {
  below_average: "Below average",
  average: "Average",
  above_average: "Above average",
  muscular: "Muscular",
  very_muscular: "Very muscular",
  elite: "Elite / natural ceiling",
};

function Page() {
  const [sex, setSex] = useState<Sex>("male");
  const [weight, setWeight] = useState(75);
  const [height, setHeight] = useState(175);
  const [bf, setBf] = useState(18);
  const r = useMemo(() => ffmi(sex, weight, height, bf), [sex, weight, height, bf]);
  return (
    <CalcLayout
      slug={SLUG}
      category="composition"
      title="FFMI Calculator"
      intro="FFMI (Fat-Free Mass Index) tells you how much lean mass you carry for your height. It's a better muscle benchmark than BMI because it separates muscle from fat."
      howItWorks={
        <p>
          <span className="font-mono text-xs">LBM = weight × (1 − body fat%)</span>
          <br />
          <span className="font-mono text-xs">FFMI = LBM / height(m)²</span>
          <br />
          Normalized FFMI adjusts to a 1.8 m reference:{" "}
          <span className="font-mono text-xs">FFMI + 6.1 × (1.8 − height in m)</span>. Untrained men
          sit near 18–20, well-trained lifters 22–24, and a normalized value around 25 is the widely
          cited natural ceiling.
        </p>
      }
      faq={[
        {
          q: "Why use FFMI instead of BMI?",
          a: "BMI can't tell muscle from fat, so a lean, muscular lifter looks 'overweight'. FFMI uses body fat to isolate lean mass and gives a fairer picture of muscularity.",
        },
        {
          q: "How do I get my body fat %?",
          a: "Use our US Navy Body Fat calculator with tape measurements, or a DEXA/InBody scan for a more precise number.",
        },
        {
          q: "Is a normalized FFMI above 25 possible naturally?",
          a: "Rarely. Values persistently above ~25 (men) or ~22 (women) usually indicate exceptional genetics or performance enhancers.",
        },
      ]}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="s">Sex</Label>
          <Select value={sex} onValueChange={(v) => setSex(v as Sex)}>
            <SelectTrigger id="s">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="bf">Body fat %</Label>
          <Input
            id="bf"
            type="number"
            step="0.1"
            value={bf}
            onChange={(e) => setBf(Number(e.target.value))}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="w">Weight (kg)</Label>
          <Input
            id="w"
            type="number"
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="h">Height (cm)</Label>
          <Input
            id="h"
            type="number"
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
          />
        </div>
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <Metric label="FFMI" value={r.ffmi.toFixed(1)} primary />
        <Metric label="Normalized FFMI" value={r.normalized.toFixed(1)} hint="Adjusted to 1.8 m" />
        <Metric label="Lean body mass" value={`${r.lbmKg.toFixed(1)} kg`} />
      </div>
      <div className="mt-4">
        <Metric label="Muscularity level" value={LEVEL_LABELS[r.level]} />
      </div>
    </CalcLayout>
  );
}