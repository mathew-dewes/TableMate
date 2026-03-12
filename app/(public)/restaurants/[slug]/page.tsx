import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BusinessType } from "@/lib/db/types";
import { Mail, MapPin, Phone } from "lucide-react";
import { notFound } from "next/navigation";
import TodaysWorkingHours from "../_components/TodaysWorkingHours";
import TableBookingForm from "./_components/TableBookingForm";
import { getBusinessWorkHours } from "@/lib/db/queries/Availability";


export default async function page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {

  const { slug } = await params;


  const res = await fetch(`${process.env.BASE_URL
    }/api/business/${slug}`, {
    next: {
      revalidate: 3600,
      tags: ["business"]
    }
  });
  const getBusiness = await res.json();

  const business = getBusiness.data as BusinessType;


  if (!getBusiness.success) {
    return notFound()
  };

  const workingHours = await getBusinessWorkHours(business.id);

  if (!workingHours.data){
    return notFound()
  }


  


  return (
    <div className="space-y-6">
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle>{business.name}</CardTitle>
          <CardDescription>
            <div className="flex items-center gap-0.5">
              <MapPin className="text-primary" />
              <p>{business.address}, {business.region}</p>
            </div>
          </CardDescription>
        </CardHeader>

        <CardContent>

          {business.description && <p className="mb-2">{business.description}</p>}

          <div>
            <h2 className="font-semibold">Contact:</h2>

            <div className="mt-2 ml-3 space-y-1">
              <div className="flex items-center gap-1">
                <Mail size={15} />
                <p>{business.email}</p>
              </div>
              <div className="flex items-center gap-1">
                <Phone size={15} />
                <p>{business.phone}</p>
              </div>
            </div>

            {business.Availability &&
              <div className="w-lg">
                <TodaysWorkingHours businessHours={business.Availability} />
              </div>
            }


          </div>

        </CardContent>

      </Card>

      <TableBookingForm slug={slug} workHours={workingHours.data} />
    </div>
  )
}