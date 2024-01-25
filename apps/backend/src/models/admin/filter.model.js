"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mongoose_1 = __importDefault(require("mongoose"));
var filterSchema = new mongoose_1["default"].Schema({
    adType: {
        type: [String]
    },
    itemWarranty: {
        type: [String]
    },
    itemCondition: {
        type: [String]
    },
    priceType: {
        type: [String]
    },
    tags: {
        type: [String]
    }
});
var FilterModel = mongoose_1["default"].model("Filter", filterSchema);
exports["default"] = FilterModel;
