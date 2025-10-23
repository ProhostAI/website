'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

const navigation = [
  { name: 'Pricing', href: '/pricing' },
  { name: 'Vendors', href: '/vendors' },
  { name: 'Blog', href: '/blog' },
  { name: 'About', href: '/about' },
];

const featuresMenu = [
  {
    name: 'AI Messaging',
    href: '/#features',
    description: 'AI-powered guest communications',
  },
  {
    name: 'AI Tasks',
    href: '/#features',
    description: 'Automated maintenance management',
  },
  {
    name: 'Cleanings',
    href: '/#features',
    description: 'Smart cleaning coordination',
  },
  {
    name: 'Calendar',
    href: '/#features',
    description: 'Multi-property calendar view',
  },
  {
    name: 'Upsells',
    href: '/#features',
    description: 'Maximize booking revenue',
  },
];

const resourcesMenu = [
  {
    name: 'Help Center',
    href: 'https://help.prohost.ai/en/',
    description: 'Feature how-tos & FAQs',
    external: true
  },
  {
    name: 'Downloads',
    href: '/downloads',
    description: 'iOS & Android apps',
    external: false
  },
  {
    name: 'Terms of Service',
    href: '/terms',
    description: 'Your rights and obligations',
    external: false
  },
  {
    name: 'Privacy Policy',
    href: '/privacy',
    description: 'How we protect your data',
    external: false
  },
  {
    name: 'Careers',
    href: 'https://app.dover.com/jobs/prohost',
    description: 'Join our team',
    external: true
  },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed top-0 z-50 w-full bg-white/80 backdrop-blur-md">
      <nav className="px-4 sm:px-8 lg:px-[30px]" aria-label="Global">
        <div className="flex items-center justify-between py-4">
          {/* Logo and Desktop Navigation - Left Side */}
          <div className="flex items-center gap-10">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <img
                className="h-8 w-auto"
                src="/prohostai-logo.svg"
                alt="ProhostAI"
              />
            </Link>

            {/* Desktop navigation */}
            <div className="hidden lg:flex lg:gap-x-4 lg:items-center">
              {/* Features Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setFeaturesOpen(true)}
                onMouseLeave={() => setFeaturesOpen(false)}
              >
                <button
                  className="flex items-center text-sm font-medium text-black transition-all rounded-full px-3 py-1.5 hover:bg-gray-100"
                  style={{ lineHeight: '21px' }}
                >
                  Features
                  <svg
                    className={`ml-1 h-4 w-4 transition-transform ${featuresOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>
              </div>

              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-medium transition-all rounded-full px-3 py-1.5 hover:bg-gray-100 ${
                    pathname === item.href ? 'text-primary-600' : 'text-black'
                  }`}
                  style={{ lineHeight: '21px' }}
                >
                  {item.name}
                </Link>
              ))}

              {/* Resources Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setResourcesOpen(true)}
                onMouseLeave={() => setResourcesOpen(false)}
              >
                <button
                  className="flex items-center text-sm font-medium text-black transition-all rounded-full px-3 py-1.5 hover:bg-gray-100"
                  style={{ lineHeight: '21px' }}
                >
                  Resources
                  <svg
                    className={`ml-1 h-4 w-4 transition-transform ${resourcesOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>

          {/* CTA Buttons - Right Side */}
          <div className="hidden lg:flex lg:items-center lg:gap-x-[30px]">
            <Link
              href="https://app.prohost.ai/signin"
              className="text-sm font-medium text-black hover:text-primary-600 transition-colors whitespace-nowrap"
              style={{ lineHeight: '21px' }}
            >
              Log In
            </Link>
            <div className="flex items-center gap-x-3">
              <Link
                href="https://cal.com/billu/prohostdemo"
                target="_blank"
                className="rounded-full border border-black px-5 py-2 text-sm font-medium text-black hover:bg-gray-50 transition-colors whitespace-nowrap"
                style={{ lineHeight: '21px' }}
              >
                Book a demo
              </Link>
              <Link
                href="https://app.prohost.ai/signup"
                className="rounded-full bg-black px-5 py-2 text-sm font-medium text-white hover:bg-gray-800 transition-colors whitespace-nowrap"
                style={{ lineHeight: '21px' }}
              >
                Sign up now
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden">
            <div className="space-y-1 pb-3 pt-2">
              {/* Mobile Features Section */}
              <div className="px-3 py-2">
                <p className="text-sm font-semibold text-gray-900 mb-2">Features</p>
                {featuresMenu.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block rounded-lg px-3 py-2 text-base font-medium ${
                    pathname === item.href
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              {/* Mobile Resources Section */}
              <div className="px-3 py-2">
                <p className="text-sm font-semibold text-gray-900 mb-2">Resources</p>
                {resourcesMenu.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    className="block rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-2">
                <Link
                  href="https://app.prohost.ai/signin"
                  className="block rounded-lg px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Log In
                </Link>
                <Link
                  href="https://cal.com/billu/prohostdemo"
                  target="_blank"
                  className="block rounded-lg border border-gray-300 px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Book a demo
                </Link>
                <Link
                  href="https://app.prohost.ai/signup"
                  className="block rounded-lg bg-gray-900 px-3 py-2 text-base font-medium text-white hover:bg-gray-800"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign up now
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Full-screen Features Dropdown */}
      {featuresOpen && (
        <div
          className="fixed left-0 right-0 top-[65px] bg-white border-t border-gray-100 shadow-lg"
          onMouseEnter={() => setFeaturesOpen(true)}
          onMouseLeave={() => setFeaturesOpen(false)}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-[30px] py-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {featuresMenu.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="group block p-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-sm font-semibold text-gray-900 group-hover:text-primary-600 mb-1">
                    {item.name}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {item.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Full-screen Resources Dropdown */}
      {resourcesOpen && (
        <div
          className="fixed left-0 right-0 top-[65px] bg-white border-t border-gray-100 shadow-lg"
          onMouseEnter={() => setResourcesOpen(true)}
          onMouseLeave={() => setResourcesOpen(false)}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-[30px] py-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {resourcesMenu.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className="group block p-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-sm font-semibold text-gray-900 group-hover:text-primary-600 mb-1">
                    {item.name}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {item.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}