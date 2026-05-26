"use client";

import Link from "next/link"
import { buttonVariants } from "../ui/button"
import { navLinks } from "@/lib/constants"
import { usePathname } from "next/navigation";

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

        </ul>
    )
}