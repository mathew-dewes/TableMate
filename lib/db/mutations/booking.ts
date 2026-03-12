"use server";

import { bookingFormSchema } from "@/lib/schema";
import { createClientForServer } from "@/lib/supabase/server";
import z from "zod";

export async function makeBooking(
    values: z.infer<typeof bookingFormSchema>,
    slug: string,
    start_time: Date
) {

    const end_time = new Date(start_time);
    end_time.setHours(end_time.getHours() + 2)
    // Endtime should be start time + booking duration. Change later

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

        const { data: business, error: businessError } = await supabase.from("Business").select("id").eq("slug", slug).single()

        if (businessError) {
            console.log("Error:", businessError);

            return { success: false, error: businessError };


        }

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
                    table_id: "dwdw"
                }
            );

                   if (bookingError) {
            console.log(bookingError);

            return {
                success: false,
                error: bookingError.message
            }
        };

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

