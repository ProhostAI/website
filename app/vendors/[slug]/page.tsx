'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import type { Vendor, Category, VendorGalleryImage, VendorSocialLink } from '@/lib/supabase/types';

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
  gallery?: VendorGalleryImage[];
  socialLinks?: VendorSocialLink[];
  address?: {
    line1?: string;
    line2?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
  };
  foundedYear?: number;
  companySize?: string;
  certifications?: string[];
  specializations?: string[];
}

export default function VendorProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [vendor, setVendor] = useState<VendorProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVendorData();
  }, [slug]);

  const fetchVendorData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/vendors/${slug}`);
      if (!response.ok) {
        throw new Error('Vendor not found');
      }

      const data = await response.json();
      const vendorData = data.vendor;

      // Transform Supabase vendor to match the UI format
      const transformedVendor: VendorProfile = {
        id: vendorData.id,
        slug: vendorData.slug,
        businessName: vendorData.name,
        description: vendorData.description || '',
        services: vendorData.services || [],
        serviceAreas: vendorData.city ? [vendorData.city, vendorData.state_province].filter(Boolean) : ['Remote'],
        website: vendorData.website_url,
        phone: vendorData.phone,
        email: vendorData.email,
        verified: vendorData.is_verified,
        featured: vendorData.is_featured,
        averageRating: vendorData.rating,
        totalReviews: vendorData.review_count,
        logoUrl: vendorData.logo_url || 'https://images.unsplash.com/photo-1609034227505-5876f6aa4e90?w=100&h=100&fit=crop',
        coverImageUrl: vendorData.logo_url || 'https://images.unsplash.com/photo-1609034227505-5876f6aa4e90?w=400&h=200&fit=crop',
        gallery: vendorData.gallery,
        socialLinks: vendorData.social_links,
        address: {
          line1: vendorData.address_line1,
          line2: vendorData.address_line2,
          city: vendorData.city,
          state: vendorData.state_province,
          zip: vendorData.postal_code,
          country: vendorData.country,
        },
        foundedYear: vendorData.founded_year,
        companySize: vendorData.company_size,
        certifications: vendorData.certifications,
        specializations: vendorData.specializations,
      };

      setVendor(transformedVendor);
    } catch (error) {
      console.error('Error fetching vendor:', error);
      setVendor(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <main className="pt-16 min-h-screen bg-gray-50">
          <div className="max-width-container section-padding py-24">
            <div className="animate-pulse">
              <div className="h-64 bg-gray-200 rounded-lg mb-8"></div>
              <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

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
          {vendor.coverImageUrl ? (
            <img
              src={vendor.coverImageUrl}
              alt={vendor.businessName}
              className="w-full h-full object-cover opacity-70"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary-500 to-primary-600 opacity-70" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
        </div>

        {/* Vendor Info Section */}
        <div className="max-width-container section-padding">
          <div className="relative -mt-20 mb-8">
            <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                {/* Logo */}
                <div className="flex-shrink-0">
                  {vendor.logoUrl ? (
                    <img
                      src={vendor.logoUrl}
                      alt={`${vendor.businessName} logo`}
                      className="w-24 h-24 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">
                        {vendor.businessName.substring(0, 2).toUpperCase()}
                      </span>
                    </div>
                  )}
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
                      {vendor.averageRating > 0 && (
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
                              {vendor.averageRating.toFixed(1)} ({vendor.totalReviews} reviews)
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Contact Buttons */}
                    <div className="flex gap-3">
                      {vendor.phone && (
                        <a
                          href={`tel:${vendor.phone}`}
                          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-2"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          Call
                        </a>
                      )}
                      {vendor.email && (
                        <a
                          href={`mailto:${vendor.email}`}
                          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          Email
                        </a>
                      )}
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
                    {vendor.phone && (
                      <div>
                        <h3 className="text-sm font-semibold text-gray-700 mb-2">Phone</h3>
                        <a href={`tel:${vendor.phone}`} className="text-gray-600 hover:text-primary-600">
                          {vendor.phone}
                        </a>
                      </div>
                    )}
                    {vendor.email && (
                      <div>
                        <h3 className="text-sm font-semibold text-gray-700 mb-2">Email</h3>
                        <a href={`mailto:${vendor.email}`} className="text-gray-600 hover:text-primary-600 break-all">
                          {vendor.email}
                        </a>
                      </div>
                    )}
                    {vendor.website && (
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
                    )}
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
                    {vendor.businessName} has been providing exceptional {vendor.services[0]?.toLowerCase() || 'professional'} services
                    to property managers and vacation rental hosts in the {vendor.serviceAreas[0] || 'local'} area.
                    With a strong commitment to quality and customer satisfaction, they have built a reputation
                    as one of the most reliable service providers in the region.
                  </p>
                  <p className="mt-4">
                    Their team of experienced professionals understands the unique needs of short-term rental properties
                    and delivers services that help hosts maintain high standards while maximizing their rental income.
                  </p>

                  {/* Certifications */}
                  {vendor.certifications && vendor.certifications.length > 0 && (
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Certifications</h3>
                      <ul className="space-y-2">
                        {vendor.certifications.map((cert, index) => (
                          <li key={index} className="flex items-center text-gray-600">
                            <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            {cert}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Specializations */}
                  {vendor.specializations && vendor.specializations.length > 0 && (
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Specializations</h3>
                      <div className="flex flex-wrap gap-2">
                        {vendor.specializations.map((spec, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Gallery */}
              {vendor.gallery && vendor.gallery.length > 0 && (
                <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Gallery</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {vendor.gallery.map((image) => (
                      <div key={image.id} className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                        <img
                          src={image.image_url}
                          alt={image.title || 'Gallery image'}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quick Stats */}
            <div>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Stats</h2>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Average Rating</span>
                    <span className="font-semibold text-gray-900">
                      {vendor.averageRating > 0 ? `${vendor.averageRating.toFixed(1)} ⭐` : 'No ratings yet'}
                    </span>
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
                  {vendor.foundedYear && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Founded</span>
                      <span className="font-semibold text-gray-900">{vendor.foundedYear}</span>
                    </div>
                  )}
                  {vendor.companySize && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Company Size</span>
                      <span className="font-semibold text-gray-900">{vendor.companySize}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Social Links */}
              {vendor.socialLinks && vendor.socialLinks.length > 0 && (
                <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Connect With Us</h2>
                  <div className="space-y-3">
                    {vendor.socialLinks.map((link) => (
                      <a
                        key={link.id}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-gray-600 hover:text-primary-600"
                      >
                        <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"/>
                        </svg>
                        {link.platform}
                      </a>
                    ))}
                  </div>
                </div>
              )}
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