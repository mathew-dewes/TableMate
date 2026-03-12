"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { makeBooking } from "@/lib/db/mutations/booking";
import { bookingFormSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

type Props = {
    slug: string,
    startTime: Date
}

export default function BookingForm({slug, startTime}: Props) {
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof bookingFormSchema>>({
        resolver: zodResolver(bookingFormSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            notes: ""
        }
    });


    function onSubmit(values: z.infer<typeof bookingFormSchema>) {
        startTransition((async () => {
            const res = await makeBooking(values, slug, startTime);

            if (res.success){
                toast.success(res.message)
            } else {
                toast.error(res.message)
            }

        }))

    }
    return (
        <Card className="w-full max-w-md mt-5">
            <CardHeader>
                <CardTitle>
                    Booking Details
                </CardTitle>
                <CardDescription>
                    Please enter your personal details
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form id="bookingForm" onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>

                        <Controller
                            control={form.control}
                            name="name"
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel>Full name</FieldLabel>
                                    <Input


                                        {...field}
                                        aria-invalid={fieldState.invalid}
                                        type="text"
                                        placeholder="Enter full name"

                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        >


                        </Controller>

                        <Controller
                            control={form.control}
                            name="email"
                            render={({ field, fieldState }) => (

                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>Email address:</FieldLabel>
                                    <Input aria-invalid={fieldState.invalid}
                                        {...field}
                                        type="text"
                                        placeholder="Enter email address"

                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        >


                        </Controller>

                        <Controller
                            control={form.control}
                            name="phone"
                            render={({ field, fieldState }) => (
                                <Field aria-invalid={fieldState.invalid}>
                                    <FieldLabel>Phone number:</FieldLabel>
                                    <Input
                                        {...field}
                                        aria-invalid={fieldState.invalid}
                                        type="text"
                                        placeholder="Enter email address"

                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        >

                        </Controller>












                        <FieldSet className="w-full max-w-xs">
                            <FieldGroup>


                                <Controller
                                    control={form.control}
                                    name="notes"
                                    render={({ field, fieldState }) => (
                                        <Field aria-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="feedback">Notes</FieldLabel>

                                            <Textarea aria-invalid={fieldState.invalid}
                                                {...field}
                                                className="h-25"
                                                id="feedback"
                                                placeholder="Enter notes..."
                                                rows={4}
                                            />
                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]} />
                                            )}
                                            <FieldDescription>
                                                Share your thoughts about our service.
                                            </FieldDescription>

                                        </Field>
                                    )}
                                >


                                </Controller>

                            </FieldGroup>




                        </FieldSet>
                    </FieldGroup>


                </form>
            </CardContent>

            <CardFooter>
                <div className="flex gap-2">
                    <Button disabled={isPending} form="bookingForm">Submit booking</Button>
                    <Button>Go back</Button>
                </div>

            </CardFooter>

        </Card>
    )
}