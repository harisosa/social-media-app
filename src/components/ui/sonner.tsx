"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      position="top-right"
      closeButton={false}
      icons={{
        success: null,
        error: null,
        warning: null,
        info: null,
      }}
      className='top-22! right-8!'
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            "group relative flex items-center rounded-xl text-white",
          title: "text-sm font-semibold leading-5 text-white",
          description: "text-sm text-white/90",
          success: "bg-[#10A351]",
          error: "bg-[#EF2323]",
          warning: "bg-[#D97706]",
          info: "bg-[#2563EB]",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }