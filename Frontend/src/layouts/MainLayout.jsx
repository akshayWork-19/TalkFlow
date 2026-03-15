import Navbar from "@/components/custom/Navbar"
import Sidebar from "@/components/custom/Sidebar"

export default function MainLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="container flex-1 items-start md:grid md:grid-cols-[240px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <Sidebar />
        <main className="relative py-6 lg:gap-10 lg:py-8">
          {children}
        </main>
      </div>
    </div>
  )
}
