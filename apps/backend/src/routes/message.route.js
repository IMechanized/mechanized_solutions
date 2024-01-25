"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var message_controller_1 = require("../controller/message.controller");
var message_validate_1 = require("../middlewares/message.validate");
var requireUser_1 = __importDefault(require("../middlewares/requireUser"));
function messageRoute(app) {
    // send a message routes
    app.post('/api/v1/users/message/rooms', requireUser_1["default"], message_validate_1.messageValidate, message_controller_1.createMessageRoomHandler);
    //  get all message rooms
    app.get('/api/v1/users/message/rooms', requireUser_1["default"], message_controller_1.findMessageRoomHandler);
    // get a message room by id
    app.get('/api/v1/users/message/room/:roomId', requireUser_1["default"], message_controller_1.getMessageRoomHandler);
    // update message by room _id
    app.put('/api/v1/users/message/room/:roomId', requireUser_1["default"], message_controller_1.updateMessageHandler);
}
exports["default"] = messageRoute;
