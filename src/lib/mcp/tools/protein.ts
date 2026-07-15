import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { protein } from "@/lib/calculators";

export default defineTool({
  name: "calculate_protein",
  title: "Calculate Daily Protein",
  description:
    "Calculate a daily protein target (grams) based on bodyweight and goal.",
  inputSchema: {
    weightKg: z.number().positive(),
    goal: z.enum(["fat_loss", "maintain", "muscle_gain"]),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ weightKg, goal }) => {
    const result = protein(weightKg, goal);
    return {
      content: [
        {
          type: "text",
          text: `${result.gramsPerDay} g/day (~${result.perMeal} g per meal, ${result.kcal} kcal)`,
        },
      ],
      structuredContent: result,
    };
  },
});