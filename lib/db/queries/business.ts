"use server";

import { createClientForServer } from "@/lib/supabase/server";


export async function getBusinessBySlug(slug: string){

    const supabase = await createClientForServer();

    const {data, error} = await supabase.from("Business")
  .select()
  .eq("slug", slug).single()
 

    if (error){
        return {success: false, message: 'There was an error fetching this data'}
    }

    return {success: true, data}
}