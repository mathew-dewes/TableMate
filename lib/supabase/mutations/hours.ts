"use server";

import { businessHoursSchema } from "@/lib/schemas";
import z from "zod";
import { createClientForServer } from "../server";
import { getUserId } from "../authActions";

export async function setBusinessHours(values: z.infer<typeof businessHoursSchema>) {
    const supabase = await createClientForServer();
    const user_id = await getUserId();

    const parsed = businessHoursSchema.safeParse(values);
if (!user_id) {
        return {
            success: false,
            message: "Unauthorized"
        }
    };

    if (!parsed.success) {
        return {
            success: false,
            message: "Validation failed"

        }
    };
    
    const {data: business, error: businessError} = await supabase.from("Business")
    .select("id")
    .eq("user_id", user_id)
    .maybeSingle()



         if (businessError) {
        console.log(businessError);
        return {
            success: false,
            message: businessError.message
        }

    };
    
    if (!business){
         return {
            success: false,
            message: "No business found"
        }
}
    

  const rows = parsed.data?.hours.map((hour) => ({
  business_id: business.id,
  open: hour.open ?? 0,
  close: hour.close ?? 0,
  day_of_week: hour.day_of_week,
}));

    const { error } = await supabase.from("Business_hours").insert(rows);


    if (error) {
        console.log(error);
        return {
            success: false,
            message: error.message
        }

    };

    return {
        success: true,
        message: `Business hours added`
    }


};