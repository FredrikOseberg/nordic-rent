import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function ContactCTA() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Ready to Find Your Norwegian Home?
        </h2>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Tell us about your requirements and let our local experts handle the rest.
          We'll get back to you within 24 hours.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/contact"
            className="inline-flex items-center justify-center px-8 py-4 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            Get Started Today
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
          <a
            href="mailto:hello@nordicrent.no"
            className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-gray-400 transition-colors"
          >
            Email Us Directly
          </a>
        </div>
      </div>
    </section>
  )
}
