import Link from "next/link"
import NavLinks from "./NavLinks"
import { createClientForServer } from "@/lib/supabase/server";

export default async function Navbar() {

       const supabase = await createClientForServer();
    
    
  const { data } = await supabase.auth.getSession();
  const session = data.session;
    return (
        <div className="md:px-10 py-5 px-5 items-center flex justify-between bg-primary/50">
            <Link href={'/'}><h1 className="text-white">TableMate</h1></Link>
        
     <NavLinks session={!!session}/>

        </div>
    )
}