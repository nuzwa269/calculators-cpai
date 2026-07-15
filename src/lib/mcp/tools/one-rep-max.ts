import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { oneRepMax } from "@/lib/calculators";

export default defineTool({
  name: "calculate_one_rep_max",
  title: "Estimate 1-Rep Max",
  description:
    "Estimate one-rep max (1RM) from a lift's weight and rep count using the Epley and Brzycki formulas, plus a percentage table.",
  inputSchema: {
    weight: z.number().positive().describe("Weight lifted (any unit; output uses same unit)."),
    reps: z.number().int().min(1).max(15).describe("Reps performed (1-15)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ weight, reps }) => {
    const result = oneRepMax(weight, reps);
    return {
      content: [
        {
          type: "text",
          text: `1RM ~ ${result.average} (Epley ${result.epley}, Brzycki ${result.brzycki})`,
        },
      ],
      structuredContent: result,
    };
  },
});