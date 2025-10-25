'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import type { Vendor, Category } from '@/lib/supabase/types';

// Map Supabase vendor to the UI format
interface VendorProfile {
  id: string;
  slug: string;
  businessName: string;
  description: string;
  services: string[];
  serviceAreas: string[];
  website: string | null;
  phone: string | null;
  email: string | null;
  verified: boolean;
  featured: boolean;
  averageRating: number;
  totalReviews: number;
  logoUrl: string | null;
  coverImageUrl: string | null;
}

const serviceOptions = [
  'Web Development',
  'Mobile Development',
  'Cloud Services',
  'Digital Marketing',
  'UI/UX Design',
  'DevOps',
  'Cybersecurity',
  'Data Analytics',
  'AI/ML Services',
  'Consulting',
  'SEO',
  'Content Marketing',
  'API Development',
  'E-commerce Solutions',
];

const areaOptions = [
  'Miami',
  'Miami Beach',
  'Fort Lauderdale',
  'West Palm Beach',
  'Orlando',
  'Tampa',
  'Jacksonville',
  'San Francisco',
  'New York',
  'Los Angeles',
  'Seattle',
  'Austin',
  'Remote',
  'Worldwide',
];

export default function VendorDirectoryPage() {
  const [vendors, setVendors] = useState<VendorProfile[]>([]);
  const [allVendors, setAllVendors] = useState<VendorProfile[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch vendors from Supabase
  useEffect(() => {
    fetchVendors();
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = allVendors;

    if (searchTerm) {
      filtered = filtered.filter(v =>
        v.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedServices.length > 0) {
      filtered = filtered.filter(v =>
        selectedServices.some(service => v.services.includes(service))
      );
    }

    if (selectedAreas.length > 0) {
      filtered = filtered.filter(v =>
        selectedAreas.some(area => v.serviceAreas.includes(area))
      );
    }

    setVendors(filtered);
  }, [searchTerm, selectedServices, selectedAreas, allVendors]);

  const fetchVendors = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/vendors?limit=50&sortBy=rating&sortOrder=desc');
      const data = await response.json();

      // Transform Supabase vendors to match the UI format
      const transformedVendors: VendorProfile[] = (data.vendors || []).map((vendor: Vendor & { category?: Category }) => ({
        id: vendor.id,
        slug: vendor.slug,
        businessName: vendor.name,
        description: vendor.description || '',
        services: vendor.services || [],
        serviceAreas: vendor.city ? [vendor.city, vendor.state_province].filter(Boolean) : ['Remote'],
        website: vendor.website_url,
        phone: vendor.phone,
        email: vendor.email,
        verified: vendor.is_verified,
        featured: vendor.is_featured,
        averageRating: vendor.rating,
        totalReviews: vendor.review_count,
        logoUrl: vendor.logo_url,
        coverImageUrl: vendor.logo_url, // Use logo as cover for now
      }));

      setAllVendors(transformedVendors);
      setVendors(transformedVendors);
    } catch (error) {
      console.error('Error fetching vendors:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />

      <main className="pt-16 min-h-screen bg-gray-50">
        <div className="py-12 bg-white border-b">
          <div className="max-width-container section-padding">
            <h1 className="text-4xl font-bold text-gray-900 text-center">Vendor Marketplace</h1>
            <p className="mt-4 text-lg text-gray-600 text-center">
              Find trusted vendors and service providers for your business needs
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
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {serviceOptions.map((service) => (
                      <label key={service} className="flex items-center">
                        <input
                          type="checkbox"
                          className="rounded text-primary-600 focus:ring-primary-500"
                          checked={selectedServices.includes(service)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedServices([...selectedServices, service]);
                            } else {
                              setSelectedServices(selectedServices.filter(s => s !== service));
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
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {areaOptions.map((area) => (
                      <label key={area} className="flex items-center">
                        <input
                          type="checkbox"
                          className="rounded text-primary-600 focus:ring-primary-500"
                          checked={selectedAreas.includes(area)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedAreas([...selectedAreas, area]);
                            } else {
                              setSelectedAreas(selectedAreas.filter(a => a !== area));
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
                  onClick={() => {
                    setSelectedServices([]);
                    setSelectedAreas([]);
                  }}
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

              {loading ? (
                <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                  <p className="text-gray-500">Loading vendors...</p>
                </div>
              ) : vendors.length === 0 ? (
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
                        {vendor.coverImageUrl ? (
                          <img
                            src={vendor.coverImageUrl}
                            alt={vendor.businessName}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
                            <div className="text-white text-center">
                              <div className="text-3xl font-bold mb-1">
                                {vendor.businessName.substring(0, 2).toUpperCase()}
                              </div>
                              <div className="text-xs opacity-75">
                                {vendor.services[0]}
                              </div>
                            </div>
                          </div>
                        )}
                        {vendor.verified && (
                          <span className="absolute top-4 right-4 bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                            Verified
                          </span>
                        )}
                        {vendor.featured && (
                          <span className="absolute top-4 left-4 bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                            Featured
                          </span>
                        )}
                      </div>
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                            {vendor.businessName}
                          </h3>
                          {vendor.averageRating > 0 && (
                            <div className="flex items-center text-sm">
                              <svg className="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              <span className="ml-1 text-gray-600">
                                {vendor.averageRating.toFixed(1)} ({vendor.totalReviews})
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