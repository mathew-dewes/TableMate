import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default async function page({
  params,
}: {
  params: Promise<{ slug: string }>
}){

     const { slug } = await params;


const res = await fetch(`${process.env.BASE_URL
}/api/business/${slug}`, {
  next: {
    revalidate: 3600,
    tags: ["business"]
  }
});
  const business = await res.json();


    return (
        <div>
            <Card className="w-full max-w-xl">
                <CardHeader>
                    <CardTitle>{business.data.name}</CardTitle>
                    <CardDescription>{business.data.address}</CardDescription>
                </CardHeader>
                
            </Card>
        </div>
    )
}