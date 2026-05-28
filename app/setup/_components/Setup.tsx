
import BusinessForm from "./business/BusinessForm";
import HoursForm from "./hours/HoursForm";
import SettingsForm from "./settings/SettingsForm";
import TablesForm from "./tables/TablesForm";
import { getUserBusiness } from "@/lib/supabase/queries/business";
import { Business } from "@/lib/types";



export default async function Setup() {
  const business = await getUserBusiness() as Business;


const step = business?.setup_step ?? 1;

  return (
    <>
      {step === 1 && (
        <BusinessForm />
      )}

      {step === 2 && (
        <HoursForm />
      )}

      {step === 3 && (
        <SettingsForm />
      )}

      {step === 4 && (
        <TablesForm />
      )}
    </>
  )

}