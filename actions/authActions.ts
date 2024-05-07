'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function login(formData: FormData) {
    const supabase = createClient()

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    const { error } = await supabase.auth.signInWithPassword(data)

    console.log(error)
    if (error) {
        redirect('/auth/login?error=Something went wrong&message=' + error.message)
    }

    revalidatePath('/', 'layout')
    redirect('/dashboard')
}

export async function signup(formData: FormData) {
    console.log(formData)
    const supabase = createClient()

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    const { error } = await supabase.auth.signUp(data)

    if (error) {
        redirect('/auth/register?error=something went wrong')
    }

    revalidatePath('/', 'layout')
    redirect('/auth/register?message=Check email to continue sign in process')
}

export const forgotPasswordFun = async (formData: FormData) => {
    const supabase = createClient()

    const email = formData.get("email") as string;

    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: "http://localhost:3000/auth/reset-password",
    });

    if (error) {
        console.log(error);
        return redirect("/auth/forgot-password?error=Could not authenticate user");
    }

    return redirect(
        "/auth/forgot-password?message=Check email to continue sign in process"
    );
};

export const resetPasswordFun = async (formData: FormData) => {

    const supabase = createClient()
    const new_password = formData.get("password") as string;

    const { data, error } =  await supabase.auth.updateUser({
        password: new_password
        
    })

    
    if (error) {
        console.log(error);
        return redirect("/auth/reset-password?error=Could not authenticate user");
    }

    return redirect(
        "/auth/reset-password?message=Greate! Your password has been reset"
    );
};
