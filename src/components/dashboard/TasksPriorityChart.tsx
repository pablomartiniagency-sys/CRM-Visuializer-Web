"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const data = [
  { name: "Alta", value: 4, color: "hsl(var(--destructive))" },
  { name: "Media", value: 12, color: "hsl(var(--warning, 38 92% 50%))" },
  { name: "Baja", value: 8, color: "hsl(var(--muted-foreground))" },
]

export function TasksPriorityChart() {
  return (
    <Card className="col-span-1 border-border shadow-sm">
      <CardHeader>
        <CardTitle className="text-base">Prioridad de Tareas</CardTitle>
        <CardDescription>Carga de trabajo operativa activa</CardDescription>
      </CardHeader>
      <CardContent className="h-[280px] w-full pt-2 flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: '1px solid hsl(var(--border))', backgroundColor: 'hsl(var(--background))' }}
            />
            <Legend verticalAlign="bottom" height={36} iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
