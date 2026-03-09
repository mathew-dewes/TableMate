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
.refine((data)=> data.password === data.confirmPassword, {
    message: "Confirm password does not match",
    path: ["confirmPassword"]
});


export const businessDetailsForm = z.object({
    name: z.string().min(5).max(20),
    email: z.email('Please enter a valid email address'),
    address: z.string().min(5).max(20),
    phone: z.string().min(8).max(20),
    region: z.enum(NZ_REGIONS, "Please select a region")
})