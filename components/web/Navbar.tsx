import Link from "next/link"
import { Button, buttonVariants } from "../ui/button"

export default function Navbar(){
    return (
        <div className="md:px-10 py-5 px-5 items-center flex justify-between bg-primary/50">
            <h1 className="text-white">TableMate</h1>
            <ul className="flex gap-10 items-center">
                <Link className={buttonVariants({variant: "ghost"})} href={'/reservations'}>Reservations</Link>
                <Button variant={"ghost"}>Settings</Button>
                <Button variant={"ghost"}>Link</Button>
    
            </ul>

        </div>
    )
}