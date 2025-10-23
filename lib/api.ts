// API client for backend-service integration

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface VendorProfile {
  id: string;
  slug: string;
  businessName: string;
  description: string;
  services: string[];
  serviceAreas: string[];
  website?: string;
  phone?: string;
  email?: string;
  verified: boolean;
  featured: boolean;
  averageRating?: number;
  totalReviews: number;
  logoUrl?: string;
  coverImageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface VendorFilters {
  services?: string[];
  serviceAreas?: string[];
  verified?: boolean;
  featured?: boolean;
  search?: string;
  limit?: number;
  offset?: number;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async fetcher<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
      throw error;
    }
  }

  // Vendor Directory Methods
  async getVendors(filters?: VendorFilters): Promise<VendorProfile[]> {
    const params = new URLSearchParams();

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) {
          if (Array.isArray(value)) {
            value.forEach(v => params.append(key, v));
          } else {
            params.append(key, String(value));
          }
        }
      });
    }

    const queryString = params.toString();
    const endpoint = `/api/vendor-directory/vendors${queryString ? `?${queryString}` : ''}`;

    return this.fetcher<VendorProfile[]>(endpoint);
  }

  async getVendorBySlug(slug: string): Promise<VendorProfile> {
    return this.fetcher<VendorProfile>(`/api/vendor-directory/vendors/${slug}`);
  }

  async getFeaturedVendors(limit: number = 6): Promise<VendorProfile[]> {
    return this.getVendors({ featured: true, limit });
  }

  async getVendorServices(): Promise<string[]> {
    return this.fetcher<string[]>('/api/vendor-directory/services');
  }

  async getVendorServiceAreas(): Promise<string[]> {
    return this.fetcher<string[]>('/api/vendor-directory/service-areas');
  }
}

export const api = new ApiClient(API_BASE_URL);

// Export for server components
export async function getVendors(filters?: VendorFilters) {
  return api.getVendors(filters);
}

export async function getVendorBySlug(slug: string) {
  return api.getVendorBySlug(slug);
}

export async function getFeaturedVendors(limit?: number) {
  return api.getFeaturedVendors(limit);
}