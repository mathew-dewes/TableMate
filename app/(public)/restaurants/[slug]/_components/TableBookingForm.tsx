"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";;
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Controller, useForm } from "react-hook-form";
import { tableBookingFormSchema } from "@/lib/schema";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


type Props = {
    slug: string,
    workHours:{
        day_of_week: number,
        opening_time: string,
        closing_time: string
    }[]
};



const today = new Date()
today.setHours(0, 0, 0, 0)

export default function TableBookingForm({ slug, workHours }: Props) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();


    const openDays = workHours.map((item) => item.day_of_week);
    const closedDays = [0,1,2,3,4,5,6].filter(
  (day) => !openDays.includes(day)
)
 
    const [open, setOpen] = useState(false);

    const bookedDates = Array.from(
        { length: 15 },
        (_, i) => new Date(new Date().getFullYear(), 1, 12 + i)
    )

    const form = useForm<z.infer<typeof tableBookingFormSchema>>({
        resolver: zodResolver(tableBookingFormSchema),
        defaultValues: {
            partySize: "1"
        }
    });


    function onSubmit(values: z.infer<typeof tableBookingFormSchema>) {
        startTransition((async () => {
router.push(
  `/restaurants/${slug}/availability?date=${format(values.date, "yyyy-MM-dd")}&party=${values.partySize}`
)
            toast.info('Searching results')

        }))
    }
    return (
        <Card className="w-full max-w-xl">
            <CardHeader>
                <CardTitle>Table bookings:</CardTitle>
                <CardDescription>
                    Please enter your prefered date and party size to see booking availability.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form id="tableBookingForm" onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup className="w-50">
                        <Controller
                            control={form.control}
                            name="date"
                            render={({ field, fieldState }) => (

                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="date-picker-simple">Date</FieldLabel>
                                    <Popover open={open} onOpenChange={setOpen}>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                id="date-picker-simple"
                                                className="justify-start font-normal"
                                            >
                                                {field.value ? format(field.value, "PPP") : "Pick a date"}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                            <Calendar
                                                disabled={[
                                                    { before: today },        // block past
                                                    { dayOfWeek: closedDays } // block closed business days
                                                ]}
                                                modifiers={{
                                                    booked: bookedDates,
                                                }}
                                                modifiersClassNames={{
                                                    booked: "[&>button]:line-through opacity-100",
                                                }}
                                                mode="single"
                                                selected={field.value}
                                                onSelect={(date) => {
                                                    field.onChange(date)
                                                    setOpen(false)
                                                }}
                                                defaultMonth={field.value}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>


                            )}
                        >


                        </Controller>

                        <Controller
                            control={form.control}
                            name="partySize"
                            render={({ field, fieldState }) => (

                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>Party size</FieldLabel>
                                    <FieldDescription>Maximum 6</FieldDescription>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger className="w-full max-w-48">
                                            <SelectValue placeholder="Select a fruit" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Party size</SelectLabel>
                                                {["1", "2", "3", "4", "5", "6"].map((item) => {
                                                    return <SelectItem key={item} value={item}>{item}</SelectItem>
                                                })}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}


                                </Field>
                            )}
                        >


                        </Controller>


                    </FieldGroup>

                </form>




            </CardContent>

            <CardFooter>
                <Button disabled={isPending} form="tableBookingForm">Find Booking</Button>
            </CardFooter>

        </Card>
    )
}