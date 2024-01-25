"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.topLocationchema = void 0;
var joi_1 = __importDefault(require("joi"));
exports.topLocationchema = joi_1["default"].object({
    topLocations: joi_1["default"].array().items(joi_1["default"].string())
});
