import BusinessReviewCard from "./BusinessReviewCard";
import HoursReviewCard from "./HoursReviewCard";
import SettingsReviewCard from "./SettingsReviewCard";
import ReviewActionButtons from "./ReviewActionButtons";

export default function FinalReview() {
    return (
        <div className="space-y-6">
            <BusinessReviewCard />
            <HoursReviewCard />
            <SettingsReviewCard />
            <ReviewActionButtons/>
        </div>

    )
}