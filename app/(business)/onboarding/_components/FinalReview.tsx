import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getBusinessWorkHours } from "@/lib/db/queries/Availability";
import { getUserBusiness } from "@/lib/db/queries/business";
import { getBusinessTables } from "@/lib/db/queries/tables";
import { days } from "@/lib/utils";
import PublishButton from "./PublishButton";

export default async function FinalReview() {

    const business = await getUserBusiness();
       if (!business || !business.data) {
        return 
    }
    const workHours = await getBusinessWorkHours(business.data.id);
    const tables = await getBusinessTables(business.data.id);


    return (
        <Card className="w-full max-w-2xl">
            <CardHeader>
                <CardTitle className="font-semibold">Final review:</CardTitle>
                <CardDescription>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, iure?</CardDescription>
            </CardHeader>

            <CardContent>

                <Separator />
                <div className="my-2">
                    <CardTitle className="font-semibold">Business details:</CardTitle>
                    <div className="space-y-1 mt-3 text-sm">
                        <div className="flex gap-1">
                            <h2 className="font-medium">Name:</h2>
                            <p className="tracking-tight">{business.data?.name}</p>
                        </div>
                        <div className="flex gap-1">
                            <h2 className="font-medium">Email:</h2>
                            <p className="tracking-tight">{business.data?.email}</p>
                        </div>
                        {business.data?.phone && 
                           <div className="flex gap-1">
                            <h2 className="font-medium">Phone:</h2>
                            <p className="tracking-tight">{business.data?.phone}</p>
                        </div>}
                     
                        <div className="flex gap-1">
                            <h2 className="font-medium">Address:</h2>
                            <p className="tracking-tight">{business.data?.address}</p>
                        </div>
                        <div className="flex gap-1">
                            <h2 className="font-medium">Region:</h2>
                            <p className="tracking-tight">{business.data?.region}</p>
                        </div>
                        {business.data?.description && 
                            <div className="flex gap-1 mt-3">
                            <h2 className="font-medium">Description:</h2>
                            <p className="tracking-tight">{business.data?.description}</p>
                        </div>
                        }
                    


                    </div>
                    <Button className="mt-4">Edit details</Button>

                </div>
                <Separator />

                <div className="my-2">
                    <CardTitle className="font-semibold">Working hours:</CardTitle>
                    <div className="space-y-3 mt-3 text-sm">
                        {workHours.data?.map((day)=>{
                            return   <div key={day.day_of_week} className="flex gap-1">
                            <h2 className="font-medium">{days[day.day_of_week - 1].label}:</h2>
                            <p className="tracking-tight">07:00 - 14:00</p>
                        </div>
                        })}
                  
            
                    </div>
                    <Button className="mt-4">Edit hours</Button>

                </div>

                <Separator />

                <div className="my-2">
                    <CardTitle className="font-semibold">Tables:</CardTitle>
                    <div className="space-y-3 mt-3 text-sm">
                        {tables.data?.map((table)=>{
                            return <div key={table.table_number} className="flex gap-1">
                            <h2 className="font-medium">Table {table.table_number}:</h2>
                            <p className="tracking-tight">Max capacity: {table.capacity}</p>
                        </div>
                        })}
                    
        
                    </div>
                    <Button className="mt-4">Edit hours</Button>

                </div>

                <Separator />

            </CardContent>
            <CardFooter className="flex justify-end">
                <PublishButton businessId={business.data.id}/>
            </CardFooter>
        </Card>
    )
}