import { SalesTable } from "@/components/dashboard/sales-table"
import { DateRangePicker } from "@/components/dashboard/date-range-picker"

export default function SalesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold">Vendas</h1>
        <DateRangePicker />
      </div>
      <SalesTable />
    </div>
  )
}
