import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { bmrMifflin } from "@/lib/calculators";

export default defineTool({
  name: "calculate_bmr",
  title: "Calculate BMR",
  description:
    "Calculate Basal Metabolic Rate (kcal/day) using the Mifflin-St Jeor formula.",
  inputSchema: {
    sex: z.enum(["male", "female"]).describe("Biological sex."),
    weightKg: z.number().positive().describe("Weight in kilograms."),
    heightCm: z.number().positive().describe("Height in centimeters."),
    age: z.number().int().positive().describe("Age in years."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ sex, weightKg, heightCm, age }) => {
    const bmr = Math.round(bmrMifflin(sex, weightKg, heightCm, age));
    return {
      content: [{ type: "text", text: `BMR: ${bmr} kcal/day` }],
      structuredContent: { bmrKcalPerDay: bmr },
    };
  },
});