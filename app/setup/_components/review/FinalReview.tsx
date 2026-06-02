import BusinessReviewCard from "./BusinessReviewCard";
import HoursReviewCard from "./HoursReviewCard";
import SettingsReviewCard from "./SettingsReviewCard";
import ReviewActionButtons from "./ReviewActionButtons";
import { getUserBusiness } from "@/lib/supabase/queries/business";
import { Business } from "@/lib/types";
import TablesReviewCard from "./TablesReviewCard";

export default async function FinalReview() {

    const business = await getUserBusiness() as Business;

    console.log(business);
    


    return (
        <div className="space-y-6">
            <BusinessReviewCard business={business} />
            <HoursReviewCard businessHours={business.Business_hours} />
            <TablesReviewCard tables={business.Tables} />
            <SettingsReviewCard settings={business.Settings} />
            <ReviewActionButtons />
        </div>

    )
}