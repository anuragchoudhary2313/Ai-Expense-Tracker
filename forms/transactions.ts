import { z } from "zod"

export const transactionFormSchema = z
  .object({
    name: z.string().max(128).optional(),
    merchant: z.string().max(128).optional(),
    description: z.string().max(256).optional(),
    type: z.string().optional(),
    total: z
      .string()
      .optional()
      .transform((val) => {
        if (!val || val.trim() === '') return null
        const num = parseFloat(val)
        if (isNaN(num)) {
          throw new z.ZodError([{ message: "Invalid total", path: ["total"], code: z.ZodIssueCode.custom }])
        }
        return Math.round(num * 100) // convert to cents
      }),
    currencyCode: z.string().max(5).optional(),
    convertedTotal: z
      .string()
      .optional()
      .transform((val) => {
        if (!val || val.trim() === '') return null
        const num = parseFloat(val)
        if (isNaN(num)) {
          throw new z.ZodError([
            { message: "Invalid coverted total", path: ["convertedTotal"], code: z.ZodIssueCode.custom },
          ])
        }
        return Math.round(num * 100) // convert to cents
      }),
    convertedCurrencyCode: z.string().max(5).optional(),
    gstPercentage: z
      .string()
      .optional()
      .transform((val) => {
        if (!val || val.trim() === "") return null
        const num = Number.parseInt(val, 10)
        if (Number.isNaN(num)) {
          throw new z.ZodError([
            { message: "Invalid GST percentage", path: ["gstPercentage"], code: z.ZodIssueCode.custom },
          ])
        }
        return num
      }),
    gstAmount: z
      .string()
      .optional()
      .transform((val) => {
        if (!val || val.trim() === "") return null
        const num = Number.parseFloat(val)
        if (Number.isNaN(num)) {
          throw new z.ZodError([{ message: "Invalid GST amount", path: ["gstAmount"], code: z.ZodIssueCode.custom }])
        }
        return Math.round(num * 100)
      }),
    paymentMethod: z.string().optional(),
    categoryCode: z.string().optional(),
    projectCode: z.string().optional(),
    issuedAt: z
      .union([
        z.date(),
        z
          .string()
          .refine((val) => !isNaN(Date.parse(val)), {
            message: "Invalid date format",
          })
          .transform((val) => new Date(val)),
      ])
      .optional(),
    text: z.string().optional(),
    note: z.string().optional(),
    items: z
      .string()
      .optional()
      .transform((val) => {
        if (!val || val.trim() === '') return []
        try {
          return JSON.parse(val)
        } catch (e) {
          throw new z.ZodError([{ message: "Invalid items JSON", path: ["items"], code: z.ZodIssueCode.custom }])
        }
      }),
  })
  .catchall(z.string())
