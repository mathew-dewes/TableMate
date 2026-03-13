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
    const date = new Date(bookingDate);




    return (
        <div>
            <p>Booking confirmation for {date.toLocaleString()}</p>
            <BookingForm slug={slug} startTime={date} table_number={table_number} />
        </div>
    )
}