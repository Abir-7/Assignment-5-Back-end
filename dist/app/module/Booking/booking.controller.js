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
exports.BookingController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const booking_service_1 = require("./booking.service");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const booking_utils_1 = require("./booking.utils");
const createBooking = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user;
    const data = req.body;
    data.user = id;
    const result = yield booking_service_1.BookingService.createBookingIntoDb(data);
    return (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Booking placed. Redirecting to payment page',
        data: result,
    });
}));
const getAllBooking = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_service_1.BookingService.getAllBookingFromDb();
    return (0, sendResponse_1.default)(res, {
        success: result.length ? true : false,
        statusCode: result.length ? 200 : 404,
        message: result.length
            ? 'Bookings retrieved successfully'
            : 'No Data Found',
        data: result,
    });
}));
const getAllBookingByUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user;
    const result = yield booking_service_1.BookingService.getAllBookingByUserFromDb(id);
    return (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Bookings retrieved successfully',
        data: result,
    });
}));
const getSingleBookingByUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: bID } = req.params;
    const { id } = req.user;
    const result = yield booking_service_1.BookingService.getSingleBookingByUserFromDb(id, bID);
    return (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Bookings details retrieved successfully',
        data: result,
    });
}));
const deleteBookingByUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: userID } = req.user;
    const { id: bookingID } = req.params;
    const result = yield booking_service_1.BookingService.deleteBookingByUserFromDb(userID, bookingID);
    return (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Booking cancelled successfully',
        data: result,
    });
}));
const getAvailableTimeSlots = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const formattedDate = (0, booking_utils_1.getFormattedDate)();
    const facility = (_a = req.query) === null || _a === void 0 ? void 0 : _a.facility;
    const date = ((_b = req.query) === null || _b === void 0 ? void 0 : _b.date) || formattedDate;
    const covertedDate = (0, booking_utils_1.convertDate)(date);
    const result = yield booking_service_1.BookingService.getAvailableTimeSlotsFromBooking(covertedDate, facility);
    return (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Booking available time retrives successfully',
        data: result,
    });
}));
exports.BookingController = {
    createBooking,
    getAllBooking,
    getAllBookingByUser,
    deleteBookingByUser,
    getAvailableTimeSlots,
    getSingleBookingByUser,
};
