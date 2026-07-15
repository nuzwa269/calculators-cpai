import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { bmrMifflin, tdee } from "@/lib/calculators";

export default defineTool({
  name: "calculate_tdee",
  title: "Calculate TDEE",
  description:
    "Calculate Total Daily Energy Expenditure (kcal/day) from Mifflin-St Jeor BMR and an activity level.",
  inputSchema: {
    sex: z.enum(["male", "female"]),
    weightKg: z.number().positive(),
    heightCm: z.number().positive(),
    age: z.number().int().positive(),
    activity: z
      .enum(["sedentary", "light", "moderate", "active", "very_active"])
      .describe("Weekly activity level."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ sex, weightKg, heightCm, age, activity }) => {
    const bmr = bmrMifflin(sex, weightKg, heightCm, age);
    const total = Math.round(tdee(bmr, activity));
    return {
      content: [
        { type: "text", text: `BMR: ${Math.round(bmr)} kcal/day, TDEE: ${total} kcal/day` },
      ],
      structuredContent: { bmr: Math.round(bmr), tdee: total },
    };
  },
});