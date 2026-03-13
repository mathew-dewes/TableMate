import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getBusinessAvailablity } from "@/lib/db/queries/Availability";
import { getExistingBookings } from "@/lib/db/queries/booking";
import { getEligibleTables } from "@/lib/db/queries/tables";
import { combineDateAndTime, generateSlots, getAvailableTables } from "@/lib/utils";
import { format } from "date-fns";
import Link from "next/link";


type Props = {
    selectedDay: string,
    partySize: string,
    slug: string
}


export default async function BookingResults({ selectedDay, partySize, slug }: Props) {

    const queryDate = new Date(selectedDay);

    const availablity = await getBusinessAvailablity(slug, queryDate.getDay());
    const eligibleTables = await getEligibleTables(partySize);
    
    const opening = combineDateAndTime(queryDate, availablity.data!.opening_time)
    const closing = combineDateAndTime(queryDate, availablity.data!.closing_time);
    
    const bookings = await getExistingBookings(slug, opening, closing);   

    const slots = generateSlots(
        queryDate,
        availablity.data!.opening_time,
        availablity.data!.closing_time,
        availablity.booking_duration!
    );

    return (

        <div className="flex gap-5 flex-wrap mt-5">
            {slots.map((slot) => {
                
                
                const slotEnd = new Date(slot.getTime() + availablity.booking_duration! * 60000);
     
                const availableTables = getAvailableTables(eligibleTables, bookings, slot, slotEnd);
                const isAvailable = availableTables!.length > 0;

              
    
                
                return <Card key={slot.toISOString()} className="w-full max-w-40">
                    <CardHeader>
                        <CardTitle className="text-center">{format(slot, "HH:mm")}</CardTitle>
                    </CardHeader>

                    <CardFooter>
                            {isAvailable ? (
                <Link
                  className={buttonVariants({ className: "w-full" })}
                  href={`/restaurants/${slug}/confirm?date=${slot.toISOString()}&table=${availableTables[0].id}`}
                >
                  Select time
                </Link>
              ) : (
                <Button
                  className="w-full"
                  variant="secondary"
                  disabled
                >
                  Unavailable
                </Button>
              )}

                    </CardFooter>
                </Card>

            })}

        </div>


    )
}