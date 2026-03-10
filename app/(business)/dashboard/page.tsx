
import BusinessCard from "./_components/BusinessCard";
import { redirect } from "next/navigation";
import { getUserBusiness } from "@/lib/db/queries/business";



export default  async function Page() {


  const business = await getUserBusiness()


  if (!business.data) {
    redirect("/onboarding?step=1")
  };

    if (business.data.setup_step !== 1) {
    redirect(`/onboarding?step=${business.data.setup_step}`)
  }

    if (!business.data.is_public) {
    redirect("/onboarding?step=4")
  }
  


  return (
 <div className="space-y-3">
<BusinessCard/>
  
    
 
 </div>
  )
}
