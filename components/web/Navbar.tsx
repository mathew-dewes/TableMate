import { getSession } from "@/lib/auth/session";
import NavLinks from "./NavLinks";

export default async function NavBar(){

    const session = await getSession();
    
    return (
        <div className="flex justify-between items-center mt-10 w-full px-4 md:px-6 lg:px-8">
  <h1 className="text-xl font-medium">Table<span className="text-primary font-bold">Mate</span></h1>
          

            <NavLinks activeSession={!session}/>


        </div>
    )
}