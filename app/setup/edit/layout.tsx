import { buttonVariants } from "@/components/ui/button"
import Link from "next/link"

export default async function BlogLayout({
    children,
}: {
    children: React.ReactNode
}){


    
    
    return (
        <section>
            <Link className={buttonVariants({className: "mb-5"})} href={'/setup'}>Return to Setup</Link>
  
    {children}
        </section>)
}