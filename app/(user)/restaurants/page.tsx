import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BusinessType } from "@/lib/db/types";
import Link from "next/link";


export default async function page(){

    const res = await fetch(`${process.env.BASE_URL
}/api/business/`, {
  next: {
    revalidate: 3600,
    tags: ["business"]
  }
});
  const getBusinesses = await res.json();

  const businesses = getBusinesses.data as  BusinessType




    return(
        <div className="flex gap-10">
            {businesses.map((item)=>{
                return <Card className="w-full max-w-xl" key={item.id}>
                <CardHeader>
                    <CardTitle>{item.name}</CardTitle>
                    {item.description && 
                    <CardDescription>{item.description}</CardDescription>
                    }
                    
                </CardHeader>

                <CardContent>
                    <div>
                        <p>Email: {item.email}</p>
                        <p>Address: {item.address}</p>
                        <p>Region: {item.region}</p>
                        <p>Business hours: Mon - Friday (8 - 2pm)</p>
                    </div>
                </CardContent>
                <CardFooter>
                    <Link href={'/restaurants/' + item.slug} className={buttonVariants({className: "w-1/2"})}>Book Tables</Link>
                </CardFooter>
                
            </Card>
            })}
    
      
        </div>
    )
}