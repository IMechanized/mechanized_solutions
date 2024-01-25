"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.sessionSchema = void 0;
var joi_1 = __importDefault(require("joi"));
exports.sessionSchema = joi_1["default"].object({
    email: joi_1["default"].string().required().email(),
    password: joi_1["default"].string().required()
});
