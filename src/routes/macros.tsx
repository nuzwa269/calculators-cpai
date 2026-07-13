import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { CalcLayout, Metric, calcHead } from "@/components/calc-layout";
import { PersonFields, DEFAULT_PERSON } from "@/components/person-fields";
import { bmrMifflin, tdee, macros, type MacroGoal } from "@/lib/calculators";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const SLUG = "macros";
const TITLE = "Macro Calculator — Protein, Carbs & Fat Split";
const DESC =
  "Get a personalized macro breakdown (protein, carbs, fat) for cutting, maintenance, or bulking based on your TDEE and bodyweight.";

export const Route = createFileRoute("/macros")({
  head: () => calcHead(SLUG, TITLE, DESC),
  component: Page,
});

function Page() {
  const [p, setP] = useState(DEFAULT_PERSON);
  const [goal, setGoal] = useState<MacroGoal>("maintain");
  const r = useMemo(() => {
    const t = tdee(bmrMifflin(p.sex, p.weight, p.height, p.age), p.activity);
    return macros(t, p.weight, goal);
  }, [p, goal]);
  return (
    <CalcLayout
      slug={SLUG}
      category="nutrition"
      title="Macro Calculator"
      intro="Personalized macro split — protein, carbs, and fat — for your goal, calculated from your TDEE and bodyweight."
      howItWorks={
        <p>Protein is set per kg of bodyweight (higher on a cut to protect muscle). Fat is fixed at 25% of calories for hormonal health. Carbs fill the rest — the training fuel.</p>
      }
      faq={[
        { q: "Do I need to hit macros every day?", a: "Weekly averages matter most. Consistent protein daily; carbs and fat can flex around workouts." },
        { q: "Can I go lower on fat?", a: "20% of calories is a safe floor. Under that, hormones and satiety often suffer." },
      ]}
    >
      <PersonFields value={p} onChange={setP} />
      <div className="mt-4 space-y-2">
        <Label htmlFor="goal">Goal</Label>
        <Select value={goal} onValueChange={(v) => setGoal(v as MacroGoal)}>
          <SelectTrigger id="goal"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="cut">Cut (fat loss)</SelectItem>
            <SelectItem value="maintain">Maintain</SelectItem>
            <SelectItem value="bulk">Bulk (muscle gain)</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Metric label="Calories" value={`${r.calories} kcal`} primary />
        <Metric label="Protein" value={`${r.protein.g} g`} hint={`${r.protein.pct}% • ${r.protein.kcal} kcal`} />
        <Metric label="Carbs" value={`${r.carbs.g} g`} hint={`${r.carbs.pct}% • ${r.carbs.kcal} kcal`} />
        <Metric label="Fat" value={`${r.fat.g} g`} hint={`${r.fat.pct}% • ${r.fat.kcal} kcal`} />
      </div>
    </CalcLayout>
  );
}
