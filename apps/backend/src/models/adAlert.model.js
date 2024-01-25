"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mongoose_1 = __importDefault(require("mongoose"));
var adAlertSchema = new mongoose_1["default"].Schema({
    user: {
        type: mongoose_1["default"].Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        "default": true
    },
    keyword: {
        type: String
    },
    category: {
        type: String
    },
    location: {
        type: String
    },
    tags: [
        {
            type: String
        },
    ],
    emailFrequency: {
        type: String
    }
});
var AdAlertModel = mongoose_1["default"].model('AdAlert', adAlertSchema);
exports["default"] = AdAlertModel;
