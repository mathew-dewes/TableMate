import { buttonVariants } from "@/components/ui/button"
import { Check, SquarePen } from "lucide-react";
import Link from "next/link";


const setup_steps = ["business", "hours", "settings", "tables"];


export default function OnBoardingSteps({ setup_step }:
  { setup_step: number }
) {
  return (
    <div className="mt-2 space-y-2">
      {setup_steps.map((step, index) => {
        return <div key={step} className="flex gap-2 items-center">
          {index + 1 >= setup_step ? "" : <Check />}
          <p className="capitalize">{step}</p>
          {index + 1 >= setup_step ? "" : 
          <Link 
          className={buttonVariants({ variant: "secondary", size: "sm" })} 
          href={`/setup/edit/${step}`}><SquarePen size="15" />Edit</Link>}

        </div>
      })}

    </div>
  )
}