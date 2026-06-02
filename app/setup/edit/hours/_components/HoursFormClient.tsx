"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import z from "zod";

import { Checkbox } from "@/components/ui/checkbox";

import { DAYS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { businessHoursSchema } from "@/lib/schemas";
import { setBusinessHours } from "@/lib/supabase/mutations/hours";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import TimeSelector from "@/app/setup/_components/hours/TimeSelector";


export default function HoursFormClient() {
    const router = useRouter();
    const [isPending, startTransition] = useTransition()
    const form = useForm<z.infer<typeof businessHoursSchema>>({
        resolver: zodResolver(businessHoursSchema), defaultValues: {
            hours: DAYS.map(day => ({
                day_of_week: day,
                open: 540,
                close: 1020,
                is_open: true
            }))
        }
    });

    const { fields } = useFieldArray({
        control: form.control,
        name: "hours"
    });

    function onSubmit(values: z.infer<typeof businessHoursSchema>){
        startTransition((async()=>{
            const res = await setBusinessHours(values)
            

            if (!res.success){
                toast.error(res.message)
            } else{
                toast.success(res.message);
                router.refresh();

            }
            
        }))
    }

    return (
        <Card className="w-full sm:max-w-lg">
            <CardHeader>
                <CardTitle>Hours Form</CardTitle>
                <CardDescription>Enter the required details</CardDescription>
            </CardHeader>

            <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)} id="hoursForm">
                    <FieldGroup>
                        {fields.map((field, index) => {
                            // eslint-disable-next-line react-hooks/incompatible-library
                            const isOpen = form.watch(
                                `hours.${index}.is_open`
                            );
                            return (
                                <Field key={field.id}>
                                    <FieldLabel>{field.day_of_week}</FieldLabel>
                                    <div className="flex gap-2">
                                        <TimeSelector type="Open" value={form.watch(
                                            `hours.${index}.open`
                                        )}
                                            onChange={(value) =>
                                                form.setValue(
                                                    `hours.${index}.open`,
                                                    value
                                                )
                                            }
                                            disabled={!isOpen} />
                                        <TimeSelector type="Close" value={form.watch(
                                            `hours.${index}.close`
                                        )}
                                            onChange={(value) =>
                                                form.setValue(
                                                    `hours.${index}.close`,
                                                    value
                                                )
                                            }
                                            disabled={!isOpen} />
                                        <div className="flex gap-2 items-center">
                                            <Checkbox
                                                className="size-4"
                                                checked={isOpen}
                                                onCheckedChange={(checked) => {
                                                    form.setValue(
                                                        `hours.${index}.is_open`,
                                                        !!checked);

                                                    if (!checked) {
                                                        form.setValue(
                                                            `hours.${index}.open`,
                                                            null
                                                        );
                                                        form.setValue(
                                                            `hours.${index}.close`,
                                                            null
                                                        );
                                                    }
                                                }}
                                            />
                                            <FieldLabel>Open</FieldLabel>
                                        </div>

                                    </div>

                                </Field>
                            )
                        })}

                    </FieldGroup>

                </form>
            </CardContent>

               <CardFooter>
                <Field orientation="horizontal">
                    <Button type="button" variant="outline" onClick={() => form.reset()}>
                        Reset
                    </Button>
                    <Button disabled={isPending} type="submit" form="hoursForm">
                        Submit
                    </Button>
                </Field>
            </CardFooter>
        </Card>
    )
}