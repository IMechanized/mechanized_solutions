"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var blogs_controller_1 = require("../../controller/admin/blogs.controller");
var requireUser_1 = require("../../middlewares/requireUser");
var multer_1 = __importDefault(require("../../utils/multer"));
function blogsRoute(app) {
    // create a blog
    app.post("/api/v1/ads/blog", requireUser_1.requireAdmin, multer_1["default"].single("blogImage"), blogs_controller_1.createBlogHandler);
    // get a blog by id
    app.get("/api/v1/ads/blog/byId/:blogId", blogs_controller_1.getBlogHandler);
    // get a blog by slug
    app.get("/api/v1/ads/blog/:blogSlug", blogs_controller_1.getBlogBySlugHandler);
    // find all blog public
    app.get("/api/v1/ads/blog", blogs_controller_1.findBlogHandler);
    // find all blog admin private
    app.get("/api/v1/ads/admin/blog", requireUser_1.requireAdmin, blogs_controller_1.findAdminBlogsHandler);
    // update a blog
    app.put("/api/v1/ads/blog/:blogId", requireUser_1.requireAdmin, multer_1["default"].single("blogImage"), blogs_controller_1.updateBlogHandler);
    // change a blog status by id
    app.put("/api/v1/ads/blog/status/:blogId", requireUser_1.requireAdmin, blogs_controller_1.changeBlogStatusHandler);
    // disable multiple blogs status by ids
    app.put("/api/v1/ads/multiselect/blog/status", requireUser_1.requireAdmin, blogs_controller_1.disableMultipleBlogHandler);
    // delete a blog
    app["delete"]("/api/v1/ads/blog/:blogId", requireUser_1.requireAdmin, blogs_controller_1.deleteBlogHandler);
    // delete multiple blogs
    app["delete"]("/api/v1/ads/multiselect/blog", requireUser_1.requireAdmin, blogs_controller_1.deleteMultipleBlogHandler);
}
exports["default"] = blogsRoute;
