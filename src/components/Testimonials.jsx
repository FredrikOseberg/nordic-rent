import { Quote } from 'lucide-react'

const testimonials = [
  {
    quote: 'Nordic Rent made our relocation to Oslo completely stress-free. They found us a perfect apartment in Grünerløkka and handled all the negotiations with the landlord. Highly recommended!',
    author: 'Sarah M.',
    role: 'Tech Startup Founder',
    company: 'Berlin, Germany',
  },
  {
    quote: 'As an American company expanding to Norway, we had no idea how to navigate the rental market. Nordic Rent secured apartments for three of our employees within two weeks.',
    author: 'James T.',
    role: 'Operations Director',
    company: 'San Francisco, USA',
  },
  {
    quote: 'The language barrier was our biggest concern. Nordic Rent eliminated that completely. They even helped us understand our rights as tenants under Norwegian law.',
    author: 'Yuki K.',
    role: 'Project Manager',
    company: 'Tokyo, Japan',
  },
]

export default function Testimonials() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary-600 mb-3">
            Client Experiences
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Companies from around the world rely on us to house their teams in Norway.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <Quote className="w-10 h-10 text-primary-200 mb-4" />
              <p className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.quote}"
              </p>
              <div className="border-t pt-4">
                <p className="font-semibold text-gray-900">{testimonial.author}</p>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
                <p className="text-sm text-primary-600">{testimonial.company}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
