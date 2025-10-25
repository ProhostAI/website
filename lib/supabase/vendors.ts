import { createClient } from './server';
import type {
  Vendor,
  Category,
  VendorReview,
  CreateVendorInput,
  UpdateVendorInput,
  CreateReviewInput,
  CreateInquiryInput,
  VendorInquiry,
  VendorGalleryImage,
  VendorSocialLink
} from './types';

// ============= Category Operations =============

export async function getCategories() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true });

  if (error) throw error;
  return data as Category[];
}

export async function getCategoryBySlug(slug: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single();

  if (error) throw error;
  return data as Category;
}

// ============= Vendor Operations =============

export async function getVendors({
  categoryId,
  isFeature,
  isVerified,
  limit = 10,
  offset = 0,
  sortBy = 'created_at',
  sortOrder = 'desc'
}: {
  categoryId?: string;
  isFeature?: boolean;
  isVerified?: boolean;
  limit?: number;
  offset?: number;
  sortBy?: 'created_at' | 'rating' | 'name' | 'review_count';
  sortOrder?: 'asc' | 'desc';
} = {}) {
  const supabase = await createClient();

  let query = supabase
    .from('vendors')
    .select(`
      *,
      category:categories(*)
    `)
    .eq('is_active', true);

  if (categoryId) {
    query = query.eq('category_id', categoryId);
  }

  if (isFeature !== undefined) {
    query = query.eq('is_featured', isFeature);
  }

  if (isVerified !== undefined) {
    query = query.eq('is_verified', isVerified);
  }

  query = query
    .order(sortBy, { ascending: sortOrder === 'asc' })
    .range(offset, offset + limit - 1);

  const { data, error } = await query;

  if (error) throw error;
  return data as (Vendor & { category: Category })[];
}

export async function getVendorBySlug(slug: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('vendors')
    .select(`
      *,
      category:categories(*),
      social_links:vendor_social_links(*),
      gallery:vendor_gallery(*)
    `)
    .eq('slug', slug)
    .eq('is_active', true)
    .single();

  if (error) throw error;
  return data as Vendor & {
    category: Category;
    social_links: VendorSocialLink[];
    gallery: VendorGalleryImage[];
  };
}

export async function searchVendors(searchTerm: string, limit = 10) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('vendors')
    .select(`
      *,
      category:categories(*)
    `)
    .eq('is_active', true)
    .or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)
    .limit(limit);

  if (error) throw error;
  return data as (Vendor & { category: Category })[];
}

export async function createVendor(vendor: CreateVendorInput) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('vendors')
    .insert(vendor)
    .select()
    .single();

  if (error) throw error;
  return data as Vendor;
}

export async function updateVendor(id: string, updates: UpdateVendorInput) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('vendors')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as Vendor;
}

export async function deleteVendor(id: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from('vendors')
    .update({ is_active: false })
    .eq('id', id);

  if (error) throw error;
  return true;
}

// ============= Review Operations =============

export async function getVendorReviews(vendorId: string, limit = 10, offset = 0) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('vendor_reviews')
    .select('*')
    .eq('vendor_id', vendorId)
    .eq('is_visible', true)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) throw error;
  return data as VendorReview[];
}

export async function createReview(review: CreateReviewInput) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('vendor_reviews')
    .insert(review)
    .select()
    .single();

  if (error) throw error;
  return data as VendorReview;
}

export async function markReviewHelpful(reviewId: string) {
  const supabase = await createClient();

  const { error } = await supabase.rpc('increment_helpful_count', {
    review_id: reviewId
  });

  if (error) throw error;
  return true;
}

// ============= Inquiry Operations =============

export async function createInquiry(inquiry: CreateInquiryInput) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('vendor_inquiries')
    .insert(inquiry)
    .select()
    .single();

  if (error) throw error;
  return data as VendorInquiry;
}

export async function getVendorInquiries(vendorId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('vendor_inquiries')
    .select('*')
    .eq('vendor_id', vendorId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as VendorInquiry[];
}

export async function updateInquiryStatus(
  inquiryId: string,
  status: 'pending' | 'contacted' | 'resolved'
) {
  const supabase = await createClient();

  const { error } = await supabase
    .from('vendor_inquiries')
    .update({ status })
    .eq('id', inquiryId);

  if (error) throw error;
  return true;
}

// ============= Gallery Operations =============

export async function addGalleryImage(
  vendorId: string,
  imageData: {
    image_url: string;
    title?: string;
    description?: string;
    display_order?: number;
    is_primary?: boolean;
  }
) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('vendor_gallery')
    .insert({
      vendor_id: vendorId,
      ...imageData
    })
    .select()
    .single();

  if (error) throw error;
  return data as VendorGalleryImage;
}

export async function deleteGalleryImage(imageId: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from('vendor_gallery')
    .delete()
    .eq('id', imageId);

  if (error) throw error;
  return true;
}

// ============= Social Links Operations =============

export async function updateVendorSocialLinks(
  vendorId: string,
  socialLinks: Array<{ platform: string; url: string }>
) {
  const supabase = await createClient();

  // First delete existing links
  await supabase
    .from('vendor_social_links')
    .delete()
    .eq('vendor_id', vendorId);

  // Then insert new ones
  if (socialLinks.length > 0) {
    const { data, error } = await supabase
      .from('vendor_social_links')
      .insert(
        socialLinks.map(link => ({
          vendor_id: vendorId,
          ...link
        }))
      )
      .select();

    if (error) throw error;
    return data as VendorSocialLink[];
  }

  return [];
}