import { ClipboardList, Search, MessageSquare, Home } from 'lucide-react'

const steps = [
  {
    icon: ClipboardList,
    step: '01',
    title: 'Define Your Requirements',
    description: 'Tell us who is relocating, where, and when: locations, budget, apartment sizes, and move-in timeline. We build a tailored search plan around it.',
  },
  {
    icon: Search,
    step: '02',
    title: 'We Search & Shortlist',
    description: 'Our local team searches the Norwegian rental market and our landlord network, presenting you with a vetted shortlist that matches your criteria.',
  },
  {
    icon: MessageSquare,
    step: '03',
    title: 'We Negotiate & Review',
    description: 'We contact landlords in Norwegian, arrange viewings, negotiate terms, and review contracts — removing language and legal barriers entirely.',
  },
  {
    icon: Home,
    step: '04',
    title: 'Your Team Moves In',
    description: 'Once you approve an apartment, we coordinate signing, key handover, and move-in documentation. Your employees arrive to a home that is ready.',
  },
]

export default function HowItWorks() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary-600 mb-3">
            Our Process
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From first inquiry to move-in, one point of contact handles every step of securing housing for your employees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.step} className="relative">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-primary-200 -translate-y-1/2 z-0" />
              )}

              <div className="relative bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <step.icon className="w-6 h-6 text-primary-600" />
                </div>
                <span className="text-sm font-semibold text-primary-600 mb-2 block">
                  Step {step.step}
                </span>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
