"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testimonialZodSchema = void 0;
const zod_1 = require("zod");
const mongoose_1 = require("mongoose");
exports.testimonialZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        bookingId: zod_1.z
            .instanceof(mongoose_1.Types.ObjectId)
            .refine((id) => mongoose_1.Types.ObjectId.isValid(id), {
            message: 'Booking ID must be a valid ObjectId',
        }),
        user: zod_1.z
            .instanceof(mongoose_1.Types.ObjectId)
            .refine((id) => mongoose_1.Types.ObjectId.isValid(id), {
            message: 'User ID must be a valid ObjectId',
        }),
        rating: zod_1.z
            .number()
            .min(1, 'Rating must be at least 1')
            .max(5, 'Rating must be at most 5'),
        comment: zod_1.z.string().min(1, 'Comment is required'),
    }),
});
