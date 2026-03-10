"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { hoursSchema } from "@/lib/schema";
import { days, generateTimeSlots } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import z from "zod";




export default function HoursForm() {

const timeSlots = generateTimeSlots(120);

    const form = useForm<z.infer<typeof hoursSchema>>({
        resolver: zodResolver(hoursSchema),
        defaultValues: {
            hours: days.map((day) => ({
                day: day.value,
                isOpen: true,
                startTime: "08:00",
                endTime: "18:00",
            })),
        },
    });

    const { fields } = useFieldArray({
  control: form.control,
  name: "hours",
});



function onSubmit(values: z.infer<typeof hoursSchema>){
console.log(values);

}



    return (
        <Card className="w-full max-w-lg">
            <CardHeader>
                <CardTitle>Hours Form</CardTitle>
                <CardDescription>
                    Enter your business hours
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form id="hoursForm" onSubmit={form.handleSubmit(onSubmit)}>
                    {fields.map((field, index) => (

  <div key={field.id} className="flex items-center gap-4 space-y-3">

    {/* Checkbox */}

    <Controller
      control={form.control}
      name={`hours.${index}.isOpen`}
      render={({ field }) => (
        <Checkbox
          checked={field.value}
          onCheckedChange={field.onChange}
        />
      )}
    />

    <span className="w-24 capitalize">
      {field.day}
    </span>

    {/* Start Time */}

    <Controller
      control={form.control}
      name={`hours.${index}.startTime`}
      render={({ field }) => (
        // eslint-disable-next-line react-hooks/incompatible-library
        <Select disabled={!form.watch(`hours.${index}.isOpen`)} onValueChange={field.onChange} value={field.value ?? ""}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Open" />
          </SelectTrigger>

          <SelectContent>
            {timeSlots.map((time) => (
              <SelectItem key={time} value={time}>
                {time}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    />

    {/* End Time */}

    <Controller
      control={form.control}
      name={`hours.${index}.endTime`}
      render={({ field }) => (
        <Select disabled={!form.watch(`hours.${index}.isOpen`)}  onValueChange={field.onChange} value={field.value ?? ""}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Close" />
          </SelectTrigger>

          <SelectContent>
            {timeSlots.map((time) => (
              <SelectItem key={time} value={time}>
                {time}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    />

  </div>

))}

                </form>



            </CardContent>
            <CardFooter>
                <Button form="hoursForm">Confirm</Button>
            </CardFooter>


        </Card>

    )
}