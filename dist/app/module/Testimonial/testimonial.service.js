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
exports.testimonialService = void 0;
const customer_model_1 = require("../Customers/customer.model");
const testimonial_model_1 = require("./testimonial.model");
const saveTestimonialIntoDb = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const customer = yield customer_model_1.Customer.findOne({ user: data.user });
    const result = yield testimonial_model_1.Testimonial.create(Object.assign(Object.assign({}, data), { photo: customer === null || customer === void 0 ? void 0 : customer.photo }));
    return result;
});
const getAllTestimonialFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield testimonial_model_1.Testimonial.find()
        .populate('user')
        .populate('bookingId');
    return result;
});
exports.testimonialService = {
    saveTestimonialIntoDb,
    getAllTestimonialFromDb,
};
