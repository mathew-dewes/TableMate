import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

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
}
