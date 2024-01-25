"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mongoose_1 = __importDefault(require("mongoose"));
// create message schema
var messageSchema = new mongoose_1["default"].Schema({
    ads: {
        type: mongoose_1["default"].Schema.Types.ObjectId,
        ref: 'Ads'
    },
    time: {
        type: String,
        required: true
    },
    members: {
        buyer: {
            type: mongoose_1["default"].Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        seller: {
            type: mongoose_1["default"].Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    messages: {
        type: [
            {
                sender: {
                    type: mongoose_1["default"].Schema.Types.ObjectId,
                    ref: 'User'
                },
                reciver: {
                    type: mongoose_1["default"].Schema.Types.ObjectId,
                    ref: 'User'
                },
                message: String,
                timestamp: String
            },
        ],
        required: true
    }
});
// create message model
var MessageModel = mongoose_1["default"].model('Message', messageSchema);
exports["default"] = MessageModel;
