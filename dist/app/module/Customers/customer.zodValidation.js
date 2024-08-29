"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zodCustomerSchema = void 0;
const zod_1 = require("zod");
exports.zodCustomerSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string({ required_error: 'password is required' }),
        customer: zod_1.z.object({
            email: zod_1.z
                .string({
                required_error: 'Email is required.',
                invalid_type_error: 'Email must be a string.',
            })
                .email('Invalid email format.'),
            name: zod_1.z.object({
                firstName: zod_1.z.string({
                    required_error: 'First name is required.',
                    invalid_type_error: 'First name must be a string.',
                }),
                middleName: zod_1.z
                    .string({
                    invalid_type_error: 'Middle name must be a string.',
                })
                    .optional(),
                lastName: zod_1.z.string({
                    required_error: 'Last name is required.',
                    invalid_type_error: 'Last name must be a string.',
                }),
            }),
            phone: zod_1.z.number({
                required_error: 'Contact number is required.',
                invalid_type_error: 'Contact number must be a number.',
            }),
            address: zod_1.z
                .string({
                required_error: 'Address is required.',
                invalid_type_error: 'Address must be a string.',
            })
                .optional(),
        }),
    }),
});
