"use client"

import { useState, useRef } from "react"
import { useDrag, useDrop } from "react-dnd"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Pencil, Save, X, Plus, Trash2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import Image from "next/image"

// Tipos
type Product = {
  id: string
  name: string
  sku: string
  price: number
  image: string
  discount?: number
  category: string
}

// Atualizar a interface Collection para incluir datas de início e fim
type Collection = {
  id: string
  name: string
  description: string
  products: Product[]
  startDate?: string
  endDate?: string
}

// Item arrastável
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

      // Não substituir itens consigo mesmos
      if (dragIndex === hoverIndex && sourceCollectionId === targetCollectionId) {
        return
      }

      // Determinar retângulo na tela
      const hoverBoundingRect = ref.current?.getBoundingClientRect()

      // Obter ponto médio vertical
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

      // Determinar posição do mouse
      const clientOffset = monitor.getClientOffset()

      // Obter pixels para o topo
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top

      // Apenas realizar a movimentação quando o mouse cruzar metade da altura do item
      // Quando arrastando para baixo, apenas mover quando o cursor estiver abaixo de 50%
      // Quando arrastando para cima, apenas mover quando o cursor estiver acima de 50%

      // Arrastando para baixo
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      // Arrastando para cima
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      // Hora de realmente realizar a ação
      moveProduct(dragIndex, hoverIndex, sourceCollectionId, targetCollectionId)

      // Atualizar o índice do item arrastado
      item.index = hoverIndex
      item.collectionId = targetCollectionId
    },
  })

  drag(drop(ref))

  return (
    <div
      ref={ref}
      className={`p-2 mb-2 border rounded-md bg-card flex items-center justify-between cursor-move ${isDragging ? "opacity-50 border-dashed border-primary" : "opacity-100"
        }`}
      style={{
        boxShadow: isDragging ? "0 0 10px rgba(0, 0, 0, 0.1)" : "none",
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

// Área de soltar
/* eslint-disable  @typescript-eslint/no-explicit-any */
const DroppableCollection = ({ collection, moveProduct, onEditCollection, onDeleteCollection }: any) => {
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(collection.name)
  const [description, setDescription] = useState(collection.description)
  const [startDate, setStartDate] = useState(collection.startDate || "")
  const [endDate, setEndDate] = useState(collection.endDate || "")

  const handleSave = () => {
    onEditCollection(collection.id, { name, description, startDate, endDate })
    setIsEditing(false)
  }

  // Verificar se a coleção está ativa
  const isActive = () => {
    if (!collection.startDate || !collection.endDate) return true

    const now = new Date()
    const start = new Date(collection.startDate)
    const end = new Date(collection.endDate)
    end.setHours(23, 59, 59, 999) // Definir para o final do dia

    return now >= start && now <= end
  }

  // Função para formatar a data
  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString("pt-BR")
  }

  return (
    <Card className="mb-6">
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
                  <Badge
                    variant={isActive() ? "outline" : "secondary"}
                    className={isActive() ? "bg-green-50 text-green-700 border-green-200" : ""}
                  >
                    {isActive() ? "Ativa" : "Inativa"}
                  </Badge>
                )}
              </div>
              <div className="flex gap-2">
                <Button size="icon" variant="ghost" onClick={() => setIsEditing(true)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-destructive"
                  onClick={() => onDeleteCollection(collection.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
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
          <div className="p-8 text-center text-muted-foreground border border-dashed rounded-md">
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
    description: "Arraste produtos desta lista para as coleções sazonais",
    products: [...initialProducts],
  },
  {
    id: "c2",
    name: "Promoção de Verão",
    description: "Produtos com desconto para a temporada de verão",
    products: [],
    startDate: "2023-12-01",
    endDate: "2023-12-31",
  },
  {
    id: "c3",
    name: "Coleção Dia dos Namorados",
    description: "Produtos selecionados para o Dia dos Namorados",
    products: [],
    startDate: "2024-06-01",
    endDate: "2024-06-12",
  },
]

export function ProductDragDrop() {
  const [collections, setCollections] = useState<Collection[]>(initialCollections)
  const [newCollectionName, setNewCollectionName] = useState("")
  const [newCollectionDescription, setNewCollectionDescription] = useState("")
  const [newCollectionStartDate, setNewCollectionStartDate] = useState("")
  const [newCollectionEndDate, setNewCollectionEndDate] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedProduct] = useState<Product | null>(null)
  const [discountValue, setDiscountValue] = useState("0")

  const moveProduct = (fromIndex: number, toIndex: number, sourceCollectionId: string, targetCollectionId: string) => {
    setCollections((prevCollections) => {

      const newCollections = JSON.parse(JSON.stringify(prevCollections))
      const sourceCollectionIndex = newCollections.findIndex((c: Collection) => c.id === sourceCollectionId)
      const targetCollectionIndex = newCollections.findIndex((c: Collection) => c.id === targetCollectionId)

      if (sourceCollectionIndex === -1 || targetCollectionIndex === -1) return prevCollections

      const sourceCollection = newCollections[sourceCollectionIndex]
      const targetCollection = newCollections[targetCollectionIndex]

      const [movedProduct] = sourceCollection.products.splice(fromIndex, 1)

      targetCollection.products.splice(toIndex, 0, movedProduct)

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
    }

    setCollections([...collections, newCollection])
    setNewCollectionName("")
    setNewCollectionDescription("")
    setNewCollectionStartDate("")
    setNewCollectionEndDate("")
  }

  const editCollection = (
    id: string,
    data: { name: string; description: string; startDate?: string; endDate?: string },
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
          }
          : collection,
      ),
    )
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
              <Button onClick={addCollection} disabled={!newCollectionName.trim()}>
                <Plus className="h-4 w-4 mr-2" /> Adicionar Coleção
              </Button>
            </div>
          </CardContent>
        </Card>

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
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">2. Crie Novas Coleções</h3>
                <p className="text-sm text-muted-foreground">
                  Adicione novas coleções para diferentes épocas do ano ou promoções.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">3. Aplique Descontos</h3>
                <p className="text-sm text-muted-foreground">Clique em um produto e defina um desconto para ele.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        {collections.map((collection, index) => (
          <DroppableCollection
            key={collection.id}
            collection={collection}
            index={index}
            moveProduct={moveProduct}
            onEditCollection={editCollection}
            onDeleteCollection={deleteCollection}
          />
        ))}
      </div>
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
    </div>
  )
}
