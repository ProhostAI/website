import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing - ProhostAI | Simple, Transparent Pricing',
  description: 'ProhostAI pricing - $15/month per listing with everything included. 14-day free trial, no credit card required.',
};

const plans = [
  {
    name: 'Pro Plan',
    price: 15,
    description: 'Everything you need to automate your hosting business',
    popular: true,
    minimumMonthly: 30,
    features: [
      'Unlimited AI replies',
      'AI Messaging Autopilot',
      'AI maintenance task manager',
      'Automated cleaning scheduling',
      'AI Memory - continuously learning',
      'AI Reviews - analyze & write reviews',
      'AI Guidebooks with upsells',
      'Earnings reports & analytics',
      'Multi-calendar view',
      'Upsells to fill gap nights',
      'iOS & Android apps',
      'Unlimited team members',
    ],
    cta: 'Start 14-Day Free Trial',
    ctaLink: 'https://app.prohostai.com/signup',
  },
  {
    name: 'Enterprise',
    price: null,
    description: 'For hosts with 50+ listings',
    popular: false,
    features: [
      'Everything in Pro, plus:',
      'Custom pricing & contract',
      'Dedicated account manager',
      'Custom training & onboarding',
      'Priority feature requests',
      'SLA & uptime guarantee',
      'API access',
      'White-label options',
      'Advanced reporting',
      'Phone support',
    ],
    cta: "Let's Talk",
    ctaLink: 'https://cal.com/billu/prohostdemo',
  },
];

const faqs = [
  {
    question: 'How does the pricing work?',
    answer: '$15 per listing per month. For example, if you have 3 listings, you\'ll pay $45/month. There\'s a $30 minimum (2 listings).',
  },
  {
    question: 'Is there a free trial?',
    answer: 'Yes! You get 14 days free with full access to all features. No credit card required to start.',
  },
  {
    question: 'What\'s included in the $15/month?',
    answer: 'Everything! Unlimited AI messages, Autopilot mode, maintenance tasks, cleaning scheduling, AI memory, reviews, guidebooks, analytics, mobile apps - all features are included.',
  },
  {
    question: 'Can I cancel anytime?',
    answer: 'Absolutely! You can cancel or change your plan at any time. No contracts or hidden fees.',
  },
  {
    question: 'What integrations do you support?',
    answer: 'We integrate with Airbnb, Hostaway, OwnerRez, Hospitable, and Guesty. More coming soon!',
  },
  {
    question: 'Do you offer annual billing?',
    answer: 'Yes! Contact us for annual billing options and discounts.',
  },
];

export default function PricingPage() {
  return (
    <>
      <Header />

      <main className="pt-16 min-h-screen bg-white">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-purple-50 to-white">
          <div className="max-width-container section-padding">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Simple, transparent pricing
              </h1>
              <p className="text-xl text-gray-600">
                One price, all features included. No hidden fees.
              </p>
            </div>

            {/* Pricing Cards */}
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={`relative rounded-2xl p-8 ${
                    plan.popular
                      ? 'border-2 border-primary-600 shadow-xl bg-gradient-to-br from-purple-50 to-white'
                      : 'border border-gray-200 bg-white'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                    <p className="text-gray-600 mt-2">{plan.description}</p>
                  </div>

                  <div className="mb-6">
                    {plan.price !== null ? (
                      <>
                        <div className="flex items-baseline">
                          <span className="text-5xl font-bold text-gray-900">
                            ${plan.price}
                          </span>
                          <span className="ml-2 text-gray-600">/month per listing</span>
                        </div>
                        {plan.minimumMonthly && (
                          <p className="text-sm text-gray-600 mt-2">
                            ${plan.minimumMonthly} minimum (2 listings)
                          </p>
                        )}
                      </>
                    ) : (
                      <div className="text-4xl font-bold text-gray-900">Custom pricing</div>
                    )}
                  </div>

                  <ul className="mb-8 space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <svg
                          className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className={`${feature.startsWith('Everything') ? 'font-semibold' : ''} text-gray-700`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={plan.ctaLink}
                    className={`block text-center px-6 py-4 rounded-lg font-semibold transition-all ${
                      plan.popular
                        ? 'bg-primary-600 text-white hover:bg-primary-700 hover:shadow-lg transform hover:-translate-y-0.5'
                        : 'bg-gray-900 text-white hover:bg-gray-800'
                    }`}
                    target="_blank"
                  >
                    {plan.cta}
                  </Link>
                </div>
              ))}
            </div>

            {/* Trust Badges */}
            <div className="mt-12 text-center">
              <p className="text-sm text-gray-600 mb-4">Trusted by 2000+ hosts managing 10,000+ properties</p>
              <div className="flex flex-wrap justify-center items-center gap-8">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">14-day free trial</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Cancel anytime</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What's Included Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-width-container section-padding">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Everything You Need, Nothing You Don't
            </h2>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-4l-4 4z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">AI Messaging</h3>
                <p className="text-gray-600">Unlimited AI-powered guest messages with 80%+ automation rate</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Task Management</h3>
                <p className="text-gray-600">Auto-generate maintenance tasks from messages and reviews</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Revenue Optimization</h3>
                <p className="text-gray-600">Upsells, dynamic pricing, and gap night filling</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-16">
          <div className="max-width-container section-padding">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Frequently Asked Questions
            </h2>

            <div className="max-w-3xl mx-auto space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="py-16 bg-purple-50">
          <div className="max-width-container section-padding">
            <div className="max-w-3xl mx-auto text-center">
              <div className="mb-8">
                <div className="flex justify-center mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-8 h-8 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="text-xl text-gray-700 italic mb-4">
                  "ProhostAI has transformed how we manage our properties. We've reduced response time by 90% and
                  our guests love the instant, helpful replies. The ROI was clear within the first week."
                </blockquote>
                <cite className="text-gray-600 not-italic">
                  - Sarah M., Managing 15 properties on Airbnb
                </cite>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-primary-600 to-purple-700">
          <div className="max-width-container section-padding text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Start your 14-day free trial today
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join 2000+ hosts who are saving 10+ hours per week with ProhostAI
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="https://app.prohostai.com/signup"
                target="_blank"
                className="px-8 py-4 bg-white text-primary-600 rounded-lg font-semibold hover:bg-gray-100 transition-all transform hover:-translate-y-0.5 hover:shadow-lg"
              >
                Start Free Trial - No Card Required
              </Link>
              <Link
                href="https://cal.com/billu/prohostdemo"
                target="_blank"
                className="px-8 py-4 bg-transparent text-white border-2 border-white rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                Book a Demo
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}