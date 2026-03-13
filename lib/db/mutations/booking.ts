"use server";

import { bookingFormSchema } from "@/lib/schema";
import { createClientForServer } from "@/lib/supabase/server";
import { addMinutes } from "date-fns";
import { revalidatePath } from "next/cache";
import z from "zod";

export async function makeBooking(
    values: z.infer<typeof bookingFormSchema>,
    slug: string,
    start_time: Date,
    table_id: string
) {




    try {
        const parsed = bookingFormSchema.safeParse(values);

           
        


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

        const { data: business, error: businessError } = await supabase.from("Business").select("id, booking_duration").eq("slug", slug).single()

        if (businessError) {
            console.log("Error:", businessError);

            return { success: false, error: businessError };


        };

        const {data: table, error: tableError} = await supabase.from("Table").select("id").eq("id", table_id).single();

             if (tableError) {
            console.log("Error:", tableError);

            return { success: false, error: tableError };


        };

     const end_time = addMinutes(start_time, business.booking_duration ?? 60);

        const { error: bookingError } = await supabase.from("Booking")
            .insert(
                {
                    guest_name: parsed.data.name,
                    guest_email: parsed.data.email,
                    guest_phone: parsed.data.phone,
                    party_size: 5,
                    business_id: business.id,
                    source: "ONLINE",
                    status: "BOOKED",
                    start_time: start_time.toISOString(),
                    end_time: end_time.toISOString(),
                    notes: parsed.data.notes,
                    table_id: table.id
                }
            );

        if (bookingError) {
            console.log(bookingError);

            return {
                success: false,
                error: bookingError.message
            }
        };

        revalidatePath('/dashboard')

        return {
            success: true, message: `Booking successful`,
        }
    } catch (error) {
        console.error(error);

        return {
            success: false,
            error: "Something went wrong. Please try again."
        }


    }

}

