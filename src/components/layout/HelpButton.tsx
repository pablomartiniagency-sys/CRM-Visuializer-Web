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
        <div className="fixed bottom-6 right-8 z-50 flex items-center gap-3 rounded-full border border-primary/20 bg-background/80 px-5 py-3.5 text-sm font-semibold text-foreground shadow-2xl backdrop-blur-xl transition-all hover:bg-card hover:shadow-primary/10 hover:border-primary/40 group cursor-pointer">
          <HelpCircle className="h-5 w-5 text-primary group-hover:scale-110 transition-transform duration-300" />
          <span className="hidden md:inline-block tracking-tight">Centro de Ayuda</span>
        </div>
      </SheetTrigger>
      {/* Añadimos padding generoso (p-6 a p-8) y evitamos que los elementos toquen los bordes */}
      <SheetContent className="w-[400px] sm:w-[600px] overflow-y-auto border-l-border px-8 py-10">
        <SheetHeader className="mb-10 border-b border-border/50 pb-6">
          <SheetTitle className="text-3xl font-semibold tracking-tight text-foreground">Guía de Operaciones</SheetTitle>
          <SheetDescription className="text-base mt-2">
            Domina el flujo de trabajo en Delega CRM. Aquí tienes ejemplos prácticos para sacar el máximo rendimiento a nuestro ecosistema premium.
          </SheetDescription>
        </SheetHeader>
        
        <div className="flex flex-col gap-10">
          
          {/* Item: Buscador */}
          <div className="flex gap-6 group">
            <div className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300 shadow-sm">
              <Search className="h-6 w-6" />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-foreground tracking-tight">Buscador Universal (⌘ + K)</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Navegación ultrarrápida sin usar el ratón. Este comando global te permite invocar acciones o encontrar registros instantáneamente en milisegundos.
              </p>
              <div className="mt-2 rounded-lg bg-muted/40 p-4 border border-border/50">
                <p className="text-xs font-medium text-foreground mb-1 uppercase tracking-wider">💡 Ejemplos de uso:</p>
                <ul className="text-sm text-muted-foreground space-y-1.5 list-disc list-inside">
                  <li>Escribe <span className="text-foreground font-medium">"TechCorp"</span> para saltar directamente a la ficha de ese cliente corporativo.</li>
                  <li>Busca <span className="text-foreground font-medium">"Tareas"</span> para ir al gestor de prioridades.</li>
                  <li>Pulsa <span className="text-foreground font-medium">Ctrl + K</span> estando en una llamada para encontrar un presupuesto en 1 segundo.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Item: Dashboard */}
          <div className="flex gap-6 group">
            <div className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-300 shadow-sm">
              <BarChart3 className="h-6 w-6" />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-foreground tracking-tight">Dashboard & Analítica</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Tu centro de mando financiero y operativo. Aquí los datos se convierten en información visual para la toma de decisiones ejecutivas.
              </p>
              <div className="mt-2 rounded-lg bg-muted/40 p-4 border border-border/50">
                <p className="text-xs font-medium text-foreground mb-1 uppercase tracking-wider">💡 Ejemplos de uso:</p>
                <ul className="text-sm text-muted-foreground space-y-1.5 list-disc list-inside">
                  <li>Revisa el <strong>Embudo de Leads</strong> para ver cuántos prospectos se convirtieron en acuerdos rentables este mes.</li>
                  <li>Monitorea el anillo de <strong>Prioridad de Tareas</strong> para balancear la carga de trabajo de tu equipo.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Item: Cuentas */}
          <div className="flex gap-6 group">
            <div className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300 shadow-sm">
              <Folder className="h-6 w-6" />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-foreground tracking-tight">Cuentas (Accounts)</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Representan a tus clientes finales o empresas consolidadas. Son la entidad principal en la que orbitan todos los contratos, facturación e historial.
              </p>
              <div className="mt-2 rounded-lg bg-muted/40 p-4 border border-border/50">
                <p className="text-xs font-medium text-foreground mb-1 uppercase tracking-wider">💡 Ejemplos de uso:</p>
                <ul className="text-sm text-muted-foreground space-y-1.5 list-disc list-inside">
                  <li>Registra a la empresa "Amazon España" indicando su NIF y asignándole el nivel de cliente corporativo.</li>
                  <li>Consulta el perfil de una cuenta para ver todo su histórico consolidado de pedidos y actividad.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Item: Leads */}
          <div className="flex gap-6 group">
            <div className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-purple-500 group-hover:bg-purple-500 group-hover:text-white transition-colors duration-300 shadow-sm">
              <Users className="h-6 w-6" />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-foreground tracking-tight">Pipeline de Leads</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Tus oportunidades de venta fluida. Un tablero visual interactivo (Kanban) que te ayuda a dar seguimiento a cada conversación u oportunidad sin que nada se enfríe.
              </p>
              <div className="mt-2 rounded-lg bg-muted/40 p-4 border border-border/50">
                <p className="text-xs font-medium text-foreground mb-1 uppercase tracking-wider">💡 Ejemplos de uso:</p>
                <ul className="text-sm text-muted-foreground space-y-1.5 list-disc list-inside">
                  <li>Arrastra la tarjeta "Presupuesto web" de la columna <em>Nuevos</em> hacia la columna <em>Contactados</em> con un solo clic.</li>
                  <li>Visualiza el estado térmico (Intención Alta/Baja) para priorizar los cierres de fin de mes.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Item: Tareas */}
          <div className="flex gap-6 group">
            <div className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-colors duration-300 shadow-sm">
              <ListTodo className="h-6 w-6" />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-foreground tracking-tight">Gestión de Tareas</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                La agenda de acción. Micro-operaciones acotadas a fechas clave o prioridades para que el trabajo diario avance con fricción cero.
              </p>
              <div className="mt-2 rounded-lg bg-muted/40 p-4 border border-border/50">
                <p className="text-xs font-medium text-foreground mb-1 uppercase tracking-wider">💡 Ejemplos de uso:</p>
                <ul className="text-sm text-muted-foreground space-y-1.5 list-disc list-inside">
                  <li>Crea una Tarea asignada a la urgencia "Alta" que diga: <em>"Enviar contrato revisado al equipo de Legal"</em>.</li>
                  <li>Filtra todas las tareas marcándolas como completadas para mantener tu carga operativa al día.</li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </SheetContent>
    </Sheet>
  )
}
