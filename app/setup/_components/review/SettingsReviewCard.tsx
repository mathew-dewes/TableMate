import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function SettingsReviewCard(){
    return (
         <Card className="w-full max-w-2xl">
        <CardHeader>
            <CardTitle>Settings</CardTitle>
            <CardDescription>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse, eveniet.</CardDescription>
        </CardHeader>

        <CardContent>
                <ul>
                    <li>Monday: 01:00am - 05:00pm</li>
                    <li>Monday: 01:00am - 05:00pm</li>
                    <li>Monday: 01:00am - 05:00pm</li>
                    <li>Monday: 01:00am - 05:00pm</li>
                </ul>
       
        
        </CardContent>

        <CardFooter className="flex justify-end">
  <Link className={buttonVariants()} href={'/setup/edit/settings'}>Edit details</Link>
        </CardFooter>

       </Card>
    )
}