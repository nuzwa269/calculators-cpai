import { defineTool } from "@lovable.dev/mcp-js";

const CALCULATORS = [
  { slug: "bmr", name: "BMR (Mifflin-St Jeor)", path: "/bmr" },
  { slug: "tdee", name: "TDEE", path: "/tdee" },
  { slug: "macros", name: "Macros", path: "/macros" },
  { slug: "protein", name: "Protein Intake", path: "/protein" },
  { slug: "body-fat", name: "Body Fat % (US Navy)", path: "/body-fat" },
  { slug: "lean-body-mass", name: "Lean Body Mass", path: "/lean-body-mass" },
  { slug: "ffmi", name: "FFMI", path: "/ffmi" },
  { slug: "waist-to-hip-ratio", name: "Waist-to-Hip Ratio", path: "/waist-to-hip-ratio" },
  { slug: "one-rep-max", name: "One-Rep Max", path: "/one-rep-max" },
  { slug: "water-intake", name: "Water Intake", path: "/water-intake" },
  { slug: "calorie-deficit", name: "Calorie Deficit", path: "/calorie-deficit" },
  { slug: "fat-loss-timeline", name: "Fat Loss Timeline", path: "/fat-loss-timeline" },
  { slug: "lean-bulk", name: "Lean Bulk", path: "/lean-bulk" },
  { slug: "body-recomposition", name: "Body Recomposition", path: "/body-recomposition" },
  { slug: "reverse-diet", name: "Reverse Diet", path: "/reverse-diet" },
  { slug: "plateau-fix", name: "Plateau Fix", path: "/plateau-fix" },
];

export default defineTool({
  name: "list_calculators",
  title: "List Calculators",
  description:
    "List every fitness/nutrition calculator this app publishes, with its slug and web path.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(CALCULATORS, null, 2) }],
    structuredContent: { calculators: CALCULATORS },
  }),
});