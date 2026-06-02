"use client";

import { Button } from "@/components/ui/button";
import { deleteBusiness, publishBusiness } from "@/lib/supabase/mutations/business";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

export default function ReviewActionButtons() {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    function handleCancel() {
        startTransition((async () => {
            const res = await deleteBusiness();

            if (!res.success) {
                toast.error(res.message)
            } else {
                toast.success(res.message);
                router.refresh()
            }
        }));
    };


    function handlePublish() {
        startTransition((async () => {
            const res = await publishBusiness();
            if (!res.success) {
                toast.error(res.message)
            } else {
                toast.success(res.message);
                router.push('/dashboard')
            }
        }))
    }
    return (
        <div className="flex gap-2">
            <Button disabled={isPending} onClick={() => handlePublish()}>Confirm and Publish</Button>
            <Button variant={"destructive"}
                disabled={isPending} onClick={() => handleCancel()}
            >Cancel and redo</Button>
        </div>
    )
}