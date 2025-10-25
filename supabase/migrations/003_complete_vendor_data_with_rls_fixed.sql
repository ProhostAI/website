-- Complete Vendor Directory Migration with Original Data and RLS Policies
-- Fixed for jsonb services column

-- ============================================================================
-- STEP 1: RLS POLICIES FOR PUBLIC ACCESS
-- ============================================================================

-- Enable RLS on all tables (but with proper public policies)
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendor_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendor_gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendor_social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendor_inquiries ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Categories are viewable by everyone" ON categories;
DROP POLICY IF EXISTS "Vendors are viewable by everyone" ON vendors;
DROP POLICY IF EXISTS "Vendor reviews are viewable by everyone" ON vendor_reviews;
DROP POLICY IF EXISTS "Vendor gallery is viewable by everyone" ON vendor_gallery;
DROP POLICY IF EXISTS "Vendor social links are viewable by everyone" ON vendor_social_links;
DROP POLICY IF EXISTS "Anyone can create vendor inquiries" ON vendor_inquiries;

-- Create public read policies
CREATE POLICY "Categories are viewable by everyone"
ON categories FOR SELECT
USING (true);

CREATE POLICY "Vendors are viewable by everyone"
ON vendors FOR SELECT
USING (true);

CREATE POLICY "Vendor reviews are viewable by everyone"
ON vendor_reviews FOR SELECT
USING (true);

CREATE POLICY "Vendor gallery is viewable by everyone"
ON vendor_gallery FOR SELECT
USING (true);

CREATE POLICY "Vendor social links are viewable by everyone"
ON vendor_social_links FOR SELECT
USING (true);

-- Inquiries can be created by anyone but only viewed by authenticated users
CREATE POLICY "Anyone can create vendor inquiries"
ON vendor_inquiries FOR INSERT
WITH CHECK (true);

-- ============================================================================
-- STEP 2: CLEAR EXISTING DATA
-- ============================================================================

TRUNCATE TABLE vendor_inquiries CASCADE;
TRUNCATE TABLE vendor_reviews CASCADE;
TRUNCATE TABLE vendor_gallery CASCADE;
TRUNCATE TABLE vendor_social_links CASCADE;
TRUNCATE TABLE vendors CASCADE;
TRUNCATE TABLE categories CASCADE;

-- ============================================================================
-- STEP 3: INSERT CATEGORIES
-- ============================================================================

INSERT INTO categories (name, slug, description, icon) VALUES
  ('Cleaning Services', 'cleaning-services', 'Professional cleaning and housekeeping services', 'sparkles'),
  ('Maintenance & Repairs', 'maintenance-repairs', 'Property maintenance and repair services', 'wrench'),
  ('Pool Services', 'pool-services', 'Pool cleaning and maintenance', 'water'),
  ('Landscaping', 'landscaping', 'Lawn care and landscaping services', 'tree'),
  ('HVAC Services', 'hvac-services', 'Heating, ventilation, and air conditioning', 'wind'),
  ('Photography', 'photography', 'Real estate photography and virtual tours', 'camera'),
  ('Pest Control', 'pest-control', 'Pest control and extermination services', 'bug'),
  ('Plumbing', 'plumbing', 'Plumbing repairs and installations', 'droplet'),
  ('Electrical', 'electrical', 'Electrical repairs and installations', 'bolt'),
  ('Property Management', 'property-management', 'Full property management services', 'building'),
  ('Interior Design', 'interior-design', 'Interior design and staging services', 'palette'),
  ('Smart Home', 'smart-home', 'Smart home installation and automation', 'cpu')
ON CONFLICT (slug) DO NOTHING;

-- ============================================================================
-- STEP 4: INSERT VENDORS (Complete Original Mock Data with JSONB)
-- ============================================================================

-- Insert Sparkle Clean Miami
INSERT INTO vendors (
  slug, name, description, category_id, services,
  city, state_province, country, postal_code, address_line1,
  website_url, phone, email,
  is_verified, is_featured, rating, review_count,
  logo_url, specializations, certifications,
  founded_year, company_size
) VALUES (
  'sparkle-clean-miami',
  'Sparkle Clean Miami',
  'Professional cleaning service specializing in vacation rental turnovers.',
  (SELECT id FROM categories WHERE slug = 'cleaning-services'),
  '["Cleaning", "Laundry", "Restocking"]'::jsonb,
  'Miami', 'FL', 'USA', '33139', '123 Ocean Drive',
  'https://sparklecleanmiami.com',
  '(305) 555-0123',
  'info@sparklecleanmiami.com',
  true, true, 4.8, 127,
  'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=400&fit=crop',
  NULL, NULL, NULL, NULL
);

-- Insert Handy Helpers Fort Lauderdale
INSERT INTO vendors (
  slug, name, description, category_id, services,
  city, state_province, country, postal_code, address_line1,
  website_url, phone, email,
  is_verified, is_featured, rating, review_count,
  logo_url
) VALUES (
  'handy-helpers-fort-lauderdale',
  'Handy Helpers Fort Lauderdale',
  'Reliable maintenance and repair services for property managers.',
  (SELECT id FROM categories WHERE slug = 'maintenance-repairs'),
  '["Maintenance", "Repairs", "Emergency Service"]'::jsonb,
  'Fort Lauderdale', 'FL', 'USA', '33301', '456 Las Olas Boulevard',
  'https://handyhelpers.com',
  '(954) 555-0456',
  'contact@handyhelpers.com',
  true, false, 4.6, 89,
  'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=400&fit=crop'
);

-- Insert Coastal Pools Orlando
INSERT INTO vendors (
  slug, name, description, category_id, services,
  city, state_province, country, postal_code, address_line1,
  website_url, phone, email,
  is_verified, is_featured, rating, review_count,
  logo_url
) VALUES (
  'coastal-pools-orlando',
  'Coastal Pools Orlando',
  'Expert pool maintenance and cleaning for vacation rental properties.',
  (SELECT id FROM categories WHERE slug = 'pool-services'),
  '["Pool Service", "Maintenance", "Emergency Service"]'::jsonb,
  'Orlando', 'FL', 'USA', '32801', '789 International Drive',
  'https://coastalpoolsorlando.com',
  '(407) 555-0789',
  'service@coastalpoolsorlando.com',
  true, false, 4.9, 203,
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop'
);

-- Insert Sunshine Landscaping Tampa
INSERT INTO vendors (
  slug, name, description, category_id, services,
  city, state_province, country, postal_code, address_line1,
  website_url, phone, email,
  is_verified, is_featured, rating, review_count,
  logo_url
) VALUES (
  'sunshine-landscaping-tampa',
  'Sunshine Landscaping Tampa',
  'Full-service landscaping and lawn care for property managers.',
  (SELECT id FROM categories WHERE slug = 'landscaping'),
  '["Landscaping", "Lawn Care", "Garden Maintenance"]'::jsonb,
  'Tampa', 'FL', 'USA', '33602', '321 Bayshore Boulevard',
  'https://sunshinelandscaping.com',
  '(813) 555-0234',
  'info@sunshinelandscaping.com',
  false, false, 4.5, 67,
  'https://images.unsplash.com/photo-1558904541-efa843a96f01?w=400&h=400&fit=crop'
);

-- Insert QuickFix HVAC Miami
INSERT INTO vendors (
  slug, name, description, category_id, services,
  city, state_province, country, postal_code, address_line1,
  website_url, phone, email,
  is_verified, is_featured, rating, review_count,
  logo_url
) VALUES (
  'quick-fix-hvac-miami',
  'QuickFix HVAC Miami',
  '24/7 HVAC repair and maintenance specialists for rental properties.',
  (SELECT id FROM categories WHERE slug = 'hvac-services'),
  '["HVAC", "Emergency Service", "Maintenance"]'::jsonb,
  'Miami', 'FL', 'USA', '33131', '555 Brickell Avenue',
  'https://quickfixhvac.com',
  '(305) 555-0567',
  'support@quickfixhvac.com',
  true, true, 4.7, 156,
  'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=400&fit=crop'
);

-- Insert Pro Photo Studios
INSERT INTO vendors (
  slug, name, description, category_id, services,
  city, state_province, country, postal_code, address_line1,
  website_url, phone, email,
  is_verified, is_featured, rating, review_count,
  logo_url
) VALUES (
  'pro-photo-studios',
  'Pro Photo Studios',
  'Professional real estate photography for vacation rental listings.',
  (SELECT id FROM categories WHERE slug = 'photography'),
  '["Photography", "Virtual Tours", "3D Scanning"]'::jsonb,
  'West Palm Beach', 'FL', 'USA', '33401', '100 Clematis Street',
  'https://prophotostudios.com',
  '(561) 555-0890',
  'bookings@prophotostudios.com',
  true, false, 5.0, 94,
  'https://images.unsplash.com/photo-1609034227505-5876f6aa4e90?w=400&h=400&fit=crop'
);

-- Insert Creative Pixel Studio
INSERT INTO vendors (
  slug, name, description, category_id, services,
  city, state_province, country, postal_code, address_line1,
  website_url, phone, email,
  is_verified, is_featured, rating, review_count,
  logo_url, specializations, certifications,
  founded_year, company_size
) VALUES (
  'creative-pixel-studio',
  'Creative Pixel Studio',
  'Full-service digital agency offering web design, development, and marketing solutions for businesses.',
  (SELECT id FROM categories WHERE slug = 'photography'),
  '["Web Development", "UI/UX Design", "Digital Marketing", "SEO"]'::jsonb,
  'Miami', 'FL', 'USA', '33130', '890 Biscayne Boulevard',
  'https://creativepixel.studio',
  '(305) 555-9876',
  'hello@creativepixel.studio',
  true, true, 4.9, 234,
  'https://images.unsplash.com/photo-1561070791-2526d30db1a8?w=400&h=400&fit=crop',
  '["E-commerce", "SaaS", "Mobile Apps", "Brand Identity"]'::jsonb,
  '["Google Partner", "Meta Business Partner", "Shopify Partner"]'::jsonb,
  2018, '10-50'
);

-- Insert Premier Pest Control
INSERT INTO vendors (
  slug, name, description, category_id, services,
  city, state_province, country, postal_code, address_line1,
  website_url, phone, email,
  is_verified, is_featured, rating, review_count,
  logo_url, certifications,
  founded_year, company_size
) VALUES (
  'premier-pest-control',
  'Premier Pest Control',
  'Eco-friendly pest control solutions for residential and commercial properties.',
  (SELECT id FROM categories WHERE slug = 'pest-control'),
  '["Pest Control", "Termite Treatment", "Wildlife Removal"]'::jsonb,
  'Orlando', 'FL', 'USA', '32819', '2000 Universal Boulevard',
  'https://premierpestcontrol.com',
  '(407) 555-3333',
  'service@premierpestcontrol.com',
  true, false, 4.6, 178,
  'https://images.unsplash.com/photo-1563906267088-b0f019c67c3e?w=400&h=400&fit=crop',
  '["EPA Certified", "NPMA Member"]'::jsonb,
  2010, '5-10'
);

-- Insert Luxury Linens Miami
INSERT INTO vendors (
  slug, name, description, category_id, services,
  city, state_province, country, postal_code, address_line1,
  website_url, phone, email,
  is_verified, is_featured, rating, review_count,
  logo_url, founded_year, company_size
) VALUES (
  'luxury-linens-miami',
  'Luxury Linens Miami',
  'Premium linen rental and laundry services for vacation rentals and hotels.',
  (SELECT id FROM categories WHERE slug = 'cleaning-services'),
  '["Linen Rental", "Laundry", "Delivery", "Restocking"]'::jsonb,
  'Miami Beach', 'FL', 'USA', '33141', '1500 Collins Avenue',
  'https://luxurylinensmiami.com',
  '(305) 555-2222',
  'orders@luxurylinensmiami.com',
  true, false, 4.8, 92,
  'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400&h=400&fit=crop',
  2015, '10-50'
);

-- Insert Smart Home Solutions
INSERT INTO vendors (
  slug, name, description, category_id, services,
  city, state_province, country, postal_code, address_line1,
  website_url, phone, email,
  is_verified, is_featured, rating, review_count,
  logo_url, specializations, certifications,
  founded_year, company_size
) VALUES (
  'smart-home-solutions',
  'Smart Home Solutions',
  'Installation and maintenance of smart home systems for rental properties.',
  (SELECT id FROM categories WHERE slug = 'smart-home'),
  '["Smart Locks", "Security Systems", "Home Automation", "Tech Support"]'::jsonb,
  'Fort Lauderdale', 'FL', 'USA', '33316', '800 SE 17th Street',
  'https://smarthomesolutions.com',
  '(954) 555-7777',
  'info@smarthomesolutions.com',
  true, true, 4.9, 145,
  'https://images.unsplash.com/photo-1558002038-1055beb8c9e0?w=400&h=400&fit=crop',
  '["Vacation Rentals", "Access Control", "Energy Management"]'::jsonb,
  '["Control4 Certified", "Nest Pro Installer"]'::jsonb,
  2016, '5-10'
);

-- ============================================================================
-- STEP 5: INSERT SAMPLE REVIEWS FOR FEATURED VENDORS
-- ============================================================================

-- Add reviews for featured vendors
INSERT INTO vendor_reviews (vendor_id, customer_name, rating, title, comment, is_verified, helpful_count)
SELECT
  v.id,
  r.customer_name,
  r.rating,
  r.title,
  r.comment,
  r.is_verified,
  r.helpful_count
FROM vendors v
CROSS JOIN (
  VALUES
    ('John Smith', 5, 'Excellent Service!', 'Outstanding work and very professional. Highly recommend!', true, 12),
    ('Sarah Johnson', 4, 'Great experience', 'Very reliable and responsive. Will use again.', true, 8),
    ('Mike Davis', 5, 'Top notch!', 'Best service provider we have worked with. Always on time and thorough.', true, 15)
) AS r(customer_name, rating, title, comment, is_verified, helpful_count)
WHERE v.is_featured = true;

-- ============================================================================
-- STEP 6: INSERT GALLERY IMAGES FOR VERIFIED VENDORS
-- ============================================================================

INSERT INTO vendor_gallery (vendor_id, image_url, title, description, display_order)
SELECT
  v.id,
  v.logo_url,
  'Our Work',
  'Sample of our professional services',
  1
FROM vendors v
WHERE v.is_verified = true;

-- ============================================================================
-- STEP 7: INSERT SOCIAL LINKS FOR FEATURED VENDORS
-- ============================================================================

INSERT INTO vendor_social_links (vendor_id, platform, url)
SELECT
  v.id,
  s.platform,
  s.url_pattern || v.slug
FROM vendors v
CROSS JOIN (
  VALUES
    ('Facebook', 'https://facebook.com/'),
    ('Instagram', 'https://instagram.com/'),
    ('LinkedIn', 'https://linkedin.com/company/')
) AS s(platform, url_pattern)
WHERE v.is_featured = true;

-- ============================================================================
-- STEP 8: CREATE INDEXES FOR PERFORMANCE
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_vendors_services_gin ON vendors USING GIN (services);
CREATE INDEX IF NOT EXISTS idx_vendors_city ON vendors(city);
CREATE INDEX IF NOT EXISTS idx_vendors_state ON vendors(state_province);
CREATE INDEX IF NOT EXISTS idx_vendors_search ON vendors USING GIN (
  to_tsvector('english', name || ' ' || COALESCE(description, ''))
);

-- ============================================================================
-- STEP 9: GRANT PERMISSIONS
-- ============================================================================

-- Grant usage on all tables to authenticated and anon users
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT INSERT ON vendor_inquiries TO anon, authenticated;

-- ============================================================================
-- VERIFICATION
-- ============================================================================

DO $$
DECLARE
  vendor_count INTEGER;
  category_count INTEGER;
  review_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO vendor_count FROM vendors;
  SELECT COUNT(*) INTO category_count FROM categories;
  SELECT COUNT(*) INTO review_count FROM vendor_reviews;

  RAISE NOTICE 'Migration complete!';
  RAISE NOTICE 'Categories: %', category_count;
  RAISE NOTICE 'Vendors: %', vendor_count;
  RAISE NOTICE 'Reviews: %', review_count;
  RAISE NOTICE 'RLS Policies: Enabled with public read access';
END $$;