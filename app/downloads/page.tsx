import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Download ProhostAI Apps - iOS & Android',
  description: 'Download ProhostAI mobile apps for iOS and Android. Manage your properties on the go with our AI-powered mobile applications.',
};

export default function DownloadsPage() {
  return (
    <>
      <Header />

      <main className="pt-16 min-h-screen bg-white">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-purple-50 to-white">
          <div className="max-width-container section-padding">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Manage Properties On The Go
              </h1>
              <p className="text-xl text-gray-600">
                Download ProhostAI mobile apps and stay connected with your guests and properties anywhere, anytime.
              </p>
            </div>

            {/* App Download Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                href="https://apps.apple.com/us/app/prohostai/id6503224326"
                target="_blank"
                className="inline-flex items-center justify-center px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                <svg className="w-8 h-8 mr-3" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <div className="text-left">
                  <div className="text-xs">Download on the</div>
                  <div className="text-lg font-semibold">App Store</div>
                </div>
              </Link>

              <Link
                href="https://play.google.com/store/apps/details?id=ai.prohost.android&hl=en&pli=1"
                target="_blank"
                className="inline-flex items-center justify-center px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                <svg className="w-8 h-8 mr-3" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                </svg>
                <div className="text-left">
                  <div className="text-xs">Get it on</div>
                  <div className="text-lg font-semibold">Google Play</div>
                </div>
              </Link>
            </div>

            {/* App Screenshots */}
            <div className="relative max-w-5xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    All Your Properties in Your Pocket
                  </h2>
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-start">
                      <svg className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <h3 className="font-semibold text-gray-900">Real-time Guest Messaging</h3>
                        <p className="text-gray-600">Respond to guests instantly with AI assistance</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <h3 className="font-semibold text-gray-900">Calendar Management</h3>
                        <p className="text-gray-600">View and manage bookings across all platforms</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <h3 className="font-semibold text-gray-900">Task Tracking</h3>
                        <p className="text-gray-600">Monitor cleaning and maintenance tasks</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <h3 className="font-semibold text-gray-900">Push Notifications</h3>
                        <p className="text-gray-600">Never miss important updates or messages</p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="relative">
                  <div className="relative z-10 mx-auto w-64">
                    {/* Phone mockup with screenshot */}
                    <div className="relative mx-auto border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl">
                      <div className="w-[148px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
                      <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[124px] rounded-l-lg"></div>
                      <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[178px] rounded-l-lg"></div>
                      <div className="h-[64px] w-[3px] bg-gray-800 absolute -right-[17px] top-[142px] rounded-r-lg"></div>
                      <div className="rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-white">
                        <Image
                          src="/images/mobile-app-screenshot.png"
                          alt="ProhostAI Mobile App"
                          width={272}
                          height={572}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-16 bg-gray-50">
          <div className="max-width-container section-padding">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Mobile Features
            </h2>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 mb-4 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-4l-4 4z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Instant Messaging</h3>
                <p className="text-gray-600">Chat with guests in real-time with AI-powered suggestions</p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 mb-4 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Task Management</h3>
                <p className="text-gray-600">Create, assign, and track cleaning and maintenance tasks</p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 mb-4 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Calendar Sync</h3>
                <p className="text-gray-600">View bookings from all platforms in one unified calendar</p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 mb-4 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Smart Notifications</h3>
                <p className="text-gray-600">Get alerted for urgent messages and important updates</p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 mb-4 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Analytics</h3>
                <p className="text-gray-600">Track performance metrics and revenue on the go</p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 mb-4 bg-pink-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Team Collaboration</h3>
                <p className="text-gray-600">Coordinate with cleaners, maintenance, and co-hosts</p>
              </div>
            </div>
          </div>
        </section>

        {/* System Requirements */}
        <section className="py-16">
          <div className="max-width-container section-padding">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              System Requirements
            </h2>

            <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-4">iOS</h3>
                <p className="text-gray-600 mb-2">Requires iOS 13.0 or later</p>
                <p className="text-gray-600 mb-2">Compatible with iPhone and iPad</p>
                <p className="text-gray-600">Optimized for iPhone 12 and newer</p>
              </div>

              <div className="text-center">
                <h3 className="text-xl font-semibold mb-4">Android</h3>
                <p className="text-gray-600 mb-2">Requires Android 7.0 or later</p>
                <p className="text-gray-600 mb-2">Compatible with phones and tablets</p>
                <p className="text-gray-600">Works best with 2GB+ RAM</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-primary-600 to-purple-700">
          <div className="max-width-container section-padding text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Download the app and start your 14-day free trial today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="https://apps.apple.com/us/app/prohostai/id6503224326"
                target="_blank"
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                Download for iOS
              </Link>

              <Link
                href="https://play.google.com/store/apps/details?id=ai.prohost.android&hl=en&pli=1"
                target="_blank"
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                </svg>
                Download for Android
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}