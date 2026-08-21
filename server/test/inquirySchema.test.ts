import { describe, expect, it } from 'vitest'
import { inquiryInputSchema, inquiryRequestSchema } from '../src/domain/inquiry.js'

const validInput = {
  firstName: 'Kari',
  lastName: 'Nordmann',
  email: 'kari@acme.com',
  company: 'Acme Inc.',
  location: 'oslo',
  apartments: '2-5',
  message: 'Relocating 3 engineers to Oslo in March.',
}

describe('inquiryInputSchema', () => {
  it('accepts a fully valid inquiry', () => {
    const result = inquiryInputSchema.safeParse(validInput)
    expect(result.success).toBe(true)
  })

  it('accepts an inquiry without the optional selects', () => {
    const { location, apartments, ...rest } = validInput
    const result = inquiryInputSchema.safeParse(rest)
    expect(result.success).toBe(true)
  })

  it.each(['firstName', 'lastName', 'email', 'company', 'message'])(
    'rejects when required field %s is missing',
    (field) => {
      const { [field as keyof typeof validInput]: _omitted, ...rest } = validInput
      expect(inquiryInputSchema.safeParse(rest).success).toBe(false)
    }
  )

  it('rejects an invalid email', () => {
    const result = inquiryInputSchema.safeParse({ ...validInput, email: 'not-an-email' })
    expect(result.success).toBe(false)
  })

  it('rejects whitespace-only required fields', () => {
    const result = inquiryInputSchema.safeParse({ ...validInput, firstName: '   ' })
    expect(result.success).toBe(false)
  })

  it('trims surrounding whitespace', () => {
    const result = inquiryInputSchema.parse({ ...validInput, firstName: '  Kari  ' })
    expect(result.firstName).toBe('Kari')
  })

  it('rejects unknown enum values', () => {
    expect(inquiryInputSchema.safeParse({ ...validInput, location: 'tromsø' }).success).toBe(false)
    expect(inquiryInputSchema.safeParse({ ...validInput, apartments: '100' }).success).toBe(false)
  })

  it('rejects messages over the maximum length', () => {
    const result = inquiryInputSchema.safeParse({ ...validInput, message: 'x'.repeat(5001) })
    expect(result.success).toBe(false)
  })
})

describe('inquiryRequestSchema', () => {
  it('coerces empty-string selects to undefined (unselected web form dropdowns)', () => {
    const result = inquiryRequestSchema.parse({ ...validInput, location: '', apartments: '' })
    expect(result.location).toBeUndefined()
    expect(result.apartments).toBeUndefined()
  })

  it('passes the honeypot field through', () => {
    const result = inquiryRequestSchema.parse({ ...validInput, _gotcha: 'I am a bot' })
    expect(result._gotcha).toBe('I am a bot')
  })

  it('accepts a request without the honeypot field', () => {
    const result = inquiryRequestSchema.parse(validInput)
    expect(result._gotcha).toBeUndefined()
  })
})
