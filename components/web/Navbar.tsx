import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import LogoutButton from "./LogoutButton";
import { getSession } from "@/lib/auth/session";

export default async function NavBar(){

    const session = await getSession();
    
    return (
        <div className="flex justify-between">
            <h1>TableMate</h1>

            <ul className="flex gap-10 items-center">
                {session && <Link href={'/dashboard'}>Dashboard</Link>}
        
                <Link href={'/'}>Home</Link>
                <Link href={'/hello'}>Slug</Link>
             
                {session ? <LogoutButton/> : <Link href={'/login'}>Login</Link>}
      
                <ThemeToggle/>
            </ul>
        </div>
    )
}