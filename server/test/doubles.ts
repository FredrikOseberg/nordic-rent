import { randomUUID } from 'node:crypto'
import type {
  FormspreeStatus,
  InquiryInput,
  StoredInquiry,
  SubmissionMeta,
} from '../src/domain/inquiry.js'
import type { FormspreeClient } from '../src/services/formspreeClient.js'
import type { InquiryStore, InsertOptions } from '../src/stores/inquiryStore.js'

export class InMemoryInquiryStore implements InquiryStore {
  readonly inquiries: StoredInquiry[] = []

  async insert(
    input: InquiryInput,
    meta: SubmissionMeta,
    options: InsertOptions
  ): Promise<StoredInquiry> {
    const inquiry: StoredInquiry = {
      ...input,
      id: randomUUID(),
      source: meta.source,
      userAgent: meta.userAgent ?? null,
      ip: meta.ip ?? null,
      isSpam: options.isSpam,
      formspreeStatus: options.formspreeStatus,
      createdAt: new Date(),
    }
    this.inquiries.push(inquiry)
    return inquiry
  }

  async setFormspreeStatus(id: string, status: FormspreeStatus): Promise<void> {
    const inquiry = this.inquiries.find((candidate) => candidate.id === id)
    if (!inquiry) throw new Error(`no inquiry with id ${id}`)
    inquiry.formspreeStatus = status
  }

  async countForwardedSince(since: Date): Promise<number> {
    return this.inquiries.filter(
      (inquiry) => inquiry.formspreeStatus === 'sent' && inquiry.createdAt >= since
    ).length
  }
}

export class FakeFormspreeClient implements FormspreeClient {
  readonly sent: InquiryInput[] = []

  constructor(private readonly failWith?: Error) {}

  async send(input: InquiryInput): Promise<void> {
    if (this.failWith) throw this.failWith
    this.sent.push(input)
  }
}
