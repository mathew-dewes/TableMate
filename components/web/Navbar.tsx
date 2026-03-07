import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

export default function NavBar(){
    return (
        <div className="flex justify-between">
            <h1>TableMate</h1>

            <ul className="flex gap-10 items-center">
                <Link href={'/dashboard'}>Dashboard</Link>
                <Link href={'/'}>Home</Link>
                <Link href={'/hello'}>Slug</Link>
                <ThemeToggle/>
            </ul>
        </div>
    )
}