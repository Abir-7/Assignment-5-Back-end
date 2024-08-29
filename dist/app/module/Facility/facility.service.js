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
exports.FacilityService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const facility_model_1 = require("./facility.model");
const queryBuilder_1 = __importDefault(require("../../builder/queryBuilder"));
const testimonial_model_1 = require("../Testimonial/testimonial.model");
const getAllFacilityFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const facilityQuery = new queryBuilder_1.default(facility_model_1.Facility.find({ isDeleted: false }), query).paginate();
    const meta = yield facilityQuery.countTotal();
    const result = yield facilityQuery.modelQuery;
    return { meta, result };
});
const getSingleFacilityFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield facility_model_1.Facility.findOne({ _id: id });
    if (result === null || result === void 0 ? void 0 : result.isDeleted) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'You can not see Details. Facility is deleted');
    }
    else {
        return result;
    }
});
const getTopFacilityFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const topFacilities = yield testimonial_model_1.Testimonial.aggregate([
        {
            $lookup: {
                from: 'bookings', // Reference the Booking collection
                localField: 'bookingId', // Field from Testimonial
                foreignField: '_id', // Field in Booking
                as: 'booking',
            },
        },
        {
            $unwind: '$booking', // Unwind the booking array to get individual documents
        },
        {
            $group: {
                _id: '$booking.facility', // Group by facility field from the Booking
                averageRating: { $avg: '$rating' }, // Calculate average rating
            },
        },
        {
            $sort: { averageRating: -1 }, // Sort by average rating
        },
        {
            $limit: 4, // Limit to top 4
        },
        {
            $lookup: {
                from: 'facilities', // Collection name for Facility
                localField: '_id', // Group _id corresponds to Facility _id
                foreignField: '_id',
                as: 'facility',
            },
        },
        {
            $unwind: '$facility', // Unwind facility array to get the document
        },
        {
            $project: {
                _id: '$facility._id',
                name: '$facility.name',
                description: '$facility.description',
                pricePerHour: '$facility.pricePerHour',
                photo: '$facility.photo',
                location: '$facility.location',
                averageRating: 1, // Include average rating in the output
            },
        },
    ]);
    return topFacilities;
});
const createFacilityIntoDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield facility_model_1.Facility.create(data);
    return result;
});
const updateFacilityIntoDB = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(data);
    if (!(yield facility_model_1.Facility.isFacitityExist(id))) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Facility not found! update failed.');
    }
    if (data === null || data === void 0 ? void 0 : data.name) {
        const isNameSame = yield facility_model_1.Facility.findOne({ name: data.name });
        if (isNameSame) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Same Facility Name Already Exist');
        }
    }
    const result = yield facility_model_1.Facility.findOneAndUpdate({ _id: id }, data, {
        new: true,
    });
    console.log(result);
    return result;
});
const deleteFacilityFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(id);
    if (!(yield facility_model_1.Facility.isFacitityExist(id))) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Facility not found! delete failed.');
    }
    const result = yield facility_model_1.Facility.findByIdAndUpdate(id, { isDeleted: true }, {
        new: true,
        runValidators: true,
    });
    return result;
});
exports.FacilityService = {
    createFacilityIntoDB,
    updateFacilityIntoDB,
    deleteFacilityFromDB,
    getAllFacilityFromDB,
    getSingleFacilityFromDB,
    getTopFacilityFromDB,
};
