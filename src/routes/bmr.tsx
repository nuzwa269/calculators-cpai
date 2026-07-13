import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { CalcLayout, Metric, calcHead } from "@/components/calc-layout";
import { PersonFields, DEFAULT_PERSON } from "@/components/person-fields";
import { bmrMifflin } from "@/lib/calculators";

const SLUG = "bmr";
const TITLE = "BMR Calculator — Basal Metabolic Rate (Mifflin-St Jeor)";
const DESC =
  "Calculate your Basal Metabolic Rate (BMR) — the calories your body burns at complete rest — using the Mifflin-St Jeor equation.";

export const Route = createFileRoute("/bmr")({
  head: () => calcHead(SLUG, TITLE, DESC),
  component: Page,
});

function Page() {
  const [p, setP] = useState(DEFAULT_PERSON);
  const bmr = useMemo(() => Math.round(bmrMifflin(p.sex, p.weight, p.height, p.age)), [p]);
  return (
    <CalcLayout
      slug={SLUG}
      category="nutrition"
      title="BMR Calculator"
      intro="Your Basal Metabolic Rate is the number of calories your body needs just to keep you alive — breathing, circulating, thinking, regulating temperature."
      howItWorks={
        <>
          <p>Formula (Mifflin-St Jeor, 1990):</p>
          <p className="rounded bg-muted p-3 font-mono text-xs">
            Male: 10 × kg + 6.25 × cm − 5 × age + 5
            <br />
            Female: 10 × kg + 6.25 × cm − 5 × age − 161
          </p>
        </>
      }
      faq={[
        { q: "BMR vs TDEE?", a: "BMR is calories at complete rest. TDEE = BMR × activity multiplier and includes daily movement and exercise." },
        { q: "Why Mifflin-St Jeor?", a: "It's the most accurate general-population formula per multiple validation studies, more accurate than Harris-Benedict for modern populations." },
      ]}
    >
      <PersonFields value={p} onChange={setP} showActivity={false} />
      <div className="mt-6">
        <Metric label="Your BMR" value={`${bmr} kcal/day`} hint="Calories burned at complete rest" primary />
      </div>
    </CalcLayout>
  );
}
