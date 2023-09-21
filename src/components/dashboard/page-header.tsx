import  NavMenu from "@/components/dashboard/nav-menu"
import { ModeToggle } from "@/components/global/ThemeToggleButton"

export default function SiteHeader() {
  return (
    <header className="w-full border-b">
      <div className=" mx-2 flex h-14 items-center">
        <NavMenu />
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center">
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}