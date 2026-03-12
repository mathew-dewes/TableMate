"use server";

import { getUserId } from "@/lib/auth/session";
import { createClientForServer } from "@/lib/supabase/server";


export async function getBusinessBySlug(slug: string){

    const supabase = await createClientForServer();

    const {data, error} = await supabase.from("Business")
  .select(`id, name, address, region, email, phone, description, slug, Availability(day_of_week, opening_time, closing_time)`)
  .eq("slug", slug).single()
 

    if (error){
        console.log("Error:", error);
        
        return {success: false, error: error};
       
        
    }

    return {success: true, data}
};


export async function getAllBusinesses(){
        const supabase = await createClientForServer();

    const {data, error} = await supabase.from("Business")
  .select(`id, name, address, region, email, phone, description, slug, Availability(day_of_week, opening_time, closing_time)`)


    if (error){
        console.log("Error:", error);
        
        return {success: false, error: error};
       
        
    }

    return {success: true, data}
}


export async function getUserBusiness(){
    const userId = await getUserId();

      const supabase = await createClientForServer();

      const {data, error} = await supabase.from('Business').select().eq("user_id", userId).maybeSingle();

       if (error) {
            console.log(error);
            
            return {
                success: false,
                error: error.message
            }
        };

        return {success: true, data}
};


export async function isUserBusinessPublished(){
        const userId = await getUserId();
        const supabase = await createClientForServer();
  const {data, error} = await supabase.from("Business").select('is_public').eq("user_id", userId).maybeSingle();

      if (error) {
            console.log(error);
            
            return {
                success: false,
                error: error.message
            }
        };

        return {success: true, data}
}