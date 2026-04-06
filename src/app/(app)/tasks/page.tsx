import { createClientServerClient } from "@/lib/supabase/server"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { MOCK_TASKS, USE_MOCK } from "@/lib/mockData"

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

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto py-2">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Tareas Pendientes (Tasks)</h1>
      </div>
      <div className="rounded-xl border bg-card shadow-saas overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>Cuenta</TableHead>
              <TableHead>Prioridad</TableHead>
              <TableHead>Estado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks?.map((t) => (
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
            {(!tasks || tasks.length === 0) && (
              <TableRow>
                <TableCell colSpan={4} className="text-center h-24 text-muted-foreground">
                  No hay tareas registradas.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
