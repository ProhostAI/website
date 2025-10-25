import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  try {
    const supabase = await createClient();

    // Get all vendors to extract unique services and areas
    const { data: vendors, error } = await supabase
      .from('vendors')
      .select('services, city, state_province')
      .eq('is_active', true);

    if (error) {
      console.error('Error fetching vendors for filters:', error);
      return NextResponse.json(
        { error: 'Failed to fetch filter data' },
        { status: 500 }
      );
    }

    // Extract and count unique services
    const serviceCounts = new Map<string, number>();
    const areaCounts = new Map<string, number>();

    vendors?.forEach(vendor => {
      // Count services (handle both array and JSONB formats)
      if (vendor.services) {
        let services: string[] = [];

        // Handle JSONB array format
        if (typeof vendor.services === 'string') {
          try {
            services = JSON.parse(vendor.services);
          } catch {
            services = [vendor.services];
          }
        } else if (Array.isArray(vendor.services)) {
          services = vendor.services;
        } else if (typeof vendor.services === 'object') {
          // If it's already a parsed object/array
          services = vendor.services as string[];
        }

        services.forEach(service => {
          if (service) {
            serviceCounts.set(service, (serviceCounts.get(service) || 0) + 1);
          }
        });
      }

      // Count service areas
      if (vendor.city) {
        areaCounts.set(vendor.city, (areaCounts.get(vendor.city) || 0) + 1);
      }

      // Also count state as a broader area
      if (vendor.state_province) {
        const stateKey = `${vendor.state_province} (State)`;
        areaCounts.set(stateKey, (areaCounts.get(stateKey) || 0) + 1);
      }
    });

    // Convert to sorted arrays with counts
    const services = Array.from(serviceCounts.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count); // Sort by count descending

    const serviceAreas = Array.from(areaCounts.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => {
        // Sort states first, then cities by count
        const aIsState = a.name.includes('(State)');
        const bIsState = b.name.includes('(State)');
        if (aIsState && !bIsState) return -1;
        if (!aIsState && bIsState) return 1;
        return b.count - a.count;
      });

    // Also get total vendor count
    const totalVendors = vendors?.length || 0;

    return NextResponse.json({
      services,
      serviceAreas,
      totalVendors,
      lastUpdated: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error in filters API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Cache the response for 5 minutes
export const revalidate = 300;