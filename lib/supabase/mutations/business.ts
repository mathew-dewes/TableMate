"use server";

import { businessFormSchema } from "@/lib/schemas";
import { getUserId } from "../authActions";
import { createClientForServer } from "../server";
import z from "zod";

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
        setup_step: 2
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


export async function updateSetupStep(step: number) {
    const supabase = await createClientForServer();
    const user_id = await getUserId();
    if (!user_id) {
        return {
            success: false,
            message: "Unauthorized"
        }
    };


    const { error } = await supabase.from("Business").update(
        {setup_step: step}).eq("user_id", user_id);


    if (error) {
        console.log(error);
        return {
            success: false,
            message: error.message
        }

    };



}