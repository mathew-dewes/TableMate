import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
};

export function createSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")           // optional: replace &
    .replace(/[^\w\s-]/g, "")       // remove special chars
    .replace(/\s+/g, "-")           // spaces → hyphen
    .replace(/--+/g, "-")           // remove double hyphens
};

export function generateTimeSlots(interval: number) {
  const slots: string[] = []

  const start = 0
  const end = 24 * 60

  for (let mins = start; mins < end; mins += interval) {
    const hours = Math.floor(mins / 60)
    const minutes = mins % 60

    const formatted =
      `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`

    slots.push(formatted)
  }

  return slots
};

export const days = [
  { label: "Sunday", value: "sunday" },
  { label: "Monday", value: "monday" },
  { label: "Tuesday", value: "tuesday" },
  { label: "Wednesday", value: "wednesday" },
  { label: "Thursday", value: "thursday" },
  { label: "Friday", value: "friday" },
  { label: "Saturday", value: "saturday" },

];


export function getNZTime() {
  return new Intl.DateTimeFormat('en-NZ', {
    hour: '2-digit',
    minute: '2-digit',
    day:"2-digit",
    weekday: "long",
    hour12: false,
    timeZone: 'Pacific/Auckland'
  }).format(new Date());
};


export function combineDateAndTime(date: Date, time: string) {
  const [hours, minutes] = time.split(":").map(Number)

  const result = new Date(date)
  result.setHours(hours, minutes, 0, 0)

  return result
};

export function generateSlots(
  bookingDate: Date,
  openingTime: string,
  closingTime: string,
  duration: number
) {
  const slots: Date[] = []

  const start = combineDateAndTime(bookingDate, openingTime)
  const end = combineDateAndTime(bookingDate, closingTime)

  let current = new Date(start)

  while (current < end) {
    slots.push(new Date(current))

    current = new Date(current)
    current.setMinutes(current.getMinutes() + duration)
  }

  return slots
};



