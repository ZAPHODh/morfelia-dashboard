"use client"

import { useState } from "react"
import { SupportSidebar } from "@/components/dashboard/support/support-sidebar"
import { SupportList } from "@/components/dashboard/support/support-list"
import { SupportDetail } from "@/components/dashboard/support/support-detail"
import { SupportEmpty } from "@/components/dashboard/support/support-empty"


export type SupportTicket = {
  id: string
  subject: string
  customer: {
    id: string
    name: string
    email: string
    avatar?: string
  }
  status: "open" | "answered" | "closed"
  priority: "low" | "medium" | "high"
  category: "order" | "product" | "payment" | "shipping" | "return" | "other"
  createdAt: string
  messages: SupportMessage[]
  unread?: boolean
}

export type SupportMessage = {
  id: string
  content: string
  sender: "customer" | "staff"
  timestamp: string
  attachments?: {
    name: string
    url: string
    type: string
  }[]
}


const mockTickets: SupportTicket[] = [
  {
    id: "TK001",
    subject: "Problema com meu pedido #12345",
    customer: {
      id: "CLI001",
      name: "Maria Rodrigues",
      email: "maria.r@example.com",
    },
    status: "open",
    priority: "high",
    category: "order",
    createdAt: "2023-05-15T14:30:00Z",
    unread: true,
    messages: [
      {
        id: "MSG001",
        content:
          "Olá, fiz um pedido há 5 dias e ainda não recebi nenhuma atualização sobre o envio. O número do pedido é #12345. Podem me informar o status?",
        sender: "customer",
        timestamp: "2023-05-15T14:30:00Z",
      },
    ],
  },
  {
    id: "TK002",
    subject: "Dúvida sobre material do Colar Pérolas",
    customer: {
      id: "CLI002",
      name: "João Oliveira",
      email: "joao.o@example.com",
    },
    status: "answered",
    priority: "medium",
    category: "product",
    createdAt: "2023-05-14T10:15:00Z",
    messages: [
      {
        id: "MSG002",
        content:
          "Bom dia, gostaria de saber qual é o material do Colar de Pérolas Dourado. É banhado a ouro ou folheado? Qual a durabilidade?",
        sender: "customer",
        timestamp: "2023-05-14T10:15:00Z",
      },
      {
        id: "MSG003",
        content:
          "Olá João, obrigado por entrar em contato. O Colar de Pérolas Dourado é folheado a ouro 18k com garantia de 1 ano para a cor. As pérolas são sintéticas de alta qualidade. Para maior durabilidade, recomendamos evitar contato com perfumes e produtos químicos. Posso ajudar com mais alguma informação?",
        sender: "staff",
        timestamp: "2023-05-14T11:30:00Z",
      },
    ],
  },
  {
    id: "TK003",
    subject: "Solicitação de troca - Brinco danificado",
    customer: {
      id: "CLI003",
      name: "Ana Silva",
      email: "ana.s@example.com",
    },
    status: "open",
    priority: "high",
    category: "return",
    createdAt: "2023-05-13T16:45:00Z",
    unread: true,
    messages: [
      {
        id: "MSG004",
        content:
          "Boa tarde, recebi meu pedido hoje mas um dos brincos veio com o fecho quebrado. Gostaria de solicitar uma troca. Já tenho as fotos do produto danificado, como devo proceder?",
        sender: "customer",
        timestamp: "2023-05-13T16:45:00Z",
        attachments: [
          {
            name: "foto_brinco.jpg",
            url: "/placeholder.svg?height=100&width=100",
            type: "image/jpeg",
          },
        ],
      },
    ],
  },
  {
    id: "TK004",
    subject: "Pagamento não processado",
    customer: {
      id: "CLI004",
      name: "Carlos Santos",
      email: "carlos.s@example.com",
    },
    status: "closed",
    priority: "medium",
    category: "payment",
    createdAt: "2023-05-12T09:20:00Z",
    messages: [
      {
        id: "MSG005",
        content:
          "Tentei finalizar uma compra ontem à noite, mas o pagamento não foi processado. O valor foi debitado do meu cartão, mas não recebi a confirmação do pedido. O que devo fazer?",
        sender: "customer",
        timestamp: "2023-05-12T09:20:00Z",
      },
      {
        id: "MSG006",
        content:
          "Olá Carlos, verificamos em nosso sistema e identificamos que houve um problema na comunicação com a operadora do cartão. Já estornamos o valor para seu cartão (pode levar até 7 dias úteis para aparecer) e criamos um cupom de 10% de desconto para sua próxima compra como cortesia pelo transtorno. O código é DESCULPE10.",
        sender: "staff",
        timestamp: "2023-05-12T10:45:00Z",
      },
      {
        id: "MSG007",
        content:
          "Muito obrigado pela atenção e pela solução rápida! Vou aguardar o estorno e utilizar o cupom em breve.",
        sender: "customer",
        timestamp: "2023-05-12T11:30:00Z",
      },
    ],
  },
  {
    id: "TK005",
    subject: "Prazo de entrega para região Norte",
    customer: {
      id: "CLI005",
      name: "Luiza Mendes",
      email: "luiza.m@example.com",
    },
    status: "open",
    priority: "low",
    category: "shipping",
    createdAt: "2023-05-11T13:10:00Z",
    messages: [
      {
        id: "MSG008",
        content: "Qual o prazo de entrega para Manaus-AM? Preciso das joias para um evento no dia 25/05.",
        sender: "customer",
        timestamp: "2023-05-11T13:10:00Z",
      },
    ],
  },
  {
    id: "TK006",
    subject: "Dúvida sobre garantia",
    customer: {
      id: "CLI006",
      name: "Pedro Almeida",
      email: "pedro.a@example.com",
    },
    status: "answered",
    priority: "low",
    category: "product",
    createdAt: "2023-05-10T15:30:00Z",
    messages: [
      {
        id: "MSG009",
        content: "Gostaria de saber detalhes sobre a garantia dos produtos. Vocês cobrem oxidação das peças prateadas?",
        sender: "customer",
        timestamp: "2023-05-10T15:30:00Z",
      },
      {
        id: "MSG010",
        content:
          "Olá Pedro, nossas peças prateadas têm garantia de 6 meses contra defeitos de fabricação. A oxidação natural da prata não é coberta pela garantia, mas oferecemos serviço de polimento com 50% de desconto para clientes. Para evitar oxidação, recomendamos guardar as peças em local seco e evitar contato com produtos químicos.",
        sender: "staff",
        timestamp: "2023-05-10T16:45:00Z",
      },
    ],
  },
  {
    id: "TK007",
    subject: "Informação sobre pedido personalizado",
    customer: {
      id: "CLI007",
      name: "Fernanda Lima",
      email: "fernanda.l@example.com",
    },
    status: "open",
    priority: "medium",
    category: "product",
    createdAt: "2023-05-09T11:20:00Z",
    messages: [
      {
        id: "MSG011",
        content:
          "É possível fazer um pedido personalizado de um conjunto de colar e brincos para uma noiva? Gostaria de algo com pérolas e cristais.",
        sender: "customer",
        timestamp: "2023-05-09T11:20:00Z",
      },
    ],
  },
]

export function SupportDashboard() {
  const [tickets, setTickets] = useState<SupportTicket[]>(mockTickets)
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null)
  const [filter, setFilter] = useState<{
    status: string
    category: string
    search: string
  }>({
    status: "all",
    category: "all",
    search: "",
  })

  const filteredTickets = tickets.filter((ticket) => {
    const matchesStatus = filter.status === "all" || ticket.status === filter.status
    const matchesCategory = filter.category === "all" || ticket.category === filter.category
    const matchesSearch =
      filter.search === "" ||
      ticket.subject.toLowerCase().includes(filter.search.toLowerCase()) ||
      ticket.customer.name.toLowerCase().includes(filter.search.toLowerCase()) ||
      ticket.customer.email.toLowerCase().includes(filter.search.toLowerCase())

    return matchesStatus && matchesCategory && matchesSearch
  })

  const selectedTicket = tickets.find((ticket) => ticket.id === selectedTicketId)

  const addReply = (ticketId: string, content: string) => {
    setTickets((prevTickets) =>
      prevTickets.map((ticket) => {
        if (ticket.id === ticketId) {
          const newMessage: SupportMessage = {
            id: `MSG${Date.now()}`,
            content,
            sender: "staff",
            timestamp: new Date().toISOString(),
          }

          return {
            ...ticket,
            status: "answered",
            messages: [...ticket.messages, newMessage],
          }
        }
        return ticket
      }),
    )
  }

  const closeTicket = (ticketId: string) => {
    setTickets((prevTickets) =>
      prevTickets.map((ticket) => {
        if (ticket.id === ticketId) {
          return {
            ...ticket,
            status: "closed",
          }
        }
        return ticket
      }),
    )
  }

  const markAsRead = (ticketId: string) => {
    setTickets((prevTickets) =>
      prevTickets.map((ticket) => {
        if (ticket.id === ticketId) {
          return {
            ...ticket,
            unread: false,
          }
        }
        return ticket
      }),
    )
  }

  const updatePriority = (ticketId: string, priority: SupportTicket["priority"]) => {
    setTickets((prevTickets) =>
      prevTickets.map((ticket) => {
        if (ticket.id === ticketId) {
          return {
            ...ticket,
            priority,
          }
        }
        return ticket
      }),
    )
  }

  const handleSelectTicket = (ticketId: string) => {
    setSelectedTicketId(ticketId)
    markAsRead(ticketId)
  }

  return (
    <div className="flex h-[calc(100vh-12rem)] overflow-hidden rounded-lg border bg-background">
      <SupportSidebar
        filter={filter}
        setFilter={setFilter}
        counts={{
          all: tickets.length,
          open: tickets.filter((t) => t.status === "open").length,
          answered: tickets.filter((t) => t.status === "answered").length,
          closed: tickets.filter((t) => t.status === "closed").length,
          unread: tickets.filter((t) => t.unread).length,
        }}
      />
      <SupportList tickets={filteredTickets} selectedId={selectedTicketId} onSelectTicket={handleSelectTicket} />
      {selectedTicket ? (
        <SupportDetail
          ticket={selectedTicket}
          onReply={addReply}
          onClose={closeTicket}
          onUpdatePriority={updatePriority}
        />
      ) : (
        <SupportEmpty />
      )}
    </div>
  )
}
