import SideBar from "@/components/global/SideBar"
<<<<<<< HEAD
import SiteHeader from "@/components/global/SiteHeader"
=======
import { SiteHeader } from "@/components/global/site-header"
>>>>>>> d4a4b9e6e4907aa21c1ac3408ccf82f29ae72f15

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col h-screen">
      <SiteHeader />
      <div className="flex flex-col flex-1 overflow-y-auto">
        <div className="flex flex-row h-full">
          <aside className="border-r primary-border w-64 overflow-y-auto">
            <SideBar />
          </aside>
          <main className="flex-1 overflow-y-auto p-2">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}