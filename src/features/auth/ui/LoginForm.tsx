"use client"

import { AuthForm } from "./AuthForm"
import { loginFields } from "./auth-form.config"
import { useLogin } from "../hooks/useLogin"


export const LoginForm = () => {
    const loginMutation = useLogin()

    const handleSubmit = async (values: Record<string, string>) => {
        await loginMutation.mutateAsync({
            email: values.email,
            password: values.password,
        })
    }

    return (
        <AuthForm
            title="Welcome Back!"
            fields={loginFields}
            submitLabel="Login"
            onSubmit={handleSubmit}
            switchText="Don't have an account?"
            switchLinkText="Register"
            switchHref="/register"
        />
    )
}