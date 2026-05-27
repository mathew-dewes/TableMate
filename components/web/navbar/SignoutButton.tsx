"use client";

import { Button } from "@/components/ui/button"
import { SignOut } from "@/lib/supabase/authActions";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

export default function SignOutButton({session}:
    {session: boolean}
){
    const [isPending, startTransition] = useTransition();
    const router = useRouter()
    
    return  (
    
    <Button className="bg-gray-500" hidden={!session} disabled={isPending} onClick={()=>{
        startTransition(async()=>{
    const res = await SignOut();
    if (res?.success){
        router.push('/');
        toast.success(res.message)
    }
        })
                
                }}>Sign out</Button>
            
            )
}