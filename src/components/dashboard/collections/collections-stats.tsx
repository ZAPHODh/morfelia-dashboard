"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { ArrowUpRight, ArrowDownRight, TrendingUp, ShoppingBag, Users, Calendar } from "lucide-react"

// Dados de exemplo para os gráficos
const collectionPerformance = [
  { name: "Coleção Verão", vendas: 120, receita: 12000, visualizacoes: 1500 },
  { name: "Dia dos Namorados", vendas: 85, receita: 8500, visualizacoes: 1200 },
  { name: "Black Friday", vendas: 200, receita: 18000, visualizacoes: 2500 },
  { name: "Coleção Inverno", vendas: 95, receita: 9500, visualizacoes: 1100 },
  { name: "Festa de Formatura", vendas: 75, receita: 7500, visualizacoes: 900 },
]

const monthlyData = [
  { name: "Jan", vendas: 65, receita: 6500 },
  { name: "Fev", vendas: 75, receita: 7500 },
  { name: "Mar", vendas: 90, receita: 9000 },
  { name: "Abr", vendas: 85, receita: 8500 },
  { name: "Mai", vendas: 110, receita: 11000 },
  { name: "Jun", vendas: 130, receita: 13000 },
  { name: "Jul", vendas: 95, receita: 9500 },
  { name: "Ago", vendas: 80, receita: 8000 },
  { name: "Set", vendas: 100, receita: 10000 },
  { name: "Out", vendas: 120, receita: 12000 },
  { name: "Nov", vendas: 200, receita: 20000 },
  { name: "Dez", vendas: 150, receita: 15000 },
]

const categoryData = [
  { name: "Colares", value: 35 },
  { name: "Brincos", value: 25 },
  { name: "Anéis", value: 20 },
  { name: "Pulseiras", value: 15 },
  { name: "Conjuntos", value: 5 },
]

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088fe"]

export function CollectionsStats() {
  const [period, setPeriod] = useState("year")
  const [collection, setCollection] = useState("all")

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold">Desempenho das Coleções</h2>
        <div className="flex gap-2">
          <Select value={collection} onValueChange={setCollection}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Coleção" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as coleções</SelectItem>
              <SelectItem value="verao">Coleção Verão</SelectItem>
              <SelectItem value="namorados">Dia dos Namorados</SelectItem>
              <SelectItem value="blackfriday">Black Friday</SelectItem>
              <SelectItem value="inverno">Coleção Inverno</SelectItem>
              <SelectItem value="formatura">Festa de Formatura</SelectItem>
            </SelectContent>
          </Select>
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Último mês</SelectItem>
              <SelectItem value="quarter">Último trimestre</SelectItem>
              <SelectItem value="year">Último ano</SelectItem>
              <SelectItem value="all">Todo o período</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Cards de métricas */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 130.500,00</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500 flex items-center">
                +12.5% <ArrowUpRight className="ml-1 h-4 w-4" />
              </span>{" "}
              em relação ao período anterior
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vendas</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.305</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500 flex items-center">
                +8.2% <ArrowUpRight className="ml-1 h-4 w-4" />
              </span>{" "}
              em relação ao período anterior
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clientes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">875</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500 flex items-center">
                +5.3% <ArrowUpRight className="ml-1 h-4 w-4" />
              </span>{" "}
              em relação ao período anterior
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ticket Médio</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 100,00</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-rose-500 flex items-center">
                -2.1% <ArrowDownRight className="ml-1 h-4 w-4" />
              </span>{" "}
              em relação ao período anterior
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos */}
      <Tabs defaultValue="performance" className="space-y-4">
        <TabsList>
          <TabsTrigger value="performance">Desempenho por Coleção</TabsTrigger>
          <TabsTrigger value="monthly">Vendas Mensais</TabsTrigger>
          <TabsTrigger value="categories">Categorias</TabsTrigger>
        </TabsList>
        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Desempenho por Coleção</CardTitle>
              <CardDescription>Comparativo de vendas, receita e visualizações por coleção</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={collectionPerformance}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                  <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="vendas" name="Vendas" fill="#8884d8" />
                  <Bar yAxisId="right" dataKey="receita" name="Receita (R$)" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Coleções Mais Vendidas</CardTitle>
                <CardDescription>Top 5 coleções por volume de vendas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {collectionPerformance
                    .sort((a, b) => b.vendas - a.vendas)
                    .slice(0, 5)
                    .map((collection, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-12 text-center font-medium">{index + 1}º</div>
                        <div className="flex-1">
                          <div className="font-medium">{collection.name}</div>
                          <div className="text-sm text-muted-foreground">{collection.vendas} vendas</div>
                        </div>
                        <Badge variant={index === 0 ? "default" : "outline"}>
                          R$ {collection.receita.toLocaleString("pt-BR")}
                        </Badge>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Visualizações vs. Conversão</CardTitle>
                <CardDescription>Taxa de conversão por coleção</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {collectionPerformance.map((collection, index) => {
                    const conversionRate = ((collection.vendas / collection.visualizacoes) * 100).toFixed(1)
                    return (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="font-medium">{collection.name}</span>
                          <span>{conversionRate}%</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: `${conversionRate}%` }} />
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>{collection.visualizacoes} visualizações</span>
                          <span>{collection.vendas} vendas</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="monthly">
          <Card>
            <CardHeader>
              <CardTitle>Vendas Mensais</CardTitle>
              <CardDescription>Evolução de vendas e receita ao longo do ano</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={monthlyData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                  <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="vendas" name="Vendas" fill="#8884d8" />
                  <Bar yAxisId="right" dataKey="receita" name="Receita (R$)" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="categories">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Vendas por Categoria</CardTitle>
                <CardDescription>Distribuição de vendas por categoria de produto</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Detalhamento por Categoria</CardTitle>
                <CardDescription>Análise detalhada por categoria de produto</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {categoryData.map((category, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">{category.name}</span>
                        <span>{category.value}%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full"
                          style={{
                            width: `${category.value}%`,
                            backgroundColor: COLORS[index % COLORS.length],
                          }}
                        />
                      </div>
                      <div className="grid grid-cols-3 text-xs">
                        <div>
                          <div className="font-medium">Vendas</div>
                          <div className="text-muted-foreground">{Math.floor(category.value * 13)}</div>
                        </div>
                        <div>
                          <div className="font-medium">Receita</div>
                          <div className="text-muted-foreground">R$ {(category.value * 130).toFixed(0)}</div>
                        </div>
                        <div>
                          <div className="font-medium">Ticket Médio</div>
                          <div className="text-muted-foreground">R$ {(category.value * 10).toFixed(0)}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
