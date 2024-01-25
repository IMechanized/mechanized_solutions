"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mongoose_1 = __importDefault(require("mongoose"));
var announcementSchema = new mongoose_1["default"].Schema({
    announcement: {
        type: String,
        "default": ''
    }
});
var AnnouncementModel = mongoose_1["default"].model('Announcement', announcementSchema);
exports["default"] = AnnouncementModel;
