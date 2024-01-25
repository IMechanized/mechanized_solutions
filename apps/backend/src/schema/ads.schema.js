"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.adsSchema = void 0;
var joi_1 = __importDefault(require("joi"));
exports.adsSchema = joi_1["default"].object().keys({
    status: joi_1["default"].object().keys({
        isApproved: joi_1["default"].boolean(),
        isPublished: joi_1["default"].boolean(),
        isFeatured: joi_1["default"].boolean(),
        isActive: joi_1["default"].boolean()
    }),
    adTitle: joi_1["default"].string().required(),
    category: joi_1["default"].string(),
    location: joi_1["default"].string(),
    tags: joi_1["default"].string().allow(''),
    itemCondition: joi_1["default"].string(),
    itemWarranty: joi_1["default"].string(),
    adType: joi_1["default"].string(),
    description: joi_1["default"].string(),
    specifications: joi_1["default"].string().allow(''),
    // priceDetails: Joi.object().keys({
    //     currency: Joi.string(),
    //     priceType: Joi.string(),
    //     price: Joi.number(),
    // }),
    priceDetails: joi_1["default"].string(),
    // personalInfo: Joi.object().keys({
    //     fullName: Joi.string(),
    //     email: Joi.string(),
    //     phone: Joi.string(),
    //     location: Joi.string(),
    // }),
    personalInfo: joi_1["default"].string(),
    specialNote: joi_1["default"].string().allow('')
});
