"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mongoose_1 = __importDefault(require("mongoose"));
var packageSchema = new mongoose_1["default"].Schema({
    packageName: {
        type: String,
        required: true,
        unique: true
    },
    // subtitle: {
    //     type: String,
    // },
    // subTitleStatus: {
    //     type: Boolean,
    //     default: true,
    // },
    // shortDesc: {
    //     type: String,
    // },
    packageColor: {
        type: String
    },
    pricing: {
        type: Number,
        required: true,
        unique: true
    },
    currency: {
        type: String,
        required: true
    },
    frequency: {
        type: String,
        required: true
    },
    // buttonText: {
    //     type: String,
    //     required: true,
    // },
    validity: {
        type: Number,
        required: true
    },
    totalAds: {
        type: Number,
        required: true
    },
    featuredAds: {
        type: Number,
        required: true
    },
    services: {
        type: [
            {
                name: String,
                details: String,
                active: Boolean
            },
        ]
    }
}, {
    timestamps: true
});
var PackageModel = mongoose_1["default"].model('Package', packageSchema);
exports["default"] = PackageModel;
