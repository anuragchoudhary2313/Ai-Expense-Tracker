import { prisma } from "@/lib/db"
import { calcTotalPerCurrency } from "@/lib/stats"
import { endOfMonth, format, startOfMonth, subMonths } from "date-fns"
import { Prisma } from "@/prisma/client"
import { cache } from "react"
import { TransactionFilters } from "./transactions"

export type DashboardStats = {
  totalIncomePerCurrency: Record<string, number>
  totalExpensesPerCurrency: Record<string, number>
  profitPerCurrency: Record<string, number>
  invoicesProcessed: number
}

export const getDashboardStats = cache(
  async (userId: string, filters: TransactionFilters = {}): Promise<DashboardStats> => {
    const where: Prisma.TransactionWhereInput = {}

    if (filters.dateFrom || filters.dateTo) {
      where.issuedAt = {
        gte: filters.dateFrom ? new Date(filters.dateFrom) : undefined,
        lte: filters.dateTo ? new Date(filters.dateTo) : undefined,
      }
    }

    const transactions = await prisma.transaction.findMany({ where: { ...where, userId } })
    const totalIncomePerCurrency = calcTotalPerCurrency(transactions.filter((t) => t.type === "income"))
    const totalExpensesPerCurrency = calcTotalPerCurrency(transactions.filter((t) => t.type === "expense"))
    const profitPerCurrency = Object.fromEntries(
      Object.keys(totalIncomePerCurrency).map((currency) => [
        currency,
        totalIncomePerCurrency[currency] - totalExpensesPerCurrency[currency],
      ])
    )
    const invoicesProcessed = transactions.length

    return {
      totalIncomePerCurrency,
      totalExpensesPerCurrency,
      profitPerCurrency,
      invoicesProcessed,
    }
  }
)

export type ProjectStats = {
  totalIncomePerCurrency: Record<string, number>
  totalExpensesPerCurrency: Record<string, number>
  profitPerCurrency: Record<string, number>
  invoicesProcessed: number
}

export const getProjectStats = cache(async (userId: string, projectId: string, filters: TransactionFilters = {}) => {
  const where: Prisma.TransactionWhereInput = {
    projectCode: projectId,
  }

  if (filters.dateFrom || filters.dateTo) {
    where.issuedAt = {
      gte: filters.dateFrom ? new Date(filters.dateFrom) : undefined,
      lte: filters.dateTo ? new Date(filters.dateTo) : undefined,
    }
  }

  const transactions = await prisma.transaction.findMany({ where: { ...where, userId } })
  const totalIncomePerCurrency = calcTotalPerCurrency(transactions.filter((t) => t.type === "income"))
  const totalExpensesPerCurrency = calcTotalPerCurrency(transactions.filter((t) => t.type === "expense"))
  const profitPerCurrency = Object.fromEntries(
    Object.keys(totalIncomePerCurrency).map((currency) => [
      currency,
      totalIncomePerCurrency[currency] - totalExpensesPerCurrency[currency],
    ])
  )

  const invoicesProcessed = transactions.length
  return {
    totalIncomePerCurrency,
    totalExpensesPerCurrency,
    profitPerCurrency,
    invoicesProcessed,
  }
})

export type TimeSeriesData = {
  period: string
  income: number
  expenses: number
  date: Date
}

export type CategoryBreakdown = {
  code: string
  name: string
  color: string
  income: number
  expenses: number
  transactionCount: number
}

export type DetailedTimeSeriesData = {
  period: string
  income: number
  expenses: number
  date: Date
  categories: CategoryBreakdown[]
  totalTransactions: number
}

export const getTimeSeriesStats = cache(
  async (
    userId: string,
    filters: TransactionFilters = {},
    defaultCurrency: string = "EUR"
  ): Promise<TimeSeriesData[]> => {
    const where: Prisma.TransactionWhereInput = { userId }

    if (filters.dateFrom || filters.dateTo) {
      where.issuedAt = {
        gte: filters.dateFrom ? new Date(filters.dateFrom) : undefined,
        lte: filters.dateTo ? new Date(filters.dateTo) : undefined,
      }
    }

    if (filters.categoryCode) {
      where.categoryCode = filters.categoryCode
    }

    if (filters.projectCode) {
      where.projectCode = filters.projectCode
    }

    if (filters.type) {
      where.type = filters.type
    }

    const transactions = await prisma.transaction.findMany({
      where,
      orderBy: { issuedAt: "asc" },
    })

    if (transactions.length === 0) {
      return []
    }

    // Determine if we should group by day or month
    const dateFrom = filters.dateFrom ? new Date(filters.dateFrom) : new Date(transactions[0].issuedAt!)
    const dateTo = filters.dateTo ? new Date(filters.dateTo) : new Date(transactions[transactions.length - 1].issuedAt!)
    const daysDiff = Math.ceil((dateTo.getTime() - dateFrom.getTime()) / (1000 * 60 * 60 * 24))
    const groupByDay = daysDiff <= 50

    // Group transactions by time period
    const grouped = transactions.reduce(
      (acc, transaction) => {
        if (!transaction.issuedAt) return acc

        const date = new Date(transaction.issuedAt)
        const period = groupByDay
          ? date.toISOString().split("T")[0] // YYYY-MM-DD
          : `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}` // YYYY-MM

        if (!acc[period]) {
          acc[period] = { period, income: 0, expenses: 0, date }
        }

        // Get amount in default currency
        const amount =
          transaction.convertedCurrencyCode?.toUpperCase() === defaultCurrency.toUpperCase()
            ? transaction.convertedTotal || 0
            : transaction.currencyCode?.toUpperCase() === defaultCurrency.toUpperCase()
              ? transaction.total || 0
              : 0 // Skip transactions not in default currency for simplicity

        if (transaction.type === "income") {
          acc[period].income += amount
        } else if (transaction.type === "expense") {
          acc[period].expenses += amount
        }

        return acc
      },
      {} as Record<string, TimeSeriesData>
    )

    return Object.values(grouped).sort((a, b) => a.date.getTime() - b.date.getTime())
  }
)

export const getDetailedTimeSeriesStats = cache(
  async (
    userId: string,
    filters: TransactionFilters = {},
    defaultCurrency: string = "EUR"
  ): Promise<DetailedTimeSeriesData[]> => {
    const where: Prisma.TransactionWhereInput = { userId }

    if (filters.dateFrom || filters.dateTo) {
      where.issuedAt = {
        gte: filters.dateFrom ? new Date(filters.dateFrom) : undefined,
        lte: filters.dateTo ? new Date(filters.dateTo) : undefined,
      }
    }

    if (filters.categoryCode) {
      where.categoryCode = filters.categoryCode
    }

    if (filters.projectCode) {
      where.projectCode = filters.projectCode
    }

    if (filters.type) {
      where.type = filters.type
    }

    const [transactions, categories] = await Promise.all([
      prisma.transaction.findMany({
        where,
        include: {
          category: true,
        },
        orderBy: { issuedAt: "asc" },
      }),
      prisma.category.findMany({
        where: { userId },
        orderBy: { name: "asc" },
      }),
    ])

    if (transactions.length === 0) {
      return []
    }

    // Determine if we should group by day or month
    const dateFrom = filters.dateFrom ? new Date(filters.dateFrom) : new Date(transactions[0].issuedAt!)
    const dateTo = filters.dateTo ? new Date(filters.dateTo) : new Date(transactions[transactions.length - 1].issuedAt!)
    const daysDiff = Math.ceil((dateTo.getTime() - dateFrom.getTime()) / (1000 * 60 * 60 * 24))
    const groupByDay = daysDiff <= 50

    // Create category lookup
    const categoryLookup = new Map(categories.map((cat) => [cat.code, cat]))

    // Group transactions by time period
    const grouped = transactions.reduce(
      (acc, transaction) => {
        if (!transaction.issuedAt) return acc

        const date = new Date(transaction.issuedAt)
        const period = groupByDay
          ? date.toISOString().split("T")[0] // YYYY-MM-DD
          : `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}` // YYYY-MM

        if (!acc[period]) {
          acc[period] = {
            period,
            income: 0,
            expenses: 0,
            date,
            categories: new Map<string, CategoryBreakdown>(),
            totalTransactions: 0,
          }
        }

        // Get amount in default currency
        const amount =
          transaction.convertedCurrencyCode?.toUpperCase() === defaultCurrency.toUpperCase()
            ? transaction.convertedTotal || 0
            : transaction.currencyCode?.toUpperCase() === defaultCurrency.toUpperCase()
              ? transaction.total || 0
              : 0 // Skip transactions not in default currency for simplicity

        const categoryCode = transaction.categoryCode || "other"
        const category = categoryLookup.get(categoryCode) || {
          code: "other",
          name: "Other",
          color: "#6b7280",
        }

        // Initialize category if not exists
        if (!acc[period].categories.has(categoryCode)) {
          acc[period].categories.set(categoryCode, {
            code: category.code,
            name: category.name,
            color: category.color || "#6b7280",
            income: 0,
            expenses: 0,
            transactionCount: 0,
          })
        }

        const categoryData = acc[period].categories.get(categoryCode)!
        categoryData.transactionCount++
        acc[period].totalTransactions++

        if (transaction.type === "income") {
          acc[period].income += amount
          categoryData.income += amount
        } else if (transaction.type === "expense") {
          acc[period].expenses += amount
          categoryData.expenses += amount
        }

        return acc
      },
      {} as Record<
        string,
        {
          period: string
          income: number
          expenses: number
          date: Date
          categories: Map<string, CategoryBreakdown>
          totalTransactions: number
        }
      >
    )

    return Object.values(grouped)
      .map((item) => ({
        ...item,
        categories: Array.from(item.categories.values()).filter((cat) => cat.income > 0 || cat.expenses > 0),
      }))
      .sort((a, b) => a.date.getTime() - b.date.getTime())
  }
)

export const getCategoryBreakdown = cache(async (userId: string) => {
  const startDate = startOfMonth(new Date())
  const endDate = endOfMonth(new Date())

  const transactions = await prisma.transaction.findMany({
    where: {
      userId,
      type: "expense",
      issuedAt: {
        gte: startDate,
        lte: endDate,
      },
    },
    include: {
      category: true,
    },
  })

  const grouped = transactions.reduce(
    (acc, transaction) => {
      const key = transaction.categoryCode || "others"
      if (!acc[key]) {
        acc[key] = {
          categoryCode: key,
          categoryName: transaction.category?.name || "Others",
          amount: 0,
        }
      }

      acc[key].amount += transaction.total || 0
      return acc
    },
    {} as Record<string, { categoryCode: string; categoryName: string; amount: number }>
  )

  return Object.values(grouped).sort((a, b) => b.amount - a.amount)
})

export const getMonthlyComparison = cache(async (userId: string) => {
  const now = new Date()
  const currentStart = startOfMonth(now)
  const currentEnd = endOfMonth(now)
  const previousStart = startOfMonth(subMonths(now, 1))
  const previousEnd = endOfMonth(subMonths(now, 1))

  const [currentMonthExpenses, previousMonthExpenses, monthlyExpenseSeries] = await Promise.all([
    prisma.transaction.aggregate({
      where: {
        userId,
        type: "expense",
        issuedAt: {
          gte: currentStart,
          lte: currentEnd,
        },
      },
      _sum: {
        total: true,
      },
    }),
    prisma.transaction.aggregate({
      where: {
        userId,
        type: "expense",
        issuedAt: {
          gte: previousStart,
          lte: previousEnd,
        },
      },
      _sum: {
        total: true,
      },
    }),
    prisma.transaction.findMany({
      where: {
        userId,
        type: "expense",
        issuedAt: {
          gte: startOfMonth(subMonths(now, 5)),
          lte: currentEnd,
        },
      },
      select: {
        total: true,
        issuedAt: true,
      },
    }),
  ])

  const seriesMap = monthlyExpenseSeries.reduce(
    (acc, transaction) => {
      if (!transaction.issuedAt) return acc
      const monthKey = format(transaction.issuedAt, "MMM")
      acc[monthKey] = (acc[monthKey] || 0) + (transaction.total || 0)
      return acc
    },
    {} as Record<string, number>
  )

  const monthlySeries = Object.entries(seriesMap).map(([month, amount]) => ({ month, amount }))

  return {
    currentMonthExpenses: currentMonthExpenses._sum.total || 0,
    previousMonthExpenses: previousMonthExpenses._sum.total || 0,
    monthlySeries,
  }
})

export const getDashboardSummary = cache(async (userId: string) => {
  const now = new Date()
  const [categoryBreakdown, comparison, gstRows] = await Promise.all([
    getCategoryBreakdown(userId),
    getMonthlyComparison(userId),
    prisma.transaction.findMany({
      where: {
        userId,
        type: "expense",
        issuedAt: {
          gte: startOfMonth(now),
          lte: endOfMonth(now),
        },
        gstAmount: {
          not: null,
        },
      },
      select: {
        gstPercentage: true,
        gstAmount: true,
      },
    }),
  ])
  const delta = comparison.currentMonthExpenses - comparison.previousMonthExpenses
  const deltaPercent =
    comparison.previousMonthExpenses > 0
      ? Math.round((delta / comparison.previousMonthExpenses) * 100)
      : comparison.currentMonthExpenses > 0
        ? 100
        : 0

  const highestCategory = categoryBreakdown[0]
  const insights: string[] = []

  if (delta > 0) {
    insights.push(`You spent ${deltaPercent}% more than last month.`)
  } else if (delta < 0) {
    insights.push(`Great job. You spent ${Math.abs(deltaPercent)}% less than last month.`)
  } else {
    insights.push("Your spending is stable compared to last month.")
  }

  if (highestCategory) {
    insights.push(`${highestCategory.categoryName} expenses are highest this month.`)
  }

  const gstBreakdown = gstRows.reduce(
    (acc, row) => {
      const key = row.gstPercentage || 0
      acc[key] = (acc[key] || 0) + (row.gstAmount || 0)
      return acc
    },
    {} as Record<number, number>
  )

  return {
    ...comparison,
    categoryBreakdown,
    gstBreakdown,
    insights,
  }
})
