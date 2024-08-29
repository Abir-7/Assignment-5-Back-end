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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const customer_model_1 = require("./customer.model");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const updateCustomerFromDB = (email, data) => __awaiter(void 0, void 0, void 0, function* () {
    const customerData = yield customer_model_1.Customer.isCustomerExist(email);
    if (!customerData) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found to update');
    }
    const { name } = data, remainingStudentData = __rest(data, ["name"]);
    const modifiedUpdatedData = Object.assign({}, remainingStudentData);
    if (name && Object.keys(name).length) {
        for (const [key, value] of Object.entries(name)) {
            modifiedUpdatedData[`name.${key}`] = value;
        }
    }
    const result = yield customer_model_1.Customer.findOneAndUpdate({ email }, modifiedUpdatedData, {
        new: true,
    });
    return result;
});
const getCustomerInfoFromDb = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield customer_model_1.Customer.findOne({ email: userData.userEmail });
    return result;
});
exports.customerService = {
    updateCustomerFromDB,
    getCustomerInfoFromDb,
};
