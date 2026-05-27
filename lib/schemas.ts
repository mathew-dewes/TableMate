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