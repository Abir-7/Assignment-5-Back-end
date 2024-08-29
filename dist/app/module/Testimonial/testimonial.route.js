"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testimonialRouter = void 0;
const express_1 = require("express");
const testimonial_controller_1 = require("./testimonial.controller");
const router = (0, express_1.Router)();
router.post('/save-testimonial', testimonial_controller_1.testimonialController.saveTestimonial);
router.get('/', testimonial_controller_1.testimonialController.getAllTestimonial);
exports.testimonialRouter = router;
