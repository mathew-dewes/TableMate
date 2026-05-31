"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { settingsFormSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import IntervalSelector from "./IntervalSelector";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import BookingSelector from "./BookingDurationSelector";
import PartySizeSelector from "./PartySizeSelector";
import FutureBookingDaysSelector from "./FutureBookingDaysSelector";
import { setBusinessSettings } from "@/lib/supabase/mutations/settings";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function SettingsForm() {
const [isPending, startTransition] = useTransition();
const router = useRouter();
    const form = useForm<z.infer<typeof settingsFormSchema>>({
        resolver: zodResolver(settingsFormSchema),
        defaultValues: {
            slot_interval_minutes: 15,
            booking_duration: 60,
            max_party_size: 6,
            max_future_booking_days: 14

        }
    });

    function onSubmit(values: z.infer<typeof settingsFormSchema>) {
        startTransition((async()=>{
       const res = await setBusinessSettings(values);

       if (!res.success){
        toast.error(res.message)
       } else {
        toast.success(res.message);
        router.refresh();

       }
        
        }))
 
    }
    return (
        <Card className="w-full sm:max-w-md">
            <CardHeader>
                <CardTitle>Settings Form</CardTitle>
            </CardHeader>

            <CardContent>
                <form id="settingsForm" onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>

                                  <Controller
                            control={form.control}
                            name="slot_interval_minutes"
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>Slot interval</FieldLabel>
                                    <IntervalSelector onChange={field.onChange} value={field.value}/>
                    
                                    <FieldDescription>
                                        Total amount of minutes per booking slot
                                    </FieldDescription>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>


                            )}
                        />
                        <Controller
                            control={form.control}
                            name="booking_duration"
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>Booking duration</FieldLabel>
                                    <BookingSelector onChange={field.onChange} value={field.value}/>
                                    <FieldDescription>
                                        Total amount of minutes per booking
                                    </FieldDescription>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>


                            )}
                        />
              
                        <Controller
                            control={form.control}
                            name="max_party_size"
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>Max party size</FieldLabel>
                                    <PartySizeSelector onChange={field.onChange} value={field.value}/>
                                    <FieldDescription>
                                        Maximum amount of people per table 
                                    </FieldDescription>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>


                            )}
                        />
                        <Controller
                            control={form.control}
                            name="max_future_booking_days"
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>Customer booking window</FieldLabel>
                                    <FutureBookingDaysSelector onChange={field.onChange} value={field.value}/>
                                    <FieldDescription>
                                        Maximum amount of people per table 
                                    </FieldDescription>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>


                            )}
                        />
                    </FieldGroup>
                </form>
            </CardContent>

              <CardFooter>
                <Field orientation="horizontal">
                    <Button disabled={isPending} type="button" variant="outline" onClick={() => form.reset()}>
                        Reset
                    </Button>
                    <Button disabled={isPending} type="submit" form="settingsForm">
                        Submit
                    </Button>
                </Field>
            </CardFooter>
        </Card>
    )
}