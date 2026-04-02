import { createClientServerClient } from "@/lib/supabase/server"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { MOCK_LEADS, USE_MOCK } from "@/lib/mockData"

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

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto py-2">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Leads (Prospectos)</h1>
      </div>
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
            {leads?.map((lead) => (
              <TableRow key={lead.lead_id}>
                <TableCell className="font-medium">
                  {/* @ts-ignore -- known strict type union behavior in supabase ts */}
                  {lead.accounts?.legal_name || 'Desconocido'}
                </TableCell>
                <TableCell className="max-w-xs truncate">{lead.message_summary}</TableCell>
                <TableCell className="capitalize">{lead.source_channel}</TableCell>
                <TableCell>{lead.intent}</TableCell>
                <TableCell>
                  <Badge variant="outline">{lead.status}</Badge>
                </TableCell>
              </TableRow>
            ))}
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
    </div>
  )
}
