"use client"

import { useState } from "react"
import type { SupportTicket } from "./support-dashboard"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Send, Paperclip, AlertCircle, CheckCircle, Clock } from "lucide-react"
import Image from "next/image"

type SupportDetailProps = {
  ticket: SupportTicket
  onReply: (ticketId: string, content: string) => void
  onClose: (ticketId: string) => void
  onUpdatePriority: (ticketId: string, priority: SupportTicket["priority"]) => void
}

export function SupportDetail({ ticket, onReply, onClose, onUpdatePriority }: SupportDetailProps) {
  const [replyContent, setReplyContent] = useState("")

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })
    } catch {
      return dateString
    }
  }

  const getStatusBadge = (status: SupportTicket["status"]) => {
    switch (status) {
      case "open":
        return (
          <Badge variant="destructive" className="gap-1">
            <AlertCircle className="h-3 w-3" />
            Não respondido
          </Badge>
        )
      case "answered":
        return (
          <Badge variant="outline" className="text-blue-500 border-blue-500 gap-1">
            <Clock className="h-3 w-3" />
            Respondido
          </Badge>
        )
      case "closed":
        return (
          <Badge variant="outline" className="text-green-500 border-green-500 gap-1">
            <CheckCircle className="h-3 w-3" />
            Resolvido
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

  // Função para enviar resposta
  const handleSendReply = () => {
    if (replyContent.trim()) {
      onReply(ticket.id, replyContent)
      setReplyContent("")
    }
  }

  // Função para obter as iniciais do nome
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase()
  }

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      {/* Cabeçalho */}
      <div className="p-4 border-b">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-xl font-semibold">{ticket.subject}</h2>
          <div className="flex items-center gap-2">
            <Select
              value={ticket.priority}
              onValueChange={(value) => onUpdatePriority(ticket.id, value as SupportTicket["priority"])}
            >
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Prioridade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Baixa</SelectItem>
                <SelectItem value="medium">Média</SelectItem>
                <SelectItem value="high">Alta</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={() => onClose(ticket.id)} disabled={ticket.status === "closed"}>
              Marcar como resolvido
            </Button>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-2">
          {getStatusBadge(ticket.status)}
          <Badge variant="secondary">{getCategoryLabel(ticket.category)}</Badge>
          <Badge variant="outline">ID: {ticket.id}</Badge>
        </div>
        <div className="text-sm text-muted-foreground">
          <span>
            De: {ticket.customer.name} ({ticket.customer.email})
          </span>
          <span className="mx-2">•</span>
          <span>Aberto em: {formatDate(ticket.createdAt)}</span>
        </div>
      </div>

      {/* Mensagens */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {ticket.messages.map((message) => (
          <div key={message.id} className={`flex gap-4 ${message.sender === "staff" ? "flex-row-reverse" : ""}`}>
            <Avatar className="h-10 w-10">
              <AvatarFallback className={message.sender === "staff" ? "bg-primary text-primary-foreground" : ""}>
                {message.sender === "staff" ? "AD" : getInitials(ticket.customer.name)}
              </AvatarFallback>
            </Avatar>
            <div
              className={`flex-1 max-w-[80%] rounded-lg p-4 ${message.sender === "staff" ? "bg-primary text-primary-foreground ml-auto" : "bg-muted"
                }`}
            >
              <div className="mb-1 text-sm font-medium">
                {message.sender === "staff" ? "Atendente" : ticket.customer.name}
              </div>
              <div className="whitespace-pre-wrap">{message.content}</div>
              {message.attachments && message.attachments.length > 0 && (
                <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                  <div className="text-sm font-medium mb-2">Anexos:</div>
                  <div className="flex flex-wrap gap-2">
                    {message.attachments.map((attachment, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 rounded-md bg-background border">
                        <Image
                          width={10}
                          height={10}
                          src={attachment.url || "/placeholder.svg"}
                          alt={attachment.name}
                          className="h-10 w-10 object-cover rounded"
                        />
                        <div className="text-sm">{attachment.name}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className="mt-1 text-xs opacity-70">{formatDate(message.timestamp)}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Formulário de resposta */}
      {ticket.status !== "closed" && (
        <div className="p-4 border-t">
          <div className="flex gap-4">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-primary text-primary-foreground">AD</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Textarea
                placeholder="Digite sua resposta..."
                className="mb-2 min-h-[100px]"
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
              />
              <div className="flex justify-between">
                <Button variant="outline" size="sm">
                  <Paperclip className="h-4 w-4 mr-2" />
                  Anexar arquivo
                </Button>
                <Button onClick={handleSendReply} disabled={!replyContent.trim()}>
                  <Send className="h-4 w-4 mr-2" />
                  Enviar resposta
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
