"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const data = [
  { name: "Jan", vendas: 4000, receita: 24000 },
  { name: "Fev", vendas: 3000, receita: 18000 },
  { name: "Mar", vendas: 5000, receita: 30000 },
  { name: "Abr", vendas: 2780, receita: 16680 },
  { name: "Mai", vendas: 1890, receita: 11340 },
  { name: "Jun", vendas: 2390, receita: 14340 },
  { name: "Jul", vendas: 3490, receita: 20940 },
  { name: "Ago", vendas: 4000, receita: 24000 },
  { name: "Set", vendas: 4500, receita: 27000 },
  { name: "Out", vendas: 5200, receita: 31200 },
  { name: "Nov", vendas: 6000, receita: 36000 },
  { name: "Dez", vendas: 7000, receita: 42000 },
]

interface SalesChartProps {
  className?: string
}

export function SalesChart({ className }: SalesChartProps) {
  return (
    <Card className={cn("col-span-4", className)}>
      <CardHeader>
        <CardTitle>Vendas e Receita</CardTitle>
        <CardDescription>Comparativo de vendas e receita nos últimos 12 meses</CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="vendas" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line yAxisId="right" type="monotone" dataKey="receita" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
