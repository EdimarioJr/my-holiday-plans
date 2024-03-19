import { z } from "zod";

export const holidayPlanSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  location: z.string().min(1),
  date: z.date(),
  participant: z.string().optional(),
});

export const validateHolidayPlan = (plan: unknown) =>
  holidayPlanSchema.safeParse(plan);
