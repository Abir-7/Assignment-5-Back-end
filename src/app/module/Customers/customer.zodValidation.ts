import { z } from 'zod';

export const zodCustomerSchema = z.object({
  body: z.object({
    password: z.string({ required_error: 'password is required' }),
    customer: z.object({
      email: z
        .string({
          required_error: 'Email is required.',
          invalid_type_error: 'Email must be a string.',
        })
        .email('Invalid email format.'),
      name: z.object({
        firstName: z.string({
          required_error: 'First name is required.',
          invalid_type_error: 'First name must be a string.',
        }),
        middleName: z
          .string({
            invalid_type_error: 'Middle name must be a string.',
          })

          .optional(),
        lastName: z.string({
          required_error: 'Last name is required.',
          invalid_type_error: 'Last name must be a string.',
        }),
      }),
      phone: z.number({
        required_error: 'Contact number is required.',
        invalid_type_error: 'Contact number must be a number.',
      }),
      address: z
        .string({
          required_error: 'Address is required.',
          invalid_type_error: 'Address must be a string.',
        })
        .optional(),
    }),
  }),
});
