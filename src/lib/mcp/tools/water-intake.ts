import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { waterIntake } from "@/lib/calculators";

export default defineTool({
  name: "calculate_water_intake",
  title: "Daily Water Intake",
  description:
    "Estimate daily water intake (ml, liters, cups, ounces) from bodyweight, activity minutes, and climate.",
  inputSchema: {
    weightKg: z.number().positive(),
    activityMin: z.number().min(0).describe("Minutes of physical activity per day."),
    climate: z.enum(["cool", "moderate", "hot"]),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ weightKg, activityMin, climate }) => {
    const result = waterIntake(weightKg, activityMin, climate);
    return {
      content: [
        { type: "text", text: `${result.liters.toFixed(2)} L / ${result.cups} cups per day` },
      ],
      structuredContent: result,
    };
  },
});