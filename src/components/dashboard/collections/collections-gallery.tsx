"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Eye, Edit, Trash2, Star, StarOff } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// Tipos
type Collection = {
  id: string
  name: string
  description: string
  startDate?: string
  endDate?: string
  featured?: boolean
  image?: string
  productCount: number
  status: "active" | "scheduled" | "expired"
}

// Dados de exemplo
const mockCollections: Collection[] = [
  {
    id: "c1",
    name: "Coleção Verão 2024",
    description: "Peças leves e coloridas para o verão",
    startDate: "2024-01-01",
    endDate: "2024-03-31",
    featured: true,
    image: "/placeholder.svg?height=200&width=400",
    productCount: 12,
    status: "active",
  },
  {
    id: "c2",
    name: "Dia dos Namorados",
    description: "Presentes especiais para surpreender",
    startDate: "2024-06-01",
    endDate: "2024-06-12",
    featured: true,
    image: "/placeholder.svg?height=200&width=400",
    productCount: 8,
    status: "scheduled",
  },
  {
    id: "c3",
    name: "Black Friday",
    description: "Descontos imperdíveis em toda a loja",
    startDate: "2023-11-20",
    endDate: "2023-11-30",
    featured: false,
    image: "/placeholder.svg?height=200&width=400",
    productCount: 25,
    status: "expired",
  },
  {
    id: "c4",
    name: "Coleção Inverno",
    description: "Peças elegantes para os dias frios",
    startDate: "2024-06-21",
    endDate: "2024-09-21",
    featured: false,
    image: "/placeholder.svg?height=200&width=400",
    productCount: 15,
    status: "scheduled",
  },
  {
    id: "c5",
    name: "Festa de Formatura",
    description: "Joias para brilhar na sua formatura",
    startDate: "2024-01-15",
    endDate: "2024-12-15",
    featured: true,
    image: "/placeholder.svg?height=200&width=400",
    productCount: 10,
    status: "active",
  },
  {
    id: "c6",
    name: "Coleção Primavera",
    description: "Cores vibrantes para a estação das flores",
    startDate: "2024-09-22",
    endDate: "2024-12-20",
    featured: false,
    image: "/placeholder.svg?height=200&width=400",
    productCount: 18,
    status: "scheduled",
  },
]

export function CollectionsGallery() {
  const [collections, setCollections] = useState<Collection[]>(mockCollections)
  const [filter, setFilter] = useState<{
    status: string
    featured: string
    search: string
  }>({
    status: "all",
    featured: "all",
    search: "",
  })
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedCollection, setSelectedCollection] = useState<Collection | null>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  // Filtrar coleções
  const filteredCollections = collections.filter((collection) => {
    const matchesStatus = filter.status === "all" || collection.status === filter.status
    const matchesFeatured =
      filter.featured === "all" || (filter.featured === "featured" ? collection.featured : !collection.featured)
    const matchesSearch =
      filter.search === "" ||
      collection.name.toLowerCase().includes(filter.search.toLowerCase()) ||
      collection.description.toLowerCase().includes(filter.search.toLowerCase())

    return matchesStatus && matchesFeatured && matchesSearch
  })

  // Formatar data
  const formatDate = (dateString?: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString("pt-BR")
  }

  // Obter badge de status
  const getStatusBadge = (status: Collection["status"]) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Ativa</Badge>
      case "scheduled":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            Agendada
          </Badge>
        )
      case "expired":
        return <Badge variant="secondary">Encerrada</Badge>
    }
  }

  // Alternar destaque
  const toggleFeatured = (id: string) => {
    setCollections((prev) =>
      prev.map((collection) => (collection.id === id ? { ...collection, featured: !collection.featured } : collection)),
    )
  }

  // Excluir coleção
  const deleteCollection = (id: string) => {
    setCollections((prev) => prev.filter((collection) => collection.id !== id))
  }

  // Abrir preview
  const openPreview = (collection: Collection) => {
    setSelectedCollection(collection)
    setIsPreviewOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Label htmlFor="search-collections" className="sr-only">
            Buscar
          </Label>
          <div className="relative w-full sm:w-64">
            <Input
              id="search-collections"
              placeholder="Buscar coleções..."
              value={filter.search}
              onChange={(e) => setFilter((prev) => ({ ...prev, search: e.target.value }))}
              className="w-full"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Select value={filter.status} onValueChange={(value) => setFilter((prev) => ({ ...prev, status: value }))}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os status</SelectItem>
              <SelectItem value="active">Ativas</SelectItem>
              <SelectItem value="scheduled">Agendadas</SelectItem>
              <SelectItem value="expired">Encerradas</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filter.featured}
            onValueChange={(value) => setFilter((prev) => ({ ...prev, featured: value }))}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Destaque" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="featured">Em destaque</SelectItem>
              <SelectItem value="not-featured">Sem destaque</SelectItem>
            </SelectContent>
          </Select>

          <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as "grid" | "list")} className="w-[180px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="grid">Grade</TabsTrigger>
              <TabsTrigger value="list">Lista</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {filteredCollections.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
          <h3 className="mt-2 text-lg font-semibold">Nenhuma coleção encontrada</h3>
          <p className="mb-4 mt-1 text-sm text-muted-foreground">Tente ajustar os filtros ou criar uma nova coleção.</p>
          <Button>Criar Nova Coleção</Button>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCollections.map((collection) => (
            <Card key={collection.id} className="overflow-hidden">
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={collection.image || "/placeholder.svg?height=200&width=400"}
                  alt={collection.name}
                  className="h-full w-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <CardHeader className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{collection.name}</CardTitle>
                    <CardDescription className="line-clamp-2 mt-1">{collection.description}</CardDescription>
                  </div>
                  {getStatusBadge(collection.status)}
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="flex flex-col gap-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Período:</span>
                    <span>
                      {formatDate(collection.startDate)} - {formatDate(collection.endDate)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Produtos:</span>
                    <span>{collection.productCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Destaque:</span>
                    <span>{collection.featured ? "Sim" : "Não"}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between p-4 pt-0">
                <Button variant="outline" size="sm" onClick={() => openPreview(collection)}>
                  <Eye className="mr-2 h-4 w-4" />
                  Visualizar
                </Button>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleFeatured(collection.id)}
                    title={collection.featured ? "Remover destaque" : "Destacar"}
                  >
                    {collection.featured ? (
                      <StarOff className="h-4 w-4 text-amber-500" />
                    ) : (
                      <Star className="h-4 w-4" />
                    )}
                  </Button>
                  <Button variant="ghost" size="icon" title="Editar">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => deleteCollection(collection.id)} title="Excluir">
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="rounded-md border">
          <div className="grid grid-cols-12 gap-4 p-4 font-medium">
            <div className="col-span-4">Nome</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2">Período</div>
            <div className="col-span-1">Produtos</div>
            <div className="col-span-1">Destaque</div>
            <div className="col-span-2 text-right">Ações</div>
          </div>
          {filteredCollections.map((collection) => (
            <div key={collection.id} className="grid grid-cols-12 gap-4 border-t p-4 items-center">
              <div className="col-span-4">
                <div className="font-medium">{collection.name}</div>
                <div className="text-sm text-muted-foreground line-clamp-1">{collection.description}</div>
              </div>
              <div className="col-span-2">{getStatusBadge(collection.status)}</div>
              <div className="col-span-2 text-sm">
                {formatDate(collection.startDate)} - {formatDate(collection.endDate)}
              </div>
              <div className="col-span-1 text-center">{collection.productCount}</div>
              <div className="col-span-1 text-center">
                {collection.featured ? (
                  <Star className="h-4 w-4 text-amber-500 mx-auto" />
                ) : (
                  <StarOff className="h-4 w-4 text-muted-foreground mx-auto" />
                )}
              </div>
              <div className="col-span-2 flex justify-end gap-2">
                <Button variant="ghost" size="icon" onClick={() => openPreview(collection)}>
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => toggleFeatured(collection.id)}>
                  {collection.featured ? <StarOff className="h-4 w-4 text-amber-500" /> : <Star className="h-4 w-4" />}
                </Button>
                <Button variant="ghost" size="icon">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => deleteCollection(collection.id)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Diálogo de Preview */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Visualização da Coleção</DialogTitle>
            <DialogDescription>Veja como a coleção aparecerá para os clientes</DialogDescription>
          </DialogHeader>
          {selectedCollection && (
            <div className="space-y-4">
              <div className="aspect-video w-full overflow-hidden rounded-lg">
                <img
                  src={selectedCollection.image || "/placeholder.svg?height=400&width=800"}
                  alt={selectedCollection.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">{selectedCollection.name}</h2>
                  {selectedCollection.featured && (
                    <Badge variant="outline" className="bg-amber-100 text-amber-800">
                      <Star className="mr-1 h-3 w-3" /> Em destaque
                    </Badge>
                  )}
                </div>
                <p className="text-muted-foreground">{selectedCollection.description}</p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {getStatusBadge(selectedCollection.status)}
                  <Badge variant="outline">
                    {formatDate(selectedCollection.startDate)} - {formatDate(selectedCollection.endDate)}
                  </Badge>
                  <Badge variant="outline">{selectedCollection.productCount} produtos</Badge>
                </div>
              </div>
              <div className="pt-4">
                <h3 className="font-medium mb-2">Produtos da Coleção (Simulação)</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="space-y-2">
                      <div className="aspect-square bg-muted rounded-md overflow-hidden">
                        <img
                          src={`/placeholder.svg?height=100&width=100&text=Produto ${i + 1}`}
                          alt={`Produto ${i + 1}`}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="text-sm font-medium">Produto {i + 1}</div>
                      <div className="text-sm text-muted-foreground">R$ {(Math.random() * 100 + 50).toFixed(2)}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPreviewOpen(false)}>
              Fechar
            </Button>
            <Button>Editar Coleção</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
