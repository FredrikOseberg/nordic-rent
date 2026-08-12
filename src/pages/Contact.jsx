import { Link } from 'react-router-dom'
import ContactForm from '../components/ContactForm'
import { MapPin, Clock } from 'lucide-react'

const contactInfo = [
  {
    icon: MapPin,
    title: 'Location',
    value: 'Oslo, Norway',
    link: null,
  },
  {
    icon: Clock,
    title: 'Response Time',
    value: 'Within 24 hours',
    link: null,
  },
]

export default function Contact() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-primary-100">
              Tell us about your company's relocation plans and we'll respond within 24 hours with a proposed way forward.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Contact Information
              </h2>
              <div className="space-y-6">
                {contactInfo.map((item) => (
                  <div key={item.title} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center shrink-0">
                      <item.icon className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{item.title}</p>
                      {item.link ? (
                        <a
                          href={item.link}
                          className="text-primary-600 hover:text-primary-700 transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-gray-600">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 p-6 bg-primary-50 rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-3">What happens next?</h3>
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
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-gray-50 rounded-xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Send Us Your Requirements
                </h2>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Mini Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Have Questions?
          </h2>
          <p className="text-gray-600 mb-6">
            Check out our services page for detailed information about what we offer and frequently asked questions.
          </p>
          <Link
            to="/services"
            className="text-primary-600 font-semibold hover:text-primary-700 transition-colors"
          >
            View Services & FAQ →
          </Link>
        </div>
      </section>
    </div>
  )
}
