"use server";

import z from "zod";
import { loginSchema, registerSchema } from "../schemas";
import { createClientForServer } from "./server";

export async function signUpWithEmailPassword(values: z.infer<typeof registerSchema>) {
    const supabase = await createClientForServer();

    const parsed = registerSchema.safeParse(values);

    if (!parsed.success) {
        return { success: false, message: "Validation failed" }
    };

    const { error } = await supabase.auth.signUp({
        email: parsed.data.email,
        password: parsed.data.confirmPassword,
        options: {
            emailRedirectTo: `${process.env.SITE_URL}/dashboard`,
        }
    });

    if (error) {
        console.log('Error', error);
        return {
            success: false,
            message: error.message
        }

    }


    return {
        success: true,
        message: 'Please check your email',


    }


}
export async function signInWithEmailPassword(values: z.infer<typeof loginSchema>) {
    const supabase = await createClientForServer();

    const parsed = loginSchema.safeParse(values);

    if (!parsed.success) {
        return { success: false, message: "Validation failed" }
    };

    const { error } = await supabase.auth.signInWithPassword({
        email: parsed.data.email,
        password: parsed.data.password
    });

    if (error) {
        console.log('Error', error);
        return {
            success: false,
            message: error.message
        }

    }




    return {
        success: true,
        message: 'Login in successful',


    }


};

export async function SignOut() {
    const supabase = await createClientForServer();
    const { error } = await supabase.auth.signOut();

    if (error) {
        console.log(error);

    } else {
        return { success: true, message: "Signout out successful" }
    }
};


