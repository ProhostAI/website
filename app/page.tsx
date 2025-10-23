import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function HomePage() {
  return (
    <>
      <Header />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-white">
          <div className="max-width-container section-padding py-24 sm:py-32">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                AI-Powered Property Management for{' '}
                <span className="text-primary-600">Short-Term Rentals</span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600 max-w-3xl mx-auto">
                Transform your rental business with intelligent automation. Handle guest communications,
                optimize pricing, and maximize occupancy - all powered by cutting-edge AI.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  href="https://app.prohostai.com/signup"
                  className="rounded-lg bg-primary-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-primary-700 transition-colors"
                >
                  Start Free Trial
                </Link>
                <Link
                  href="/demo"
                  className="text-base font-semibold leading-6 text-gray-900 hover:text-primary-600 transition-colors"
                >
                  Watch Demo <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-gray-50">
          <div className="max-width-container section-padding">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Everything you need to succeed
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Powerful features designed for modern property managers
              </p>
            </div>

            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="relative bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-primary-100 text-primary-600">
                    {feature.icon}
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-gray-600">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-primary-600">
          <div className="max-width-container section-padding text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to transform your rental business?
            </h2>
            <p className="mt-4 text-lg text-primary-100">
              Join thousands of hosts using ProhostAI to automate their operations
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="https://app.prohostai.com/signup"
                className="rounded-lg bg-white px-6 py-3 text-base font-semibold text-primary-600 shadow-sm hover:bg-gray-50 transition-colors"
              >
                Get Started Free
              </Link>
              <Link
                href="/pricing"
                className="text-base font-semibold text-white hover:text-primary-100 transition-colors"
              >
                View Pricing <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Blog Preview Section */}
        <section className="py-24 bg-white">
          <div className="max-width-container section-padding">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                  Latest from our blog
                </h2>
                <p className="mt-2 text-lg text-gray-600">
                  Tips and insights for property managers
                </p>
              </div>
              <Link
                href="/blog"
                className="hidden sm:block text-base font-semibold text-primary-600 hover:text-primary-700 transition-colors"
              >
                View all posts <span aria-hidden="true">→</span>
              </Link>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {/* Blog post placeholders - will be replaced with dynamic content */}
              {[1, 2, 3].map((i) => (
                <article
                  key={i}
                  className="group cursor-pointer"
                >
                  <div className="aspect-video bg-gray-200 rounded-lg mb-4"></div>
                  <time className="text-sm text-gray-500">Coming soon</time>
                  <h3 className="mt-2 text-xl font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                    Blog post {i}
                  </h3>
                  <p className="mt-2 text-gray-600 line-clamp-2">
                    Exciting content about property management and AI automation coming soon.
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

const features = [
  {
    title: 'AI Guest Communications',
    description: 'Respond to guest inquiries instantly with AI that understands context and maintains your brand voice.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
      </svg>
    ),
  },
  {
    title: 'Smart Pricing Optimization',
    description: 'Maximize revenue with dynamic pricing that adapts to market demand, seasonality, and local events.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Automated Task Management',
    description: 'Coordinate cleaning, maintenance, and check-ins automatically with smart scheduling and reminders.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Multi-Platform Integration',
    description: 'Sync seamlessly with Airbnb, VRBO, Booking.com, and other major platforms from one dashboard.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
      </svg>
    ),
  },
  {
    title: 'Performance Analytics',
    description: 'Track occupancy, revenue, and guest satisfaction with comprehensive reporting and insights.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
  },
  {
    title: 'Vendor Directory',
    description: 'Find and manage trusted vendors for cleaning, maintenance, and other property services.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
  },
];