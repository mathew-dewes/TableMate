import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";


export default function BusinessReviewCard(){
    return (
         <Card className="w-full max-w-2xl">
        <CardHeader>
            <CardTitle>Business:</CardTitle>
            <CardDescription>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse, eveniet.</CardDescription>
        </CardHeader>

        <CardContent>
  
                <ul>
            
                    <li>Name: Hello World</li>
                    <li>Phone: 1234</li>
                    <li>email: example@gmail.com</li>
                    <li>Address: 123 example street</li>
                    <li>Description: Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia ea porro tenetur suscipit doloribus accusantium modi voluptates ipsam, animi inventore!</li>
            
                </ul>
   
      
        
        </CardContent>

   <CardFooter className="flex justify-end">
            <Button>Edit details</Button>
        </CardFooter>

       </Card>
    )
}