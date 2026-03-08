"use server";

import { createClientForServer } from "@/lib/supabase/server";


export async function getBusinessBySlug(slug: string){

    const supabase = await createClientForServer();

    const {data, error} = await supabase.from("Business")
  .select()
  .eq("slug", slug).single()
 

    if (error){
        console.log("Error:", error);
        
        return {success: false, error: error};
       
        
    }

    return {success: true, data}
}