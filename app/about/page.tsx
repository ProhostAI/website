import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About - ProhostAI | Built by Hosts for Hosts',
  description: 'ProhostAI is the only all-in-one AI assistant for hosts, automating guest messaging, maintenance ticketing, cleaning scheduling, and more. Built by professional Superhosts backed by Y Combinator.',
};

export default function AboutPage() {
  return (
    <>
      <Header />

      <main className="pt-16 min-h-screen bg-white">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-purple-50 to-white">
          <div className="max-width-container section-padding">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Built by Hosts for Hosts
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                ProhostAI is the only all-in-one AI assistant for hosts, automating guest messaging,
                maintenance ticketing, cleaning scheduling, AI upsells, guest guidebooks and MUCH more.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 border-t border-gray-100">
          <div className="max-width-container section-padding">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">4.99★</div>
                <p className="text-sm text-gray-600">Average guest rating across 2000+ stays</p>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">80%+</div>
                <p className="text-sm text-gray-600">Of guest messages automated with AI</p>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">2 min</div>
                <p className="text-sm text-gray-600">Median response time</p>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">$15M</div>
                <p className="text-sm text-gray-600">Portfolio under management</p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-width-container section-padding">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                We're bringing order to chaos. As professional Superhosts ourselves, we've experienced
                firsthand the overwhelming nature of managing multiple properties. The constant guest
                messages, maintenance issues, cleaning coordination, and administrative tasks can quickly
                become unmanageable.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                That's why we built ProhostAI - to automate the routine tasks that burden busy hosts.
                Our AI-powered platform helps you scale your hosting business more efficiently,
                profitably, and with less stress.
              </p>
              <p className="text-lg text-gray-600">
                We're proud to partner directly with Airbnb and to be backed by Y Combinator and Pear VC.
                Our team includes alumni from Airbnb, Dropbox, Harvard, and Yale, bringing together
                deep expertise in hospitality, technology, and AI.
              </p>
            </div>
          </div>
        </section>

        {/* Why We Built ProhostAI */}
        <section className="py-16">
          <div className="max-width-container section-padding">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                Why We Built ProhostAI
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                As our portfolio grew, we found ourselves drowning in operational tasks. Despite our
                success - maintaining a 4.99+ rating across thousands of stays - we were spending
                countless hours on repetitive work that could be automated.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                We tried every tool on the market, but nothing provided the comprehensive automation
                we needed. So we decided to build it ourselves.
              </p>
              <p className="text-lg text-gray-600">
                Today, ProhostAI is the only AI assistant designed exclusively for vacation rental hosts,
                with native iOS and Android apps and official Airbnb integration. We're not just building
                software - we're building the future of property management.
              </p>
            </div>
          </div>
        </section>

        {/* Founders Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-width-container section-padding">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Meet the Founders
            </h2>
            <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              {/* Bill */}
              <div className="text-center">
                <div className="w-48 h-48 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
                  {/* Placeholder for founder image */}
                  <span className="text-4xl font-bold text-purple-600">BU</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Bill Ulammandakh</h3>
                <p className="text-primary-600 font-medium mb-4">Co-Founder & CEO</p>
                <p className="text-gray-600 mb-4">
                  Former Staff Data Scientist, Algorithms at Airbnb (6 years).
                  Harvard University graduate in Economics & Neuroscience.
                </p>
                <Link
                  href="https://www.linkedin.com/in/bilguunulammandakh/"
                  target="_blank"
                  className="inline-flex items-center text-primary-600 hover:text-primary-700 transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  LinkedIn
                </Link>
              </div>

              {/* Andrew */}
              <div className="text-center">
                <div className="w-48 h-48 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                  {/* Placeholder for founder image */}
                  <span className="text-4xl font-bold text-blue-600">AL</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Andrew Lawson</h3>
                <p className="text-primary-600 font-medium mb-4">Co-Founder & CTO</p>
                <p className="text-gray-600 mb-4">
                  Former Senior Software Engineer at Dropbox (6 years).
                  Building scalable systems and infrastructure for millions of users.
                </p>
                <Link
                  href="https://www.linkedin.com/in/andrew-lawson/"
                  target="_blank"
                  className="inline-flex items-center text-primary-600 hover:text-primary-700 transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  LinkedIn
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Backed By Section */}
        <section className="py-16">
          <div className="max-width-container section-padding">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Backed by the Best
            </h2>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
              <div className="text-gray-600 font-semibold">Y Combinator</div>
              <div className="text-gray-600 font-semibold">Pear VC</div>
              <div className="text-gray-600 font-semibold">Pioneer</div>
              <div className="text-gray-600 font-semibold">Amino Capital</div>
              <div className="text-gray-600 font-semibold">Data Tech Fund</div>
            </div>
            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Team members from:
              </p>
              <div className="flex flex-wrap justify-center items-center gap-6 mt-4">
                <span className="font-semibold text-gray-700">Airbnb</span>
                <span className="text-gray-400">•</span>
                <span className="font-semibold text-gray-700">Dropbox</span>
                <span className="text-gray-400">•</span>
                <span className="font-semibold text-gray-700">Harvard University</span>
                <span className="text-gray-400">•</span>
                <span className="font-semibold text-gray-700">Yale University</span>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-primary-600 to-purple-700">
          <div className="max-width-container section-padding text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Hosting Business?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of hosts who are automating their operations with ProhostAI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/pricing"
                className="px-8 py-4 bg-white text-primary-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Start Free Trial
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