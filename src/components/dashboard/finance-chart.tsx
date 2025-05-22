"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const data = [
  { name: "Jan", receita: 24000, despesas: 8000, lucro: 16000 },
  { name: "Fev", receita: 18000, despesas: 6500, lucro: 11500 },
  { name: "Mar", receita: 30000, despesas: 9000, lucro: 21000 },
  { name: "Abr", receita: 16680, despesas: 5500, lucro: 11180 },
  { name: "Mai", receita: 11340, despesas: 4200, lucro: 7140 },
  { name: "Jun", receita: 14340, despesas: 4800, lucro: 9540 },
  { name: "Jul", receita: 20940, despesas: 6300, lucro: 14640 },
  { name: "Ago", receita: 24000, despesas: 7200, lucro: 16800 },
  { name: "Set", receita: 27000, despesas: 8100, lucro: 18900 },
  { name: "Out", receita: 31200, despesas: 9360, lucro: 21840 },
  { name: "Nov", receita: 36000, despesas: 10800, lucro: 25200 },
  { name: "Dez", receita: 42000, despesas: 12600, lucro: 29400 },
]

interface FinanceChartProps {
  className?: string
}

export function FinanceChart({ className }: FinanceChartProps) {
  return (
    <Card className={cn("col-span-4", className)}>
      <CardHeader>
        <CardTitle>Finanças Anuais</CardTitle>
        <CardDescription>Comparativo de receitas, despesas e lucro nos últimos 12 meses</CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
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
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="receita" fill="#8884d8" name="Receita" />
              <Bar dataKey="despesas" fill="#ff8042" name="Despesas" />
              <Bar dataKey="lucro" fill="#82ca9d" name="Lucro" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
