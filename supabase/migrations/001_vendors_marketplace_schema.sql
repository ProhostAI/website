-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Categories table for vendor categories
CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  icon VARCHAR(50),
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Vendors table
CREATE TABLE IF NOT EXISTS vendors (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  short_description VARCHAR(500),
  logo_url TEXT,
  website_url TEXT,
  email VARCHAR(255),
  phone VARCHAR(50),

  -- Location information
  address_line1 VARCHAR(255),
  address_line2 VARCHAR(255),
  city VARCHAR(100),
  state_province VARCHAR(100),
  postal_code VARCHAR(20),
  country VARCHAR(100),

  -- Business information
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  founded_year INTEGER,
  company_size VARCHAR(50), -- e.g., '1-10', '11-50', '51-200', etc.

  -- Features and capabilities
  services JSONB, -- Array of services offered
  specializations JSONB, -- Array of specializations
  certifications JSONB, -- Array of certifications

  -- Ratings and reviews
  rating DECIMAL(3, 2) DEFAULT 0.00, -- Average rating (0.00 to 5.00)
  review_count INTEGER DEFAULT 0,

  -- Status and verification
  is_verified BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  verification_date TIMESTAMPTZ,

  -- SEO and metadata
  meta_title VARCHAR(255),
  meta_description TEXT,
  keywords TEXT[],

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Additional data
  metadata JSONB -- For flexible additional fields
);

-- Social media links table
CREATE TABLE IF NOT EXISTS vendor_social_links (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  vendor_id UUID NOT NULL REFERENCES vendors(id) ON DELETE CASCADE,
  platform VARCHAR(50) NOT NULL, -- e.g., 'facebook', 'twitter', 'linkedin'
  url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(vendor_id, platform)
);

-- Gallery/Portfolio images table
CREATE TABLE IF NOT EXISTS vendor_gallery (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  vendor_id UUID NOT NULL REFERENCES vendors(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  title VARCHAR(255),
  description TEXT,
  display_order INTEGER DEFAULT 0,
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reviews table
CREATE TABLE IF NOT EXISTS vendor_reviews (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  vendor_id UUID NOT NULL REFERENCES vendors(id) ON DELETE CASCADE,
  user_id UUID, -- You can reference your users table here if you have one
  reviewer_name VARCHAR(255) NOT NULL,
  reviewer_email VARCHAR(255),
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title VARCHAR(255),
  comment TEXT,
  is_verified BOOLEAN DEFAULT false,
  is_visible BOOLEAN DEFAULT true,
  helpful_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Contact inquiries table
CREATE TABLE IF NOT EXISTS vendor_inquiries (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  vendor_id UUID NOT NULL REFERENCES vendors(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  subject VARCHAR(255),
  message TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'pending', -- pending, contacted, resolved
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX idx_vendors_slug ON vendors(slug);
CREATE INDEX idx_vendors_category ON vendors(category_id);
CREATE INDEX idx_vendors_is_active ON vendors(is_active);
CREATE INDEX idx_vendors_is_featured ON vendors(is_featured);
CREATE INDEX idx_vendors_rating ON vendors(rating DESC);
CREATE INDEX idx_vendors_created_at ON vendors(created_at DESC);
CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_vendor_reviews_vendor_id ON vendor_reviews(vendor_id);
CREATE INDEX idx_vendor_reviews_rating ON vendor_reviews(rating);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at trigger to tables
CREATE TRIGGER update_vendors_updated_at BEFORE UPDATE ON vendors
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_vendor_reviews_updated_at BEFORE UPDATE ON vendor_reviews
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to update vendor rating when reviews change
CREATE OR REPLACE FUNCTION update_vendor_rating()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE vendors
    SET
        rating = (
            SELECT COALESCE(AVG(rating), 0)
            FROM vendor_reviews
            WHERE vendor_id = COALESCE(NEW.vendor_id, OLD.vendor_id)
            AND is_visible = true
        ),
        review_count = (
            SELECT COUNT(*)
            FROM vendor_reviews
            WHERE vendor_id = COALESCE(NEW.vendor_id, OLD.vendor_id)
            AND is_visible = true
        )
    WHERE id = COALESCE(NEW.vendor_id, OLD.vendor_id);

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update vendor rating
CREATE TRIGGER update_vendor_rating_on_review
    AFTER INSERT OR UPDATE OR DELETE ON vendor_reviews
    FOR EACH ROW EXECUTE FUNCTION update_vendor_rating();

-- Insert sample categories
INSERT INTO categories (name, slug, description, display_order) VALUES
('Web Development', 'web-development', 'Web development and design services', 1),
('Mobile Development', 'mobile-development', 'iOS and Android app development', 2),
('Cloud Services', 'cloud-services', 'Cloud infrastructure and deployment', 3),
('Digital Marketing', 'digital-marketing', 'SEO, SEM, and social media marketing', 4),
('UI/UX Design', 'ui-ux-design', 'User interface and experience design', 5),
('DevOps', 'devops', 'Development operations and CI/CD', 6),
('Cybersecurity', 'cybersecurity', 'Security audits and consulting', 7),
('Data Analytics', 'data-analytics', 'Data analysis and visualization', 8),
('AI/ML Services', 'ai-ml-services', 'Artificial intelligence and machine learning', 9),
('Consulting', 'consulting', 'IT and business consulting services', 10)
ON CONFLICT (slug) DO NOTHING;