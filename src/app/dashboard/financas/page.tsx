import { FinanceOverview } from "@/components/dashboard/finance-overview"
import { ExpensesTable } from "@/components/dashboard/expenses-table"
import { FinanceChart } from "@/components/dashboard/finance-chart"

export default function FinancePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Finanças</h1>
      <FinanceOverview />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <FinanceChart className="md:col-span-2 lg:col-span-4" />
        <div className="space-y-6 md:col-span-2 lg:col-span-3">
          <ExpensesTable />
        </div>
      </div>
    </div>
  )
}
