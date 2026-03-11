
import { getUserBusiness } from "@/lib/db/queries/business";
import BusinessStep from "./_components/BusinessStep";
import HoursStep from "./_components/HoursStep";
import TableStep from "./_components/TablesStep";
import { redirect } from "next/navigation";
import FinalReview from "./_components/FinalReview";


export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ step?: string }>
}) {

  const step = Number((await searchParams).step ?? "1");
  const business = await getUserBusiness()
  const setupStep = Number(business.data?.setup_step ?? 1);

    if (step > setupStep) {
    redirect(`/onboarding?step=${setupStep}`)
  }

  switch (step) {
    case 1:
      return <BusinessStep />
    case 2:
      return <HoursStep />
    case 3:
      return <TableStep />
    case 4:
      return <FinalReview />

  }

}