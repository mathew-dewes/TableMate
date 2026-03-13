"use server";

import { hoursSchema } from "@/lib/schema";
import { createClientForServer } from "@/lib/supabase/server";
import z from "zod";
import { getUserBusiness } from "../queries/business";
import { revalidatePath } from "next/cache";

function timeStringToUtc(dayDate: Date, time: string): string {
  const [hours, minutes, seconds] = time.split(":").map(Number);
  // build the date in NZT first
  const nzDate = new Date(dayDate);
  nzDate.setHours(hours, minutes, seconds || 0, 0);

  // Convert to UTC ISO string for DB
  return new Date(
    Date.UTC(
      nzDate.getFullYear(),
      nzDate.getMonth(),
      nzDate.getDate(),
      nzDate.getHours(),
      nzDate.getMinutes(),
      nzDate.getSeconds()
    )
  ).toISOString();
}

export async function setAvailability(values: z.infer<typeof hoursSchema>) {

    try {
        const parsed = hoursSchema.safeParse(values);

        if (!parsed.success) {
            const fieldErrors: Record<string, string> = {}

            parsed.error.issues.forEach(issue => {
                fieldErrors[issue.path[0] as string] = issue.message
            })

            return {
                success: false,
                fieldErrors
            }
        };


        const supabase = await createClientForServer();
        const businessResult = await getUserBusiness()

        if (!businessResult.success) {
            return {
                success: false,
                message: businessResult.error
            }
        }

        if (!businessResult.data) {
            return {
                success: false,
                message: "Business not found"
            }
        }

        const business = businessResult.data



        const availabilityRows = parsed.data.hours
            .filter((day) => day.isOpen)
            .map((day, index) => ({
                business_id: business?.id,
                day_of_week: index + 1,
                opening_time: day.startTime!,
                closing_time: day.endTime!,
            }));

        await supabase
            .from("Availability")
            .delete()
            .eq("business_id", business.id)

        const { error: availabilityError } = await supabase
            .from("Availability")
            .insert(availabilityRows);

        if (availabilityError) {
            console.error(availabilityError);
            return {
                success: false,
                message: "Failed to save availability",
            };


        }

        const { error: businessStepUpdateError } = await supabase.from('Business').update({ setup_step: 3 }).eq("user_id", business.user_id);
        if (businessStepUpdateError) {
            console.error(availabilityError);
            return {
                success: false,
                message: "Failed to update Business Step",
            };


        };


        revalidatePath('/onboarding')



        return {
            success: true,
            message: "Availability saved",
        };







    } catch (error) {
        console.error(error);

        return {
            success: false,
            message: "Unexpected server error",
        };
    }
}