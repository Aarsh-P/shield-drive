import { NextRequest } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { apiSuccess, apiError } from '@/lib/api-response';
import { leadSchema } from '@/lib/lead-schema';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Zod Validation
    const validationResult = leadSchema.safeParse(body);
    if (!validationResult.success) {
      const formattedErrors = z.treeifyError(validationResult.error);
      return apiError('Validation failed', 400, formattedErrors);
    }

    const data = validationResult.data;

    // DB validation
    const vehicleExists = await prisma.vehicle.findUnique({
      where: {
        year_make_model: {
          year: data.carYear,
          make: data.carMake,
          model: data.carModel,
        },
      },
    });

    if (!vehicleExists) {
      return apiError('Validation failed', 400, {
        carModel: {
          _errors: ['The selected vehicle year, make, and model combination is invalid.']
        }
      });
    }

    // Create
    const newLead = await prisma.lead.create({
      data,
    });

    return apiSuccess({ leadId: newLead.id }, 201);

  } catch (error) {
    console.error('Error creating lead:', error);
    return apiError('Internal Server Error', 500);
  }
}
