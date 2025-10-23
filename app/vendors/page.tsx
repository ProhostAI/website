'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { VendorProfile, VendorFilters } from '@/lib/api';

// Mock data for now - will be replaced with API calls
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

const serviceOptions = [
  'Cleaning',
  'Maintenance',
  'Laundry',
  'Pool Service',
  'Landscaping',
  'Lawn Care',
  'Garden Maintenance',
  'Pest Control',
  'HVAC',
  'Plumbing',
  'Electrical',
  'Photography',
  'Virtual Tours',
  '3D Scanning',
  'Interior Design',
  'Property Management',
  'Repairs',
  'Emergency Service',
  'Restocking',
];

const areaOptions = [
  'Miami',
  'Miami Beach',
  'Fort Lauderdale',
  'West Palm Beach',
  'Orlando',
  'Tampa',
  'Jacksonville',
  'Naples',
  'Aventura',
  'Hollywood',
  'Pompano Beach',
  'Kissimmee',
  'Winter Park',
  'St. Petersburg',
  'Clearwater',
  'Coral Gables',
  'Kendall',
];

export default function VendorDirectoryPage() {
  const [vendors, setVendors] = useState<VendorProfile[]>(mockVendors);
  const [filters, setFilters] = useState<VendorFilters>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  // In production, this would fetch from the API
  useEffect(() => {
    // Simulate filtering
    let filtered = mockVendors;

    if (searchTerm) {
      filtered = filtered.filter(v =>
        v.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filters.services && filters.services.length > 0) {
      filtered = filtered.filter(v =>
        filters.services!.some(service => v.services.includes(service))
      );
    }

    if (filters.serviceAreas && filters.serviceAreas.length > 0) {
      filtered = filtered.filter(v =>
        filters.serviceAreas!.some(area => v.serviceAreas.includes(area))
      );
    }

    setVendors(filtered);
  }, [searchTerm, filters]);

  return (
    <>
      <Header />

      <main className="pt-16 min-h-screen bg-gray-50">
        <div className="py-12 bg-white border-b">
          <div className="max-width-container section-padding">
            <h1 className="text-4xl font-bold text-gray-900 text-center">Vendor Marketplace</h1>
            <p className="mt-4 text-lg text-gray-600 text-center">
              Find trusted vendors and service providers for your rental properties
            </p>

            {/* Search Bar */}
            <div className="mt-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search vendors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 pr-12 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <svg
                  className="absolute right-4 top-3.5 h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="max-width-container section-padding py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <aside className="lg:w-64 flex-shrink-0">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Filters</h2>

                {/* Service Filter */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Services</h3>
                  <div className="space-y-2">
                    {serviceOptions.map((service) => (
                      <label key={service} className="flex items-center">
                        <input
                          type="checkbox"
                          className="rounded text-primary-600 focus:ring-primary-500"
                          checked={filters.services?.includes(service) || false}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFilters({
                                ...filters,
                                services: [...(filters.services || []), service],
                              });
                            } else {
                              setFilters({
                                ...filters,
                                services: filters.services?.filter(s => s !== service),
                              });
                            }
                          }}
                        />
                        <span className="ml-2 text-sm text-gray-600">{service}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Area Filter */}
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Service Areas</h3>
                  <div className="space-y-2">
                    {areaOptions.map((area) => (
                      <label key={area} className="flex items-center">
                        <input
                          type="checkbox"
                          className="rounded text-primary-600 focus:ring-primary-500"
                          checked={filters.serviceAreas?.includes(area) || false}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFilters({
                                ...filters,
                                serviceAreas: [...(filters.serviceAreas || []), area],
                              });
                            } else {
                              setFilters({
                                ...filters,
                                serviceAreas: filters.serviceAreas?.filter(a => a !== area),
                              });
                            }
                          }}
                        />
                        <span className="ml-2 text-sm text-gray-600">{area}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Clear Filters */}
                <button
                  onClick={() => setFilters({})}
                  className="mt-6 w-full py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            </aside>

            {/* Vendor Grid */}
            <div className="flex-1">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  Showing {vendors.length} vendor{vendors.length !== 1 ? 's' : ''}
                </p>
              </div>

              {vendors.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                  <p className="text-gray-500">No vendors found matching your criteria.</p>
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2">
                  {vendors.map((vendor) => (
                    <Link
                      key={vendor.id}
                      href={`/vendors/${vendor.slug}`}
                      className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-all overflow-hidden"
                    >
                      <div className="aspect-video bg-gray-100 relative">
                        {vendor.coverImageUrl && (
                          <img
                            src={vendor.coverImageUrl}
                            alt={vendor.businessName}
                            className="w-full h-full object-cover"
                          />
                        )}
                        {vendor.verified && (
                          <span className="absolute top-4 right-4 bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                            Verified
                          </span>
                        )}
                      </div>
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                            {vendor.businessName}
                          </h3>
                          {vendor.averageRating && (
                            <div className="flex items-center text-sm">
                              <svg className="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              <span className="ml-1 text-gray-600">
                                {vendor.averageRating} ({vendor.totalReviews})
                              </span>
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                          {vendor.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {vendor.services.slice(0, 3).map((service) => (
                            <span
                              key={service}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
                            >
                              {service}
                            </span>
                          ))}
                          {vendor.services.length > 3 && (
                            <span className="text-xs text-gray-500">
                              +{vendor.services.length - 3} more
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500">
                          Serves: {vendor.serviceAreas.join(', ')}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}