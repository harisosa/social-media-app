import type { Metadata } from "next";
import "./globals.css";
import { AppProviders } from "@/app/providers";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Sociality",
  description: "Sociality Frontend",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AppProviders>{children}</AppProviders>
         <Toaster position="top-right" />
      </body>
    </html>
  );
}