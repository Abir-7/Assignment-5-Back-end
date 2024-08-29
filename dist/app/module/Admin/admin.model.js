"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admin = exports.adminSchema = void 0;
const mongoose_1 = require("mongoose");
const admin_const_1 = require("./admin.const");
// Define the IUserName interface as a Mongoose schema
const UserNameSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        trim: true,
    },
    middleName: {
        type: String,
        trim: true,
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        trim: true,
    },
}, { _id: false });
// Define the IAdmin interface as a Mongoose schema
exports.adminSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: [true, 'ID is required'],
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User reference is required'],
    },
    name: {
        type: UserNameSchema,
        required: [true, 'Name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    gender: {
        type: String,
        enum: {
            values: admin_const_1.adminGender,
            message: '{VALUE} is not a valid gender',
        },
        required: [true, 'Gender is required'],
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
    isDeleted: {
        type: Boolean,
        default: false,
    },
});
exports.Admin = (0, mongoose_1.model)('Admin', exports.adminSchema);
