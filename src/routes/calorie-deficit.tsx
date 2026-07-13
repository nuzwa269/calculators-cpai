import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { CalcLayout, Metric, calcHead } from "@/components/calc-layout";
import { PersonFields, DEFAULT_PERSON } from "@/components/person-fields";
import { bmrMifflin, tdee, calorieDeficit, type DeficitLevel } from "@/lib/calculators";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const SLUG = "calorie-deficit";
const TITLE = "Calorie Deficit Calculator for Fat Loss";
const DESC =
  "Calculate your daily calorie target for a mild, moderate, or aggressive calorie deficit and see your expected weekly fat loss.";

export const Route = createFileRoute("/calorie-deficit")({
  head: () => calcHead(SLUG, TITLE, DESC),
  component: Page,
});

function Page() {
  const [p, setP] = useState(DEFAULT_PERSON);
  const [level, setLevel] = useState<DeficitLevel>("moderate");
  const r = useMemo(() => {
    const t = tdee(bmrMifflin(p.sex, p.weight, p.height, p.age), p.activity);
    return { tdee: Math.round(t), ...calorieDeficit(t, level) };
  }, [p, level]);
  return (
    <CalcLayout
      slug={SLUG}
      category="nutrition"
      title="Calorie Deficit Calculator"
      intro="Enter your details and pick a deficit level. We'll give you a daily calorie target and your expected weekly fat loss."
      howItWorks={
        <p>
          Mild = 10% below TDEE (sustainable, slow). Moderate = 20% (standard cut). Aggressive = 25% (short cuts only — risks muscle loss). We use the 7,700 kcal ≈ 1 kg body-fat rule.
        </p>
      }
      faq={[
        { q: "How big should my deficit be?", a: "For most people, a 15–25% deficit balances speed and muscle retention. Below 20% body fat, stay conservative." },
        { q: "Why is my weight loss slower than predicted?", a: "Water retention, glycogen shifts, and NEAT drop distort short-term results. Judge over 2–4 weeks." },
      ]}
    >
      <PersonFields value={p} onChange={setP} />
      <div className="mt-4 space-y-2">
        <Label htmlFor="level">Deficit level</Label>
        <Select value={level} onValueChange={(v) => setLevel(v as DeficitLevel)}>
          <SelectTrigger id="level"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="mild">Mild (10%) — sustainable</SelectItem>
            <SelectItem value="moderate">Moderate (20%) — standard</SelectItem>
            <SelectItem value="aggressive">Aggressive (25%) — short cuts</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <Metric label="Maintenance" value={`${r.tdee} kcal`} />
        <Metric label="Target calories" value={`${r.targetCalories} kcal/day`} primary />
        <Metric label="Expected loss" value={`${r.weeklyLossKg.toFixed(2)} kg/wk`} />
      </div>
    </CalcLayout>
  );
}
