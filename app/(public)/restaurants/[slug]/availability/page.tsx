import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import BookingResults from "./_components/BookingResults";

export default async function page({
    params, searchParams}: {
    params: Promise<{ slug: string }>,
    searchParams: Promise<{ [key: string]: string}>
}) {

    const { slug } = await params;

     const bookingDate = (await searchParams).date;
     const partySize = (await searchParams).party;
     
     
    return (
        <div>
            <div className="mt-5">
                <div>
                    <Card className="w-full max-w-xl">
                        <CardHeader>
                            <CardTitle>Available times</CardTitle>
                            <CardDescription>Please select your desired time slot below to proceed to booking</CardDescription>
                        </CardHeader>
                    </Card>
                </div>
                <BookingResults slug={slug} booking_date={new Date(bookingDate)} partySize={Number(partySize)}/>
            </div>

        </div>
    )
}