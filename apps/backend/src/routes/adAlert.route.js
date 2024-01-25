"use strict";
exports.__esModule = true;
var adAlert_controller_1 = require("../controller/adAlert.controller");
var requireUser_1 = require("../middlewares/requireUser");
function adAlertRoute(app) {
    // Create ad alert
    app.post('/api/v1/user/alert/ads', requireUser_1.requireBuyer, adAlert_controller_1.createAdAlertHandler);
    // get a ad alert by ID
    app.get('/api/v1/user/alert/ads/:alertId', requireUser_1.requireBuyer, adAlert_controller_1.getAdAlertHandler);
    // show alert result
    app.get('/api/v1/user/alert/ads/search/:alertId', requireUser_1.requireBuyer, adAlert_controller_1.showAdAlertHandler);
    // Find all ad alerts (private)
    app.get('/api/v1/user/alert/ads', requireUser_1.requireBuyer, adAlert_controller_1.findAdAlertHandler);
    // update a ad alert
    app.put('/api/v1/user/alert/ads/:alertId', requireUser_1.requireBuyer, adAlert_controller_1.updateAdAlertHandler);
    // update ad alert status
    app.put('/api/v1/user/alert/status/ads/:alertId', requireUser_1.requireBuyer, adAlert_controller_1.updateAdAlertStatusHandler);
    // disable multiple ad alert status by ids
    app.put("/api/v1/user/multiselect/alert/ads", requireUser_1.requireBuyer, adAlert_controller_1.disableMultipleAdAlertHandler);
    // delete a ad alert
    app["delete"]('/api/v1/user/alert/ads/:alertId', requireUser_1.requireBuyer, adAlert_controller_1.deleteAdAlertHandler);
    // delete multiple ad alerts 
    app["delete"]('/api/v1/user/multiselect/alert/ads', requireUser_1.requireBuyer, adAlert_controller_1.deleteMultipleAdAlertsHandler);
}
exports["default"] = adAlertRoute;
