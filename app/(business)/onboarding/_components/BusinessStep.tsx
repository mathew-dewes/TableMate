import { getUserBusiness } from "@/lib/db/queries/business";
import BusinessDetailsForm from "./_forms/BusinessDetailsForm";

export default async function BusinessStep(){

    const business = await getUserBusiness();

    

    return <BusinessDetailsForm 

    setup_step={business.data?.setup_step ?? 1}
    name={business.data?.name ?? ""}  
    email={business.data?.email ?? ""}
    address={business.data?.address ?? ""}
    phone={business.data?.phone ?? ""}
    region={business.data?.region ?? ""}
    
    
    
    />
}