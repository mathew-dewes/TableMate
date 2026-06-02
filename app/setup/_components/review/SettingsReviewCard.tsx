import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BusinessSettings } from "@/lib/types";
import Link from "next/link";

export default function SettingsReviewCard({settings}:
    {settings: BusinessSettings}
){
    return (
         <Card className="w-full max-w-2xl">
        <CardHeader>
            <CardTitle>Settings</CardTitle>
            <CardDescription>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse, eveniet.</CardDescription>
        </CardHeader>

        <CardContent>
            <div>
                <p>Max party size: {settings.max_party_size}</p>
                <p>Booking duration: {settings.booking_duration}</p>
                <p>Slot intervals: {settings.slot_interval_minutes} minutes</p>
                <p>Max future booking days: {settings.max_future_booking_days}</p>
            </div>
       
        
        </CardContent>

        <CardFooter className="flex justify-end">
  <Link className={buttonVariants()} href={'/setup/edit?details=settings'}>Edit details</Link>
        </CardFooter>

       </Card>
    )
}