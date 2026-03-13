"use server";

import { createClientForServer } from "@/lib/supabase/server";


export async function getExistingBookings(slug: string, date: Date) {
  const supabase = await createClientForServer();

  const { data: business } = await supabase
    .from("Business")
    .select("id")
    .eq("slug", slug)
    .single();

  if (!business) return [];

  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  // Any booking that overlaps the day:
  const { data, error } = await supabase
    .from("Booking")
    .select("table_id, start_time, end_time")
    .eq("business_id", business.id)
    .lt("start_time", endOfDay.toISOString()) // booking starts before day ends
    .gt("end_time", startOfDay.toISOString()); // booking ends after day starts

  if (error) {
    console.log(error);
    return [];
  }

  return data;
}