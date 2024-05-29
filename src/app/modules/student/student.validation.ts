import { z } from 'zod';

// Define Name schema
const nameValidationSchema = z.object({
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
const guardianValidationSchema = z.object({
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
const localGuardianValidationSchema = z.object({
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
  password: z.string().max(20),
  student: z.object({
    name: nameValidationSchema,
    gender: z.enum(['male', 'female', 'other']),
    dateOfBirth: z.string().optional(),
    email: z.string().email(),
    contactNo: z.string(),
    emergencyContactNo: z.string(),
    bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
    presentAddress: z.string(),
    permanentAddress: z.string(),
    guardian: guardianValidationSchema,
    localGuardian: localGuardianValidationSchema,
    admissionSemester: z.string(),
    profileImg: z.string(),
  }),
});
