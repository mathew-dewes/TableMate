"use server";

import { createClientForServer } from "@/lib/supabase/server";

export async function getBusinessTables(business_id: string){
       const supabase = await createClientForServer();

       const {data, error} = await supabase
       .from("Table")
       .select("table_number, capacity")
       .eq("business_id", business_id)

    if (error){
        console.log("Error:", error);
        
        return {success: false, error: error};
       
        
    }

        return {success: true, data}
}