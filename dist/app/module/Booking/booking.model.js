"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = exports.bookingSchema = void 0;
const mongoose_1 = require("mongoose");
const booking_const_1 = require("./booking.const");
exports.bookingSchema = new mongoose_1.Schema({
    facility: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, 'Facility ID is required'],
        ref: 'Facility',
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, 'User ID is required'],
        ref: 'User',
    },
    date: { type: String, required: [true, 'Booking date is required'] },
    startTime: { type: String, required: [true, 'Start time is required'] },
    txnID: { type: String, required: [true, 'TxnID is required'] },
    paymentStatus: { type: String, default: 'unpaid' },
    endTime: { type: String, required: [true, 'End time is required'] },
    payableAmount: {
        type: Number,
        required: [true, 'Payable Amount is required'],
    },
    isBooked: { type: String, enum: booking_const_1.bookingStatus, default: 'confirmed' },
});
exports.Booking = (0, mongoose_1.model)('Booking', exports.bookingSchema);
