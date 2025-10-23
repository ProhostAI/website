'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function HomePage() {
  const [activeCalendarTab, setActiveCalendarTab] = useState('all-in-one');

  return (
    <>
      <Header />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-purple-50 to-white">
          <div className="max-width-container section-padding py-24 sm:py-32">
            <div className="text-center">
              {/* Announcement Badge */}
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                New feature: AI Autopilot
              </div>

              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                All-in-One AI assistant for{' '}
                <span className="text-primary-600">vacation rental hosts</span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600 max-w-3xl mx-auto">
                ProhostAI – the all-in-one AI assistant that automates guest messaging, maintenance,
                cleaning & upsells so vacation rental hosts can scale stress-free. Available for hosts
                on Airbnb, Hostaway and Guesty.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  href="https://app.prohostai.com/signup"
                  target="_blank"
                  className="rounded-lg bg-primary-600 px-8 py-4 text-base font-semibold text-white shadow-lg hover:bg-primary-700 transition-all hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Try 14 days FREE
                </Link>
                <Link
                  href="/downloads"
                  className="text-base font-semibold leading-6 text-gray-900 hover:text-primary-600 transition-colors flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  Download for Mobile
                </Link>
              </div>

              {/* Product Hunt Badge */}
              <div className="mt-8 flex justify-center">
                <a href="https://www.producthunt.com/products/prohostai" target="_blank" rel="noopener noreferrer">
                  <img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1019663&theme=light"
                       alt="ProhostAI - AI assistant for Airbnb messaging, tasks, and cleanings | Product Hunt"
                       className="h-12" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof Section */}
        <section className="py-12 bg-white border-t border-gray-100">
          <div className="max-width-container section-padding">
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-6">Backed by top investors</p>
              <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6">
                <img src="/images/yc.png" alt="Y Combinator" className="h-10 object-contain opacity-60 hover:opacity-100 transition-opacity" />
                <img src="/images/pear.png" alt="Pear VC" className="h-10 object-contain opacity-60 hover:opacity-100 transition-opacity" />
                <span className="text-xl font-semibold text-gray-400">Amino Capital</span>
                <span className="text-xl font-semibold text-gray-400">Data Tech Fund</span>
                <span className="text-xl font-semibold text-gray-400">Pioneer</span>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-200">
                <p className="text-sm text-gray-500 mb-6">Founded by team from</p>
                <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6">
                  <img src="/images/airbnb.png" alt="Airbnb" className="h-8 object-contain opacity-60 hover:opacity-100 transition-opacity" />
                  <img src="/images/dropbox.png" alt="Dropbox" className="h-8 object-contain opacity-60 hover:opacity-100 transition-opacity" />
                  <img src="/images/harvard.png" alt="Harvard" className="h-10 object-contain opacity-60 hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Integrations Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-width-container section-padding">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
              Connect your listings in minutes
            </h2>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
              <img src="/images/airbnb.png" alt="Airbnb" className="h-10 object-contain opacity-70 hover:opacity-100 transition-opacity" />
              <img src="/images/hostaway-integration.png" alt="Hostaway" className="h-10 object-contain opacity-70 hover:opacity-100 transition-opacity" />
              <span className="text-2xl font-semibold text-gray-400">OwnerRez</span>
              <span className="text-2xl font-semibold text-gray-400">Hospitable</span>
              <img src="/images/guesty-integration.png" alt="Guesty" className="h-10 object-contain opacity-70 hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </section>

        {/* AI Features Stack Section */}
        <section className="py-24 bg-white">
          <div className="max-width-container section-padding">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                AI Features
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Everything you need to succeed
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Powerful AI features designed for modern property managers
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {aiFeatures.map((feature) => (
                <div key={feature.title} className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all p-8 border border-gray-100">
                  <div className="flex items-start gap-4">
                    <div className={`flex items-center justify-center h-12 w-12 rounded-xl ${feature.bgColor} ${feature.iconColor} flex-shrink-0`}>
                      <img src={feature.icon} alt={feature.title} className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                      <p className="mt-2 text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AI Autopilot Section */}
        <section className="py-24 bg-white">
          <div className="max-width-container section-padding">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                  AI Autopilot
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  Guest messages on Autopilot
                </h2>
                <p className="mt-4 text-lg text-gray-600">
                  Let ProhostAI handle your guest communications 24/7. Our AI understands context,
                  maintains your brand voice, and only escalates when truly needed.
                </p>
                <ul className="mt-8 space-y-4">
                  <li className="flex items-start gap-3">
                    <svg className="h-6 w-6 text-green-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <span className="font-semibold">24/7 Coverage:</span> Never miss a message, even at 3 AM
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="h-6 w-6 text-green-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <span className="font-semibold">Smart Escalation:</span> AI knows when to involve you
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="h-6 w-6 text-green-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <span className="font-semibold">80%+ Automation:</span> Most messages handled without you
                    </div>
                  </li>
                </ul>
              </div>
              <div className="relative">
                <img src="/images/autopilot-final_1.avif" alt="AI Autopilot Feature" className="rounded-2xl shadow-2xl" />
              </div>
            </div>
          </div>
        </section>

        {/* Upsells Section */}
        <section className="py-24 bg-gray-50">
          <div className="max-width-container section-padding">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="grid grid-cols-2 gap-4">
                  <img src="/images/upsell-tracker_1.avif" alt="Upsell Tracker" className="rounded-xl shadow-lg" />
                  <img src="/images/effective-upsells.avif" alt="Effective Upsells" className="rounded-xl shadow-lg" />
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                  Upsells
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  Turn every gap night into a revenue opportunity
                </h2>
                <p className="mt-4 text-lg text-gray-600">
                  Automatically identify and capitalize on upsell opportunities. From early check-ins
                  to late checkouts, maximize revenue from every booking.
                </p>
                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-3xl font-bold text-green-600">+23%</div>
                    <p className="text-sm text-gray-600">Average revenue increase</p>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-green-600">$450</div>
                    <p className="text-sm text-gray-600">Avg monthly extra revenue</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Calendar Section with Tabs */}
        <section className="py-24 bg-white">
          <div className="max-width-container section-padding">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                Calendar
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Multicalendar available on desktop & mobile
              </h2>
            </div>

            {/* Tabs */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex rounded-lg border border-gray-200 p-1 bg-gray-50">
                <button
                  onClick={() => setActiveCalendarTab('all-in-one')}
                  className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                    activeCalendarTab === 'all-in-one'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  All-in-one view
                </button>
                <button
                  onClick={() => setActiveCalendarTab('focus')}
                  className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                    activeCalendarTab === 'focus'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Focus on one listing
                </button>
                <button
                  onClick={() => setActiveCalendarTab('mobile')}
                  className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                    activeCalendarTab === 'mobile'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Mobile app
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div className="relative">
              {activeCalendarTab === 'all-in-one' && (
                <img src="/images/calendar-new-1_1.webp" alt="All-in-one calendar view" className="w-full rounded-2xl shadow-2xl" />
              )}
              {activeCalendarTab === 'focus' && (
                <img src="/images/calendar-new-2_1.webp" alt="Focus calendar view" className="w-full rounded-2xl shadow-2xl" />
              )}
              {activeCalendarTab === 'mobile' && (
                <div className="flex justify-center">
                  <img src="/images/calendar-mobile-1_1.avif" alt="Mobile calendar" className="h-[600px] rounded-2xl shadow-2xl" />
                </div>
              )}
            </div>
          </div>
        </section>

        {/* More Features Grid */}
        <section className="py-24 bg-gray-50">
          <div className="max-width-container section-padding">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                More features!
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Everything else you need
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all">
                <img src="/images/contacts.avif" alt="Contacts" className="w-full h-40 object-cover rounded-lg mb-4" />
                <h3 className="text-lg font-semibold text-gray-900">Contacts</h3>
                <p className="mt-2 text-sm text-gray-600">Manage all your vendors and team in one place</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all">
                <img src="/images/analytics.avif" alt="Analytics" className="w-full h-40 object-cover rounded-lg mb-4" />
                <h3 className="text-lg font-semibold text-gray-900">Analytics</h3>
                <p className="mt-2 text-sm text-gray-600">Track performance and optimize operations</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all">
                <img src="/images/earnings.avif" alt="Earnings" className="w-full h-40 object-cover rounded-lg mb-4" />
                <h3 className="text-lg font-semibold text-gray-900">Earnings</h3>
                <p className="mt-2 text-sm text-gray-600">Monitor revenue and financial performance</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all">
                <img src="/images/type_1.avif" alt="Team" className="w-full h-40 object-cover rounded-lg mb-4" />
                <h3 className="text-lg font-semibold text-gray-900">Team Collaboration</h3>
                <p className="mt-2 text-sm text-gray-600">Work seamlessly with your entire team</p>
              </div>
            </div>
          </div>
        </section>

        {/* Mobile App Section */}
        <section className="py-24 bg-white">
          <div className="max-width-container section-padding">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  Available on iOS & Android
                </h2>
                <p className="mt-4 text-lg text-gray-600">
                  Manage your properties on the go with our powerful mobile apps. Get instant notifications,
                  respond to guests, and track everything from your phone.
                </p>
                <div className="mt-8 flex gap-4">
                  <a href="https://apps.apple.com/app/prohostai" target="_blank" rel="noopener noreferrer">
                    <img src="/images/appstore.svg" alt="Download on App Store" className="h-12" />
                  </a>
                  <a href="https://play.google.com/store/apps/details?id=com.prohostai" target="_blank" rel="noopener noreferrer">
                    <img src="/images/googleplay.svg" alt="Get it on Google Play" className="h-12" />
                  </a>
                </div>
              </div>
              <div className="relative">
                <img src="/images/mobile-app-visual-new_1.avif" alt="Mobile App" className="rounded-2xl" />
              </div>
            </div>
          </div>
        </section>

        {/* Backers Marquee Section */}
        <section className="py-16 bg-gray-50 border-t border-gray-100">
          <div className="max-width-container section-padding">
            <div className="text-center mb-8">
              <p className="text-sm text-gray-600 mb-4">Backed by</p>
              <div className="flex flex-wrap justify-center items-center gap-8 mb-8">
                <img src="/images/y_combinator_logo.svg.png" alt="Y Combinator" className="h-8 opacity-70" />
                <span className="text-xl font-semibold text-gray-600">Pioneer</span>
                <span className="text-xl font-semibold text-gray-600">Amino Capital</span>
                <img src="/images/pear.png" alt="Pear VC" className="h-8 opacity-70" />
                <span className="text-xl font-semibold text-gray-600">Data Tech Fund</span>
                <span className="text-xl font-semibold text-gray-600">Multimoda</span>
              </div>
              <p className="text-sm text-gray-600 mb-4">Team from</p>
              <div className="flex flex-wrap justify-center items-center gap-8">
                <img src="/images/airbnb.png" alt="Airbnb" className="h-6 opacity-70" />
                <img src="/images/dropbox.png" alt="Dropbox" className="h-6 opacity-70" />
                <img src="/images/harvard.png" alt="Harvard University" className="h-8 opacity-70" />
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-24 bg-gradient-to-br from-primary-600 to-purple-700">
          <div className="max-width-container section-padding text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
              Get started today!
            </h2>
            <p className="mt-4 text-xl text-white/90 max-w-2xl mx-auto">
              Professional-grade tools. The easiest to use. Fully automated.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="https://app.prohostai.com/signup"
                target="_blank"
                className="rounded-lg bg-white px-8 py-4 text-base font-semibold text-primary-600 shadow-lg hover:bg-gray-50 transition-all hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Try for free
              </Link>
              <Link
                href="https://cal.com/billu/prohostdemo"
                target="_blank"
                className="rounded-lg border-2 border-white px-8 py-4 text-base font-semibold text-white hover:bg-white/10 transition-colors"
              >
                Book a demo
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

const aiFeatures = [
  {
    title: 'AI Messaging',
    description: 'Instant AI generated suggested replies to guest messages based on your listing information, messaging history and local data.',
    icon: '/images/ai-messaging-icon.svg',
    bgColor: 'bg-purple-100',
    iconColor: 'text-purple-600',
  },
  {
    title: 'AI Tasks',
    description: 'Automatically generates maintenance tasks from guest messages and reviews, with auto-assignment and status tracking.',
    icon: '/images/ai-tasks.svg',
    bgColor: 'bg-blue-100',
    iconColor: 'text-blue-600',
  },
  {
    title: 'Cleanings',
    description: 'Automatic scheduling of turnover cleanings, auto-assignment to cleaners, timestamped photos, and checklist creation.',
    icon: '/images/icon_cleanings.svg',
    bgColor: 'bg-green-100',
    iconColor: 'text-green-600',
  },
  {
    title: 'Ask AI',
    description: 'Your always-on hosting assistant — ready to answer questions, solve problems, and help you stay ahead.',
    icon: '/images/ask-ai-icon.svg',
    bgColor: 'bg-yellow-100',
    iconColor: 'text-yellow-600',
  },
  {
    title: 'AI Reviews',
    description: 'Automatically detects actionable tasks from reviews and can write personalized guest reviews using AI.',
    icon: '/images/ai-review-icon.svg',
    bgColor: 'bg-red-100',
    iconColor: 'text-red-600',
  },
  {
    title: 'AI Guidebooks',
    description: 'Welcome guests with digital guidebooks tailored to each property—complete with check-in info, house rules, local tips, and more.',
    icon: '/images/ai-guidebook-icon.svg',
    bgColor: 'bg-indigo-100',
    iconColor: 'text-indigo-600',
  },
  {
    title: 'AI Memory',
    description: 'Your AI assistant continuously learns from every message and becomes smarter over time.',
    icon: '/images/ai-memory-icon.svg',
    bgColor: 'bg-pink-100',
    iconColor: 'text-pink-600',
  },
  {
    title: 'AI Autopilot',
    description: 'Set it and forget it — AI handles guest messages 24/7 with smart escalation when needed.',
    icon: '/images/shape_ai.svg',
    bgColor: 'bg-blue-100',
    iconColor: 'text-blue-600',
  },
];