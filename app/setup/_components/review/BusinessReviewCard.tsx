import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Business } from "@/lib/types";
import Link from "next/link";


export default function BusinessReviewCard({business}:
    {business: Business}
){
    return (
         <Card className="w-full max-w-2xl">
        <CardHeader>
            <CardTitle>Business:</CardTitle>
            <CardDescription>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse, eveniet.</CardDescription>
        </CardHeader>

        <CardContent>
                <ul>
                    <li>Name: {business.name}</li>
                    <li>Phone: {business.phone}</li>
                    <li>email: {business.email}</li>
                    <li>Address: {business.address}</li>
                    <li>Description: {business.description}</li>
            
                </ul>
   
      
        
        </CardContent>

   <CardFooter className="flex justify-end">
    <Link className={buttonVariants()} href={'/setup/edit/business'}>Edit details</Link>
        </CardFooter>

       </Card>
    )
}