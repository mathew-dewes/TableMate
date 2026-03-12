"use client"

import { Button } from "@/components/ui/button";
import { deleteBusiness } from "@/lib/db/mutations/business";

import { useTransition } from "react";
import { toast } from "sonner";

export default function DeleteBusinessButton({businessId}:{businessId: string}){
        const [isPending, startTransition] = useTransition();


        function handleDelete(){
            startTransition((async()=>{
                const res = await deleteBusiness(businessId);

                if (res.success){
                    toast.success(res.message);
            
                } else {
                    toast.error(res.error)
                }
            }))
        }
    return(
        <Button type="button" disabled={isPending} onClick={handleDelete}>{isPending ? "Deleting" : "Delete Business"}</Button>
    )
}