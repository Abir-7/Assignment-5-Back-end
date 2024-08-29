"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Testimonial = void 0;
const mongoose_1 = require("mongoose");
const testimonialSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User ID is required'],
    },
    bookingId: {
        type: mongoose_1.Schema.Types.ObjectId,
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
    photo: {
        type: String,
    },
});
exports.Testimonial = (0, mongoose_1.model)('Testimonial', testimonialSchema);
