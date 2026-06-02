import BusinessReviewCard from "./BusinessReviewCard";
import HoursReviewCard from "./HoursReviewCard";
import SettingsReviewCard from "./SettingsReviewCard";
import ReviewActionButtons from "./ReviewActionButtons";
import { getUserBusiness } from "@/lib/supabase/queries/business";
import { Business } from "@/lib/types";

export default async function FinalReview() {

    const business = await getUserBusiness() as Business;
    return (
        <div className="space-y-6">
            <BusinessReviewCard business={business} />
            <HoursReviewCard />
            <SettingsReviewCard />
            <ReviewActionButtons/>
        </div>

    )
}