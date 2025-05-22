import { HelpCircle } from "lucide-react"

export function SupportEmpty() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
        <HelpCircle className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-xl font-medium mb-2">Nenhuma mensagem selecionada</h3>
      <p className="text-muted-foreground max-w-md">
        Selecione uma mensagem da lista à esquerda para visualizar os detalhes e responder ao cliente.
      </p>
    </div>
  )
}
