
import { buildSetupProgress, generateSetupPercentage, getCurrentStep } from "@/lib/utils";
import BusinessForm from "./business/BusinessForm";
import HoursForm from "./hours/HoursForm";
import SettingsForm from "./settings/SettingsForm";
import TablesForm from "./tables/TablesForm";
import { getSetUpProgress } from "@/lib/supabase/queries/setup";
import { ProgressCheck } from "@/lib/types";
import { ProgressBar } from "./ProgressBar";
import FinalReview from "./FinalReview";




export default async function Setup() {
  const data = await getSetUpProgress() as ProgressCheck;
  const progress = buildSetupProgress(data);

  const step = getCurrentStep(progress);

  const setupPercentage = generateSetupPercentage(step);




  return (
    <div>
      <div>
        <ProgressBar progress={setupPercentage ?? 0} />

      </div>

      <div className="mt-5">
        {step === "business" && (
          <BusinessForm />
        )}

        {step === "hours" && (
          <HoursForm />
        )}

        {step === "settings" && (
          <SettingsForm />
        )}

        {step === "tables" && (
          <TablesForm />
        )}
        {step === "complete" && (
         <FinalReview/>
        )}

      </div>


    </div>


  )

}