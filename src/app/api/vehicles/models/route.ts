import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const yearStr = searchParams.get('year');
    const make = searchParams.get('make');

    if (!yearStr || !make) {
      return NextResponse.json({ error: 'Missing year or make parameter' }, { status: 400 });
    }

    const year = parseInt(yearStr, 10);
    if (isNaN(year)) {
      return NextResponse.json({ error: 'Invalid year parameter' }, { status: 400 });
    }

    const result = await prisma.vehicle.findMany({
      where: {
        year: year,
        make: make,
      },
      select: {
        model: true,
      },
      distinct: ['model'],
      orderBy: {
        model: 'asc',
      },
    });

    const models = result.map((item) => item.model);

    return NextResponse.json(models, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=59',
      },
    });
  } catch (error) {
    console.error('Error fetching models:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
