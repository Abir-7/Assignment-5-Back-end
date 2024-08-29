"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = require("../module/auth/auth.route");
const facility_route_1 = require("../module/Facility/facility.route");
const booking_route_1 = require("../module/Booking/booking.route");
const availableTime_route_1 = require("../module/Booking/availableTime.route");
const user_route_1 = require("../module/user/user.route");
const testimonial_route_1 = require("../module/Testimonial/testimonial.route");
const payment_route_1 = require("../module/Payment/payment.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    { path: '/user', route: user_route_1.UserRouter },
    { path: '/auth', route: auth_route_1.AuthRouter },
    { path: '/facility', route: facility_route_1.FacilityRouter },
    { path: '/bookings', route: booking_route_1.BookingRouter },
    { path: '/check-availability', route: availableTime_route_1.AvailableTimeRouter },
    { path: '/testimonial', route: testimonial_route_1.testimonialRouter },
    { path: '/payment', route: payment_route_1.paymentRouter },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
