import z from "zod";
import { NZ_REGIONS } from "./contants";

export const loginFormSchema = z.object({
  email: z.email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be 8 characters or more')
});

export const registerFormSchema = z.object({
  firstName: z.string()
    .min(3, 'First name must be 3 or more characters')
    .max(20, 'First name must be less than 20 characters'),
  lastName: z.string()
    .min(3, 'Last name must be 3 or more characters')
    .max(20, 'Last name must be less than 20 characters'),
  email: z.email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be 8 characters or more'),
  confirmPassword: z.string()
})
  .refine((data) => data.password === data.confirmPassword, {
    message: "Confirm password does not match",
    path: ["confirmPassword"]
  });


export const businessDetailsFormSchema = z.object({
  name: z.string().min(5).max(20),
  email: z.email('Please enter a valid email address'),
  address: z.string().min(5).max(20),
  phone: z.string().min(8).max(20),
  region: z.enum(NZ_REGIONS, "Please select a region")
});


export const hoursSchema = z.object({
  hours: z.array(
    z.object({
      day: z.string(),
      isOpen: z.boolean(),
      startTime: z.string().nullable(),
      endTime: z.string().nullable(),
    })
  )
})
  .superRefine((data, ctx) => {

    data.hours.forEach((day, index) => {

      if (!day.isOpen) return

      if (!day.startTime || !day.endTime) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Opening and closing times required",
          path: ["hours", index],
        })
      }

      if (day.startTime && day.endTime && day.startTime >= day.endTime) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "End time must be after start time",
          path: ["hours", index, "endTime"],
        })
      }
    })

  });

export const tablesSchema = z.object({
  totalTables: z.number(),
  defaultCapacity: z.number(),
  tables: z.array(
      z.object({
        id: z.number(),
        capacity: z
          .number()
 
      })
    )
    .optional(),
});

export const tableBookingFormSchema = z.object({
  date:z.date('Please select a date'),
  partySize: z.string().min(1)
})