import { Globe, Languages, Scale, Clock } from 'lucide-react'

const challenges = [
  {
    icon: Languages,
    title: 'Language Barriers',
    challenge: 'Most landlords only communicate in Norwegian',
    solution: 'Our bilingual team handles all communications in the landlord\'s preferred language.',
  },
  {
    icon: Scale,
    title: 'Rental Laws',
    challenge: 'Norwegian rental regulations are complex and unfamiliar',
    solution: 'We explain your rights and review contracts to ensure fair, legal terms.',
  },
  {
    icon: Globe,
    title: 'Remote Search',
    challenge: 'Searching from abroad makes viewings impossible',
    solution: 'We conduct viewings on your behalf with detailed video walkthroughs.',
  },
  {
    icon: Clock,
    title: 'Time Zones',
    challenge: 'Coordinating across time zones is exhausting',
    solution: 'We manage all scheduling and respond to landlords during Norwegian business hours.',
  },
]

export default function WhyUs() {
  return (
    <section className="py-20 bg-primary-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Foreign Businesses Choose Us
          </h2>
          <p className="text-lg text-primary-200 max-w-2xl mx-auto">
            Relocating to Norway comes with unique challenges. We solve them all.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {challenges.map((item) => (
            <div
              key={item.title}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-8"
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center shrink-0">
                  <item.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-primary-300 mb-3">
                    <span className="font-medium">The challenge:</span> {item.challenge}
                  </p>
                  <p className="text-primary-100">
                    <span className="font-medium text-white">Our solution:</span> {item.solution}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
