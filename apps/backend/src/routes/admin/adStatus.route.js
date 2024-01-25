"use strict";
exports.__esModule = true;
var adStatus_controller_1 = require("../../controller/admin/adStatus.controller");
var requireUser_1 = require("../../middlewares/requireUser");
function adStatusRoute(app) {
    // seller ads status update route
    app.put('/api/v1/seller/status/ads/:adId', requireUser_1.requireSeller, adStatus_controller_1.sellerAdsStatusUpdateHandler);
    // seller multiple ads drafted route
    app.put('/api/v1/seller/multiple/status/ads', requireUser_1.requireSeller, adStatus_controller_1.sellerMultipleAdsStatusHandler);
    // admin ads status update route
    app.put('/api/v1/admin/status/ads/:adId', requireUser_1.requireAdmin, adStatus_controller_1.adminAdsStatusUpdateHandler);
}
exports["default"] = adStatusRoute;
