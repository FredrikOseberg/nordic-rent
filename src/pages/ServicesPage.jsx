import { Link } from 'react-router-dom'
import { Search, Users, FileCheck, Key, Video, Shield, Clock, HelpCircle, ArrowRight } from 'lucide-react'

const services = [
  {
    icon: Search,
    title: 'Comprehensive Apartment Search',
    description: 'We search across all major Norwegian rental platforms including Finn.no, Hybel.no, and our network of local property contacts.',
    features: [
      'Search across all major platforms',
      'Access to unlisted properties',
      'Personalized shortlist based on your criteria',
      'Weekly progress reports',
    ],
  },
  {
    icon: Users,
    title: 'Landlord Communication',
    description: 'Our bilingual team handles all communications with landlords in Norwegian, ensuring nothing is lost in translation.',
    features: [
      'Native Norwegian speakers',
      'Cultural context and etiquette',
      'Negotiation on your behalf',
      'Quick response times',
    ],
  },
  {
    icon: Video,
    title: 'Virtual Viewings',
    description: 'Can\'t visit in person? We conduct detailed video walkthroughs of shortlisted apartments on your behalf.',
    features: [
      'HD video tours',
      'Live Q&A sessions',
      'Detailed neighborhood overview',
      'Photos of all rooms and amenities',
    ],
  },
  {
    icon: FileCheck,
    title: 'Contract Review & Translation',
    description: 'We review all rental contracts, explain key terms, and ensure compliance with Norwegian rental law.',
    features: [
      'Full contract translation',
      'Norwegian law compliance check',
      'Term negotiation support',
      'Red flag identification',
    ],
  },
  {
    icon: Key,
    title: 'Move-In Coordination',
    description: 'From scheduling key collection to coordinating with property managers, we ensure a smooth transition.',
    features: [
      'Key handover scheduling',
      'Property condition documentation',
      'Utility setup guidance',
      'Local registration assistance',
    ],
  },
  {
    icon: Shield,
    title: 'Ongoing Support',
    description: 'Our service doesn\'t end at move-in. We\'re here to help with any landlord communications during your tenancy.',
    features: [
      'Post-move-in check-ins',
      'Maintenance request assistance',
      'Lease renewal support',
      'Move-out coordination',
    ],
  },
]

const faqs = [
  {
    question: 'How long does it typically take to find an apartment?',
    answer: 'Most clients find a suitable apartment within 2-4 weeks, depending on requirements and market availability. Urgent requests can often be accommodated faster.',
  },
  {
    question: 'What cities do you operate in?',
    answer: 'We primarily serve Oslo, Bergen, Trondheim, and Stavanger. However, we can assist with searches in other Norwegian cities upon request.',
  },
  {
    question: 'What are your fees?',
    answer: 'Our fees depend on the scope of the engagement and the number of apartments required. Contact us for a written quote — all pricing is agreed up front, with no hidden costs.',
  },
  {
    question: 'Do you help with furnished and unfurnished apartments?',
    answer: 'Yes, we can help you find both furnished and unfurnished apartments based on your preferences.',
  },
]

export default function ServicesPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our Services
            </h1>
            <p className="text-xl text-primary-100">
              Complete rental assistance for companies relocating employees to Norway. From search to move-in, we handle every detail.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.title}
                className="bg-gray-50 rounded-xl p-8 border border-gray-200 hover:border-primary-300 transition-colors"
              >
                <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-6">
                  <service.icon className="w-7 h-7 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-700">
                      <span className="w-1.5 h-1.5 bg-primary-600 rounded-full mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Overview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Simple Process, Exceptional Results
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We've streamlined the Norwegian rental process into four easy steps.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {['Tell us your needs', 'We search & shortlist', 'We handle landlords', 'You move in'].map((step, index) => (
              <div key={step} className="flex items-center">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">
                    {index + 1}
                  </div>
                  <p className="font-medium text-gray-900">{step}</p>
                </div>
                {index < 3 && (
                  <ArrowRight className="hidden md:block w-8 h-8 text-primary-300 mx-4" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-start space-x-4">
                  <HelpCircle className="w-6 h-6 text-primary-600 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-primary-200 mb-8">
            Tell us about your requirements and we'll create a personalized search plan.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center px-8 py-4 bg-white text-primary-800 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
          >
            Contact Us Today
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
