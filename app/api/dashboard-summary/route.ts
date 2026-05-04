import { getSession } from "@/lib/auth"
import { isFeatureEnabled } from "@/lib/feature-flags"
import { getDashboardSummary } from "@/models/stats"
import { NextResponse } from "next/server"

export async function GET() {
  if (!isFeatureEnabled("dashboardV2")) {
    return NextResponse.json({ error: "Feature disabled" }, { status: 404 })
  }

  const session = await getSession()
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const summary = await getDashboardSummary(session.user.id)
    return NextResponse.json(summary)
  } catch (error) {
    console.error("Dashboard summary API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
