import { getSession } from "@/lib/auth/session";
import NavLinks from "./NavLinks";

export default async function NavBar(){

    const session = await getSession();
    
    return (
        <div className="flex justify-between">
            <h1 className="text-xl font-medium">Table<span className="text-primary font-bold">Mate</span></h1>

            <NavLinks activeSession={!session}/>


        </div>
    )
}