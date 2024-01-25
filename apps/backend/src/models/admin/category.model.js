"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mongoose_1 = __importDefault(require("mongoose"));
var categorySchema = new mongoose_1["default"].Schema({
    status: {
        isFeatured: {
            type: Boolean,
            "default": false
        },
        isActive: {
            type: Boolean,
            "default": true
        }
    },
    categoryTitle: {
        type: String,
        required: true,
        unique: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    avatar: {
        type: String
    },
    iconUrl: {
        type: String
    }
});
var CategoryModel = mongoose_1["default"].model('Category', categorySchema);
exports["default"] = CategoryModel;
