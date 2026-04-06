"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Command } from "cmdk"
import { Search, Folder, Users, ListTodo, Plus, LineChart } from "lucide-react"
import { getGlobalSearchResults } from "@/lib/actions/search"

export function CommandMenu() {
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const [results, setResults] = React.useState<{ tasks: any[], accounts?: any[], leads?: any[] }>({ tasks: [], accounts: [], leads: [] })
  const router = useRouter()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  React.useEffect(() => {
    if (query.trim().length > 1) {
      const fetchResults = async () => {
        const data = await getGlobalSearchResults(query)
        setResults(data)
      }
      const debounced = setTimeout(fetchResults, 300)
      return () => clearTimeout(debounced)
    } else {
      setResults({ tasks: [], accounts: [], leads: [] })
    }
  }, [query])

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false)
    command()
  }, [])

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-lg border border-border bg-muted/50 px-3 py-1.5 text-sm text-muted-foreground shadow-sm hover:bg-muted/80 transition-colors w-full max-w-[200px]"
      >
        <Search className="h-4 w-4" />
        <span>Buscar...</span>
        <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-background px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        {/* Usamos un classname limpio en el dialog content para cmdk */}
        <DialogContent className="overflow-hidden p-0 shadow-lg border border-border sm:max-w-[500px]">
          <DialogTitle className="sr-only">Buscador global</DialogTitle>
          <DialogDescription className="sr-only">Busca clientes, tareas o crea nuevos registros.</DialogDescription>
          <Command shouldFilter={false} className="flex h-full w-full flex-col overflow-hidden bg-popover text-popover-foreground">
            <div className="flex items-center border-b px-3">
              <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
              <Command.Input 
                autoFocus
                placeholder="Escribe un comando o busca..." 
                className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50" 
                value={query}
                onValueChange={setQuery}
              />
            </div>
            <Command.List className="max-h-[300px] overflow-y-auto overflow-x-hidden p-2">
              <Command.Empty className="py-6 text-center text-sm text-muted-foreground">
                No hay resultados.
              </Command.Empty>
              
              {query.length > 1 && (results.tasks.length > 0 || results.accounts?.length || results.leads?.length) ? (
                <>
                  {results.accounts && results.accounts.length > 0 && (
                     <Command.Group heading="Cuentas Encontradas" className="px-2 text-xs font-medium text-muted-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5">
                       {results.accounts.map((acc: any) => (
                         <Command.Item
                           key={acc.account_id}
                           onSelect={() => runCommand(() => router.push(`/accounts/${acc.account_id}`))}
                           className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-2 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 transition-colors"
                         >
                           <Folder className="mr-2 h-4 w-4" />
                           <span>{acc.legal_name}</span>
                         </Command.Item>
                       ))}
                     </Command.Group>
                  )}
                  {results.leads && results.leads.length > 0 && (
                     <Command.Group heading="Leads Encontrados" className="px-2 text-xs font-medium text-muted-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5">
                       {results.leads.map((lead: any) => (
                         <Command.Item
                           key={lead.lead_id}
                           onSelect={() => runCommand(() => router.push(`/leads`))}
                           className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-2 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 transition-colors"
                         >
                           <Users className="mr-2 h-4 w-4" />
                           <span className="truncate max-w-[300px]">{lead.accounts?.legal_name || lead.message_summary}</span>
                         </Command.Item>
                       ))}
                     </Command.Group>
                  )}
                  {results.tasks && results.tasks.length > 0 && (
                     <Command.Group heading="Tareas" className="px-2 text-xs font-medium text-muted-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5">
                       {results.tasks.map((task: any) => (
                         <Command.Item
                           key={task.task_id}
                           onSelect={() => runCommand(() => router.push(`/tasks`))}
                           className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-2 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 transition-colors"
                         >
                           <ListTodo className="mr-2 h-4 w-4" />
                           <span>{task.title}</span>
                         </Command.Item>
                       ))}
                     </Command.Group>
                  )}
                </>
              ) : (
                <>
                  <Command.Group heading="Navegación Rápida" className="px-2 text-xs font-medium text-muted-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5">
                    <Command.Item
                      onSelect={() => runCommand(() => router.push('/dashboard'))}
                      className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-2 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 transition-colors"
                    >
                      <LineChart className="mr-2 h-4 w-4" />
                      <span>Dashboard Principal</span>
                    </Command.Item>
                    <Command.Item
                      onSelect={() => runCommand(() => router.push('/accounts'))}
                      className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-2 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 transition-colors"
                    >
                      <Folder className="mr-2 h-4 w-4" />
                      <span>Cuentas y Clientes</span>
                    </Command.Item>
                    <Command.Item
                      onSelect={() => runCommand(() => router.push('/leads'))}
                      className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-2 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 transition-colors"
                    >
                      <Users className="mr-2 h-4 w-4" />
                      <span>Leads (Prospectos)</span>
                    </Command.Item>
                    <Command.Item
                      onSelect={() => runCommand(() => router.push('/tasks'))}
                      className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-2 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 transition-colors"
                    >
                      <ListTodo className="mr-2 h-4 w-4" />
                      <span>Mis Tareas</span>
                    </Command.Item>
                  </Command.Group>
                  <Command.Group heading="Acciones" className="px-2 pt-2 text-xs font-medium text-muted-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5">
                    <Command.Item
                      onSelect={() => runCommand(() => alert('Crear cuenta...'))}
                      className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-2 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 transition-colors"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      <span>Crear nueva Cuenta</span>
                    </Command.Item>
                  </Command.Group>
                </>
              )}
            </Command.List>
          </Command>
        </DialogContent>
      </Dialog>
    </>
  )
}

