"use server";

import { createClientForServer } from "../supabase/server";


export async function getSession(){

    try {
    const supabase = await createClientForServer();
    const {data, error} = await supabase.auth.getSession();

    if (error){
        console.log("Error:", error.message);
        
    } else {
        return data.session;
    }
    
} catch (error) {
            console.log("Error:", error);
    }

}