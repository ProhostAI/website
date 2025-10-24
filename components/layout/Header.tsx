'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
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
    description: 'AI-suggested replies to guest messages',
  },
  {
    name: 'AI Autopilot',
    href: '/#features',
    description: '24/7 coverage for guest messages',
  },
  {
    name: 'Upsells',
    href: '/#features',
    description: 'Each revenues from open gap nights',
  },
  {
    name: 'Calendar',
    href: '/#features',
    description: 'The best calendar for hosts available on desktop & mobile',
  },
  {
    name: 'Native apps',
    href: '/downloads',
    description: 'Available on iOS & Android',
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
  const [isAnimating, setIsAnimating] = useState(false);
  const [featuresTimeout, setFeaturesTimeout] = useState<NodeJS.Timeout | null>(null);
  const [resourcesTimeout, setResourcesTimeout] = useState<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  const handleFeaturesEnter = () => {
    if (featuresTimeout) clearTimeout(featuresTimeout);
    setFeaturesOpen(true);
    setResourcesOpen(false);
  };

  const handleFeaturesLeave = () => {
    const timeout = setTimeout(() => {
      setFeaturesOpen(false);
    }, 100);
    setFeaturesTimeout(timeout);
  };

  const handleResourcesEnter = () => {
    if (resourcesTimeout) clearTimeout(resourcesTimeout);
    setResourcesOpen(true);
    setFeaturesOpen(false);
  };

  const handleResourcesLeave = () => {
    const timeout = setTimeout(() => {
      setResourcesOpen(false);
    }, 100);
    setResourcesTimeout(timeout);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      // Check if click is outside navigation and dropdown areas
      if (!target.closest('nav') && !target.closest('[data-dropdown]')) {
        setFeaturesOpen(false);
        setResourcesOpen(false);
        setIsAnimating(false);
      }
    };

    if (featuresOpen || resourcesOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [featuresOpen, resourcesOpen]);

  return (
    <>
    <header className="fixed top-0 z-50 w-full bg-white">
      <nav className="px-4 sm:px-8 lg:px-[30px]" aria-label="Global">
        <div className="flex items-center justify-between h-20">
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
            <div className="hidden lg:flex lg:gap-x-2 lg:items-center">
              {/* Features Dropdown */}
              <div
                className="relative"
                onMouseEnter={handleFeaturesEnter}
                onMouseLeave={handleFeaturesLeave}
              >
                <button
                  className="flex items-center text-[16px] font-medium text-black transition-colors px-3 py-1.5"
                  style={{ lineHeight: '22px', color: featuresOpen ? '#333741' : 'inherit' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#333741'}
                  onMouseLeave={(e) => e.currentTarget.style.color = featuresOpen ? '#333741' : 'black'}
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

                {/* Features Dropdown Menu */}
                {featuresOpen && (
                  <div
                    data-dropdown
                    className="absolute left-0 top-full mt-2 w-full sm:w-[640px] bg-white border border-gray-200 shadow-lg z-50"
                    style={{ borderRadius: '32px' }}
                  >
                    <div className="p-6 sm:p-10">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 sm:gap-x-10 gap-y-0">
                        {featuresMenu.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="block p-2 sm:p-3 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <h4
                              className="text-[16px] font-medium text-gray-900"
                              style={{
                                lineHeight: '22px',
                                letterSpacing: '-0.18px',
                                fontWeight: 500,
                                marginBottom: '4px'
                              }}
                            >
                              {item.name}
                            </h4>
                            <p
                              className="text-[14px] font-normal"
                              style={{
                                lineHeight: '20px',
                                color: '#667085',
                                fontWeight: 400,
                                marginTop: 0
                              }}
                            >
                              {item.description}
                            </p>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-[16px] font-medium transition-colors px-3 py-1.5 ${
                    pathname === item.href ? 'text-primary-600' : 'text-black'
                  }`}
                  style={{ lineHeight: '22px' }}
                  onMouseEnter={(e) => { if (pathname !== item.href) e.currentTarget.style.color = '#333741'; }}
                  onMouseLeave={(e) => { if (pathname !== item.href) e.currentTarget.style.color = 'black'; }}
                >
                  {item.name}
                </Link>
              ))}

              {/* Resources Dropdown */}
              <div
                className="relative"
                onMouseEnter={handleResourcesEnter}
                onMouseLeave={handleResourcesLeave}
              >
                <button
                  className="flex items-center text-[16px] font-medium text-black transition-colors px-3 py-1.5"
                  style={{ lineHeight: '22px', color: resourcesOpen ? '#333741' : 'inherit' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#333741'}
                  onMouseLeave={(e) => e.currentTarget.style.color = resourcesOpen ? '#333741' : 'black'}
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

                {/* Resources Dropdown Menu */}
                {resourcesOpen && (
                  <div
                    data-dropdown
                    className="absolute left-0 top-full mt-2 w-full sm:w-[640px] bg-white border border-gray-200 shadow-lg z-50"
                    style={{ borderRadius: '32px' }}
                  >
                    <div className="p-6 sm:p-10">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 sm:gap-x-10 gap-y-0">
                        {resourcesMenu.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            target={item.external ? "_blank" : undefined}
                            rel={item.external ? "noopener noreferrer" : undefined}
                            className="block p-2 sm:p-3 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <h4
                              className="text-[16px] font-medium text-gray-900"
                              style={{
                                lineHeight: '22px',
                                letterSpacing: '-0.18px',
                                fontWeight: 500,
                                marginBottom: '4px'
                              }}
                            >
                              {item.name}
                            </h4>
                            <p
                              className="text-[14px] font-normal"
                              style={{
                                lineHeight: '20px',
                                color: '#667085',
                                fontWeight: 400,
                                marginTop: 0
                              }}
                            >
                              {item.description}
                            </p>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
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
              className="text-[16px] font-medium text-black transition-colors whitespace-nowrap"
              style={{ lineHeight: '22px' }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#333741'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'black'}
            >
              Log In
            </Link>
            <div className="flex items-center gap-x-3">
              <Link
                href="https://cal.com/billu/prohostdemo"
                target="_blank"
                className="rounded-full border border-black px-5 py-2 text-[16px] font-medium text-black hover:bg-gray-50 transition-colors whitespace-nowrap"
                style={{ lineHeight: '22px' }}
              >
                Book a demo
              </Link>
              <Link
                href="https://app.prohost.ai/signup"
                className="rounded-full bg-black px-5 py-2 text-[16px] font-medium text-white hover:bg-gray-800 transition-colors whitespace-nowrap"
                style={{ lineHeight: '22px' }}
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
    </header>
    </>
  );
}