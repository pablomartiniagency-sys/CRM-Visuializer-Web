"use client"

import { HelpCircle, Folder, Users, ListTodo, Search, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export function HelpButton() {
  return (
    <Sheet>
      <SheetTrigger>
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full border border-primary/20 bg-background/80 px-4 py-3 text-sm font-medium text-foreground shadow-xl backdrop-blur-md transition-all hover:bg-card hover:shadow-2xl hover:border-primary/40 group cursor-pointer">
          <HelpCircle className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
          <span className="hidden md:inline-block">Centro de Ayuda</span>
        </div>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto border-l-border">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-xl">Guía Rápida del CRM</SheetTitle>
          <SheetDescription>
            Descubre cómo usar cada sección del Delega CRM para maximizar tu productividad.
          </SheetDescription>
        </SheetHeader>
        
        <div className="flex flex-col gap-6">
          <div className="flex gap-4">
            <div className="mt-1 bg-primary/10 p-2 rounded-md h-fit text-primary">
              <Search className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-medium text-foreground text-sm">Buscador Universal (⌘ + K)</h3>
              <p className="text-sm text-muted-foreground mt-1">Presiona Ctrl+K o Cmd+K en cualquier lugar para buscar clientes, tareas o navegar rápidamente. Busca en toda tu base de datos en milisegundos.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="mt-1 bg-primary/10 p-2 rounded-md h-fit text-primary">
              <BarChart3 className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-medium text-foreground text-sm">Dashboard</h3>
              <p className="text-sm text-muted-foreground mt-1">Tu centro de operaciones. Muestra métricas financieras y operativas con gráficas como el embudo de conversión de clientes para medir tu éxito mensual.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="mt-1 bg-primary/10 p-2 rounded-md h-fit text-primary">
              <Folder className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-medium text-foreground text-sm">Cuentas (Accounts)</h3>
              <p className="text-sm text-muted-foreground mt-1">Son las Empresas o clientes matrices con los que trabajas. Unidades estables con un NIF o Razón Social donde se agrupan todos sus pedidos e interacciones a largo plazo.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="mt-1 bg-primary/10 p-2 rounded-md h-fit text-primary">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-medium text-foreground text-sm">Leads (Prospectos)</h3>
              <p className="text-sm text-muted-foreground mt-1">Son clientes potenciales u oportunidades de negocio. Úsalos en la vista de Tablero ("Board") arrastrándolos de "Nuevos" hasta "Ganados" mientras gestionas presupuestos.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="mt-1 bg-primary/10 p-2 rounded-md h-fit text-primary">
              <ListTodo className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-medium text-foreground text-sm">Tareas</h3>
              <p className="text-sm text-muted-foreground mt-1">Acciones puntuales que debes hacer hoy o en el futuro (ej. "Llamar a Juan"). Llevan integrados niveles de prioridad alta, media o baja.</p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
