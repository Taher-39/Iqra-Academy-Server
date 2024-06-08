import { z } from 'zod';

export const departmentValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Department must be string',
      required_error: 'Department name is required',
    }),
    faculty: z.string({
      invalid_type_error: 'Faculty id must be string',
      required_error: 'Faculty id is required',
    }),
  }),
});
export const departmentUpdateValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'Department must be string',
        required_error: 'Department name is required',
      })
      .optional(),
    faculty: z
      .string({
        invalid_type_error: 'Faculty id must be string',
        required_error: 'Faculty id is required',
      })
      .optional(),
  }),
});
