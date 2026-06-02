import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function HoursReviewCard(){
    return (
         <Card className="w-full max-w-2xl">
        <CardHeader>
            <CardTitle>Work hours</CardTitle>
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
            <Button>Edit details</Button>
        </CardFooter>

       </Card>
    )
}