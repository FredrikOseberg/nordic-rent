import { Link } from 'react-router-dom'
import { Search, FileCheck, Users, Key, ArrowRight } from 'lucide-react'

const services = [
  {
    icon: Search,
    title: 'Apartment Search',
    description: 'We search all major Norwegian rental platforms and leverage our local network to find properties that match your exact requirements.',
  },
  {
    icon: Users,
    title: 'Landlord Communications',
    description: 'All communications with landlords are handled in Norwegian by our local team, ensuring nothing gets lost in translation.',
  },
  {
    icon: FileCheck,
    title: 'Contract Review',
    description: 'We review rental contracts for you, explaining Norwegian rental laws and ensuring fair terms before you sign.',
  },
  {
    icon: Key,
    title: 'Move-In Coordination',
    description: 'From scheduling key handover to coordinating with property managers, we make your move-in process seamless.',
  },
]

export default function Services() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to secure rental accommodation in Norway, handled by local experts who understand the market.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {services.map((service) => (
            <div
              key={service.title}
              className="group p-8 bg-gray-50 rounded-xl hover:bg-primary-50 transition-colors"
            >
              <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary-200 transition-colors">
                <service.icon className="w-7 h-7 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/services"
            className="inline-flex items-center text-primary-600 font-semibold hover:text-primary-700 transition-colors"
          >
            View all services
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
