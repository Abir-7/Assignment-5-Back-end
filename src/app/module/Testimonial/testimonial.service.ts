import { ITestimonial } from './testimonial.interface';
import { Testimonial } from './testimonial.model';

const saveTestimonialIntoDb = async (data: ITestimonial) => {
  const result = await Testimonial.create(data);
  return result;
};
const getAllTestimonialFromDb = async () => {
  const result = await Testimonial.find()
    .populate('user')
    .populate('bookingId');
  return result;
};

export const testimonialService = {
  saveTestimonialIntoDb,
  getAllTestimonialFromDb,
};
