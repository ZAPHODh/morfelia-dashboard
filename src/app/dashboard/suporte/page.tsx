import { SupportDashboard } from "@/components/dashboard/support/support-dashboard"

export default function SupportPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Suporte ao Cliente</h1>
      </div>
      <SupportDashboard />
    </div>
  )
}
