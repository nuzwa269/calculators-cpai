import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { CalcLayout, Metric, calcHead } from "@/components/calc-layout";
import { bodyFatNavy, type Sex } from "@/lib/calculators";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SLUG = "body-fat";
const TITLE = "Body Fat Percentage Calculator (US Navy Method)";
const DESC = "Estimate your body fat percentage using the US Navy method — neck, waist, and hip (for women) circumferences.";

export const Route = createFileRoute("/body-fat")({
  head: () => calcHead(SLUG, TITLE, DESC),
  component: Page,
});

function Page() {
  const [sex, setSex] = useState<Sex>("male");
  const [height, setHeight] = useState(175);
  const [neck, setNeck] = useState(38);
  const [waist, setWaist] = useState(85);
  const [hip, setHip] = useState(95);
  const bf = useMemo(() => bodyFatNavy(sex, height, neck, waist, sex === "female" ? hip : undefined), [sex, height, neck, waist, hip]);
  const category = bf < 10 ? "Essential / very lean" : bf < 15 ? "Athletic" : bf < 20 ? "Fit" : bf < 25 ? "Average" : "Above average";
  return (
    <CalcLayout
      slug={SLUG}
      category="composition"
      title="Body Fat Percentage Calculator"
      intro="Measure your neck and waist (and hip for women) with a soft tape and enter the numbers below. Uses the US Navy formula — no scale or calipers needed."
      howItWorks={<p>Measurements: neck below larynx; waist at narrowest point (men: at navel); hip at widest point. Accuracy ±3–4% vs DEXA.</p>}
      faq={[
        { q: "How does this compare to a scale?", a: "Bioimpedance scales are noisy day-to-day. The Navy tape method is more repeatable if you measure the same way each time." },
        { q: "What body fat % should I aim for?", a: "Healthy ranges: men 10–20%, women 18–28%. Athletic looks: men ~10–14%, women ~18–22%." },
      ]}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="sx">Sex</Label>
          <Select value={sex} onValueChange={(v) => setSex(v as Sex)}>
            <SelectTrigger id="sx"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="h">Height (cm)</Label>
          <Input id="h" type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="n">Neck (cm)</Label>
          <Input id="n" type="number" step={0.1} value={neck} onChange={(e) => setNeck(Number(e.target.value))} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="wt">Waist (cm)</Label>
          <Input id="wt" type="number" step={0.1} value={waist} onChange={(e) => setWaist(Number(e.target.value))} />
        </div>
        {sex === "female" && (
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="hp">Hip (cm)</Label>
            <Input id="hp" type="number" step={0.1} value={hip} onChange={(e) => setHip(Number(e.target.value))} />
          </div>
        )}
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <Metric label="Body fat" value={`${bf.toFixed(1)}%`} primary />
        <Metric label="Category" value={category} />
      </div>
    </CalcLayout>
  );
}
