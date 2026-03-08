import BusinessDetailsForm from "./_components/BusinessDetailsForm";
import SetUpComplete from "./_components/Complete";
import HoursForm from "./_components/HoursForm";
import TablesForm from "./_components/TablesForm";

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ step?:string }>
}) {

    const step = (await searchParams).step || "details";

      if (step === "details") {
    return <BusinessDetailsForm />
  }

  if (step === "hours") {
    return <HoursForm />
  }

  if (step === "tables") {
    return <TablesForm />
  }

  if (step === "complete") {
    return <SetUpComplete />
  }

    return (
        <div>
            <p>Business set up page {step}</p>
            {/* Restaurant details form to go here */}
            {/* Restaurant Name
            Phone Number
            Address
            City
            Country
            Website (optional) */}
        </div>
    )
}