"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { tablesFormSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

import { addTables } from "@/lib/supabase/mutations/tables";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import CapacitySelector from "@/app/setup/_components/tables/CapacitySelector";

export default function EditTablesFormClient() {
    const [isPending, startTransition] = useTransition();
    const router = useRouter()
    const form = useForm<z.infer<typeof tablesFormSchema>>({
        resolver: zodResolver(tablesFormSchema),
        defaultValues: {
            total_tables: 1,
            min_capacity: 2,
            max_capacity: 6

        }
    });

    function onSubmit(values: z.infer<typeof tablesFormSchema>) {
        startTransition((async () => {
            const res = await addTables(values);

            if (!res.success) {
                toast.error(res.message)
            } else {
                toast.success(res.message);
                router.refresh()
            }



        }))
    }
    return (
        <Card className="w-full sm:max-w-md">
            <CardHeader>
                <CardTitle>Tables Form</CardTitle>
                <CardDescription>Enter the required details</CardDescription>
            </CardHeader>

            <CardContent>
                <form id="TablesForm" onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <Controller
                            control={form.control}
                            name="total_tables"
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>Total tables</FieldLabel>
                                    <Input
                                        type="number"
                                        value={field.value}
                                        onChange={(e) => field.onChange(Number(e.target.value))}
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Enter table number"
                                        autoComplete="off"
                                    />
                                    <FieldDescription>
                                        Enter your total amount of tables
                                    </FieldDescription>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>

                            )}
                        />
                        <Controller
                            control={form.control}
                            name="min_capacity"
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>Min capacity</FieldLabel>
                                    <CapacitySelector type="Min" value={field.value} onChange={field.onChange} />
                                    <FieldDescription>
                                        Business names must be unique
                                    </FieldDescription>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>

                            )}
                        />
                        <Controller
                            control={form.control}
                            name="max_capacity"
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>Max capacity</FieldLabel>
                                    <CapacitySelector type="Max" value={field.value} onChange={field.onChange} />
                                    <FieldDescription>
                                        Business names must be unique
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
                    <Button disabled={isPending} type="submit" form="TablesForm">
                        Add tables
                    </Button>
                </Field>
            </CardFooter>
        </Card>
    )
}