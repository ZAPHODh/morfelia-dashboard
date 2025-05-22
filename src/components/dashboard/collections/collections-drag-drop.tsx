"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useDrag, useDrop } from "react-dnd"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Pencil, Save, X, Plus, Trash2, Copy, Download, Upload } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Image from "next/image"


type Product = {
  id: string
  name: string
  sku: string
  price: number
  image: string
  discount?: number
  category: string
}


type Collection = {
  id: string
  name: string
  description: string
  products: Product[]
  startDate?: string
  endDate?: string
  featured?: boolean
  image?: string
}

/* eslint-disable  @typescript-eslint/no-explicit-any */
const DraggableProduct = ({ product, index, moveProduct, collectionId }: any) => {
  const ref = useRef<HTMLDivElement>(null)

  const [{ isDragging }, drag] = useDrag({
    type: "PRODUCT",
    item: { id: product.id, index, collectionId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const [, drop] = useDrop({
    accept: "PRODUCT",
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    hover(item: any, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      const sourceCollectionId = item.collectionId
      const targetCollectionId = collectionId

      if (dragIndex === hoverIndex && sourceCollectionId === targetCollectionId) {
        return
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect()

      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

      const clientOffset = monitor.getClientOffset()

      const hoverClientY = clientOffset!.y - hoverBoundingRect.top

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      moveProduct(dragIndex, hoverIndex, sourceCollectionId, targetCollectionId)
      item.index = hoverIndex
      item.collectionId = targetCollectionId
    },
  })

  drag(drop(ref))

  return (
    <div
      ref={ref}
      className={`p-2 mb-2 border rounded-md bg-card flex items-center justify-between cursor-move transition-all ${isDragging ? "opacity-70 border-dashed border-primary-500 scale-105 shadow-lg" : "opacity-100"
        }`}
      style={{
        boxShadow: isDragging ? "0 0 15px rgba(0, 0, 0, 0.2)" : "none",
      }}
    >
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center overflow-hidden">
          <Image fill src={product.image || "/placeholder.svg"} alt={product.name} className="h-full w-full object-cover" />
        </div>
        <div>
          <p className="font-medium text-sm">{product.name}</p>
          <p className="text-xs text-muted-foreground">{product.sku}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {product.discount && (
          <Badge variant="outline" className="text-rose-500 border-rose-500">
            -{product.discount}%
          </Badge>
        )}
        <p className="text-sm font-medium">R$ {product.price.toFixed(2)}</p>
      </div>
    </div>
  )
}
/* eslint-disable  @typescript-eslint/no-explicit-any */
const DroppableCollection = ({
  collection,
  moveProduct,
  onEditCollection,
  onDeleteCollection,
  onDuplicateCollection,
}: any) => {
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(collection.name)
  const [description, setDescription] = useState(collection.description)
  const [startDate, setStartDate] = useState(collection.startDate || "")
  const [endDate, setEndDate] = useState(collection.endDate || "")
  const [featured, setFeatured] = useState(collection.featured || false)
  const [image, setImage] = useState(collection.image || "")

  const dropRef = useRef<HTMLDivElement>(null)
  const [, drop] = useDrop({
    accept: "PRODUCT",
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    drop: (item: any) => {
      if (collection.products.length === 0) {
        moveProduct(item.index, 0, item.collectionId, collection.id)
      }
    },
  })

  drop(dropRef)

  const isActive = () => {
    if (!collection.startDate || !collection.endDate) return true

    const now = new Date()
    const start = new Date(collection.startDate)
    const end = new Date(collection.endDate)
    end.setHours(23, 59, 59, 999)

    return now >= start && now <= end
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString("pt-BR")
  }

  const handleSave = () => {
    onEditCollection(collection.id, {
      name,
      description,
      startDate,
      endDate,
      featured,
      image,
    })
    setIsEditing(false)
  }

  return (
    <Card className="mb-6" ref={dropRef}>
      <CardHeader className="pb-3">
        {isEditing ? (
          <div className="space-y-2">
            <div>
              <Label htmlFor={`collection-name-${collection.id}`}>Nome da Coleção</Label>
              <Input
                id={`collection-name-${collection.id}`}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor={`collection-desc-${collection.id}`}>Descrição</Label>
              <Input
                id={`collection-desc-${collection.id}`}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor={`collection-image-${collection.id}`}>URL da Imagem</Label>
              <Input
                id={`collection-image-${collection.id}`}
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="/placeholder.svg"
                className="mt-1"
              />
            </div>
            {collection.id !== "c1" && (
              <>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor={`collection-start-${collection.id}`}>Data de Início</Label>
                    <Input
                      id={`collection-start-${collection.id}`}
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`collection-end-${collection.id}`}>Data de Término</Label>
                    <Input
                      id={`collection-end-${collection.id}`}
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2 mt-2">
                  <input
                    type="checkbox"
                    id={`collection-featured-${collection.id}`}
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                    className="rounded border-gray-300"
                  />
                  <Label htmlFor={`collection-featured-${collection.id}`}>Destacar na loja</Label>
                </div>
              </>
            )}
            <div className="flex gap-2">
              <Button size="sm" onClick={handleSave}>
                <Save className="h-4 w-4 mr-1" /> Salvar
              </Button>
              <Button size="sm" variant="outline" onClick={() => setIsEditing(false)}>
                <X className="h-4 w-4 mr-1" /> Cancelar
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CardTitle>{collection.name}</CardTitle>
                {collection.id !== "c1" && (
                  <>
                    <Badge
                      variant={isActive() ? "outline" : "secondary"}
                      className={isActive() ? "bg-green-50 text-green-700 border-green-200" : ""}
                    >
                      {isActive() ? "Ativa" : "Inativa"}
                    </Badge>
                    {collection.featured && (
                      <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                        Destaque
                      </Badge>
                    )}
                  </>
                )}
              </div>
              <div className="flex gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="icon" variant="ghost">
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setIsEditing(true)}>
                      <Pencil className="h-4 w-4 mr-2" /> Editar
                    </DropdownMenuItem>
                    {collection.id !== "c1" && (
                      <>
                        <DropdownMenuItem onClick={() => onDuplicateCollection(collection.id)}>
                          <Copy className="h-4 w-4 mr-2" /> Duplicar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onDeleteCollection(collection.id)}>
                          <Trash2 className="h-4 w-4 mr-2 text-destructive" /> Excluir
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <CardDescription>
              {collection.description}
              {collection.startDate && collection.endDate && (
                <div className="mt-1 text-xs">
                  Período: {formatDate(collection.startDate)} até {formatDate(collection.endDate)}
                </div>
              )}
            </CardDescription>
          </>
        )}
      </CardHeader>
      <CardContent className="pt-0">
        {collection.products.map((product: Product, productIndex: number) => (
          <DraggableProduct
            key={product.id}
            product={product}
            index={productIndex}
            collectionId={collection.id}
            moveProduct={moveProduct}
          />
        ))}
        {collection.products.length === 0 && (
          <div
            className="p-8 text-center text-muted-foreground border border-dashed rounded-md min-h-[100px] flex items-center justify-center"
            onDragOver={(e) => {
              e.preventDefault()
              e.currentTarget.classList.add("bg-muted/50", "border-primary")
            }}
            onDragLeave={(e) => {
              e.preventDefault()
              e.currentTarget.classList.remove("bg-muted/50", "border-primary")
            }}
            onDrop={(e) => {
              e.preventDefault()
              e.currentTarget.classList.remove("bg-muted/50", "border-primary")
            }}
          >
            Arraste produtos para esta coleção
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Dados de exemplo
const initialProducts: Product[] = [
  {
    id: "p1",
    name: "Colar Pérolas Dourado",
    sku: "COL-PD-001",
    price: 129.9,
    image: "/placeholder.svg?height=40&width=40",
    category: "Colares",
  },
  {
    id: "p2",
    name: "Brinco Cristal Prata",
    sku: "BRI-CP-023",
    price: 79.9,
    image: "/placeholder.svg?height=40&width=40",
    category: "Brincos",
  },
  {
    id: "p3",
    name: "Pulseira Pedras Coloridas",
    sku: "PUL-PC-045",
    price: 89.9,
    image: "/placeholder.svg?height=40&width=40",
    category: "Pulseiras",
  },
  {
    id: "p4",
    name: "Anel Solitário Zircônia",
    sku: "ANE-SZ-012",
    price: 149.9,
    image: "/placeholder.svg?height=40&width=40",
    category: "Anéis",
  },
  {
    id: "p5",
    name: "Conjunto Festa Prata",
    sku: "CON-FP-078",
    price: 249.9,
    image: "/placeholder.svg?height=40&width=40",
    category: "Conjuntos",
  },
  {
    id: "p6",
    name: "Brinco Argola Dourada",
    sku: "BRI-AD-034",
    price: 59.9,
    image: "/placeholder.svg?height=40&width=40",
    category: "Brincos",
  },
]

// Atualizar initialCollections para incluir datas
const initialCollections: Collection[] = [
  {
    id: "c1",
    name: "Produtos Disponíveis",
    description: "Arraste produtos desta lista para as coleções",
    products: [...initialProducts],
  },
  {
    id: "c2",
    name: "Coleção Verão",
    description: "Produtos com desconto para a temporada de verão",
    products: [],
    startDate: "2023-12-01",
    endDate: "2023-12-31",
    featured: true,
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "c3",
    name: "Coleção Dia dos Namorados",
    description: "Produtos selecionados para o Dia dos Namorados",
    products: [],
    startDate: "2024-06-01",
    endDate: "2024-06-12",
    image: "/placeholder.svg?height=200&width=400",
  },
]

export function CollectionsDragDrop() {
  const [collections, setCollections] = useState<Collection[]>(initialCollections)
  const [newCollectionName, setNewCollectionName] = useState("")
  const [newCollectionDescription, setNewCollectionDescription] = useState("")
  const [newCollectionStartDate, setNewCollectionStartDate] = useState("")
  const [newCollectionEndDate, setNewCollectionEndDate] = useState("")
  const [newCollectionFeatured, setNewCollectionFeatured] = useState(false)
  const [newCollectionImage, setNewCollectionImage] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedProduct] = useState<Product | null>(null)
  const [discountValue, setDiscountValue] = useState("0")
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false)
  const [exportData, setExportData] = useState("")

  const moveProduct = (fromIndex: number, toIndex: number, sourceCollectionId: string, targetCollectionId: string) => {
    setCollections((prevCollections) => {

      const newCollections = JSON.parse(JSON.stringify(prevCollections))

      const sourceCollectionIndex = newCollections.findIndex((c: Collection) => c.id === sourceCollectionId)
      const targetCollectionIndex = newCollections.findIndex((c: Collection) => c.id === targetCollectionId)

      if (sourceCollectionIndex === -1 || targetCollectionIndex === -1) return prevCollections

      const sourceCollection = newCollections[sourceCollectionIndex]
      const targetCollection = newCollections[targetCollectionIndex]

      const [movedProduct] = sourceCollection.products.splice(fromIndex, 1)

      if (targetCollection.products.length === 0) {
        targetCollection.products = [movedProduct]
      } else {
        targetCollection.products.splice(toIndex, 0, movedProduct)
      }

      return newCollections
    })
  }

  const addCollection = () => {
    if (!newCollectionName.trim()) return

    const newCollection: Collection = {
      id: `c${Date.now()}`,
      name: newCollectionName,
      description: newCollectionDescription,
      products: [],
      startDate: newCollectionStartDate,
      endDate: newCollectionEndDate,
      featured: newCollectionFeatured,
      image: newCollectionImage || "/placeholder.svg?height=200&width=400",
    }

    setCollections([...collections, newCollection])
    setNewCollectionName("")
    setNewCollectionDescription("")
    setNewCollectionStartDate("")
    setNewCollectionEndDate("")
    setNewCollectionFeatured(false)
    setNewCollectionImage("")
  }

  const editCollection = (
    id: string,
    data: {
      name: string
      description: string
      startDate?: string
      endDate?: string
      featured?: boolean
      image?: string
    },
  ) => {
    setCollections(
      collections.map((collection) =>
        collection.id === id
          ? {
            ...collection,
            name: data.name,
            description: data.description,
            startDate: data.startDate,
            endDate: data.endDate,
            featured: data.featured,
            image: data.image,
          }
          : collection,
      ),
    )
  }

  const duplicateCollection = (id: string) => {
    const collectionToDuplicate = collections.find((c) => c.id === id)
    if (!collectionToDuplicate) return

    const newCollection: Collection = {
      ...collectionToDuplicate,
      id: `c${Date.now()}`,
      name: `${collectionToDuplicate.name} (Cópia)`,
      products: [...collectionToDuplicate.products],
    }

    setCollections([...collections, newCollection])
  }


  const deleteCollection = (id: string) => {
    if (id === "c1") return

    const collectionToDelete = collections.find((c) => c.id === id)
    if (!collectionToDelete) return

    setCollections((prevCollections) => {
      const newCollections = prevCollections.filter((c) => c.id !== id)
      const availableProductsCollection = newCollections.find((c) => c.id === "c1")

      if (availableProductsCollection) {
        availableProductsCollection.products = [...availableProductsCollection.products, ...collectionToDelete.products]
      }

      return newCollections
    })
  }

  // Abrir diálogo para adicionar desconto
  // const openDiscountDialog = (product: Product) => {
  //   setSelectedProduct(product)
  //   setDiscountValue(product.discount?.toString() || "0")
  //   setIsDialogOpen(true)
  // }

  const applyDiscount = () => {
    if (!selectedProduct) return

    const discount = Number.parseInt(discountValue)

    setCollections((prevCollections) => {
      return prevCollections.map((collection) => {
        const updatedProducts = collection.products.map((product) => {
          if (product.id === selectedProduct.id) {
            return {
              ...product,
              discount: discount > 0 ? discount : undefined,
            }
          }
          return product
        })

        return {
          ...collection,
          products: updatedProducts,
        }
      })
    })

    setIsDialogOpen(false)
  }


  const exportCollections = () => {
    const collectionsToExport = collections.filter((c) => c.id !== "c1")
    const exportString = JSON.stringify(collectionsToExport, null, 2)
    setExportData(exportString)
    setIsExportDialogOpen(true)
  }


  const importCollections = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const importedCollections = JSON.parse(e.target?.result as string)
        if (Array.isArray(importedCollections)) {

          const newCollections = importedCollections.map((collection) => ({
            ...collection,
            id: `c${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          }))

          setCollections((prev) => {
            const productsCollection = prev.find((c) => c.id === "c1")
            return productsCollection ? [productsCollection, ...newCollections] : [...prev, ...newCollections]
          })
        }
      } catch (error) {
        console.error("Erro ao importar coleções:", error)
        alert("Arquivo inválido. Por favor, selecione um arquivo JSON válido.")
      }
    }
    reader.readAsText(file)

    event.target.value = ""
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Adicionar Nova Coleção</CardTitle>
            <CardDescription>Crie uma nova coleção sazonal ou promocional</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="collection-name">Nome da Coleção</Label>
                <Input
                  id="collection-name"
                  placeholder="Ex: Black Friday 2023"
                  value={newCollectionName}
                  onChange={(e) => setNewCollectionName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="collection-description">Descrição</Label>
                <Input
                  id="collection-description"
                  placeholder="Ex: Produtos com desconto para a Black Friday"
                  value={newCollectionDescription}
                  onChange={(e) => setNewCollectionDescription(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="collection-image">URL da Imagem</Label>
                <Input
                  id="collection-image"
                  placeholder="Ex: /images/colecao-verao.jpg"
                  value={newCollectionImage}
                  onChange={(e) => setNewCollectionImage(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="collection-start-date">Data de Início</Label>
                  <Input
                    id="collection-start-date"
                    type="date"
                    value={newCollectionStartDate}
                    onChange={(e) => setNewCollectionStartDate(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="collection-end-date">Data de Término</Label>
                  <Input
                    id="collection-end-date"
                    type="date"
                    value={newCollectionEndDate}
                    onChange={(e) => setNewCollectionEndDate(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="collection-featured"
                  checked={newCollectionFeatured}
                  onChange={(e) => setNewCollectionFeatured(e.target.checked)}
                  className="rounded border-gray-300"
                />
                <Label htmlFor="collection-featured">Destacar na loja</Label>
              </div>
              <Button onClick={addCollection} disabled={!newCollectionName.trim()}>
                <Plus className="h-4 w-4 mr-2" /> Adicionar Coleção
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Gerenciamento de Coleções</CardTitle>
            <CardDescription>Importe, exporte e gerencie suas coleções</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium">Exportar Coleções</h3>
                <p className="text-sm text-muted-foreground">
                  Exporte suas coleções para backup ou para usar em outra loja.
                </p>
                <Button onClick={exportCollections} variant="outline" className="w-full">
                  <Download className="h-4 w-4 mr-2" /> Exportar Coleções
                </Button>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Importar Coleções</h3>
                <p className="text-sm text-muted-foreground">Importe coleções de um arquivo JSON.</p>
                <div className="flex items-center gap-2">
                  <Button variant="outline" className="w-full" asChild>
                    <label htmlFor="import-file" className="cursor-pointer">
                      <Upload className="h-4 w-4 mr-2" /> Importar Coleções
                    </label>
                  </Button>
                  <input id="import-file" type="file" accept=".json" className="hidden" onChange={importCollections} />
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="font-medium mb-2">Estatísticas</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex justify-between">
                    <span>Total de coleções:</span>
                    <span className="font-medium">{collections.length - 1}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Coleções ativas:</span>
                    <span className="font-medium">
                      {
                        collections.filter((c) => {
                          if (c.id === "c1") return false
                          if (!c.startDate || !c.endDate) return true

                          const now = new Date()
                          const start = new Date(c.startDate)
                          const end = new Date(c.endDate)
                          end.setHours(23, 59, 59, 999)

                          return now >= start && now <= end
                        }).length
                      }
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Produtos em coleções:</span>
                    <span className="font-medium">
                      {collections.reduce((total, collection) => {
                        if (collection.id === "c1") return total
                        return total + collection.products.length
                      }, 0)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Coleções em destaque:</span>
                    <span className="font-medium">{collections.filter((c) => c.featured).length}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Instruções</CardTitle>
          <CardDescription>Como organizar seus produtos em coleções</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium">1. Arraste e Solte</h3>
              <p className="text-sm text-muted-foreground">
                Arraste produtos da lista &quot;Produtos Disponíveis&quot; para as coleções sazonais.
              </p>
              <p className="text-sm text-muted-foreground font-medium text-primary">
                Dica: Você pode arrastar diretamente para a área que mostra &quot;Arraste produtos para esta coleção&quot; ou para
                qualquer parte da coleção.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de coleções */}
      <div className="space-y-6">
        {collections.map((collection, index) => (
          <DroppableCollection
            key={collection.id}
            collection={collection}
            index={index}
            moveProduct={moveProduct}
            onEditCollection={editCollection}
            onDeleteCollection={deleteCollection}
            onDuplicateCollection={duplicateCollection}
          />
        ))}
      </div>

      {/* Diálogo para adicionar desconto */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Aplicar Desconto</DialogTitle>
            <DialogDescription>Defina a porcentagem de desconto para {selectedProduct?.name}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="discount">Porcentagem de Desconto</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="discount"
                  type="number"
                  min="0"
                  max="100"
                  value={discountValue}
                  onChange={(e) => setDiscountValue(e.target.value)}
                />
                <span>%</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Preço Original</Label>
              <p className="font-medium">R$ {selectedProduct?.price.toFixed(2)}</p>
            </div>
            <div className="space-y-2">
              <Label>Preço com Desconto</Label>
              <p className="font-medium text-emerald-600">
                R${" "}
                {selectedProduct
                  ? (selectedProduct.price * (1 - Number.parseInt(discountValue) / 100)).toFixed(2)
                  : "0.00"}
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={applyDiscount}>Aplicar Desconto</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo para exportar coleções */}
      <Dialog open={isExportDialogOpen} onOpenChange={setIsExportDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Exportar Coleções</DialogTitle>
            <DialogDescription>Copie o JSON abaixo ou faça o download do arquivo</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="export-data">Dados das Coleções (JSON)</Label>
              <div className="relative">
                <textarea
                  id="export-data"
                  className="w-full h-64 p-4 font-mono text-sm border rounded-md"
                  value={exportData}
                  readOnly
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsExportDialogOpen(false)}>
              Fechar
            </Button>
            <Button
              onClick={() => {
                const blob = new Blob([exportData], { type: "application/json" })
                const url = URL.createObjectURL(blob)
                const a = document.createElement("a")
                a.href = url
                a.download = `colecoes-${new Date().toISOString().split("T")[0]}.json`
                document.body.appendChild(a)
                a.click()
                document.body.removeChild(a)
                URL.revokeObjectURL(url)
              }}
            >
              <Download className="h-4 w-4 mr-2" /> Download JSON
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
