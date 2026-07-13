// Registry of all calculators for home page cards, nav, and related-links.

export type CalcCategory = "nutrition" | "composition" | "training";

export interface CalculatorMeta {
  slug: string; // URL path without leading slash
  title: string;
  short: string; // card title
  description: string;
  category: CalcCategory;
}

export const CATEGORY_LABELS: Record<CalcCategory, string> = {
  nutrition: "Nutrition & Calories",
  composition: "Body Composition",
  training: "Training & Goals",
};

export const CALCULATORS: CalculatorMeta[] = [
  // Nutrition
  {
    slug: "tdee",
    short: "TDEE Calculator",
    title: "TDEE Calculator — Total Daily Energy Expenditure",
    description: "Estimate the calories you burn each day based on BMR and activity level.",
    category: "nutrition",
  },
  {
    slug: "bmr",
    short: "BMR Calculator",
    title: "BMR Calculator — Basal Metabolic Rate (Mifflin-St Jeor)",
    description: "Calories your body burns at rest to keep basic functions running.",
    category: "nutrition",
  },
  {
    slug: "calorie-deficit",
    short: "Calorie Deficit",
    title: "Calorie Deficit Calculator for Fat Loss",
    description: "Find the daily calorie target for mild, moderate, or aggressive fat loss.",
    category: "nutrition",
  },
  {
    slug: "macros",
    short: "Macro Calculator",
    title: "Macro Calculator — Protein, Carbs & Fat Split",
    description: "Get a personalized macro breakdown for cutting, maintenance, or bulking.",
    category: "nutrition",
  },
  {
    slug: "protein",
    short: "Protein Calculator",
    title: "Protein Calculator for Fat Loss & Muscle Gain",
    description: "Daily protein target in grams based on your bodyweight and goal.",
    category: "nutrition",
  },
  {
    slug: "water-intake",
    short: "Water Intake",
    title: "Water Intake Calculator (Daily Hydration Needs)",
    description: "Personalized daily water target based on bodyweight, activity, and climate.",
    category: "nutrition",
  },

  // Body composition
  {
    slug: "body-fat",
    short: "Body Fat %",
    title: "Body Fat Percentage Calculator (US Navy Method)",
    description: "Estimate your body fat using neck, waist, and hip measurements.",
    category: "composition",
  },
  {
    slug: "lean-body-mass",
    short: "Lean Body Mass",
    title: "Lean Body Mass Calculator (Boer Formula)",
    description: "Estimate the fat-free mass you carry so you can dial in protein and calories.",
    category: "composition",
  },
  {
    slug: "waist-to-hip-ratio",
    short: "Waist-to-Hip Ratio",
    title: "Waist-to-Hip Ratio Calculator",
    description: "Assess fat distribution and health risk using WHO cutoffs.",
    category: "composition",
  },
  {
    slug: "body-recomposition",
    short: "Body Recomposition",
    title: "Body Recomposition Calculator — Lose Fat & Build Muscle",
    description: "Plan a calorie cycle to lose fat and gain muscle at the same time.",
    category: "composition",
  },
  {
    slug: "fat-loss-timeline",
    short: "Fat Loss Timeline",
    title: "Fat Loss Timeline Calculator — How Long to Reach Your Goal",
    description: "Weeks to reach your goal weight at a given weekly deficit.",
    category: "composition",
  },

  // Training
  {
    slug: "one-rep-max",
    short: "1RM Calculator",
    title: "One Rep Max (1RM) Calculator — Epley & Brzycki",
    description: "Estimate your one-rep max and training percentages for every lift.",
    category: "training",
  },
  {
    slug: "lean-bulk",
    short: "Lean Bulk",
    title: "Lean Bulk Calculator — Calories & Macros for Muscle Gain",
    description: "Calorie surplus and macros for slow, clean muscle gain.",
    category: "training",
  },
  {
    slug: "plateau-fix",
    short: "Plateau Fix",
    title: "Weight Loss Plateau Calculator — Break the Stall",
    description: "Fix a fat-loss plateau with a calorie drop, step boost, or refeed day.",
    category: "training",
  },
  {
    slug: "reverse-diet",
    short: "Reverse Diet",
    title: "Reverse Diet Calculator — Rebuild Your Metabolism",
    description: "Weekly calorie schedule to move from a diet low back up to maintenance.",
    category: "training",
  },
];

export const CALCULATORS_BY_SLUG: Record<string, CalculatorMeta> = Object.fromEntries(
  CALCULATORS.map((c) => [c.slug, c]),
);

export function calculatorsByCategory(cat: CalcCategory) {
  return CALCULATORS.filter((c) => c.category === cat);
}

export function relatedCalculators(slug: string, limit = 3): CalculatorMeta[] {
  const current = CALCULATORS_BY_SLUG[slug];
  if (!current) return [];
  const sameCat = CALCULATORS.filter((c) => c.slug !== slug && c.category === current.category);
  const other = CALCULATORS.filter((c) => c.slug !== slug && c.category !== current.category);
  return [...sameCat, ...other].slice(0, limit);
}
