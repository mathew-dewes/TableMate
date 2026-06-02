import z from "zod";

export const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(6, "Password must be 6 or more characters")
});

export const registerSchema = z
  .object({
    email: z
      .email(),

    password: z
      .string()
      .min(5, "Password must be 5 or more characters")
      .max(30, "Password must be 30 or less characters"),

    confirmPassword: z
      .string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });


  const phoneRegex = new RegExp(
    /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
  );
  
 export const businessFormSchema = z.object({
      name: z.string().min(1, "Name is required"),
      email: z.email().min(1, "Email is required"),
      phone: z.string().min(1, "Phone number is required").regex(phoneRegex, "Invalid phone number"),
      address: z.string().min(1, "Address is required"),
      description: z.string().max(100, "Description must be 100 characters or less").optional()
  });


  export const settingsFormSchema = z.object({
    slot_interval_minutes: z.number(),
    booking_duration: z.number(),
    max_party_size: z.number(),
    max_future_booking_days: z.number()
  });


  export const tablesFormSchema = z.object({
    total_tables: z.number(),
    max_capacity: z.number(),
    min_capacity: z.number()
  });



  const daySchema = z.object({
      day_of_week: z.string(),
      open: z.number().nullable(),
      close: z.number().nullable(),
      is_open: z.boolean().optional()
  }).refine(data => {
      if (!data.is_open) return true;
  
      return data.close! > data.open!;
  }, {
      message: "Closing time must be after opening time"
  });
  
  export const businessHoursSchema = z.object({
      hours: z.array(daySchema)
  });