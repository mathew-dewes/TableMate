"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, } from "next/navigation";
import { buttonVariants } from "../ui/button";
import LogoutButton from "./LogoutButton";
import { ThemeToggle } from "./ThemeToggle";


const navLinks = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Restaurants', href: '/restaurants' },

]

export default function NavLinks({ activeSession }: { activeSession: boolean }) {


    const pathname = usePathname();


    function isActive(path: string) {
        if (path === "/") {
            return pathname === "/"
        }


        return pathname.startsWith(path)
    }

    return <ul className="flex gap-5 items-center font-medium">

        {navLinks.map((link, key) => {
            const show = !activeSession || link.href === '/restaurants'
            return (
                <li
                    key={key}
                    className={cn(
                        "transition-all duration-300 ease-out transform",
                        show
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 -translate-y-2 pointer-events-none absolute"
                    )}>
                    <Link
                        className={cn(
                            buttonVariants({ variant: `${isActive(link.href) ? "default" : "ghost"}`, size: "lg" }))}
                        href={link.href}>{link.name}</Link>
                </li>
            )
        })}
        {!activeSession ? <LogoutButton /> :
            <li className={cn(
                "transition-all duration-300 ease-out transform",
                activeSession
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-2 pointer-events-none absolute"
            )}><Link
                href={'/login'}
                className={cn(
                    buttonVariants({ variant: `${pathname == "/login" || pathname == "/register" ? "default" : "ghost"}`, size: "lg" }))}

            >Login</Link></li>
        }





        <ThemeToggle />



    </ul>
}