import {Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getBusinessAvailablity } from "@/lib/db/queries/Availability";
import { getExistingBookings } from "@/lib/db/queries/booking";
import { getEligibleTables } from "@/lib/db/queries/tables";
import { format } from "date-fns";


type Props = {
    selectedDay: string,
    partySize: number,
    slug: string
}


export default async function BookingResults({selectedDay, partySize, slug}: Props) {



    const queryDate = new Date(selectedDay);
    const dayNumber = queryDate.getDay();

    const availablity = await getBusinessAvailablity(slug, dayNumber);
    const eligibleTables = await getEligibleTables(partySize);


    const start = new Date(`${selectedDay}T${availablity.data?.opening_time}`);
    const end = new Date(`${selectedDay}T${availablity.data?.closing_time}`);


    const bookings = await getExistingBookings(slug, start, end)


console.log(bookings) // 2026-03-17T08:00:00.000 (local)
  // 2026-03-17T12:00:00.000 (local)





    






    


    

    return (
   
            <div className="flex gap-5 flex-wrap mt-5">
    
                    
                 <Card className="w-full max-w-40">
                        <CardHeader>
                            <CardTitle className="text-center">Time slot</CardTitle>
                        </CardHeader>
            
                        <CardFooter>
                            <Button className="w-full">Book</Button>
                          
                         
                        </CardFooter>
                    </Card>

     

            </div>


    )
}