"use client"

import type { SupportTicket } from "./support-dashboard"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"

type SupportListProps = {
  tickets: SupportTicket[]
  selectedId: string | null
  onSelectTicket: (id: string) => void
}

export function SupportList({ tickets, selectedId, onSelectTicket }: SupportListProps) {
  // Função para formatar a data
  const formatDate = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true, locale: ptBR })
    } catch {
      return dateString
    }
  }

  // Função para obter o status do ticket
  const getStatusBadge = (status: SupportTicket["status"]) => {
    switch (status) {
      case "open":
        return <Badge variant="destructive">Não respondido</Badge>
      case "answered":
        return (
          <Badge variant="outline" className="text-blue-500 border-blue-500">
            Respondido
          </Badge>
        )
      case "closed":
        return (
          <Badge variant="outline" className="text-green-500 border-green-500">
            Resolvido
          </Badge>
        )
    }
  }

  // Função para obter a prioridade do ticket
  const getPriorityBadge = (priority: SupportTicket["priority"]) => {
    switch (priority) {
      case "high":
        return (
          <Badge variant="outline" className="text-red-500 border-red-500">
            Alta
          </Badge>
        )
      case "medium":
        return (
          <Badge variant="outline" className="text-amber-500 border-amber-500">
            Média
          </Badge>
        )
      case "low":
        return (
          <Badge variant="outline" className="text-green-500 border-green-500">
            Baixa
          </Badge>
        )
    }
  }

  // Função para obter a categoria do ticket
  const getCategoryLabel = (category: SupportTicket["category"]) => {
    switch (category) {
      case "order":
        return "Pedido"
      case "product":
        return "Produto"
      case "payment":
        return "Pagamento"
      case "shipping":
        return "Envio"
      case "return":
        return "Troca/Devolução"
      case "other":
        return "Outro"
    }
  }

  return (
    <div className="w-80 border-r overflow-y-auto">
      <div className="py-2 px-4 border-b">
        <h3 className="font-medium">Mensagens ({tickets.length})</h3>
      </div>
      {tickets.length === 0 ? (
        <div className="p-8 text-center text-muted-foreground">Nenhuma mensagem encontrada com os filtros atuais.</div>
      ) : (
        <div>
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className={cn(
                "p-4 border-b cursor-pointer hover:bg-muted/50 transition-colors",
                selectedId === ticket.id && "bg-muted",
                ticket.unread && "border-l-4 border-l-primary",
              )}
              onClick={() => onSelectTicket(ticket.id)}
            >
              <div className="flex items-start justify-between mb-1">
                <h4 className={cn("font-medium text-sm line-clamp-1", ticket.unread && "font-semibold")}>
                  {ticket.subject}
                </h4>
                <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                  {formatDate(ticket.createdAt)}
                </span>
              </div>
              <div className="text-xs text-muted-foreground mb-2">{ticket.customer.name}</div>
              <div className="flex flex-wrap gap-2 text-xs">
                {getStatusBadge(ticket.status)}
                {getPriorityBadge(ticket.priority)}
                <Badge variant="secondary">{getCategoryLabel(ticket.category)}</Badge>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
