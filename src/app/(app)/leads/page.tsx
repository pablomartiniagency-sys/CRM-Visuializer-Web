import { createClientServerClient } from "@/lib/supabase/server"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { MOCK_LEADS, USE_MOCK } from "@/lib/mockData"

import { LeadsViewSwitcher } from "@/components/kanban/LeadsViewSwitcher"
import { EmptyState } from "@/components/ui/EmptyState"
import { InfoTooltip } from "@/components/ui/InfoTooltip"
import { Users } from "lucide-react"

export default async function LeadsPage() {
  const supabase = await createClientServerClient()
  let leads: any[] = USE_MOCK ? MOCK_LEADS : [];

  if (!USE_MOCK) {
    const { data } = await supabase
      .from('leads')
      .select(`
        lead_id, 
        status, 
        source_channel, 
        message_summary, 
        intent,
        urgency,
        accounts (legal_name)
      `)
      .order('created_at', { ascending: false })
    leads = data || []
  }

  const tableComponent = (
    <div className="rounded-xl border bg-card shadow-saas overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Cuenta (Si aplica)</TableHead>
            <TableHead>Resumen</TableHead>
            <TableHead>Canal</TableHead>
            <TableHead>Intención</TableHead>
            <TableHead>Estado</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads?.map((lead) => {
            let variant: "default" | "secondary" | "destructive" | "success" | "warning" | "info" | "outline" = "outline"
            const s = lead.status?.toLowerCase() || ''
            if (s === 'new') variant = "info"
            if (s === 'contacted') variant = "secondary"
            if (s === 'qualified') variant = "warning"
            if (s === 'won') variant = "success"
            if (s === 'lost') variant = "destructive"

            return (
              <TableRow key={lead.lead_id}>
                <TableCell className="font-medium">
                  {/* @ts-ignore -- known strict type union behavior in supabase ts */}
                  {lead.accounts?.legal_name || 'Desconocido'}
                </TableCell>
                <TableCell className="max-w-xs truncate">{lead.message_summary}</TableCell>
                <TableCell className="capitalize">{lead.source_channel}</TableCell>
                <TableCell>{lead.intent}</TableCell>
                <TableCell>
                  <Badge variant={variant} className="capitalize">{lead.status}</Badge>
                </TableCell>
              </TableRow>
            )
          })}
          {(!leads || leads.length === 0) && (
            <TableRow>
              <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                No hay leads registrados.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );

  const hasLeads = leads && leads.length > 0;

  return (
    <div className="flex flex-col gap-2 w-full max-w-7xl mx-auto py-2">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground flex items-center">
          Leads (Prospectos)
          <InfoTooltip content="Un Lead representa una oportunidad comercial. Arrástralos por el tablero Kanban para avanzar la negociación." />
        </h1>
      </div>
      
      {!hasLeads ? (
        <EmptyState 
          icon={Users}
          title="Ningún Lead activo"
          description="Crea tu primer Lead para dar seguimiento visual a clientes potenciales usando nuestra vista interactiva de Tablero."
        />
      ) : (
        <LeadsViewSwitcher initialLeads={leads} TableComponent={tableComponent} />
      )}
    </div>
  )
}
