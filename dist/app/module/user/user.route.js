"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const validationMiddleware_1 = __importDefault(require("../../Middleware/validationMiddleware"));
const customer_zodValidation_1 = require("../Customers/customer.zodValidation");
const admin_zodValidation_1 = require("../Admin/admin.zodValidation");
const router = (0, express_1.Router)();
router.post('/signup', (0, validationMiddleware_1.default)(customer_zodValidation_1.zodCustomerSchema), user_controller_1.userController.createCustomer);
router.post('/create-admin', (0, validationMiddleware_1.default)(admin_zodValidation_1.zodAdminSchema), user_controller_1.userController.createAdmin);
exports.UserRouter = router;
