"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mongoose_1 = __importDefault(require("mongoose"));
var topLocationSchema = new mongoose_1["default"].Schema({
    location: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        isActive: {
            type: Boolean,
            "default": true
        }
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    avatar: {
        type: String
    },
    avatarCloudinaryId: {
        type: String
    }
});
var TopLocationModel = mongoose_1["default"].model('Toplocation', topLocationSchema);
exports["default"] = TopLocationModel;
