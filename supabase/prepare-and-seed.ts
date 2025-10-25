import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
  console.error('URL:', supabaseUrl);
  console.error('Key:', supabaseAnonKey ? 'Present' : 'Missing');
  process.exit(1);
}

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Original mock vendors data with additional vendors
const originalVendors = [
  {
    slug: 'sparkle-clean-miami',
    name: 'Sparkle Clean Miami',
    description: 'Professional cleaning service specializing in vacation rental turnovers.',
    services: ['Cleaning', 'Laundry', 'Restocking'],
    city: 'Miami',
    state_province: 'FL',
    country: 'USA',
    postal_code: '33139',
    address_line1: '123 Ocean Drive',
    website_url: 'https://sparklecleanmiami.com',
    phone: '(305) 555-0123',
    email: 'info@sparklecleanmiami.com',
    is_verified: true,
    is_featured: true,
    rating: 4.8,
    review_count: 127,
    logo_url: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=400&fit=crop',
  },
  {
    slug: 'handy-helpers-fort-lauderdale',
    name: 'Handy Helpers Fort Lauderdale',
    description: 'Reliable maintenance and repair services for property managers.',
    services: ['Maintenance', 'Repairs', 'Emergency Service'],
    city: 'Fort Lauderdale',
    state_province: 'FL',
    country: 'USA',
    postal_code: '33301',
    address_line1: '456 Las Olas Boulevard',
    website_url: 'https://handyhelpers.com',
    phone: '(954) 555-0456',
    email: 'contact@handyhelpers.com',
    is_verified: true,
    is_featured: false,
    rating: 4.6,
    review_count: 89,
    logo_url: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=400&fit=crop',
  },
  {
    slug: 'coastal-pools-orlando',
    name: 'Coastal Pools Orlando',
    description: 'Expert pool maintenance and cleaning for vacation rental properties.',
    services: ['Pool Service', 'Maintenance', 'Emergency Service'],
    city: 'Orlando',
    state_province: 'FL',
    country: 'USA',
    postal_code: '32801',
    address_line1: '789 International Drive',
    website_url: 'https://coastalpoolsorlando.com',
    phone: '(407) 555-0789',
    email: 'service@coastalpoolsorlando.com',
    is_verified: true,
    is_featured: false,
    rating: 4.9,
    review_count: 203,
    logo_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
  },
  {
    slug: 'sunshine-landscaping-tampa',
    name: 'Sunshine Landscaping Tampa',
    description: 'Full-service landscaping and lawn care for property managers.',
    services: ['Landscaping', 'Lawn Care', 'Garden Maintenance'],
    city: 'Tampa',
    state_province: 'FL',
    country: 'USA',
    postal_code: '33602',
    address_line1: '321 Bayshore Boulevard',
    website_url: 'https://sunshinelandscaping.com',
    phone: '(813) 555-0234',
    email: 'info@sunshinelandscaping.com',
    is_verified: false,
    is_featured: false,
    rating: 4.5,
    review_count: 67,
    logo_url: 'https://images.unsplash.com/photo-1558904541-efa843a96f01?w=400&h=400&fit=crop',
  },
  {
    slug: 'quick-fix-hvac-miami',
    name: 'QuickFix HVAC Miami',
    description: '24/7 HVAC repair and maintenance specialists for rental properties.',
    services: ['HVAC', 'Emergency Service', 'Maintenance'],
    city: 'Miami',
    state_province: 'FL',
    country: 'USA',
    postal_code: '33131',
    address_line1: '555 Brickell Avenue',
    website_url: 'https://quickfixhvac.com',
    phone: '(305) 555-0567',
    email: 'support@quickfixhvac.com',
    is_verified: true,
    is_featured: true,
    rating: 4.7,
    review_count: 156,
    logo_url: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=400&fit=crop',
  },
  {
    slug: 'pro-photo-studios',
    name: 'Pro Photo Studios',
    description: 'Professional real estate photography for vacation rental listings.',
    services: ['Photography', 'Virtual Tours', '3D Scanning'],
    city: 'West Palm Beach',
    state_province: 'FL',
    country: 'USA',
    postal_code: '33401',
    address_line1: '100 Clematis Street',
    website_url: 'https://prophotostudios.com',
    phone: '(561) 555-0890',
    email: 'bookings@prophotostudios.com',
    is_verified: true,
    is_featured: false,
    rating: 5.0,
    review_count: 94,
    logo_url: 'https://images.unsplash.com/photo-1609034227505-5876f6aa4e90?w=400&h=400&fit=crop',
  },
  {
    slug: 'creative-pixel-studio',
    name: 'Creative Pixel Studio',
    description: 'Full-service digital agency offering web design, development, and marketing solutions for businesses.',
    services: ['Web Development', 'UI/UX Design', 'Digital Marketing', 'SEO'],
    city: 'Miami',
    state_province: 'FL',
    country: 'USA',
    postal_code: '33130',
    address_line1: '890 Biscayne Boulevard',
    website_url: 'https://creativepixel.studio',
    phone: '(305) 555-9876',
    email: 'hello@creativepixel.studio',
    is_verified: true,
    is_featured: true,
    rating: 4.9,
    review_count: 234,
    logo_url: 'https://images.unsplash.com/photo-1561070791-2526d30db1a8?w=400&h=400&fit=crop',
    specializations: ['E-commerce', 'SaaS', 'Mobile Apps', 'Brand Identity'],
    certifications: ['Google Partner', 'Meta Business Partner', 'Shopify Partner'],
    founded_year: 2018,
    company_size: '10-50',
  },
  {
    slug: 'premier-pest-control',
    name: 'Premier Pest Control',
    description: 'Eco-friendly pest control solutions for residential and commercial properties.',
    services: ['Pest Control', 'Termite Treatment', 'Wildlife Removal'],
    city: 'Orlando',
    state_province: 'FL',
    country: 'USA',
    postal_code: '32819',
    address_line1: '2000 Universal Boulevard',
    website_url: 'https://premierpestcontrol.com',
    phone: '(407) 555-3333',
    email: 'service@premierpestcontrol.com',
    is_verified: true,
    is_featured: false,
    rating: 4.6,
    review_count: 178,
    logo_url: 'https://images.unsplash.com/photo-1563906267088-b0f019c67c3e?w=400&h=400&fit=crop',
    certifications: ['EPA Certified', 'NPMA Member'],
    founded_year: 2010,
    company_size: '5-10',
  },
  {
    slug: 'luxury-linens-miami',
    name: 'Luxury Linens Miami',
    description: 'Premium linen rental and laundry services for vacation rentals and hotels.',
    services: ['Linen Rental', 'Laundry', 'Delivery', 'Restocking'],
    city: 'Miami Beach',
    state_province: 'FL',
    country: 'USA',
    postal_code: '33141',
    address_line1: '1500 Collins Avenue',
    website_url: 'https://luxurylinensmiami.com',
    phone: '(305) 555-2222',
    email: 'orders@luxurylinensmiami.com',
    is_verified: true,
    is_featured: false,
    rating: 4.8,
    review_count: 92,
    logo_url: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400&h=400&fit=crop',
    founded_year: 2015,
    company_size: '10-50',
  },
  {
    slug: 'smart-home-solutions',
    name: 'Smart Home Solutions',
    description: 'Installation and maintenance of smart home systems for rental properties.',
    services: ['Smart Locks', 'Security Systems', 'Home Automation', 'Tech Support'],
    city: 'Fort Lauderdale',
    state_province: 'FL',
    country: 'USA',
    postal_code: '33316',
    address_line1: '800 SE 17th Street',
    website_url: 'https://smarthomesolutions.com',
    phone: '(954) 555-7777',
    email: 'info@smarthomesolutions.com',
    is_verified: true,
    is_featured: true,
    rating: 4.9,
    review_count: 145,
    logo_url: 'https://images.unsplash.com/photo-1558002038-1055beb8c9e0?w=400&h=400&fit=crop',
    specializations: ['Vacation Rentals', 'Access Control', 'Energy Management'],
    certifications: ['Control4 Certified', 'Nest Pro Installer'],
    founded_year: 2016,
    company_size: '5-10',
  }
];

async function clearAndSeedData() {
  try {
    console.log('🧹 Clearing existing vendor data...');

    // Clear existing vendors (this will cascade delete related records due to foreign keys)
    const { error: deleteError } = await supabase
      .from('vendors')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000');

    if (deleteError) {
      console.error('Error clearing vendors:', deleteError);
    }

    console.log('🌱 Starting to seed original vendor data...');

    // Insert vendors
    for (const vendor of originalVendors) {
      console.log(`Adding vendor: ${vendor.name}`);

      const { data: insertedVendor, error } = await supabase
        .from('vendors')
        .insert(vendor)
        .select()
        .single();

      if (error) {
        console.error(`Error inserting vendor ${vendor.name}:`, error);
        continue;
      }

      // Add sample reviews for featured vendors
      if (vendor.is_featured && insertedVendor) {
        const sampleReviews = [
          {
            vendor_id: insertedVendor.id,
            customer_name: 'John Smith',
            customer_email: 'john@example.com',
            rating: 5,
            title: 'Excellent Service!',
            comment: 'Outstanding work and very professional. Highly recommend!',
            is_verified: true,
            helpful_count: 12
          },
          {
            vendor_id: insertedVendor.id,
            customer_name: 'Sarah Johnson',
            customer_email: 'sarah@example.com',
            rating: 4,
            title: 'Great experience',
            comment: 'Very reliable and responsive. Will use again.',
            is_verified: true,
            helpful_count: 8
          }
        ];

        const { error: reviewError } = await supabase.from('vendor_reviews').insert(sampleReviews);
        if (reviewError) {
          console.error(`Error adding reviews for ${vendor.name}:`, reviewError);
        }
      }

      // Add gallery images for verified vendors
      if (vendor.is_verified && insertedVendor) {
        const galleryImages = [
          {
            vendor_id: insertedVendor.id,
            image_url: vendor.logo_url,
            title: 'Our Work',
            description: 'Sample of our professional services',
            display_order: 1
          }
        ];

        const { error: galleryError } = await supabase.from('vendor_gallery').insert(galleryImages);
        if (galleryError) {
          console.error(`Error adding gallery for ${vendor.name}:`, galleryError);
        }
      }

      // Add social links for featured vendors
      if (vendor.is_featured && insertedVendor) {
        const socialLinks = [
          {
            vendor_id: insertedVendor.id,
            platform: 'Facebook',
            url: `https://facebook.com/${vendor.slug}`
          },
          {
            vendor_id: insertedVendor.id,
            platform: 'Instagram',
            url: `https://instagram.com/${vendor.slug}`
          }
        ];

        const { error: socialError } = await supabase.from('vendor_social_links').insert(socialLinks);
        if (socialError) {
          console.error(`Error adding social links for ${vendor.name}:`, socialError);
        }
      }
    }

    console.log('✅ Successfully seeded original vendor data!');
    console.log(`Total vendors added: ${originalVendors.length}`);

    // Verify the data
    const { data: vendorCount } = await supabase
      .from('vendors')
      .select('id', { count: 'exact' });

    console.log(`\n📊 Database now contains ${vendorCount?.length || 0} vendors`);

  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
}

// Run the seeder
clearAndSeedData();