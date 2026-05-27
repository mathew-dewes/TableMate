
import { getUserBusiness } from "@/lib/supabase/queries/business";
import DashboardLinks from "./_components/DashboardLinks";
import { redirect } from "next/navigation";
import { Business } from "@/lib/types";

export default async function BlogLayout({
    children,
}: {
    children: React.ReactNode
}){

const business = await getUserBusiness() as Business;

    if (!business){
        redirect('/setup')
    };

    if (!business.setup_completed) {
  redirect("/setup");
}
    
    
    return (
        <section>
          <DashboardLinks/>
            {children}
        </section>)
}