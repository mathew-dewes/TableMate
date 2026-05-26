import Link from "next/link"
import NavLinks from "./NavLinks"

export default function Navbar() {
    return (
        <div className="md:px-10 py-5 px-5 items-center flex justify-between bg-primary/50">
            <Link href={'/'}><h1 className="text-white">TableMate</h1></Link>
        
     <NavLinks/>

        </div>
    )
}