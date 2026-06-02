import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { businessHours } from "@/lib/types";
import { minutesToTime } from "@/lib/utils";
import Link from "next/link";


export default function HoursReviewCard({businessHours}:
    {businessHours: businessHours[]}
){

    const formattedHours = businessHours.map(({ day_of_week, open, close }) => ({
  day: day_of_week,
  hours:
    open === 0 && close === 0
      ? 'Closed'
      : `${minutesToTime(open)} - ${minutesToTime(close)}`
}));

console.log(formattedHours);

    return (
         <Card className="w-full max-w-2xl">
        <CardHeader>
            <CardTitle>Work hours</CardTitle>
            <CardDescription>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse, eveniet.</CardDescription>
        </CardHeader>

        <CardContent>
                <ul className="space-y-2">
                    {formattedHours.map((hour)=>{
                        return <li key={hour.day}>{hour.day}: {hour.hours}</li>
                    })}
            

                </ul>
        
        
        </CardContent>

       <CardFooter className="flex justify-end">
           <Link className={buttonVariants()} href={'/setup/edit?details=hours'}>Edit details</Link>
        </CardFooter>

       </Card>
    )
}