import OnBoardingProgression from "@/components/web/OnBoardingProgression";
import { getUserBusiness } from "@/lib/db/queries/business";

export default async function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const business = await getUserBusiness();

  const step = Number(business.data?.setup_step ?? 1);

  return (
    <div>

      <OnBoardingProgression currentStep={step} />

      {children}

    </div>
  );
}