"use client";

import Link from "next/link"
import { buttonVariants } from "../ui/button"
import { navLinks } from "@/lib/constants"
import { usePathname } from "next/navigation";

export default function NavLinks(){

    const path = usePathname();
    return (
             <ul className="flex gap-10 items-center">
                {navLinks.map((link) => {
                    return (
                        <Link 
                        key={link.label} 
                        className={buttonVariants(
                            {variant: path.startsWith(link.href) ? "secondary" : "ghost" })} 
                        href={link.href}
                        >{link.label}</Link>
                    )
                })}

            </ul>
    )
}