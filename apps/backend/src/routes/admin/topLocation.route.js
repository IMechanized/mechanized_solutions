"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var topLocation_controller_1 = require("../../controller/admin/topLocation.controller");
var topLocation_validate_1 = require("../../middlewares/admin/topLocation.validate");
var requireUser_1 = require("../../middlewares/requireUser");
var multer_1 = __importDefault(require("../../utils/multer"));
function topLocationRoute(app) {
    // create a location
    app.post('/api/v1/admin/topLocations', requireUser_1.requireAdmin, topLocation_validate_1.validateTopLocation, multer_1["default"].single('locationImage'), topLocation_controller_1.createTopLocationHandler);
    // get a location by id
    app.get('/api/v1/admin/topLocations/byId/:locationId', requireUser_1.requireAdmin, topLocation_controller_1.getLocationHandler);
    // get a location by slug
    app.get('/api/v1/admin/topLocations/:locationSlug', topLocation_controller_1.getLocationBySlugHandler);
    // find all locations public
    app.get('/api/v1/admin/topLocations', topLocation_controller_1.findTopLocatioHandler);
    // find all categories admin private
    app.get("/api/v1/admin/private/topLocations", requireUser_1.requireAdmin, topLocation_controller_1.findAdminLocationHandler);
    // update a location
    app.put('/api/v1/admin/topLocations/byId/:locationId', requireUser_1.requireAdmin, multer_1["default"].single('locationImage'), topLocation_controller_1.updateLocationHandler);
    // change a location status by id
    app.put("/api/v1/admin/topLocations/status/:locationId", requireUser_1.requireAdmin, topLocation_controller_1.changeLoationStatusHandler);
    // disable multiple location status by ids
    app.put("/api/v1/admin/multiselect/topLocations/status", requireUser_1.requireAdmin, topLocation_controller_1.disableMultipleLocationHandler);
    // delete a location
    app["delete"]('/api/v1/admin/topLocations/byId/:locationId', requireUser_1.requireAdmin, topLocation_controller_1.deleteLocationHandler);
    // delete multiple location
    app["delete"]("/api/v1/admin/multiselect/topLocations", requireUser_1.requireAdmin, topLocation_controller_1.deleteMultipleLocationsHandler);
}
exports["default"] = topLocationRoute;
