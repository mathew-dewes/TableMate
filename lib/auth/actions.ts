"use server";

import z from "zod";
import { loginFormSchema, registerFormSchema } from "../schema";
import { createClientForServer } from "../supabase/server";

export async function signOut(){
    try {
    const supabase = await createClientForServer();
    await supabase.auth.signOut();

    return {success: true, message: 'Signout successful'}

    } catch (error) {
        console.log(error);
    return {success: false, message: 'Signout failed'}
        
        
    }
  
};

export async function registerWithEmailPassword(values: z.infer<typeof registerFormSchema>){

    try {
        const parsed = registerFormSchema.safeParse(values);

            if (!parsed.success) {
            console.error('Validation errors:', parsed.error);
            throw new Error('Validation failed');
        } 

         const supabase = await createClientForServer();

         const { error} = await  supabase.auth.signUp({
            email:parsed.data.email,
            password:parsed.data.password,
            options:{
                data:{
                    username: values.firstName + " " + values.lastName
                }
            }
         });

         if (error){
            console.log('Error:', error);
            return {
                success:false, message: "There was an error", errorMessage: error.message
            }
            
         }

         return {
            success: true, message: "Please check your email"
         }
       

   
        
    } catch (error) {

        console.log(error);
        
        
    }

    
};

export async function loginUser(values: z.infer<typeof loginFormSchema>){
        try {
        const parsed = loginFormSchema.safeParse(values);

            if (!parsed.success) {
            console.error('Validation errors:', parsed.error);
            throw new Error('Validation failed');
        } 

         const supabase = await createClientForServer();

         const { data ,error} = await  supabase.auth.signInWithPassword({
            email:parsed.data.email,
            password:parsed.data.password
         });

         if (error){
            console.log('Error:', error);
            return {
                success:false, message: "There was an error", errorMessage: error.message
            }
            
         }  

         console.log(data);
         

         return {
            success: true, message: `Welcome back ${data.user.user_metadata.username}`
         }
       

   
        
    } catch (error) {

        console.log(error);
        
        
    }
}