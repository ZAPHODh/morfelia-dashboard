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
import { ChevronLeft, ChevronRight, Edit, MoreHorizontal, Search, ShoppingBag, Trash2 } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const customers = [
  {
    id: "CLI001",
    name: "Maria Rodrigues",
    email: "maria.r@example.com",
    phone: "(11) 98765-4321",
    orders: 15,
    totalSpent: 12450.0,
    lastPurchase: "15/05/2023",
  },
  {
    id: "CLI002",
    name: "João Oliveira",
    email: "joao.o@example.com",
    phone: "(11) 91234-5678",
    orders: 8,
    totalSpent: 5680.0,
    lastPurchase: "14/05/2023",
  },
  {
    id: "CLI003",
    name: "Ana Silva",
    email: "ana.s@example.com",
    phone: "(21) 99876-5432",
    orders: 23,
    totalSpent: 18950.0,
    lastPurchase: "13/05/2023",
  },
  {
    id: "CLI004",
    name: "Carlos Santos",
    email: "carlos.s@example.com",
    phone: "(21) 98765-1234",
    orders: 5,
    totalSpent: 3200.0,
    lastPurchase: "12/05/2023",
  },
  {
    id: "CLI005",
    name: "Luiza Mendes",
    email: "luiza.m@example.com",
    phone: "(31) 97654-3210",
    orders: 12,
    totalSpent: 8750.0,
    lastPurchase: "11/05/2023",
  },
  {
    id: "CLI006",
    name: "Pedro Almeida",
    email: "pedro.a@example.com",
    phone: "(31) 98765-4321",
    orders: 7,
    totalSpent: 4320.0,
    lastPurchase: "10/05/2023",
  },
  {
    id: "CLI007",
    name: "Fernanda Lima",
    email: "fernanda.l@example.com",
    phone: "(41) 99876-5432",
    orders: 9,
    totalSpent: 6780.0,
    lastPurchase: "09/05/2023",
  },
  {
    id: "CLI008",
    name: "Ricardo Gomes",
    email: "ricardo.g@example.com",
    phone: "(41) 98765-1234",
    orders: 3,
    totalSpent: 1890.0,
    lastPurchase: "08/05/2023",
  },
  {
    id: "CLI009",
    name: "Juliana Costa",
    email: "juliana.c@example.com",
    phone: "(51) 97654-3210",
    orders: 18,
    totalSpent: 14500.0,
    lastPurchase: "07/05/2023",
  },
  {
    id: "CLI010",
    name: "Marcelo Souza",
    email: "marcelo.s@example.com",
    phone: "(51) 98765-4321",
    orders: 6,
    totalSpent: 3950.0,
    lastPurchase: "06/05/2023",
  },
]

export function CustomersTable() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm),
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar clientes..."
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
              <TableHead>Cliente</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead className="text-right">Pedidos</TableHead>
              <TableHead className="text-right">Total Gasto</TableHead>
              <TableHead>Última Compra</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback>
                        {customer.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .substring(0, 2)
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{customer.name}</div>
                      <div className="text-xs text-muted-foreground">{customer.id}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.phone}</TableCell>
                <TableCell className="text-right">{customer.orders}</TableCell>
                <TableCell className="text-right">R$ {customer.totalSpent.toFixed(2)}</TableCell>
                <TableCell>{customer.lastPurchase}</TableCell>
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
                      <DropdownMenuItem>
                        <ShoppingBag className="mr-2 h-4 w-4" />
                        <span>Ver pedidos</span>
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
