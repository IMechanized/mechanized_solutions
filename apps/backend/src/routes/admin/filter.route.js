"use strict";
exports.__esModule = true;
var filter_controller_1 = require("../../controller/admin/filter.controller");
var filter_validate_1 = require("../../middlewares/admin/filter.validate");
var requireUser_1 = require("../../middlewares/requireUser");
function filterRoute(app) {
    // create a filter
    app.post("/api/v1/admin/filters", requireUser_1.requireAdmin, filter_validate_1.validateFilter, filter_controller_1.createFilterHandler);
    // find all filters
    app.get("/api/v1/admin/filters", filter_controller_1.findFiltersHandler);
}
exports["default"] = filterRoute;
