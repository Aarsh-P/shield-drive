import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const yearStr = searchParams.get('year');

    if (!yearStr) {
      return NextResponse.json({ error: 'Missing year parameter' }, { status: 400 });
    }

    const year = parseInt(yearStr, 10);
    if (isNaN(year)) {
      return NextResponse.json({ error: 'Invalid year parameter' }, { status: 400 });
    }

    const result = await prisma.vehicle.findMany({
      where: {
        year: year,
      },
      select: {
        make: true,
      },
      distinct: ['make'],
      orderBy: {
        make: 'asc',
      },
    });

    const makes = result.map((item) => item.make);

    return NextResponse.json(makes, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=59',
      },
    });
  } catch (error) {
    console.error('Error fetching makes:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
