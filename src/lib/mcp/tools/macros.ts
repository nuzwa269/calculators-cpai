import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { macros } from "@/lib/calculators";

export default defineTool({
  name: "calculate_macros",
  title: "Calculate Macros",
  description:
    "Calculate daily calorie target and protein/fat/carbohydrate macros for a cut, maintenance, or bulk goal.",
  inputSchema: {
    tdee: z.number().positive().describe("Total Daily Energy Expenditure in kcal/day."),
    weightKg: z.number().positive(),
    goal: z.enum(["cut", "maintain", "bulk"]),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ tdee, weightKg, goal }) => {
    const result = macros(tdee, weightKg, goal);
    return {
      content: [
        {
          type: "text",
          text: `${result.calories} kcal | P ${result.protein.g}g / F ${result.fat.g}g / C ${result.carbs.g}g`,
        },
      ],
      structuredContent: result,
    };
  },
});