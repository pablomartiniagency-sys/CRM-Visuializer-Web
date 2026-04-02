import { createClientServerClient } from "@/lib/supabase/server"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { MOCK_ORDERS, USE_MOCK } from "@/lib/mockData"

export default async function OrdersPage() {
  const supabase = await createClientServerClient()
  let orders: any[] = USE_MOCK ? MOCK_ORDERS : [];

  if (!USE_MOCK) {
    const { data } = await supabase
      .from('orders')
      .select(`
        order_id, 
        status, 
        canal_origen, 
        temporada,
        fecha_objetivo,
        accounts (legal_name)
      `)
      .order('created_at', { ascending: false })
    orders = data || []
  }

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto py-2">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Pedidos</h1>
      </div>
      <div className="rounded-xl border bg-card shadow-saas overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID Pedido</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Fecha Objetivo</TableHead>
              <TableHead>Temporada</TableHead>
              <TableHead>Estado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders?.map((order) => {
              let variant: "default" | "secondary" | "destructive" | "success" | "warning" | "info" | "outline" = "outline"
              const s = order.status?.toLowerCase() || ''
              if (s.includes('draft') || s.includes('pending')) variant = "secondary"
              if (s.includes('quote') || s.includes('quoted')) variant = "info"
              if (s.includes('confirm') || s.includes('production')) variant = "warning"
              if (s.includes('closed') || s.includes('done') || s.includes('success')) variant = "success"
              if (s.includes('cancel') || s.includes('error')) variant = "destructive"

              return (
                <TableRow key={order.order_id}>
                  <TableCell className="font-medium line-clamp-1 max-w-[120px]" title={order.order_id}>{order.order_id}</TableCell>
                  <TableCell>
                    {/* @ts-ignore */}
                    {order.accounts?.legal_name}
                  </TableCell>
                  <TableCell>{order.fecha_objetivo || '-'}</TableCell>
                  <TableCell>{order.temporada || '-'}</TableCell>
                  <TableCell>
                    <Badge variant={variant} className="capitalize">{order.status}</Badge>
                  </TableCell>
                </TableRow>
              )
            })}
            {(!orders || orders.length === 0) && (
              <TableRow>
                <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                  No hay pedidos registrados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
