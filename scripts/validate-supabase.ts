import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

// Load environment variables
dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

function log(message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info') {
  const colorMap = {
    success: colors.green,
    error: colors.red,
    warning: colors.yellow,
    info: colors.cyan,
  };

  const symbol = {
    success: '✅',
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️',
  };

  console.log(`${colorMap[type]}${symbol[type]} ${message}${colors.reset}`);
}

async function validateSupabaseSetup() {
  console.log(`\n${colors.bright}${colors.magenta}🔍 Validating Supabase Setup${colors.reset}\n`);

  // Step 1: Check environment variables
  log('Checking environment variables...', 'info');

  if (!SUPABASE_URL) {
    log('NEXT_PUBLIC_SUPABASE_URL is not set in .env.local', 'error');
    log('Please add your Supabase project URL to .env.local', 'warning');
    return false;
  }

  if (!SUPABASE_ANON_KEY) {
    log('NEXT_PUBLIC_SUPABASE_ANON_KEY is not set in .env.local', 'error');
    log('Please add your Supabase anon key to .env.local', 'warning');
    return false;
  }

  log('Environment variables found', 'success');
  log(`URL: ${SUPABASE_URL}`, 'info');
  log(`Key: ${SUPABASE_ANON_KEY.substring(0, 20)}...`, 'info');

  // Step 2: Validate URL format
  log('\nValidating URL format...', 'info');

  try {
    const url = new URL(SUPABASE_URL);
    if (!url.hostname.includes('supabase.co')) {
      log('URL does not appear to be a Supabase URL', 'warning');
    } else {
      log('URL format is valid', 'success');
    }
  } catch (error) {
    log('Invalid URL format', 'error');
    return false;
  }

  // Step 3: Test connection
  log('\nTesting connection to Supabase...', 'info');

  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    // Try to connect and get tables
    const { error: connError } = await supabase.from('categories').select('count', { count: 'exact', head: true });

    if (connError) {
      if (connError.message.includes('relation') && connError.message.includes('does not exist')) {
        log('Connection successful, but tables not found', 'warning');
        log('Please run the migration SQL in your Supabase dashboard', 'warning');
        log('File: supabase/migrations/001_vendors_marketplace_schema.sql', 'info');
      } else if (connError.message.includes('Invalid API')) {
        log('Invalid API key', 'error');
        log('Please check your NEXT_PUBLIC_SUPABASE_ANON_KEY', 'warning');
      } else {
        log(`Connection error: ${connError.message}`, 'error');
      }
      return false;
    }

    log('Successfully connected to Supabase', 'success');

    // Step 4: Check tables
    log('\nChecking database tables...', 'info');

    const tables = [
      'categories',
      'vendors',
      'vendor_reviews',
      'vendor_inquiries',
      'vendor_gallery',
      'vendor_social_links'
    ];

    let allTablesExist = true;

    for (const table of tables) {
      const { error } = await supabase.from(table).select('count', { count: 'exact', head: true });

      if (error) {
        log(`Table '${table}' not found`, 'error');
        allTablesExist = false;
      } else {
        log(`Table '${table}' exists`, 'success');
      }
    }

    if (!allTablesExist) {
      log('\nSome tables are missing', 'warning');
      log('Please run the migration SQL in your Supabase dashboard', 'warning');
      return false;
    }

    // Step 5: Check for data
    log('\nChecking for data...', 'info');

    const { data: categories, error: catError } = await supabase
      .from('categories')
      .select('*')
      .limit(1);

    if (!catError && categories && categories.length > 0) {
      log(`Found ${categories.length} categories`, 'success');
    } else {
      log('No categories found (this is OK for a fresh setup)', 'warning');
    }

    const { data: vendors, error: vendorError } = await supabase
      .from('vendors')
      .select('*')
      .limit(1);

    if (!vendorError && vendors && vendors.length > 0) {
      log(`Found vendors in database`, 'success');
    } else {
      log('No vendors found (this is OK for a fresh setup)', 'warning');
    }

    // Step 6: Test write permissions
    log('\nTesting write permissions...', 'info');

    const testInquiry = {
      vendor_id: '00000000-0000-0000-0000-000000000000', // Fake UUID
      name: 'Test User',
      email: 'test@example.com',
      message: 'This is a test inquiry from the validation script'
    };

    const { error: writeError } = await supabase
      .from('vendor_inquiries')
      .insert(testInquiry);

    if (writeError) {
      if (writeError.message.includes('violates foreign key')) {
        log('Write permissions OK (foreign key validation working)', 'success');
      } else {
        log(`Write test failed: ${writeError.message}`, 'error');
      }
    } else {
      log('Write permissions verified', 'success');
      // Clean up test data
      await supabase
        .from('vendor_inquiries')
        .delete()
        .eq('email', 'test@example.com');
    }

    // Final summary
    console.log(`\n${colors.bright}${colors.green}✨ Validation Complete${colors.reset}\n`);
    log('Your Supabase setup is working correctly!', 'success');
    log('\nNext steps:', 'info');
    log('1. Add sample data using the SQL provided in the setup guide', 'info');
    log('2. Test the API endpoints at http://localhost:3001/api/vendors', 'info');
    log('3. Start building your vendor marketplace UI', 'info');

    return true;

  } catch (error) {
    log(`Unexpected error: ${error}`, 'error');
    return false;
  }
}

// Run validation
validateSupabaseSetup().then((success) => {
  if (!success) {
    console.log(`\n${colors.bright}${colors.red}❌ Validation Failed${colors.reset}`);
    console.log(`\n${colors.yellow}Please check the setup guide: SUPABASE_PROJECT_SETUP.md${colors.reset}\n`);
    process.exit(1);
  }
  process.exit(0);
}).catch((error) => {
  console.error('Validation script error:', error);
  process.exit(1);
});