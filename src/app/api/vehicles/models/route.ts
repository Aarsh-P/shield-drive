import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { apiSuccess, apiError } from '@/lib/api-response';

const CACHE_HEADERS = { 'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=3600' } as const;

// Simple in-memory cache map keyed by "year_make"
const cachedModels = new Map<string, string[]>();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const yearStr = searchParams.get('year');
    const make = searchParams.get('make');

    if (!yearStr || !make) {
      return apiError('Missing year or make parameter', 400);
    }

    const year = parseInt(yearStr, 10);
    if (isNaN(year)) {
      return apiError('Invalid year parameter', 400);
    }

    const cacheKey = `${year}_${make.toLowerCase()}`;
    const cached = cachedModels.get(cacheKey);
    if (cached) {
      return apiSuccess(cached, 200, CACHE_HEADERS);
    }

    const result = await prisma.vehicle.findMany({
      where: { year, make },
      select: { model: true },
      distinct: ['model'],
      orderBy: { model: 'asc' },
    });

    const models = result.map((item) => item.model);
    cachedModels.set(cacheKey, models);

    return apiSuccess(models, 200, CACHE_HEADERS);
  } catch (error) {
    console.error('Error fetching models:', error);
    return apiError('Internal Server Error', 500);
  }
}
