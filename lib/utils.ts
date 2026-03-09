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
}


