"use server";

import { tablesSchema } from "@/lib/schema";
import { createClientForServer } from "@/lib/supabase/server";
import z from "zod";
import { getUserBusiness } from "../queries/business";
import { revalidatePath } from "next/cache";

export async function addTables(values: z.infer<typeof tablesSchema>) {

    try {
        const parsed = tablesSchema.safeParse(values);

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
        const businessResult = await getUserBusiness();

        if (!businessResult.success) {
            return {
                success: false,
                message: businessResult.error
            }
        }

        if (!businessResult.data) {
            return {
                success: false,
                message: "Business not found"
            }
        }

        const business = businessResult.data;


        if (parsed.data.tables && parsed.data.tables.length > 0) {

            const tables = parsed.data.tables.map((table) => ({
                    business_id: business.id,
                    table_number: table.id,
                    capacity: Number(table.capacity),
                }));

          await supabase.from('Table').delete().eq("business_id", business.id);

            const { error: tableInsertError } = await supabase.from('Table').insert(tables);

            if (tableInsertError) {
                console.error(tableInsertError);
                return {
                    success: false,
                    message: "Failed to save tables",
                };


            };

            const {error: stepChangeError} = await supabase.from("Business").update({
                setup_step: 4
            }).eq("id", business.id);

                    if (stepChangeError) {
                console.error(stepChangeError);
                return {
                    success: false,
                    message: "Failed update business",
                };


            };
revalidatePath('/onboarding')
            return { success: true, message: "Tables saved successfully" };

        }








        console.log(parsed.data.tables);


} catch (error) {
  console.error(error);
  return { success: false, message: "Unexpected error saving tables" };
}

}