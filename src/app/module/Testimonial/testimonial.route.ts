import { Router } from 'express';
import { testimonialController } from './testimonial.controller';

const router = Router();
router.post('/save-testimonial', testimonialController.saveTestimonial);
router.get('/', testimonialController.getAllTestimonial);

export const testimonialRouter = router;
