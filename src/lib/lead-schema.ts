import * as z from "zod";

const USPhoneRegex = /^\+?1?\s*\(?[0-9]{3}\)?[-. ]?[0-9]{3}[-. ]?[0-9]{4}$/;
const ZIPRegex = /^[0-9]{5}$/;

export const leadSchema = z.object({
  firstName: z.string().trim().min(1, 'First name is required').max(100),
  lastName: z.string().trim().min(1, 'Last name is required').max(100),
  email: z.string().trim().toLowerCase().email('Invalid email address').max(255),
  phone: z.string().trim().regex(USPhoneRegex, 'Invalid US phone number format'),
  zipCode: z.string().trim().regex(ZIPRegex, 'ZIP code must be exactly 5 digits'),
  carYear: z.number({ message: 'Car year is required' }).int().min(2000).max(2027),
  carMake: z.string().trim().min(1, 'Car make is required').max(50),
  carModel: z.string().trim().min(1, 'Car model is required').max(50),
});

export type LeadFormValues = z.infer<typeof leadSchema>;
