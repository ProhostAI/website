import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

// Load environment variables
dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Sample vendor data
const sampleVendors = [
  {
    name: 'TechPro Solutions',
    slug: 'techpro-solutions',
    description: 'Leading provider of web development and cloud solutions with 10+ years of experience. We specialize in building scalable web applications, cloud migration, and digital transformation.',
    short_description: 'Expert web development and cloud services',
    website_url: 'https://techpro-example.com',
    email: 'contact@techpro-example.com',
    phone: '+1 (555) 123-4567',
    address_line1: '123 Tech Street',
    city: 'San Francisco',
    state_province: 'CA',
    postal_code: '94105',
    country: 'USA',
    founded_year: 2013,
    company_size: '51-200',
    services: ['Web Development', 'Cloud Migration', 'API Development', 'DevOps'],
    specializations: ['React', 'Node.js', 'AWS', 'Kubernetes'],
    certifications: ['AWS Partner', 'ISO 27001'],
    is_verified: true,
    is_featured: true,
    meta_title: 'TechPro Solutions - Web Development & Cloud Services',
    meta_description: 'Expert web development and cloud migration services. Specializing in React, Node.js, and AWS solutions.',
    keywords: ['web development', 'cloud services', 'react', 'aws'],
  },
  {
    name: 'Digital Masters Agency',
    slug: 'digital-masters-agency',
    description: 'Full-service digital marketing agency specializing in SEO, PPC, and social media marketing. We help businesses grow their online presence and drive conversions.',
    short_description: 'Your digital marketing experts',
    website_url: 'https://digitalmasters-example.com',
    email: 'hello@digitalmasters-example.com',
    phone: '+1 (555) 234-5678',
    address_line1: '456 Marketing Ave',
    city: 'New York',
    state_province: 'NY',
    postal_code: '10001',
    country: 'USA',
    founded_year: 2015,
    company_size: '11-50',
    services: ['SEO', 'PPC Advertising', 'Social Media Marketing', 'Content Marketing'],
    specializations: ['Google Ads', 'Facebook Ads', 'LinkedIn Marketing', 'SEO Strategy'],
    certifications: ['Google Partner', 'Facebook Marketing Partner'],
    is_verified: true,
    is_featured: false,
    meta_title: 'Digital Masters Agency - SEO & Digital Marketing',
    meta_description: 'Full-service digital marketing agency specializing in SEO, PPC, and social media marketing.',
    keywords: ['digital marketing', 'seo', 'ppc', 'social media'],
  },
  {
    name: 'CloudFirst Technologies',
    slug: 'cloudfirst-technologies',
    description: 'Enterprise cloud migration and DevOps consulting services. We help organizations modernize their infrastructure and adopt cloud-native technologies.',
    short_description: 'Cloud migration specialists',
    website_url: 'https://cloudfirst-example.com',
    email: 'info@cloudfirst-example.com',
    phone: '+1 (555) 345-6789',
    address_line1: '789 Cloud Boulevard',
    city: 'Seattle',
    state_province: 'WA',
    postal_code: '98101',
    country: 'USA',
    founded_year: 2018,
    company_size: '201-500',
    services: ['Cloud Migration', 'DevOps Consulting', 'Infrastructure as Code', 'CI/CD Implementation'],
    specializations: ['AWS', 'Azure', 'Terraform', 'Docker', 'Kubernetes'],
    certifications: ['AWS Advanced Partner', 'Microsoft Gold Partner'],
    is_verified: false,
    is_featured: true,
    meta_title: 'CloudFirst Technologies - Enterprise Cloud Solutions',
    meta_description: 'Enterprise cloud migration and DevOps consulting. AWS and Azure certified partners.',
    keywords: ['cloud migration', 'devops', 'aws', 'azure'],
  },
  {
    name: 'Creative Pixel Studio',
    slug: 'creative-pixel-studio',
    description: 'Award-winning UI/UX design studio creating beautiful and functional digital experiences. We combine aesthetics with usability to deliver exceptional designs.',
    short_description: 'Beautiful designs that convert',
    website_url: 'https://creativepixel-example.com',
    email: 'studio@creativepixel-example.com',
    phone: '+1 (555) 456-7890',
    address_line1: '321 Design Way',
    city: 'Los Angeles',
    state_province: 'CA',
    postal_code: '90001',
    country: 'USA',
    founded_year: 2016,
    company_size: '1-10',
    services: ['UI Design', 'UX Research', 'Brand Design', 'Design Systems'],
    specializations: ['Figma', 'Adobe Creative Suite', 'User Research', 'Prototyping'],
    certifications: ['Google UX Design Certificate'],
    is_verified: true,
    is_featured: false,
    meta_title: 'Creative Pixel Studio - UI/UX Design Services',
    meta_description: 'Award-winning UI/UX design studio. Creating beautiful digital experiences.',
    keywords: ['ui design', 'ux design', 'figma', 'design studio'],
  },
  {
    name: 'SecureShield Cybersecurity',
    slug: 'secureshield-cybersecurity',
    description: 'Comprehensive cybersecurity solutions including penetration testing, security audits, and compliance consulting. Protecting businesses from digital threats.',
    short_description: 'Your digital security experts',
    website_url: 'https://secureshield-example.com',
    email: 'security@secureshield-example.com',
    phone: '+1 (555) 567-8901',
    address_line1: '555 Security Lane',
    city: 'Austin',
    state_province: 'TX',
    postal_code: '78701',
    country: 'USA',
    founded_year: 2014,
    company_size: '11-50',
    services: ['Penetration Testing', 'Security Audits', 'Compliance Consulting', 'Incident Response'],
    specializations: ['OWASP', 'ISO 27001', 'SOC 2', 'HIPAA Compliance'],
    certifications: ['CISSP', 'CEH', 'CISA'],
    is_verified: true,
    is_featured: true,
    meta_title: 'SecureShield - Cybersecurity & Compliance Services',
    meta_description: 'Enterprise cybersecurity solutions. Penetration testing, audits, and compliance.',
    keywords: ['cybersecurity', 'penetration testing', 'security audit', 'compliance'],
  },
];

// Sample reviews
const sampleReviews = [
  {
    vendor_slug: 'techpro-solutions',
    reviewer_name: 'John Smith',
    reviewer_email: 'john@example.com',
    rating: 5,
    title: 'Excellent Service!',
    comment: 'TechPro delivered our project on time and exceeded expectations. Their team is professional, knowledgeable, and easy to work with. Highly recommended!',
    is_verified: true,
    is_visible: true,
  },
  {
    vendor_slug: 'techpro-solutions',
    reviewer_name: 'Sarah Johnson',
    reviewer_email: 'sarah@example.com',
    rating: 4,
    title: 'Great web development team',
    comment: 'They built our e-commerce platform and did a fantastic job. The only minor issue was some delays in communication, but overall very satisfied.',
    is_verified: true,
    is_visible: true,
  },
  {
    vendor_slug: 'digital-masters-agency',
    reviewer_name: 'Mike Wilson',
    reviewer_email: 'mike@example.com',
    rating: 5,
    title: 'Transformed our online presence',
    comment: 'Our SEO rankings improved significantly within 3 months. The team is very data-driven and provides detailed reports. Worth every penny!',
    is_verified: true,
    is_visible: true,
  },
  {
    vendor_slug: 'cloudfirst-technologies',
    reviewer_name: 'Emily Davis',
    reviewer_email: 'emily@example.com',
    rating: 4,
    title: 'Smooth cloud migration',
    comment: 'They helped us migrate from on-premise to AWS. The process was smooth and they provided excellent documentation and training.',
    is_verified: false,
    is_visible: true,
  },
  {
    vendor_slug: 'creative-pixel-studio',
    reviewer_name: 'Robert Chen',
    reviewer_email: 'robert@example.com',
    rating: 5,
    title: 'Beautiful designs!',
    comment: 'Creative Pixel redesigned our app and the results are stunning. Users love the new interface and our engagement has increased by 40%.',
    is_verified: true,
    is_visible: true,
  },
];

// Sample gallery images
const sampleGalleryImages = [
  {
    vendor_slug: 'techpro-solutions',
    image_url: 'https://via.placeholder.com/800x600/4F46E5/FFFFFF?text=TechPro+Project+1',
    title: 'E-commerce Platform',
    description: 'Modern e-commerce solution built with React and Node.js',
    display_order: 1,
    is_primary: true,
  },
  {
    vendor_slug: 'techpro-solutions',
    image_url: 'https://via.placeholder.com/800x600/10B981/FFFFFF?text=TechPro+Project+2',
    title: 'Cloud Dashboard',
    description: 'Real-time analytics dashboard for cloud infrastructure',
    display_order: 2,
    is_primary: false,
  },
  {
    vendor_slug: 'creative-pixel-studio',
    image_url: 'https://via.placeholder.com/800x600/F59E0B/FFFFFF?text=Creative+Design+1',
    title: 'Mobile App Design',
    description: 'Award-winning mobile app UI design',
    display_order: 1,
    is_primary: true,
  },
];

// Sample social links
const sampleSocialLinks = [
  { vendor_slug: 'techpro-solutions', platform: 'linkedin', url: 'https://linkedin.com/company/techpro' },
  { vendor_slug: 'techpro-solutions', platform: 'twitter', url: 'https://twitter.com/techpro' },
  { vendor_slug: 'digital-masters-agency', platform: 'facebook', url: 'https://facebook.com/digitalmasters' },
  { vendor_slug: 'digital-masters-agency', platform: 'instagram', url: 'https://instagram.com/digitalmasters' },
  { vendor_slug: 'creative-pixel-studio', platform: 'dribbble', url: 'https://dribbble.com/creativepixel' },
];

async function seedDatabase() {
  console.log('🌱 Starting database seeding...\n');

  try {
    // Get categories
    const { data: categories } = await supabase
      .from('categories')
      .select('id, slug');

    const categoryMap = categories?.reduce((acc: any, cat: any) => {
      acc[cat.slug] = cat.id;
      return acc;
    }, {});

    // Insert vendors
    console.log('📦 Adding vendors...');
    for (const vendor of sampleVendors) {
      // Find matching category
      let category_id = null;
      if (vendor.name.includes('Tech') || vendor.name.includes('Cloud')) {
        category_id = categoryMap['web-development'] || categoryMap['cloud-services'];
      } else if (vendor.name.includes('Digital')) {
        category_id = categoryMap['digital-marketing'];
      } else if (vendor.name.includes('Creative')) {
        category_id = categoryMap['ui-ux-design'];
      } else if (vendor.name.includes('Secure')) {
        category_id = categoryMap['cybersecurity'];
      }

      const { error } = await supabase
        .from('vendors')
        .insert({ ...vendor, category_id })
        .select()
        .single();

      if (error) {
        console.log(`  ⚠️  Vendor "${vendor.name}" might already exist: ${error.message}`);
      } else {
        console.log(`  ✅ Added vendor: ${vendor.name}`);
      }
    }

    // Get inserted vendors
    const { data: vendors } = await supabase
      .from('vendors')
      .select('id, slug');

    const vendorMap = vendors?.reduce((acc: any, vendor: any) => {
      acc[vendor.slug] = vendor.id;
      return acc;
    }, {});

    // Insert reviews
    console.log('\n⭐ Adding reviews...');
    for (const review of sampleReviews) {
      const vendor_id = vendorMap[review.vendor_slug];
      if (vendor_id) {
        const { vendor_slug, ...reviewData } = review;
        const { error } = await supabase
          .from('vendor_reviews')
          .insert({ ...reviewData, vendor_id });

        if (error) {
          console.log(`  ⚠️  Review error: ${error.message}`);
        } else {
          console.log(`  ✅ Added review for: ${vendor_slug}`);
        }
      }
    }

    // Insert gallery images
    console.log('\n🖼️  Adding gallery images...');
    for (const image of sampleGalleryImages) {
      const vendor_id = vendorMap[image.vendor_slug];
      if (vendor_id) {
        const { vendor_slug, ...imageData } = image;
        const { error } = await supabase
          .from('vendor_gallery')
          .insert({ ...imageData, vendor_id });

        if (error) {
          console.log(`  ⚠️  Gallery error: ${error.message}`);
        } else {
          console.log(`  ✅ Added image for: ${vendor_slug}`);
        }
      }
    }

    // Insert social links
    console.log('\n🔗 Adding social links...');
    for (const link of sampleSocialLinks) {
      const vendor_id = vendorMap[link.vendor_slug];
      if (vendor_id) {
        const { vendor_slug, ...linkData } = link;
        const { error } = await supabase
          .from('vendor_social_links')
          .insert({ ...linkData, vendor_id });

        if (error) {
          console.log(`  ⚠️  Social link error: ${error.message}`);
        } else {
          console.log(`  ✅ Added ${link.platform} link for: ${vendor_slug}`);
        }
      }
    }

    console.log('\n✨ Database seeding complete!');
    console.log('\n📊 Summary:');
    console.log(`  - ${sampleVendors.length} vendors`);
    console.log(`  - ${sampleReviews.length} reviews`);
    console.log(`  - ${sampleGalleryImages.length} gallery images`);
    console.log(`  - ${sampleSocialLinks.length} social links`);
    console.log('\n🚀 Your vendor marketplace is ready!');
    console.log('   Test the API at: http://localhost:3001/api/vendors');

  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
}

// Run seeder
seedDatabase();