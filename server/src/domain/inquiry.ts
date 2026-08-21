import { z } from 'zod'

const locationEnum = z.enum(['oslo', 'bergen', 'trondheim', 'stavanger', 'other'])
const apartmentsEnum = z.enum(['1', '2-5', '6+', 'unsure'])

/**
 * The trusted domain contract, shared by every entry point (web form, plain
 * HTTP API, MCP tool). Mirrors the seven fields of the website contact form.
 */
export const inquiryInputSchema = z.object({
  firstName: z.string().trim().min(1).max(100),
  lastName: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(254),
  company: z.string().trim().min(1).max(200),
  location: locationEnum.optional(),
  apartments: apartmentsEnum.optional(),
  message: z.string().trim().min(1).max(5000),
})

export type InquiryInput = z.infer<typeof inquiryInputSchema>

/**
 * The raw HTTP request body: the website form sends '' for unselected
 * dropdowns and includes the honeypot field, so both are handled here —
 * at the boundary — before anything reaches the domain.
 */
export const inquiryRequestSchema = inquiryInputSchema.extend({
  location: emptyStringAsUndefined(locationEnum),
  apartments: emptyStringAsUndefined(apartmentsEnum),
  _gotcha: z.string().max(200).optional(),
})

function emptyStringAsUndefined<Schema extends z.ZodTypeAny>(schema: Schema) {
  return z.preprocess((value) => (value === '' ? undefined : value), schema.optional())
}

export type InquirySource = 'web' | 'mcp' | 'api'
export type FormspreeStatus = 'pending' | 'sent' | 'failed' | 'skipped'

export interface SubmissionMeta {
  source: InquirySource
  userAgent?: string
  ip?: string
  honeypotTripped: boolean
}

export interface StoredInquiry extends InquiryInput {
  id: string
  source: InquirySource
  userAgent: string | null
  ip: string | null
  isSpam: boolean
  formspreeStatus: FormspreeStatus
  createdAt: Date
}
