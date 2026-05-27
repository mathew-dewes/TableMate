import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function page(){


  return (
    <div>
      <div className="text-center">
      <h1>Welcome to Table Mate!</h1>
      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure, consequatur?</p>
      <div className="mt-10 flex justify-center gap-2">
  <Link className={buttonVariants()} href={'/login'}>Login</Link>
  <Link className={buttonVariants()} href={'/register'}>Register</Link>
      </div>

      </div>

      <div className="text-center mt-10 space-y-2">
        <p>To view test business, click on bobs burgers</p>
          <Link className={buttonVariants()} href={'/bobs-burgers'}>Bob&apos;s Burgers</Link>
      </div>
      

      
  
    </div>

  )
}