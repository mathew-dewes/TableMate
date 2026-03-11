import { Field, FieldLabel } from "@/components/ui/field"
import { Progress } from "@/components/ui/progress"
import { buttonVariants } from "../ui/button"
import Link from "next/link"
import { Card, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { CircleCheckBig, CircleX } from "lucide-react"


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
                                        <CircleX className="text-yellow-300" />:
                                        <CircleX className="text-red-400" />}{step.title} 
                                        
                                        </CardTitle>
                                </CardHeader>
                                <CardFooter>
                                    <Link 
                                    className={buttonVariants({variant:!isComplete && !isCurrent ? "outline" : "default", 
                                        className: `${!isComplete && !isCurrent ? "pointer-events-none opacity-60" : ""}`})} 
                                    href={'/onboarding?step=' + step.id}>
                                        Update
                                        </Link>
                         
                           
                             
                                </CardFooter>
                            </Card>
                     
                    )
                })}
            </div>



                {/* <div className="flex mt-5 gap-2">
                    <Link className={buttonVariants()} href={'/onboarding?step=' + (currentStep - 1)}>Go Back</Link>
                    <Link className={buttonVariants()} href={'/onboarding?step=' + (currentStep)}>Next</Link>
         
                </div> */}




        </div>

    )
}