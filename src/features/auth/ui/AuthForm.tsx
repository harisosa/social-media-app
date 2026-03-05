"use client"

import { useState } from "react"
import type { AuthField } from "./auth-form.config"
import { Card } from "@/components/ui/card"
import Image from "next/image"

type Props = {
    title: string
    fields: AuthField[]
    submitLabel: string
    onSubmit: (values: Record<string, string>) => Promise<void>
    switchText: string
    switchLinkText: string
    switchHref: string
}

export const AuthForm = ({
    title,
    fields,
    submitLabel,
    onSubmit,
    switchText,
    switchLinkText,
    switchHref
}: Props) => {
    const [values, setValues] = useState<Record<string, string>>({})
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [loading, setLoading] = useState(false)

    const handleChange = (name: string, value: string) => {
        setValues((v) => ({ ...v, [name]: value }))
        setErrors((e) => ({ ...e, [name]: "" }))
    }

    const validate = () => {
        const nextErrors: Record<string, string> = {}

        fields.forEach((field) => {
            if (!values[field.name]) {
                nextErrors[field.name] = `${field.label} is required`
            }
        })

        if (
            values.password &&
            values.confirmPassword &&
            values.password !== values.confirmPassword
        ) {
            nextErrors.confirmPassword = "Passwords do not match"
        }

        setErrors(nextErrors)
        return Object.keys(nextErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validate()) return

        try {
            setLoading(true)
            await onSubmit(values)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Card className="p-6 border border-[#181D27]">
            <form
                onSubmit={handleSubmit}
                className="w-full gap-6 flex flex-col items-center"
            >
                <div className="relative w-34.25 h-9 mt-10">
                    <Image src='/images/logo.svg' alt="logo" fill />
                </div>
                <h2 className="text-center text-xl font-semibold">{title}</h2>

                {fields.map((field) => (
                    <div key={field.name} className="space-y-1 w-full">
                        <label className="text-sm text-neutral-300">
                            {field.label}
                        </label>

                        <input
                            type={field.type}
                            placeholder={field.placeholder}
                            value={values[field.name] ?? ""}
                            onChange={(e) =>
                                handleChange(field.name, e.target.value)
                            }
                            className={`w-full rounded-md border px-4 py-2 bg-neutral-900
            ${errors[field.name]
                                    ? "border-red-500"
                                    : "border-neutral-700"
                                }`}
                        />

                        {errors[field.name] && (
                            <p className="text-xs text-red-500">
                                {errors[field.name]}
                            </p>
                        )}
                    </div>
                ))}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-md bg-purple-600 py-2 font-medium hover:bg-purple-500"
                >
                    {loading ? "Loading..." : submitLabel}
                </button>

                <p className="text-sm text-neutral-400 text-center">
                    {switchText}{" "}
                    <a
                        href={switchHref}
                        className="text-purple-400 hover:text-purple-300 font-medium"
                    >
                        {switchLinkText}
                    </a>
                </p>
            </form>
        </Card>

    )
}