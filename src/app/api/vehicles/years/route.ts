import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const result = await prisma.vehicle.findMany({
      select: {
        year: true,
      },
      distinct: ['year'],
      orderBy: {
        year: 'desc',
      },
    });

    const years = result.map((item) => item.year);

    return NextResponse.json(years, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=59',
      },
    });
  } catch (error) {
    console.error('Error fetching years:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
