"use client";

import Link from "next/link"

import { navLinks } from "@/lib/constants"
import { usePathname } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import SignOutButton from "./SignoutButton";

export default function NavLinks() {

    const authenticated = false;

    const path = usePathname();
      const isKnownRoute = navLinks.some(
    (link) => link.href === path
  );

    if (!isKnownRoute && path !== "/") return null;
    return (
        <ul className="flex gap-5 items-center">
            {navLinks.map((link) => {
                if (!authenticated && link.href == "/dashboard") return null;
                return (
                    <Link
                        key={link.label}
                        className={buttonVariants(
                            { variant: path.startsWith(link.href) ? "secondary" : "ghost" })}
                        href={link.href}
                    >{link.label}</Link>
                )
            })}
            <SignOutButton session={true}/>

        </ul>
    )
}