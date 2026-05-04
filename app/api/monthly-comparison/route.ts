import { getSession } from "@/lib/auth"
import { isFeatureEnabled } from "@/lib/feature-flags"
import { getMonthlyComparison } from "@/models/stats"
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
    const comparison = await getMonthlyComparison(session.user.id)
    return NextResponse.json(comparison)
  } catch (error) {
    console.error("Monthly comparison API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
