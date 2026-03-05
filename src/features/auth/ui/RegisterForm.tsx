"use client"

import { useRouter } from "next/navigation"
import { AuthForm } from "./AuthForm"
import { registerFields } from "./auth-form.config"
import { useRegister } from "../hooks/useRegister"
import { useDispatch } from "react-redux"
import { setSession } from "../store"

export const RegisterForm = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const registerMutation = useRegister()

    const handleSubmit = async (values: Record<string, string>) => {
        const res = await registerMutation.mutateAsync({
            name: values.name,
            username: values.username,
            email: values.email,
            phone: values.phone,
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