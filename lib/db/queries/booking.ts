"use server";

import { createClientForServer } from "@/lib/supabase/server";

export async function getBookedTables(slug: string, startTime: Date) {
    const supabase = await createClientForServer();

    const endTime = new Date(startTime);
    endTime.setMinutes(30);

    const { data: business, error: businessError } = await supabase.from("Business").select("id").eq("slug", slug).single()
    
    if (businessError) {
        console.log("Error:", businessError);

        return { success: false, error: businessError };


    }
    const { data, error } = await supabase.from("Booking").select("table_id").
        eq("business_id", business?.id).
        lt("start_time", startTime.toISOString()).
        gt("end_time", endTime.toISOString());

    if (error) {
        console.log("Error:", error);

        return { success: false, error: error };


    }

    return data
}