"use client"

import Image from "next/image"
import { useRouter, usePathname } from "next/navigation"

import { NAV_ITEMS } from "@/features/navbar/constants"

const getActiveKey = (pathname: string) => {
  if (pathname === "/" || pathname.startsWith("/timeline")) return "home"
  if (pathname.startsWith("/posts/create") || pathname.startsWith("/create")) return "create"
  if (pathname.startsWith("/profile")) return "profile"
  return "home"
}

export const BottomNav = () => {
  const router = useRouter()
  const pathname = usePathname()

  const activeKey = getActiveKey(pathname)

  return (
    <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 ">
      <div className="flex items-center gap-11.25 rounded-full border border-neutral-800 bg-neutral-950 shadow-xl w-90 px-2.75 py-4.25">

        {NAV_ITEMS.map((item) => {
          const isCreate = item.key === "create"
          const isActive = item.key === activeKey

          if (isCreate) {
            return (
              <button
                key={item.key}
                onClick={() => router.push(item.href)}
                className={`flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition hover:scale-105 active:scale-95 ${
                  isActive ? "bg-[#7751F9]" : "bg-neutral-800"
                }`}
              >
                <Image src={item.icon} alt="Create" width={24} height={24} />
              </button>
            )
          }

          return (
            <button
              key={item.key}
              onClick={() => router.push(item.href)}
              className={`flex flex-col items-center justify-center gap-1 text-sm w-23.5 h-14.5  ${
                isActive ? "text-[#7751F9]" : "text-primary-200 hover:text-white"
              }`}
            >
              <Image src={item.icon} alt={item.label} width={24} height={24} />
              <span className="text-xs">{item.label}</span>
            </button>
          )
        })}

      </div>
    </div>
  )
}