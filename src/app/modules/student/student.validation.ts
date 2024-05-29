import { z } from 'zod';

// Define Name schema
const nameSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: 'First Name is required' })
    .max(15, { message: 'First Name must be at most 15 characters long' }),
  lastName: z
    .string()
    .min(1, { message: 'Last Name is required' })
    .max(15, { message: 'Last Name must be at most 15 characters long' }),
});

// Define Guardian schema
const guardianSchema = z.object({
  fatherName: z.string().min(1, { message: 'Father Name is required' }),
  fatherOccupation: z
    .string()
    .min(1, { message: 'Father Occupation is required' }),
  fatherContactNo: z
    .string()
    .min(1, { message: 'Father Contact number is required' })
    .regex(/^\d{5}-\d{6}$/, {
      message: 'Father Contact number must be in the format 00000-000000',
    }),
  motherName: z.string().optional(),
  motherOccupation: z.string().optional(),
  motherContactNo: z.string().optional(),
});

// Define LocalGuardian schema
const localGuardianSchema = z.object({
  name: z.string().min(1, { message: 'Local Guardian Name is required' }),
  occupation: z
    .string()
    .min(1, { message: 'Local Guardian Occupation is required' }),
  contactNo: z
    .string()
    .min(1, { message: 'Local Guardian Contact number is required' })
    .regex(/^\d{5}-\d{6}$/, {
      message:
        'Local Guardian Contact number must be in the format 00000-000000',
    }),
  address: z.string().min(1, { message: 'Local Guardian Address is required' }),
});

// Define Student schema
export const studentValidationSchema = z.object({
  id: z.string().min(1, { message: 'ID is required' }),
  user: z.string().min(1, { message: 'User is required' }),
  password: z.string().max(20, { message: 'password max 20 charecter' }),
  email: z
    .string()
    .email({ message: 'Invalid email address' })
    .min(1, { message: 'Email is required' }),
  name: nameSchema,
  gender: z.enum(['male', 'female']),
  dateOfBirth: z
    .string()
    .min(1, { message: 'Date of Birth is required' })
    .refine((date) => !isNaN(Date.parse(date)), {
      message: 'Invalid date format',
    }),
  contactNo: z
    .string()
    .min(1, { message: 'Contact is required' })
    .regex(/^\d{5}-\d{6}$/, {
      message: 'Contact number must be in the format 00000-000000',
    }),
  emergencyContactNo: z
    .string()
    .min(1, { message: 'Emergency Contact is required' })
    .regex(/^\d{5}-\d{6}$/, {
      message: 'Emergency Contact number must be in the format 00000-000000',
    }),
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
    message: '{VALUE} is not a valid blood group',
  }),
  presentAddress: z.string().min(1, { message: 'Present Address is required' }),
  permanentAddress: z
    .string()
    .min(1, { message: 'Permanent Address is required' }),
  guardian: guardianSchema,
  localGuardian: localGuardianSchema,
  profileImg: z.string().optional(),
  isActive: z
    .enum(['active', 'blocked'], { message: '{VALUE} is not a valid status' })
    .default('active'),
});
