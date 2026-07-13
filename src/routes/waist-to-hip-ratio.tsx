import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { CalcLayout, Metric, calcHead } from "@/components/calc-layout";
import { waistHipRatio, type Sex } from "@/lib/calculators";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SLUG = "waist-to-hip-ratio";
const TITLE = "Waist-to-Hip Ratio Calculator";
const DESC = "Assess fat distribution and cardiovascular health risk using your waist and hip circumferences and WHO cutoffs.";

export const Route = createFileRoute("/waist-to-hip-ratio")({
  head: () => calcHead(SLUG, TITLE, DESC),
  component: Page,
});

function Page() {
  const [sex, setSex] = useState<Sex>("male");
  const [waist, setWaist] = useState(85);
  const [hip, setHip] = useState(95);
  const r = useMemo(() => waistHipRatio(sex, waist, hip), [sex, waist, hip]);
  const riskLabel = { low: "Low risk", moderate: "Moderate risk", high: "High risk" }[r.risk];
  return (
    <CalcLayout
      slug={SLUG}
      category="composition"
      title="Waist-to-Hip Ratio Calculator"
      intro="WHR is a simple, strong predictor of metabolic and cardiovascular risk — often more informative than BMI or bodyweight alone."
      howItWorks={<p>WHO cutoffs — men: &lt;0.9 low, 0.9–1.0 moderate, &gt;1.0 high. Women: &lt;0.8 low, 0.8–0.85 moderate, &gt;0.85 high.</p>}
      faq={[
        { q: "How do I measure?", a: "Waist: at the narrowest point, or 1 inch above the navel. Hip: at the widest point of the buttocks. Same tape, same posture." },
        { q: "Is WHR better than BMI?", a: "For predicting cardiovascular risk in adults, yes — several studies rank WHR ahead of BMI." },
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
          <Label htmlFor="w">Waist (cm)</Label>
          <Input id="w" type="number" step={0.1} value={waist} onChange={(e) => setWaist(Number(e.target.value))} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="h">Hip (cm)</Label>
          <Input id="h" type="number" step={0.1} value={hip} onChange={(e) => setHip(Number(e.target.value))} />
        </div>
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <Metric label="Your WHR" value={r.ratio.toFixed(2)} primary />
        <Metric label="Health risk" value={riskLabel} />
      </div>
    </CalcLayout>
  );
}
