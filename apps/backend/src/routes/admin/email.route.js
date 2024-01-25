"use strict";
exports.__esModule = true;
var email_controller_1 = require("../../controller/admin/email.controller");
var requireUser_1 = require("../../middlewares/requireUser");
function emailRoute(app) {
    // create a email routes
    app.post('/api/v1/admin/notification/email', requireUser_1.requireAdmin, email_controller_1.createEmailHandler);
    // get a email by email-type
    app.get('/api/v1/admin/notification/email/:emailType', requireUser_1.requireAdmin, email_controller_1.getEmailHandler);
    // find all emails
    app.get('/api/v1/admin/notification/emails', requireUser_1.requireAdmin, email_controller_1.findEmailsHandler);
    //update a email by id
    app.put('/api/v1/admin/notification/email/:emailType', requireUser_1.requireAdmin, email_controller_1.updateEmailHandler);
    // Contact us email sender
    app.post('/api/v1/contact/email', email_controller_1.createContactEmailHandler);
}
exports["default"] = emailRoute;
