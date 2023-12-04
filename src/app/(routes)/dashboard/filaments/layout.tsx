import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Filaments",
    description: "Manage your account settings and set e-mail preferences.",
  }
  
  interface SettingsLayoutProps {
    children: React.ReactNode
  }
  
  export default function FilamentLayout({ children }: SettingsLayoutProps) {
    return (
      <>
        <div className="container hidden space-y-6 p-10 pb-16 md:block">{children}</div>
        </>
    )
    }