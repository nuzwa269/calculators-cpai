import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ACTIVITY_LABELS, type Activity, type Sex } from "@/lib/calculators";

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
        <Label htmlFor="weight">Weight (kg)</Label>
        <Input
          id="weight"
          type="number"
          min={30}
          max={300}
          step={0.1}
          value={value.weight}
          onChange={(e) => set("weight", Number(e.target.value))}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="height">Height (cm)</Label>
        <Input
          id="height"
          type="number"
          min={120}
          max={230}
          value={value.height}
          onChange={(e) => set("height", Number(e.target.value))}
        />
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
