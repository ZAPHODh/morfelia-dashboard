"use client"

import type React from "react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Inbox, MessageSquare, CheckCircle, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

type SupportSidebarProps = {
  filter: {
    status: string
    category: string
    search: string
  }
  setFilter: React.Dispatch<
    React.SetStateAction<{
      status: string
      category: string
      search: string
    }>
  >
  counts: {
    all: number
    open: number
    answered: number
    closed: number
    unread: number
  }
}

export function SupportSidebar({ filter, setFilter, counts }: SupportSidebarProps) {
  const statusFilters = [
    { id: "all", label: "Todas as mensagens", icon: Inbox, count: counts.all },
    { id: "open", label: "Não respondidas", icon: AlertCircle, count: counts.open },
    { id: "answered", label: "Respondidas", icon: MessageSquare, count: counts.answered },
    { id: "closed", label: "Resolvidas", icon: CheckCircle, count: counts.closed },
  ]

  const categoryFilters = [
    { id: "all", label: "Todas as categorias" },
    { id: "order", label: "Pedidos" },
    { id: "product", label: "Produtos" },
    { id: "payment", label: "Pagamentos" },
    { id: "shipping", label: "Envios" },
    { id: "return", label: "Trocas e Devoluções" },
    { id: "other", label: "Outros" },
  ]

  return (
    <div className="w-64 border-r p-4 flex flex-col h-full">
      <div className="relative mb-4">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Buscar mensagens..."
          className="pl-8"
          value={filter.search}
          onChange={(e) => setFilter((prev) => ({ ...prev, search: e.target.value }))}
        />
      </div>

      <div className="space-y-1">
        <h3 className="text-sm font-medium mb-2">Status</h3>
        {statusFilters.map((item) => (
          <Button
            key={item.id}
            variant="ghost"
            className={cn(
              "w-full justify-start px-2",
              filter.status === item.id ? "bg-muted font-medium" : "font-normal",
            )}
            onClick={() => setFilter((prev) => ({ ...prev, status: item.id }))}
          >
            <item.icon className="mr-2 h-4 w-4" />
            <span className="flex-1 text-left">{item.label}</span>
            <Badge variant="secondary" className="ml-auto">
              {item.count}
            </Badge>
          </Button>
        ))}
      </div>

      <div className="space-y-1 mt-6">
        <h3 className="text-sm font-medium mb-2">Categorias</h3>
        {categoryFilters.map((item) => (
          <Button
            key={item.id}
            variant="ghost"
            className={cn(
              "w-full justify-start px-2",
              filter.category === item.id ? "bg-muted font-medium" : "font-normal",
            )}
            onClick={() => setFilter((prev) => ({ ...prev, category: item.id }))}
          >
            <span className="flex-1 text-left">{item.label}</span>
          </Button>
        ))}
      </div>

      <div className="mt-auto pt-4 border-t">
        <div className="text-sm text-muted-foreground">
          <div className="flex justify-between mb-1">
            <span>Não lidas:</span>
            <Badge variant="secondary">{counts.unread}</Badge>
          </div>
          <div className="flex justify-between">
            <span>Total:</span>
            <Badge variant="secondary">{counts.all}</Badge>
          </div>
        </div>
      </div>
    </div>
  )
}
