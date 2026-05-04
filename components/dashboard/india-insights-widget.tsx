"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency } from "@/lib/utils"
import { AlertCircle, Sparkles } from "lucide-react"
import { useEffect, useState } from "react"
import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

type CategoryBreakdownRow = {
  categoryCode: string
  categoryName: string
  amount: number
}

type MonthlySeriesRow = {
  month: string
  amount: number
}

type DashboardSummary = {
  currentMonthExpenses: number
  previousMonthExpenses: number
  categoryBreakdown: CategoryBreakdownRow[]
  monthlySeries: MonthlySeriesRow[]
  gstBreakdown: Record<number, number>
  insights: string[]
}

const CHART_COLORS = ["#2563eb", "#0891b2", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"]

export function IndiaInsightsWidget() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadSummary = async () => {
      try {
        setIsLoading(true)
        const response = await fetch("/api/dashboard-summary")
        if (!response.ok) {
          throw new Error("Failed to load dashboard summary")
        }

        const data = (await response.json()) as DashboardSummary
        setSummary(data)
      } catch (fetchError) {
        setError(fetchError instanceof Error ? fetchError.message : "Unexpected error")
      } finally {
        setIsLoading(false)
      }
    }

    loadSummary()
  }, [])

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>India Insights Dashboard</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">Loading analytics...</CardContent>
      </Card>
    )
  }

  if (error || !summary) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-red-500" />
            India Insights Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-red-600">{error || "Unable to load insights"}</CardContent>
      </Card>
    )
  }

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>You spent {formatCurrency(summary.currentMonthExpenses, "INR")} this month</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {summary.insights.map((insight) => (
            <div key={insight} className="flex items-start gap-2 text-sm">
              <Sparkles className="h-4 w-4 mt-0.5 text-blue-500" />
              <span>{insight}</span>
            </div>
          ))}

          <div className="pt-2">
            <h3 className="text-sm font-semibold">GST Breakdown</h3>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              {Object.entries(summary.gstBreakdown).length === 0 && (
                <p className="text-sm text-muted-foreground">No GST captured this month.</p>
              )}
              {Object.entries(summary.gstBreakdown).map(([rate, amount]) => (
                <div key={rate} className="rounded-md border px-3 py-2 text-sm">
                  <span className="font-medium">{rate}% GST</span>
                  <span className="ml-2 text-muted-foreground">{formatCurrency(amount, "INR")}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Category-wise Expenses</CardTitle>
        </CardHeader>
        <CardContent className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={summary.categoryBreakdown} dataKey="amount" nameKey="categoryName" outerRadius={90}>
                {summary.categoryBreakdown.map((row, index) => (
                  <Cell key={row.categoryCode} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => formatCurrency(value, "INR")} />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Expenses</CardTitle>
        </CardHeader>
        <CardContent className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={summary.monthlySeries}>
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `${Math.round(value / 100000)}L`} />
              <Tooltip formatter={(value: number) => formatCurrency(value, "INR")} />
              <Bar dataKey="amount" fill="#2563eb" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
