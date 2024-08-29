"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zodAdminSchema = void 0;
const zod_1 = require("zod");
const admin_const_1 = require("./admin.const");
// Define the IUserName schema using Zod
const UserNameSchema = zod_1.z.object({
    firstName: zod_1.z.string({
        required_error: 'First name is required',
        invalid_type_error: 'First name must be a string',
    }),
    middleName: zod_1.z
        .string({ invalid_type_error: 'Middle name must be a string' })
        .optional(),
    lastName: zod_1.z.string({
        required_error: 'Last name is required',
        invalid_type_error: 'Last name must be a string',
    }),
});
// Define the IAdmin schema using Zod
exports.zodAdminSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string({
            required_error: 'Password is required',
            invalid_type_error: 'Password must be a string',
        }),
        admin: zod_1.z.object({
            name: UserNameSchema,
            email: zod_1.z
                .string({
                required_error: 'Email is required',
                invalid_type_error: 'Email must be a string',
            })
                .email('Please provide a valid email address'),
            gender: zod_1.z.enum(admin_const_1.adminGender, {
                required_error: 'Gender is required',
                invalid_type_error: 'Gender must be one of Male, Female, Other',
            }),
            phone: zod_1.z.string({
                required_error: 'Contact number is required',
                invalid_type_error: 'Contact number must be a string',
            }),
            address: zod_1.z.string({
                required_error: 'Address is required',
                invalid_type_error: 'Address must be a string',
            }),
        }),
    }),
});
