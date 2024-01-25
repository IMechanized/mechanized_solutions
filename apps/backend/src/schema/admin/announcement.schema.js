"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.announcementSchema = void 0;
var joi_1 = __importDefault(require("joi"));
exports.announcementSchema = joi_1["default"].object({
    announcement: joi_1["default"].string().required()
});
