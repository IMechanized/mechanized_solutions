"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mongoose_1 = __importDefault(require("mongoose"));
var reviewSchema = new mongoose_1["default"].Schema({
    user: {
        type: mongoose_1["default"].Schema.Types.ObjectId,
        ref: 'User'
    },
    status: {
        isApproved: {
            type: Boolean,
            "default": true
        }
    },
    ratingNumber: {
        type: Number,
        required: true
    },
    review: {
        type: String
    },
    sellerId: {
        type: mongoose_1["default"].Schema.Types.ObjectId,
        ref: 'User'
    }
});
var ReviewModel = mongoose_1["default"].model('Review', reviewSchema);
exports["default"] = ReviewModel;
