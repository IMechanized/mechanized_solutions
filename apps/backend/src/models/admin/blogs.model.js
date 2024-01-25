"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mongoose_1 = __importDefault(require("mongoose"));
var blogSchema = new mongoose_1["default"].Schema({
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
    blogTitle: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    tags: [
        {
            type: String
        },
    ],
    avatar: {
        type: String
    },
    iconUrl: {
        type: String
    }
});
var BlogModel = mongoose_1["default"].model('Blog', blogSchema);
exports["default"] = BlogModel;
