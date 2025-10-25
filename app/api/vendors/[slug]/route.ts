import { NextRequest, NextResponse } from 'next/server';
import { getVendorBySlug, updateVendor, deleteVendor } from '@/lib/supabase/vendors';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const vendor = await getVendorBySlug(slug);

    if (!vendor) {
      return NextResponse.json(
        { error: 'Vendor not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ vendor });
  } catch (error) {
    console.error('Error fetching vendor:', error);
    return NextResponse.json(
      { error: 'Failed to fetch vendor' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const body = await request.json();

    // First get the vendor by slug to get the ID
    const existingVendor = await getVendorBySlug(slug);

    if (!existingVendor) {
      return NextResponse.json(
        { error: 'Vendor not found' },
        { status: 404 }
      );
    }

    const vendor = await updateVendor(existingVendor.id, body);

    return NextResponse.json({ vendor });
  } catch (error) {
    console.error('Error updating vendor:', error);
    return NextResponse.json(
      { error: 'Failed to update vendor' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    // First get the vendor by slug to get the ID
    const existingVendor = await getVendorBySlug(slug);

    if (!existingVendor) {
      return NextResponse.json(
        { error: 'Vendor not found' },
        { status: 404 }
      );
    }

    await deleteVendor(existingVendor.id);

    return NextResponse.json({ message: 'Vendor deleted successfully' });
  } catch (error) {
    console.error('Error deleting vendor:', error);
    return NextResponse.json(
      { error: 'Failed to delete vendor' },
      { status: 500 }
    );
  }
}