"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.packageSchema = void 0;
var joi_1 = __importDefault(require("joi"));
exports.packageSchema = joi_1["default"].object({
    packageName: joi_1["default"].string(),
    // subtitle: Joi.string().empty(''),
    // subTitleStatus: Joi.boolean(),
    // shortDesc: Joi.string(),
    packageColor: joi_1["default"].string(),
    pricing: joi_1["default"].number(),
    currency: joi_1["default"].string(),
    frequency: joi_1["default"].string(),
    // buttonText: Joi.string(),
    validity: joi_1["default"].number(),
    totalAds: joi_1["default"].number(),
    featuredAds: joi_1["default"].number(),
    services: joi_1["default"].array().items(joi_1["default"].object().keys({
        id: joi_1["default"].any(),
        name: joi_1["default"].string(),
        details: joi_1["default"].string(),
        active: joi_1["default"].boolean()
    }))
});
