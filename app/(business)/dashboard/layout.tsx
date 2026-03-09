import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (

         <SidebarProvider open={true}>
      <div className="flex w-full">

        <AppSidebar />

        <main className="flex-1">
          {children}
        </main>

      </div>
    </SidebarProvider>


  )
}