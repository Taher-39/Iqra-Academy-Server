import { z } from 'zod';
import { Month, SemesterCode, SemesterName } from './semester.constant';

export const TSemesterValidationSchema = z.object({
  body: z.object({
    name: z.enum([...SemesterName] as [string, ...string[]]),
    code: z.enum([...SemesterCode] as [string, ...string[]]),
    year: z.string(),
    startMonth: z.enum([...Month] as [string, ...string[]]),
    endMonth: z.enum([...Month] as [string, ...string[]]),
  }),
});

export const TSemesterUpdateValidationSchema = z.object({
  body: z.object({
    name: z.enum([...SemesterName] as [string, ...string[]]).optional(),
    code: z.enum([...SemesterCode] as [string, ...string[]]).optional(),
    year: z.string().optional(),
    startMonth: z.enum([...Month] as [string, ...string[]]).optional(),
    endMonth: z.enum([...Month] as [string, ...string[]]).optional(),
  }),
});
