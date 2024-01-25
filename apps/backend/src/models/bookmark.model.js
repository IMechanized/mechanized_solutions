"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mongoose_1 = __importDefault(require("mongoose"));
var bookmarkSchema = new mongoose_1["default"].Schema({
    user: {
        type: mongoose_1["default"].Schema.Types.ObjectId,
        ref: 'User'
    },
    bookmarks: [
        {
            ads: {
                type: mongoose_1["default"].Schema.Types.ObjectId,
                ref: 'Ads'
            },
            note: {
                type: String,
                "default": ''
            }
        },
    ]
}, {
    timestamps: true
});
var BookmarkModel = mongoose_1["default"].model('Bookmark', bookmarkSchema);
exports["default"] = BookmarkModel;
