"use client";

import Link from "next/link"

import { dashboardLinks, navLinks } from "@/lib/constants"
import { usePathname } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import SignOutButton from "./SignoutButton";

export default function NavLinks({ session }:
    { session: boolean}
) {
    const path = usePathname();
      const isNavRoute = navLinks.some(
    (link) => link.href === path
  );

  const isDashboardRoute = dashboardLinks.some(
    (link) => link.href == path
  )

    if (!session &&
        !isNavRoute && !isDashboardRoute && path !== "/") return null;
    return (
        <ul className="flex gap-5 items-center">
            {navLinks.map((link) => {
                if (!session && link.href == "/dashboard") return null;
                return (
                    <Link
                    hidden={session}
                        key={link.label}
                        className={buttonVariants(
                            { variant: path.startsWith(link.href) ? "secondary" : "ghost" })}
                        href={link.href}
                    >{link.label}</Link>
                )
            })}
            <SignOutButton session={session}/>

        </ul>
    )
}