"use client"

import { useRouter } from "next/navigation"
import { AuthForm } from "./AuthForm"
import { loginFields } from "./auth-form.config"
import { useLogin } from "../hooks/useLogin"
import { useDispatch } from "react-redux"
import { setSession } from "../store"

export const LoginForm = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const loginMutation = useLogin()

    const handleSubmit = async (values: Record<string, string>) => {
        const res = await loginMutation.mutateAsync({
            email: values.email,
            password: values.password,
        })

        dispatch(
            setSession({
                token: res.token,
                user: res.user,
            })
        )

        router.push("/feed")
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