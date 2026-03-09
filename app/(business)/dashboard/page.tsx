import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";


export default function Page() {
  return (
 <div>

    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle><h2>Matts Burgers</h2></CardTitle>
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
  
    
 
 </div>
  )
}
