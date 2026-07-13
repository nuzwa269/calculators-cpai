// Pure calculator functions. No side effects, no I/O.
// All weights in kg, heights in cm unless stated.

export type Sex = "male" | "female";
export type Activity = "sedentary" | "light" | "moderate" | "active" | "very_active";
export type Units = "metric" | "imperial";

export const ACTIVITY_MULTIPLIERS: Record<Activity, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  very_active: 1.9,
};

export const ACTIVITY_LABELS: Record<Activity, string> = {
  sedentary: "Sedentary (little or no exercise)",
  light: "Lightly active (1–3 days/week)",
  moderate: "Moderately active (3–5 days/week)",
  active: "Very active (6–7 days/week)",
  very_active: "Extra active (physical job + training)",
};

// ---- unit conversions ----
export const lbToKg = (lb: number) => lb * 0.45359237;
export const kgToLb = (kg: number) => kg / 0.45359237;
export const inToCm = (inch: number) => inch * 2.54;
export const cmToIn = (cm: number) => cm / 2.54;
export const ftInToCm = (ft: number, inch: number) => (ft * 12 + inch) * 2.54;

// ---- BMR (Mifflin-St Jeor) ----
export function bmrMifflin(sex: Sex, weightKg: number, heightCm: number, age: number): number {
  const base = 10 * weightKg + 6.25 * heightCm - 5 * age;
  return sex === "male" ? base + 5 : base - 161;
}

// ---- TDEE ----
export function tdee(bmr: number, activity: Activity): number {
  return bmr * ACTIVITY_MULTIPLIERS[activity];
}

// ---- Calorie deficit ----
export type DeficitLevel = "mild" | "moderate" | "aggressive";
export const DEFICIT_PCT: Record<DeficitLevel, number> = {
  mild: 0.1,
  moderate: 0.2,
  aggressive: 0.25,
};
export function calorieDeficit(tdeeVal: number, level: DeficitLevel) {
  const pct = DEFICIT_PCT[level];
  const targetCalories = Math.round(tdeeVal * (1 - pct));
  const dailyDeficit = Math.round(tdeeVal - targetCalories);
  const weeklyLossKg = (dailyDeficit * 7) / 7700;
  return { targetCalories, dailyDeficit, weeklyLossKg };
}

// ---- Fat loss timeline ----
// 7700 kcal ~= 1 kg of fat
export function fatLossTimeline(currentKg: number, targetKg: number, weeklyDeficit: number) {
  const toLose = Math.max(0, currentKg - targetKg);
  const weeks = Math.ceil((toLose * 7700) / Math.max(1, weeklyDeficit));
  const weeksSafe = Math.min(weeks, 52 * 3);
  return { toLose, weeks: weeksSafe };
}

// ---- Plateau fix ----
export function plateauFix(
  currentCalories: number,
  weightChangeKg2Weeks: number,
  currentSteps: number,
) {
  // If weight change over 2 weeks is between -0.3 and +0.3 kg -> plateau.
  const isPlateau = Math.abs(weightChangeKg2Weeks) < 0.3;
  const calorieDrop = isPlateau ? Math.max(100, Math.round(currentCalories * 0.1)) : 0;
  const newCalories = currentCalories - calorieDrop;
  const stepIncrease = isPlateau ? Math.max(1000, Math.round(currentSteps * 0.15)) : 0;
  const refeedDay = isPlateau; // suggest 1 refeed day at maintenance
  return { isPlateau, newCalories, calorieDrop, stepIncrease, refeedDay };
}

// ---- Lean bulk ----
export type BulkSpeed = "conservative" | "standard" | "aggressive";
export const BULK_PCT: Record<BulkSpeed, number> = {
  conservative: 0.1,
  standard: 0.15,
  aggressive: 0.2,
};
export function leanBulk(tdeeVal: number, speed: BulkSpeed, weightKg: number) {
  const targetCalories = Math.round(tdeeVal * (1 + BULK_PCT[speed]));
  const proteinG = Math.round(weightKg * 2.0);
  const fatG = Math.round((targetCalories * 0.25) / 9);
  const carbG = Math.round((targetCalories - proteinG * 4 - fatG * 9) / 4);
  const weeklyGainKg = ((targetCalories - tdeeVal) * 7) / 7700;
  return { targetCalories, proteinG, fatG, carbG, weeklyGainKg };
}

// ---- Protein ----
export type ProteinGoal = "fat_loss" | "maintain" | "muscle_gain";
export const PROTEIN_FACTOR: Record<ProteinGoal, number> = {
  fat_loss: 2.2,
  maintain: 1.8,
  muscle_gain: 2.0,
};
export function protein(weightKg: number, goal: ProteinGoal) {
  const gramsPerDay = Math.round(weightKg * PROTEIN_FACTOR[goal]);
  const kcal = gramsPerDay * 4;
  const perMeal = Math.round(gramsPerDay / 4);
  return { gramsPerDay, kcal, perMeal };
}

// ---- Macros ----
export type MacroGoal = "cut" | "maintain" | "bulk";
export function macros(tdeeVal: number, weightKg: number, goal: MacroGoal) {
  const adj = goal === "cut" ? 0.8 : goal === "bulk" ? 1.15 : 1;
  const calories = Math.round(tdeeVal * adj);
  const protG = Math.round(weightKg * (goal === "cut" ? 2.2 : 2.0));
  const fatG = Math.round((calories * 0.25) / 9);
  const carbG = Math.max(0, Math.round((calories - protG * 4 - fatG * 9) / 4));
  return {
    calories,
    protein: { g: protG, kcal: protG * 4, pct: Math.round(((protG * 4) / calories) * 100) },
    fat: { g: fatG, kcal: fatG * 9, pct: Math.round(((fatG * 9) / calories) * 100) },
    carbs: { g: carbG, kcal: carbG * 4, pct: Math.round(((carbG * 4) / calories) * 100) },
  };
}

// ---- Body fat % (US Navy) ----
export function bodyFatNavy(sex: Sex, heightCm: number, neckCm: number, waistCm: number, hipCm?: number) {
  let bf: number;
  if (sex === "male") {
    bf =
      495 /
        (1.0324 -
          0.19077 * Math.log10(waistCm - neckCm) +
          0.15456 * Math.log10(heightCm)) -
      450;
  } else {
    const hip = hipCm ?? waistCm;
    bf =
      495 /
        (1.29579 -
          0.35004 * Math.log10(waistCm + hip - neckCm) +
          0.221 * Math.log10(heightCm)) -
      450;
  }
  return Math.max(3, Math.min(60, bf));
}

// ---- One-rep max ----
export function oneRepMax(weight: number, reps: number) {
  const r = Math.max(1, Math.min(15, reps));
  const epley = weight * (1 + r / 30);
  const brzycki = weight * (36 / (37 - r));
  const average = (epley + brzycki) / 2;
  const percentages = [95, 90, 85, 80, 75, 70, 65, 60, 55, 50].map((pct) => ({
    pct,
    weight: Math.round(average * (pct / 100)),
  }));
  return { epley: Math.round(epley), brzycki: Math.round(brzycki), average: Math.round(average), percentages };
}

// ---- Lean body mass (Boer) ----
export function leanBodyMass(sex: Sex, weightKg: number, heightCm: number) {
  const lbm =
    sex === "male"
      ? 0.407 * weightKg + 0.267 * heightCm - 19.2
      : 0.252 * weightKg + 0.473 * heightCm - 48.3;
  const bodyFatKg = weightKg - lbm;
  const bodyFatPct = (bodyFatKg / weightKg) * 100;
  return { lbm, bodyFatKg, bodyFatPct };
}

// ---- FFMI (Fat-Free Mass Index) ----
// FFMI = LBM(kg) / height(m)^2. Normalized FFMI adjusts to 1.8m reference.
// Natural (drug-free) ceiling is generally cited around 25 for men.
export function ffmi(sex: Sex, weightKg: number, heightCm: number, bodyFatPct: number) {
  const bf = Math.max(3, Math.min(60, bodyFatPct));
  const lbmKg = weightKg * (1 - bf / 100);
  const heightM = heightCm / 100;
  const raw = lbmKg / (heightM * heightM);
  const normalized = raw + 6.1 * (1.8 - heightM);
  let level: "below_average" | "average" | "above_average" | "muscular" | "very_muscular" | "elite";
  const male = sex === "male";
  if (normalized < (male ? 18 : 15)) level = "below_average";
  else if (normalized < (male ? 20 : 17)) level = "average";
  else if (normalized < (male ? 22 : 19)) level = "above_average";
  else if (normalized < (male ? 23.5 : 20.5)) level = "muscular";
  else if (normalized < (male ? 25 : 22)) level = "very_muscular";
  else level = "elite";
  return { lbmKg, ffmi: raw, normalized, level };
}

// ---- Water intake ----
export type Climate = "cool" | "moderate" | "hot";
export function waterIntake(weightKg: number, activityMin: number, climate: Climate) {
  const base = weightKg * 35; // ml
  const activityAdd = (activityMin / 30) * 350;
  const climateMult = climate === "hot" ? 1.15 : climate === "cool" ? 0.95 : 1;
  const totalMl = Math.round((base + activityAdd) * climateMult);
  return {
    totalMl,
    liters: totalMl / 1000,
    cups: Math.round(totalMl / 240),
    ounces: Math.round(totalMl / 29.5735),
  };
}

// ---- Waist to hip ratio ----
export function waistHipRatio(sex: Sex, waistCm: number, hipCm: number) {
  const ratio = waistCm / hipCm;
  let risk: "low" | "moderate" | "high";
  if (sex === "male") {
    risk = ratio < 0.9 ? "low" : ratio < 1 ? "moderate" : "high";
  } else {
    risk = ratio < 0.8 ? "low" : ratio < 0.85 ? "moderate" : "high";
  }
  return { ratio, risk };
}

// ---- Body recomposition ----
export function bodyRecomp(tdeeVal: number, weightKg: number, bodyFatPct: number) {
  const trainingCalories = Math.round(tdeeVal * 1.05); // small surplus on training days
  const restCalories = Math.round(tdeeVal * 0.85); // deficit on rest days
  const proteinG = Math.round(weightKg * 2.4);
  const fatG = Math.round((tdeeVal * 0.25) / 9);
  const carbTraining = Math.round((trainingCalories - proteinG * 4 - fatG * 9) / 4);
  const carbRest = Math.max(0, Math.round((restCalories - proteinG * 4 - fatG * 9) / 4));
  const timelineWeeks = bodyFatPct > 20 ? 16 : bodyFatPct > 15 ? 20 : 24;
  return {
    trainingCalories,
    restCalories,
    proteinG,
    fatG,
    carbTraining,
    carbRest,
    timelineWeeks,
  };
}

// ---- Reverse diet ----
export function reverseDiet(currentCalories: number, targetTdee: number, weeklyIncrease: number) {
  const gap = Math.max(0, targetTdee - currentCalories);
  const weeks = Math.ceil(gap / weeklyIncrease);
  const schedule: { week: number; calories: number }[] = [];
  for (let w = 1; w <= Math.min(weeks, 20); w++) {
    schedule.push({
      week: w,
      calories: Math.min(targetTdee, currentCalories + weeklyIncrease * w),
    });
  }
  return { weeks, schedule, gap };
}
