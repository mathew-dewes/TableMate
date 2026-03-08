import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function page(){
    return (
        <div>
            <p>Dashboard route page</p>
            <Link className={buttonVariants()} href={'/dashboard/setup'}>Business setup</Link>
        </div>
    )
}