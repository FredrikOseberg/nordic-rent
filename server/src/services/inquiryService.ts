import type { InquiryInput, StoredInquiry, SubmissionMeta } from '../domain/inquiry.js'
import type { FormspreeClient } from './formspreeClient.js'
import type { InquiryStore } from '../stores/inquiryStore.js'

export interface SubmissionResult {
  id: string
  referenceId: string
}

export interface InquiryService {
  submit(input: InquiryInput, meta: SubmissionMeta): Promise<SubmissionResult>
}

export interface InquiryServiceDeps {
  store: InquiryStore
  formspree: FormspreeClient
  dailyForwardCap?: number
}

const DEFAULT_DAILY_FORWARD_CAP = 100

export function createInquiryService({
  store,
  formspree,
  dailyForwardCap = DEFAULT_DAILY_FORWARD_CAP,
}: InquiryServiceDeps): InquiryService {
  async function submit(input: InquiryInput, meta: SubmissionMeta): Promise<SubmissionResult> {
    if (meta.honeypotTripped) {
      // Silent success: the bot sees a normal response, we keep the record.
      const spam = await store.insert(input, meta, { isSpam: true, formspreeStatus: 'skipped' })
      return toResult(spam)
    }

    const stored = await store.insert(input, meta, { isSpam: false, formspreeStatus: 'pending' })

    if (await dailyCapReached()) {
      await store.setFormspreeStatus(stored.id, 'skipped')
      return toResult(stored)
    }

    try {
      await formspree.send(input)
      await store.setFormspreeStatus(stored.id, 'sent')
    } catch {
      // Store-and-flag: the lead is already saved, email delivery can be retried manually.
      await store.setFormspreeStatus(stored.id, 'failed')
    }
    return toResult(stored)
  }

  async function dailyCapReached(): Promise<boolean> {
    const forwardedToday = await store.countForwardedSince(startOfTodayUtc())
    return forwardedToday >= dailyForwardCap
  }

  return { submit }
}

function toResult(inquiry: StoredInquiry): SubmissionResult {
  return {
    id: inquiry.id,
    referenceId: `NR-${inquiry.id.slice(0, 8).toUpperCase()}`,
  }
}

function startOfTodayUtc(): Date {
  const now = new Date()
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()))
}
