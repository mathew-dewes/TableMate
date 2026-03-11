import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function page(){
  return (
    <div>
      <div className="mt-10 text-center">
      <p>Welcome to Table Mate!</p>
      <div className="mt-10 flex gap-1 justify-center">
        <Link className={buttonVariants()} href={'/login'}>Login</Link>
        <Link className={buttonVariants()} href={'/restaurants'}>View Restaurants</Link>

      </div>

      </div>
 
    </div>
  )
}