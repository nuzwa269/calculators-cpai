// Rich per-calculator content used by CalcLayout to render the full
// semantic page (hero, teaser, meaning, benefits, FAQ, CTA, disclaimer).
// Keyed by slug; every slug in CALCULATORS must exist here.

export interface CalcFeature {
  label: string;
}

export interface CalcBenefit {
  title: string;
  body: string;
}

export interface CalcFaq {
  q: string;
  a: string;
}

export interface CalcTeaser {
  eyebrow: string; // e.g. "Free estimate"
  title: string; // right card title
  body: string;
  inputLabel: string; // "Input options"
  inputValue: string; // "kg, lbs, cm, ft/in"
  goodForLabel: string; // "Good for"
  goodForValue: string; // "Fat loss and recomposition"
  insightTitle: string; // "Coach insight"
  insightBody: string;
  ctaLabel: string; // button text on teaser
}

export interface CalcCtaBanner {
  title: string;
  body: string;
  primary: string;
  secondary: string;
}

export interface CalcContent {
  eyebrow: string; // "FREE PROTEIN CALCULATOR"
  headline: string; // Big H1 question
  hook: string; // intro paragraph beneath H1
  features: [CalcFeature, CalcFeature, CalcFeature];
  meaning: { title: string; paragraphs: string[] };
  benefits: { title: string; items: [CalcBenefit, CalcBenefit, CalcBenefit] };
  faq: CalcFaq[];
  teaser: CalcTeaser;
  cta: CalcCtaBanner;
  disclaimer: string;
}

const DEFAULT_FEATURES: [CalcFeature, CalcFeature, CalcFeature] = [
  { label: "Works with kg or lbs" },
  { label: "Height in cm or ft + in" },
  { label: "Includes coaching insight" },
];

const DEFAULT_DISCLAIMER =
  "Disclaimer: This calculator provides educational estimates only and does not replace medical advice, diagnosis, or treatment.";

function cta(topic: string): CalcCtaBanner {
  return {
    title: `Want a complete ${topic} plan instead of just a number?`,
    body: `Use CoachProAI to go beyond a single number. Get calorie guidance, meal structure, progress adjustments, and coaching logic built around your goal.`,
    primary: "Recalculate now",
    secondary: "Start full plan",
  };
}

export const CALCULATOR_CONTENT: Record<string, CalcContent> = {
  protein: {
    eyebrow: "FREE PROTEIN CALCULATOR",
    headline: "How Much Protein Do You Need to Lose Fat?",
    hook: "If you are trying to lose fat without losing muscle, protein intake matters more than most people think. Use this protein calculator for fat loss to estimate your daily target based on body weight, goal, and activity level.",
    features: DEFAULT_FEATURES,
    meaning: {
      title: "What your protein intake means for fat loss",
      paragraphs: [
        "Your result is based on body weight, goal, and training load. For fat loss, a higher daily protein intake helps preserve muscle tissue while dieting and can also improve fullness between meals.",
        "This matters because many people focus only on calories. In reality, calories affect body weight, but protein strongly affects body composition, recovery, and how sustainable a fat loss phase feels.",
      ],
    },
    benefits: {
      title: "Why a protein calculator for fat loss is useful",
      items: [
        { title: "Protect muscle", body: "When calories drop, protein becomes more important because it helps reduce muscle loss during a cut." },
        { title: "Stay fuller longer", body: "Protein-rich meals usually feel more satisfying, which can make fat loss easier to maintain over time." },
        { title: "Recover better", body: "Training while dieting still creates recovery demand. A better protein target supports performance and consistency." },
      ],
    },
    faq: [
      { q: "How much protein do I need to lose fat?", a: "Most people need around 1.6 to 2.2 grams of protein per kilogram of body weight when trying to lose fat. The right amount depends on activity level, calorie deficit size, and whether muscle retention is a priority." },
      { q: "Is protein important for fat loss?", a: "Yes. Higher protein intake helps preserve lean muscle, supports recovery, and can improve fullness so a calorie deficit feels easier to sustain." },
      { q: "Can too much protein be bad?", a: "For most healthy adults, a higher-protein diet is generally manageable, but extremely high intake is not usually necessary. This calculator aims for practical ranges rather than extreme numbers." },
      { q: "Should I use kg or lbs in this protein calculator?", a: "You can use either. The calculator accepts both kilograms and pounds and converts the value automatically in the background." },
      { q: "Can this calculator help with body recomposition too?", a: "Yes. Switch the goal to body recomposition or lean bulk to get a more suitable protein target for that outcome." },
    ],
    teaser: {
      eyebrow: "Free estimate",
      title: "Get your fat-loss protein target",
      body: "Submit the calculator to see your recommended daily protein, a simple meal split, and one practical coaching insight.",
      inputLabel: "Input options",
      inputValue: "kg, lbs, cm, ft/in",
      goodForLabel: "Good for",
      goodForValue: "Fat loss and recomposition",
      insightTitle: "Coach insight",
      insightBody: "Higher protein intake can help preserve muscle and make a calorie deficit easier to stick with.",
      ctaLabel: "Unlock full nutrition plan",
    },
    cta: cta("fat loss"),
    disclaimer: DEFAULT_DISCLAIMER,
  },

  tdee: {
    eyebrow: "FREE TDEE CALCULATOR",
    headline: "How Many Calories Do You Actually Burn Each Day?",
    hook: "Your TDEE (Total Daily Energy Expenditure) is the total number of calories you burn on an average day. Knowing it is the foundation of every cut, maintenance phase, or lean bulk.",
    features: [
      { label: "Mifflin-St Jeor formula" },
      { label: "Activity multipliers 1.2–1.9" },
      { label: "Fat loss and bulk suggestions" },
    ],
    meaning: {
      title: "What your TDEE means for your goal",
      paragraphs: [
        "TDEE combines your resting metabolic rate with the calories you burn moving, working out, and digesting food. It is the number you compare your actual intake to.",
        "Eat at TDEE to maintain weight. Eat below to lose fat. Eat above to build muscle. Everything else in nutrition planning starts here.",
      ],
    },
    benefits: {
      title: "Why a TDEE calculator is useful",
      items: [
        { title: "Set the right target", body: "Guessing calories usually leads to a stall. TDEE gives you a starting number that matches your body." },
        { title: "Adjust with data", body: "Once you know your TDEE, weekly weight change tells you exactly how to nudge intake." },
        { title: "Base for macros", body: "Your macro split, protein target, and deficit size all depend on knowing TDEE first." },
      ],
    },
    faq: [
      { q: "How accurate is a TDEE calculator?", a: "Within about ±10% for most people. Track weight for two weeks, then adjust intake by 100–200 kcal based on actual results." },
      { q: "Should I eat at my TDEE?", a: "Eat at TDEE to maintain weight, 300–500 below for fat loss, or 200–400 above for a lean bulk." },
      { q: "Does TDEE change over time?", a: "Yes. It shifts with weight loss, activity changes, and age. Recalculate every 4–8 weeks or when the scale stops moving." },
    ],
    teaser: {
      eyebrow: "Free estimate",
      title: "Get your daily calorie burn",
      body: "See your BMR, TDEE, and calorie targets for fat loss and muscle gain in one view.",
      inputLabel: "Input options",
      inputValue: "kg, lbs, cm, ft/in",
      goodForLabel: "Good for",
      goodForValue: "Cutting, maintenance, or bulking",
      insightTitle: "Coach insight",
      insightBody: "Weight change over two weeks tells you whether your TDEE estimate is close to reality.",
      ctaLabel: "Unlock full nutrition plan",
    },
    cta: cta("calorie"),
    disclaimer: DEFAULT_DISCLAIMER,
  },

  bmr: {
    eyebrow: "FREE BMR CALCULATOR",
    headline: "How Many Calories Does Your Body Burn at Rest?",
    hook: "Your BMR (Basal Metabolic Rate) is the calories your body uses just to keep basic functions running — breathing, circulation, cell repair. It is the floor beneath every calorie plan.",
    features: [
      { label: "Mifflin-St Jeor equation" },
      { label: "Works with kg or lbs" },
      { label: "Feeds into TDEE and macros" },
    ],
    meaning: {
      title: "What your BMR tells you",
      paragraphs: [
        "Your BMR represents the minimum energy your body needs each day. Everything else — walking, training, digestion — is added on top to reach total daily calories (TDEE).",
        "A well-estimated BMR helps you avoid cutting calories too low, which can hurt recovery, mood, and long-term progress.",
      ],
    },
    benefits: {
      title: "Why a BMR calculator is useful",
      items: [
        { title: "Avoid crash deficits", body: "Knowing your BMR helps you keep calories above the level that starts to cause energy and recovery problems." },
        { title: "Foundation for TDEE", body: "TDEE is BMR times an activity multiplier. Getting BMR right makes every later step more accurate." },
        { title: "Track metabolic health", body: "Recalculating over time helps you see how weight loss, age, and training change your baseline burn." },
      ],
    },
    faq: [
      { q: "What is BMR?", a: "Basal Metabolic Rate — the calories your body burns at complete rest to keep organs and tissues alive." },
      { q: "How is BMR different from TDEE?", a: "BMR is calories at rest. TDEE adds activity, exercise, and digestion on top. TDEE is always higher." },
      { q: "Which BMR formula does this use?", a: "The Mifflin-St Jeor equation, which research suggests is the most accurate general-population formula available." },
    ],
    teaser: {
      eyebrow: "Free estimate",
      title: "Get your resting calorie burn",
      body: "See your BMR and how it turns into a full daily calorie target once activity is added.",
      inputLabel: "Input options",
      inputValue: "kg, lbs, cm, ft/in",
      goodForLabel: "Good for",
      goodForValue: "Setting a safe calorie floor",
      insightTitle: "Coach insight",
      insightBody: "Try to keep daily intake close to or above BMR unless a professional has recommended otherwise.",
      ctaLabel: "Build my full nutrition plan",
    },
    cta: cta("nutrition"),
    disclaimer: DEFAULT_DISCLAIMER,
  },

  "calorie-deficit": {
    eyebrow: "FREE CALORIE DEFICIT CALCULATOR",
    headline: "How Big a Calorie Deficit Do You Actually Need?",
    hook: "A calorie deficit is the difference between the calories you burn and the calories you eat. Too small and progress stalls. Too big and you lose muscle, energy, and consistency.",
    features: DEFAULT_FEATURES,
    meaning: {
      title: "What a calorie deficit means for fat loss",
      paragraphs: [
        "Fat loss requires a sustained calorie deficit. This tool shows mild, moderate, and aggressive targets based on your TDEE so you can pick a pace that fits your goal.",
        "The 'best' deficit is the one you can hold for weeks without wrecking training, sleep, or hunger. Smaller deficits usually win over time.",
      ],
    },
    benefits: {
      title: "Why a deficit calculator is useful",
      items: [
        { title: "Realistic pace", body: "Pick a rate of loss that matches your life instead of guessing and burning out in two weeks." },
        { title: "Protect muscle", body: "A moderate deficit paired with high protein keeps more lean mass on your frame." },
        { title: "Predictable results", body: "Fixed numbers let you diagnose stalls — was it the deficit, adherence, or activity?" },
      ],
    },
    faq: [
      { q: "How big should my calorie deficit be?", a: "A mild deficit is around 10% of TDEE, moderate 20%, aggressive 25%. Most people do best in the moderate zone." },
      { q: "How fast can I lose fat safely?", a: "Roughly 0.5–1% of bodyweight per week for most people. Faster than that often means muscle and energy losses." },
      { q: "Why did my deficit stop working?", a: "TDEE drops as you lose weight and adaptations kick in. Recalculate every 4–6 weeks and consider a diet break." },
    ],
    teaser: {
      eyebrow: "Free estimate",
      title: "Find your fat-loss calorie target",
      body: "Compare mild, moderate, and aggressive deficits and see the expected weekly weight change.",
      inputLabel: "Input options",
      inputValue: "kg, lbs, cm, ft/in",
      goodForLabel: "Good for",
      goodForValue: "Sustainable fat loss",
      insightTitle: "Coach insight",
      insightBody: "A deficit you can hold for months beats a bigger one you abandon in a few weeks.",
      ctaLabel: "Build my fat-loss plan",
    },
    cta: cta("fat loss"),
    disclaimer: DEFAULT_DISCLAIMER,
  },

  macros: {
    eyebrow: "FREE MACRO CALCULATOR",
    headline: "What Should Your Daily Macros Actually Look Like?",
    hook: "Macros — protein, carbs, and fat — decide how your calories work for you. This calculator splits your target calories into a macro breakdown that fits cutting, maintenance, or bulking.",
    features: DEFAULT_FEATURES,
    meaning: {
      title: "What your macros mean",
      paragraphs: [
        "Protein preserves muscle. Fat supports hormones. Carbs fuel performance. The right split depends on your goal, training, and preferences — not just calories.",
        "This tool gives a science-informed starting point you can adjust based on how you feel, train, and progress.",
      ],
    },
    benefits: {
      title: "Why a macro calculator is useful",
      items: [
        { title: "Better body composition", body: "Hitting protein and staying near a calorie target keeps more muscle while losing fat." },
        { title: "Steadier energy", body: "A balanced macro split usually means fewer crashes and better training sessions." },
        { title: "Clear framework", body: "You stop guessing what to eat and start planning meals against real numbers." },
      ],
    },
    faq: [
      { q: "What is a good macro split?", a: "A common starting point is around 30% protein, 25–30% fat, and the rest carbs — adjusted for your goal and activity." },
      { q: "Do I have to hit macros exactly?", a: "No. Getting within 5–10 g of each is close enough for most people. Consistency matters more than perfection." },
      { q: "Should macros change on training vs rest days?", a: "You can carb-cycle if it helps, but simple flat macros work well for most goals." },
    ],
    teaser: {
      eyebrow: "Free estimate",
      title: "Get your daily macro split",
      body: "See protein, carbs, and fat grams that match your calorie target and goal.",
      inputLabel: "Input options",
      inputValue: "kg, lbs, cm, ft/in",
      goodForLabel: "Good for",
      goodForValue: "Cutting, maintenance, bulking",
      insightTitle: "Coach insight",
      insightBody: "Hit protein first. Carbs and fat can flex around lifestyle and preference.",
      ctaLabel: "Build my full nutrition plan",
    },
    cta: cta("nutrition"),
    disclaimer: DEFAULT_DISCLAIMER,
  },

  "water-intake": {
    eyebrow: "FREE WATER INTAKE CALCULATOR",
    headline: "How Much Water Should You Drink Each Day?",
    hook: "Hydration affects energy, performance, recovery, and hunger cues. This calculator estimates a daily water target based on body weight, training volume, and climate.",
    features: [
      { label: "Weight, activity and climate" },
      { label: "Metric and imperial" },
      { label: "Practical coaching insight" },
    ],
    meaning: {
      title: "What your water target means",
      paragraphs: [
        "Water needs scale with body size, sweat rate, and environment. This tool starts from 30–35 ml per kg and adjusts for exercise and heat.",
        "Under-hydration often shows up as low energy or 'hunger' that is really thirst. Hitting a realistic target daily is more useful than a fixed 'X glasses' rule.",
      ],
    },
    benefits: {
      title: "Why a water calculator is useful",
      items: [
        { title: "Better training", body: "Even mild dehydration can hurt strength and endurance. A daily target keeps performance stable." },
        { title: "Less mistaken hunger", body: "Steady hydration makes calorie decisions easier because thirst stops masquerading as hunger." },
        { title: "Recovery support", body: "Water supports every recovery process, from digestion to joint lubrication." },
      ],
    },
    faq: [
      { q: "How much water do I need per day?", a: "A common baseline is 30–35 ml per kg of body weight, adjusted for exercise and climate — usually 2–4 liters." },
      { q: "Does coffee or tea count?", a: "Yes. Fluids from tea, coffee, and food count toward daily hydration despite the mild diuretic effect." },
      { q: "Can I drink too much water?", a: "Excessive intake in a short window can be dangerous. Spread water through the day rather than chugging litres at once." },
    ],
    teaser: {
      eyebrow: "Free estimate",
      title: "Get your daily water target",
      body: "See a realistic hydration target for your weight, workouts, and climate.",
      inputLabel: "Input options",
      inputValue: "kg, lbs, minutes, climate",
      goodForLabel: "Good for",
      goodForValue: "Energy, training, and recovery",
      insightTitle: "Coach insight",
      insightBody: "Front-load water in the first half of the day so evenings are calmer, not full of bathroom trips.",
      ctaLabel: "Build my full nutrition plan",
    },
    cta: cta("nutrition"),
    disclaimer: DEFAULT_DISCLAIMER,
  },

  "body-fat": {
    eyebrow: "FREE BODY FAT CALCULATOR",
    headline: "What Is Your Body Fat Percentage?",
    hook: "Body fat percentage tells you what your weight is actually made of. This calculator uses the US Navy method (neck, waist, and hip) for a quick tape-measure estimate.",
    features: [
      { label: "US Navy tape method" },
      { label: "cm or inches" },
      { label: "Male and female formulas" },
    ],
    meaning: {
      title: "What your body fat % means",
      paragraphs: [
        "Body fat percentage is more useful than the scale alone. Two people can weigh the same and look very different depending on how much of that weight is fat versus lean tissue.",
        "Trending your body fat over time is a better progress signal than daily scale changes.",
      ],
    },
    benefits: {
      title: "Why a body fat calculator is useful",
      items: [
        { title: "Real progress", body: "Body fat shows whether you're losing fat, not just weight — a much better composition signal." },
        { title: "Better goal setting", body: "Targets in body-fat terms are more meaningful than a bathroom-scale number." },
        { title: "Pairs with LBM", body: "Combined with lean body mass, it helps size protein, calories, and training volume." },
      ],
    },
    faq: [
      { q: "How accurate is the US Navy body fat method?", a: "It is usually within a few percent for most people — good enough to track trends over time." },
      { q: "What is a healthy body fat percentage?", a: "Very roughly, 10–20% for men and 18–28% for women. Athletic ranges are lower." },
      { q: "How often should I recalculate?", a: "Every 3–4 weeks is enough. Daily changes are mostly measurement noise." },
    ],
    teaser: {
      eyebrow: "Free estimate",
      title: "Get your body fat estimate",
      body: "Enter your tape measurements to see a body fat percentage and category.",
      inputLabel: "Input options",
      inputValue: "cm, inches, male or female",
      goodForLabel: "Good for",
      goodForValue: "Tracking composition changes",
      insightTitle: "Coach insight",
      insightBody: "Measure at the same time of day and in similar conditions to keep the number comparable.",
      ctaLabel: "Build my full body plan",
    },
    cta: cta("body composition"),
    disclaimer: DEFAULT_DISCLAIMER,
  },

  "lean-body-mass": {
    eyebrow: "FREE LEAN BODY MASS CALCULATOR",
    headline: "How Much of Your Weight Is Actually Muscle?",
    hook: "Lean Body Mass (LBM) is your weight minus body fat — muscle, bone, organs, and water. It is the foundation for setting protein targets and understanding real body composition.",
    features: [
      { label: "Boer formula" },
      { label: "Male and female" },
      { label: "Metric and imperial" },
    ],
    meaning: {
      title: "What your LBM tells you",
      paragraphs: [
        "LBM is the useful part of your weight. Two people at the same total weight can have very different LBM and look completely different.",
        "It also anchors calorie and protein needs — a person with more LBM usually needs more food to maintain that lean tissue.",
      ],
    },
    benefits: {
      title: "Why an LBM calculator is useful",
      items: [
        { title: "Smart protein targets", body: "LBM-based protein targets are more accurate than using total bodyweight when fat is high." },
        { title: "Track real gains", body: "During a bulk, watching LBM rise separates muscle gain from pure weight gain." },
        { title: "Cut with confidence", body: "During a cut, keeping LBM steady is the best sign you're losing fat, not muscle." },
      ],
    },
    faq: [
      { q: "What is a good lean body mass?", a: "It depends on height and sex. Rising LBM alongside stable or falling fat is the pattern to aim for." },
      { q: "How do I use LBM for protein?", a: "Around 2.0–2.4 g of protein per kg of LBM works well when body fat is high enough that bodyweight overestimates needs." },
      { q: "Which formula is used?", a: "The Boer formula, which is well-regarded for general population estimates." },
    ],
    teaser: {
      eyebrow: "Free estimate",
      title: "Get your lean body mass",
      body: "See LBM, fat mass, and body fat percentage from a single height and weight input.",
      inputLabel: "Input options",
      inputValue: "kg, lbs, cm, ft/in",
      goodForLabel: "Good for",
      goodForValue: "Cutting, bulking, recomposition",
      insightTitle: "Coach insight",
      insightBody: "Use LBM-based protein targets when body fat is high enough that bodyweight numbers feel too big.",
      ctaLabel: "Build my full body plan",
    },
    cta: cta("body composition"),
    disclaimer: DEFAULT_DISCLAIMER,
  },

  "waist-to-hip-ratio": {
    eyebrow: "FREE WAIST-TO-HIP RATIO CALCULATOR",
    headline: "Where Is Your Body Storing Fat?",
    hook: "Waist-to-Hip Ratio (WHR) is a simple health marker that shows how fat is distributed around your body. It complements body fat percentage and BMI.",
    features: [
      { label: "WHO health thresholds" },
      { label: "Male and female cutoffs" },
      { label: "cm or inches" },
    ],
    meaning: {
      title: "What your waist-to-hip ratio means",
      paragraphs: [
        "Central (abdominal) fat is more closely linked to metabolic risk than fat stored around hips and legs. WHR gives you a quick read on that pattern.",
        "It's not a diagnosis, but a rising WHR alongside stalled progress is a signal worth acting on.",
      ],
    },
    benefits: {
      title: "Why a WHR calculator is useful",
      items: [
        { title: "Cheap and repeatable", body: "A tape measure at home tracks WHR without a scale, scan, or lab." },
        { title: "Health context", body: "It adds a metabolic-risk lens that body weight alone can't provide." },
        { title: "Progress signal", body: "During fat loss, a falling waist measurement often changes before the scale moves." },
      ],
    },
    faq: [
      { q: "What is a healthy waist-to-hip ratio?", a: "Broadly, under 0.90 for men and under 0.85 for women is considered lower risk by the WHO." },
      { q: "How do I measure waist and hip correctly?", a: "Waist at the narrowest point (usually just above the navel); hip at the widest point around the glutes. Keep the tape level." },
      { q: "Is WHR better than BMI?", a: "It captures fat distribution, which BMI ignores. Use both together for a fuller picture." },
    ],
    teaser: {
      eyebrow: "Free estimate",
      title: "Get your waist-to-hip ratio",
      body: "See your ratio, risk category, and how it changes with fat loss over time.",
      inputLabel: "Input options",
      inputValue: "cm, inches, male or female",
      goodForLabel: "Good for",
      goodForValue: "Tracking metabolic risk",
      insightTitle: "Coach insight",
      insightBody: "Track waist and hip monthly. Trends matter more than any single measurement.",
      ctaLabel: "Build my full body plan",
    },
    cta: cta("body composition"),
    disclaimer: DEFAULT_DISCLAIMER,
  },

  "body-recomposition": {
    eyebrow: "FREE BODY RECOMPOSITION CALCULATOR",
    headline: "Can You Lose Fat and Build Muscle at the Same Time?",
    hook: "Body recomposition means losing fat and gaining muscle at the same time. It requires a smart calorie approach, enough protein, and consistent strength training.",
    features: [
      { label: "Training vs rest day calories" },
      { label: "High protein target" },
      { label: "Timeline estimate" },
    ],
    meaning: {
      title: "What a recomp plan really involves",
      paragraphs: [
        "Recomp works best for beginners, returning lifters, and people with higher body fat. A small deficit on rest days and a small surplus on training days lets your body use calories where they help most.",
        "High protein and progressive strength training are non-negotiable — without them, you just lose weight, not fat.",
      ],
    },
    benefits: {
      title: "Why a recomp calculator is useful",
      items: [
        { title: "Both goals, one plan", body: "Instead of alternating cuts and bulks, recomp targets fat and muscle changes together." },
        { title: "Structured calorie cycle", body: "Clear numbers for training and rest days remove daily guesswork." },
        { title: "Realistic timeline", body: "Recomp is slow. Seeing a real timeline prevents you from quitting after four weeks." },
      ],
    },
    faq: [
      { q: "Who is a good candidate for recomp?", a: "Beginners, people returning to training, and anyone with higher body fat and a solid protein habit." },
      { q: "How long does recomp take?", a: "Usually 3–6 months to see visible changes, longer for advanced lifters." },
      { q: "Do I need to strength train?", a: "Yes. Without progressive resistance training, calories cannot build muscle." },
    ],
    teaser: {
      eyebrow: "Free estimate",
      title: "Get your recomp calorie cycle",
      body: "See training-day and rest-day calories, protein target, and a realistic timeline.",
      inputLabel: "Input options",
      inputValue: "kg, lbs, body fat %",
      goodForLabel: "Good for",
      goodForValue: "Losing fat and building muscle",
      insightTitle: "Coach insight",
      insightBody: "Consistency over months matters far more than perfect calories on any single day.",
      ctaLabel: "Build my full plan",
    },
    cta: cta("recomposition"),
    disclaimer: DEFAULT_DISCLAIMER,
  },

  "fat-loss-timeline": {
    eyebrow: "FREE FAT LOSS TIMELINE CALCULATOR",
    headline: "How Long Will It Actually Take to Reach Your Goal Weight?",
    hook: "Fat loss is slower than most people expect. This calculator estimates a realistic timeline to your goal weight based on the calorie deficit you can actually sustain.",
    features: DEFAULT_FEATURES,
    meaning: {
      title: "What your fat loss timeline means",
      paragraphs: [
        "One kilogram of body fat holds roughly 7,700 kcal. Your weekly deficit divided into that number tells you how many weeks fat loss will realistically take.",
        "A realistic timeline helps you plan life around the process instead of giving up when instant results don't happen.",
      ],
    },
    benefits: {
      title: "Why a timeline calculator is useful",
      items: [
        { title: "Prevents burnout", body: "Seeing a real timeline stops the 'go hard for two weeks then quit' cycle." },
        { title: "Guides pace", body: "A shorter deadline usually means a bigger deficit — this tool helps you make that trade-off honestly." },
        { title: "Sets expectations", body: "Understanding weeks-to-goal makes it easier to stay consistent through slow phases." },
      ],
    },
    faq: [
      { q: "How fast can I lose fat safely?", a: "Around 0.5–1% of bodyweight per week is a reasonable, sustainable range for most people." },
      { q: "Why is my timeline longer than I hoped?", a: "Sustainable fat loss is slow. A longer timeline usually means better retention of muscle and lifestyle." },
      { q: "Does my metabolism slow down?", a: "Some adaptation happens, so recalculating every 4–6 weeks keeps the plan honest." },
    ],
    teaser: {
      eyebrow: "Free estimate",
      title: "Get your fat loss timeline",
      body: "See how many weeks it takes to reach your goal weight at a chosen weekly deficit.",
      inputLabel: "Input options",
      inputValue: "kg, lbs, weekly deficit",
      goodForLabel: "Good for",
      goodForValue: "Realistic fat loss planning",
      insightTitle: "Coach insight",
      insightBody: "A slower plan you finish beats a faster plan you abandon.",
      ctaLabel: "Build my fat-loss plan",
    },
    cta: cta("fat loss"),
    disclaimer: DEFAULT_DISCLAIMER,
  },

  "one-rep-max": {
    eyebrow: "FREE 1RM CALCULATOR",
    headline: "What Is Your One-Rep Max on This Lift?",
    hook: "Your one-rep max (1RM) is the most weight you can lift once with good form. Instead of testing it — which is risky — this calculator estimates it from a lighter set.",
    features: [
      { label: "Epley and Brzycki formulas" },
      { label: "Percentage table (50–95%)" },
      { label: "kg or lbs" },
    ],
    meaning: {
      title: "What your estimated 1RM tells you",
      paragraphs: [
        "1RM lets you program every other set as a percentage — 80% for strength work, 70% for volume, 60% for speed, and so on.",
        "Estimated 1RMs work best from sets of 3–8 reps. Very high-rep sets get less accurate.",
      ],
    },
    benefits: {
      title: "Why a 1RM calculator is useful",
      items: [
        { title: "Safer than testing", body: "Estimating from a submaximal set avoids the injury and CNS cost of true 1RM attempts." },
        { title: "Program every set", body: "Use percentages of 1RM to structure strength, hypertrophy, and speed work correctly." },
        { title: "Track progress", body: "Rising estimated 1RM over time is a clean measure of strength gains." },
      ],
    },
    faq: [
      { q: "How accurate are 1RM calculators?", a: "Very accurate for sets of 3–8 reps in classic lifts. Less accurate above 10 reps or in isolation exercises." },
      { q: "Should I actually test my 1RM?", a: "Only if you're an experienced lifter with a plan for it. Estimating is safer for most people." },
      { q: "Which formula is best?", a: "Both Epley and Brzycki are respected. Their average gives a balanced estimate for programming." },
    ],
    teaser: {
      eyebrow: "Free estimate",
      title: "Get your one-rep max",
      body: "See your estimated 1RM plus a full percentage table for programming every training day.",
      inputLabel: "Input options",
      inputValue: "weight lifted and reps",
      goodForLabel: "Good for",
      goodForValue: "Strength programming",
      insightTitle: "Coach insight",
      insightBody: "Estimate from sets of 3–8 reps for the tightest number.",
      ctaLabel: "Build my full training plan",
    },
    cta: cta("training"),
    disclaimer: DEFAULT_DISCLAIMER,
  },

  "lean-bulk": {
    eyebrow: "FREE LEAN BULK CALCULATOR",
    headline: "How Many Calories Do You Need for a Lean Bulk?",
    hook: "A lean bulk means gaining muscle with as little fat as possible. That requires a small surplus, high protein, and a plan you can sustain across months of training.",
    features: [
      { label: "Conservative to aggressive" },
      { label: "Full macro split" },
      { label: "Weekly gain estimate" },
    ],
    meaning: {
      title: "What a lean bulk plan really looks like",
      paragraphs: [
        "A modest 10–15% surplus over TDEE usually maximises muscle gain without piling on fat. Larger surpluses just add fat, not more muscle.",
        "Consistent training, high protein, and patience matter more than any specific calorie number.",
      ],
    },
    benefits: {
      title: "Why a lean bulk calculator is useful",
      items: [
        { title: "Cleaner gains", body: "Modest surpluses keep body fat in check so you don't have to cut aggressively later." },
        { title: "Clear numbers", body: "Fixed calorie and macro targets remove daily 'am I eating enough?' guesswork." },
        { title: "Better recovery", body: "Enough fuel supports harder training sessions and faster recovery between them." },
      ],
    },
    faq: [
      { q: "What is a lean bulk?", a: "A muscle-gain phase with a small surplus (usually 10–15% over TDEE) to add muscle with minimal fat." },
      { q: "How fast should I gain?", a: "Around 0.25–0.5% of bodyweight per week is a realistic sustainable pace for most lifters." },
      { q: "Do I have to gain fat?", a: "A little fat gain is normal in a surplus. Keeping it moderate makes the next cut much shorter." },
    ],
    teaser: {
      eyebrow: "Free estimate",
      title: "Get your lean bulk plan",
      body: "See target calories, macros, and expected weekly weight gain for a clean muscle-building phase.",
      inputLabel: "Input options",
      inputValue: "kg, lbs, cm, ft/in",
      goodForLabel: "Good for",
      goodForValue: "Muscle gain with less fat",
      insightTitle: "Coach insight",
      insightBody: "Slow and steady adds more muscle than aggressive bulks — and shortens the next cut.",
      ctaLabel: "Build my full training plan",
    },
    cta: cta("muscle building"),
    disclaimer: DEFAULT_DISCLAIMER,
  },

  "plateau-fix": {
    eyebrow: "FREE PLATEAU FIX CALCULATOR",
    headline: "Why Has Your Fat Loss Suddenly Stopped?",
    hook: "Fat loss stalls are normal. They usually come from adaptation, less activity, or drift in food intake. This calculator gives you a structured way to break through.",
    features: DEFAULT_FEATURES,
    meaning: {
      title: "What a plateau really means",
      paragraphs: [
        "If weight hasn't changed for 2–3 weeks with honest tracking, adaptation has probably caught up. A small calorie drop, more steps, or a diet break usually restarts progress.",
        "Not every stall is real — check food tracking accuracy and daily movement first.",
      ],
    },
    benefits: {
      title: "Why a plateau calculator is useful",
      items: [
        { title: "Structured fixes", body: "Instead of panic-cutting calories, you get graded options that match the stall size." },
        { title: "Preserve progress", body: "Small deficit drops or a refeed day protect muscle and sanity better than harsh cuts." },
        { title: "Diagnose, then act", body: "A calm framework helps separate a real plateau from a tracking or activity issue." },
      ],
    },
    faq: [
      { q: "How long counts as a plateau?", a: "Usually 2–3 weeks of no meaningful weight or measurement change, assuming honest tracking." },
      { q: "Should I cut calories more?", a: "A modest 10% drop plus more daily steps usually restarts progress without crushing recovery." },
      { q: "What is a refeed day?", a: "A single day eating at maintenance to give hormones and training a break, then returning to your deficit." },
    ],
    teaser: {
      eyebrow: "Free estimate",
      title: "Break your fat loss plateau",
      body: "See a targeted calorie drop, step increase, and refeed strategy based on your stall.",
      inputLabel: "Input options",
      inputValue: "current calories, weight change, steps",
      goodForLabel: "Good for",
      goodForValue: "Restarting stalled fat loss",
      insightTitle: "Coach insight",
      insightBody: "Check tracking accuracy and daily movement first — most 'plateaus' start there.",
      ctaLabel: "Build my fat-loss plan",
    },
    cta: cta("fat loss"),
    disclaimer: DEFAULT_DISCLAIMER,
  },

  "reverse-diet": {
    eyebrow: "FREE REVERSE DIET CALCULATOR",
    headline: "How Do You Move Out of a Diet Without Regaining Fat?",
    hook: "A reverse diet means slowly raising calories after a cut so your metabolism recovers, hunger fades, and you don't rebound. This calculator builds a week-by-week schedule.",
    features: [
      { label: "Weekly calorie schedule" },
      { label: "Custom increment" },
      { label: "Up to 20 weeks" },
    ],
    meaning: {
      title: "What a reverse diet does",
      paragraphs: [
        "After a long cut, jumping straight to maintenance calories often causes fat regain and digestive stress. A reverse diet raises calories in small weekly steps so your body adapts gradually.",
        "The goal is to arrive at real maintenance calories eating more food, weighing about the same, and feeling normal again.",
      ],
    },
    benefits: {
      title: "Why a reverse diet calculator is useful",
      items: [
        { title: "Rebuild metabolism", body: "Slow calorie increases give hormones, thyroid function, and NEAT time to bounce back." },
        { title: "Protect against rebound", body: "Gradual food increases prevent the sudden weight jumps that often follow harsh cuts." },
        { title: "Set up the next phase", body: "You finish the reverse ready to maintain, recomp, or lean bulk from a healthier baseline." },
      ],
    },
    faq: [
      { q: "Who needs a reverse diet?", a: "Anyone finishing a long or aggressive cut, especially if energy, hunger, or training are noticeably compromised." },
      { q: "How fast should I add calories?", a: "About 50–100 kcal per week is a common starting range. Faster if energy is low, slower if the aim is minimal fat gain." },
      { q: "How long does a reverse diet take?", a: "Usually 6–16 weeks depending on how deep the deficit was and how far below maintenance you finished." },
    ],
    teaser: {
      eyebrow: "Free estimate",
      title: "Get your reverse diet schedule",
      body: "See a week-by-week calorie plan that walks you from a diet low back up to real maintenance.",
      inputLabel: "Input options",
      inputValue: "current calories, target TDEE, weekly step",
      goodForLabel: "Good for",
      goodForValue: "Post-diet recovery",
      insightTitle: "Coach insight",
      insightBody: "Slow, boring reverses work best. Prioritise consistent training and sleep as calories rise.",
      ctaLabel: "Build my full plan",
    },
    cta: cta("nutrition"),
    disclaimer: DEFAULT_DISCLAIMER,
  },
};
