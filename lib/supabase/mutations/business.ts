"use server";

import { businessFormSchema } from "@/lib/schemas";
import { getUserId } from "../authActions";
import { createClientForServer } from "../server";
import z from "zod";
import { getUserBusinessId } from "../queries/business";

export async function createBusiness(values: z.infer<typeof businessFormSchema>) {
    const supabase = await createClientForServer();
    const user_id = await getUserId();

    const parsed = businessFormSchema.safeParse(values);

    if (!user_id) {
        return {
            success: false,
            message: "Unauthorized"
        }
    };

    if (!parsed.success) {
        return {
            success: false,
            message: "Validation failed"

        }
    };

    const { error } = await supabase.from("Business").insert({
        name: parsed.data.name,
        phone: parsed.data.phone,
        address: parsed.data.address,
        description: parsed.data.description,
        slug: parsed.data.name,
        user_id,
    });


    if (error) {
        console.log(error);
        return {
            success: false,
            message: error.message
        }

    };

    return {
        success: true,
        message: `${parsed.data.name} was added`
    }


};

export async function deleteBusiness(){
    const supabase = await createClientForServer();
    const user_id = await getUserId();


    if (!user_id) {
        return {
            success: false,
            message: "Unauthorized"
        }
    };

    const business_id = await getUserBusinessId() as string;

    if (!business_id) {
        return {
            success: false,
            message: "Business not found"
        }
    };


    const {error} = await supabase.from("Business").delete().eq("id", business_id);


    if (error) {
        console.log(error);
        return {
            success: false,
            message: error.message
        }

    };

    return {
        success: true,
        message: `Business was removed`
    }

};


export async function publishBusiness(){
       const supabase = await createClientForServer();
    const user_id = await getUserId();


    if (!user_id) {
        return {
            success: false,
            message: "Unauthorized"
        }
    };

    const business_id = await getUserBusinessId() as string;

    if (!business_id) {
        return {
            success: false,
            message: "Business not found"
        }
    };


    const {error} = await supabase.from("Business").update({"setup_completed": true})
    .eq("id", business_id);


    if (error) {
        console.log(error);
        return {
            success: false,
            message: error.message
        }

    };

    return {
        success: true,
        message: `Business has been published`
    }
}

