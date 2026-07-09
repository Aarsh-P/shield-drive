import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';

// Regex for US phone number validation: allows formats like (123) 456-7890, 123-456-7890, 1234567890, etc.
const USPhoneRegex = /^\+?1?\s*\(?[0-9]{3}\)?[-. ]?[0-9]{3}[-. ]?[0-9]{4}$/;
// exactly 5 digits
const ZIPRegex = /^[0-9]{5}$/;

const leadSchema = z.object({
  firstName: z.string().trim().min(1, 'First name is required').max(100),
  lastName: z.string().trim().min(1, 'Last name is required').max(100),
  email: z.string().trim().toLowerCase().email('Invalid email address').max(255),
  phone: z.string().trim().regex(USPhoneRegex, 'Invalid US phone number format (e.g. 123-456-7890)'),
  zipCode: z.string().trim().regex(ZIPRegex, 'ZIP code must be exactly 5 digits'),
  carYear: z.number({ message: 'Car year is required' }).int().min(2000).max(2027),
  carMake: z.string().trim().min(1, 'Car make is required').max(50),
  carModel: z.string().trim().min(1, 'Car model is required').max(50),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Zod Validation
    const validationResult = leadSchema.safeParse(body);
    if (!validationResult.success) {
      const formattedErrors = z.treeifyError(validationResult.error);
      return NextResponse.json({
        error: 'Validation failed',
        details: formattedErrors
      }, { status: 400 });
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
      return NextResponse.json({
        error: 'Validation failed',
        details: {
          carModel: {
            _errors: ['The selected vehicle year, make, and model combination is invalid.']
          }
        }
      }, { status: 400 });
    }

    // Create
    const newLead = await prisma.lead.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        zipCode: data.zipCode,
        carYear: data.carYear,
        carMake: data.carMake,
        carModel: data.carModel,
      },
    });

    return NextResponse.json({
      success: true,
      leadId: newLead.id
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating lead:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
