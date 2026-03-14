"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { NZ_REGIONS } from "@/lib/contants";
import { createBusiness } from "@/lib/db/mutations/business";
import { businessDetailsFormSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

type BusinessDetails = {
    name: string,
    email: string,
    address: string,
    region: string,
    phone: string,
    setup_step: number

}

export default function BusinessDetailsForm({ name, email, address, phone, region, setup_step }: BusinessDetails) {

    const [isPending, startTransition] = useTransition();
    const router = useRouter();


    const form = useForm<z.infer<typeof businessDetailsFormSchema>>({
        resolver: zodResolver(businessDetailsFormSchema),
        defaultValues: {
            name: name,
            email: email,
            address: address,
            phone: phone,
            region: region
        }
    });


    function onSubmit(values: z.infer<typeof businessDetailsFormSchema>) {
        startTransition((async () => {



            const res = await createBusiness(values);

            if (res.error) {
                form.setError("root", {
                    message: res.error
                });
                toast.error(res.error)
            };

            if (res.fieldErrors) {
                Object.entries(res.fieldErrors).forEach(([field, message]) => {
                    form.setError(field as keyof z.infer<typeof businessDetailsFormSchema>,
                        { message }
                    )
                });

                toast.error(res.error)

            }

            if (res?.success) {
                toast.success(res.message);

                if (res.nextStep) {
                    router.push('/onboarding?step=' + (Number(setup_step) + 1))
                }

            }


        }))
    }
    return (
        <div className="flex flex-col gap-6 max-w-xl">
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl">Business Details</CardTitle>
                    <CardDescription>
                        Enter you business details
                    </CardDescription>

                </CardHeader>

                <CardContent>
                    <form id="businessDetailsForm" onSubmit={form.handleSubmit(onSubmit)}>
                        <FieldGroup>
                            <Controller
                                control={form.control}
                                name="name"
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>Business name:</FieldLabel>
                                        <Input
                                            {...field}
                                            type="text"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="Business name"
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
                                        <FieldLabel>Business email:</FieldLabel>
                                        <Input
                                            {...field}
                                            type="text"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="123 Street, Auckland"
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}

                                    </Field>
                                )}
                            />


                            <Controller
                                control={form.control}
                                name="address"
                                render={({ field, fieldState }) => (

                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>Address:</FieldLabel>
                                        <Input
                                            {...field}
                                            type="text"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="123 Street, Auckland"
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}

                                    </Field>
                                )}
                            />

                            <Controller
                                control={form.control}
                                name="phone"
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>Business phone:</FieldLabel>
                                        <Input
                                            {...field}
                                            type="tel"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="NZ Phone number"
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}

                                    </Field>
                                )}

                            />





                            <Controller
                                control={form.control}
                                name="region"
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>Region:</FieldLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}

                                        >
                                            <SelectTrigger className="w-full max-w-48">
                                                <SelectValue placeholder="Select a region" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Fruits</SelectLabel>
                                                    {NZ_REGIONS.map((region) => {
                                                        return <SelectItem key={region} value={region}>{region}</SelectItem>
                                                    })}

                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}/>
                            <Controller
                                control={form.control}
                                name="booking_duration"
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>Booking duration:</FieldLabel>
                                        <FieldDescription>Duration in minutes for booking slots</FieldDescription>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}

                                        >
                                            <SelectTrigger className="w-full max-w-48">
                                                <SelectValue placeholder="Select a region" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Fruits</SelectLabel>
                                                    {["30", "60", "90", "120"].map((region) => {
                                                        return <SelectItem key={region} value={region}>{region}</SelectItem>
                                                    })}

                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}/>

                                
                            {form.formState.errors.root && (
                                <p className="text-sm text-red-500 font-medium">
                                    {form.formState.errors.root.message}
                                </p>
                            )}


                        </FieldGroup>
                    </form>
                </CardContent>

                <CardFooter className="flex-col gap-4">


                    <Button disabled={isPending} form="businessDetailsForm" className="w-full">Submit</Button>
                    <Button disabled={isPending} onClick={() => form.reset()} variant={"outline"} className="w-full">Clear form</Button>
                </CardFooter>

            </Card>
        </div>
    )
}