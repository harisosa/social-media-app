import { BottomNav, Navbar } from "@/features/navbar/components"


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