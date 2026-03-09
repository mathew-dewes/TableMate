"use server";

import { getUserId } from "@/lib/auth/session";
import { businessDetailsForm } from "@/lib/schema";
import { createClientForServer } from "@/lib/supabase/server";
import { createSlug } from "@/lib/utils";
import z from "zod";


export async function createBusiness(values: z.infer<typeof businessDetailsForm>) {

    const userId = await getUserId()

    try {

        const parsed = businessDetailsForm.safeParse(values);

        if (!parsed.success) {
            const fieldErrors: Record<string, string> = {}

            parsed.error.issues.forEach(issue => {
                fieldErrors[issue.path[0] as string] = issue.message
            })

            return {
                success: false,
                fieldErrors
            }
        };

        const supabase = await createClientForServer();

        const { error } = await supabase.from('Business').insert({
            name: parsed.data.name,
            address: parsed.data.address,
            user_id: userId,
            region: parsed.data.region,
            email: parsed.data.email,
            slug: createSlug(parsed.data.name),
            phone: parsed.data.phone

        });

        if (error) {
            console.log(error);
            if (error.code == "23505"){
                    return {
                success: false,
                error: "You already have an active business saved to this account"
            }
            }

            return {
                success: false,
                error: error.message
            }
        }

        return {
            success: true, message: `Business was created`
        }
    } catch (error) {
        console.error(error);

        return {
            success: false,
            error: "Something went wrong. Please try again."
        }
    }

}