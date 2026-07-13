import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { CalcLayout, Metric, calcHead } from "@/components/calc-layout";
import { fatLossTimeline } from "@/lib/calculators";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const SLUG = "fat-loss-timeline";
const TITLE = "Fat Loss Timeline Calculator — How Long to Reach Your Goal";
const DESC = "Estimate the number of weeks to reach your goal weight based on your daily calorie deficit.";

export const Route = createFileRoute("/fat-loss-timeline")({
  head: () => calcHead(SLUG, TITLE, DESC),
  component: Page,
});

function Page() {
  const [current, setCurrent] = useState(85);
  const [target, setTarget] = useState(75);
  const [deficit, setDeficit] = useState(500);
  const r = useMemo(() => fatLossTimeline(current, target, deficit), [current, target, deficit]);
  const weeklyLoss = ((deficit * 7) / 7700).toFixed(2);
  const goalDate = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + r.weeks * 7);
    return d.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
  }, [r.weeks]);
  return (
    <CalcLayout
      slug={SLUG}
      category="composition"
      title="Fat Loss Timeline Calculator"
      intro="How long until you hit your goal weight? Enter your current weight, target, and daily calorie deficit for a realistic timeline."
      howItWorks={<p>Uses the well-established 7,700 kcal ≈ 1 kg body fat estimate. Real-world results vary because of water and glycogen shifts — trust the trend over 2–4 weeks.</p>}
      faq={[
        { q: "What's a safe deficit?", a: "300–500 kcal/day is the sweet spot for most people. 750+ risks muscle loss and burnout." },
        { q: "Should I go faster?", a: "Only if you have a lot of fat to lose. Below 20% body fat, slow it down." },
      ]}
    >
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="c">Current weight (kg)</Label>
          <Input id="c" type="number" step={0.1} value={current} onChange={(e) => setCurrent(Number(e.target.value))} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="t">Goal weight (kg)</Label>
          <Input id="t" type="number" step={0.1} value={target} onChange={(e) => setTarget(Number(e.target.value))} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="d">Daily deficit (kcal)</Label>
          <Input id="d" type="number" min={100} max={1200} value={deficit} onChange={(e) => setDeficit(Number(e.target.value))} />
        </div>
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <Metric label="Weight to lose" value={`${r.toLose.toFixed(1)} kg`} />
        <Metric label="Timeline" value={`${r.weeks} weeks`} primary />
        <Metric label="Weekly loss" value={`${weeklyLoss} kg/wk`} />
      </div>
      {r.toLose > 0 && (
        <div className="mt-4 rounded-lg bg-muted/50 p-4 text-sm text-muted-foreground">
          Estimated goal date: <strong className="text-foreground">{goalDate}</strong>
        </div>
      )}
    </CalcLayout>
  );
}
