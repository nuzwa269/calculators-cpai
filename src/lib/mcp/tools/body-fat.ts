import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { bodyFatNavy } from "@/lib/calculators";

export default defineTool({
  name: "calculate_body_fat",
  title: "Estimate Body Fat %",
  description:
    "Estimate body fat percentage using the US Navy tape method. Requires hip circumference for females.",
  inputSchema: {
    sex: z.enum(["male", "female"]),
    heightCm: z.number().positive(),
    neckCm: z.number().positive(),
    waistCm: z.number().positive(),
    hipCm: z
      .number()
      .positive()
      .nullable()
      .describe("Hip circumference in cm. Required for female; pass null for male."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ sex, heightCm, neckCm, waistCm, hipCm }) => {
    const bf = bodyFatNavy(sex, heightCm, neckCm, waistCm, hipCm ?? undefined);
    const rounded = Math.round(bf * 10) / 10;
    return {
      content: [{ type: "text", text: `Body fat: ~${rounded}%` }],
      structuredContent: { bodyFatPct: rounded },
    };
  },
});