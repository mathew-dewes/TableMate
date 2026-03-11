"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { addTables } from "@/lib/db/mutations/tables";
import { tablesSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

export default function TablesForm() {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const form = useForm<z.infer<typeof tablesSchema>>({
        resolver: zodResolver(tablesSchema),
        defaultValues: {
            defaultCapacity: 4,
            tables: [],
            totalTables: 20
        }

    });

    const tables = useWatch({
        control: form.control,
        name: "tables",
    });

    const totalTables = useWatch({
        control: form.control,
        name: "totalTables",
    });

    const defaultCapacity = useWatch({
        control: form.control,
        name: "defaultCapacity",
    });

    const generateTables = () => {
        const total = Number(totalTables);
        const defaultCap = defaultCapacity || 1;

        if (total > 0) {
            const newTables = Array.from({ length: total }, (_, i) => ({
                id: i + 1,
                capacity: defaultCap,
            }));
            form.setValue("tables", newTables);
        }
    };


    function onSubmit(values: z.infer<typeof tablesSchema>) {
        startTransition((async () => {
            const res = await addTables(values);

            if (res?.success){
                toast.success(res.message);
                router.push('/onboarding?step=4')
            } else {
                toast.error(res?.message)
            }


        }))

    }
    return (
        <div className="space-y-6">

            {/* Table set up card */}
            <Card className="w-full max-w-xl">
                <CardHeader>
                    <CardTitle>Table setup</CardTitle>
                    <CardDescription>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Commodi, itaque.</CardDescription>

                </CardHeader>
                <CardContent>

                    <FieldGroup className="w-1/2">

                        <Field>
                            <FieldLabel>Total tables:</FieldLabel>
                            <Input
                                type="number"
                                {...form.register("totalTables", { valueAsNumber: true })}
                                placeholder="Enter table amount"
                            />
                        </Field>


                        <Field>
                            <FieldLabel>Default capacity:</FieldLabel>
                            <Input
                                type="number"
                                placeholder="Enter table capacity"
                        {...form.register("defaultCapacity", { valueAsNumber: true })}
                            />
                        </Field>
                    </FieldGroup>

                </CardContent>
                <CardFooter>
                    <Button type="button" onClick={generateTables}>Generate tables</Button>
                </CardFooter>
            </Card>

            {/* Generated tables card */}

            {tables && tables.length > 0 &&
                <form id="tableForm" onSubmit={form.handleSubmit(onSubmit)}>
                    <Card className="w-full max-w-xl">
                        <CardHeader>
                            <CardTitle>Tables:</CardTitle>
                            <CardDescription>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex, expedita.</CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-3">
                            {tables.map((table, index) => {
                                return <div key={index} className="flex items-center gap-5">
                                    <p>Table {table.id}:</p>
                                    <Controller
                                        control={form.control}
                                        name={`tables.${index}.capacity`}
                                        render={({ field }) => (
                                            <Select
                                                value={field.value?.toString() ?? ""}
                                                onValueChange={(val) => field.onChange(Number(val))} >
                                                <SelectTrigger className="w-full max-w-48">
                                                    <SelectValue placeholder="Max capacity" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectLabel>Max capacity</SelectLabel>
                                                        {Array.from({ length: 6 }, (_, i) => (i + 1).toString()).map((num) => (
                                                            <SelectItem key={num} value={num}>
                                                                {num}
                                                            </SelectItem>
                                                        ))}

                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        )}
                                    />

                                </div>
                            })}

                        </CardContent>

                        <CardFooter>
                            <Button disabled={isPending} form="tableForm" type="submit">Save tables</Button>
                        </CardFooter>
                    </Card>

                </form>

            }



        </div>

    )
}