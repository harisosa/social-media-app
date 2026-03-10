"use client";

import type { ReactNode } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";

type ToastVariant = "success" | "error" | "info" | "warning";

const variantClassMap: Record<ToastVariant, string> = {
  success: "bg-[#16A34A] text-white",
  error: "bg-[#DC2626] text-white",
  warning: "bg-[#D97706] text-white",
  info: "bg-[#2563EB] text-white",
};

type ShowToastParams = {
  message: ReactNode;
  variant: ToastVariant;
};

const showToast = ({ message, variant }: ShowToastParams) => {
  return toast.custom((id) => (
    <div
      className={[
        "pointer-events-auto flex h-10 min-w-72.75  items-center justify-between rounded-xl px-5 py-4",
        "shadow-[0_8px_30px_rgba(0,0,0,0.12)]",
        variantClassMap[variant],
      ].join(" ")}
    >
      <div className="pr-4 text-sm font-medium">{message}</div>

      <button
        type="button"
        aria-label="Close toast"
        onClick={() => toast.dismiss(id)}
        className="shrink-0 text-white/90 transition hover:text-white"
      >
        <X size={18} />
      </button>
    </div>
  ));
};

export const appToast = {
  success: (message: ReactNode) =>
    showToast({
      message,
      variant: "success",
    }),

  error: (message: ReactNode) =>
    showToast({
      message,
      variant: "error",
    }),

  warning: (message: ReactNode) =>
    showToast({
      message,
      variant: "warning",
    }),

  info: (message: ReactNode) =>
    showToast({
      message,
      variant: "info",
    }),
};