import { Link } from 'react-router-dom'
import { ArrowRight, Building2, Clock, MapPin } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-b from-primary-950 to-primary-900 text-white overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 right-0 w-[36rem] h-[36rem] bg-primary-700/30 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary-300 mb-6">
            Corporate Rental Services · Norway
          </p>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Housing for Your Team in Norway.
            <span className="block text-primary-300">Sourced, Negotiated, Managed.</span>
          </h1>

          <p className="text-xl text-primary-100 mb-8 max-w-2xl">
            Nordic Rent secures rental apartments for companies relocating employees to Norway.
            We handle the search, landlord negotiations, and contracts — in Norwegian — so your
            team can focus on the work that brought them here.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-primary-900 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
            >
              Request a Consultation
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center justify-center px-6 py-3 border border-white/30 text-white rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              Explore Our Services
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/15">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">50+</p>
                <p className="text-sm text-primary-300">Companies Served</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">4</p>
                <p className="text-sm text-primary-300">Major Cities Covered</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">24h</p>
                <p className="text-sm text-primary-300">Response Time</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
