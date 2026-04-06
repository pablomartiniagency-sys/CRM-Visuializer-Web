"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Cell } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const data = [
  { stage: "Nuevos", count: 45, color: "hsl(var(--muted-foreground))" },
  { stage: "Contactados", count: 30, color: "hsl(var(--accent-foreground))" },
  { stage: "Cualificados", count: 18, color: "hsl(var(--primary))" },
  { stage: "Ganados", count: 12, color: "hsl(var(--success, 142.1 76.2% 36.3%))" },
]

export function LeadFunnelChart() {
  return (
    <Card className="col-span-1 border-border shadow-sm">
      <CardHeader>
        <CardTitle className="text-base">Embudo de Conversión (Leads)</CardTitle>
        <CardDescription>Rendimiento del pipeline este mes</CardDescription>
      </CardHeader>
      <CardContent className="h-[280px] w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
            <XAxis dataKey="stage" tickLine={false} axisLine={false} fontSize={12} tickMargin={10} />
            <YAxis tickLine={false} axisLine={false} fontSize={12} />
            <Tooltip 
              cursor={{ fill: 'transparent' }}
              contentStyle={{ borderRadius: '8px', border: '1px solid hsl(var(--border))', backgroundColor: 'hsl(var(--background))' }}
            />
            <Bar dataKey="count" radius={[4, 4, 0, 0]} barSize={40}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
