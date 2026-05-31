"use server";

import { getUserId } from "../authActions";
import { createClientForServer } from "../server";


export async function getUserBusiness(){
    
      const supabase = await createClientForServer();
      const user_id = await getUserId();
    

          if (!user_id) {
        return {
            success: false,
            message: "Unauthorized"
        }
    };
      const {data, error} = await supabase.from("Business")
      .select()
      .eq("user_id", user_id)
      .maybeSingle();
    
        if (error) {
        console.log("Error:", error);
        return {
            success: false,
            message: error.message
        }
    };
      
      return data;
};



