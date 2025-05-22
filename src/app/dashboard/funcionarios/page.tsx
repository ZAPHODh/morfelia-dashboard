import { EmployeesTable } from "@/components/dashboard/employees-table"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

export default function EmployeesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Funcionários</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Adicionar Funcionário
        </Button>
      </div>
      <EmployeesTable />
    </div>
  )
}
