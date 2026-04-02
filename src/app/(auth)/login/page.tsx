import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { login } from "./action"
import { LayoutDashboard } from "lucide-react"

export default function LoginPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-background p-6 md:p-10 relative overflow-hidden">
      {/* Background ambient gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="flex w-full max-w-sm flex-col gap-6 relative z-10">
        <div className="flex flex-col items-center gap-3 mb-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl brand-gradient text-white shadow-xl ring-1 ring-black/5">
            <LayoutDashboard className="h-6 w-6" strokeWidth={2.5} />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">Delega CRM</h1>
        </div>

        <Card className="shadow-saas border-border/60 bg-card/80 backdrop-blur-xl rounded-2xl overflow-hidden ring-1 ring-primary/10">
          <CardHeader className="text-center pb-4 pt-8">
            <CardTitle className="text-xl font-medium">Bienvenido de nuevo</CardTitle>
            <CardDescription className="text-muted-foreground/80">
              Inicia sesión con tus credenciales
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-8">
            <form action={login}>
              <div className="grid gap-5">
                <div className="grid gap-2">
                  <Label htmlFor="email" className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                    Email Corporativo
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="nombre@empresa.com"
                    required
                    className="h-11 rounded-lg bg-background/50 border-border/80 focus-visible:ring-primary focus-visible:ring-offset-0 focus-visible:border-primary transition-all hover:bg-background"
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                      Contraseña
                    </Label>
                  </div>
                  <Input 
                    id="password" 
                    name="password" 
                    type="password" 
                    required 
                    placeholder="••••••••"
                    className="h-11 rounded-lg bg-background/50 border-border/80 focus-visible:ring-primary focus-visible:ring-offset-0 focus-visible:border-primary transition-all hover:bg-background"
                  />
                </div>
                <Button type="submit" className="w-full h-11 rounded-lg brand-gradient text-white font-medium shadow-md hover:shadow-lg hover:opacity-90 transition-all border-0 mt-2">
                  Acceder al Panel
                </Button>
              </div>
            </form>
          </CardContent>
          <div className="bg-muted/30 p-4 text-center border-t border-border/40">
            <p className="text-xs text-muted-foreground">
              Modo Demo activo. Puedes usar cualquier credencial.
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}
