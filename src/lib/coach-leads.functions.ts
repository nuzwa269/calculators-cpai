import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const leadSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  goal: z.string().trim().max(80).optional().or(z.literal("")),
  message: z.string().trim().min(1).max(2000),
});

export const submitCoachLead = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => leadSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("coach_leads").insert({
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      goal: data.goal || null,
      message: data.message,
    });
    if (error) {
      console.error("coach_leads insert failed", error);
      throw new Error("Could not save your message. Please try again.");
    }
    return { ok: true };
  });