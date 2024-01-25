"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mongoose_1 = __importDefault(require("mongoose"));
var emailSchema = new mongoose_1["default"].Schema({
    senderAddress: {
        type: String,
        required: true
    },
    senderEmail: {
        type: String
    },
    subject: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    emailType: {
        type: String,
        required: true,
        unique: true
    }
});
var EmailModel = mongoose_1["default"].model('Email', emailSchema);
exports["default"] = EmailModel;
