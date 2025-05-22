import { CollectionsManager } from "@/components/dashboard/collections/collections-manager"

export default function CollectionsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Coleções</h1>
      </div>
      <CollectionsManager />
    </div>
  )
}
