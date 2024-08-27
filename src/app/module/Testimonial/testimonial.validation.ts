import { z } from 'zod';
import { Types } from 'mongoose';

export const testimonialZodSchema = z.object({
  body: z.object({
    bookingId: z
      .instanceof(Types.ObjectId)
      .refine((id) => Types.ObjectId.isValid(id), {
        message: 'Booking ID must be a valid ObjectId',
      }),
    user: z
      .instanceof(Types.ObjectId)
      .refine((id) => Types.ObjectId.isValid(id), {
        message: 'User ID must be a valid ObjectId',
      }),
    rating: z
      .number()
      .min(1, 'Rating must be at least 1')
      .max(5, 'Rating must be at most 5'),
    comment: z.string().min(1, 'Comment is required'),
  }),
});
