import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function RecentSales() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Vendas Recentes</CardTitle>
        <CardDescription>Você fez 265 vendas este mês</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          <div className="flex items-center">
            <Avatar className="h-9 w-9">
              <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
              <AvatarFallback>MR</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">Maria Rodrigues</p>
              <p className="text-sm text-muted-foreground">maria.r@example.com</p>
            </div>
            <div className="ml-auto font-medium">+R$1.999,00</div>
          </div>
          <div className="flex items-center">
            <Avatar className="h-9 w-9">
              <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
              <AvatarFallback>JO</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">João Oliveira</p>
              <p className="text-sm text-muted-foreground">joao.o@example.com</p>
            </div>
            <div className="ml-auto font-medium">+R$399,00</div>
          </div>
          <div className="flex items-center">
            <Avatar className="h-9 w-9">
              <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
              <AvatarFallback>AS</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">Ana Silva</p>
              <p className="text-sm text-muted-foreground">ana.s@example.com</p>
            </div>
            <div className="ml-auto font-medium">+R$2.499,00</div>
          </div>
          <div className="flex items-center">
            <Avatar className="h-9 w-9">
              <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
              <AvatarFallback>CS</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">Carlos Santos</p>
              <p className="text-sm text-muted-foreground">carlos.s@example.com</p>
            </div>
            <div className="ml-auto font-medium">+R$699,00</div>
          </div>
          <div className="flex items-center">
            <Avatar className="h-9 w-9">
              <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
              <AvatarFallback>LM</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">Luiza Mendes</p>
              <p className="text-sm text-muted-foreground">luiza.m@example.com</p>
            </div>
            <div className="ml-auto font-medium">+R$899,00</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
