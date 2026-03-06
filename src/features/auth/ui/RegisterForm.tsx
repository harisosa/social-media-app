"use client"

import { AuthForm } from "./AuthForm"
import { registerFields } from "./auth-form.config"
import { useRegister } from "../hooks/useRegister"


export const RegisterForm = () => {
    const registerMutation = useRegister()

    const handleSubmit = async (values: Record<string, string>) => {
        await registerMutation.mutateAsync({
            name: values.name,
            username: values.username,
            email: values.email,
            phone: values.phone,
            password: values.password,
        })
    }

    return (
        <AuthForm
            title="Register"
            fields={registerFields}
            submitLabel="Submit"
            onSubmit={handleSubmit}
            switchText="Already have an account?"
            switchLinkText="Log in"
            switchHref="/login"
        />
    )
}