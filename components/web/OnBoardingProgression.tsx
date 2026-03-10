import { Field, FieldLabel } from "@/components/ui/field"
import { Progress } from "@/components/ui/progress"
import { buttonVariants } from "../ui/button"
import Link from "next/link"
import { Card, CardHeader, CardTitle } from "../ui/card"
import { CircleCheckBig, CircleX, SquarePen } from "lucide-react"


const steps = [
    { id: 1, title: "Business Details" },
    { id: 2, title: "Opening Hours" },
    { id: 3, title: "Tables" },
    { id: 4, title: "Review" },
]

export default function OnBoardingProgression({ currentStep }: { currentStep: number }) {



    const progress = (currentStep / steps.length) * 100;
    return (
        <div className="my-8">
            <Field className="w-full max-w-sm">
                <FieldLabel htmlFor="progress-upload">
                    <span>Onboarding progress</span>
                    <span className="ml-auto">{Math.round(progress)}%</span>
                </FieldLabel>
                <Progress value={progress} id="progress-upload" />
            </Field>
            <p className="mt-3">Your business is not live yet</p>

            <div className=" mt-3 flex gap-5 flex-wrap">
                {steps.map((step) => {
                    const isComplete = step.id < currentStep
                    const isCurrent = step.id === currentStep

                    return (
               
                            <Card size="sm" className="w-full max-w-xs" key={step.id}>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-5">
                                        {
                                        isComplete ?
                                        <CircleCheckBig className="text-primary" /> : 
                                        isCurrent ?
                                        <SquarePen className="text-yellow-300" />:
                                        <CircleX className="text-red-400" />}{step.title} {isCurrent && '- Editing'}
                                        
                                        </CardTitle>
                                </CardHeader>
                            </Card>
                     

                        //         <div
                        //             key={step.id}
                        //             className="flex items-center justify-between border rounded-md p-3"
                        //         >
                        //             <div className="flex items-center gap-3">
                        //                 <div   className={`h-6 w-6 flex items-center justify-center rounded-full text-xs
                        //         ${isComplete ? "bg-green-500 text-white" :
                        //           isCurrent ? "bg-primary text-white" :
                        //           "bg-muted"}
                        //       `}>{isComplete ? "✓" : step.id}

                        //                 </div>

                        //                    <span className="text-sm font-medium">
                        //       {step.title}
                        //     </span>

                        //             </div>


                        //   {isCurrent && (
                        //     <span className="text-xs text-muted-foreground">
                        //       Current
                        //     </span>
                        //   )}

                        //   {isComplete && (
                        //     <span className="text-xs text-green-600">
                        //       Completed
                        //     </span>
                        //   )}
                        //         </div>
                    )
                })}
            </div>







            <Link href={'/onboarding'} className={buttonVariants({ className: "mt-5" })}>Continue</Link>

        </div>

    )
}