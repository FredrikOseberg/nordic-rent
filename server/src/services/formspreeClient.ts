import type { InquiryInput } from '../domain/inquiry.js'

export interface FormspreeClient {
  send(input: InquiryInput): Promise<void>
}

export class HttpFormspreeClient implements FormspreeClient {
  constructor(private readonly endpoint: string) {}

  async send(input: InquiryInput): Promise<void> {
    const response = await fetch(this.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(input),
    })
    if (!response.ok) {
      throw new Error(`Formspree responded with status ${response.status}`)
    }
  }
}
