'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Features', href: '/#features' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Blog', href: '/blog' },
  { name: 'About', href: '/about' },
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
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
      <nav className="max-width-container section-padding" aria-label="Global">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex lg:flex-1">
            <Link href="/" className="flex items-center space-x-2">
              <img
                className="h-8 w-auto"
                src="/logo-black.svg"
                alt="ProhostAI"
              />
              <span className="text-xl font-semibold text-gray-900">
                ProhostAI
              </span>
            </Link>
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

          {/* Desktop navigation */}
          <div className="hidden lg:flex lg:gap-x-8 lg:items-center">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary-600 ${
                  pathname === item.href ? 'text-primary-600' : 'text-gray-700'
                }`}
              >
                {item.name}
              </Link>
            ))}

            {/* Resources Dropdown */}
            <div className="relative">
              <button
                className="flex items-center text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors"
                onClick={() => setResourcesOpen(!resourcesOpen)}
                onBlur={() => setTimeout(() => setResourcesOpen(false), 200)}
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

              {resourcesOpen && (
                <div className="absolute right-0 z-10 mt-3 w-64 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    {resourcesMenu.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        target={item.external ? "_blank" : undefined}
                        rel={item.external ? "noopener noreferrer" : undefined}
                        className="group block px-4 py-3 hover:bg-gray-50 transition-colors"
                        onClick={() => setResourcesOpen(false)}
                      >
                        <p className="text-sm font-medium text-gray-900 group-hover:text-primary-600">
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {item.description}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
            <Link
              href="https://app.prohostai.com/signin"
              className="text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors"
            >
              Sign in
            </Link>
            <Link
              href="https://app.prohostai.com/signup"
              className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden">
            <div className="space-y-1 pb-3 pt-2">
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
                  href="https://app.prohostai.com/signin"
                  className="block rounded-lg px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign in
                </Link>
                <Link
                  href="https://app.prohostai.com/signup"
                  className="block rounded-lg bg-primary-600 px-3 py-2 text-base font-medium text-white hover:bg-primary-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}