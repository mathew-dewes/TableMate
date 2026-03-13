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
};


export async function getEligibleTables(partySize: string){

           const supabase = await createClientForServer();
     const { error: tableCheckError, data: tables } = await supabase.from("Table")
        .select("id, table_number, capacity").eq("active", false).gte("capacity", partySize);


    if (tableCheckError) {
        console.log("Error:", tableCheckError);



    };

    return tables
}


