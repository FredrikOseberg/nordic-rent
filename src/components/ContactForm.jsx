import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Send, AlertCircle, Loader2 } from 'lucide-react'
import { INQUIRIES_ENDPOINT } from '../config/api'

export default function ContactForm() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    location: '',
    apartments: '',
    message: '',
    _gotcha: ''
  })
  const [formState, setFormState] = useState({
    status: 'idle', // 'idle' | 'submitting' | 'success' | 'error'
    errorMessage: null
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormState({ status: 'submitting', errorMessage: null })

    try {
      const response = await fetch(INQUIRIES_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        navigate('/thank-you')
      } else {
        throw new Error('Submission failed')
      }
    } catch {
      setFormState({
        status: 'error',
        errorMessage: 'Something went wrong. Please try again or email us directly.'
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Honeypot field for spam protection */}
      <input
        type="text"
        name="_gotcha"
        value={formData._gotcha}
        onChange={handleChange}
        style={{ display: 'none' }}
        tabIndex={-1}
        autoComplete="off"
      />

      {formState.status === 'error' && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-red-800">{formState.errorMessage}</p>
            <a
              href="mailto:hello@nordicrent.no"
              className="text-red-600 underline hover:text-red-700 text-sm"
            >
              hello@nordicrent.no
            </a>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
            First Name *
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-shadow"
            placeholder="John"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
            Last Name *
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-shadow"
            placeholder="Doe"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email Address *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-shadow"
          placeholder="john@company.com"
        />
      </div>

      <div>
        <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
          Company Name *
        </label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-shadow"
          placeholder="Acme Inc."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
            Preferred Location in Norway
          </label>
          <select
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-shadow bg-white"
          >
            <option value="">Select a city</option>
            <option value="oslo">Oslo</option>
            <option value="bergen">Bergen</option>
            <option value="trondheim">Trondheim</option>
            <option value="stavanger">Stavanger</option>
            <option value="other">Other / Not sure</option>
          </select>
        </div>
        <div>
          <label htmlFor="apartments" className="block text-sm font-medium text-gray-700 mb-2">
            Apartments Needed
          </label>
          <select
            id="apartments"
            name="apartments"
            value={formData.apartments}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-shadow bg-white"
          >
            <option value="">Select an amount</option>
            <option value="1">1 apartment</option>
            <option value="2-5">2–5 apartments</option>
            <option value="6+">6 or more apartments</option>
            <option value="unsure">Not sure yet</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
          Tell us about your requirements *
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-shadow resize-none"
          placeholder="Who is relocating and when? Include apartment sizes, budget range per unit, move-in dates, and any other preferences..."
        />
      </div>

      <button
        type="submit"
        disabled={formState.status === 'submitting'}
        className="w-full md:w-auto px-8 py-4 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {formState.status === 'submitting' ? (
          <>
            Sending...
            <Loader2 className="ml-2 w-5 h-5 animate-spin" />
          </>
        ) : (
          <>
            Send Inquiry
            <Send className="ml-2 w-5 h-5" />
          </>
        )}
      </button>
    </form>
  )
}
