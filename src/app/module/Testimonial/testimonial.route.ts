import { Router } from 'express';
import { testimonialController } from './testimonial.controller';
import { auth } from '../../Middleware/auth';

const router = Router();
router.post(
  '/save-testimonial',
  auth('user'),
  testimonialController.saveTestimonial,
);
router.get('/', testimonialController.getAllTestimonial);

export const testimonialRouter = router;
