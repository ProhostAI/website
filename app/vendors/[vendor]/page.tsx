'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { VendorProfile } from '@/lib/api';

// Import the mock vendors from the parent directory
const mockVendors: VendorProfile[] = [
  {
    id: '1',
    slug: 'sparkle-clean-miami',
    businessName: 'Sparkle Clean Miami',
    description: 'Professional cleaning service specializing in vacation rental turnovers.',
    services: ['Cleaning', 'Laundry', 'Restocking'],
    serviceAreas: ['Miami', 'Miami Beach', 'Aventura'],
    website: 'https://sparklecleanmiami.com',
    phone: '(305) 555-0123',
    email: 'info@sparklecleanmiami.com',
    verified: true,
    featured: true,
    averageRating: 4.8,
    totalReviews: 127,
    logoUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=100&h=100&fit=crop',
    coverImageUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=200&fit=crop',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-20',
  },
  {
    id: '2',
    slug: 'handy-helpers-fort-lauderdale',
    businessName: 'Handy Helpers Fort Lauderdale',
    description: 'Reliable maintenance and repair services for property managers.',
    services: ['Maintenance', 'Repairs', 'Emergency Service'],
    serviceAreas: ['Fort Lauderdale', 'Hollywood', 'Pompano Beach'],
    website: 'https://handyhelpers.com',
    phone: '(954) 555-0456',
    email: 'contact@handyhelpers.com',
    verified: true,
    featured: false,
    averageRating: 4.6,
    totalReviews: 89,
    logoUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=100&h=100&fit=crop',
    coverImageUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=200&fit=crop',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-18',
  },
  {
    id: '3',
    slug: 'coastal-pools-orlando',
    businessName: 'Coastal Pools Orlando',
    description: 'Expert pool maintenance and cleaning for vacation rental properties.',
    services: ['Pool Service', 'Maintenance', 'Emergency Service'],
    serviceAreas: ['Orlando', 'Kissimmee', 'Winter Park'],
    website: 'https://coastalpoolsorlando.com',
    phone: '(407) 555-0789',
    email: 'service@coastalpoolsorlando.com',
    verified: true,
    featured: false,
    averageRating: 4.9,
    totalReviews: 203,
    logoUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop',
    coverImageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=200&fit=crop',
    createdAt: '2024-01-12',
    updatedAt: '2024-01-19',
  },
  {
    id: '4',
    slug: 'sunshine-landscaping-tampa',
    businessName: 'Sunshine Landscaping Tampa',
    description: 'Full-service landscaping and lawn care for property managers.',
    services: ['Landscaping', 'Lawn Care', 'Garden Maintenance'],
    serviceAreas: ['Tampa', 'St. Petersburg', 'Clearwater'],
    website: 'https://sunshinelandscaping.com',
    phone: '(813) 555-0234',
    email: 'info@sunshinelandscaping.com',
    verified: false,
    featured: false,
    averageRating: 4.5,
    totalReviews: 67,
    logoUrl: 'https://images.unsplash.com/photo-1558904541-efa843a96f01?w=100&h=100&fit=crop',
    coverImageUrl: 'https://images.unsplash.com/photo-1558904541-efa843a96f01?w=400&h=200&fit=crop',
    createdAt: '2024-01-08',
    updatedAt: '2024-01-16',
  },
  {
    id: '5',
    slug: 'quick-fix-hvac-miami',
    businessName: 'QuickFix HVAC Miami',
    description: '24/7 HVAC repair and maintenance specialists for rental properties.',
    services: ['HVAC', 'Emergency Service', 'Maintenance'],
    serviceAreas: ['Miami', 'Coral Gables', 'Kendall'],
    website: 'https://quickfixhvac.com',
    phone: '(305) 555-0567',
    email: 'support@quickfixhvac.com',
    verified: true,
    featured: true,
    averageRating: 4.7,
    totalReviews: 156,
    logoUrl: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=100&h=100&fit=crop',
    coverImageUrl: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=200&fit=crop',
    createdAt: '2024-01-05',
    updatedAt: '2024-01-21',
  },
  {
    id: '6',
    slug: 'pro-photo-studios',
    businessName: 'Pro Photo Studios',
    description: 'Professional real estate photography for vacation rental listings.',
    services: ['Photography', 'Virtual Tours', '3D Scanning'],
    serviceAreas: ['Miami', 'Fort Lauderdale', 'West Palm Beach'],
    website: 'https://prophotostudios.com',
    phone: '(561) 555-0890',
    email: 'bookings@prophotostudios.com',
    verified: true,
    featured: false,
    averageRating: 5.0,
    totalReviews: 94,
    logoUrl: 'https://images.unsplash.com/photo-1609034227505-5876f6aa4e90?w=100&h=100&fit=crop',
    coverImageUrl: 'https://images.unsplash.com/photo-1609034227505-5876f6aa4e90?w=400&h=200&fit=crop',
    createdAt: '2024-01-03',
    updatedAt: '2024-01-17',
  },
];

export default function VendorProfilePage() {
  const params = useParams();
  const vendorSlug = params.vendor as string;

  // Find vendor by slug
  const vendor = mockVendors.find(v => v.slug === vendorSlug);

  if (!vendor) {
    return (
      <>
        <Header />
        <main className="pt-16 min-h-screen bg-gray-50">
          <div className="max-width-container section-padding py-24 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Vendor Not Found</h1>
            <p className="text-gray-600 mb-8">The vendor you're looking for doesn't exist.</p>
            <Link href="/vendors" className="text-primary-600 hover:text-primary-700 font-medium">
              ← Back to Vendors
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      <main className="pt-16 min-h-screen bg-gray-50">
        {/* Hero Section with Cover Image */}
        <div className="relative h-64 md:h-80 bg-gray-900">
          <img
            src={vendor.coverImageUrl}
            alt={vendor.businessName}
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
        </div>

        {/* Vendor Info Section */}
        <div className="max-width-container section-padding">
          <div className="relative -mt-20 mb-8">
            <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                {/* Logo */}
                <div className="flex-shrink-0">
                  <img
                    src={vendor.logoUrl}
                    alt={`${vendor.businessName} logo`}
                    className="w-24 h-24 rounded-lg object-cover"
                  />
                </div>

                {/* Main Info */}
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-3">
                        <h1 className="text-3xl font-bold text-gray-900">{vendor.businessName}</h1>
                        {vendor.verified && (
                          <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                            Verified
                          </span>
                        )}
                        {vendor.featured && (
                          <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                            Featured
                          </span>
                        )}
                      </div>
                      {vendor.averageRating && (
                        <div className="flex items-center mt-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={`h-5 w-5 ${i < Math.floor(vendor.averageRating!) ? 'text-yellow-400' : 'text-gray-300'}`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                            <span className="ml-2 text-sm text-gray-600">
                              {vendor.averageRating} ({vendor.totalReviews} reviews)
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Contact Buttons */}
                    <div className="flex gap-3">
                      <a
                        href={`tel:${vendor.phone}`}
                        className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        Call
                      </a>
                      <a
                        href={`mailto:${vendor.email}`}
                        className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Email
                      </a>
                    </div>
                  </div>

                  <p className="text-gray-600 text-lg mb-6">{vendor.description}</p>

                  {/* Services */}
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Services</h3>
                    <div className="flex flex-wrap gap-2">
                      {vendor.services.map(service => (
                        <span
                          key={service}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Service Areas */}
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Service Areas</h3>
                    <div className="flex flex-wrap gap-2">
                      {vendor.serviceAreas.map(area => (
                        <span
                          key={area}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700"
                        >
                          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="grid md:grid-cols-3 gap-4 border-t pt-6">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-700 mb-2">Phone</h3>
                      <a href={`tel:${vendor.phone}`} className="text-gray-600 hover:text-primary-600">
                        {vendor.phone}
                      </a>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-700 mb-2">Email</h3>
                      <a href={`mailto:${vendor.email}`} className="text-gray-600 hover:text-primary-600">
                        {vendor.email}
                      </a>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-700 mb-2">Website</h3>
                      <a
                        href={vendor.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-primary-600"
                      >
                        Visit Website →
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Sections */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* About Section */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">About {vendor.businessName}</h2>
                <div className="prose text-gray-600">
                  <p>
                    {vendor.businessName} has been providing exceptional {vendor.services[0].toLowerCase()} services
                    to property managers and vacation rental hosts in the {vendor.serviceAreas[0]} area.
                    With a strong commitment to quality and customer satisfaction, they have built a reputation
                    as one of the most reliable service providers in the region.
                  </p>
                  <p className="mt-4">
                    Their team of experienced professionals understands the unique needs of short-term rental properties
                    and delivers services that help hosts maintain high standards while maximizing their rental income.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Stats</h2>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Average Rating</span>
                    <span className="font-semibold text-gray-900">{vendor.averageRating} ⭐</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Reviews</span>
                    <span className="font-semibold text-gray-900">{vendor.totalReviews}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service Areas</span>
                    <span className="font-semibold text-gray-900">{vendor.serviceAreas.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Verified Status</span>
                    <span className="font-semibold text-gray-900">{vendor.verified ? 'Yes ✓' : 'No'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Back to Directory */}
          <div className="mt-12 text-center">
            <Link
              href="/vendors"
              className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Directory
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}