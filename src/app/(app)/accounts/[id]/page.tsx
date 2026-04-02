import { createClientServerClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default async function AccountDetailPage({ params }: { params: { id: string } }) {
  const supabase = await createClientServerClient()

  // params.id debe venir del router, pero Next 15 en app routing los trae como promesa
  const { id } = await params;

  const { data: account } = await supabase
    .from('accounts')
    .select('*')
    .eq('account_id', id)
    .single()

  if (!account) {
    return notFound()
  }

  // Fetch relations (In a real app, you might want to fetch these when a tab is clicked or in parallel)
  const { data: contacts } = await supabase.from('contacts').select('*').eq('account_id', id)
  const { data: orders } = await supabase.from('orders').select('*').eq('account_id', id)
  const { data: leads } = await supabase.from('leads').select('*').eq('account_id', id)
  const { data: tasks } = await supabase.from('tasks').select('*').eq('account_id', id)
  const { data: interactions } = await supabase.from('interactions').select('*').eq('account_id', id)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">{account.legal_name}</h1>
        <div className="flex items-center gap-2">
          <Badge variant={account.status === 'active' ? 'default' : 'secondary'}>{account.status}</Badge>
          <span className="text-sm text-muted-foreground">NIF: {account.nif}</span>
          <span className="text-sm text-muted-foreground">{account.trade_name ? `• Comercial: ${account.trade_name}` : ''}</span>
        </div>
      </div>

      <Tabs defaultValue="detalles" className="w-full">
        <TabsList className="grid w-full grid-cols-6 mb-4">
          <TabsTrigger value="detalles">Detalles</TabsTrigger>
          <TabsTrigger value="contactos">Contactos ({contacts?.length || 0})</TabsTrigger>
          <TabsTrigger value="leads">Leads ({leads?.length || 0})</TabsTrigger>
          <TabsTrigger value="pedidos">Pedidos ({orders?.length || 0})</TabsTrigger>
          <TabsTrigger value="interacciones">Interacciones ({interactions?.length || 0})</TabsTrigger>
          <TabsTrigger value="tareas">Tareas ({tasks?.length || 0})</TabsTrigger>
        </TabsList>

        <TabsContent value="detalles">
          <Card>
            <CardHeader>
              <CardTitle>Información General</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p><strong>Notas: </strong>{account.notes || 'Sin notas.'}</p>
              <p><strong>Tipo de cliente: </strong>{account.client_type || '-'}</p>
              <p><strong>Agente asignado: </strong>{account.agent || '-'}</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contactos">
          <Card>
            <CardHeader>
              <CardTitle>Personas de Contacto</CardTitle>
            </CardHeader>
            <CardContent>
              {contacts?.length ? (
                <ul className="space-y-4">
                  {contacts.map((c) => (
                    <li key={c.contact_id} className="border-b pb-2">
                      <p className="font-semibold">{c.full_name} {c.is_primary && <Badge variant="outline" className="ml-2">Principal</Badge>}</p>
                      <p className="text-sm text-muted-foreground">Rol: {c.role || 'No definido'}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground">No hay contactos.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leads">
          <Card>
            <CardHeader>
              <CardTitle>Historial de Prospectiva</CardTitle>
            </CardHeader>
            <CardContent>
              {leads?.length ? (
                <ul className="space-y-4">
                  {leads.map((l) => (
                    <li key={l.lead_id} className="border-b pb-2">
                      <p className="font-semibold">{l.message_summary}</p>
                      <Badge className="mt-1">{l.status}</Badge>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground">No hay leads asociados.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pedidos">
          <Card>
            <CardHeader>
              <CardTitle>Historial de Pedidos</CardTitle>
            </CardHeader>
            <CardContent>
              {orders?.length ? (
                <ul className="space-y-4">
                  {orders.map((o) => (
                    <li key={o.order_id} className="border-b pb-2">
                      <p className="font-semibold">Pedido {o.order_id}</p>
                      <Badge variant="outline" className="mt-1">{o.status}</Badge>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground">No hay pedidos asociados.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="interacciones">
           <Card>
             <CardContent className="pt-6">
                <p className="text-muted-foreground">Mostrando {interactions?.length || 0} mensajes.</p>
             </CardContent>
           </Card>
        </TabsContent>

        <TabsContent value="tareas">
           <Card>
             <CardContent className="pt-6">
                <p className="text-muted-foreground">Mostrando {tasks?.length || 0} tareas pendientes o completadas.</p>
             </CardContent>
           </Card>
        </TabsContent>

      </Tabs>
    </div>
  )
}
