"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"

const storeFormSchema = z.object({
  storeName: z.string().min(2, {
    message: "O nome da loja deve ter pelo menos 2 caracteres.",
  }),
  storeDescription: z.string().optional(),
  address: z.string().min(5, {
    message: "O endereço deve ter pelo menos 5 caracteres.",
  }),
  phone: z.string().min(10, {
    message: "O telefone deve ter pelo menos 10 caracteres.",
  }),
  email: z.string().email({
    message: "Por favor, insira um email válido.",
  }),
})

const notificationsFormSchema = z.object({
  salesNotifications: z.boolean(),
  stockNotifications: z.boolean(),
  customerNotifications: z.boolean(),
  marketingNotifications: z.boolean(),
})

type StoreFormValues = z.infer<typeof storeFormSchema>
type NotificationsFormValues = z.infer<typeof notificationsFormSchema>

export function SettingsForm() {
  const storeForm = useForm<StoreFormValues>({
    resolver: zodResolver(storeFormSchema),
    defaultValues: {
      storeName: "Bijoux Elegance",
      storeDescription: "Loja especializada em bijuterias finas e semi-joias de alta qualidade.",
      address: "Rua das Joias, 123 - Centro - São Paulo/SP",
      phone: "(11) 3456-7890",
      email: "contato@bijouxelegance.com.br",
    },
  })

  const notificationsForm = useForm<NotificationsFormValues>({
    resolver: zodResolver(notificationsFormSchema),
    defaultValues: {
      salesNotifications: true,
      stockNotifications: true,
      customerNotifications: true,
      marketingNotifications: false,
    },
  })

  function onStoreSubmit(data: StoreFormValues) {
    console.log(data)
  }

  function onNotificationsSubmit(data: NotificationsFormValues): void {
    console.log(data)
  }

  return (
    <Tabs defaultValue="store" className="space-y-4">
      <TabsList>
        <TabsTrigger value="store">Loja</TabsTrigger>
        <TabsTrigger value="notifications">Notificações</TabsTrigger>
        <TabsTrigger value="security">Segurança</TabsTrigger>
        <TabsTrigger value="integrations">Integrações</TabsTrigger>
      </TabsList>
      <TabsContent value="store">
        <Card>
          <CardHeader>
            <CardTitle>Informações da Loja</CardTitle>
            <CardDescription>Gerencie as informações básicas da sua loja.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Form {...storeForm}>
              <form onSubmit={storeForm.handleSubmit(onStoreSubmit)} className="space-y-6">
                <FormField
                  control={storeForm.control}
                  name="storeName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome da Loja</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome da sua loja" {...field} />
                      </FormControl>
                      <FormDescription>Este é o nome que será exibido para seus clientes.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={storeForm.control}
                  name="storeDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descrição da Loja</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Descreva sua loja em poucas palavras"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Uma breve descrição da sua loja e produtos.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid gap-6 md:grid-cols-2">
                  <FormField
                    control={storeForm.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Endereço</FormLabel>
                        <FormControl>
                          <Input placeholder="Endereço da loja" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={storeForm.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Telefone</FormLabel>
                        <FormControl>
                          <Input placeholder="Telefone da loja" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={storeForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Email de contato" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Salvar alterações</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="notifications">
        <Card>
          <CardHeader>
            <CardTitle>Notificações</CardTitle>
            <CardDescription>Configure quais notificações você deseja receber.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Form {...notificationsForm}>
              <form onSubmit={notificationsForm.handleSubmit(onNotificationsSubmit)} className="space-y-6">
                <FormField
                  control={notificationsForm.control}
                  name="salesNotifications"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Notificações de Vendas</FormLabel>
                        <FormDescription>Receba notificações quando uma nova venda for realizada.</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={notificationsForm.control}
                  name="stockNotifications"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Notificações de Estoque</FormLabel>
                        <FormDescription>Receba alertas quando produtos estiverem com estoque baixo.</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={notificationsForm.control}
                  name="customerNotifications"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Notificações de Clientes</FormLabel>
                        <FormDescription>Receba notificações sobre novos cadastros de clientes.</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={notificationsForm.control}
                  name="marketingNotifications"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Notificações de Marketing</FormLabel>
                        <FormDescription>Receba dicas e atualizações sobre marketing e promoções.</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button type="submit">Salvar preferências</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="security">
        <Card>
          <CardHeader>
            <CardTitle>Segurança</CardTitle>
            <CardDescription>Gerencie as configurações de segurança da sua conta.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Alterar Senha</h3>
              <p className="text-sm text-muted-foreground">Atualize sua senha para manter sua conta segura.</p>
            </div>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <FormLabel>Senha Atual</FormLabel>
                <Input type="password" />
              </div>
              <div className="grid gap-2">
                <FormLabel>Nova Senha</FormLabel>
                <Input type="password" />
              </div>
              <div className="grid gap-2">
                <FormLabel>Confirmar Nova Senha</FormLabel>
                <Input type="password" />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button>Atualizar Senha</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="integrations">
        <Card>
          <CardHeader>
            <CardTitle>Integrações</CardTitle>
            <CardDescription>Gerencie as integrações com outros serviços.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <h3 className="text-base font-medium">Gateway de Pagamento</h3>
                <p className="text-sm text-muted-foreground">Integração com serviços de pagamento online.</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <h3 className="text-base font-medium">Transportadoras</h3>
                <p className="text-sm text-muted-foreground">Integração com serviços de entrega e rastreamento.</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <h3 className="text-base font-medium">Contabilidade</h3>
                <p className="text-sm text-muted-foreground">Integração com software de contabilidade.</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <h3 className="text-base font-medium">Redes Sociais</h3>
                <p className="text-sm text-muted-foreground">Integração com plataformas de mídia social.</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Salvar Configurações</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
