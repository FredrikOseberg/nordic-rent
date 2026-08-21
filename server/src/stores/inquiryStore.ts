import type pg from 'pg'
import type {
  FormspreeStatus,
  InquiryInput,
  StoredInquiry,
  SubmissionMeta,
} from '../domain/inquiry.js'

export interface InsertOptions {
  isSpam: boolean
  formspreeStatus: FormspreeStatus
}

export interface InquiryStore {
  insert(input: InquiryInput, meta: SubmissionMeta, options: InsertOptions): Promise<StoredInquiry>
  setFormspreeStatus(id: string, status: FormspreeStatus): Promise<void>
  countForwardedSince(since: Date): Promise<number>
}

export class PgInquiryStore implements InquiryStore {
  constructor(private readonly pool: pg.Pool) {}

  async insert(
    input: InquiryInput,
    meta: SubmissionMeta,
    options: InsertOptions
  ): Promise<StoredInquiry> {
    const result = await this.pool.query(
      `INSERT INTO inquiries
         (first_name, last_name, email, company, location, apartments, message,
          source, user_agent, ip, is_spam, formspree_status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
       RETURNING *`,
      [
        input.firstName,
        input.lastName,
        input.email,
        input.company,
        input.location ?? null,
        input.apartments ?? null,
        input.message,
        meta.source,
        meta.userAgent ?? null,
        meta.ip ?? null,
        options.isSpam,
        options.formspreeStatus,
      ]
    )
    return rowToInquiry(result.rows[0])
  }

  async setFormspreeStatus(id: string, status: FormspreeStatus): Promise<void> {
    await this.pool.query('UPDATE inquiries SET formspree_status = $2 WHERE id = $1', [id, status])
  }

  async countForwardedSince(since: Date): Promise<number> {
    const result = await this.pool.query(
      `SELECT count(*)::int AS count
       FROM inquiries
       WHERE formspree_status = 'sent' AND created_at >= $1`,
      [since]
    )
    return result.rows[0].count
  }
}

function rowToInquiry(row: Record<string, unknown>): StoredInquiry {
  return {
    id: row.id as string,
    firstName: row.first_name as string,
    lastName: row.last_name as string,
    email: row.email as string,
    company: row.company as string,
    location: (row.location as StoredInquiry['location']) ?? undefined,
    apartments: (row.apartments as StoredInquiry['apartments']) ?? undefined,
    message: row.message as string,
    source: row.source as StoredInquiry['source'],
    userAgent: row.user_agent as string | null,
    ip: row.ip as string | null,
    isSpam: row.is_spam as boolean,
    formspreeStatus: row.formspree_status as FormspreeStatus,
    createdAt: row.created_at as Date,
  }
}
