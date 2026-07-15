import { defineMcp } from "@lovable.dev/mcp-js";
import bmrTool from "./tools/bmr";
import tdeeTool from "./tools/tdee";
import macrosTool from "./tools/macros";
import proteinTool from "./tools/protein";
import bodyFatTool from "./tools/body-fat";
import oneRepMaxTool from "./tools/one-rep-max";
import waterIntakeTool from "./tools/water-intake";
import listCalculatorsTool from "./tools/list-calculators";

export default defineMcp({
  name: "fitness-calculators-mcp",
  title: "Fitness Calculators",
  version: "0.1.0",
  instructions:
    "Public fitness and nutrition calculators. Use `list_calculators` to discover what's available, then call a specific `calculate_*` tool with the required inputs (metric units: kg, cm). All tools are pure math and take no per-user data.",
  tools: [
    listCalculatorsTool,
    bmrTool,
    tdeeTool,
    macrosTool,
    proteinTool,
    bodyFatTool,
    oneRepMaxTool,
    waterIntakeTool,
  ],
});