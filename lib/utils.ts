import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { ProgressCheck, setupProgress, setupStep } from "./types";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
};

export function generateTimeOptions() {

  const options = [];

  for (let minutes = 0; minutes < 1440; minutes += 15) {

    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    const suffix =
      hours >= 12 ? "PM" : "AM";

    const formattedHour =
      hours % 12 || 12;

    options.push({
      value: minutes,
      label: `${formattedHour}:${mins
        .toString()
        .padStart(2, "0")} ${suffix}`
    });
  }

  return options;
};


export function buildSetupProgress(data: ProgressCheck | null ){
      
        if (!data) {
        return {
            business: false,
            hours: false,
            settings: false,
            tables: false
        };
    }
    
    return {
        business: true,

        hours:
            data.Business_hours[0]?.count === 7,

        settings:
            data.Settings[0]?.count > 0,

        tables:
            data.Tables[0]?.count > 0
    };
};

export function getCurrentStep(
    progress: {
        business: boolean;
        hours: boolean;
        settings: boolean;
        tables: boolean;
    }
) {

    if (!progress.business)
        return "business";

    if (!progress.hours)
        return "hours";

    if (!progress.settings)
        return "settings";

    if (!progress.tables)
        return "tables";

    return "complete";
}

export function canAccessStep(
    step: setupStep,
    progress: setupProgress
) {
    switch (step) {
        case "business":
            return true;

        case "hours":
            return progress.business;

        case "settings":
            return progress.business &&
                   progress.hours;

        case "tables":
            return progress.business &&
                   progress.hours &&
                   progress.settings;
    }
};


export function generateSetupPercentage(step: setupStep){
if (step == "business") return 0;
else if (step == "hours") return 25;
else if (step == "settings") return 50;
else if (step == "tables") return 75;
}