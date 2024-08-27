import { Types } from 'mongoose';

export interface ITestimonial {
  user: Types.ObjectId;
  rating: number;
  comment: string;
  bookingId: Types.ObjectId;
}
