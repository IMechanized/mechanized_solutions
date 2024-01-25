"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.loginSchema = exports.userSchema = void 0;
var joi_1 = __importDefault(require("joi"));
exports.userSchema = joi_1["default"].object({
    fullName: {
        firstName: joi_1["default"].string().required(),
        lastName: joi_1["default"].string().required()
    },
    userName: joi_1["default"].string().required(),
    email: joi_1["default"].string().email().required(),
    password: joi_1["default"].string().required(),
    isConfirmed: joi_1["default"].boolean(),
    role: joi_1["default"].object({
        isBuyer: joi_1["default"].boolean(),
        isSeller: joi_1["default"].boolean(),
        isAdmin: joi_1["default"].boolean(),
        isSuperAdmin: joi_1["default"].boolean()
    })
});
exports.loginSchema = joi_1["default"].object({
    email: joi_1["default"].string().email().required(),
    password: joi_1["default"].string().required()
});
