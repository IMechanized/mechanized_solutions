"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mongoose_1 = __importDefault(require("mongoose"));
var notificationSchema = new mongoose_1["default"].Schema({
    user: {
        type: mongoose_1["default"].Schema.Types.ObjectId,
        ref: 'User'
    },
    notification: {
        type: [
            {
                message: String,
                timestamp: String,
                event: String,
                status: String
            },
        ]
    }
});
var NotificationModel = mongoose_1["default"].model('Notification', notificationSchema);
exports["default"] = NotificationModel;
