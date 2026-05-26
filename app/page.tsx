import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function page(){
  return (
    <div>
      <h1>Welcome to Table Mate!</h1>
      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure, consequatur?</p>
    <Link className={buttonVariants()} href={'/login'}>Login</Link>
    <Link className={buttonVariants()} href={'/register'}>Register</Link>

    </div>

  )
}