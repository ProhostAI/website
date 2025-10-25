# Supabase Setup Guide for Vendors Marketplace

## Overview
This guide will help you complete the Supabase setup for your vendors marketplace directory.

## Prerequisites
- Node.js 18+ installed
- A Supabase account (free tier is fine to start)

## Setup Steps

### 1. Create a Supabase Project

1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Click "New project"
3. Fill in the project details:
   - Name: "ProHost Vendors Marketplace" (or your preferred name)
   - Database Password: Choose a strong password
   - Region: Select the closest region to your users
4. Click "Create new project"

### 2. Get Your API Keys

Once your project is created:

1. Go to Settings → API in your Supabase dashboard
2. Find these values:
   - **Project URL**: This is your `NEXT_PUBLIC_SUPABASE_URL`
   - **Anon/Public Key**: This is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 3. Update Environment Variables

Update your `.env.local` file with the values from step 2:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4. Run Database Migrations

1. In your Supabase dashboard, go to the SQL Editor
2. Open the file: `supabase/migrations/001_vendors_marketplace_schema.sql`
3. Copy the entire SQL content
4. Paste it into the SQL Editor
5. Click "Run" to create all the tables and relationships

### 5. Configure Authentication (Optional)

If you want to add user authentication:

1. Go to Authentication → Providers in Supabase
2. Enable the providers you want (Email, Google, GitHub, etc.)
3. Configure each provider with your OAuth credentials

### 6. Set Up Row Level Security (RLS) - Recommended

For production, you should enable RLS. Here's a basic setup:

```sql
-- Enable RLS on all tables
ALTER TABLE vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendor_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendor_inquiries ENABLE ROW LEVEL SECURITY;

-- Allow public read access to vendors and categories
CREATE POLICY "Public vendors are viewable by everyone"
ON vendors FOR SELECT
USING (is_active = true);

CREATE POLICY "Categories are viewable by everyone"
ON categories FOR SELECT
USING (is_active = true);

-- Allow public to create reviews and inquiries
CREATE POLICY "Anyone can create reviews"
ON vendor_reviews FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can create inquiries"
ON vendor_inquiries FOR INSERT
WITH CHECK (true);
```

### 7. Test Your Setup

Restart your development server:

```bash
npm run dev
```

Then test the API endpoints:

- GET `/api/vendors` - List all vendors
- GET `/api/vendors/[slug]` - Get specific vendor

## Project Structure

```
/lib/supabase/
├── client.ts        # Browser client
├── server.ts        # Server client (for API routes)
├── types.ts         # TypeScript types
└── vendors.ts       # Vendor-related operations

/app/api/vendors/
├── route.ts         # GET all vendors, POST new vendor
└── [slug]/
    └── route.ts     # GET, PATCH, DELETE specific vendor

/supabase/migrations/
└── 001_vendors_marketplace_schema.sql  # Database schema
```

## Available Operations

### Vendor Operations
- `getVendors()` - List vendors with filtering and pagination
- `getVendorBySlug()` - Get single vendor with all relations
- `searchVendors()` - Search vendors by name or description
- `createVendor()` - Create new vendor
- `updateVendor()` - Update vendor details
- `deleteVendor()` - Soft delete vendor

### Review Operations
- `getVendorReviews()` - Get reviews for a vendor
- `createReview()` - Add new review
- `markReviewHelpful()` - Increment helpful count

### Inquiry Operations
- `createInquiry()` - Submit inquiry to vendor
- `getVendorInquiries()` - Get inquiries for a vendor
- `updateInquiryStatus()` - Update inquiry status

### Category Operations
- `getCategories()` - List all active categories
- `getCategoryBySlug()` - Get single category

## Next Steps

1. **Create UI Components**: Build React components for:
   - Vendor listing page
   - Vendor detail page
   - Review system
   - Contact forms
   - Search and filters

2. **Add Image Upload**: Integrate Supabase Storage for vendor logos and gallery images

3. **Implement Authentication**: Add user accounts for vendor management

4. **Add Admin Panel**: Create admin interface for managing vendors and reviews

5. **Set Up Email Notifications**: Use Supabase Edge Functions for sending emails

## Troubleshooting

### Common Issues

1. **"Invalid API key"**: Make sure your environment variables are correct
2. **"relation does not exist"**: Run the migration SQL in your Supabase dashboard
3. **CORS errors**: Check that your Supabase project URL is correct

## Additional Resources

- [Supabase Docs](https://supabase.com/docs)
- [Next.js + Supabase Guide](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)