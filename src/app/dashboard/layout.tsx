import SideBar from "@/components/global/SideBar"
import { SiteHeader } from "@/components/global/site-header"

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