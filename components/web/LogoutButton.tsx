"use client";

import { signOut } from "@/lib/auth/actions";
import { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";

export default function LogoutButton(){
    const [isPending, startTransition] = useTransition();

    function logout(){
        startTransition(async()=>{
            const res = await signOut();

            if (res.success){
                toast.success(res.message)
            } else {
                toast.error(res.message)
            }
        })
    };

    return <Button onClick={logout} disabled={isPending}>Logout</Button>
}