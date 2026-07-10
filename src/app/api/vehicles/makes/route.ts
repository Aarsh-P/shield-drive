import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { apiSuccess, apiError } from '@/lib/api-response';

const CACHE_HEADERS = { 'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=3600' } as const;

// Simple in-memory cache map keyed by year
const cachedMakes = new Map<number, string[]>();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const yearStr = searchParams.get('year');

    if (!yearStr) {
      return apiError('Missing year parameter', 400);
    }

    const year = parseInt(yearStr, 10);
    if (isNaN(year)) {
      return apiError('Invalid year parameter', 400);
    }

    const cached = cachedMakes.get(year);
    if (cached) {
      return apiSuccess(cached, 200, CACHE_HEADERS);
    }

    const result = await prisma.vehicle.findMany({
      where: { year },
      select: { make: true },
      distinct: ['make'],
      orderBy: { make: 'asc' },
    });

    const makes = result.map((item) => item.make);
    cachedMakes.set(year, makes);

    return apiSuccess(makes, 200, CACHE_HEADERS);
  } catch (error) {
    console.error('Error fetching makes:', error);
    return apiError('Internal Server Error', 500);
  }
}
