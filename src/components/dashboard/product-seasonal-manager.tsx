"use client"

import { useState } from "react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProductDragDrop } from "@/components/dashboard/product-drag-drop"
import { ProductBulkEdit } from "@/components/dashboard/product-bulk-edit"

export function ProductSeasonalManager() {
  const [, setActiveTab] = useState("drag-drop")

  return (
    <div className="space-y-6">
      <Tabs defaultValue="drag-drop" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
          <TabsTrigger value="drag-drop">Arrastar e Soltar</TabsTrigger>
          <TabsTrigger value="bulk-edit">Edição em Lote</TabsTrigger>
        </TabsList>
        <TabsContent value="drag-drop">
          <DndProvider backend={HTML5Backend}>
            <ProductDragDrop />
          </DndProvider>
        </TabsContent>
        <TabsContent value="bulk-edit">
          <ProductBulkEdit />
        </TabsContent>
      </Tabs>
    </div>
  )
}
