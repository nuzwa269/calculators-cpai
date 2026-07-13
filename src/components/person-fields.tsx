import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import {
  ACTIVITY_LABELS,
  type Activity,
  type Sex,
  kgToLb,
  lbToKg,
  cmToIn,
  inToCm,
  ftInToCm,
} from "@/lib/calculators";

export interface PersonInputs {
  sex: Sex;
  age: number;
  weight: number; // kg
  height: number; // cm
  activity: Activity;
}

interface Props {
  value: PersonInputs;
  onChange: (next: PersonInputs) => void;
  showActivity?: boolean;
}

export function PersonFields({ value, onChange, showActivity = true }: Props) {
  const set = <K extends keyof PersonInputs>(k: K, v: PersonInputs[K]) =>
    onChange({ ...value, [k]: v });

  const [weightUnit, setWeightUnit] = useState<"kg" | "lb">("kg");
  const [heightUnit, setHeightUnit] = useState<"cm" | "in" | "ftin">("cm");

  // Local buffers so users can type freely without rounding jitter.
  const [lbStr, setLbStr] = useState(() => kgToLb(value.weight).toFixed(1));
  const [inStr, setInStr] = useState(() => cmToIn(value.height).toFixed(1));
  const [ftStr, setFtStr] = useState(() => String(Math.floor(cmToIn(value.height) / 12)));
  const [ftInchStr, setFtInchStr] = useState(() =>
    (cmToIn(value.height) - Math.floor(cmToIn(value.height) / 12) * 12).toFixed(1),
  );

  useEffect(() => {
    setLbStr(kgToLb(value.weight).toFixed(1));
  }, [value.weight, weightUnit]);
  useEffect(() => {
    const totalIn = cmToIn(value.height);
    setInStr(totalIn.toFixed(1));
    const ft = Math.floor(totalIn / 12);
    setFtStr(String(ft));
    setFtInchStr((totalIn - ft * 12).toFixed(1));
  }, [value.height, heightUnit]);

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="space-y-2">
        <Label htmlFor="sex">Sex</Label>
        <Select value={value.sex} onValueChange={(v) => set("sex", v as Sex)}>
          <SelectTrigger id="sex">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="age">Age (years)</Label>
        <Input
          id="age"
          type="number"
          min={14}
          max={100}
          value={value.age}
          onChange={(e) => set("age", Number(e.target.value))}
        />
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="weight">Weight</Label>
          <Select value={weightUnit} onValueChange={(v) => setWeightUnit(v as "kg" | "lb")}>
            <SelectTrigger className="h-7 w-20 text-xs" aria-label="Weight unit">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="kg">kg</SelectItem>
              <SelectItem value="lb">lb</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {weightUnit === "kg" ? (
          <Input
            id="weight"
            type="number"
            min={30}
            max={300}
            step={0.1}
            value={value.weight}
            onChange={(e) => set("weight", Number(e.target.value))}
          />
        ) : (
          <Input
            id="weight"
            type="number"
            min={66}
            max={660}
            step={0.1}
            value={lbStr}
            onChange={(e) => {
              setLbStr(e.target.value);
              const n = Number(e.target.value);
              if (!Number.isNaN(n)) set("weight", Number(lbToKg(n).toFixed(2)));
            }}
          />
        )}
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="height">Height</Label>
          <Select value={heightUnit} onValueChange={(v) => setHeightUnit(v as "cm" | "in" | "ftin")}>
            <SelectTrigger className="h-7 w-24 text-xs" aria-label="Height unit">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cm">cm</SelectItem>
              <SelectItem value="in">inches</SelectItem>
              <SelectItem value="ftin">ft / in</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {heightUnit === "cm" && (
          <Input
            id="height"
            type="number"
            min={120}
            max={230}
            value={value.height}
            onChange={(e) => set("height", Number(e.target.value))}
          />
        )}
        {heightUnit === "in" && (
          <Input
            id="height"
            type="number"
            min={48}
            max={90}
            step={0.1}
            value={inStr}
            onChange={(e) => {
              setInStr(e.target.value);
              const n = Number(e.target.value);
              if (!Number.isNaN(n)) set("height", Number(inToCm(n).toFixed(1)));
            }}
          />
        )}
        {heightUnit === "ftin" && (
          <div className="flex gap-2">
            <Input
              id="height"
              type="number"
              min={4}
              max={7}
              value={ftStr}
              placeholder="ft"
              onChange={(e) => {
                setFtStr(e.target.value);
                const ft = Number(e.target.value);
                const inch = Number(ftInchStr);
                if (!Number.isNaN(ft) && !Number.isNaN(inch)) {
                  set("height", Number(ftInToCm(ft, inch).toFixed(1)));
                }
              }}
            />
            <Input
              type="number"
              min={0}
              max={11.9}
              step={0.1}
              value={ftInchStr}
              placeholder="in"
              onChange={(e) => {
                setFtInchStr(e.target.value);
                const ft = Number(ftStr);
                const inch = Number(e.target.value);
                if (!Number.isNaN(ft) && !Number.isNaN(inch)) {
                  set("height", Number(ftInToCm(ft, inch).toFixed(1)));
                }
              }}
            />
          </div>
        )}
      </div>
      {showActivity && (
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="activity">Activity level</Label>
          <Select value={value.activity} onValueChange={(v) => set("activity", v as Activity)}>
            <SelectTrigger id="activity">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {(Object.keys(ACTIVITY_LABELS) as Activity[]).map((a) => (
                <SelectItem key={a} value={a}>
                  {ACTIVITY_LABELS[a]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
}

export const DEFAULT_PERSON: PersonInputs = {
  sex: "male",
  age: 30,
  weight: 75,
  height: 175,
  activity: "moderate",
};
