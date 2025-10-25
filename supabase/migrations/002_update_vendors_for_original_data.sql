-- Migration to update vendors table to better match original mock data structure
-- This migration adds missing columns and updates existing data

-- Add missing columns to vendors table
ALTER TABLE vendors
ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Update the services column to ensure it can store the original service values
-- The services column is already TEXT[] so no change needed

-- Create an updated_at trigger to automatically update the timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop trigger if exists and recreate
DROP TRIGGER IF EXISTS update_vendors_updated_at ON vendors;
CREATE TRIGGER update_vendors_updated_at
    BEFORE UPDATE ON vendors
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Clear existing sample data to prepare for original mock data
TRUNCATE TABLE vendor_inquiries CASCADE;
TRUNCATE TABLE vendor_reviews CASCADE;
TRUNCATE TABLE vendor_gallery CASCADE;
TRUNCATE TABLE vendor_social_links CASCADE;
TRUNCATE TABLE vendors CASCADE;
TRUNCATE TABLE categories CASCADE;

-- Insert categories that match the original mock data services
INSERT INTO categories (id, name, slug, description, icon) VALUES
  (gen_random_uuid(), 'Cleaning Services', 'cleaning-services', 'Professional cleaning and housekeeping services', 'sparkles'),
  (gen_random_uuid(), 'Maintenance & Repairs', 'maintenance-repairs', 'Property maintenance and repair services', 'wrench'),
  (gen_random_uuid(), 'Pool Services', 'pool-services', 'Pool cleaning and maintenance', 'water'),
  (gen_random_uuid(), 'Landscaping', 'landscaping', 'Lawn care and landscaping services', 'tree'),
  (gen_random_uuid(), 'HVAC Services', 'hvac-services', 'Heating, ventilation, and air conditioning', 'wind'),
  (gen_random_uuid(), 'Photography', 'photography', 'Real estate photography and virtual tours', 'camera')
ON CONFLICT (slug) DO NOTHING;

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_vendors_slug ON vendors(slug);
CREATE INDEX IF NOT EXISTS idx_vendors_is_featured ON vendors(is_featured);
CREATE INDEX IF NOT EXISTS idx_vendors_is_verified ON vendors(is_verified);
CREATE INDEX IF NOT EXISTS idx_vendors_rating ON vendors(rating DESC);
CREATE INDEX IF NOT EXISTS idx_vendors_created_at ON vendors(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_vendors_updated_at ON vendors(updated_at DESC);