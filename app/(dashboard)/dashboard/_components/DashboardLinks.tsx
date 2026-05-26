"use client";

import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { dashboardLinks } from "@/lib/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLinks() {
    const path = usePathname();
    return (
        <ButtonGroup>
            {dashboardLinks.map((link) => {
                return (
                    <Button
                        key={link.label}
                        asChild
                        variant={path.startsWith(link.href) ? "default" : "outline"}>
                        <Link
                            href={link.href}>
                            {link.label}
                        </Link>
                    </Button>

                )
            })}

        </ButtonGroup>
    )
}