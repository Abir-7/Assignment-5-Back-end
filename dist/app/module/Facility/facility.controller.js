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
exports.FacilityController = void 0;
const facility_service_1 = require("./facility.service");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const http_status_1 = __importDefault(require("http-status"));
const getAllFacility = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const result = yield facility_service_1.FacilityService.getAllFacilityFromDB(query);
    return (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Facilities are retrieved succesfully',
        meta: result.meta,
        data: result.result,
    });
}));
const getSingleFacility = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const result = yield facility_service_1.FacilityService.getSingleFacilityFromDB((_a = req.params) === null || _a === void 0 ? void 0 : _a.id);
    return (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Facility is retrive successfully',
        data: result,
    });
}));
const getTopFacility = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield facility_service_1.FacilityService.getTopFacilityFromDB();
    return (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Top Facility is retrive successfully',
        data: result,
    });
}));
const createFacility = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const result = yield facility_service_1.FacilityService.createFacilityIntoDB(data);
    return (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Facility added successfully',
        data: result,
    });
}));
const updateFacility = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updatedData = req.body;
    const result = yield facility_service_1.FacilityService.updateFacilityIntoDB(id, updatedData);
    return (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Facility updated successfully',
        data: result,
    });
}));
const deleteFacility = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield facility_service_1.FacilityService.deleteFacilityFromDB(id);
    return (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Facility deleted successfully',
        data: result,
    });
}));
exports.FacilityController = {
    createFacility,
    updateFacility,
    deleteFacility,
    getAllFacility,
    getSingleFacility,
    getTopFacility,
};
