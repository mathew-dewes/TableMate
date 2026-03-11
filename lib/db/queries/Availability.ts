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


    }
