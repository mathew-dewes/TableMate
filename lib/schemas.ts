import z from "zod";

export const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(6, "Password must be 6 or more characters")
});

export const registerSchema = z
  .object({
    firstName: z
      .string()
      .min(3, "First name must be 3 or more characters")
      .max(20, "First name must be 20 characters or less"),

    lastName: z
      .string()
      .min(3, "Last name must be 3 or more characters")
      .max(20, "Last name must be 20 characters or less"),

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