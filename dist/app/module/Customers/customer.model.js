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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Customer = exports.customerSchema = void 0;
const mongoose_1 = require("mongoose");
exports.customerSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: [true, 'Email is required.'],
        unique: true,
        lowercase: true,
    },
    name: {
        firstName: {
            type: String,
            required: [true, 'First name is required.'],
            trim: true,
        },
        middleName: {
            type: String,
            trim: true, // Optional field
        },
        lastName: {
            type: String,
            required: [true, 'Last name is required.'],
            trim: true,
        },
    },
    phone: {
        type: Number,
        required: [true, 'Contact number is required.'],
    },
    address: {
        type: String,
        required: [true, 'Address is required.'],
        trim: true,
    },
    photo: {
        type: String,
        default: 'https://img.freepik.com/free-vector/hand-drawn-side-profile-cartoon-illustration_23-2150503804.jpg?t=st=1724927284~exp=1724930884~hmac=a42764fe18cff7567042535bfb6aec564591400f29408485d5cc8eed46b42d9a&w=740',
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User reference is required.'],
    },
});
exports.customerSchema.statics.isCustomerExist = function (email) {
    return __awaiter(this, void 0, void 0, function* () {
        const iscustomerExist = yield exports.Customer.findOne({ email });
        return iscustomerExist;
    });
};
exports.Customer = (0, mongoose_1.model)('Customer', exports.customerSchema);
