"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CollectionsDragDrop } from "@/components/dashboard/collections/collections-drag-drop"
import { CollectionsBulkEdit } from "@/components/dashboard/collections/collections-bulk-edit"
import { CollectionsGallery } from "@/components/dashboard/collections/collections-gallery"
import { CollectionsStats } from "@/components/dashboard/collections/collections-stats"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"

export function CollectionsManager() {
  const [activeTab, setActiveTab] = useState("drag-drop")

  return (
    <div className="space-y-6">
      <Tabs defaultValue="drag-drop" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4 md:w-[600px]">
          <TabsTrigger value="drag-drop">Arrastar e Soltar</TabsTrigger>
          <TabsTrigger value="bulk-edit">Edição em Lote</TabsTrigger>
          <TabsTrigger value="gallery">Galeria</TabsTrigger>
          <TabsTrigger value="stats">Estatísticas</TabsTrigger>
        </TabsList>
        <TabsContent value="drag-drop">
          <DndProvider backend={HTML5Backend}>
            <CollectionsDragDrop />
          </DndProvider>
        </TabsContent>
        <TabsContent value="bulk-edit">
          <CollectionsBulkEdit />
        </TabsContent>
        <TabsContent value="gallery">
          <CollectionsGallery />
        </TabsContent>
        <TabsContent value="stats">
          <CollectionsStats />
        </TabsContent>
      </Tabs>
    </div>
  )
}
