import { prisma } from '@/lib/prisma';
import { apiSuccess, apiError } from '@/lib/api-response';

const CACHE_HEADERS = { 'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=3600' } as const;

// Simple in-memory cache for static vehicle years
let cachedYears: number[] | null = null;

export async function GET() {
  try {
    if (cachedYears) {
      return apiSuccess(cachedYears, 200, CACHE_HEADERS);
    }

    const result = await prisma.vehicle.findMany({
      select: { year: true },
      distinct: ['year'],
      orderBy: { year: 'desc' },
    });

    cachedYears = result.map((item) => item.year);
    return apiSuccess(cachedYears, 200, CACHE_HEADERS);
  } catch (error) {
    console.error('Error fetching years:', error);
    return apiError('Internal Server Error', 500);
  }
}

