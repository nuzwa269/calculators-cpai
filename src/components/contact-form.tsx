import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { submitCoachLead } from "@/lib/coach-leads.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const GOALS = [
  "Weight loss",
  "Muscle gain",
  "Diabetes",
  "PCOS",
  "Heart / Hypertension",
  "Kidney",
  "Sports nutrition",
  "General healthy lifestyle",
  "Other",
];

export function ContactForm() {
  const submit = useServerFn(submitCoachLead);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      phone: String(fd.get("phone") ?? "").trim(),
      goal: String(fd.get("goal") ?? "").trim(),
      message: String(fd.get("message") ?? "").trim(),
    };
    if (!payload.name || !payload.email || !payload.message) {
      toast.error("Please fill in name, email, and message.");
      return;
    }
    setSubmitting(true);
    try {
      await submit({ data: payload });
      setDone(true);
      toast.success("Thanks! Amna will get back to you soon.");
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="rounded-2xl border border-primary bg-primary/10 p-6 text-foreground">
        <h3 className="text-lg font-semibold">Message received ✓</h3>
        <p className="mt-2 text-sm text-foreground">
          Thanks for reaching out. Amna typically replies within 24 hours on business days.
        </p>
        <button
          onClick={() => setDone(false)}
          className="mt-4 text-sm font-medium text-primary hover:opacity-80"
        >
          Send another message →
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" required maxLength={100} placeholder="Your full name" className="mt-1.5" />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required maxLength={255} placeholder="you@example.com" className="mt-1.5" />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="phone">Phone <span className="text-muted-foreground">(optional)</span></Label>
          <Input id="phone" name="phone" maxLength={40} placeholder="+92 ..." className="mt-1.5" />
        </div>
        <div>
          <Label htmlFor="goal">Primary goal</Label>
          <select
            id="goal"
            name="goal"
            className="mt-1.5 flex h-9 w-full rounded-md border border-input bg-card px-3 py-1 text-sm text-foreground shadow-sm outline-none focus:ring-2 focus:ring-orange-500"
            defaultValue=""
          >
            <option value="" disabled>
              Select a goal
            </option>
            {GOALS.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <Label htmlFor="message">Tell Amna about yourself</Label>
        <Textarea
          id="message"
          name="message"
          required
          maxLength={2000}
          rows={5}
          placeholder="Age, current weight/height, any medical conditions, and what you'd like to achieve."
          className="mt-1.5"
        />
      </div>
      <Button
        type="submit"
        disabled={submitting}
        className="w-full bg-primary text-white hover:opacity-90"
      >
        {submitting ? "Sending..." : "Request my personal plan"}
      </Button>
      <p className="text-xs text-muted-foreground">
        Your details are private and used only to reply to your inquiry.
      </p>
    </form>
  );
}