"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.bookmarkSchema = void 0;
var joi_1 = __importDefault(require("joi"));
exports.bookmarkSchema = joi_1["default"].object({
    ads: joi_1["default"].string().required(),
    //   ads: Joi.string().allow(null, ''),
    note: joi_1["default"].string().allow(null, '')
});
