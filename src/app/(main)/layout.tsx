"use client"

import { usePathname } from "next/navigation"
import { BottomNav, Navbar } from "@/features/navbar/components"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const isProfilePage = pathname.startsWith("/profile")

  return (
    <>
      <Navbar />
      <main className={isProfilePage ? "lg:pt-35" : "pt-20 lg:pt-35"}>{children}</main>
      <BottomNav />
    </>
  )
}