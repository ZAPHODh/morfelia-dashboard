import { DashboardOverview } from "@/components/dashboard/dashboard-overview"
import { RecentSales } from "@/components/dashboard/recent-sales"
import { InventoryStatus } from "@/components/dashboard/inventory-status"
import { SalesChart } from "@/components/dashboard/sales-chart"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Visão Geral</h1>
      <DashboardOverview />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <SalesChart className="md:col-span-2 lg:col-span-4" />
        <div className="space-y-6 md:col-span-2 lg:col-span-3">
          <RecentSales />
          <InventoryStatus />
        </div>
      </div>
    </div>
  )
}
