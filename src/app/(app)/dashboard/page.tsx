import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DashboardPage() {
  return (
    <div className="grid gap-6 md:gap-8 w-full max-w-7xl mx-auto py-2">
      <div className="flex items-center">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Dashboard General</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-4">
        <Card className="card-premium">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Nuevos Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12</div>
            <p className="text-xs text-muted-foreground">desde el último mes</p>
          </CardContent>
        </Card>
        <Card className="card-premium">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Pedidos Activos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">34</div>
            <p className="text-xs text-muted-foreground">En producción y draft</p>
          </CardContent>
        </Card>
        <Card className="card-premium">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Cuentas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">145</div>
            <p className="text-xs text-muted-foreground">Total registradas</p>
          </CardContent>
        </Card>
        <Card className="card-premium">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Tareas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Pendientes para hoy</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
