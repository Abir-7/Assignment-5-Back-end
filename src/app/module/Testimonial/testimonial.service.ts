import { Customer } from '../Customers/customer.model';
import { ITestimonial } from './testimonial.interface';
import { Testimonial } from './testimonial.model';

const saveTestimonialIntoDb = async (data: ITestimonial) => {
  const customer = await Customer.findOne({ user: data.user });
  const result = await Testimonial.create({ ...data, photo: customer?.photo });

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
