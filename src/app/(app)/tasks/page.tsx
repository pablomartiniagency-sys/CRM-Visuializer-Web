import * as React from "react"
import { createClientServerClient } from "@/lib/supabase/server"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { MOCK_TASKS, USE_MOCK } from "@/lib/mockData"
import { EmptyState } from "@/components/ui/EmptyState"
import { InfoTooltip } from "@/components/ui/InfoTooltip"
import { ListTodo } from "lucide-react"

type TaskWithAccount = {
  task_id: string;
  title: string;
  priority: string;
  status: string;
  accounts?: typeof MOCK_TASKS[0]['accounts'] | { legal_name: string } | null;
};

export default async function TasksPage() {
  const supabase = await createClientServerClient()
  let tasks: TaskWithAccount[] = USE_MOCK ? MOCK_TASKS as unknown as TaskWithAccount[] : [];

  if (!USE_MOCK) {
    const { data } = await supabase
      .from('tasks')
      .select(`*, accounts (legal_name)`)
      .order('created_at', { ascending: false })
    tasks = data || []
  }

  const hasTasks = tasks && tasks.length > 0;

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto py-2">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground flex items-center">
          Tareas Pendientes (Tasks)
          <InfoTooltip content="Tus micro-operaciones diarias. Filtradas por prioridad para evitar bloqueos operativos." />
        </h1>
      </div>
      
      {!hasTasks ? (
        <EmptyState 
          icon={ListTodo}
          title="Sin tareas pendientes por ahora"
          description="Crea tu primer recordatorio u operación para mantener tu flujo de trabajo al día."
        />
      ) : (
        <div className="rounded-xl border bg-card shadow-saas overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Cuenta</TableHead>
                <TableHead>
                  Prioridad
                  <InfoTooltip content="Prioriza las tareas 'High' (Alta) para hoy y las 'Med' (Media) para esta semana." />
                </TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.map((t) => (
                <TableRow key={t.task_id}>
                  <TableCell className="font-medium">{t.title}</TableCell>
                  <TableCell>
                    {t.accounts?.legal_name || '-'}
                  </TableCell>
                  <TableCell className="capitalize">{t.priority}</TableCell>
                  <TableCell>
                    <Badge variant={t.status === 'open' ? 'default' : 'secondary'}>{t.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}
