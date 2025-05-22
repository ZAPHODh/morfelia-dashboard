"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  Package,
  ShoppingCart,
  Users,
  UserRound,
  Wallet,
  Settings,
  Menu,
  X,
  GemIcon,
  HelpCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState, useEffect } from "react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown } from "lucide-react"

const sidebarItems = [
  {
    title: "Visão Geral",
    href: "/dashboard",
    icon: BarChart3,
  },
  {
    title: "Produtos",
    href: "/dashboard/produtos",
    icon: Package,
    subItems: [
      {
        title: "Todos os Produtos",
        href: "/dashboard/produtos",
      },
      {
        title: "Coleções",
        href: "/dashboard/colecoes",
      },
    ],
  },
  {
    title: "Vendas",
    href: "/dashboard/vendas",
    icon: ShoppingCart,
  },
  {
    title: "Clientes",
    href: "/dashboard/clientes",
    icon: Users,
  },
  {
    title: "Funcionários",
    href: "/dashboard/funcionarios",
    icon: UserRound,
  },
  {
    title: "Finanças",
    href: "/dashboard/financas",
    icon: Wallet,
  },
  {
    title: "Suporte",
    href: "/dashboard/suporte",
    icon: HelpCircle,
  },
  {
    title: "Configurações",
    href: "/dashboard/configuracoes",
    icon: Settings,
  },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [openCollapsibles, setOpenCollapsibles] = useState<Record<string, boolean>>({})

  // Inicializar e atualizar o estado dos dropdowns com base no pathname
  useEffect(() => {
    const newOpenCollapsibles: Record<string, boolean> = {}

    sidebarItems.forEach((item) => {
      if (item.subItems) {
        const isActive = item.subItems.some(
          (subItem) => pathname === subItem.href || pathname.startsWith(`${subItem.href}/`),
        )

        if (isActive) {
          newOpenCollapsibles[item.title.toLowerCase()] = true
        }
      }
    })

    setOpenCollapsibles((prev) => ({
      ...prev,
      ...newOpenCollapsibles,
    }))
  }, [pathname])

  const toggleCollapsible = (key: string) => {
    setOpenCollapsibles((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  // Verificar se um item ou seus subitens estão ativos
  const isItemActive = (item: (typeof sidebarItems)[0]) => {
    if (pathname === item.href) {
      return true
    }

    if (item.subItems) {
      return item.subItems.some((subItem) => pathname === subItem.href || pathname.startsWith(`${subItem.href}/`))
    }

    return false
  }

  // Verificar se um subitem específico está ativo
  const isSubItemActive = (href: string) => {
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild className="absolute left-4 top-4 z-50 lg:hidden">
          <Button variant="outline" size="icon" className="rounded-full">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Abrir menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72 p-0">
          <nav className="flex h-full flex-col bg-muted/40">
            <div className="flex h-14 items-center border-b px-6 py-4">
              <Link href="/dashboard" className="flex items-center gap-2 font-semibold" onClick={() => setOpen(false)}>
                <span>Metamorfosis</span>
              </Link>
              <Button variant="ghost" size="icon" className="ml-auto" onClick={() => setOpen(false)}>
                <X className="h-5 w-5" />
                <span className="sr-only">Fechar menu</span>
              </Button>
            </div>
            <div className="flex-1 overflow-auto py-2">
              <div className="flex flex-col gap-1 px-2">
                {sidebarItems.map((item) =>
                  item.subItems ? (
                    <Collapsible
                      key={item.href}
                      open={openCollapsibles[item.title.toLowerCase()]}
                      onOpenChange={() => toggleCollapsible(item.title.toLowerCase())}
                      className="w-full"
                    >
                      <CollapsibleTrigger asChild>
                        <button
                          className={cn(
                            "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-all hover:text-primary",
                            isItemActive(item) ? "bg-muted font-medium text-primary" : "text-muted-foreground",
                          )}
                        >
                          <div className="flex items-center gap-3">
                            <item.icon className="h-4 w-4" />
                            {item.title}
                          </div>
                          <ChevronDown
                            className={cn(
                              "h-4 w-4 transition-transform",
                              openCollapsibles[item.title.toLowerCase()] && "rotate-180",
                            )}
                          />
                        </button>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="pl-9 pr-2">
                        <div className="flex flex-col gap-1 py-1">
                          {item.subItems.map((subItem) => (
                            <Link
                              key={subItem.href}
                              href={subItem.href}
                              onClick={() => setOpen(false)}
                              className={cn(
                                "rounded-lg px-3 py-2 text-sm transition-all hover:text-primary",
                                isSubItemActive(subItem.href)
                                  ? "bg-muted font-medium text-primary"
                                  : "text-muted-foreground",
                              )}
                            >
                              {subItem.title}
                            </Link>
                          ))}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:text-primary",
                        pathname === item.href ? "bg-muted font-medium text-primary" : "text-muted-foreground",
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.title}
                    </Link>
                  ),
                )}
              </div>
            </div>
          </nav>
        </SheetContent>
      </Sheet>
      <nav className="hidden w-64 flex-col border-r bg-muted/40 lg:flex">
        <div className="flex h-14 items-center border-b px-6 py-4">
          <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
            <GemIcon className="h-6 w-6 text-amber-500" />
            <span>Bijoux Admin</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <div className="flex flex-col gap-1 px-2">
            {sidebarItems.map((item) =>
              item.subItems ? (
                <Collapsible
                  key={item.href}
                  open={openCollapsibles[item.title.toLowerCase()]}
                  onOpenChange={() => toggleCollapsible(item.title.toLowerCase())}
                  className="w-full"
                >
                  <CollapsibleTrigger asChild>
                    <button
                      className={cn(
                        "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-all hover:text-primary",
                        isItemActive(item) ? "bg-muted font-medium text-primary" : "text-muted-foreground",
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="h-4 w-4" />
                        {item.title}
                      </div>
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition-transform",
                          openCollapsibles[item.title.toLowerCase()] && "rotate-180",
                        )}
                      />
                    </button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pl-9 pr-2">
                    <div className="flex flex-col gap-1 py-1">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className={cn(
                            "rounded-lg px-3 py-2 text-sm transition-all hover:text-primary",
                            isSubItemActive(subItem.href)
                              ? "bg-muted font-medium text-primary"
                              : "text-muted-foreground",
                          )}
                        >
                          {subItem.title}
                        </Link>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:text-primary",
                    pathname === item.href ? "bg-muted font-medium text-primary" : "text-muted-foreground",
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.title}
                </Link>
              ),
            )}
          </div>
        </div>
      </nav>
    </>
  )
}
