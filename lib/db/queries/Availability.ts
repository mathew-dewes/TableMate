"use server";

import { createClientForServer } from "@/lib/supabase/server";

export async function getBusinessWorkHours(business_id: string){
       const supabase = await createClientForServer();

       const {data, error} = await supabase
       .from("Availability")
       .select("day_of_week, opening_time, closing_time")
       .eq("business_id", business_id)

    if (error){
        console.log("Error:", error);
        
        return {success: false, error: error};
       
        
    }

        return {success: true, data}


    };


export async function getBusinessAvailablityForSelectedDay(slug: string, booking_date: Date) {
    const supabase = await createClientForServer();
    const date = new Date(booking_date).getDay();

        const { error: businessError, data: business } = await supabase.from("Business").select("id").eq("slug", slug).single();

    if (businessError || !business) {
        console.log("Error:", businessError);

        return { success: false, error: businessError };

    }

    const { data, error } = await supabase.from("Availability")
        .select(`day_of_week, opening_time, closing_time`).eq("business_id", business.id).eq("day_of_week", date).maybeSingle()


    if (error) {
        console.log("Error:", error);

        return { success: false, error: error };


    }

    return {success: true, data}
}
