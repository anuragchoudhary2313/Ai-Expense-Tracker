const CATEGORY_RULES: Array<{ categoryCode: string; keywords: string[] }> = [
  { categoryCode: "travel", keywords: ["uber", "ola", "rapido", "metro", "train", "flight", "air india"] },
  { categoryCode: "food", keywords: ["zomato", "swiggy", "restaurant", "cafe", "coffee", "food"] },
  {
    categoryCode: "bills",
    keywords: ["electricity", "water bill", "internet", "broadband", "recharge", "utility", "bill"],
  },
  { categoryCode: "shopping", keywords: ["amazon", "flipkart", "myntra", "shopping", "store", "mall"] },
]

const UPI_KEYWORDS = ["upi", "paytm", "gpay", "google pay", "phonepe", "bhim", "upi ref"]
const CARD_KEYWORDS = ["visa", "mastercard", "amex", "credit card", "debit card", "card payment", "pos"]
const CASH_KEYWORDS = ["cash", "cash paid", "paid in cash"]

const GST_PERCENTAGES = [28, 18, 12, 5]

export function detectCategoryCode(text: string): string {
  const normalized = text.toLowerCase()

  for (const rule of CATEGORY_RULES) {
    if (rule.keywords.some((keyword) => normalized.includes(keyword))) {
      return rule.categoryCode
    }
  }

  return "others"
}

export function detectPaymentMethod(text: string): string {
  const normalized = text.toLowerCase()

  if (UPI_KEYWORDS.some((keyword) => normalized.includes(keyword))) {
    return "UPI"
  }

  if (CARD_KEYWORDS.some((keyword) => normalized.includes(keyword))) {
    return "Card"
  }

  if (CASH_KEYWORDS.some((keyword) => normalized.includes(keyword))) {
    return "Cash"
  }

  return "Card"
}

export function detectGstPercentage(text: string): number | null {
  const normalized = text.toLowerCase()

  for (const percent of GST_PERCENTAGES) {
    const hasMatch =
      normalized.includes(`gst ${percent}%`) ||
      normalized.includes(`gst@${percent}%`) ||
      normalized.includes(`${percent}% gst`) ||
      normalized.includes(`cgst ${percent / 2}%`) ||
      normalized.includes(`igst ${percent}%`)

    if (hasMatch) {
      return percent
    }
  }

  return null
}

export function detectGstAmount(text: string): number | null {
  const patterns = [
    /(?:total\s+)?gst\s*(?:amt|amount)?\s*[:\-]?\s*(?:inr|rs\.?|₹)?\s*([0-9]+(?:\.[0-9]{1,2})?)/i,
    /(?:cgst|sgst|igst)\s*[:\-]?\s*(?:inr|rs\.?|₹)?\s*([0-9]+(?:\.[0-9]{1,2})?)/i,
  ]

  for (const pattern of patterns) {
    const match = text.match(pattern)
    if (match?.[1]) {
      const value = Number.parseFloat(match[1])
      if (Number.isFinite(value)) {
        return Math.round(value * 100)
      }
    }
  }

  return null
}

export function buildDetectionText(input: {
  name?: string | null
  merchant?: string | null
  description?: string | null
  text?: string | null
}): string {
  return [input.name, input.merchant, input.description, input.text].filter(Boolean).join(" ")
}
