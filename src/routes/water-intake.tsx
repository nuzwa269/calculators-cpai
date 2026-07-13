import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { CalcLayout, Metric, calcHead } from "@/components/calc-layout";
import { waterIntake, type Climate } from "@/lib/calculators";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SLUG = "water-intake";
const TITLE = "Water Intake Calculator — Daily Hydration Needs";
const DESC = "Personalized daily water intake target based on your bodyweight, activity minutes, and climate.";

export const Route = createFileRoute("/water-intake")({
  head: () => calcHead(SLUG, TITLE, DESC),
  component: Page,
});

function Page() {
  const [weight, setWeight] = useState(75);
  const [activityMin, setActivityMin] = useState(45);
  const [climate, setClimate] = useState<Climate>("moderate");
  const r = useMemo(() => waterIntake(weight, activityMin, climate), [weight, activityMin, climate]);
  return (
    <CalcLayout
      slug={SLUG}
      category="nutrition"
      title="Water Intake Calculator"
      intro="How much water should you drink today? A quick estimate based on your bodyweight, workout time, and the weather."
      howItWorks={
        <p>Base rule: ~35 ml per kg of bodyweight. Add ~350 ml per 30 min of exercise. Multiply by 0.95 (cool) to 1.15 (hot).</p>
      }
      faq={[
        { q: "Does coffee count?", a: "Yes — recent research shows caffeinated drinks hydrate almost as well as water in habitual users." },
        { q: "Can you drink too much?", a: "Yes, hyponatremia is real but rare — usually only in endurance events with no electrolytes." },
      ]}
    >
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="w">Weight (kg)</Label>
          <Input id="w" type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value))} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="a">Exercise (min/day)</Label>
          <Input id="a" type="number" min={0} max={300} value={activityMin} onChange={(e) => setActivityMin(Number(e.target.value))} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="c">Climate</Label>
          <Select value={climate} onValueChange={(v) => setClimate(v as Climate)}>
            <SelectTrigger id="c"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="cool">Cool</SelectItem>
              <SelectItem value="moderate">Moderate</SelectItem>
              <SelectItem value="hot">Hot / humid</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <Metric label="Liters" value={`${r.liters.toFixed(1)} L`} primary />
        <Metric label="Cups (240 ml)" value={`${r.cups}`} />
        <Metric label="Fluid ounces" value={`${r.ounces} oz`} />
      </div>
    </CalcLayout>
  );
}
