import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { dayjs } from "@/lib/dayjs"


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatTimeAgo = (date: string | Date) => {
  return dayjs(date).fromNow()
}

export const getInitials = (name: string) => {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("")
}