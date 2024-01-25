"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.filterSchema = void 0;
var joi_1 = __importDefault(require("joi"));
exports.filterSchema = joi_1["default"].object({
    adType: joi_1["default"].array().items(joi_1["default"].string()),
    itemWarranty: joi_1["default"].array().items(joi_1["default"].string()),
    itemCondition: joi_1["default"].array().items(joi_1["default"].string()),
    priceType: joi_1["default"].array().items(joi_1["default"].string()),
    tags: joi_1["default"].array().items(joi_1["default"].string())
});
