import {buttonVariants } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getBusinessAvailablity } from "@/lib/db/queries/Availability";
import { getExistingBookings } from "@/lib/db/queries/booking";
import { getEligibleTables } from "@/lib/db/queries/tables";
import {EligibleTables, ExistingBookings } from "@/lib/db/types";
import { generateSlots } from "@/lib/utils";
import { addMinutes, format } from "date-fns"
import Link from "next/link";



type Props = {
    slug: string,
    booking_date: Date,
    partySize: number
}

export default async function BookingResults({ slug, booking_date, partySize }: Props) {

    // Return all tables which are not booked and have adequate seating

    const availability = await getBusinessAvailablity(slug, booking_date);
    const eligibleTables = await getEligibleTables(partySize) as EligibleTables[];

    const booking_duration = availability.booking_duration ?? 60;
    const existingBookings = await getExistingBookings(slug, booking_date) as ExistingBookings[];



    
    
    


    



    if (!availability.data){
        return <p>Sorry, this business is closed</p>

    }

    

    const slots = generateSlots(
        booking_date,
        availability.data.opening_time,
        availability.data.closing_time,
        booking_duration ?? 60
    );


const slotStatus = slots.map((slot) => {
  const slotStart = slot;
  const slotEnd = addMinutes(slotStart, booking_duration);

  // Find which tables are booked for this slot
  const bookedTableIds = existingBookings
    .filter((b) => {
      const bookingStart = new Date(b.start_time);
      const bookingEnd = new Date(b.end_time);
      return slotStart < bookingEnd && slotEnd > bookingStart;
    })
    .map((b) => b.table_id);

  // Find first free table
  const freeTable = eligibleTables.find((t) => !bookedTableIds.includes(t.id));

  return {
    time: slot,
    available: !!freeTable, // available if there is at least one free table
    tableId: freeTable?.id || null, // pass this to the booking page
  };
});

   



  







 

    return (
   
            <div className="flex gap-5 flex-wrap mt-5">
                {slotStatus.map((slot) => {
                    
                    return <Card key={slot.time.toISOString()} className="w-full max-w-40">
                        <CardHeader>
                            <CardTitle className="text-center">{format(slot.time, "HH:mm")}</CardTitle>
                        </CardHeader>
            
                        <CardFooter>
                            <Link 
                            className={buttonVariants({className: `w-full ${!slot.available ? 'pointer-events-none opacity-70 bg-secondary' : ''}`})} 
                            href={`/restaurants/${slug}/confirm?date=${encodeURIComponent(slot.time.toISOString())}&table=${slot.tableId}`}>
                                {!slot.available ? 'Unavailable' : 'Select time'}</Link>
                         
                        </CardFooter>
                    </Card>

                })}

            </div>


    )
}