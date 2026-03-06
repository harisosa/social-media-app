import { BottomNav } from "@/features/navbar/ui/ButtomNav"
import { Navbar } from "@/features/navbar/ui/Navbar"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
  <>
      <Navbar />
      <main className="pt-35">
    {children}
      </main>

    <BottomNav />
  </>
  )
}