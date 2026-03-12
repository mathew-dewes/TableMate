import { buttonVariants } from "@/components/ui/button";
import { getSession } from "@/lib/auth/session";
import { isUserBusinessPublished } from "@/lib/db/queries/business";
import Link from "next/link";

export default async function page(){

  const session = await getSession();
  let published = null;

  if (session){
    const isBusinessPublic = await isUserBusinessPublished();
    published = isBusinessPublic.data?.is_public
  }


  return (
    <div>
      <div className="mt-10 text-center">
      <p>Welcome to Table Mate!</p>
      <div className="mt-10 flex gap-1 justify-center">
        {!session && <Link className={buttonVariants()} href={'/login'}>Login</Link>}
        {published && <Link className={buttonVariants()} href={'/dashboard'}>Dashboard</Link>}
        {published && session && <Link className={buttonVariants()} href={'/onboarding'}>Continue onboarding</Link>}
        <Link className={buttonVariants()} href={'/restaurants'}>View restaurants</Link>
   

      </div>

      </div>
 
    </div>
  )
}