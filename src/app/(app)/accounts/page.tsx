import { createClientServerClient } from "@/lib/supabase/server"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { AccountDialog } from "@/components/forms/AccountDialog"
import { MOCK_ACCOUNTS, USE_MOCK } from "@/lib/mockData"

export default async function AccountsPage() {
  const supabase = await createClientServerClient()
  let accounts = USE_MOCK ? MOCK_ACCOUNTS : [];

  if (!USE_MOCK) {
    const { data } = await supabase.from('accounts').select('*').order('created_at', { ascending: false })
    accounts = data || []
  }

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto py-2">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Cuentas</h1>
        <AccountDialog />
      </div>
      <div className="rounded-xl border bg-card shadow-saas overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre Legal</TableHead>
              <TableHead>Nombre Comercial</TableHead>
              <TableHead>NIF</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Tipo</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {accounts?.map((acc) => (
              <TableRow key={acc.account_id}>
                <TableCell className="font-medium">
                  <Link href={`/accounts/${acc.account_id}`} className="hover:underline text-primary">
                    {acc.legal_name}
                  </Link>
                </TableCell>
                <TableCell>{acc.trade_name || '-'}</TableCell>
                <TableCell>{acc.nif}</TableCell>
                <TableCell>
                  <Badge variant={acc.status === 'active' ? 'default' : 'secondary'}>{acc.status}</Badge>
                </TableCell>
                <TableCell>{acc.client_type || '-'}</TableCell>
              </TableRow>
            ))}
            {(!accounts || accounts.length === 0) && (
              <TableRow>
                <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                  No hay cuentas registradas.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
