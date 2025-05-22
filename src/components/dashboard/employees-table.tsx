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
import { ChevronLeft, ChevronRight, Edit, Key, MoreHorizontal, Search, Trash2 } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const employees = [
  {
    id: "FUNC001",
    name: "Amanda Oliveira",
    email: "amanda.o@bijoux.com",
    phone: "(11) 98765-4321",
    role: "Gerente",
    department: "Administração",
    status: "Ativo",
    startDate: "10/01/2020",
  },
  {
    id: "FUNC002",
    name: "Bruno Santos",
    email: "bruno.s@bijoux.com",
    phone: "(11) 91234-5678",
    role: "Vendedor",
    department: "Vendas",
    status: "Ativo",
    startDate: "15/03/2021",
  },
  {
    id: "FUNC003",
    name: "Carla Mendes",
    email: "carla.m@bijoux.com",
    phone: "(21) 99876-5432",
    role: "Vendedora",
    department: "Vendas",
    status: "Ativo",
    startDate: "05/06/2021",
  },
  {
    id: "FUNC004",
    name: "Daniel Lima",
    email: "daniel.l@bijoux.com",
    phone: "(21) 98765-1234",
    role: "Estoquista",
    department: "Estoque",
    status: "Ativo",
    startDate: "20/08/2021",
  },
  {
    id: "FUNC005",
    name: "Eduarda Silva",
    email: "eduarda.s@bijoux.com",
    phone: "(31) 97654-3210",
    role: "Atendente",
    department: "Atendimento",
    status: "Ativo",
    startDate: "12/01/2022",
  },
  {
    id: "FUNC006",
    name: "Fábio Costa",
    email: "fabio.c@bijoux.com",
    phone: "(31) 98765-4321",
    role: "Designer",
    department: "Marketing",
    status: "Ativo",
    startDate: "03/05/2022",
  },
  {
    id: "FUNC007",
    name: "Gabriela Alves",
    email: "gabriela.a@bijoux.com",
    phone: "(41) 99876-5432",
    role: "Assistente Administrativo",
    department: "Administração",
    status: "Inativo",
    startDate: "15/07/2022",
  },
  {
    id: "FUNC008",
    name: "Henrique Gomes",
    email: "henrique.g@bijoux.com",
    phone: "(41) 98765-1234",
    role: "Vendedor",
    department: "Vendas",
    status: "Ativo",
    startDate: "10/10/2022",
  },
  {
    id: "FUNC009",
    name: "Isabela Martins",
    email: "isabela.m@bijoux.com",
    phone: "(51) 97654-3210",
    role: "Social Media",
    department: "Marketing",
    status: "Ativo",
    startDate: "05/01/2023",
  },
  {
    id: "FUNC010",
    name: "João Pedro Souza",
    email: "joao.s@bijoux.com",
    phone: "(51) 98765-4321",
    role: "Estoquista",
    department: "Estoque",
    status: "Ativo",
    startDate: "20/03/2023",
  },
]

export function EmployeesTable() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar funcionários..."
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
              <TableHead>Funcionário</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Cargo</TableHead>
              <TableHead>Departamento</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Data de Início</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEmployees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback>
                        {employee.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .substring(0, 2)
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{employee.name}</div>
                      <div className="text-xs text-muted-foreground">{employee.id}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.role}</TableCell>
                <TableCell>{employee.department}</TableCell>
                <TableCell>
                  {employee.status === "Ativo" ? (
                    <Badge variant="outline" className="text-emerald-500 border-emerald-500">
                      Ativo
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-rose-500 border-rose-500">
                      Inativo
                    </Badge>
                  )}
                </TableCell>
                <TableCell>{employee.startDate}</TableCell>
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
                        <Key className="mr-2 h-4 w-4" />
                        <span>Permissões</span>
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
