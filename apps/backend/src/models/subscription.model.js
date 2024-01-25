"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mongoose_1 = __importDefault(require("mongoose"));
var subscriptionSchema = new mongoose_1["default"].Schema({
    subscriptionEmail: {
        type: String,
        required: true,
        unique: true
    }
});
var SubscriptionModel = mongoose_1["default"].model('Sotification', subscriptionSchema);
exports["default"] = SubscriptionModel;
