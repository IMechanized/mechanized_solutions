"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.subscriptionSchema = void 0;
var joi_1 = __importDefault(require("joi"));
exports.subscriptionSchema = joi_1["default"].object({
    subscriptionEmail: joi_1["default"].string().required()
});
