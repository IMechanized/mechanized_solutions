"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var packagecontroller_1 = require("../../controller/admin/packagecontroller");
var package_validate_1 = __importDefault(require("../../middlewares/admin/package.validate"));
var requireUser_1 = require("../../middlewares/requireUser");
function packageRoute(app) {
    // create a package
    app.post('/api/v1/package/ads', requireUser_1.requireAdmin, package_validate_1["default"], packagecontroller_1.createPackageHandler);
    // get a package by id
    app.get('/api/v1/package/ads/:packageId', requireUser_1.requireAdmin, packagecontroller_1.getPackageHandler);
    // find all packages
    app.get('/api/v1/package/ads', packagecontroller_1.findPackageHandler);
    // update a package
    app.put('/api/v1/package/ads/:packageId', requireUser_1.requireAdmin, packagecontroller_1.updatePackageHandler);
    // delete a package
    app["delete"]('/api/v1/package/ads/:packageId', requireUser_1.requireAdmin, packagecontroller_1.deletePackageHandler);
}
exports["default"] = packageRoute;
