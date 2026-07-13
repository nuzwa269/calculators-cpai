import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { CalcLayout, Metric, calcHead } from "@/components/calc-layout";
import { PersonFields, DEFAULT_PERSON } from "@/components/person-fields";
import { bmrMifflin, tdee, leanBulk, type BulkSpeed } from "@/lib/calculators";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SLUG = "lean-bulk";
const TITLE = "Lean Bulk Calculator — Calories & Macros for Muscle Gain";
const DESC = "Calorie surplus and macro split for a slow, clean lean bulk — muscle gain without unnecessary fat gain.";

export const Route = createFileRoute("/lean-bulk")({
  head: () => calcHead(SLUG, TITLE, DESC),
  component: Page,
});

function Page() {
  const [p, setP] = useState(DEFAULT_PERSON);
  const [speed, setSpeed] = useState<BulkSpeed>("standard");
  const r = useMemo(() => {
    const t = tdee(bmrMifflin(p.sex, p.weight, p.height, p.age), p.activity);
    return { tdee: Math.round(t), ...leanBulk(t, speed, p.weight) };
  }, [p, speed]);
  return (
    <CalcLayout
      slug={SLUG}
      category="training"
      title="Lean Bulk Calculator"
      intro="A lean bulk means gaining muscle with minimal fat — usually 0.25–0.5% of bodyweight per week. Enter your details and pick a bulk speed."
      howItWorks={<p>Conservative +10% above TDEE (~0.25% BW/wk), standard +15% (~0.4%), aggressive +20% (~0.5%+). Protein stays at 2 g/kg. Fat 25% of calories. Carbs fill the rest.</p>}
      faq={[
        { q: "How much can I actually gain?", a: "Beginners: up to 1 kg/month of muscle. Intermediate: half. Advanced: much less. Above that, extra calories become fat." },
        { q: "When do I stop bulking?", a: "When body fat approaches 15% (men) or 22% (women), switch to maintenance or a mini-cut." },
      ]}
    >
      <PersonFields value={p} onChange={setP} />
      <div className="mt-4 space-y-2">
        <Label htmlFor="sp">Bulk speed</Label>
        <Select value={speed} onValueChange={(v) => setSpeed(v as BulkSpeed)}>
          <SelectTrigger id="sp"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="conservative">Conservative (+10%) — cleanest</SelectItem>
            <SelectItem value="standard">Standard (+15%) — balanced</SelectItem>
            <SelectItem value="aggressive">Aggressive (+20%) — faster, more fat</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Metric label="Target calories" value={`${r.targetCalories} kcal`} primary />
        <Metric label="Protein" value={`${r.proteinG} g`} />
        <Metric label="Carbs" value={`${r.carbG} g`} />
        <Metric label="Fat" value={`${r.fatG} g`} />
      </div>
      <div className="mt-4 rounded-lg bg-muted/50 p-4 text-sm text-muted-foreground">
        Expected weekly gain: <strong className="text-foreground">{r.weeklyGainKg.toFixed(2)} kg/week</strong> (a mix of muscle, glycogen, and some fat).
      </div>
    </CalcLayout>
  );
}
