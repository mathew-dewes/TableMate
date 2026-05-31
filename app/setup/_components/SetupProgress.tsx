"use client";

import { Button } from "@/components/ui/button";
import { setupProgress, setupStep } from "@/lib/types";
import { canAccessStep } from "@/lib/utils";

type SetupProgressProps = {
    progress: setupProgress;
    currentStep: setupStep;
    onStepChange?: (
        step: Exclude<setupStep, "complete">
    ) => void;
};

export default function SetupProgress({
    progress,
    currentStep,
    onStepChange
}: SetupProgressProps) {

    const steps = [
        {
            key: "business",
            label: "Business Details",
            complete: progress.business
        },
        {
            key: "hours",
            label: "Business Hours",
            complete: progress.hours
        },
        {
            key: "settings",
            label: "Booking Settings",
            complete: progress.settings
        },
        {
            key: "tables",
            label: "Tables",
            complete: progress.tables
        }
    ] as const;

    return (
        <div className="space-y-2">

            {steps.map(step => {

                const canAccess =
                    canAccessStep(
                        step.key,
                        progress
                    );

                const isCurrent =
                    currentStep === step.key;

                return (
                    <Button
                        key={step.key}
                        variant={
                            isCurrent
                                ? "default"
                                : "outline"
                        }
                        disabled={!canAccess}
                        className="w-full justify-start"
                        onClick={() =>
                            onStepChange?.(
                                step.key
                            )
                        }
                    >
                        <span className="mr-2">

                            {step.complete
                                ? "✓"
                                : isCurrent
                                ? "→"
                                : "○"}

                        </span>

                        {step.label}
                    </Button>
                );
            })}
        </div>
    );
}