import { createClientServerClient } from "@/lib/supabase/server"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export default async function InteractionsPage() {
  const supabase = await createClientServerClient()

  const { data: interactions } = await supabase
    .from('interactions')
    .select(`
      interaction_id,
      channel,
      sentiment,
      message_summary,
      created_at,
      accounts (legal_name)
    `)
    .order('created_at', { ascending: false })

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto py-2">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Interacciones</h1>
      </div>
      <div className="rounded-xl border bg-card shadow-saas overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Fecha</TableHead>
              <TableHead>Cuenta</TableHead>
              <TableHead>Canal</TableHead>
              <TableHead>Sentimiento</TableHead>
              <TableHead>Resumen</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {interactions?.map((interaction: any) => (
              <TableRow key={interaction.interaction_id}>
                <TableCell className="whitespace-nowrap">{new Date(interaction.created_at).toLocaleDateString()}</TableCell>
                <TableCell className="font-medium">
                  {interaction.accounts?.legal_name || 'Desconocido'}
                </TableCell>
                <TableCell className="capitalize">{interaction.channel || '-'}</TableCell>
                <TableCell>
                  <Badge variant={interaction.sentiment === 'Positivo' ? 'default' : 'secondary'}>
                    {interaction.sentiment || 'Neutral'}
                  </Badge>
                </TableCell>
                <TableCell className="max-w-md truncate">{interaction.message_summary || '-'}</TableCell>
              </TableRow>
            ))}
            {(!interactions || interactions.length === 0) && (
              <TableRow>
                <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                  No hay interacciones registradas en la base de datos real.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
