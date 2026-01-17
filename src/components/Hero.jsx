import { Link } from 'react-router-dom'
import { ArrowRight, Building2, Shield, Users } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Find Your Norwegian Home.
            <span className="block text-primary-200">We Handle the Rest.</span>
          </h1>

          <p className="text-xl text-primary-100 mb-8 max-w-2xl">
            Relocating your business to Norway? We find and secure rental apartments for foreign companies, handling all landlord communications so you can focus on what matters most.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-primary-800 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
            >
              Get Started
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-white/30 text-white rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              Learn How It Works
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/20">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">50+</p>
                <p className="text-sm text-primary-200">Businesses Helped</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">100%</p>
                <p className="text-sm text-primary-200">Satisfaction Rate</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">Local</p>
                <p className="text-sm text-primary-200">Norwegian Experts</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
