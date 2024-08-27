import { model, Schema } from 'mongoose';
import { ITestimonial } from './Testimonial.interface';

const testimonialSchema = new Schema<ITestimonial>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required'],
  },
  bookingId: {
    type: Schema.Types.ObjectId,
    ref: 'Booking',
    required: [true, 'Booking ID is required'],
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating must be at most 5'],
  },
  comment: {
    type: String,
    required: [true, 'Comment is required'],
  },
});
export const Testimonial = model<ITestimonial>(
  'Testimonial',
  testimonialSchema,
);
