"use server";

import { getUserId } from "../authActions";
import { createClientForServer } from "../server";


export async function getUserBusiness() {

    const supabase = await createClientForServer();
    const user_id = await getUserId();


    if (!user_id) {
        return {
            success: false,
            message: "Unauthorized"
        }
    };
    const { data, error } = await supabase.from("Business")
        .select("id, name, phone, description, address, publish, email")
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


export async function getUserBusinessId() {
    const supabase = await createClientForServer();
    const user_id = await getUserId();


    if (!user_id) {
        return {
            success: false,
            message: "Unauthorized"
        }
    };
    const { data: business, error: businessError } = await supabase.from("Business")
        .select("id")
        .eq("user_id", user_id)
        .maybeSingle()



    if (businessError) {
        console.log(businessError);
        return {
            success: false,
            message: businessError.message
        }

    };

    if (!business) {
        return {
            success: false,
            message: "No business found"
        }
    };

    return business.id
}

