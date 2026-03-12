import { buttonVariants } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getBusinessAvailablityForSelectedDay } from "@/lib/db/queries/Availability";
import { getBookedTables } from "@/lib/db/queries/booking";
import { getEligibleTables } from "@/lib/db/queries/tables";
import { AvailabilityType } from "@/lib/db/types";
import { filterBookedSlots, generateSlots } from "@/lib/utils";
import { format } from "date-fns"
import Link from "next/link";



type Props = {
    slug: string,
    booking_date: Date,
    partySize: number
}

export default async function BookingResults({ slug, booking_date, partySize }: Props) {

    // Return all tables which are not booked and have adequate seating

    const availability = await getBusinessAvailablityForSelectedDay(slug, booking_date);
    const eligibleTables = await getEligibleTables(partySize) as { id: string, table_number: number, capacity: number }[]
    const bookedTables = await getBookedTables(slug, booking_date) as { id:string, table_id: string; start_time: Date; end_time: Date  }[];

    const businessHours = availability.data as AvailabilityType;

    const slots = generateSlots(
        booking_date,
        businessHours.opening_time,
        businessHours.closing_time,
        60
    );

    const availableSlots = filterBookedSlots(
        slots,
        eligibleTables,
        bookedTables,
        30
    );


    if (!availability.data) {
        return (
            <p>This restaurant is closed on the selected day.</p>
        )
    }



    return (
   
            <div className="flex gap-5 flex-wrap mt-5">
                {availableSlots.map((slot) => {
                    return <Card key={slot.toISOString()} className="w-full max-w-40">
                        <CardHeader>
                            <CardTitle className="text-center">{format(slot, "HH:mm")}</CardTitle>
                        </CardHeader>
            
                        <CardFooter>
                            <Link className={buttonVariants({className: "w-full"})} href={`/restaurants/${slug}/confirm?date=${slot.toISOString()}`}>Select time</Link>
                         
                        </CardFooter>
                    </Card>

                })}

            </div>


    )
}