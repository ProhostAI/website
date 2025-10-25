# Supabase Project Setup - Step by Step Guide

## Step 1: Create Your Supabase Account

1. **Open your browser** and go to: https://app.supabase.com
2. **Sign up** using:
   - GitHub (recommended for developers)
   - Or email/password
3. **Verify your email** if you signed up with email

## Step 2: Create a New Project

1. **Click "New project"** button (usually green button in dashboard)

2. **Fill in project details:**
   ```
   Organization: Select your organization or create new
   Project name: prohost-vendors-marketplace
   Database Password: [Generate a strong password and SAVE IT]
   Region: Choose closest to your users (e.g., "West US (North California)" for US West Coast)
   Pricing Plan: Free tier is fine to start
   ```

3. **Click "Create new project"**
   - Wait 1-2 minutes for project provisioning
   - You'll see a loading screen with a coffee cup

## Step 3: Get Your API Keys

Once your project is ready:

1. **Navigate to Settings:**
   - Click the ⚙️ Settings icon in the left sidebar
   - Select "API" from the submenu

2. **Copy these values:**

   ### Project URL
   ```
   Look for: "URL"
   Example: https://xxxxxxxxxxx.supabase.co
   Copy this entire URL
   ```

   ### Anon/Public Key
   ```
   Look for: "anon" "public" key
   Example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   Copy this entire key (it's long!)
   ```

## Step 4: Update Your Local Environment

1. **Open your `.env.local` file** in your code editor

2. **Replace the placeholder values:**
   ```env
   NEXT_PUBLIC_SUPABASE_URL=paste-your-project-url-here
   NEXT_PUBLIC_SUPABASE_ANON_KEY=paste-your-anon-key-here
   ```

   Example (with fake values):
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhxxxxxxxxxx...
   ```

3. **Save the file**

## Step 5: Run Database Migrations

1. **In Supabase Dashboard:**
   - Click "SQL Editor" in the left sidebar
   - Click "New query" button

2. **Copy the migration SQL:**
   - Open file: `supabase/migrations/001_vendors_marketplace_schema.sql`
   - Select ALL content (Cmd+A or Ctrl+A)
   - Copy (Cmd+C or Ctrl+C)

3. **Paste and run:**
   - Paste into the SQL Editor
   - Click "Run" button (or press Cmd+Enter / Ctrl+Enter)
   - You should see "Success. No rows returned"

4. **Verify tables were created:**
   - Click "Table Editor" in left sidebar
   - You should see these tables:
     - categories
     - vendors
     - vendor_reviews
     - vendor_inquiries
     - vendor_gallery
     - vendor_social_links

## Step 6: Configure Storage (For Images)

1. **Navigate to Storage:**
   - Click "Storage" in the left sidebar
   - Click "New bucket"

2. **Create vendor-images bucket:**
   ```
   Name: vendor-images
   Public bucket: ✅ Check this box
   File size limit: 5MB (or your preference)
   Allowed MIME types: image/jpeg, image/jpg, image/png, image/webp
   ```
   - Click "Create bucket"

3. **Set up storage policies:**
   - Click on the bucket name
   - Go to "Policies" tab
   - Click "New policy"
   - Select "For full customization"
   - Add this policy:

   ```sql
   -- Allow public to view images
   CREATE POLICY "Public Access"
   ON storage.objects FOR SELECT
   USING (bucket_id = 'vendor-images');

   -- Allow authenticated users to upload
   CREATE POLICY "Authenticated users can upload"
   ON storage.objects FOR INSERT
   WITH CHECK (bucket_id = 'vendor-images');
   ```

## Step 7: Test Your Connection

1. **Restart your Next.js dev server:**
   - Stop the current server (Ctrl+C)
   - Run: `npm run dev`

2. **Test the API endpoint:**
   - Open: http://localhost:3001/api/vendors
   - You should see: `{"vendors":[]}`
   - This means connection is working!

## Step 8: Add Sample Data (Optional)

Run this SQL in your Supabase SQL Editor to add sample vendors:

```sql
-- Insert sample vendors
INSERT INTO vendors (name, slug, description, short_description, category_id, rating, is_verified, is_featured)
VALUES
  (
    'TechPro Solutions',
    'techpro-solutions',
    'Leading provider of web development and cloud solutions with 10+ years of experience.',
    'Expert web development and cloud services',
    (SELECT id FROM categories WHERE slug = 'web-development'),
    4.5,
    true,
    true
  ),
  (
    'Digital Masters Agency',
    'digital-masters-agency',
    'Full-service digital marketing agency specializing in SEO, PPC, and social media marketing.',
    'Your digital marketing experts',
    (SELECT id FROM categories WHERE slug = 'digital-marketing'),
    4.8,
    true,
    false
  ),
  (
    'CloudFirst Technologies',
    'cloudfirst-technologies',
    'Enterprise cloud migration and DevOps consulting services.',
    'Cloud migration specialists',
    (SELECT id FROM categories WHERE slug = 'cloud-services'),
    4.7,
    false,
    true
  );

-- Add sample reviews
INSERT INTO vendor_reviews (vendor_id, reviewer_name, reviewer_email, rating, title, comment, is_verified)
VALUES
  (
    (SELECT id FROM vendors WHERE slug = 'techpro-solutions'),
    'John Smith',
    'john@example.com',
    5,
    'Excellent Service!',
    'TechPro delivered our project on time and exceeded expectations. Highly recommended!',
    true
  ),
  (
    (SELECT id FROM vendors WHERE slug = 'digital-masters-agency'),
    'Sarah Johnson',
    'sarah@example.com',
    4,
    'Great Results',
    'Our SEO rankings improved significantly. Very professional team.',
    true
  );
```

## Step 9: Verify Everything Works

1. **Check API with sample data:**
   - Visit: http://localhost:3001/api/vendors
   - You should now see the sample vendors

2. **Check individual vendor:**
   - Visit: http://localhost:3001/api/vendors/techpro-solutions
   - You should see detailed vendor info

## Troubleshooting

### ❌ "Invalid API Key" Error
- Double-check your `.env.local` file
- Make sure there are no extra spaces or quotes
- Restart your dev server after changing env files

### ❌ "Relation does not exist" Error
- Make sure you ran the migration SQL
- Check that all tables were created in Table Editor

### ❌ Connection Refused
- Verify your Supabase project is active (not paused)
- Check that the URL is correct (includes https://)

### ❌ CORS Errors
- This usually means the URL is wrong
- Verify the URL matches exactly from Supabase dashboard

## Security Checklist

Before going to production:

- [ ] Enable Row Level Security (RLS) on all tables
- [ ] Set up proper authentication
- [ ] Use service role key only on server-side
- [ ] Configure allowed domains in Supabase
- [ ] Set up rate limiting
- [ ] Enable SSL enforcement

## Quick Commands Reference

```bash
# Check your environment variables
cat .env.local

# Test your connection (requires curl)
curl http://localhost:3001/api/vendors

# Restart dev server
npm run dev
```

## Next Steps

✅ Project created and configured
✅ Database schema installed
✅ API endpoints working

Ready to build your vendor marketplace UI!

---

Need help?
- Supabase Discord: https://discord.supabase.com
- Documentation: https://supabase.com/docs
- Status Page: https://status.supabase.com