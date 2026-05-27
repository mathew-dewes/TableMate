import { getUserBusiness } from "@/lib/supabase/queries/business";

export default async function page(){

     const business = await getUserBusiness();

     console.log(business);
     
    return (
        <div>
  
        </div>
    )
}