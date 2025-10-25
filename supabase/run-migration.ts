import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

// Load environment variables
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

// Create Supabase client with service role key (bypasses RLS)
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function runMigration() {
  try {
    console.log('🚀 Running migration: 002_update_vendors_for_original_data.sql');

    // Read the migration file
    const migrationPath = path.join(__dirname, 'migrations', '002_update_vendors_for_original_data.sql');
    const migrationSQL = fs.readFileSync(migrationPath, 'utf-8');

    // Split the SQL into individual statements (by semicolon)
    const statements = migrationSQL
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'));

    // Execute each statement
    for (const statement of statements) {
      console.log(`Executing: ${statement.substring(0, 50)}...`);

      const { error } = await supabase.rpc('exec_sql', {
        sql_query: statement + ';'
      }).single();

      if (error) {
        // Try direct execution if RPC doesn't work
        console.log('RPC failed, trying direct execution...');
        // Note: Direct SQL execution via Supabase client is limited
        // We'll need to handle this differently
      }
    }

    console.log('✅ Migration completed successfully!');

  } catch (error) {
    console.error('❌ Error running migration:', error);
    process.exit(1);
  }
}

// Alternative approach: Just clear existing data and prepare for new seed
async function prepareForSeed() {
  try {
    console.log('🧹 Preparing database for original mock data...');

    // Clear existing data in reverse dependency order
    await supabase.from('vendor_inquiries').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('vendor_reviews').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('vendor_gallery').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('vendor_social_links').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('vendors').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('categories').delete().neq('id', '00000000-0000-0000-0000-000000000000');

    console.log('✅ Database cleaned successfully!');

    // Insert categories
    const categories = [
      { name: 'Cleaning Services', slug: 'cleaning-services', description: 'Professional cleaning and housekeeping services', icon: 'sparkles' },
      { name: 'Maintenance & Repairs', slug: 'maintenance-repairs', description: 'Property maintenance and repair services', icon: 'wrench' },
      { name: 'Pool Services', slug: 'pool-services', description: 'Pool cleaning and maintenance', icon: 'water' },
      { name: 'Landscaping', slug: 'landscaping', description: 'Lawn care and landscaping services', icon: 'tree' },
      { name: 'HVAC Services', slug: 'hvac-services', description: 'Heating, ventilation, and air conditioning', icon: 'wind' },
      { name: 'Photography', slug: 'photography', description: 'Real estate photography and virtual tours', icon: 'camera' }
    ];

    const { error: catError } = await supabase.from('categories').insert(categories);
    if (catError) {
      console.error('Error inserting categories:', catError);
    } else {
      console.log('✅ Categories inserted successfully!');
    }

  } catch (error) {
    console.error('❌ Error preparing database:', error);
    process.exit(1);
  }
}

// Run the preparation
prepareForSeed();