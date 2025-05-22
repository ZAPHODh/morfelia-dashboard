import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function ExpensesTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Despesas Recentes</CardTitle>
        <CardDescription>Últimas despesas registradas</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Aluguel da Loja</p>
              <p className="text-xs text-muted-foreground">05/05/2023</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-blue-500 border-blue-500">
                Fixo
              </Badge>
              <span className="font-medium">R$ 3.500,00</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Fornecedor ABC Joias</p>
              <p className="text-xs text-muted-foreground">03/05/2023</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-amber-500 border-amber-500">
                Estoque
              </Badge>
              <span className="font-medium">R$ 2.850,00</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Salários</p>
              <p className="text-xs text-muted-foreground">01/05/2023</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-blue-500 border-blue-500">
                Fixo
              </Badge>
              <span className="font-medium">R$ 4.200,00</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Energia Elétrica</p>
              <p className="text-xs text-muted-foreground">28/04/2023</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-purple-500 border-purple-500">
                Variável
              </Badge>
              <span className="font-medium">R$ 450,00</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Marketing Digital</p>
              <p className="text-xs text-muted-foreground">25/04/2023</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-green-500 border-green-500">
                Marketing
              </Badge>
              <span className="font-medium">R$ 1.200,00</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
