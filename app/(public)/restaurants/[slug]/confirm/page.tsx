import BookingForm from "./_components/BookingForm";

export default async function page({
    searchParams, params
}: {
    searchParams: Promise<{ [key: string]: string }>,
    params: Promise<{ slug: string }>
}) {

    const { slug } = await params;
    const bookingDate = (await searchParams).date;
    const table_number = (await searchParams).table;
    const startTime = new Date(bookingDate);




    return (
        <div>
            <p>Booking confirmation for {startTime.toLocaleString()}</p>
            <BookingForm slug={slug} startTime={startTime} table_number={table_number} />
        </div>
    )
}