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
exports.userService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const user_model_1 = require("./user.model");
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const customer_model_1 = require("../Customers/customer.model");
const admin_model_1 = require("../Admin/admin.model");
const createCustomerIntoDb = (data, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = {};
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        user.email = data.email;
        user.password = password;
        const userData = yield user_model_1.User.create([user], { session });
        if (!userData.length) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create user');
        }
        data.user = userData[0]._id;
        const result = yield customer_model_1.Customer.create([data], { session });
        if (!userData.length) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create user');
        }
        yield session.commitTransaction();
        yield session.endSession();
        return result;
        //eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error(error);
    }
});
const createAdminIntoDb = (data, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = {};
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        user.email = data.email;
        user.password = password;
        user.role = 'admin';
        const userData = yield user_model_1.User.create([user], { session });
        if (!userData.length) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create admin');
        }
        data.user = userData[0]._id;
        data.id = userData[0].id;
        const result = yield admin_model_1.Admin.create([data], { session });
        if (!userData.length) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create admin');
        }
        yield session.commitTransaction();
        yield session.endSession();
        return result;
        //eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error(error);
    }
});
exports.userService = { createCustomerIntoDb, createAdminIntoDb };
