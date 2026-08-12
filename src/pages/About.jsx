import { Link } from 'react-router-dom'
import { Target, Heart, Eye, ArrowRight, MapPin, Award, Users } from 'lucide-react'

const values = [
  {
    icon: Target,
    title: 'Client-Focused',
    description: 'Your success is our priority. We don\'t rest until you\'ve found your perfect Norwegian home.',
  },
  {
    icon: Heart,
    title: 'Trust & Transparency',
    description: 'No hidden fees, no surprises. We communicate openly at every step of the process.',
  },
  {
    icon: Eye,
    title: 'Local Expertise',
    description: 'Our team lives and breathes the Norwegian rental market. We know what works.',
  },
]

const stats = [
  { number: '50+', label: 'Companies Served' },
  { number: '4', label: 'Major Cities Covered' },
  { number: '2–4 wks', label: 'Typical Search Time' },
  { number: '24h', label: 'Response Time' },
]

export default function About() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About Nordic Rent
            </h1>
            <p className="text-xl text-primary-100">
              We bridge the gap between international companies and the Norwegian rental market.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="prose prose-lg text-gray-600">
                <p className="mb-4">
                  Nordic Rent was founded with a simple mission: to make securing rental accommodation in Norway as straightforward for international companies as it is for locals.
                </p>
                <p className="mb-4">
                  We've seen firsthand how challenging it can be for international companies to navigate the Norwegian rental market. Language barriers, unfamiliar regulations, and the complexities of remote apartment hunting can turn what should be an exciting relocation into a stressful ordeal.
                </p>
                <p>
                  That's why we built Nordic Rent. Our team of local experts handles everything from search to move-in, letting you focus on what you do best: growing your business in one of the world's most innovative countries.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl p-12 aspect-square flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-24 h-24 text-primary-600 mx-auto mb-4" />
                <p className="text-primary-800 font-semibold text-xl">Based in Oslo, Norway</p>
                <p className="text-primary-600">Serving businesses worldwide</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These principles guide everything we do at Nordic Rent.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-white rounded-xl p-8 text-center border border-gray-200 shadow-sm"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-primary-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Nordic Rent by the Numbers
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</p>
                <p className="text-primary-200">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Norway Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl p-12 text-white">
              <Award className="w-16 h-16 mb-6" />
              <h3 className="text-2xl font-bold mb-4">Why Norway?</h3>
              <ul className="space-y-3 text-primary-100">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-white rounded-full mr-3" />
                  Ranked #1 in quality of life
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-white rounded-full mr-3" />
                  Thriving tech and energy sectors
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-white rounded-full mr-3" />
                  Strong employee protections
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-white rounded-full mr-3" />
                  Gateway to Nordic markets
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-white rounded-full mr-3" />
                  English widely spoken
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Your Partner in Norwegian Expansion
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Norway offers incredible opportunities for international businesses. From its stable economy to its highly educated workforce, it's no wonder companies worldwide are choosing to establish a presence here.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                At Nordic Rent, we're proud to be part of your Norwegian journey. By handling the housing side of relocation, we let you focus on building your business in this remarkable country.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
              >
                Start Your Journey
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
