"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var category_controller_1 = require("../../controller/admin/category.controller");
var requireUser_1 = require("../../middlewares/requireUser");
var multer_1 = __importDefault(require("../../utils/multer"));
function categoryRoute(app) {
    // create a category
    app.post("/api/v1/ads/category", requireUser_1.requireAdmin, multer_1["default"].single("categoryIcon"), category_controller_1.createCategoryHandler);
    // get a category by id
    app.get("/api/v1/ads/category/byId/:categoryId", category_controller_1.getCategoryHandler);
    // get a category by slug
    app.get("/api/v1/ads/category/:categorySlug", category_controller_1.getCategoryBySlugHandler);
    // find all categories public
    app.get("/api/v1/ads/category", category_controller_1.findCategoryHandler);
    // find all categories admin private
    app.get("/api/v1/ads/admin/category", requireUser_1.requireAdmin, category_controller_1.findAdminCategoryHandler);
    // update a category
    app.put("/api/v1/ads/category/:categoryId", requireUser_1.requireAdmin, multer_1["default"].single("categoryIcon"), category_controller_1.updateCategoryHandler);
    // change a category status by id
    app.put("/api/v1/ads/category/status/:categoryId", requireUser_1.requireAdmin, category_controller_1.changeCategoryStatusHandler);
    // disable multiple category status by ids
    app.put("/api/v1/ads/multiselect/category/status", requireUser_1.requireAdmin, category_controller_1.disableMultipleCategoryHandler);
    // delete a category
    app["delete"]("/api/v1/ads/category/:categoryId", requireUser_1.requireAdmin, category_controller_1.deleteCategoryHandler);
    // delete multiple category
    app["delete"]("/api/v1/ads/multiselect/category", requireUser_1.requireAdmin, category_controller_1.deleteMultipleCategoryHandler);
}
exports["default"] = categoryRoute;
