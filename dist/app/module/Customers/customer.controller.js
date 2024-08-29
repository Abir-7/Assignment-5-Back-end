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
exports.customerController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const customer_service_1 = require("./customer.service");
const updateCustomer = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.params;
    const data = req.body;
    const result = yield customer_service_1.customerService.updateCustomerFromDB(email, data);
    (0, sendResponse_1.default)(res, {
        data: result,
        statusCode: 200,
        success: true,
        message: 'User updated Successfully',
    });
}));
const getCustomerInfo = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = req.user;
    const result = yield customer_service_1.customerService.getCustomerInfoFromDb(userData);
    (0, sendResponse_1.default)(res, {
        data: result,
        statusCode: 200,
        success: true,
        message: 'Customer info is fetched successfully',
    });
}));
exports.customerController = {
    updateCustomer,
    getCustomerInfo,
};
