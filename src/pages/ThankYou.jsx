import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle, ArrowRight } from 'lucide-react'

export default function ThankYou() {
  useEffect(() => {
    // Explicit conversion event so tracking doesn't depend on
    // GA4 enhanced measurement picking up the SPA route change
    window.gtag?.('event', 'generate_lead', {
      event_category: 'contact',
      event_label: 'contact_form_submission',
    })
  }, [])

  return (
    <section className="py-24 bg-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="w-20 h-20 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircle className="w-10 h-10 text-primary-600" />
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Thank You — Inquiry Received
        </h1>
        <p className="text-lg text-gray-600 mb-10">
          We've received your inquiry and will get back to you within 24 hours
          with a proposed way forward.
        </p>

        <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-left mb-10">
          <h2 className="font-semibold text-gray-900 mb-4">What happens next?</h2>
          <ol className="space-y-3 text-gray-600">
            <li className="flex items-start">
              <span className="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-medium mr-3 shrink-0">1</span>
              <span>We review your requirements</span>
            </li>
            <li className="flex items-start">
              <span className="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-medium mr-3 shrink-0">2</span>
              <span>We schedule a brief call to discuss details</span>
            </li>
            <li className="flex items-start">
              <span className="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-medium mr-3 shrink-0">3</span>
              <span>We create a personalized search plan</span>
            </li>
          </ol>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/services"
            className="inline-flex items-center justify-center px-6 py-3 bg-primary-800 text-white rounded-lg font-semibold hover:bg-primary-900 transition-colors"
          >
            Explore Our Services
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
          <Link
            to="/"
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-gray-400 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  )
}
