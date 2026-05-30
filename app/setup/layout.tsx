import { ProgressBar } from "./_components/ProgressBar"
import OnBoardingSteps from "./_components/OnBoardingSteps"
import { setupCheck } from "@/lib/supabase/queries/setup"

export default async function SetupLayout({
    children,
}: {
    children: React.ReactNode
}){

    const check = await setupCheck() as {
        setup_step: number
    };


    

    const progress = 100 * check.setup_step / 10;


    return (
        <section>
            <div>
<ProgressBar setupProgress={progress}/>
<OnBoardingSteps setup_step={check.setup_step}/>
            </div>

<main className="mt-5">
    {children}
</main>
</section>)
}