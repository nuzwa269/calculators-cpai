import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { CalcLayout, Metric, calcHead } from "@/components/calc-layout";
import { PersonFields, DEFAULT_PERSON } from "@/components/person-fields";
import { bmrMifflin, tdee, bodyRecomp } from "@/lib/calculators";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const SLUG = "body-recomposition";
const TITLE = "Body Recomposition Calculator — Lose Fat & Build Muscle";
const DESC = "Plan a training/rest-day calorie cycle to lose fat and gain muscle at the same time — the body recomp approach.";

export const Route = createFileRoute("/body-recomposition")({
  head: () => calcHead(SLUG, TITLE, DESC),
  component: Page,
});

function Page() {
  const [p, setP] = useState(DEFAULT_PERSON);
  const [bf, setBf] = useState(20);
  const r = useMemo(() => {
    const t = tdee(bmrMifflin(p.sex, p.weight, p.height, p.age), p.activity);
    return bodyRecomp(t, p.weight, bf);
  }, [p, bf]);
  return (
    <CalcLayout
      slug={SLUG}
      category="composition"
      title="Body Recomposition Calculator"
      intro="Recomp works best when you're new to lifting, returning from a break, or above 15% body fat. This plan uses calorie cycling — small surplus on training days, deficit on rest days."
      howItWorks={
        <p>Training days: TDEE + 5% (fuel muscle protein synthesis). Rest days: TDEE − 15% (encourage fat loss). Protein stays high (2.4 g/kg) every day to protect and build muscle.</p>
      }
      faq={[
        { q: "How fast does recomp work?", a: "Slow — think 4–6 months for visible change. It's more sustainable than aggressive cuts or bulks." },
        { q: "Do I really need to weigh food?", a: "For recomp, yes. The margins are small; guessing calories usually kills the result." },
      ]}
    >
      <PersonFields value={p} onChange={setP} />
      <div className="mt-4 space-y-2">
        <Label htmlFor="bf">Current body fat %</Label>
        <Input id="bf" type="number" min={5} max={50} value={bf} onChange={(e) => setBf(Number(e.target.value))} />
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <Metric label="Training-day calories" value={`${r.trainingCalories} kcal`} primary />
        <Metric label="Rest-day calories" value={`${r.restCalories} kcal`} />
        <Metric label="Protein (daily)" value={`${r.proteinG} g`} />
        <Metric label="Fat (daily)" value={`${r.fatG} g`} />
        <Metric label="Carbs — training" value={`${r.carbTraining} g`} />
        <Metric label="Carbs — rest" value={`${r.carbRest} g`} />
      </div>
      <div className="mt-4 rounded-lg bg-muted/50 p-4 text-sm text-muted-foreground">
        Estimated timeline to see clear change: <strong className="text-foreground">{r.timelineWeeks} weeks</strong>.
      </div>
    </CalcLayout>
  );
}
