import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function page(){
    return (
        <div>
            <h1>Business page</h1>
            <Link className={buttonVariants()} href={'/business/book'}>Book</Link>
        </div>
    )
}