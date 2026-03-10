import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getUserBusiness } from "@/lib/db/queries/business";
import Link from "next/link";

export default async function BusinessCard(){

  const business = await getUserBusiness();
  // This function above needs to be put inside a router handler to enable data caching!

  if (!business.data){
return     <Card className="w-full max-w-3xl">
    <CardHeader>
      <CardTitle>No business saved</CardTitle>
      <CardDescription>Lorem ipsum dolor sit amet.</CardDescription>
    </CardHeader>
       <CardFooter>
        <Link className={buttonVariants()} href={'/onboarding'}>Create Business</Link>
   


  
        </CardFooter>
  </Card>
  }

  
    return (
            <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle><h2>{business.data.name}</h2></CardTitle>
        <CardDescription>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti, sunt?</CardDescription>
     
      </CardHeader>
         <CardContent>
          <p>Live capacity: 32/50</p>
          
          
        </CardContent>
        <CardFooter>
   
      <Button>View bookings</Button>
      <Button>View tables</Button>
      <Button>View bookings</Button>
  
        </CardFooter>
      
    </Card>
    )
}