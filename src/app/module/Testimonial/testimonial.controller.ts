import { RequestHandler } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { testimonialService } from './testimonial.service';

const saveTestimonial: RequestHandler = catchAsync(async (req, res) => {
  const result = await testimonialService.saveTestimonialIntoDb(req.body);

  return sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Review added successfully',
    data: result,
  });
});

const getAllTestimonial: RequestHandler = catchAsync(async (req, res) => {
  const result = await testimonialService.getAllTestimonialFromDb();

  return sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Review are fetched successfully',
    data: result,
  });
});
export const testimonialController = { saveTestimonial, getAllTestimonial };
