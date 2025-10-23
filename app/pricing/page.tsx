'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';

const plans = [
  {
    name: 'Free',
    price: { monthly: 0, yearly: 0 },
    description: 'Get started with essential tools',
    popular: false,
    features: [
      'AI Memory',
      'Task Manager',
      'Calendar',
      'iOS & Android app',
      'Earnings dashboard',
      'Messaging analytics',
    ],
    cta: 'Get Started',
    ctaLink: 'https://app.prohostai.com/signup',
  },
  {
    name: 'Plus',
    price: { monthly: 15, yearly: 12 },
    description: 'Perfect for growing hosts',
    popular: false,
    features: [
      'Everything in Free, plus:',
      'Unlimited AI Messaging',
      'Unlimited Ask AI',
      'Docs uploads for custom training',
      'Branding-free guidebooks',
      'Scheduled guest communications',
    ],
    cta: 'Start Free Trial',
    ctaLink: 'https://app.prohostai.com/signup',
  },
  {
    name: 'Pro',
    price: { monthly: 25, yearly: 20 },
    description: 'For professional hosts',
    popular: true,
    minimumMonthly: 50,
    features: [
      'Everything in Plus, plus:',
      'Autopilot: 70%+ guest replies',
      'Continuous learning across channels',
      'Advanced guidebooks + upsells',
      'Priority support & SLA',
      'Dedicated onboarding',
      'Unlimited team members',
    ],
    cta: 'Start Free Trial',
    ctaLink: 'https://app.prohostai.com/signup',
  },
  {
    name: 'Enterprise',
    price: { monthly: null, yearly: null },
    description: 'For hosts with 50+ listings',
    popular: false,
    features: [
      'Custom pricing & contract',
      'Unlimited team members',
      'Unlimited AI messages',
      'Custom training & assistance',
      'Dedicated account manager',
      'Priority feature requests',
      'SLA & uptime guarantee',
    ],
    cta: "Let's Talk",
    ctaLink: 'https://cal.com/billu/prohostdemo',
  },
];

const faqs = [
  {
    question: 'Which plan should I start with?',
    answer: 'Most hosts start with our Plus plan to access unlimited AI messaging and core automation features. If you manage more than 2 properties or want fully automated guest replies, the Pro plan is recommended.',
  },
  {
    question: 'How does per-listing pricing work?',
    answer: 'You pay a monthly fee for each listing you connect. For example, if you have 3 listings on the Plus plan, you\'ll pay $45/month ($15 × 3). Pro plan has a $50 minimum.',
  },
  {
    question: 'Are there annual discounts?',
    answer: 'Yes! Save 20% when you pay annually. Plus plan becomes $12/listing/month and Pro becomes $20/listing/month when billed yearly.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards through Stripe. Enterprise customers can also pay via ACH or wire transfer.',
  },
  {
    question: 'Can I change plans anytime?',
    answer: 'Absolutely! You can upgrade or downgrade your plan at any time. Changes take effect immediately and we\'ll prorate your billing.',
  },
  {
    question: 'Is there a free trial?',
    answer: 'Yes! Both Plus and Pro plans come with a 14-day free trial. No credit card required to start.',
  },
];

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);

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
                Choose the plan that fits your hosting business. All plans include our core features.
              </p>
            </div>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center mb-12">
              <span className={`mr-3 ${!isYearly ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                Monthly
              </span>
              <button
                onClick={() => setIsYearly(!isYearly)}
                className="relative inline-flex h-8 w-14 items-center rounded-full bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2"
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white shadow transition-transform ${
                    isYearly ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`ml-3 ${isYearly ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                Yearly
                <span className="ml-2 inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                  Save 20%
                </span>
              </span>
            </div>

            {/* Pricing Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={`relative rounded-2xl p-8 ${
                    plan.popular
                      ? 'border-2 border-primary-600 shadow-xl'
                      : 'border border-gray-200'
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
                    {plan.price.monthly !== null ? (
                      <>
                        <div className="flex items-baseline">
                          <span className="text-4xl font-bold text-gray-900">
                            ${isYearly ? plan.price.yearly : plan.price.monthly}
                          </span>
                          <span className="ml-2 text-gray-600">/listing/month</span>
                        </div>
                        {plan.minimumMonthly && (
                          <p className="text-sm text-gray-600 mt-2">
                            Minimum ${plan.minimumMonthly}/month
                          </p>
                        )}
                        {isYearly && plan.price.yearly > 0 && (
                          <p className="text-sm text-green-600 mt-2">
                            Billed ${plan.price.yearly * 12}/listing/year
                          </p>
                        )}
                      </>
                    ) : (
                      <div className="text-4xl font-bold text-gray-900">Custom</div>
                    )}
                  </div>

                  <ul className="mb-8 space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <svg
                          className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={plan.ctaLink}
                    className={`block text-center px-6 py-3 rounded-lg font-semibold transition-colors ${
                      plan.popular
                        ? 'bg-primary-600 text-white hover:bg-primary-700'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                    target="_blank"
                  >
                    {plan.cta}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Feature Comparison */}
        <section className="py-16 bg-gray-50">
          <div className="max-width-container section-padding">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Compare Features
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-4 px-4 font-semibold text-gray-900">Features</th>
                    <th className="text-center py-4 px-4 font-semibold text-gray-900">Free</th>
                    <th className="text-center py-4 px-4 font-semibold text-gray-900">Plus</th>
                    <th className="text-center py-4 px-4 font-semibold text-gray-900">
                      <span className="text-primary-600">Pro</span>
                    </th>
                    <th className="text-center py-4 px-4 font-semibold text-gray-900">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-4 font-medium text-gray-900">AI Messaging</td>
                    <td className="text-center py-4 px-4 text-gray-600">10/month</td>
                    <td className="text-center py-4 px-4 text-gray-600">Unlimited</td>
                    <td className="text-center py-4 px-4 text-gray-600">Unlimited</td>
                    <td className="text-center py-4 px-4 text-gray-600">Unlimited</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-4 font-medium text-gray-900">AI Autopilot</td>
                    <td className="text-center py-4 px-4">-</td>
                    <td className="text-center py-4 px-4">-</td>
                    <td className="text-center py-4 px-4">✓</td>
                    <td className="text-center py-4 px-4">✓</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-4 font-medium text-gray-900">Team Members</td>
                    <td className="text-center py-4 px-4 text-gray-600">1</td>
                    <td className="text-center py-4 px-4 text-gray-600">3</td>
                    <td className="text-center py-4 px-4 text-gray-600">Unlimited</td>
                    <td className="text-center py-4 px-4 text-gray-600">Unlimited</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-4 font-medium text-gray-900">Priority Support</td>
                    <td className="text-center py-4 px-4">-</td>
                    <td className="text-center py-4 px-4">-</td>
                    <td className="text-center py-4 px-4">✓</td>
                    <td className="text-center py-4 px-4">✓</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-4 font-medium text-gray-900">Guidebooks</td>
                    <td className="text-center py-4 px-4 text-gray-600">Basic</td>
                    <td className="text-center py-4 px-4 text-gray-600">Advanced</td>
                    <td className="text-center py-4 px-4 text-gray-600">Advanced + Upsells</td>
                    <td className="text-center py-4 px-4 text-gray-600">Custom</td>
                  </tr>
                </tbody>
              </table>
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
                <div key={index} className="border border-gray-200 rounded-lg p-6">
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

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-primary-600 to-purple-700">
          <div className="max-width-container section-padding text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Start your 14-day free trial
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              No credit card required. Cancel anytime.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="https://app.prohostai.com/signup"
                target="_blank"
                className="px-8 py-4 bg-white text-primary-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Start Free Trial
              </Link>
              <Link
                href="https://cal.com/billu/prohostdemo"
                target="_blank"
                className="px-8 py-4 bg-transparent text-white border-2 border-white rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                Schedule Demo
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}