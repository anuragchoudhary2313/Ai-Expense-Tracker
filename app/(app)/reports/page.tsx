import { IndiaInsightsWidget } from "@/components/dashboard/india-insights-widget"
import config from "@/lib/config"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Reports",
  description: config.app.description,
}

export default function ReportsPage() {
  return (
    <div className="flex flex-col gap-5 p-5 w-full max-w-7xl self-center">
      <h1 className="text-2xl font-semibold">Reports</h1>
      <IndiaInsightsWidget />
    </div>
  )
}
