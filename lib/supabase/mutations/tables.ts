"use server";

import { tablesFormSchema } from "@/lib/schemas";
import z from "zod";
import { createClientForServer } from "../server";
import { getUserId } from "../authActions";
import { getUserBusinessId } from "../queries/business";


export async function addTables(values: z.infer<typeof tablesFormSchema>) {
    const supabase = await createClientForServer();
    const user_id = await getUserId();

    const parsed = tablesFormSchema.safeParse(values);

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

    const business_id = await getUserBusinessId() as string;

    const tables = Array.from(
        { length: parsed.data.total_tables },
        (_, index) => ({
            business_id,
            max_capacity: parsed.data.max_capacity,
            min_capacity: parsed.data.min_capacity,
            number: index + 1,
        })
    );

    const { error } = await supabase.from("Tables").insert(tables);


    if (error) {
        console.log(error);
        return {
            success: false,
            message: error.message
        }

    };

    return {
        success: true,
        message: `${parsed.data.total_tables} Tables were added`
    }


};