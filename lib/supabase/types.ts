export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Vendor {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  short_description: string | null;
  logo_url: string | null;
  website_url: string | null;
  email: string | null;
  phone: string | null;

  // Location
  address_line1: string | null;
  address_line2: string | null;
  city: string | null;
  state_province: string | null;
  postal_code: string | null;
  country: string | null;

  // Business info
  category_id: string | null;
  category?: Category;
  founded_year: number | null;
  company_size: string | null;

  // Features
  services: string[] | null;
  specializations: string[] | null;
  certifications: string[] | null;

  // Ratings
  rating: number;
  review_count: number;

  // Status
  is_verified: boolean;
  is_featured: boolean;
  is_active: boolean;
  verification_date: string | null;

  // SEO
  meta_title: string | null;
  meta_description: string | null;
  keywords: string[] | null;

  // Timestamps
  created_at: string;
  updated_at: string;

  // Additional
  metadata: Record<string, any> | null;
}

export interface VendorSocialLink {
  id: string;
  vendor_id: string;
  platform: string;
  url: string;
  created_at: string;
}

export interface VendorGalleryImage {
  id: string;
  vendor_id: string;
  image_url: string;
  title: string | null;
  description: string | null;
  display_order: number;
  is_primary: boolean;
  created_at: string;
}

export interface VendorReview {
  id: string;
  vendor_id: string;
  user_id: string | null;
  reviewer_name: string;
  reviewer_email: string | null;
  rating: number;
  title: string | null;
  comment: string | null;
  is_verified: boolean;
  is_visible: boolean;
  helpful_count: number;
  created_at: string;
  updated_at: string;
}

export interface VendorInquiry {
  id: string;
  vendor_id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  status: 'pending' | 'contacted' | 'resolved';
  created_at: string;
}

// Input types for creating/updating records
export type CreateVendorInput = Omit<
  Vendor,
  'id' | 'rating' | 'review_count' | 'created_at' | 'updated_at'
>;

export type UpdateVendorInput = Partial<CreateVendorInput>;

export type CreateReviewInput = Omit<
  VendorReview,
  'id' | 'created_at' | 'updated_at' | 'helpful_count'
>;

export type CreateInquiryInput = Omit<
  VendorInquiry,
  'id' | 'created_at' | 'status'
>;