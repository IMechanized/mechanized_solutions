"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var notification_controller_1 = require("../controller/notification.controller");
var requireUser_1 = __importDefault(require("../middlewares/requireUser"));
function notificationRoute(app) {
    // Get all notifications
    app.get('/api/v1/users/notifications/catalog', requireUser_1["default"], notification_controller_1.getNotificationHandler);
    // update notification status
    app.put('/api/v1/users/notifications/catalog/:notoficationId', requireUser_1["default"], notification_controller_1.updateNotificationHandler);
}
exports["default"] = notificationRoute;
