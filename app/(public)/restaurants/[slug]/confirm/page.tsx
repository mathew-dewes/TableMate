export default async function page({
  searchParams,
}: {
    searchParams: Promise<{ [key: string]: string}>
}){

         const bookingDate = (await searchParams).date;
         const date = new Date(bookingDate);

         console.log(date.toLocaleString());
         
    return (
        <div>
            <p>Booking confirmation page {date.getDate()}</p>
            {/* User booking details to go here */}
            {/* Name, email, phone, notes etc with submit button on the form which places the order */}
        </div>
    )
}