"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Edit, MoreHorizontal, Search, Trash2 } from "lucide-react"

const products = [
  {
    id: "PRD001",
    name: "Colar Pérolas Dourado",
    sku: "COL-PD-001",
    category: "Colares",
    price: 129.9,
    stock: 0,
    status: "Esgotado",
  },
  {
    id: "PRD002",
    name: "Brinco Cristal Prata",
    sku: "BRI-CP-023",
    category: "Brincos",
    price: 79.9,
    stock: 3,
    status: "Baixo",
  },
  {
    id: "PRD003",
    name: "Pulseira Pedras Coloridas",
    sku: "PUL-PC-045",
    category: "Pulseiras",
    price: 89.9,
    stock: 5,
    status: "Baixo",
  },
  {
    id: "PRD004",
    name: "Anel Solitário Zircônia",
    sku: "ANE-SZ-012",
    category: "Anéis",
    price: 149.9,
    stock: 0,
    status: "Esgotado",
  },
  {
    id: "PRD005",
    name: "Conjunto Festa Prata",
    sku: "CON-FP-078",
    category: "Conjuntos",
    price: 249.9,
    stock: 2,
    status: "Baixo",
  },
  {
    id: "PRD006",
    name: "Brinco Argola Dourada",
    sku: "BRI-AD-034",
    category: "Brincos",
    price: 59.9,
    stock: 15,
    status: "Em estoque",
  },
  {
    id: "PRD007",
    name: "Colar Corrente Fina",
    sku: "COL-CF-056",
    category: "Colares",
    price: 69.9,
    stock: 20,
    status: "Em estoque",
  },
  {
    id: "PRD008",
    name: "Anel Ajustável Flor",
    sku: "ANE-AF-089",
    category: "Anéis",
    price: 49.9,
    stock: 12,
    status: "Em estoque",
  },
  {
    id: "PRD009",
    name: "Pulseira Rígida Dourada",
    sku: "PUL-RD-067",
    category: "Pulseiras",
    price: 99.9,
    stock: 8,
    status: "Em estoque",
  },
  {
    id: "PRD010",
    name: "Tornozeleira Bolinhas",
    sku: "TOR-BO-091",
    category: "Tornozeleiras",
    price: 39.9,
    stock: 18,
    status: "Em estoque",
  },
]

export function ProductsTable() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar produtos..."
            className="pl-8 w-full md:w-80"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead className="text-right">Preço</TableHead>
              <TableHead className="text-right">Estoque</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.sku}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell className="text-right">R$ {product.price.toFixed(2)}</TableCell>
                <TableCell className="text-right">{product.stock}</TableCell>
                <TableCell>
                  {product.status === "Esgotado" ? (
                    <Badge variant="destructive">Esgotado</Badge>
                  ) : product.status === "Baixo" ? (
                    <Badge variant="outline" className="text-amber-500 border-amber-500">
                      Baixo
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-emerald-500 border-emerald-500">
                      Em estoque
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Abrir menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Ações</DropdownMenuLabel>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        <span>Editar</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" />
                        <span>Excluir</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button variant="outline" size="sm">
          <ChevronLeft className="h-4 w-4" />
          Anterior
        </Button>
        <Button variant="outline" size="sm">
          Próximo
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
