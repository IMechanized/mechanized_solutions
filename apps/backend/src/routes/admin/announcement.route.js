"use strict";
exports.__esModule = true;
var requireUser_1 = require("../../middlewares/requireUser");
var announcement_validate_1 = require("../../middlewares/admin/announcement.validate");
var announcement_controller_1 = require("../../controller/admin/announcement.controller");
function announcementRoute(app) {
    // create a filter
    app.post('/api/v1/admin/announcement', requireUser_1.requireAdmin, announcement_validate_1.validateAnnouncement, announcement_controller_1.createAnnouncementHandler);
    // find all filters
    app.get('/api/v1/admin/announcement', announcement_controller_1.findAnnouncementHandler);
}
exports["default"] = announcementRoute;
