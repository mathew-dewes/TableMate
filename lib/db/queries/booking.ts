"use server";


import { getUserId } from "@/lib/auth/session";
import { createClientForServer } from "@/lib/supabase/server";


export async function getExistingBookings(slug: string, startTime: Date, endTime: Date) {
  const supabase = await createClientForServer();

  

  

  const { data: business } = await supabase
    .from("Business")
    .select("id")
    .eq("slug", slug)
    .single();

  if (!business) return [];


  // Any booking that overlaps the day:
  const { data, error } = await supabase
  .from("Booking")
    .select("table_id, start_time, end_time")
    .eq("business_id", business.id)
.lt("start_time", endTime.toISOString())
.gt("end_time", startTime.toISOString())

  if (error) {
    console.log(error);
    return [];
  }

  return data;
};

export async function getUserBookings(){


  const user_id = await getUserId();
  const supabase = await createClientForServer();

      const {data, error} = await supabase.from("Business").
      select(`
        Booking(
        id,
        guest_name, 
        guest_email, 
        guest_phone, 
        party_size,
        start_time,
        end_time,
        notes
        )`)
        .eq("user_id", user_id)
        .order("start_time", { referencedTable: "Booking", ascending: true })
        .single()

        if (error){
        console.log("Error:", error);
        
        return {success: false, error: error};
       
        
    }

    return data.Booking

}