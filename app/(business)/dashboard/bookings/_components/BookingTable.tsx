import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getUserBookings } from "@/lib/db/queries/booking";
import { UserBooking } from "@/lib/db/types";
import { format } from "date-fns";

export async function BookingTable(){

    const bookings = await getUserBookings() as UserBooking[];

  

    return (
        <div className="grid grid-cols-2 gap-10">
            {bookings.map((booking)=>{
                return <Card key={booking.id} className="w-full max-w-3xl">
            <CardHeader>
                <CardTitle>
{booking.guest_name}
                </CardTitle>
                <CardDescription>
                    <p>Date: {format(booking.start_time, "dd/MM/yy - eeee") } </p>
                    <p>Time: {format(booking.start_time, "hh:mm aa")} - {format(booking.end_time, "hh:mm aa")} </p>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p>Party size: {booking.party_size}</p>
                <div className="mt-5">
                    <p className="font-semibold">Contact:</p>
                    <div className="mt-2 space-y-1">
            <p>{booking.guest_email}</p>
            <p>{booking.guest_phone}</p>
                    </div>
        
                </div>

                <p className="mt-5">Notes: {booking.notes}</p>
            </CardContent>
            <CardFooter>
                <Button>Confirm attendence</Button>
            </CardFooter>
  
        </Card>
            })}

        </div>
        
    )
}