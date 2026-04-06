import { createAdminServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import { LayoutDashboard, LogOut } from "lucide-react"
import { SidebarNav } from "@/components/layout/sidebar-nav"
import { CommandMenu } from "@/components/layout/CommandMenu"
import { HelpButton } from "@/components/layout/HelpButton"

import { TooltipProvider } from "@/components/ui/tooltip"

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createAdminServerClient()
  
  const { cookies } = await import('next/headers')
  const cookieStore = await cookies()
  const isDemo = cookieStore.get('demo_session')?.value === 'true'

  let user = null
  if (!isDemo) {
    try {
      const { data } = await supabase.auth.getUser()
      user = data.user
    } catch(e) { /* ignore */ }
  }

  if (!user && !isDemo) {
    redirect('/login')
  }

  return (
    <TooltipProvider>
      <div className="flex min-h-screen w-full flex-col font-sans bg-background">
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-[260px] flex-col border-r border-border bg-sidebar sm:flex shadow-[0_0_20px_rgba(0,0,0,0.01)] transition-colors">
          <div className="flex flex-col gap-2 relative">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 px-6 pt-8 pb-4 transition-all group"
            >
              {/* Signature Accent Mark */}
              <div className="flex h-8 w-8 items-center justify-center rounded-lg brand-gradient text-white shadow-sm ring-1 ring-black/5 group-hover:shadow-md transition-all">
                <LayoutDashboard className="h-4 w-4" strokeWidth={2.5} />
              </div>
              <span className="font-semibold text-[16px] tracking-tight text-foreground">CRM Admin</span>
            </Link>
            <SidebarNav />
          </div>
          <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-4">
             {/* Form action to log out */}
            <form action={async () => {
              "use server"
              const supabase = await createAdminServerClient()
              await supabase.auth.signOut()
              redirect("/login")
            }} className="w-full">
              <button type="submit" className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-destructive hover:bg-muted">
                <LogOut className="h-4 w-4" /> Cerrar Sesión
              </button>
            </form>
          </nav>
        </aside>
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-64">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background/95 px-4 backdrop-blur sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 mb-4 justify-between">
            <div className="hidden sm:block text-sm font-medium text-muted-foreground mr-auto">
              {/* Breadcrumb or Title placeholder */}
            </div>
            <div className="w-full sm:w-auto ml-auto flex items-center justify-end gap-2">
              <CommandMenu />
            </div>
          </header>
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            {children}
          </main>
          <HelpButton />
        </div>
      </div>
    </TooltipProvider>
  )
}
