"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Eye, FileText, MoreHorizontal, Search } from "lucide-react"

const sales = [
  {
    id: "VND001",
    customer: "Maria Rodrigues",
    date: "15/05/2023",
    total: 1999.0,
    items: 3,
    status: "Entregue",
    payment: "Cartão de Crédito",
  },
  {
    id: "VND002",
    customer: "João Oliveira",
    date: "14/05/2023",
    total: 399.0,
    items: 1,
    status: "Entregue",
    payment: "PIX",
  },
  {
    id: "VND003",
    customer: "Ana Silva",
    date: "13/05/2023",
    total: 2499.0,
    items: 4,
    status: "Entregue",
    payment: "Cartão de Crédito",
  },
  {
    id: "VND004",
    customer: "Carlos Santos",
    date: "12/05/2023",
    total: 699.0,
    items: 2,
    status: "Entregue",
    payment: "Boleto",
  },
  {
    id: "VND005",
    customer: "Luiza Mendes",
    date: "11/05/2023",
    total: 899.0,
    items: 2,
    status: "Entregue",
    payment: "PIX",
  },
  {
    id: "VND006",
    customer: "Pedro Almeida",
    date: "10/05/2023",
    total: 1299.0,
    items: 3,
    status: "Em processamento",
    payment: "Cartão de Crédito",
  },
  {
    id: "VND007",
    customer: "Fernanda Lima",
    date: "09/05/2023",
    total: 599.0,
    items: 1,
    status: "Em processamento",
    payment: "PIX",
  },
  {
    id: "VND008",
    customer: "Ricardo Gomes",
    date: "08/05/2023",
    total: 1499.0,
    items: 3,
    status: "Cancelado",
    payment: "Cartão de Crédito",
  },
  {
    id: "VND009",
    customer: "Juliana Costa",
    date: "07/05/2023",
    total: 799.0,
    items: 2,
    status: "Entregue",
    payment: "PIX",
  },
  {
    id: "VND010",
    customer: "Marcelo Souza",
    date: "06/05/2023",
    total: 349.0,
    items: 1,
    status: "Entregue",
    payment: "Boleto",
  },
]

export function SalesTable() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredSales = sales.filter(
    (sale) =>
      sale.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.customer.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar vendas..."
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
              <TableHead>Pedido</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Data</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead className="text-right">Itens</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Pagamento</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSales.map((sale) => (
              <TableRow key={sale.id}>
                <TableCell className="font-medium">{sale.id}</TableCell>
                <TableCell>{sale.customer}</TableCell>
                <TableCell>{sale.date}</TableCell>
                <TableCell className="text-right">R$ {sale.total.toFixed(2)}</TableCell>
                <TableCell className="text-right">{sale.items}</TableCell>
                <TableCell>
                  {sale.status === "Entregue" ? (
                    <Badge variant="outline" className="text-emerald-500 border-emerald-500">
                      Entregue
                    </Badge>
                  ) : sale.status === "Em processamento" ? (
                    <Badge variant="outline" className="text-blue-500 border-blue-500">
                      Em processamento
                    </Badge>
                  ) : (
                    <Badge variant="destructive">Cancelado</Badge>
                  )}
                </TableCell>
                <TableCell>{sale.payment}</TableCell>
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
                        <Eye className="mr-2 h-4 w-4" />
                        <span>Ver detalhes</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <FileText className="mr-2 h-4 w-4" />
                        <span>Gerar nota</span>
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
