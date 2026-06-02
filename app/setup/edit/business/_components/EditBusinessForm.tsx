import { getUserBusiness } from "@/lib/supabase/queries/business";
import EditBusinessFormClient from "./EditBusinessFormClient";
import { Business } from "@/lib/types";

export default async function EditBusinessForm(){

    const business = await getUserBusiness() as Business;

    console.log(business);
    
    return <EditBusinessFormClient business={business}/>
}