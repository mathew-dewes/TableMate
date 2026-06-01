"use server";

import { settingsFormSchema } from "@/lib/schemas";
import { getUserId } from "../authActions";
import { createClientForServer } from "../server";
import z from "zod";
import { getUserBusinessId } from "../queries/business";

export async function setBusinessSettings(values: z.infer<typeof settingsFormSchema>) {
    const supabase = await createClientForServer();
    const user_id = await getUserId();

    const parsed = settingsFormSchema.safeParse(values);

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

const business_id = await getUserBusinessId() as string;

    const {
        slot_interval_minutes: slots,
        booking_duration,
        max_future_booking_days: maxDays,
        max_party_size: maxParty
    
    } = parsed.data;

    const { error } = await supabase.from("Settings").insert({
      slot_interval_minutes: slots,
      booking_duration: booking_duration,
      max_future_booking_days: maxDays,
      max_party_size: maxParty,
      business_id
    });


    if (error) {
        console.log(error);
        return {
            success: false,
            message: error.message
        }

    };

    return {
        success: true,
        message: `Settings was added`
    }


};