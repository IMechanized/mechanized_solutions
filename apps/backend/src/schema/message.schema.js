"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.messageSchemaValidation = void 0;
var joi_1 = __importDefault(require("joi"));
// create message schema
exports.messageSchemaValidation = joi_1["default"].object({
    ads: joi_1["default"].string().required(),
    time: joi_1["default"].string().required(),
    members: joi_1["default"].object({
        buyer: joi_1["default"].string().required(),
        seller: joi_1["default"].string().required()
    }),
    messages: joi_1["default"].array()
        .items(joi_1["default"].object().keys({
        sender: joi_1["default"].string().required(),
        reciver: joi_1["default"].string().required(),
        message: joi_1["default"].string().required(),
        timestamp: joi_1["default"].string().required()
    }))
        .required()
});
