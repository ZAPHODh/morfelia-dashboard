"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Check, X, Tag, Percent } from "lucide-react"


type Product = {
  id: string
  name: string
  sku: string
  price: number
  category: string
  stock: number
  status: string
  selected?: boolean
  discount?: number
  collection?: string
  featured?: boolean
  startDate?: string
  endDate?: string
}

const products: Product[] = [
  {
    id: "PRD001",
    name: "Colar Pérolas Dourado",
    sku: "COL-PD-001",
    category: "Colares",
    price: 129.9,
    stock: 0,
    status: "Esgotado",
  },
  {
    id: "PRD002",
    name: "Brinco Cristal Prata",
    sku: "BRI-CP-023",
    category: "Brincos",
    price: 79.9,
    stock: 3,
    status: "Baixo",
    collection: "Verão",
  },
  {
    id: "PRD003",
    name: "Pulseira Pedras Coloridas",
    sku: "PUL-PC-045",
    category: "Pulseiras",
    price: 89.9,
    stock: 5,
    status: "Baixo",
    collection: "Verão",
  },
  {
    id: "PRD004",
    name: "Anel Solitário Zircônia",
    sku: "ANE-SZ-012",
    category: "Anéis",
    price: 149.9,
    stock: 0,
    status: "Esgotado",
    collection: "Dia dos Namorados",
  },
  {
    id: "PRD005",
    name: "Conjunto Festa Prata",
    sku: "CON-FP-078",
    category: "Conjuntos",
    price: 249.9,
    stock: 2,
    status: "Baixo",
    collection: "Dia dos Namorados",
  },
  {
    id: "PRD006",
    name: "Brinco Argola Dourada",
    sku: "BRI-AD-034",
    category: "Brincos",
    price: 59.9,
    stock: 15,
    status: "Em estoque",
  },
  {
    id: "PRD007",
    name: "Colar Corrente Fina",
    sku: "COL-CF-056",
    category: "Colares",
    price: 69.9,
    stock: 20,
    status: "Em estoque",
  },
  {
    id: "PRD008",
    name: "Anel Ajustável Flor",
    sku: "ANE-AF-089",
    category: "Anéis",
    price: 49.9,
    stock: 12,
    status: "Em estoque",
  },
  {
    id: "PRD009",
    name: "Pulseira Rígida Dourada",
    sku: "PUL-RD-067",
    category: "Pulseiras",
    price: 99.9,
    stock: 8,
    status: "Em estoque",
  },
  {
    id: "PRD010",
    name: "Tornozeleira Bolinhas",
    sku: "TOR-BO-091",
    category: "Tornozeleiras",
    price: 39.9,
    stock: 18,
    status: "Em estoque",
  },
]


const bulkEditSchema = z.object({
  discount: z.string().optional(),
  collection: z.string().optional(),
  featured: z.boolean().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
})


type BulkEditValues = z.infer<typeof bulkEditSchema>

export function CollectionsBulkEdit() {

  const form = useForm<BulkEditValues>({
    resolver: zodResolver(bulkEditSchema),
    defaultValues: {
      discount: "",
      collection: "",
      featured: false,
      startDate: "",
      endDate: "",
    },
  })
  const [productList, setProductList] = useState<Product[]>(products.map((p) => ({ ...p, selected: false })))
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedCollection, setSelectedCollection] = useState<string>("all")
  const [selectAll, setSelectAll] = useState(false)


  const filteredProducts = productList.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory

    const matchesCollection =
      selectedCollection === "all" ||
      (selectedCollection === "none" ? !product.collection : product.collection === selectedCollection)

    return matchesSearch && matchesCategory && matchesCollection
  })

  const categories = Array.from(new Set(productList.map((p) => p.category)))


  const collections = Array.from(new Set(productList.map((p) => p.collection).filter((c): c is string => typeof c === "string")))


  const handleSelectAll = () => {
    const newSelectAll = !selectAll
    setSelectAll(newSelectAll)

    setProductList(
      productList.map((product) => ({
        ...product,
        selected: newSelectAll,
      })),
    )
  }

  const handleSelectProduct = (id: string) => {
    setProductList(
      productList.map((product) => (product.id === id ? { ...product, selected: !product.selected } : product)),
    )

    const allSelected = productList.every((p) => (p.id === id ? !p.selected : p.selected))
    setSelectAll(allSelected)
  }

  const onSubmit = (values: BulkEditValues) => {
    setProductList(
      productList.map((product) => {
        if (!product.selected) return product

        const updatedProduct = { ...product }

        if (values.discount) {
          updatedProduct.discount = Number.parseInt(values.discount)
        }

        if (values.collection) {
          updatedProduct.collection = values.collection
        }

        if (values.featured !== undefined) {
          updatedProduct.featured = values.featured
        }

        if (values.startDate) {
          updatedProduct.startDate = values.startDate
        }

        if (values.endDate) {
          updatedProduct.endDate = values.endDate
        }

        return updatedProduct
      }),
    )

    form.reset()
  }

  const selectedCount = productList.filter((p) => p.selected).length

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Filtros</CardTitle>
            <CardDescription>Filtre produtos por nome, SKU, categoria ou coleção</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar produtos..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category-filter">Categoria</Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger id="category-filter">
                  <SelectValue placeholder="Todas as categorias" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as categorias</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="collection-filter">Coleção</Label>
              <Select value={selectedCollection} onValueChange={setSelectedCollection}>
                <SelectTrigger id="collection-filter">
                  <SelectValue placeholder="Todas as coleções" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as coleções</SelectItem>
                  <SelectItem value="none">Sem coleção</SelectItem>
                  {collections.map((collection) => (
                    <SelectItem key={collection} value={collection}>
                      {collection}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Edição em Lote</CardTitle>
            <CardDescription>
              {selectedCount === 0
                ? "Selecione produtos para editar em lote"
                : `${selectedCount} produto(s) selecionado(s)`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <Tabs defaultValue="collection" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="collection">Coleção</TabsTrigger>
                    <TabsTrigger value="discount">Desconto</TabsTrigger>
                    <TabsTrigger value="dates">Datas</TabsTrigger>
                  </TabsList>

                  <TabsContent value="collection" className="space-y-4 pt-4">
                    <FormField
                      control={form.control}
                      name="collection"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Coleção</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione uma coleção" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Verão">Verão</SelectItem>
                              <SelectItem value="Outono">Outono</SelectItem>
                              <SelectItem value="Inverno">Inverno</SelectItem>
                              <SelectItem value="Primavera">Primavera</SelectItem>
                              <SelectItem value="Dia dos Namorados">Dia dos Namorados</SelectItem>
                              <SelectItem value="Natal">Natal</SelectItem>
                              <SelectItem value="Black Friday">Black Friday</SelectItem>
                              <SelectItem value="remove">Remover da coleção</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>Adicione os produtos selecionados a uma coleção.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="featured"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Destacar Produtos</FormLabel>
                            <FormDescription>Marque para destacar os produtos selecionados na loja.</FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                  </TabsContent>

                  <TabsContent value="discount" className="space-y-4 pt-4">
                    <FormField
                      control={form.control}
                      name="discount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Porcentagem de Desconto</FormLabel>
                          <div className="flex items-center gap-2">
                            <FormControl>
                              <Input type="number" min="0" max="100" placeholder="Ex: 20" {...field} />
                            </FormControl>
                            <span>%</span>
                          </div>
                          <FormDescription>
                            Defina a porcentagem de desconto para os produtos selecionados.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TabsContent>

                  <TabsContent value="dates" className="space-y-4 pt-4">
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="startDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Data de Início</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormDescription>Define quando a promoção ou coleção começa.</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="endDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Data de Término</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormDescription>Define quando a promoção ou coleção termina.</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </TabsContent>
                </Tabs>

                <Button type="submit" disabled={selectedCount === 0} className="w-full">
                  Aplicar a {selectedCount} produto(s)
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Produtos</CardTitle>
          <CardDescription>Selecione os produtos para editar em lote</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox checked={selectAll} onCheckedChange={handleSelectAll} aria-label="Selecionar todos" />
                  </TableHead>
                  <TableHead>Produto</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead className="text-right">Preço</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Coleção</TableHead>
                  <TableHead>Desconto</TableHead>
                  <TableHead>Destaque</TableHead>
                  <TableHead>Período</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <Checkbox
                        checked={product.selected}
                        onCheckedChange={() => handleSelectProduct(product.id)}
                        aria-label={`Selecionar ${product.name}`}
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                      <div>
                        {product.name}
                        <div className="text-xs text-muted-foreground">{product.sku}</div>
                      </div>
                    </TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell className="text-right">
                      {product.discount ? (
                        <div>
                          <span className="text-muted-foreground line-through text-xs">
                            R$ {product.price.toFixed(2)}
                          </span>
                          <div className="font-medium">
                            R$ {(product.price * (1 - product.discount / 100)).toFixed(2)}
                          </div>
                        </div>
                      ) : (
                        <div className="font-medium">R$ {product.price.toFixed(2)}</div>
                      )}
                    </TableCell>
                    <TableCell>
                      {product.status === "Esgotado" ? (
                        <Badge variant="destructive">Esgotado</Badge>
                      ) : product.status === "Baixo" ? (
                        <Badge variant="outline" className="text-amber-500 border-amber-500">
                          Baixo
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-emerald-500 border-emerald-500">
                          Em estoque
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {product.collection ? (
                        <Badge variant="secondary">
                          <Tag className="h-3 w-3 mr-1" />
                          {product.collection}
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground text-sm">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {product.discount ? (
                        <Badge variant="outline" className="text-rose-500 border-rose-500">
                          <Percent className="h-3 w-3 mr-1" />
                          {product.discount}%
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground text-sm">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {product.featured ? (
                        <Check className="h-4 w-4 text-emerald-500" />
                      ) : (
                        <X className="h-4 w-4 text-muted-foreground" />
                      )}
                    </TableCell>
                    <TableCell>
                      {product.startDate && product.endDate ? (
                        <div className="text-xs">
                          <div>{new Date(product.startDate).toLocaleDateString("pt-BR")}</div>
                          <div>até</div>
                          <div>{new Date(product.endDate).toLocaleDateString("pt-BR")}</div>
                        </div>
                      ) : (
                        <span className="text-muted-foreground text-sm">-</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
                {filteredProducts.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={9} className="h-24 text-center">
                      Nenhum produto encontrado.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
