import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight, ArrowDownRight, DollarSign, Package, ShoppingCart, Users } from "lucide-react"

export function DashboardOverview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">R$ 45.231,89</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-emerald-500 flex items-center">
              +20.1% <ArrowUpRight className="ml-1 h-4 w-4" />
            </span>{" "}
            em relação ao mês passado
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Vendas</CardTitle>
          <ShoppingCart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+573</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-emerald-500 flex items-center">
              +12.4% <ArrowUpRight className="ml-1 h-4 w-4" />
            </span>{" "}
            em relação ao mês passado
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Produtos</CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">1.234</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-rose-500 flex items-center">
              -2.5% <ArrowDownRight className="ml-1 h-4 w-4" />
            </span>{" "}
            em relação ao mês passado
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Clientes Ativos</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+2.350</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-emerald-500 flex items-center">
              +18.2% <ArrowUpRight className="ml-1 h-4 w-4" />
            </span>{" "}
            em relação ao mês passado
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
