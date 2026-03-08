import { buttonVariants } from '@/components/ui/button'
import { getSession } from '@/lib/auth/session'
import Link from 'next/link'
 
export default async function NotFound() {

    const session = await getSession();

  return (
    <div>
        <div className='mt-20'>
      <h1 className='text-3xl text-center font-semibold'>Page Not Found</h1>
      <div className='mt-10'>
      <p className='text-center'>The page you are looking for cannot be found</p>
      <div className='mt-20 flex justify-center gap-5'>
        {session ? (
            <Link className={buttonVariants()} href="/dashboard">Go to Dashboard</Link>) : (  
            <Link className={buttonVariants()} href="/login">Go to Login</Link>)}
  <Link className={buttonVariants()} href="/">Return Home</Link>
      </div>
    
      </div>

        </div>

    </div>
  )
}