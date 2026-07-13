import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { CalcLayout, Metric, calcHead } from "@/components/calc-layout";
import { protein, type ProteinGoal } from "@/lib/calculators";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SLUG = "protein";
const TITLE = "Protein Calculator for Fat Loss & Muscle Gain";
const DESC = "Daily protein target in grams based on your bodyweight and goal — fat loss, maintenance, or muscle gain.";

export const Route = createFileRoute("/protein")({
  head: () => calcHead(SLUG, TITLE, DESC),
  component: Page,
});

function Page() {
  const [weight, setWeight] = useState(75);
  const [goal, setGoal] = useState<ProteinGoal>("fat_loss");
  const r = useMemo(() => protein(weight, goal), [weight, goal]);
  return (
    <CalcLayout
      slug={SLUG}
      category="nutrition"
      title="Protein Calculator"
      intro="How much protein do you actually need per day? Enter your bodyweight and goal for a science-backed target."
      howItWorks={
        <p>Ranges are based on meta-analyses (Morton 2018, Helms 2014): fat loss 2.2 g/kg, maintain 1.8 g/kg, muscle gain 2.0 g/kg. Higher intakes during a deficit preserve lean mass.</p>
      }
      faq={[
        { q: "Is too much protein bad?", a: "In healthy people, no. Even 3+ g/kg shows no adverse effects in the research." },
        { q: "Can I hit this from food alone?", a: "Yes — chicken, fish, eggs, dairy, tofu, lentils. A whey shake is convenient, not required." },
      ]}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="w">Weight (kg)</Label>
          <Input id="w" type="number" min={30} max={200} value={weight} onChange={(e) => setWeight(Number(e.target.value))} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="g">Goal</Label>
          <Select value={goal} onValueChange={(v) => setGoal(v as ProteinGoal)}>
            <SelectTrigger id="g"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="fat_loss">Fat loss (2.2 g/kg)</SelectItem>
              <SelectItem value="maintain">Maintain (1.8 g/kg)</SelectItem>
              <SelectItem value="muscle_gain">Muscle gain (2.0 g/kg)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <Metric label="Daily protein" value={`${r.gramsPerDay} g`} primary />
        <Metric label="Calories from protein" value={`${r.kcal} kcal`} />
        <Metric label="Per meal (÷4)" value={`${r.perMeal} g`} />
      </div>
    </CalcLayout>
  );
}
