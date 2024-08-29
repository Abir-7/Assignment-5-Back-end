"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentConfirm = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const booking_model_1 = require("../Booking/booking.model");
const customer_model_1 = require("../Customers/customer.model");
const facility_model_1 = require("../Facility/facility.model");
exports.paymentConfirm = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query;
    const bookingData = yield booking_model_1.Booking.findById(id)
        .populate('facility')
        .populate('user');
    if (!bookingData) {
        return res.status(404).send('<h1>Booking not found</h1>');
    }
    const facilityData = yield facility_model_1.Facility.findById(bookingData.facility);
    const userData = yield customer_model_1.Customer.findOne({ user: bookingData.user });
    // Update payment status to 'paid'
    bookingData.paymentStatus = 'paid';
    yield bookingData.save();
    return res.status(200).send(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .container {
                width: 100%;
                max-width: 600px;
                margin: 20px auto;
                background-color: #ffffff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0,0,0,0.1);
            }
            .header {
                background-color: rgb(2 6 23);
                color: #ffffff;
                padding: 10px;
                text-align: center;
                border-radius: 8px 8px 0 0;
            }
            .content {
                padding: 20px;
            }
            .content p {
                font-size: 16px;
                color: #333333;
            }
            .footer {
                background-color: rgb(2 6 23);
                color: #ffffff;
                padding: 10px;
                text-align: center;
                border-radius: 0 0 8px 8px;
                font-size: 14px;
            }
            .highlight {
                font-weight: bold;
                color: #007BFF;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Booking Confirmation</h1>
            </div>
            <div class="content">
                <p>Dear Customer,</p>
                <p>Your booking has been <span class="highlight">confirmed</span> with the following details:</p>
                <p><strong>Facility Name:</strong> ${facilityData === null || facilityData === void 0 ? void 0 : facilityData.name}</p>
                <p><strong>User:</strong> ${userData === null || userData === void 0 ? void 0 : userData.email}</p>
                <p><strong>Date:</strong>${bookingData.date}</p>
                <p><strong>Start Time:</strong> ${bookingData.startTime}</p>
                <p><strong>End Time:</strong>${bookingData.endTime}</p>
                <p><strong>Transaction ID:</strong> ${bookingData.txnID}</p>
                <p><strong>Payment Status:</strong> ${bookingData.paymentStatus}</p>
                <p><strong>Payable Amount:</strong>${Number(bookingData.payableAmount).toFixed(2)}$</p>
                <p>Thank you for booking with us. We look forward to seeing you!</p>
            </div>
            <div class="footer">
                &copy; 2024 Dream Sports. All rights reserved.
            </div>
        </div>
    </body>
    </html>`);
}));
