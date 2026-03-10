"use client"

import Image from "next/image"
import { useRouter, usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"

import { NAV_ITEMS } from "@/features/navbar/constants"
import { Container } from "@/components/ui/container"
import { useAppSelector } from "@/lib/hook"
import { selectIsAuthenticated } from "@/features/auth"

const getActiveKey = (pathname: string) => {
  if (pathname === "/" || pathname.startsWith("/timeline")) return "home"
  if (pathname.startsWith("/post/create") || pathname.startsWith("/create")) return "create"
  if (pathname.startsWith("/profile")) return "profile"
  return "home"
}

export const BottomNav = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const router = useRouter()
  const pathname = usePathname()

  const activeKey = getActiveKey(pathname)

  const lastScroll = useRef(0)
  const [hidden, setHidden] = useState(false)



  useEffect(() => {
    const handleScroll = () => {
      const current = window.pageYOffset

      if (current > lastScroll.current && current > 60) {
        setHidden(true) // scroll down
      } else {
        setHidden(false) // scroll up
      }

      lastScroll.current = current
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])


  if (!isAuthenticated) return
  if (pathname === "/profile/edit") return;
  return (
    <div
      className={`fixed bottom-6 left-0 z-50 w-full transition-transform duration-300 ${hidden ? "translate-y-[140%]" : "translate-y-0"
        }`}
    >
      <Container size="bottomNavbar">
        <div className="flex items-center gap-11.25 rounded-full border border-neutral-800 bg-neutral-950 shadow-xl justify-between lg:justify-center px-2.75 py-4.25 w-full">

          {NAV_ITEMS.map((item) => {
            const isCreate = item.key === "create"
            const isActive = item.key === activeKey

            if (isCreate) {
              return (
                <button
                  key={item.key}
                  onClick={() => router.push(item.href)}
                  className={`flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition hover:scale-105 active:scale-95 ${isActive ? "bg-[#7751F9]" : "bg-neutral-800"
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
                className={`flex flex-col items-center justify-center gap-1 text-sm w-23.5 h-14.5 ${isActive ? "text-[#7751F9]" : "text-primary-200 hover:text-white"
                  }`}
              >
                <Image src={item.icon} alt={item.label} width={24} height={24} />
                <span className="text-xs">{item.label}</span>
              </button>
            )
          })}

        </div>
      </Container>
    </div>
  )
}