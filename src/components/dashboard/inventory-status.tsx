import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function InventoryStatus() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Status do Estoque</CardTitle>
        <CardDescription>Produtos com estoque baixo ou esgotado</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Colar Pérolas Dourado</p>
              <p className="text-xs text-muted-foreground">SKU: COL-PD-001</p>
            </div>
            <Badge variant="destructive">Esgotado</Badge>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Brinco Cristal Prata</p>
              <p className="text-xs text-muted-foreground">SKU: BRI-CP-023</p>
            </div>
            <Badge variant="outline" className="text-amber-500 border-amber-500">
              Baixo (3)
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Pulseira Pedras Coloridas</p>
              <p className="text-xs text-muted-foreground">SKU: PUL-PC-045</p>
            </div>
            <Badge variant="outline" className="text-amber-500 border-amber-500">
              Baixo (5)
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Anel Solitário Zircônia</p>
              <p className="text-xs text-muted-foreground">SKU: ANE-SZ-012</p>
            </div>
            <Badge variant="destructive">Esgotado</Badge>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Conjunto Festa Prata</p>
              <p className="text-xs text-muted-foreground">SKU: CON-FP-078</p>
            </div>
            <Badge variant="outline" className="text-amber-500 border-amber-500">
              Baixo (2)
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
