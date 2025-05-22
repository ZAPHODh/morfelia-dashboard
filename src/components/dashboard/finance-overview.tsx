import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight, ArrowDownRight, DollarSign, CreditCard, TrendingDown, TrendingUp } from "lucide-react"

export function FinanceOverview() {
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
          <CardTitle className="text-sm font-medium">Despesas</CardTitle>
          <CreditCard className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">R$ 12.543,67</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-rose-500 flex items-center">
              +8.2% <ArrowUpRight className="ml-1 h-4 w-4" />
            </span>{" "}
            em relação ao mês passado
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Lucro</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">R$ 32.688,22</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-emerald-500 flex items-center">
              +25.8% <ArrowUpRight className="ml-1 h-4 w-4" />
            </span>{" "}
            em relação ao mês passado
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Margem de Lucro</CardTitle>
          <TrendingDown className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">72.3%</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-rose-500 flex items-center">
              -2.5% <ArrowDownRight className="ml-1 h-4 w-4" />
            </span>{" "}
            em relação ao mês passado
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
