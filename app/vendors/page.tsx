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

interface FilterOption {
  name: string;
  count: number;
}

interface FiltersData {
  services: FilterOption[];
  serviceAreas: FilterOption[];
  totalVendors: number;
}

export default function VendorDirectoryPage() {
  const [vendors, setVendors] = useState<VendorProfile[]>([]);
  const [allVendors, setAllVendors] = useState<VendorProfile[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtersLoading, setFiltersLoading] = useState(true);
  const [filtersData, setFiltersData] = useState<FiltersData>({
    services: [],
    serviceAreas: [],
    totalVendors: 0
  });
  const [showAllServices, setShowAllServices] = useState(false);
  const [showAllAreas, setShowAllAreas] = useState(false);

  // Fetch vendors from Supabase
  useEffect(() => {
    fetchVendors();
    fetchFilters();
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

  const fetchFilters = async () => {
    setFiltersLoading(true);
    try {
      const response = await fetch('/api/vendors/filters');
      const data = await response.json();
      setFiltersData(data);
    } catch (error) {
      console.error('Error fetching filters:', error);
    } finally {
      setFiltersLoading(false);
    }
  };

  // Get display limits for filters
  const displayedServices = showAllServices ? filtersData.services : filtersData.services.slice(0, 8);
  const displayedAreas = showAllAreas ? filtersData.serviceAreas : filtersData.serviceAreas.slice(0, 8);

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
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                  {(selectedServices.length > 0 || selectedAreas.length > 0) && (
                    <button
                      onClick={() => {
                        setSelectedServices([]);
                        setSelectedAreas([]);
                      }}
                      className="text-sm text-primary-600 hover:text-primary-700"
                    >
                      Clear all
                    </button>
                  )}
                </div>

                {/* Active Filters Summary */}
                {(selectedServices.length > 0 || selectedAreas.length > 0) && (
                  <div className="mb-4 pb-4 border-b">
                    <p className="text-xs text-gray-500 mb-2">Active filters:</p>
                    <div className="flex flex-wrap gap-1">
                      {selectedServices.map(service => (
                        <span key={service} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary-100 text-primary-700">
                          {service}
                          <button
                            onClick={() => setSelectedServices(selectedServices.filter(s => s !== service))}
                            className="ml-1 hover:text-primary-900"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                      {selectedAreas.map(area => (
                        <span key={area} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700">
                          {area}
                          <button
                            onClick={() => setSelectedAreas(selectedAreas.filter(a => a !== area))}
                            className="ml-1 hover:text-gray-900"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Service Filter */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Services</h3>
                  {filtersLoading ? (
                    <div className="space-y-2">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="h-6 bg-gray-100 rounded animate-pulse"></div>
                      ))}
                    </div>
                  ) : (
                    <>
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {displayedServices.map((service) => (
                          <label key={service.name} className="flex items-center justify-between group cursor-pointer">
                            <div className="flex items-center flex-1">
                              <input
                                type="checkbox"
                                className="rounded text-primary-600 focus:ring-primary-500"
                                checked={selectedServices.includes(service.name)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSelectedServices([...selectedServices, service.name]);
                                  } else {
                                    setSelectedServices(selectedServices.filter(s => s !== service.name));
                                  }
                                }}
                              />
                              <span className="ml-2 text-sm text-gray-600 group-hover:text-gray-900">
                                {service.name}
                              </span>
                            </div>
                            <span className="text-xs text-gray-400">({service.count})</span>
                          </label>
                        ))}
                      </div>
                      {filtersData.services.length > 8 && (
                        <button
                          onClick={() => setShowAllServices(!showAllServices)}
                          className="mt-2 text-sm text-primary-600 hover:text-primary-700"
                        >
                          {showAllServices ? 'Show less' : `Show all (${filtersData.services.length})`}
                        </button>
                      )}
                    </>
                  )}
                </div>

                {/* Area Filter */}
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Service Areas</h3>
                  {filtersLoading ? (
                    <div className="space-y-2">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="h-6 bg-gray-100 rounded animate-pulse"></div>
                      ))}
                    </div>
                  ) : (
                    <>
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {displayedAreas.map((area) => (
                          <label key={area.name} className="flex items-center justify-between group cursor-pointer">
                            <div className="flex items-center flex-1">
                              <input
                                type="checkbox"
                                className="rounded text-primary-600 focus:ring-primary-500"
                                checked={selectedAreas.includes(area.name)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSelectedAreas([...selectedAreas, area.name]);
                                  } else {
                                    setSelectedAreas(selectedAreas.filter(a => a !== area.name));
                                  }
                                }}
                              />
                              <span className="ml-2 text-sm text-gray-600 group-hover:text-gray-900">
                                {area.name}
                              </span>
                            </div>
                            <span className="text-xs text-gray-400">({area.count})</span>
                          </label>
                        ))}
                      </div>
                      {filtersData.serviceAreas.length > 8 && (
                        <button
                          onClick={() => setShowAllAreas(!showAllAreas)}
                          className="mt-2 text-sm text-primary-600 hover:text-primary-700"
                        >
                          {showAllAreas ? 'Show less' : `Show all (${filtersData.serviceAreas.length})`}
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* Stats Card */}
              {!filtersLoading && (
                <div className="bg-white rounded-lg shadow-sm p-4 mt-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary-600">{filtersData.totalVendors}</p>
                    <p className="text-sm text-gray-600">Total Vendors</p>
                  </div>
                  <div className="mt-3 pt-3 border-t grid grid-cols-2 gap-2 text-center">
                    <div>
                      <p className="text-lg font-semibold text-gray-900">{filtersData.services.length}</p>
                      <p className="text-xs text-gray-600">Services</p>
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-gray-900">{filtersData.serviceAreas.length}</p>
                      <p className="text-xs text-gray-600">Areas</p>
                    </div>
                  </div>
                </div>
              )}
            </aside>

            {/* Vendor Grid */}
            <div className="flex-1">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  Showing {vendors.length} vendor{vendors.length !== 1 ? 's' : ''}
                  {(selectedServices.length > 0 || selectedAreas.length > 0 || searchTerm) &&
                    ` (filtered from ${allVendors.length})`
                  }
                </p>
              </div>

              {loading ? (
                <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                  <p className="text-gray-500">Loading vendors...</p>
                </div>
              ) : vendors.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                  <p className="text-gray-500">No vendors found matching your criteria.</p>
                  {(selectedServices.length > 0 || selectedAreas.length > 0 || searchTerm) && (
                    <button
                      onClick={() => {
                        setSelectedServices([]);
                        setSelectedAreas([]);
                        setSearchTerm('');
                      }}
                      className="mt-4 text-primary-600 hover:text-primary-700"
                    >
                      Clear all filters
                    </button>
                  )}
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