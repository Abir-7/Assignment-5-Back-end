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
exports.BookingService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const facility_model_1 = require("../Facility/facility.model");
const booking_model_1 = require("./booking.model");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const booking_utils_1 = require("./booking.utils");
const payment_utils_1 = require("../Payment/payment.utils");
const customer_model_1 = require("../Customers/customer.model");
//create booking
const createBookingIntoDb = (data) => __awaiter(void 0, void 0, void 0, function* () {
    //check if facility exixt
    const isFacilityExist = yield facility_model_1.Facility.findById(data.facility);
    if (!isFacilityExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Facility not found');
    }
    //check if facility deleted
    if (isFacilityExist.isDeleted) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Facility deleted');
    }
    //get already booked time slot
    const getAllBookingTimeForProvidedDate = yield booking_model_1.Booking.find({
        facility: data.facility,
        date: data.date,
    }).select(['startTime', 'endTime', '_id']);
    //check time conflict
    if ((0, booking_utils_1.hasTimeConflict)(getAllBookingTimeForProvidedDate, {
        startTime: data.startTime,
        endTime: data.endTime,
    })) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Seleted Time Not Available');
    }
    //calculate payable  ammount for booking
    const totalTime = (0, booking_utils_1.getTotalTimeInHour)(data.startTime, data.endTime);
    data.payableAmount = totalTime * isFacilityExist.pricePerHour;
    const customer = yield customer_model_1.Customer.findOne({ user: data.user });
    console.log(customer);
    const customerData = {
        name: `${customer === null || customer === void 0 ? void 0 : customer.name.firstName} ${customer === null || customer === void 0 ? void 0 : customer.name.middleName} ${customer === null || customer === void 0 ? void 0 : customer.name.lastName}`,
        email: customer === null || customer === void 0 ? void 0 : customer.email,
        address: customer === null || customer === void 0 ? void 0 : customer.address,
        phone: customer === null || customer === void 0 ? void 0 : customer.phone,
    };
    const bookingData = data;
    const txn = `TXN-${Date.now()}`;
    //create booking
    const result = (yield (yield booking_model_1.Booking.create(Object.assign(Object.assign({}, data), { txnID: txn }))).populate('facility')).populate('user');
    const paymentInfo = yield (0, payment_utils_1.initiatePayment)({
        bookingData,
        txn,
        customerData,
        bookingId: (yield result)._id,
    });
    console.log(data, paymentInfo.data);
    return Object.assign(Object.assign({}, result), { payLink: paymentInfo.data.payment_url });
});
//get all booking by admin
const getAllBookingFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.Booking.find().populate('user').populate('facility');
    return result;
});
//get all booking by user
const getAllBookingByUserFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.Booking.find({
        user: id,
    })
        .populate('facility')
        .populate({
        path: 'user',
        select: 'email', // Specify the fields you want to include
    });
    return result;
});
//get single booking by user
const getSingleBookingByUserFromDb = (id, bID) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.Booking.findOne({
        user: id,
        _id: bID,
    })
        .populate('facility')
        .populate({
        path: 'user',
        select: 'email', // Specify the fields you want to include
    });
    return result;
});
//cencel booking
const deleteBookingByUserFromDb = (userID, bookingID) => __awaiter(void 0, void 0, void 0, function* () {
    const isBookingExist = yield booking_model_1.Booking.findOne({
        _id: bookingID,
        user: userID,
    });
    if (!isBookingExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Booking not found');
    }
    const result = yield booking_model_1.Booking.findByIdAndUpdate(bookingID, { isBooked: 'canceled' }, { new: true }).populate('facility');
    return result;
});
//get available time
const getAvailableTimeSlotsFromBooking = (givenDate, id) => __awaiter(void 0, void 0, void 0, function* () {
    const date = givenDate;
    const bookings = yield booking_model_1.Booking.find({ date: date, facility: id }).select([
        'date',
        'startTime',
        'endTime',
    ]);
    const availableTimeSlots = (0, booking_utils_1.findAvailableTimeSlotForBooking)(bookings);
    return availableTimeSlots;
});
exports.BookingService = {
    createBookingIntoDb,
    getAllBookingFromDb,
    getAllBookingByUserFromDb,
    deleteBookingByUserFromDb,
    getAvailableTimeSlotsFromBooking,
    getSingleBookingByUserFromDb,
};
