import { Router } from 'express';

import { AuthRouter } from '../module/auth/auth.route';
import { FacilityRouter } from '../module/Facility/facility.route';
import { BookingRouter } from '../module/Booking/booking.route';
import { AvailableTimeRouter } from '../module/Booking/availableTime.route';
import { UserRouter } from '../module/user/user.route';
import { testimonialRouter } from '../module/Testimonial/testimonial.route';

const router = Router();

const moduleRoutes = [
  { path: '/user', route: UserRouter },
  { path: '/auth', route: AuthRouter },
  { path: '/facility', route: FacilityRouter },
  { path: '/bookings', route: BookingRouter },
  { path: '/check-availability', route: AvailableTimeRouter },
  { path: '/testimonial', route: testimonialRouter },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
