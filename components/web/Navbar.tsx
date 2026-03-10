import { getSession } from "@/lib/auth/session";
import NavLinks from "./NavLinks";
import { isUserBusinessPublished } from "@/lib/db/queries/business";

export default async function NavBar(){

    const session = await getSession();
    let isPublic;


    if (session){
   const res = await isUserBusinessPublished();
   isPublic = res.data?.is_public ?? false;
   
    } 

    
    return (
        <div className="flex justify-between items-center mt-10 w-full px-4 md:px-6 lg:px-12">
  <h1 className="text-xl font-medium">Table<span className="text-primary font-bold">Mate</span></h1>
          

            <NavLinks activeSession={!session} isBusinessPublic={isPublic ?? false}/>


        </div>
    )
}